import React, { useEffect, useState, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import { aboutContent as staticAboutContent } from "./siteData";
import { supabase } from "./supabaseClient";

// Import refactored UI components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { CTABanner } from "./components/CTABanner";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer, FloatingWhatsApp } from "./components/Footer";

// Lazy loaded routes for better performance
const AdminPanel = React.lazy(() => import("./AdminPanel"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy"));
const ServiceTemplate = React.lazy(() => import("./components/pSEO/ServiceTemplate").then(m => ({ default: m.ServiceTemplate })));

/*
 * SECURITY REMINDER — Manual actions required (cannot be fixed from codebase):
 *
 * 1. SUPABASE RLS: Verify Row Level Security is ENABLED on `site_content` and `gallery_items`.
 *    - Public SELECT for anon + authenticated
 *    - INSERT/UPDATE/DELETE restricted to authenticated only
 *    - Check at: https://supabase.com/dashboard/project/fssfmzwndxvvrtdoorsi/editor
 *
 * 2. SECURITY HEADERS: Add CSP, X-Frame-Options, HSTS etc. on your hosting platform.
 */

function App() {
  const [siteData, setSiteData] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: sData } = await supabase.from('site_content').select('*').eq('id', 1).single();
      const { data: gData } = await supabase.from('gallery_items').select('*').order('sort_order', { ascending: true });
      setSiteData(sData);
      setGalleries(gData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div className="min-h-screen bg-primary flex items-center justify-center text-white">Loading...</div>;

  const dynamicAbout = {
    ...staticAboutContent,
    imageUrl: siteData?.about_image_url || staticAboutContent.imageUrl,
    brochureImageUrl: siteData?.brochure_cover_url || staticAboutContent.brochureImageUrl,
    brochureUrl: siteData?.brochure_pdf_url || staticAboutContent.brochureUrl
  };

  return (
    <>
      <Navbar aboutContent={dynamicAbout} />
      <Hero aboutContent={dynamicAbout} />
      <About aboutContent={dynamicAbout} />
      <Services />
      <CTABanner aboutContent={dynamicAbout} />
      <Gallery galleryItems={galleries} />
      <Contact />
      <Footer aboutContent={dynamicAbout} />
      <FloatingWhatsApp />
    </>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-primary flex items-center justify-center text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/portal-manage-mec" element={<AdminPanel />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/services/:serviceSlug" element={<ServiceTemplate />} />
          <Route path="/services/:serviceSlug/:locationSlug" element={<ServiceTemplate />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
