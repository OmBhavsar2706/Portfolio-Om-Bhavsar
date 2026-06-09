import { Experience, Project, SkillCategory, Service, Certification, Education, StatItem } from '../types';

export const personalInfo = {
  name: "Om Bhavsar",
  titles: [
    "AI & Machine Learning Engineer"
  ],
  location: "Nashik, Maharashtra, India",
  email: "ombhavsar552@gmail.com",
  phone: "8208461469",
  linkedin: "https://www.linkedin.com/in/ombhavsar2706",
  github: "https://github.com/OmBhavsar2706",
  instagram: "https://www.instagram.com/0mieex?igsh=MTYxcGQ4NnJtd3VwYg==",
  whatsapp: "https://wa.me/918208461469",
  summary: "I am an AI & ML Engineer and Full-Stack Developer based in Nashik, Maharashtra. Currently pursuing a Diploma in Artificial Intelligence & Machine Learning, I work as an AI & Machine Learning Intern at SoftCrowd Technologies Nashik and as a Freelance Full-Stack Engineer."
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "AI & ML Intern",
    company: "SoftCrowd Technologies",
    duration: "June 2026 - Present",
    location: "Nashik, India",
    responsibilities: [
      "Actively researching, analyzing, and applying modern AI/ML algorithms and engineering workflows to client deliverables.",
      "Working closely with complex datasets to perform data preparation, ETL piping, model training, and performance evaluation.",
      "Assisting in embedding fine-tuned Large Language Models and prompt engineering strategies into production-ready software tools.",
      "Collaborating with senior engineers to architect model evaluation checkpoints and automate testing for conversational assistants."
    ],
    achievements: [
      "Designed an automated data preparation script that shortened pre-training pipeline cycles by 25%.",
      "Collaborated on building a production-grade generative summarizer for internal legal documentation verification."
    ]
  },
  {
    id: "exp-2",
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    duration: "April 2026 - Present",
    location: "Nashik, India (Remote)",
    responsibilities: [
      "Designing, developing, and deploying bespoke responsive web applications tailored strictly to commercial business goals.",
      "Integrating production technologies including secure user authentication, transactional email templates, and third-party APIs.",
      "Building robust, server-side REST APIs to cleanly wrap intelligent AI queries and custom search engines behind secure endpoints.",
      "Drafting modern visual interfaces and interactive systems while maintaining strict modularity, clean states, and excellent responsiveness."
    ],
    achievements: [
      "Delivered 2+ end-to-end commercial web products for distinct business sectors with a 100% on-time launch rate.",
      "Architected a custom B2B inventory analytics panel that scaled to support thousands of active SKUs with sub-second queries."
    ]
  },
  {
    id: "exp-3",
    role: "Frontend Developer",
    company: "R-Tech Solutions",
    duration: "Feb 2025 - Apr 2026",
    location: "Nashik, India",
    responsibilities: [
      "Specialized in engineering sleek, semantic, and incredibly responsive interfaces relying heavily on React, Tailwind, and Vite.",
      "Collaborated in a tight team structure beside backend engineers to map API response models and manage global state cleanly.",
      "Identified and cleared critical rendering bottlenecks, standardizing responsive media rules and image sizing guidelines.",
      "Leveraged productivity-boosting AI workflows to shrink feature deployment times and increase frontend code testing coverage."
    ],
    achievements: [
      "Successfully overhauled 3 legacy business platforms, dropping average user interaction delay by 40% and increasing onboarding completions.",
      "Created a unified corporate component kit that shaved weeks off subsequent core template design phases."
    ]
  },
  {
    id: "exp-4",
    role: "C++ Developer Intern",
    company: "CodSoft",
    duration: "Sept 2024 (1 Month)",
    location: "Remote",
    responsibilities: [
      "Developed high-efficiency desktop applications in pure C++, emphasizing memory efficiency and algorithmic accuracy.",
      "Built clean logical models for essential utility projects, utilizing precise object-oriented principles.",
      "Strengthened core code quality, memory diagnostics, and clean debugging workflows in standard shell environments."
    ],
    achievements: [
      "Engineered an interactive Tic-Tac-Toe system featuring an optimized decision-tree AI opponent.",
      "Designed a modular multi-purpose console calculator utilizing robust error exceptions and input tokenization."
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", proficiency: 92 },
      { name: "Java", proficiency: 80 },
      { name: "C", proficiency: 75 },
      { name: "C++", proficiency: 82 },
      { name: "JavaScript", proficiency: 92 },
      { name: "TypeScript", proficiency: 88 }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML & CSS", proficiency: 95 },
      { name: "UI/UX Design", proficiency: 88 },
      { name: "React", proficiency: 94 },
      { name: "JavaScript", proficiency: 92 },
      { name: "Tailwind CSS", proficiency: 95 }
    ]
  },
  {
    category: "Backend Development & Integration",
    skills: [
      { name: "Node.js", proficiency: 88 },
      { name: "Firebase", proficiency: 85 },
      { name: "REST APIs", proficiency: 90 }
    ]
  },
  {
    category: "Artificial Intelligence & Machine Learning",
    skills: [
      { name: "Prompt Engineering", proficiency: 96 },
      { name: "Generative AI", proficiency: 92 }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", proficiency: 86 },
      { name: "Oracle Database", proficiency: 80 },
      { name: "Supabase", proficiency: 85 }
    ]
  },
  {
    category: "Core Technical Skills & Tools",
    skills: [
      { name: "Data Structures & Algorithms (DSA) in Python", proficiency: 85 },
      { name: "Version Control", proficiency: 92 },
      { name: "Production Deployment", proficiency: 86 },
      { name: "Efficient Debugging", proficiency: 90 }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", proficiency: 92 },
      { name: "GitHub", proficiency: 92 },
      { name: "Claude AI", proficiency: 95 },
      { name: "VS Code", proficiency: 95 },
      { name: "LLMs", proficiency: 93 }
    ]
  },
  {
    category: "Soft Skills & Workflow",
    skills: [
      { name: "Problem-Solving & Analytical Skills", proficiency: 95 },
      { name: "Collaboration & Mentorship", proficiency: 92 },
      { name: "Task Management & Deadlines", proficiency: 90 },
      { name: "Direct Client Communication", proficiency: 88 }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "My Thrift Crew",
    description: "A premium fashion-forward collaborative thrift catalog and vintage apparel marketplace, enabling teams to showcase and curate hand-picked aesthetic clothing lines with sub-second responsive performance and modern layout.",
    longDescription: "My Thrift Crew is a bespoke fashion-forward platform for community thrift catalogs and aesthetic apparel collection curations. It allows user collectives to collaboratively organize clothing portfolios, manage vintage styling lines, and present their selections seamlessly on a high-speed, image-optimized modern workspace.",
    thumbnail: "/projects/thrift_crew.jpg",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Guest Sync", "Vercel"],
    features: [
      "Collaborative thrift catalog boards with custom curation sorting triggers",
      "Sub-second responsive search utilizing lightweight client-side tags and indexers",
      "Stunning grid of adaptive responsive clothing cards with fluid image transitions",
      "High-fidelity visual layout prioritizing negative space, modern typography, and clean lines"
    ],
    liveUrl: "https://thrift-crew.vercel.app/",
    githubUrl: "https://github.com/OmBhavsar2706/thrift-crew",
    category: "web"
  },
  {
    id: "proj-2",
    title: "Jersey Unicorn",
    description: "A high-end sports apparel customizer and premium e-commerce platform specializing in exclusive vintage jersey collections and AI-driven kit customization recommendations.",
    longDescription: "Jersey Unicorn is a showcase of elite digital merchandising. It integrates a live kit design tool (badge placements, custom name and numbering overlays, collar types) with a high-speed storefront. Equipped with smart stock-level verification and a simulated client-side AI stylist to suggest matching team apparel based on shopping cart context.",
    thumbnail: "/projects/jersey_unicorn.png",
    tags: ["React", "Vite", "Tailwind CSS", "Express.js", "Node.js", "AI Recommendations", "Razorpay Sim"],
    features: [
      "Real-time kit builder allowing dynamic name, font size, and number customization previews",
      "Interactive AI Suggestion Assistant that advises on custom team palettes and pairing items",
      "Secure payment checkout workflows pre-configured with direct Razorpay UX components",
      "Fully responsive checkout tray with secure local reservation status checkpoints"
    ],
    liveUrl: "https://www.jerseyunicorn.com/",
    githubUrl: "https://github.com/OmBhavsar2706/jersey-unicorn",
    category: "ai"
  }
];

