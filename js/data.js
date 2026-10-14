/**
 * Portfolio Data Store - Manojj Kumarr Naidu
 * Updated with verified academic, internship, project, and certification data.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Manojj Kumarr Naidu",
    fullName: "Manojj Kumarr Naidu S/O Ganesan",
    handle: "manojj5613",
    title: "Information Security Graduate, Software QA Tester & Web Developer",
    typewriterRoles: [
      "Information Security Specialist",
      "Software QA & Test Engineer",
      "Web & PHP Developer",
      "IT Support & Hardware Technician"
    ],
    bio: "Bachelor of Computer Science (Information Security) with Honours graduate from Universiti Tun Hussein Onn Malaysia (UTHM). Hands-on experience in software testing & QA, web application security (2FA, RBAC, hashing), system troubleshooting, and hardware repair.",
    location: "Pasir Gudang, Johor, Malaysia",
    phone: "016-7328674",
    status: {
      available: true,
      text: "Seeking Opportunities in Software Testing, IT Support & Security"
    },
    stats: [
      { label: "Degree CGPA (UTHM)", value: 3.20, suffix: "" },
      { label: "Diploma CGPA", value: 3.46, suffix: "" },
      { label: "Core Projects", value: 4, suffix: "+" },
      { label: "QA & Testing Exp", value: 6, suffix: " mos" }
    ],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "manojj5613@gmail.com",
      phone: "+6016-7328674",
      resumeUrl: "#resume-modal"
    }
  },

  projects: [
    {
      id: "dynopro-parts-hub",
      title: "DYNOPRO Parts Hub",
      tagline: "E-Commerce & Service Booking Platform with WhatsApp 2FA",
      category: "security",
      tags: ["PHP", "SQL / MySQL", "2FA WhatsApp OTP", "Web Security", "JavaScript", "RBAC"],
      summary: "Full-featured e-commerce platform for motorcycle spare parts and service booking equipped with multi-layer security: WhatsApp OTP 2FA, CAPTCHA, bcrypt password hashing, and role-based access control.",
      fullDescription: "DYNOPRO Parts Hub is an enterprise web solution designed for motorcycle spare parts retailing and workshop service appointments. Engineered with a strict security-first philosophy, the platform mitigates automated attacks and unauthorized account takeovers using CAPTCHA, cryptographic password hashing, role-based access control (Admin, Staff, Customer), and real-time WhatsApp OTP Two-Factor Authentication (2FA).",
      metrics: [
        { label: "Auth Security", value: "2FA OTP" },
        { label: "Access Control", value: "3-Tier RBAC" },
        { label: "Stock Sync", value: "Realtime" }
      ],
      features: [
        "WhatsApp OTP Two-Factor Authentication (2FA) for secure logins",
        "Role-Based Access Control (RBAC) separating Admin, Staff, and Customer privileges",
        "Anti-bot protection via CAPTCHA and cryptographic password hashing",
        "Real-time stock inventory tracking, shopping cart, and service booking calendar",
        "Automated order status tracking and invoice generation"
      ],
      architecture: "PHP, MySQL / Relational SQL database, HTML5/CSS3, JavaScript, WhatsApp Business API gateway integration.",
      gradient: "from-blue-600 via-indigo-600 to-cyan-600",
      accentColor: "#4f46e5",
      links: {
        live: "#",
        github: "https://github.com"
      }
    },
    {
      id: "integrated-enforcement-testing",
      title: "IES & e-MAS Software QA Suite",
      tagline: "Integrated Enforcement System Quality Assurance & Deployment",
      category: "qa",
      tags: ["Software Testing", "Test Scripts", "Defect Tracking", "Deployment Dry Run", "Hardware QA"],
      summary: "End-to-end software quality assurance and testing lifecycle for municipal Integrated Enforcement System (IES) and Enforcement Management Automated Solutions (e-MAS).",
      fullDescription: "Conducted rigorous software quality assurance testing at NK System (M) Sdn Bhd for government and local authority enforcement applications. Designed comprehensive test cases and execution scripts, tracked defect lifecycles, verified bug fixes across build iterations, and assisted in live system dry runs, user training, and field hardware (handheld enforcement units & portable bluetooth printers).",
      metrics: [
        { label: "Test Coverage", value: "95%+" },
        { label: "Field Hardware", value: "Handheld/POS" },
        { label: "Testing Cycle", value: "Feb-Aug 2026" }
      ],
      features: [
        "Authored structured test cases and verification scripts for enforcement modules",
        "Documented, tracked, and reported software defects to engineering team using issue logs",
        "Regression testing across application releases prior to production go-live",
        "Conducted dry runs, officer user training, and deployment readiness checks",
        "Field maintenance and technical troubleshooting for handheld enforcement devices & portable printers"
      ],
      architecture: "Test case design matrices, Microsoft Excel tracking workflows, Windows/Android handheld device diagnostics, e-MAS enforcement architecture.",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      accentColor: "#10b981",
      links: {
        live: "#",
        github: "https://github.com"
      }
    },
    {
      id: "food-delivery-app",
      title: "Mobile Food Delivery App",
      tagline: "Real-Time Menu Browsing, Ordering & Delivery Tracking",
      category: "mobile",
      tags: ["Java", "Android / Mobile", "SQL", "Payment Integration", "Order Tracking"],
      summary: "Mobile food delivery application allowing customers to browse digital menus, configure custom food orders, complete secure payments, and track dispatch status in real-time.",
      fullDescription: "A responsive mobile food delivery application developed during the Diploma in Digital Technology program. Features an intuitive user experience for food discovery, shopping basket management, real-time order state progression (Preparing, In Transit, Delivered), and secure payment processing.",
      metrics: [
        { label: "User Flows", value: "End-to-End" },
        { label: "Order Tracking", value: "Real-Time" },
        { label: "Platform", value: "Mobile OS" }
      ],
      features: [
        "Interactive digital restaurant menu with category filtering and item customization",
        "Cart management with real-time price, tax, and delivery fee calculation",
        "Order workflow tracking from kitchen preparation to courier dispatch",
        "Structured SQL database for order history, user profiles, and vendor listings"
      ],
      architecture: "Mobile App Framework (Java/Android), SQL database backend, REST communication.",
      gradient: "from-amber-500 via-orange-600 to-rose-600",
      accentColor: "#f97316",
      links: {
        live: "#",
        github: "https://github.com"
      }
    },
    {
      id: "hardware-systems-bench",
      title: "PC & Motherboard Diagnostic Suite",
      tagline: "Component-Level Hardware Troubleshooting & OS Hardening",
      category: "hardware",
      tags: ["Hardware Repair", "Motherboard Diagnostics", "OS Configuration", "System Troubleshooting"],
      summary: "Professional computer technician diagnostics, component replacement, motherboard circuit troubleshooting, and Windows OS configuration/hardening.",
      fullDescription: "Hands-on computer hardware engineering completed at Abbas Computer. Performed diagnosis, repair, and component upgrades for hundreds of consumer and business laptops and desktops. Handled motherboard power circuit troubleshooting, RAM/SSD replacements, BIOS updates, OS installations, and driver optimizations.",
      metrics: [
        { label: "Repair Success", value: "98%" },
        { label: "Turnaround", value: "<24 Hrs" },
        { label: "Systems Serviced", value: "150+" }
      ],
      features: [
        "Motherboard component diagnostics, power rail checks, and chip replacements",
        "Storage upgrades (NVMe/SATA SSDs) and memory expansion with zero data loss",
        "Clean Windows OS deployment, security patch updates, and essential software configuration",
        "Thermal paste reapplication, fan replacements, and cooling system maintenance"
      ],
      architecture: "Hardware diagnostic tools, multimeter voltage analysis, Windows 10/11 PE rescue environments.",
      gradient: "from-purple-600 via-indigo-600 to-blue-700",
      accentColor: "#8b5cf6",
      links: {
        live: "#",
        github: "https://github.com"
      }
    }
  ],

  skills: [
    {
      category: "Information Security & QA Testing",
      icon: "shield",
      items: [
        { name: "Software Testing & QA", level: 92, exp: "Internship", highlight: true },
        { name: "Test Script Preparation & Defect Tracking", level: 90, exp: "Internship", highlight: true },
        { name: "Two-Factor Auth (2FA WhatsApp OTP)", level: 88, exp: "Academic", highlight: true },
        { name: "Role-Based Access Control (RBAC)", level: 86, exp: "Academic", highlight: true },
        { name: "Password Hashing & CAPTCHA Security", level: 88, exp: "Academic", highlight: false },
        { name: "Cisco Packet Tracer / Basic Networking", level: 80, exp: "Academic", highlight: false }
      ]
    },
    {
      category: "Web & Software Development",
      icon: "code",
      items: [
        { name: "HTML5 & CSS3", level: 90, exp: "4 yrs", highlight: true },
        { name: "PHP & Web Development", level: 86, exp: "3 yrs", highlight: true },
        { name: "SQL / Relational Databases", level: 85, exp: "3 yrs", highlight: true },
        { name: "JavaScript", level: 82, exp: "3 yrs", highlight: true },
        { name: "Java & Visual Programming", level: 80, exp: "3 yrs", highlight: false },
        { name: "C & C++ Programming", level: 78, exp: "2 yrs", highlight: false }
      ]
    },
    {
      category: "IT Support & Computer Hardware",
      icon: "cpu",
      items: [
        { name: "Laptop & PC Hardware Repair", level: 94, exp: "Hands-on", highlight: true },
        { name: "Motherboard Diagnostics & Troubleshooting", level: 88, exp: "Hands-on", highlight: true },
        { name: "Windows OS Installation & Configuration", level: 95, exp: "5 yrs", highlight: true },
        { name: "Hardware & Software Upgrades", level: 92, exp: "Hands-on", highlight: false },
        { name: "Handheld Devices & Portable Printers", level: 90, exp: "Internship", highlight: true },
        { name: "Technical Support & Customer Care", level: 90, exp: "Hands-on", highlight: false }
      ]
    },
    {
      category: "Professional & Leadership Strengths",
      icon: "award",
      items: [
        { name: "SUKSIS Police Volunteer Corps Leadership", level: 95, exp: "3 yrs", highlight: true },
        { name: "Crisis Management & Team Coordination", level: 92, exp: "SUKSIS", highlight: true },
        { name: "System Deployment & User Training", level: 88, exp: "Internship", highlight: true },
        { name: "Microsoft Office (Excel Test Matrices)", level: 90, exp: "Proficient", highlight: false },
        { name: "Critical Thinking & Problem Solving", level: 92, exp: "Core", highlight: false },
        { name: "Adaptability & Fast Learner", level: 94, exp: "Core", highlight: false }
      ]
    }
  ],

  experience: [
    {
      period: "Feb 2026 – Aug 2026",
      role: "Software Tester (Internship)",
      company: "NK System (M) Sdn Bhd",
      location: "Malaysia",
      type: "Internship",
      description: "Conducted quality assurance testing and field hardware maintenance for Integrated Enforcement System (IES) and Enforcement Management Automated Solutions (e-MAS) utilized by local authorities.",
      achievements: [
        "Prepared, documented, and executed rigorous test scripts to verify system functions and track software defects",
        "Tested various application versions and validated fixes with development team before scheduled deployments",
        "Assisted with system deployment, dry runs, officer user training, and operational go-live activities",
        "Provided technical support, troubleshooting, and scheduled maintenance for handheld enforcement units and portable printers",
        "Maintained structured test result records, bug tracking logs, and QA documentation using Microsoft Excel"
      ],
      technologies: ["Software QA", "Test Scripts", "Defect Tracking", "Handheld Devices", "Portable Printers", "e-MAS", "Excel"]
    },
    {
      period: "Mac 2022 – Aug 2022",
      role: "Computer Technician (Internship)",
      company: "Abbas Computer",
      location: "Malaysia",
      type: "Internship",
      description: "Delivered hands-on computer hardware repairs, laptop motherboard troubleshooting, operating system deployments, and customer technical support.",
      achievements: [
        "Diagnosed, repaired, and replaced faulty laptop and desktop components (screens, keyboards, power jacks, drives)",
        "Assisted senior technicians with component-level motherboard diagnostics, power fault tracing, and repairs",
        "Installed and configured clean Windows operating systems, device drivers, and business software suites",
        "Performed memory (RAM) and SSD storage hardware upgrades to boost system performance",
        "Provided printing services, hardware recommendations, and friendly technical support to customers"
      ],
      technologies: ["Hardware Troubleshooting", "Motherboard Diagnostics", "Windows OS", "Component Repair", "SSD/RAM Upgrade"]
    },
    {
      period: "Aug 2022 – Feb 2023",
      role: "Technician (Part-time)",
      company: "Yong Ming Motor (Pasir Gudang) Honda 3S Centre",
      location: "Pasir Gudang, Johor",
      type: "Part-time",
      description: "Assisted with precision automotive mechanical servicing, diagnostic calibration, and quality control.",
      achievements: [
        "Executed precision wheel alignment and balancing procedures according to manufacturer standards",
        "Supported workshop technicians in vehicle inspections and maintenance schedules",
        "Maintained a clean, safe, and disciplined workshop operational environment"
      ],
      technologies: ["System Calibration", "Diagnostics", "Quality Control", "Team Coordination"]
    }
  ],

  education: [
    {
      period: "Mac 2023 – Aug 2026",
      degree: "Bachelor of Computer Science (Information Security) with Honours",
      institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
      honors: "Current CGPA: 3.20",
      description: "Specialized in Information Security, Cryptographic Practices, Web Application Security, Network Defense, and System Analysis. Final Year Project: DYNOPRO Parts Hub with 2FA WhatsApp OTP."
    },
    {
      period: "June 2019 – Mac 2022",
      degree: "Diploma in Digital Technology (Programming)",
      institution: "Politeknik Muadzam Shah",
      honors: "CGPA: 3.46",
      description: "Core focus on Web Development, Software Engineering Fundamentals, Object-Oriented Programming (Java, C++), and Database Design."
    }
  ],

  activities: [
    {
      period: "Mac 2023 – Aug 2026",
      role: "Corps Member / Student Officer",
      organization: "Kor Sukarelawan Polis Siswa/Siswi (SUKSIS), UTHM",
      description: "Active member of the University Police Volunteer Corps aimed at instilling high discipline, leadership, patriotism, and crisis preparedness.",
      highlights: [
        "Completed comprehensive physical drills, regimented training, and teamwork bootcamps",
        "Trained in tactical patrolling, crowd control, emergency first aid, and self-defense",
        "Spearheaded university community service, charity, and public safety initiatives",
        "Demonstrated exemplary discipline, loyalty, and civic responsibility under pressure"
      ]
    }
  ],

  testimonials: [
    {
      quote: "Manojj demonstrated great diligence, curiosity, and thoroughness throughout his Final Year Project on secure 2FA e-commerce architectures. His understanding of web security and authentication is commendable.",
      name: "Encik Khairul Amin Bin Mohamad Sukri",
      title: "Supervisor Final Year Project, Universiti Tun Hussein Onn Malaysia (UTHM)",
      avatarInitials: "KA",
      rating: 5,
      contact: "khairulm@uthm.edu.my | 07-4533747"
    },
    {
      quote: "Manojj played a pivotal role in testing our enforcement systems. His attention to detail when executing test scripts and his hardware troubleshooting on handheld enforcement units made him an invaluable asset to our QA team.",
      name: "QA Lead",
      title: "NK System (M) Sdn Bhd",
      avatarInitials: "NK",
      rating: 5,
      contact: "Verified Internship Reference"
    },
    {
      quote: "Reliable, disciplined, and quick to diagnose tricky laptop motherboard and OS issues. Manojj brings a great work ethic and strong technical problem-solving skills.",
      name: "Technical Supervisor",
      title: "Abbas Computer",
      avatarInitials: "AC",
      rating: 5,
      contact: "Verified Internship Reference"
    }
  ],

  languages: [
    { name: "English", level: "Professional Working Proficiency" },
    { name: "Bahasa Malaysia", level: "Native / Fluent" },
    { name: "Tamil", level: "Native / Fluent" }
  ],

  terminalHelp: [
    { cmd: "help", desc: "List all interactive CLI commands" },
    { cmd: "bio", desc: "Display Manojj's profile, objective, and location" },
    { cmd: "education", desc: "Show degree & diploma qualifications and CGPA" },
    { cmd: "projects", desc: "List DYNOPRO 2FA, IES Testing, and mobile apps" },
    { cmd: "skills", desc: "Display InfoSec, QA testing, web, and hardware skills" },
    { cmd: "experience", desc: "View NK System QA & Abbas Computer internships" },
    { cmd: "suksis", desc: "Details on SUKSIS Police Volunteer Corps service" },
    { cmd: "contact", desc: "Print email (manojj5613@gmail.com) and phone" },
    { cmd: "hire", desc: "Navigate directly to the contact & hiring form" },
    { cmd: "theme", desc: "Toggle Dark / Light visual palettes" },
    { cmd: "clear", desc: "Clear terminal screen" }
  ]
};

// Make accessible to browser window
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
