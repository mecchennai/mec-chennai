import React from "react";
import { Icon } from "./Icons";

export const CTABanner = React.memo(function CTABanner({ aboutContent }) {
  const brochureCards = [
    { opacityClass: "opacity-40", positionClass: "-rotate-6 translate-x-[-8px] translate-y-[8px] md:translate-x-[-16px] md:translate-y-[16px]" },
    { opacityClass: "opacity-70", positionClass: "rotate-3 translate-x-[4px] translate-y-[-4px] md:translate-x-[8px] md:translate-y-[-8px]" },
    { opacityClass: "opacity-100", positionClass: "relative z-10" },
  ];

  return (
    <section className="overflow-hidden border-y border-brand-gold/20 bg-gradient-to-b from-primary to-primary-container py-4 relative z-10">
      <div className="mx-auto max-w-container-max px-margin-mobile py-8 md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="relative order-1 flex h-[230px] w-full items-center justify-center">
            {brochureCards.map((card, index) => (
              <div
                className={`${index === 2 ? "relative" : "absolute"} h-full w-[140px] sm:w-[160px] md:w-[192px] overflow-hidden rounded border border-white/20 bg-white shadow-xl ${
                  card.positionClass
                }`}
                key={card.opacityClass}
              >
                <img src={aboutContent.brochureImageUrl || aboutContent.heroPosterUrl} alt={index === 2 ? "MEC brochure cover" : ""} loading="lazy" decoding="async" className={`h-full w-full object-cover ${card.opacityClass}`} />
                {index === 2 && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 rounded bg-brand-gold px-2 py-0.5 font-label text-[10px] uppercase tracking-widest text-primary">Company Profile</div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="order-2 text-center lg:text-left space-y-4">
            <h2 className="font-headline text-2xl sm:text-3xl text-white font-semibold">Ready to build the future with us?</h2>
            <p className="font-body text-sm sm:text-base text-inverse-on-surface/90 max-w-xl mx-auto lg:mx-0">
              Download our comprehensive company profile to explore our complete capabilities, past projects, and technical specifications.
            </p>
            <div className="pt-2">
              <a 
                href={aboutContent.brochureUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded bg-brand-gold px-6 py-3 font-label text-sm text-primary shadow-lg transition hover:-translate-y-1 hover:bg-secondary-container hover:shadow-xl"
              >
                Download Profile (PDF)
                <Icon className="text-[18px]">download</Icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
