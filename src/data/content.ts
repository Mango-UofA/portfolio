// Single-source portfolio data
export const content = {
  site: {
    owner: "Manglam Srivastav",
    role: "AI/ML Engineer • Full-Stack Developer",
    tagline: "I build AI products end-to-end — from data to delightful UX.",
    location: "Tucson, AZ, USA",
    email: "manglam.srivastav@arizona.edu",
    phone: "+1 (520) 474-5791",
    availability: "Open to internships, research, and SWE/ML roles (Summer/Fall 2025).",
    headshotAlt: "Portrait of Manglam Srivastav smiling",
    heroCTA: {
      primaryText: "See my work",
      primaryHref: "#projects",
      secondaryText: "Download Resume",
      secondaryHref: "/assets/Manglam_Srivastav_Resume.pdf"
    },
    social: [
      { label: "GitHub", href: "https://github.com/Mango-UofA" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/manglam-srivastav/" },
      { label: "Email", href: "mailto:manglam.srivastav@arizona.edu" }
    ],
    theme: {
      primary: "#1C2D8C",
      accent: "#F03939",
      info: "#3FD6F3",
      black: "#000000",
      white: "#FFFFFF",
      fontHeadings: "Montserrat",
      fontBody: "Open Sans"
    },
    seo: {
      title: "Manglam Srivastav — AI/ML Engineer & Full-Stack Developer",
      description: "Graduate AI/ML engineer at University of Arizona building interview automation, healthcare AI, and logistics platforms. React + Node + NLP + cloud.",
      keywords: [
        "AI Engineer",
        "Machine Learning",
        "NLP",
        "Full-Stack",
        "React",
        "Node.js",
        "Healthcare AI",
        "Interview automation",
        "MS Information Science",
        "University of Arizona"
      ],
      openGraph: {
        title: "Manglam Srivastav — AI/ML Engineer",
        description: "I build AI products end-to-end — from data to delightful UX.",
        image: "/assets/og-cover.png",
        url: "https://manglam-portfolio.vercel.app",
        type: "website"
      }
    }
  },

  about: {
    headline: "Engineer obsessed with turning messy data into useful products.",
    summaryMD: "I'm a Master's student in Information Science (Machine Learning emphasis) at the University of Arizona (GPA 4.0). I build end-to-end AI systems — from data pipelines and model training to production-grade APIs and polished, accessible frontends. Recent work includes **InterviewMate** (AI avatars conducting interviews with Whisper + GPT), **NeurolyticAI** (healthcare documentation & SOAP-note automation), and **DeliverUSA** (local delivery platform). I care about clean UX, reliable infra, and shipping fast without breaking quality.",
    highlights: [
      "MSIS (ML) @ University of Arizona — GPA 4.0",
      "2+ years full-stack experience (React, Node, AWS, MongoDB, PostgreSQL)",
      "Built avatar-based interview platform: Whisper + GPT-4 + LangChain",
      "Healthcare AI founder — NeurolyticAI",
      "Volunteer & campus leader: GPSC Representative"
    ],
    interests: ["Applied NLP", "RAG systems", "Recommenders", "Healthcare AI", "Cloud MLOps", "Clean UI"],
    funFact: "I prototype UIs first so my models have something nice to live in."
  },

  skills: {
    languages: ["Python", "JavaScript/TypeScript", "SQL", "Bash"],
    ml: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Matplotlib"],
    nlp: ["Whisper", "spaCy", "Hugging Face Transformers", "LangChain"],
    frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    backend: ["Node.js", "Express", "REST", "WebSockets", "GraphQL (basic)"],
    databases: ["PostgreSQL", "MongoDB", "Snowflake (coursework)", "MySQL"],
    cloudDevOps: ["AWS (EC2, S3, Lambda, Lightsail)", "Docker", "CI/CD (Netlify, Bitbucket/GitHub Actions)", "PM2"],
    dataPlatforms: ["ELK Stack (basic)", "Spark (intro)", "Azure/GCP logging (coursework)"],
    tools: ["Git", "Figma", "Jupyter", "Postman", "Notion"],
    strengths: ["System design", "Data pipelines", "API design", "UX polish", "Docs & diagrams"]
  },

  experience: [
    {
      company: "Growexx",
      role: "Software Engineer",
      location: "Ahmedabad, India (Remote/On-site)",
      start: "2022-11",
      end: "2024-11",
      bullets: [
        "Built scalable REST APIs with Node.js/Express; optimized DB queries for e-commerce & fintech workloads.",
        "Deployed cloud-native apps on AWS (EC2, Lambda, S3) with Docker; improved deployment reliability by ~40%.",
        "Collaborated on analytics dashboards and fraud-detection features using data-driven heuristics.",
        "Mentored junior developers; improved code quality via reviews, testing, and CI."
      ],
      tech: ["Node.js", "Express", "AWS", "Docker", "PostgreSQL", "MongoDB"]
    },
    {
      company: "University of Arizona",
      role: "Graduate Student & GPSC Representative",
      location: "Tucson, AZ",
      start: "2025-01",
      end: "Present",
      bullets: [
        "Coursework & projects in ML, data warehousing, temporal data updates, and databases (SQL/NoSQL).",
        "Representing the College of Information Science in GPSC; event ops, budgeting, and student outreach.",
        "Built multiple academic ML apps: churn prediction, law-enforcement data EDA, recommender systems."
      ],
      tech: ["Python", "Pandas", "scikit-learn", "Snowflake", "MySQL", "React", "Node.js"]
    }
  ],

  education: [
    {
      school: "University of Arizona",
      degree: "MS in Information Science (Machine Learning Emphasis)",
      gpa: "4.0",
      start: "2025-01",
      end: "Present",
      notes: [
        "Courses: Data Warehousing & Analytics (INFO 531), SQL/NoSQL Databases (INFO 579), Foundations of Data Science",
        "Projects: Temporal data updates in Snowflake/MySQL; ML pipelines; EDA on public datasets"
      ]
    }
  ],

  projects: [
    {
      name: "InterviewMate",
      summary: "AI-powered interview automation with avatar-led questions, STT, scoring, and feedback.",
      descriptionMD: "An end-to-end interview platform where an AI avatar asks questions, transcribes answers with Whisper, evaluates responses using GPT + similarity scoring, and returns structured feedback and a final score.",
      highlights: [
        "No flicker video UX, streaming transcripts",
        "RAG-style rubric matching for expected answers",
        "Result page with detailed, actionable feedback"
      ],
      tech: ["React", "Node.js", "Python", "Whisper", "LangChain", "OpenAI API", "MongoDB"],
      links: {
        demo: "https://demo-link.com",
        repo: "https://github.com/your-handle/interviewmate",
        caseStudy: "/projects/interviewmate"
      },
      tags: ["NLP", "Speech-to-Text", "Generative AI", "EdTech/HRTech"]
    },
    {
      name: "NeurolyticAI",
      summary: "Healthcare documentation & SOAP-note automation to reduce clinician burden.",
      descriptionMD: "Transforms raw clinical conversations/documents into structured SOAP notes with terminology handling and auditability. Focus on minimizing hallucinations and preserving provenance.",
      highlights: [
        "Terminology mapping & guardrails",
        "Human-in-the-loop review workflow",
        "Export to EHR-friendly formats"
      ],
      tech: ["Next.js", "Node.js", "Python", "Transformers", "PostgreSQL", "AWS"],
      links: {
        site: "https://www.youtube.com/@NeurolyticAI",
        repo: "https://github.com/your-handle/neurolyticai",
        caseStudy: "/projects/neurolyticai"
      },
      tags: ["Healthcare AI", "NLP", "Product"]
    },
    {
      name: "DeliverUSA",
      summary: "Local delivery platform for restaurants & businesses with scheduling and tracking.",
      descriptionMD: "React + Node.js + Tailwind app for scheduling and managing local deliveries. Custom branding (Freedom Blue/Patriot Red/Sky Bright).",
      highlights: [
        "Modern, responsive UI with clear CTAs",
        "Admin analytics views planned via real data ingestion",
        "Restaurant-first onboarding flow"
      ],
      tech: ["React", "Tailwind", "Node.js", "MongoDB", "AWS Lightsail/EC2", "Netlify"],
      links: {
        site: "https://deliverusa.netlify.app/",
        repo: "https://github.com/DeliverUSA-2025/DeliverUSA-website"
      },
      tags: ["Logistics", "SaaS", "Full-Stack"]
    }
  ],

  awards: [
    {
      title: "Hack Arizona — Volunteer & Participant",
      issuer: "University of Arizona",
      year: "2025",
      details: "Workshop support, mentoring, and InterviewMate prototype build."
    },
    {
      title: "GPSC Representative",
      issuer: "Graduate & Professional Student Council",
      year: "2025",
      details: "College of Information Science representative; events, budgeting, community."
    }
  ],

  speaking: [
    {
      title: "Interview Automation with Whisper + GPT",
      event: "Campus Demo Day (internal)",
      year: "2025",
      slides: "/talks/interview-automation.pdf",
      video: "https://video-link.com"
    }
  ],

  ctaSections: [
    {
      id: "work-with-me",
      title: "Build with me",
      body: "I love shipping ML features that feel effortless to users. If you're building in healthcare, logistics, or edtech, let's chat.",
      buttonText: "Email me",
      buttonHref: "mailto:manglam.srivastav@arizona.edu"
    }
  ],

  testimonials: [
    {
      name: "Dr. Sarah Chen",
      role: "Lead Data Scientist @ TechCorp",
      quote: "Manglam ships fast and thinks clearly from UX to infra. Exactly who you want on AI products.",
      avatar: "/assets/testimonials/avatar1.png"
    }
  ],

  contactForm: {
    enabled: true,
    successMessage: "Thanks! I'll get back to you within 24–48 hours.",
    fields: ["name", "email", "message"]
  }
};
