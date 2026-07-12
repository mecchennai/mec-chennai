import React from "react";
import { Icon } from "./Icons";

export function Hero({ aboutContent }) {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={aboutContent.heroPosterUrl}
        aria-label="MEC construction site background video"
      >
        <source src={aboutContent.heroVideoUrl} type="video/mp4" />
      </video>
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          background: "radial-gradient(circle, rgba(0, 8, 30, 0) 35%, rgba(0, 8, 30, 0.75) 100%)" 
        }} 
      />
      <div className="relative z-20 mx-auto max-w-container-max px-margin-mobile text-center md:px-margin-desktop w-full">
        <h1 className="mx-auto mb-6 max-w-5xl font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] break-words">
          <span style={{ color: "#0A1F44", textShadow: "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.7), 0 0 80px rgba(255,255,255,0.5), 0 2px 6px rgba(255,255,255,1)" }}>MAJOR ENGINEERING</span>
          <br />
          <span className="text-brand-gold" style={{ textShadow: "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.7), 0 0 80px rgba(255,255,255,0.5), 0 2px 6px rgba(255,255,255,1)" }}>CONSTRUCTION</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl font-body text-base sm:text-lg md:text-xl text-inverse-on-surface drop-shadow-md px-4" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)" }}>
          Building Structures. Building Trust. Premier providers of structural and mechanical erection services for large-scale infrastructure projects.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a className="inline-flex items-center justify-center gap-2 rounded bg-brand-gold px-8 py-4 font-label text-primary shadow-lg transition hover:-translate-y-1 hover:bg-secondary-container hover:shadow-xl" href="#services">
            Explore Services
            <Icon>construction</Icon>
          </a>
          <a className="inline-flex items-center justify-center rounded border-2 border-white bg-surface/10 px-8 py-4 font-label text-white backdrop-blur-sm transition hover:bg-white hover:text-primary" href="#about">
            Discover Our Legacy
          </a>
        </div>
      </div>
    </section>
  );
}