export const services: Service[] = [
  {
    id: "srv-1",
    title: "Full Stack Development",
    description: "Engineering scalable, high-performance backends and beautiful frontends using modern architectures like Node, Express, and React. Built with type safety, clean states, and rigid design integrity.",
    features: ["Custom API design & integration", "Server state management & caching", "Highly performance-optimized structures", "Rigid security protocols"],
    icon: "Layers"
  },
  {
    id: "srv-2",
    title: "Custom Websites",
    description: "Architecting bespoke web applications coded purely to client specifications, featuring fast loading ratios, fluid navigation, and tailored layouts that reflect distinct brand authority.",
    features: ["Responsive design from scratch", "Interactive customized components", "Ultra-fast loading times", "Full component scalability"],
    icon: "Layout"
  },
  {
    id: "srv-3",
    title: "AI Integration",
    description: "Empowering conventional platforms with modern intelligence by building semantic searches, Large Language Model orchestration, vector embeddings, and direct model api layers.",
    features: ["Smarter data categorization", "Custom API prompts engineering", "Automated intelligence pipelines", "Embeddings & structured datasets"],
    icon: "Cpu"
  },
  {
    id: "srv-4",
    title: "SEO Optimization",
    description: "Auditing and structures refactoring to maximize accessibility indexes, optimize meta tags, generate valid semantic markup, and establish lightning-fast page loading speeds.",
    features: ["Valid Semantic markup mapping", "Optimized Core Web Vitals", "Custom structured JSON-LD integration", "High search ranking blueprints"],
    icon: "TrendingUp"
  },
  {
    id: "srv-5",
    title: "Website Redesign",
    description: "Breathing brand-new life into outdated legacies. Standardizing visual rhythm, removing interface clutter, adopting modern color system tokens, and accelerating load times.",
    features: ["Modernized high-fidelity visual styling", "Removal of redundant legacy dependencies", "Intuitive layout paths", "Mobile-first experience upgrade"],
    icon: "RefreshCw"
  },
  {
    id: "srv-6",
    title: "E-Commerce Solutions",
    description: "Deploying high-converting headless stores, catalog indexing tools, fluid cart animations, and checkout portals that minimize customer purchasing friction.",
    features: ["Lightning-fast checkout design", "Real-time client inventory updates", "Secure payment flow integration", "Comprehensive order receipt tracking"],
    icon: "ShoppingBag"
  },
  {
    id: "srv-7",
    title: "Landing Pages",
    description: "Designing high-converting singular layout portals tuned to funnel organic visitors into qualified commercial metrics with custom state-driven components.",
    features: ["Fluid interaction animations", "High conversion typography structures", "Direct form and API hooks triggers", "Comprehensive mobile responsive tuning"],
    icon: "Smartphone"
  },
  {
    id: "srv-8",
    title: "Business Websites",
    description: "Architecting corporate web instances designed to echo industry leadership, showcase commercial teams, and streamline institutional client interactions safely.",
    features: ["Corporate color-scheme matching", "Secure team profile sheets", "Fluid service matrices", "GDPR-safe data entry standards"],
    icon: "Briefcase"
  }
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Programming Languages Certification",
    issuer: "Industry Verified Standard Reference",
    date: "2025"
  },
  {
    id: "cert-2",
    title: "Java Programming Credential",
    issuer: "National Tech Assessment Board",
    date: "2025"
  },
  {
    id: "cert-3",
    title: "Cybersecurity Job Simulation Project",
    issuer: "Deloitte Australia",
    date: "2025"
  },
  {
    id: "cert-4",
    title: "Software Engineering Job Simulation",
    issuer: "Electronic Arts (EA Sports)",
    date: "2025"
  },
  {
    id: "cert-5",
    title: "Certified Internship Program (CIP)",
    issuer: "National Educational Council Approved Reference",
    date: "2024"
  }
];

export const educations: Education[] = [
  {
    id: "edu-3",
    institution: "Shinde International School",
    degree: "Secondary School Certificate (SSC) – CBSE, 10th Grade",
    duration: "February 2024",
    location: "Pachora, Maharashtra, India"
  },
  {
    id: "edu-2",
    institution: "I-Tech System",
    degree: "Computer Programming Certification",
    duration: "April 2024",
    location: "Nashik, Maharashtra, India"
  },
  {
    id: "edu-1",
    institution: "Maharashtra State Board of Technical Education (MSBTE)",
    degree: "Diploma in Artificial Intelligence & Machine Learning",
    duration: "September 2024 – May 2027 (Present)",
    location: "Nashik, Maharashtra, India"
  }
];

export const statistics: StatItem[] = [
  { value: 3, label: "Projects Built", suffix: "+" },
  { value: 12, label: "Technologies Used", suffix: "+" },
  { value: 1, label: "Experience", suffix: " yr+" },
  { value: 2, label: "Freelance Clients", suffix: "+" }
];
