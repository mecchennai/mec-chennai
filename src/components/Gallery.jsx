import React from "react";

export function Gallery({ galleryItems }) {
  const ordered = [...galleryItems].sort((a, b) => a.sort_order - b.sort_order);
  
  // Dynamic column count logic based on actual item count to prevent empty columns
  const itemCount = ordered.length;
  let dynamicColumns = "columns-1"; // Fallback for 0-1 items
  if (itemCount >= 3) {
    dynamicColumns = "columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3";
  } else if (itemCount === 2) {
    dynamicColumns = "columns-1 gap-4 space-y-4 sm:columns-2 md:columns-2";
  }

  return (
    <section className="bg-surface py-24 relative z-10" id="gallery">
      <div className="mx-auto mb-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <h2 className="mb-4 font-headline text-3xl sm:text-4xl font-bold text-primary md:text-5xl">Gallery</h2>
        <div className="mb-6 h-1 w-16 bg-brand-gold" />
      </div>
      <div className="mx-auto max-w-5xl px-margin-mobile md:px-margin-desktop">
        <div className="relative h-[600px] overflow-hidden rounded bg-white p-4 shadow-ambient">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
          <div className="animate-scroll-up">
            <div className="flex flex-col gap-4">
              <div className={dynamicColumns}>
                {ordered.map((item, index) => (
                  <figure className="group relative break-inside-avoid overflow-hidden rounded shadow-md" key={`a-${item.id}-${index}`}>
                    {item.source_type === "embed" ? (
                      <div className="relative w-full pb-[56.25%] bg-black rounded overflow-hidden">
                        <iframe 
                          src={item.url} 
                          className="absolute top-0 left-0 w-full h-full border-0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin"
                          loading="lazy"
                        />
                      </div>
                    ) : item.type === "video" ? (
                      <video 
                        src={item.url} 
                        className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        poster={item.thumbnail_url}
                      />
                    ) : (
                      <img src={item.thumbnail_url || item.url} alt={item.caption} loading="lazy" decoding="async" className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" />
                    )}
                    {item.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-primary/75 px-3 py-2 font-label text-xs text-white opacity-0 transition group-hover:opacity-100 z-20">{item.caption}</figcaption>}
                  </figure>
                ))}
              </div>
              <div className={`${dynamicColumns}`} aria-hidden="true">
                {ordered.map((item, index) => (
                  <figure className="group relative break-inside-avoid overflow-hidden rounded shadow-md" key={`b-${item.id}-${index}`}>
                    {item.source_type === "embed" ? (
                      <div className="relative w-full pb-[56.25%] bg-black rounded overflow-hidden">
                        <iframe 
                          src={item.url} 
                          className="absolute top-0 left-0 w-full h-full border-0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin"
                          loading="lazy"
                        />
                      </div>
                    ) : item.type === "video" ? (
                      <video 
                        src={item.url} 
                        className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        poster={item.thumbnail_url}
                      />
                    ) : (
                      <img src={item.thumbnail_url || item.url} alt={item.caption} loading="lazy" decoding="async" className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" />
                    )}
                    {item.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-primary/75 px-3 py-2 font-label text-xs text-white opacity-0 transition group-hover:opacity-100 z-20">{item.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
