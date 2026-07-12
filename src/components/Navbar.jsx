import React, { useEffect, useState } from "react";
import { Icon } from "./Icons";

const navItems = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#gallery", id: "gallery", label: "Gallery" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export function Navbar({ aboutContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        // Trigger exactly when the About section reaches the bottom of the 64px navbar
        const reachedAbout = aboutSection.getBoundingClientRect().top <= 64;
        setScrolled(reachedAbout);
        if (!reachedAbout) setMenuOpen(false);
      }
      
      const current = Array.from(document.querySelectorAll("section[id]")).find((section) => {
        const top = section.getBoundingClientRect().top;
        return top <= 120 && top + section.offsetHeight > 120;
      });
      setActive(current?.id ?? "");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-600 ${scrolled ? "bg-white py-2 shadow-md" : "bg-transparent py-4"}`} id="navbar">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop relative">
        <a href="/#top" className="flex items-center gap-3">
          <img src={aboutContent.logoUrl} alt="MEC Logo" className="h-12 w-auto rounded bg-white p-1 shadow-sm transition-transform hover:scale-105 duration-300" />
          <span className={`hidden font-headline text-3xl md:text-4xl font-bold tracking-tight transition-colors sm:block ${scrolled ? "text-primary" : "text-white drop-shadow-md"}`}>
            MEC
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-6 transition-all duration-500 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`font-label text-label-md transition-colors hover:text-brand-gold ${
                active === item.id ? "text-brand-gold font-bold" : "text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Icon */}
          <div className={`md:hidden transition-all duration-500 overflow-hidden ${scrolled ? "w-12 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="flex items-center justify-center h-11 w-11 rounded text-primary hover:bg-surface-container transition-colors"
              aria-label="Toggle Menu"
            >
              <Icon className="text-[28px]">{menuOpen ? "close" : "menu"}</Icon>
            </button>
          </div>
          <a className="flex items-center gap-2 rounded bg-brand-gold px-4 md:px-6 py-2 md:py-2.5 font-label text-sm md:text-label-md text-primary shadow-md transition hover:bg-secondary-container hover:shadow-lg" href="/#contact">
            Contact Us
            <Icon className="text-[18px]">arrow_forward</Icon>
          </a>
        </div>
      </div>
      
      {/* Mobile/Hamburger Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-surface-container transition-all duration-300 origin-top ${menuOpen && scrolled ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col py-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-6 py-4 font-label text-label-md transition-colors hover:bg-surface-container ${
                active === item.id ? "text-brand-gold font-bold bg-primary/5" : "text-on-surface"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
