import React from "react";
import { Icon } from "./Icons";

const servicesList = [
  ["foundation", "Girder Launching", "Precision placement and secure launching of massive bridge girders, ensuring structural integrity across vast spans."],
  ["factory", "Pre-Engineered Building (PEB)", "Rapid, reliable erection of PEB structures for industrial facilities, optimizing time without compromising strength."],
  ["plumbing", "Pipeline Fabrication & Erection", "Expert welding, fabrication, and installation of complex heavy-duty pipeline networks for industrial applications."],
  ["precision_manufacturing", "Machinery Shifting", "Safe, calculated relocation and positioning of heavy industrial machinery within complex operational environments."],
];

export const Services = React.memo(function Services() {
  return (
    <section className="bg-primary-container py-24 text-white relative z-10" id="services">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-4 font-headline text-3xl sm:text-4xl md:text-5xl font-bold">Our <span className="text-brand-gold">Services</span></h2>
          <div className="mx-auto mb-6 h-1 w-16 bg-brand-gold" />
          <p className="mx-auto max-w-2xl px-4 font-body text-base sm:text-lg text-on-primary-container">Specialized mechanical and structural erection solutions executed with mathematical precision.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {servicesList.map(([icon, title, text]) => (
            <article className="group rounded border border-brand-gold/50 bg-primary-container p-6 md:p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-surface hover:shadow-ambient-lg" key={title}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded bg-surface/10 text-white transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-brand-gold">
                <Icon className="text-[32px]">{icon}</Icon>
              </div>
              <h3 className="mb-3 font-headline text-lg sm:text-xl md:text-2xl font-semibold text-brand-gold transition-colors">{title}</h3>
              <p className="font-body text-sm sm:text-base text-inverse-on-surface/80 transition-colors group-hover:text-on-surface">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
