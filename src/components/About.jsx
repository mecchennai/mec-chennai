import React from "react";
import { Icon } from "./Icons";

export function About({ aboutContent }) {
  return (
    <section className="bg-surface py-24 relative z-10" id="about">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 font-headline text-3xl sm:text-4xl text-primary md:text-5xl font-bold">About MEC</h2>
              <div className="mb-6 h-1 w-16 bg-brand-gold" />
              <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">{aboutContent.summary}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {aboutContent.highlights.map((item) => (
                <div className="flex items-start gap-4" key={item.title}>
                  <div className="rounded bg-surface-container p-3 text-brand-gold">
                    <Icon className="text-[32px] fill">{item.icon}</Icon>
                  </div>
                  <div>
                    <h4 className="font-headline text-[18px] font-semibold text-primary">{item.title}</h4>
                    <p className="font-body text-sm text-on-surface-variant">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              {aboutContent.badges.map((badge, idx) => {
                const icons = ["verified", "architecture", "handshake"];
                return (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 font-label text-xs text-primary" key={badge}>
                    <Icon className="text-[16px] text-brand-gold">{icons[idx] || "verified"}</Icon>
                    {badge}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="relative flex h-[420px] w-full items-center justify-center md:h-[500px]">
            <div className="absolute h-full w-full -rotate-2 translate-x-[-6px] translate-y-[6px] md:translate-x-[-12px] md:translate-y-[12px] overflow-hidden rounded border border-surface-container-high bg-white shadow-ambient">
              <img src={aboutContent.imageUrl} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-40" />
            </div>
            <div className="absolute h-full w-full rotate-2 translate-x-[4px] translate-y-[-4px] md:translate-x-[8px] md:translate-y-[-8px] overflow-hidden rounded border border-surface-container-high bg-white shadow-ambient-lg">
              <img src={aboutContent.imageUrl} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-70" />
            </div>
            <div className="relative z-10 h-full w-full overflow-hidden rounded border border-surface-container-high bg-white shadow-ambient-lg">
              <img src={aboutContent.imageUrl} alt={aboutContent.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded border border-surface-container bg-white p-6 shadow-xl z-20 hover:-translate-y-1 transition-transform">
                <div className="rounded bg-primary p-3 text-brand-gold">
                  <Icon className="text-[32px]">workspace_premium</Icon>
                </div>
                <div>
                  <p className="font-display text-[32px] font-bold leading-none text-primary">10+</p>
                  <p className="font-label text-sm uppercase tracking-wider text-on-surface-variant">Years of Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
