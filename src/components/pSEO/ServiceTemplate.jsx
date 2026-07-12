import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { services, locations, projects } from '../../data/seoData';

export function ServiceTemplate() {
  const { serviceSlug, locationSlug } = useParams();
  const [service, setService] = useState(null);
  const [location, setLocation] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    const srv = services.find(s => s.slug === serviceSlug);
    if (srv) {
      setService(srv);
      
      let loc = null;
      if (locationSlug && locations[locationSlug]) {
        loc = locations[locationSlug];
        setLocation(loc);
      } else {
        setLocation(null);
      }
      
      const projs = projects.filter(p => p.serviceSlug === serviceSlug && (!loc || p.locationSlug === locationSlug));
      setRelatedProjects(projs);

      // Dynamic SEO title & description injection
      const computedTitle = loc 
        ? `${srv.name} in ${loc.name}, ${loc.state} | Major Engineering Construction` 
        : `${srv.name} | Major Engineering Construction`;
      document.title = computedTitle;

      const computedDesc = loc 
        ? `${srv.name} services in ${loc.name}, ${loc.state} by Major Engineering Construction. ${srv.shortDefinition}`
        : `${srv.name} services by Major Engineering Construction. ${srv.shortDefinition}`;
      
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', computedDesc);
      }
    } else {
      document.title = "Service Not Found | Major Engineering Construction";
    }
  }, [serviceSlug, locationSlug]);

  if (!service) {
    return <div className="min-h-screen bg-primary flex items-center justify-center text-white">Service not found.</div>;
  }

  const pageTitle = location ? `${service.name} in ${location.name}, ${location.state}` : service.name;
  const aeoAnswer = location 
    ? `${service.name} in ${location.name} refers to MEC's specialized engineering solutions tailored for infrastructure and industrial projects in ${location.state}. ${service.shortDefinition}`
    : `At MEC, ${service.name.toLowerCase()} refers to our specialized engineering solutions. ${service.shortDefinition}`;

  // JSON-LD Schemas
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Major Engineering Construction",
    "image": "https://mec.com/logo.png", // Placeholder, ideally actual URL
    "description": "Leading structural and mechanical erection services company.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 53, Sri Devi Nagar, Beemanthangal",
      "addressLocality": "Sriperumbudur Tk., Kancheepuram Dist.",
      "addressRegion": "Tamil Nadu",
      "postalCode": "602105",
      "addressCountry": "IN"
    },
    "telephone": "+919496928266"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Major Engineering Construction"
    },
    "areaServed": location ? {
      "@type": "State",
      "name": location.state
    } : {
      "@type": "Country",
      "name": "India"
    },
    "description": service.longDescription
  };

  return (
    <div className="bg-background text-on-background min-h-screen pt-24 pb-16">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-6">
          <Link to="/" className="text-primary hover:text-secondary font-semibold">&larr; Back to Home</Link>
        </div>
        
        {/* AEO First Section */}
        <div className="bg-surface-container rounded-lg p-8 shadow-sm mb-12">
          <h1 className="font-montserrat text-4xl font-bold mb-4 text-primary">
            {pageTitle}
          </h1>
          <p className="font-work-sans text-xl leading-relaxed text-on-surface-variant font-medium">
            <strong>What is {service.name.toLowerCase()}{location ? ` in ${location.name}` : ''}?</strong> {aeoAnswer}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="font-montserrat text-2xl font-bold mb-4 text-primary">About This Service</h2>
              <p className="font-work-sans text-lg text-on-background leading-relaxed">
                {service.longDescription}
              </p>
            </section>
            
            <section>
              <h2 className="font-montserrat text-2xl font-bold mb-4 text-primary">Our Methodology</h2>
              <ul className="list-disc list-inside font-work-sans text-lg text-on-background space-y-2">
                {service.methodology.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Related Projects */}
            <section>
              <h2 className="font-montserrat text-2xl font-bold mb-4 text-primary">Related Projects</h2>
              {relatedProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedProjects.map((project, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-outline-variant">
                      <h3 className="font-montserrat text-xl font-bold text-primary">{project.name}</h3>
                      <p className="font-work-sans text-on-surface-variant mt-2">
                        Executed by Major Engineering Construction.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-work-sans text-lg text-on-background">No specific featured projects to display at this time.</p>
              )}
            </section>
          </div>

          {/* Sidebar (FAQ) */}
          <div className="md:col-span-1">
            <div className="bg-primary-container text-on-primary-container rounded-lg p-6 sticky top-24 shadow-sm">
              <h2 className="font-montserrat text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-primary-fixed-dim/30 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-work-sans font-bold text-white text-lg mb-2">{faq.question}</h3>
                    <p className="font-work-sans text-inverse-primary leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
