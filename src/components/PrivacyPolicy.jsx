import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer, FloatingWhatsApp } from "./Footer";
import { supabase } from "../supabaseClient";
import { aboutContent as staticAboutContent } from "../siteData";

export default function PrivacyPolicy() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: sData } = await supabase.from('site_content').select('*').eq('id', 1).single();
      setSiteData(sData);
      setLoading(false);
    }
    loadData();
    window.scrollTo(0, 0);

    // Dynamic SEO
    document.title = "Privacy Policy | Major Engineering Construction";
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', "Privacy Policy for Major Engineering Construction (MEC). Learn about how we handle user data and the information collected via the contact form.");
    }
  }, []);

  if (loading) return <div className="min-h-screen bg-primary flex items-center justify-center text-white">Loading...</div>;

  const dynamicAbout = {
    ...staticAboutContent,
    imageUrl: siteData?.about_image_url || staticAboutContent.imageUrl,
    brochureImageUrl: siteData?.brochure_cover_url || staticAboutContent.brochureImageUrl,
    brochureUrl: siteData?.brochure_pdf_url || staticAboutContent.brochureUrl
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body">
      <Navbar aboutContent={dynamicAbout} />
      
      <main className="flex-grow pt-32 pb-16 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto w-full text-on-surface-variant relative z-10">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Privacy Policy</h1>
          <div className="h-1 w-16 bg-brand-gold mx-auto md:mx-0 mb-4" />
        </div>

        <div className="space-y-6 leading-relaxed bg-white p-6 md:p-10 rounded border border-surface-container-high shadow-ambient">
          <p>
            Major Engineering Construction ("MEC," "we," "our," or "us") respects your privacy. This policy explains what information we collect through this website and how we use it.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">Information We Collect</h2>
          <p>
            When you submit our Contact form, we collect the information you provide, which may include your name, email address, phone number, and message content. This is the only personal information we collect through this website.
          </p>
          <p>
            We do not use cookies, analytics tools, or tracking technologies of any kind on this website.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information submitted through the Contact form solely to respond to your inquiry and communicate with you about our services. We do not use this information for marketing, advertising, or any purpose unrelated to your inquiry.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">How We Store Your Information</h2>
          <p>
            Contact form submissions are stored securely in our database, hosted by Supabase. Access to this data is restricted to authorized MEC personnel only.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">Sharing Your Information</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties, except where required to operate this website (such as our database hosting provider, Supabase) or where required by law.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">Data Retention</h2>
          <p>
            We retain contact form submissions for as long as necessary to respond to your inquiry and for our business records, unless you request deletion.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of any personal information you've submitted to us by contacting us using the details below.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>

          <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4 border-t border-surface-container pt-8">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal information, contact us at:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2 text-primary font-medium">
            <li><strong>Email:</strong> <a href="mailto:mec.chennai2016@gmail.com" className="hover:text-brand-gold transition-colors">mec.chennai2016@gmail.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+919496928266" className="hover:text-brand-gold transition-colors">+91 94969 28266</a></li>
          </ul>
        </div>
      </main>

      <Footer aboutContent={dynamicAbout} />
      <FloatingWhatsApp />
    </div>
  );
}
