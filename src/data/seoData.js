export const services = [
  {
    slug: 'girder-launching',
    name: 'Girder Launching',
    shortDefinition: 'Girder launching is the precise process of lifting, aligning, and positioning heavy concrete or steel girders to construct bridges and large-scale infrastructure overpasses.',
    longDescription: 'Girder launching is a critical component of bridge construction and other large-scale infrastructure projects. At Major Engineering Construction, we specialize in designing, building, and maintaining structures with small and large-scale scopes. Using advanced hydraulic launching systems and expert engineering methodologies, we ensure seamless alignment and positioning of heavy girder structures. Our team comprises experienced engineers and project managers committed to building under stringent project timelines, ensuring that every project is completed with structural integrity and operational excellence.',
    methodology: [
      'Site preparation and structural assessment.',
      'Deployment of advanced hydraulic launching systems.',
      'Precision lifting and alignment of heavy girders.',
      'Strict adherence to safety protocols and quality inspections.',
    ],
    faqs: [
      {
        question: 'What is girder launching?',
        answer: 'Girder launching involves placing precast or steel girders onto bridge piers using specialized machinery like launching gantries or heavy cranes.'
      },
      {
        question: 'Why is precision important in girder launching?',
        answer: 'Precision ensures structural integrity, safety, and proper load distribution across the bridge span, preventing future mechanical failures.'
      },
      {
        question: 'What equipment is used for girder launching?',
        answer: 'Advanced hydraulic launching systems, heavy-duty cranes, and specialized lifting tackles are primarily used.'
      }
    ]
  },
  {
    slug: 'peb-erection',
    name: 'Pre-Engineered Building (PEB) Erection',
    shortDefinition: 'Pre-Engineered Building (PEB) erection involves assembling factory-manufactured steel structural components on-site to rapidly construct durable and cost-effective commercial and industrial facilities.',
    longDescription: 'PEBs are revolutionizing the construction industry by offering cost-effective, durable, and versatile building solutions. At Major Engineering Construction, we specialize in design, building, and maintaining structures for both commercial and warehouse projects. Our expertise ensures optimized material usage, faster construction timelines, and enhanced structural integrity. With state-of-the-art engineering technology and best practices, we deliver customized PEB solutions that meet the highest standards of durability and functionality.',
    methodology: [
      'Customized design and material optimization.',
      'Factory manufacturing of steel components.',
      'On-site structural assembly and erection.',
      'Quality control and structural integrity verification.'
    ],
    faqs: [
      {
        question: 'What are the advantages of PEB structures?',
        answer: 'PEBs are highly cost-effective, quick to install, offer versatile designs, and require less maintenance compared to traditional buildings.'
      },
      {
        question: 'How long does a PEB erection take?',
        answer: 'Erection timelines depend on the scale of the project, but PEBs typically reduce construction time by 30-50% compared to conventional structures.'
      },
      {
        question: 'Are PEB structures durable?',
        answer: 'Yes, PEBs are built with high-grade steel and advanced engineering, making them highly resistant to extreme weather and heavy industrial use.'
      }
    ]
  },
  {
    slug: 'pipeline-fabrication',
    name: 'Pipeline Fabrication & Erection',
    shortDefinition: 'Pipeline fabrication and erection is the process of constructing and installing complex piping networks for industrial fluid and gas transportation, ensuring leak-proof operations.',
    longDescription: 'Our pipeline fabrication and erection services cater to industries such as oil & gas, water distribution, and various installation of pipelines using high-grade materials like carbon steel and stainless steel to ensure long-lasting performance. Our state-of-the-art precision inspections guarantee leak-proofing and efficient pipeline systems. With a dedicated team of skilled technicians and engineers, we ensure every project meets industry regulations and client expectations.',
    methodology: [
      'Selection of high-grade materials (carbon/stainless steel).',
      'Precision cutting, welding, and fabrication of pipelines.',
      'On-site elevation and secure installation.',
      'Rigorous leak-proofing and quality inspections.'
    ],
    faqs: [
      {
        question: 'What materials are used in pipeline fabrication?',
        answer: 'We primarily use high-grade materials like carbon steel and stainless steel to ensure durability and resistance to corrosion.'
      },
      {
        question: 'How do you ensure pipelines are leak-proof?',
        answer: 'We conduct state-of-the-art precision inspections and rigorous quality testing during and after the fabrication and erection processes.'
      },
      {
        question: 'Which industries require pipeline fabrication?',
        answer: 'Industries such as oil & gas, water distribution, and heavy industrial manufacturing rely heavily on specialized pipeline networks.'
      }
    ]
  },
  {
    slug: 'heavy-machinery-shifting',
    name: 'Heavy Machinery Shifting & Structural Erection',
    shortDefinition: 'Heavy machinery shifting is the highly specialized process of relocating, lifting, and installing massive industrial equipment using hydraulic jacks and heavy-duty cranes.',
    longDescription: 'Relocating heavy machinery requires meticulous planning and specialized handling to ensure smooth, safe, and sustainable construction. Major Engineering Construction provides expert machinery shifting and structural erection services using advanced lifting and transportation equipment, including hydraulic jacks, cranes, and heavy lifting machinery. Our precision-driven approach ensures that every relocation or structural erection is executed efficiently while maintaining the integrity and functionality of the equipment.',
    methodology: [
      'Meticulous planning and site assessment.',
      'Deployment of hydraulic jacks and heavy-duty cranes.',
      'Safe lifting and transportation of industrial equipment.',
      'Precise reinstallation with minimal operational downtime.'
    ],
    faqs: [
      {
        question: 'What equipment is used for heavy machinery shifting?',
        answer: 'We utilize advanced lifting equipment including hydraulic jacks, heavy-duty cranes, and specialized transport vehicles.'
      },
      {
        question: 'How do you minimize downtime during machinery relocation?',
        answer: 'Through meticulous planning, precision execution, and utilizing state-of-the-art equipment, we ensure efficient shifting and rapid reinstallation.'
      },
      {
        question: 'Is heavy machinery shifting safe?',
        answer: 'Yes, our precision-driven approach and strict adherence to safety protocols ensure the integrity of the equipment and the safety of our personnel.'
      }
    ]
  }
];

