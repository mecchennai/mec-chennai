import React, { useState, useEffect } from "react";
import { Icon, WhatsAppIcon } from "./Icons";

export const Footer = React.memo(function Footer({ aboutContent }) {
  return (
    <footer className="border-t border-white/5 bg-[#0A1F44] pt-16 pb-8 text-white">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          
          {/* 1. Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={aboutContent.logoUrl} alt="MEC Logo" loading="lazy" decoding="async" className="h-10 w-auto rounded bg-white p-1" />
              <span className="font-label text-lg font-bold text-white">MEC</span>
            </div>
            <p className="font-body text-sm text-white/80 leading-relaxed">
              Building Structures. Building Trust.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h4 className="font-headline text-lg font-semibold text-brand-gold">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <a href="/#top" className="font-body text-sm transition-colors hover:text-brand-gold w-fit">Home</a>
              <a href="/#about" className="font-body text-sm transition-colors hover:text-brand-gold w-fit">About Us</a>
              <a href="/#services" className="font-body text-sm transition-colors hover:text-brand-gold w-fit">Services</a>
              <a href="/#gallery" className="font-body text-sm transition-colors hover:text-brand-gold w-fit">Gallery</a>
              <a href="/#contact" className="font-body text-sm transition-colors hover:text-brand-gold w-fit">Contact Us</a>
              <a href="/privacy-policy" className="font-body text-sm transition-colors hover:text-brand-gold w-fit">Privacy Policy</a>
            </div>
          </div>

          {/* 3. Contact */}
          <div className="space-y-4">
            <h4 className="font-headline text-lg font-semibold text-brand-gold">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Icon className="text-[18px] mt-0.5 text-white/60">phone</Icon>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919496928266" className="font-body text-sm transition-colors hover:text-brand-gold">+91 94969 28266</a>
                  <a href="tel:+919037101261" className="font-body text-sm transition-colors hover:text-brand-gold">+91 90371 01261</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon className="text-[18px] mt-0.5 text-white/60">mail</Icon>
                <a href="mailto:mec.chennai2016@gmail.com" className="font-body text-sm transition-colors hover:text-brand-gold break-all">mec.chennai2016@gmail.com</a>
              </div>
            </div>
          </div>

          {/* 4. Location */}
          <div className="space-y-4">
            <h4 className="font-headline text-lg font-semibold text-brand-gold">Location</h4>
            <div className="flex items-start gap-3">
              <Icon className="text-[18px] mt-0.5 text-white/60">location_on</Icon>
              <address className="font-body text-sm not-italic leading-relaxed">
                <span className="block font-semibold text-white mb-1">Major Engineering Construction</span>
                Plot No. 53, Sri Devi Nagar, Beemanthangal,<br />
                Sriperumbudur Tk.,<br />
                Kancheepuram Dist. - 602 105
              </address>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col items-center justify-center border-t border-white/10 pt-8">
          <p className="font-body text-sm text-white/60 text-center">
            © 2026 Major Engineering Construction (MEC). All Rights Reserved. | Powered by Avorawebstudios
          </p>
        </div>
      </div>
    </footer>
  );
});

export function FloatingWhatsApp() {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerElement = document.querySelector("footer");
      const footerHeight = footerElement ? footerElement.offsetHeight : 120;
      
      // Lift the button when it gets near the footer height
      setNearFooter(totalHeight - scrollPosition < footerHeight + 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <a
      href="https://wa.me/919496928266?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,8,30,0.35)] border border-white/80 transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] hover:shadow-[0_6px_20px_rgba(0,8,30,0.5)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 active:scale-95 ${
        nearFooter ? "bottom-28" : "bottom-6"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
    </a>
  );
}
