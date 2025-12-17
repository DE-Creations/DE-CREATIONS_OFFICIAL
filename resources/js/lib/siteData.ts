export const siteData = {
  company: {
    name: "DE Creations",
    fullName: "DE Creations (Pvt) Ltd",
    tagline: "Your One-Stop Digital Transformation Partner",
    email: "info@decreations.lk",
    phone: "+94 77 300 44 83",
    location: "Colombo, Sri Lanka",
  },
  services: [
    {
      id: "web-development",
      title: "Web Development",
      shortDescription:
        "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
      features: [
        "Responsive website design",
        "E-commerce solutions",
        "Progressive Web Apps (PWA)",
        "Content Management Systems",
        "Website maintenance & support",
        "Performance optimization",
      ],
      icon: "globe",
    },
    {
      id: "software-development",
      title: "Software Development",
      shortDescription: "Tailored software solutions that streamline your business operations and drive efficiency.",
      features: [
        "Custom business applications",
        "Enterprise software solutions",
        "API development & integration",
        "Cloud-based solutions",
        "Mobile app development",
        "Legacy system modernization",
      ],
      icon: "code",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      shortDescription: "Data-driven marketing strategies that amplify your brand presence and generate quality leads.",
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click advertising",
        "Social media marketing",
        "Content marketing",
        "Email marketing campaigns",
        "Analytics & reporting",
      ],
      icon: "trending-up",
    },
  ],
  portfolio: {
    web: [
      {
        id: 1,
        title: "Hafsa Poultry Mart",
        description:
          "A finance management system that manages all financial transactions in the business. Laravel & Vue.js project.",
        category: "web",
        location: "Sri Lanka",
        image: "hafsa",
      },
      {
        id: 2,
        title: "Paris Transfer & Tours",
        description:
          "A booking system that receives bookings directly from clients with admin panel for business owners. Laravel & Vue.js project.",
        category: "web",
        location: "France",
        image: "paris",
      },
      {
        id: 3,
        title: "Apex Safety",
        description: "An eye-catching web design for business showcase. HTML, CSS, JS, PHP.",
        category: "web",
        location: "New Zealand",
        image: "apex",
      },
    ],
    software: [
      {
        id: 4,
        title: "Edirisinghe Medi Enterprises",
        description: "A point of sales (POS) system that we custom-made for our customer's request.",
        category: "software",
        image: "ediri",
      },
      {
        id: 5,
        title: "Katuwana Enterprises",
        description: "A tax invoice tool we created for fuel stations to manage VAT invoices.",
        category: "software",
        image: "tax",
      },
      {
        id: 6,
        title: "Jayamini Motor Service",
        description: "A system to manage off-services and management.",
        category: "software",
        image: "jayamini",
      },
    ],
    marketing: [
      {
        id: 7,
        title: "Huwamaru.lk",
        description: "We manage all social media campaigns of huwamaru.lk e-commerce website.",
        category: "marketing",
        image: "huwamaru",
      },
      {
        id: 8,
        title: "Paris Transfer & Tours",
        description: "We manage all social media campaigns of Paris Transfers.",
        category: "marketing",
        image: "paris-marketing",
      },
      {
        id: 9,
        title: "Lite Cinemas",
        description: "We manage the social media campaigns of Lite Cinemas.",
        category: "marketing",
        image: "amity",
      },
    ],
  },
  team: [
    {
      id: 1,
      name: "Dilusha Perera",
      role: "Founder & CEO",
      image: "dilusha",
    },
    {
      id: 2,
      name: "Amindu Dulanjana",
      role: "Head of Operations",
      image: "amindu",
    },
    {
      id: 3,
      name: "Sasindu De Silva",
      role: "Head of Development",
      image: "sasindu",
    },
  ],
  stats: [
    { value: "150+", label: "Projects Delivered", icon: "folder-check" },
    { value: "120+", label: "Happy Clients", icon: "smile" },
    { value: "5+", label: "Years Experience", icon: "calendar" },
    { value: "98%", label: "Client Retention", icon: "heart-handshake" },
  ],
  whyChooseUs: [
    {
      title: "Expert Team",
      description: "Skilled professionals with years of industry experience",
    },
    {
      title: "Tailored Solutions",
      description: "Custom strategies designed for your unique business needs",
    },
    {
      title: "Proven Results",
      description: "Track record of delivering measurable business outcomes",
    },
    {
      title: "Ongoing Support",
      description: "Dedicated support and maintenance after project delivery",
    },
  ],
};

export const serviceOptions = [
  { value: "web-development", label: "Web Development Service" },
  { value: "software-development", label: "Software Development Service" },
  { value: "digital-marketing", label: "Digital Marketing Service" },
];