export const locations = {
  'chennai': { name: 'Chennai', state: 'Tamil Nadu' },
  'cheyyar': { name: 'Cheyyar', state: 'Tamil Nadu' },
  'sriperumbudur': { name: 'Sriperumbudur', state: 'Tamil Nadu' },
  'nellore': { name: 'Nellore', state: 'Andhra Pradesh' },
  'gudur': { name: 'Gudur', state: 'Andhra Pradesh' },
  'jammalamadugu': { name: 'Jammalamadugu', state: 'Andhra Pradesh' },
  'mangalore': { name: 'Mangalore', state: 'Karnataka' },
  'indore': { name: 'Indore', state: 'Madhya Pradesh' }
};

export const industries = [
  'Infrastructure',
  'Industrial Manufacturing',
  'Oil & Gas / Pipeline'
];

export const projects = [
  { name: 'SRC Jammalamadugu', serviceSlug: 'girder-launching', locationSlug: 'jammalamadugu' },
  { name: 'Nellore Backwater Project', serviceSlug: 'heavy-machinery-shifting', locationSlug: 'nellore' },
  { name: 'MEIL Chooral Indore', serviceSlug: 'girder-launching', locationSlug: 'indore' },
  { name: 'MEIL Tejani Nagar–Balwada', serviceSlug: 'girder-launching', locationSlug: 'indore' }, // Map to MP/Indore for SEO purposes based on brochure
  { name: 'Kulur Bridge Mangalore', serviceSlug: 'girder-launching', locationSlug: 'mangalore' },
  { name: 'APCO Vidyanagar Gudur', serviceSlug: 'heavy-machinery-shifting', locationSlug: 'gudur' },
  { name: 'Krishnapatnam Port Nellore', serviceSlug: 'heavy-machinery-shifting', locationSlug: 'nellore' },
  { name: 'Sai Ganesh PEB', serviceSlug: 'peb-erection', locationSlug: null },
  { name: 'Grasim Paints Chennai', serviceSlug: 'peb-erection', locationSlug: 'chennai' },
  { name: 'MRF PEB', serviceSlug: 'peb-erection', locationSlug: null },
  { name: 'Royal Enfield Cheyyar', serviceSlug: 'peb-erection', locationSlug: 'cheyyar' },
  { name: 'Value Space PEB', serviceSlug: 'peb-erection', locationSlug: null }
];

export function getSeoRoutes() {
  const routes = [];
  
  // 1. Root service pages (4)
  services.forEach(service => {
    routes.push(`/services/${service.slug}`);
  });

  // 2. Service x Location combos (only where real projects exist)
  const generatedCombos = new Set();
  projects.forEach(project => {
    if (project.locationSlug) {
      const combo = `/services/${project.serviceSlug}/${project.locationSlug}`;
      if (!generatedCombos.has(combo)) {
        routes.push(combo);
        generatedCombos.add(combo);
      }
    }
  });

  return routes;
}
