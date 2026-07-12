import React, { useState, useEffect, useRef } from "react";
import { Icon, WhatsAppIcon } from "./Icons";

export function Contact() {
  const [formStatus, setFormStatus] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  // Fix #5: 30-second cooldown after successful submission to prevent spam
  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownRef.current);
  }, [cooldown > 0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (cooldown > 0) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type='submit']");

    setFormStatus("sending");
    submitButton.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed");
      }

      form.reset();
      setFormStatus("success");
      setCooldown(30);
    } catch (error) {
      setFormStatus("error");
    } finally {
      submitButton.disabled = false;
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-brand-gold/20 bg-surface-container text-white" id="contact">
      <iframe
        title="MEC Chennai map background"
        src="https://www.google.com/maps?q=Plot%20No.%2053%2C%20Sri%20Devi%20Nagar%2C%20Beemanthangal%2C%20Sriperumbudur%20Tk%2C%20Kancheepuram%20Dist%20-%20602105&output=embed"
        className="pointer-events-none absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        sandbox="allow-scripts"
      />
      <div className="absolute inset-0 bg-primary/20" />
      <div className="relative z-10 mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop">
        <div className="overflow-hidden rounded border border-surface-container-high bg-white/95 shadow-ambient-lg backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="order-2 lg:order-1 relative space-y-10 border-t border-surface-container-high bg-primary/5 p-6 sm:p-8 lg:border-t-0 lg:border-r md:p-12">
              <div className="relative z-10">
                <h2 className="mb-4 font-headline text-3xl sm:text-4xl font-bold text-primary md:text-5xl">Visit <span className="text-brand-gold">Our Office</span></h2>
                <div className="mb-8 h-1 w-16 bg-brand-gold" />
                <div className="mb-12 space-y-6">
                  <div className="relative mb-8 h-48 sm:h-64 overflow-hidden rounded border border-brand-gold/20 bg-surface-container shadow-inner">
                    <iframe
                      title="MEC Chennai location map"
                      src="https://www.google.com/maps?q=Plot%20No.%2053%2C%20Sri%20Devi%20Nagar%2C%20Beemanthangal%2C%20Sriperumbudur%20Tk%2C%20Kancheepuram%20Dist%20-%20602105&output=embed"
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      sandbox="allow-scripts"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 font-label text-sm uppercase tracking-widest text-brand-gold">Corporate Headquarters</h3>
                    <p className="max-w-md font-headline text-[20px] leading-relaxed text-primary md:text-[22px]">
                      Plot No. 53, Sri Devi Nagar, Beemanthangal,<br />
                      Sriperumbudur Tk.,<br />
                      Kancheepuram Dist. - 602 105
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 border-t border-primary/10 pt-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-label text-xs uppercase tracking-wider text-brand-gold">Direct Lines</h3>
                    <p className="font-body text-on-surface hover:text-brand-gold transition-colors">
                      <a href="tel:+919496928266">+91 94969 28266</a>
                    </p>
                    <p className="font-body text-on-surface hover:text-brand-gold transition-colors">
                      <a href="tel:+919037101261">+91 90371 01261</a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-label text-xs uppercase tracking-wider text-brand-gold">Email Inquiry</h3>
                    <p className="font-body text-on-surface hover:text-brand-gold transition-colors">
                      <a href="mailto:mec.chennai2016@gmail.com">mec.chennai2016@gmail.com</a>
                    </p>
                  </div>
                  <a 
                    href="https://wa.me/919496928266" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-label text-on-surface sm:col-span-2 flex items-center gap-3 hover:text-[#25D366] transition-colors group"
                  >
                    <div className="w-8 h-8 bg-[#25D366] rounded-full p-1.5 shadow-sm transition-transform group-hover:scale-110 flex items-center justify-center">
                      <WhatsAppIcon className="h-full w-full text-white" />
                    </div>
                    <p className="font-label text-on-surface group-hover:text-[#25D366] transition-colors">
                      WhatsApp Support: <span className="text-primary font-bold group-hover:text-[#25D366]">+91 94969 28266</span>
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-surface-container-lowest p-6 sm:p-8 md:p-12">
              <div className="mb-8">
                <h2 className="mb-2 font-headline text-headline-md text-primary">Send a Message</h2>
                <p className="font-body text-sm text-on-surface-variant">Discuss your next infrastructure project with our experts.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY} />
                <input type="hidden" name="subject" value="New enquiry from MEC website" />
                <input type="hidden" name="from_name" value="Major Engineering Construction Website" />
                <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
                <Input id="name" label="Name" placeholder="Your Name" required />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input id="phone" label="Phone" placeholder="Your Phone" type="tel" required />
                  <Input id="email" label="Email" placeholder="Your Email" type="email" required />
                </div>
                <label className="block space-y-2" htmlFor="message">
                  <span className="font-label text-xs uppercase tracking-wider text-primary">Message</span>
                  <textarea className="field min-h-32 resize-none" id="message" name="message" placeholder="How can we help you?" rows="4" required />
                </label>
                <button className="flex w-full items-center justify-center gap-2 rounded bg-brand-gold py-4 font-label text-primary shadow-lg transition hover:bg-secondary-container hover:shadow-xl disabled:cursor-wait disabled:opacity-70" type="submit" disabled={formStatus === "sending" || cooldown > 0}>
                  {formStatus === "sending" ? "Sending..." : cooldown > 0 ? `Please wait (${cooldown}s)` : "Connect Us"}
                  <Icon>arrow_forward</Icon>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {formStatus === "success" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/40 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="max-w-sm rounded bg-white p-8 text-center shadow-ambient-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
              <Icon className="text-[28px]">check</Icon>
            </div>
            <h3 className="mb-2 font-headline text-[24px] text-primary">Thank You</h3>
            <p className="mb-6 font-body text-on-surface-variant">We will connect you soon.</p>
            <button
              className="rounded bg-brand-gold px-6 py-3 font-label text-primary shadow-md transition hover:bg-secondary-container"
              type="button"
              onClick={() => setFormStatus(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {formStatus === "error" && (
        <div className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded bg-white px-5 py-4 text-center font-body text-primary shadow-ambient-lg">
          Something went wrong. Please try again or contact us on WhatsApp.
        </div>
      )}
    </section>
  );
}

function Input({ id, label, type = "text", placeholder, required = false }) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="font-label text-xs uppercase tracking-wider text-primary">{label}</span>
      <input className="field" id={id} name={id} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}
