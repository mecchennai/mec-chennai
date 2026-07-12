import React, { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient";

// Simple hook to track idle time
function useIdleTimer(timeoutMinutes, onIdle, isPaused) {
  const timeoutId = useRef(null);
  const lastActive = useRef(Date.now());

  const resetTimer = useCallback(() => {
    if (isPaused) return;
    
    // Throttle to avoid aggressive resets (e.g., 1000ms)
    if (Date.now() - lastActive.current < 1000) return;
    lastActive.current = Date.now();

    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      onIdle();
    }, timeoutMinutes * 60 * 1000);
  }, [timeoutMinutes, onIdle, isPaused]);

  useEffect(() => {
    if (isPaused) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      return;
    }

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer, isPaused]);
}

export default function AdminPanel() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Fix #4: Login attempt throttling — 5 failed attempts triggers 60s lockout
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  useEffect(() => {
    if (lockoutUntil <= 0) return;
    const tick = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(0);
        setLockoutRemaining(0);
        clearInterval(tick);
      } else {
        setLockoutRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [lockoutUntil]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (lockoutUntil > Date.now()) return;
    setLoginError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 60000;
        setLockoutUntil(lockoutTime);
        setLockoutRemaining(60);
        setLoginError("Too many attempts, please wait.");
        setFailedAttempts(0);
      } else {
        setLoginError(error.message);
      }
    } else {
      // Reset on successful login
      setFailedAttempts(0);
      setLockoutUntil(0);
    }
    setLoading(false);
  };

  const isLockedOut = lockoutUntil > Date.now();

  if (loading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center p-4">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Admin Portal Login</h2>
          {loginError && <div className="mb-4 text-red-600 text-sm font-bold text-center bg-red-50 p-2 rounded">{loginError}</div>}
          {isLockedOut && <div className="mb-4 text-amber-700 text-sm font-bold text-center bg-amber-50 p-2 rounded">Please wait {lockoutRemaining}s before trying again.</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-surface-container-high rounded px-3 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-surface-container-high rounded px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-brand-gold text-primary font-bold py-2 rounded hover:bg-secondary-container transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || isLockedOut}>
              {loading ? "Logging in..." : isLockedOut ? `Locked (${lockoutRemaining}s)` : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard session={session} />;
}

function AdminDashboard({ session }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  
  // Staged state 
  // Each can be a string (URL from DB), a File (newly selected), or null/"" (cleared)
  const [aboutImage, setAboutImage] = useState(null);
  const [brochureImage, setBrochureImage] = useState(null);
  const [brochurePdf, setBrochurePdf] = useState(null);
  
  // Gallery items have state: 
  // - id (uuid or local temp id)
  // - url (string) or file (File object)
  // - action ('insert', 'update', 'delete', or 'none')
  const [galleryItems, setGalleryItems] = useState([]);

  // Setup Idle Timer (15 minutes). Pause if uploading to prevent aborts mid-upload.
  const handleIdle = useCallback(async () => {
    alert("You have been logged out due to inactivity.");
    await supabase.auth.signOut();
  }, []);
  useIdleTimer(15, handleIdle, isUploading);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoadingData(true);
    
    const { data: siteData } = await supabase.from('site_content').select('*').eq('id', 1).single();
    if (siteData) {
      setAboutImage(siteData.about_image_url || "");
      setBrochureImage(siteData.brochure_cover_url || "");
      setBrochurePdf(siteData.brochure_pdf_url || "");
    }

    const { data: galleryData } = await supabase.from('gallery_items').select('*').order('sort_order', { ascending: true });
    if (galleryData) {
      setGalleryItems(galleryData.map(item => ({ ...item, action: 'none', original_sort: item.sort_order })));
    }
    
    setIsLoadingData(false);
    setHasUnsavedChanges(false);
  };

  const supabaseStorageUpload = async (file, bucketName) => {
    // Generate a unique filename to prevent overwriting unless intended, but here we just append timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });
    
    if (error) throw new Error(`Supabase Storage Upload Failed: ${error.message}`);
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSaveAll = async () => {
    setIsUploading(true);
    setSaveStatus("Uploading files...");
    try {
      let finalAbout = typeof aboutImage === 'string' ? aboutImage : "";
      if (aboutImage instanceof File) finalAbout = await supabaseStorageUpload(aboutImage, 'gallery_media');

      let finalBrochure = typeof brochureImage === 'string' ? brochureImage : "";
      if (brochureImage instanceof File) finalBrochure = await supabaseStorageUpload(brochureImage, 'gallery_media');

      let finalPdf = typeof brochurePdf === 'string' ? brochurePdf : "";
      if (brochurePdf instanceof File) finalPdf = await supabaseStorageUpload(brochurePdf, 'pdfs');

      setSaveStatus("Saving site content to database...");
      const { data: updateData, error: updateError } = await supabase.from('site_content').update({
        about_image_url: finalAbout,
        brochure_cover_url: finalBrochure,
        brochure_pdf_url: finalPdf
      }).eq('id', 1).select();
      
      if (updateError) throw new Error(`Supabase Site Content Error: ${updateError.message}`);
      if (!updateData || updateData.length === 0) throw new Error("Supabase Site Content Error: RLS policy prevented update or row ID 1 not found.");

      setSaveStatus("Processing gallery items...");
      
      // Process Gallery Deletions
      const toDelete = galleryItems.filter(i => i.action === 'delete' && !i.isLocal);
      for (const item of toDelete) {
        const { error: delError } = await supabase.from('gallery_items').delete().eq('id', item.id);
        if (delError) throw new Error(`Supabase Gallery Delete Error: ${delError.message}`);
      }

      // Process Gallery Inserts & Updates
      const activeItems = galleryItems.filter(i => i.action !== 'delete');
      // Normalize sort_order based on array index to ensure continuity, but respect user explicit orders where possible
      const orderedActiveItems = [...activeItems].sort((a,b) => a.sort_order - b.sort_order).map((item, idx) => ({...item, sort_order: idx + 1}));

      for (const item of orderedActiveItems) {
        let finalUrl = item.url;
        let finalThumb = item.thumbnail_url;

        // If it's a new upload (File object)
        if (item.file) {
          finalUrl = await supabaseStorageUpload(item.file, 'gallery_media');
          finalThumb = finalUrl;
        }

        if (item.action === 'insert' || item.isLocal) {
          const { error: insError } = await supabase.from('gallery_items').insert([{
            type: item.type,
            source_type: item.source_type,
            url: finalUrl,
            thumbnail_url: finalThumb,
            caption: item.caption || '',
            sort_order: item.sort_order
          }]);
          if (insError) throw new Error(`Supabase Gallery Insert Error: ${insError.message}`);
        } else if (item.action === 'update' || item.sort_order !== item.original_sort) {
          const { error: updError } = await supabase.from('gallery_items').update({
            sort_order: item.sort_order
          }).eq('id', item.id);
          if (updError) throw new Error(`Supabase Gallery Update Error: ${updError.message}`);
        }
      }

      setSaveStatus("All changes saved successfully!");
      setHasUnsavedChanges(false);
      setTimeout(() => {
        setIsUploading(false);
        setSaveStatus("");
        fetchData(); // reload fresh data
      }, 1500);

    } catch (err) {
      console.error("Save Error:", err);
      alert("Error saving changes: " + err.message);
      setIsUploading(false);
      setSaveStatus("");
    }
  };

  const stageFile = (setter, file) => {
    setter(file);
    setHasUnsavedChanges(true);
  };

  const getPreviewUrl = (item) => {
    if (!item) return null;
    if (typeof item === 'string') return item;
    return URL.createObjectURL(item);
  };

  const handleLogout = async () => {
    if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Are you sure you want to log out?")) {
      return;
    }
    await supabase.auth.signOut();
  };

  if (isLoadingData) {
    return <div className="min-h-screen bg-surface flex items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-primary text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-xl font-bold">MEC Website Admin Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-70 hidden md:block">{session.user.email}</span>
          <button className="bg-surface/20 hover:bg-surface/30 px-4 py-2 rounded text-sm transition" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Floating Save Bar */}
      {hasUnsavedChanges && !isUploading && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center z-50 animate-slide-up">
          <div className="text-primary font-bold hidden md:block">You have unsaved changes.</div>
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={fetchData} className="px-6 py-3 border rounded text-primary hover:bg-surface-container flex-1 md:flex-none">Discard</button>
            <button onClick={handleSaveAll} className="px-6 py-3 bg-brand-gold text-primary font-bold rounded shadow hover:bg-secondary-container flex-1 md:flex-none">
              Save All Changes
            </button>
          </div>
        </div>
      )}
      
      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
        {isUploading && (
          <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/75 text-white font-bold text-xl backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold border-t-transparent mb-4"></div>
            {saveStatus}
          </div>
        )}

        {/* Section 1 */}
        <section className="bg-white p-6 rounded shadow-ambient">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-2xl font-bold text-primary">1. About Us Image</h2>
            {aboutImage && <button onClick={() => stageFile(setAboutImage, null)} className="text-red-600 text-sm font-bold hover:bg-red-50 px-3 py-1 rounded">Clear Image</button>}
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <p className="text-sm text-on-surface-variant mb-2">Preview:</p>
              {aboutImage ? <img src={getPreviewUrl(aboutImage)} alt="About Us" className="w-full h-auto rounded border border-surface-container" /> : <div className="p-4 bg-surface-container italic text-sm text-center">No image set</div>}
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <label className="block mb-2 font-medium">Select New Image</label>
              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && stageFile(setAboutImage, e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 rounded shadow-ambient">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-2xl font-bold text-primary">2. Brochure Cover Image</h2>
            {brochureImage && <button onClick={() => stageFile(setBrochureImage, null)} className="text-red-600 text-sm font-bold hover:bg-red-50 px-3 py-1 rounded">Clear Thumbnail</button>}
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <p className="text-sm text-on-surface-variant mb-2">Preview:</p>
              {brochureImage ? <img src={getPreviewUrl(brochureImage)} alt="Brochure Cover" className="w-full h-auto rounded border border-surface-container" /> : <div className="p-4 bg-surface-container italic text-sm text-center">No image set</div>}
            </div>
            <div className="w-full md:w-3/4 flex flex-col justify-center">
              <label className="block mb-2 font-medium">Select New Thumbnail</label>
              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && stageFile(setBrochureImage, e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 rounded shadow-ambient">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-2xl font-bold text-primary">3. Brochure PDF</h2>
            {brochurePdf && <button onClick={() => stageFile(setBrochurePdf, null)} className="text-red-600 text-sm font-bold hover:bg-red-50 px-3 py-1 rounded">Clear PDF</button>}
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              <p className="text-sm text-on-surface-variant mb-2">Current PDF:</p>
              {brochurePdf ? (
                <div className="text-blue-600 truncate bg-blue-50 p-3 rounded border border-blue-100">
                  {typeof brochurePdf === 'string' ? <a href={brochurePdf} target="_blank" rel="noopener noreferrer" className="hover:underline">View Current Link</a> : <span>New File: {brochurePdf.name}</span>}
                </div>
              ) : <div className="italic text-sm">No PDF set</div>}
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <label className="block mb-2 font-medium">Select New PDF</label>
              <input type="file" accept="application/pdf" onChange={(e) => e.target.files[0] && stageFile(setBrochurePdf, e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <GalleryManager 
          items={galleryItems} 
          setItems={(newItems) => { setGalleryItems(newItems); setHasUnsavedChanges(true); }} 
        />

      </main>
    </div>
  );
}

function GalleryManager({ items, setItems }) {
  const [newItemType, setNewItemType] = useState('image'); 
  const [newItemSource, setNewItemSource] = useState('upload'); 
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedError, setEmbedError] = useState('');

  // Fix #6: Allowlist of domains for embed URLs
  const ALLOWED_EMBED_DOMAINS = [
    'youtube.com', 'www.youtube.com',
    'youtu.be',
    'youtube-nocookie.com', 'www.youtube-nocookie.com',
    'vimeo.com', 'player.vimeo.com',
    'google.com', 'www.google.com', 'maps.google.com',
  ];

  const isAllowedEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);
      return ALLOWED_EMBED_DOMAINS.some(domain => 
        parsed.hostname === domain || parsed.hostname.endsWith('.' + domain)
      );
    } catch {
      return false;
    }
  };

  const activeItems = items.filter(i => i.action !== 'delete').sort((a,b) => a.sort_order - b.sort_order);

  const handleRemove = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, action: 'delete' } : item));
  };

  const handleOrderChange = (id, newOrder) => {
    const num = parseInt(newOrder, 10);
    if (isNaN(num)) return;
    setItems(items.map(item => item.id === id ? { ...item, sort_order: num, action: item.action === 'none' ? 'update' : item.action } : item));
  };

  const moveItem = (index, direction) => {
    if (index + direction < 0 || index + direction >= activeItems.length) return;
    const movingItem = activeItems[index];
    const targetItem = activeItems[index + direction];
    
    // Swap sort orders
    const newItems = items.map(item => {
      if (item.id === movingItem.id) return { ...item, sort_order: targetItem.sort_order, action: item.action === 'none' ? 'update' : item.action };
      if (item.id === targetItem.id) return { ...item, sort_order: movingItem.sort_order, action: item.action === 'none' ? 'update' : item.action };
      return item;
    });
    setItems(newItems);
  };

  const handleStageMultipleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    let currentHighestOrder = Math.max(0, ...activeItems.map(i => i.sort_order));

    const newItems = files.map((file, idx) => ({
      id: 'local-' + Date.now() + '-' + idx,
      isLocal: true,
      file: file,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      source_type: 'upload',
      url: URL.createObjectURL(file), // for preview
      thumbnail_url: URL.createObjectURL(file),
      caption: `Uploaded ${file.name}`,
      sort_order: currentHighestOrder + idx + 1,
      action: 'insert'
    }));

    setItems([...items, ...newItems]);
    // Reset input
    e.target.value = null;
  };

  const handleAddEmbed = () => {
    if (!embedUrl.trim()) return;
    setEmbedError('');

    // Fix #6: Validate embed URL against domain allowlist
    if (!isAllowedEmbedUrl(embedUrl)) {
      setEmbedError('Only YouTube, Vimeo, and Google Maps embed URLs are allowed.');
      return;
    }

    let thumb = 'https://via.placeholder.com/300?text=Embed+Video';
    const ytMatch = embedUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)(["&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      thumb = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }

    let currentHighestOrder = Math.max(0, ...activeItems.map(i => i.sort_order));

    const newItem = {
      id: 'local-' + Date.now(),
      isLocal: true,
      type: newItemType,
      source_type: 'embed',
      url: embedUrl,
      thumbnail_url: thumb,
      caption: `Embedded Link`,
      sort_order: currentHighestOrder + 1,
      action: 'insert'
    };

    setItems([...items, newItem]);
    setEmbedUrl('');
    setEmbedError('');
  };

  return (
    <section className="bg-white p-6 rounded shadow-ambient">
      <h2 className="text-2xl font-bold text-primary border-b pb-2 mb-4">4. Gallery Manager</h2>
      
      <div className="mb-8 p-4 bg-surface-container rounded border border-surface-container-high">
        <h3 className="font-bold mb-4">Add New Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Source Method</label>
            <select className="w-full border rounded px-3 py-2" value={newItemSource} onChange={(e) => setNewItemSource(e.target.value)}>
              <option value="upload">Upload File(s)</option>
              <option value="embed">Paste Embed Link (YouTube/Vimeo)</option>
            </select>
          </div>
          {newItemSource === 'embed' && (
            <div>
              <label className="block text-sm mb-1">Item Type</label>
              <select className="w-full border rounded px-3 py-2" value={newItemType} onChange={(e) => setNewItemType(e.target.value)}>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
          )}
        </div>

        {newItemSource === 'upload' ? (
          <div>
            <label className="block text-sm mb-1 text-on-surface-variant">Select multiple files at once. Images and videos will be auto-detected.</label>
            <input type="file" multiple accept="image/*,video/*" onChange={handleStageMultipleFiles} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm mb-1">Embed URL</label>
                <input type="url" placeholder="e.g. https://www.youtube.com/embed/..." value={embedUrl} onChange={(e) => { setEmbedUrl(e.target.value); setEmbedError(''); }} className={`w-full border rounded px-3 py-2 ${embedError ? 'border-red-400' : ''}`} />
              </div>
              <button onClick={handleAddEmbed} className="bg-brand-gold text-primary px-4 py-2 rounded font-bold hover:bg-secondary-container">
                Stage Embed
              </button>
            </div>
            {embedError && <p className="text-red-600 text-xs font-bold">{embedError}</p>}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {activeItems.map((item, index) => (
          <div key={item.id} className={`flex items-center gap-4 p-3 border rounded shadow-sm ${item.isLocal ? 'bg-yellow-50 border-brand-gold/30' : 'bg-surface-container-lowest border-surface-container-high'}`}>
            {/* Ordering Controls */}
            <div className="flex flex-col gap-1 items-center">
              <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 rounded bg-surface hover:bg-surface-container disabled:opacity-30">↑</button>
              <input 
                type="number" 
                value={item.sort_order} 
                onChange={(e) => handleOrderChange(item.id, e.target.value)}
                className="w-12 text-center text-xs border rounded p-1"
                title="Explicit Sort Order"
              />
              <button onClick={() => moveItem(index, 1)} disabled={index === activeItems.length - 1} className="p-1 rounded bg-surface hover:bg-surface-container disabled:opacity-30">↓</button>
            </div>
            
            {/* Thumbnail */}
            <div className="w-16 h-16 flex-shrink-0 bg-surface-container overflow-hidden rounded relative">
              {item.source_type === 'upload' && item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover"></video>
              ) : (
                <img src={item.thumbnail_url} alt="Thumb" className="w-full h-full object-cover" />
              )}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-white text-xs font-bold">▶</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 items-center mb-1">
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">{item.type}</span>
                <span className="text-xs bg-brand-gold/20 text-primary px-2 py-0.5 rounded uppercase border border-brand-gold/40">{item.source_type}</span>
                {item.isLocal && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded font-bold">STAGED</span>}
              </div>
              <p className="text-sm truncate text-on-surface-variant" title={item.file ? item.file.name : item.url}>{item.file ? item.file.name : item.url}</p>
            </div>

            {/* Remove Action */}
            <button onClick={() => handleRemove(item.id)} className="text-red-600 hover:bg-red-50 p-2 rounded text-sm font-bold">
              {item.isLocal ? "Discard" : "Remove"}
            </button>
          </div>
        ))}
        {activeItems.length === 0 && <p className="text-center text-on-surface-variant py-4">No gallery items.</p>}
      </div>
    </section>
  );
}
