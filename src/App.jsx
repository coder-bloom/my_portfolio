import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// --- STUNNING INLINE SVG ILLUSTRATION ASSETS (To replace missing local images) ---

// High-quality SVG for City Care Project
const CityCareIllustration = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full object-cover bg-gradient-to-br from-cyan-900/60 to-slate-900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#cyanGrad)" />
    <circle cx="200" cy="100" r="45" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5 5" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '20s' }} />
    <path d="M185 100 H215 M200 85 V115" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
    <path d="M120 140 Q200 110 280 140" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="120" cy="140" r="4" fill="#67e8f9" />
    <circle cx="280" cy="140" r="4" fill="#67e8f9" />
    <text x="20" y="35" fill="#22d3ee" fontFamily="monospace" fontSize="12" letterSpacing="2">SYS: CONNECTED</text>
  </svg>
);

// High-quality SVG for Blood Link Project
const BloodLinkIllustration = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full object-cover bg-gradient-to-br from-rose-950/60 to-zinc-900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#roseGrad)" />
    {/* Concentric pulse rings */}
    <circle cx="200" cy="100" r="30" fill="none" stroke="#fda4af" strokeWidth="1" opacity="0.3" />
    <circle cx="200" cy="100" r="45" fill="none" stroke="#fda4af" strokeWidth="1" opacity="0.2" />
    {/* Stylized Blood Drop */}
    <path d="M200 70 C180 100 180 118 200 118 C220 118 220 100 200 70 Z" fill="#f43f5e" className="animate-bounce" style={{ transformOrigin: 'center', animationDuration: '3s' }} />
    {/* Realtime Link nodes */}
    <line x1="120" y1="100" x2="180" y2="100" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
    <line x1="280" y1="100" x2="220" y2="100" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="120" cy="100" r="6" fill="#f43f5e" />
    <circle cx="280" cy="100" r="6" fill="#fb7185" />
    <text x="20" y="35" fill="#f43f5e" fontFamily="monospace" fontSize="12" letterSpacing="2">LIVE: SYNCED</text>
  </svg>
);

// High-quality SVG for Job Hunt Project
const JobHuntIllustration = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full object-cover bg-gradient-to-br from-violet-950/60 to-neutral-900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#violetGrad)" />
    {/* Network grid */}
    <path d="M 50,150 L 150,50 L 250,150 L 350,50" fill="none" stroke="#a78bfa" strokeWidth="2" />
    <circle cx="150" cy="50" r="7" fill="#c084fc" />
    <circle cx="350" cy="50" r="7" fill="#c084fc" />
    <rect x="180" y="110" width="40" height="30" rx="4" fill="#c084fc" opacity="0.9" />
    <path d="M 195,120 L 205,130 L 210,125" fill="none" stroke="#2e1065" strokeWidth="2" strokeLinecap="round" />
    <text x="20" y="35" fill="#c084fc" fontFamily="monospace" fontSize="12" letterSpacing="2">JOBS: ACTIVE</text>
  </svg>
);

// Navigation & Media Icons
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-3-7-3"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

const App = () => {
  const [flipped, setFlipped] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Resolved compilation error by replacing external @emailjs call with secure browser-compatible simulation
 const handleContactSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);

  try {
    await emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_PUBLIC_KEY
    );

    setSubmitted(true);
    e.target.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);

  } catch (error) {
    console.error("EmailJS Error:", error);
    alert("Failed to send message. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const projects = [
    {
      title: "City Care",
      illustration: <CityCareIllustration />, 
      desc: "A modern healthcare platform that simplifies appointment booking and patient management.",
      github: "https://github.com/coder-bloom/city-care",
      live: "#",
      tech: ["React", "Express", "Node.js", "MongoDB"]
    },
    {
      title: "Blood Link",
      illustration: <BloodLinkIllustration />, 
      desc: "A smart blood donation system connecting donors and recipients in real-time.",
      github: "https://github.com/coder-bloom/Blood_Link_web",
      live: "#",
      tech: ["Socket.io", "React", "Node.js", "MUI"]
    },
    {
      title: "Job Hunt",
      illustration: <JobHuntIllustration />, 
      desc: "A dynamic job portal designed to help users explore and manage applications.",
      github: "https://github.com/coder-bloom/jobhunt",
      live: "#",
      tech: ["MERN Stack", "Redux", "Tailwind CSS"]
    }
  ];

  // Perfectly mapped categories as requested
  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript", "HTML5", "CSS3"],
      color: "from-amber-400/20 to-orange-500/20 text-orange-400 border-amber-500/30"
    },
    {
      title: "Frontend",
      skills: ["React.js", "Redux", "Tailwind CSS"],
      color: "from-blue-400/20 to-cyan-500/20 text-cyan-400 border-blue-500/30"
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs"],
      color: "from-green-400/20 to-emerald-500/20 text-emerald-400 border-green-500/30"
    },
    {
      title: "Database",
      skills: ["MongoDB"],
      color: "from-emerald-600/20 to-green-700/20 text-emerald-400 border-emerald-500/30"
    },
    {
      title: "Cloud & Deployment",
      skills: ["AWS", "MongoDB Atlas", "Vercel"],
      color: "from-purple-400/20 to-indigo-500/20 text-purple-400 border-purple-500/30"
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "Postman", "VS Code"],
      color: "from-pink-400/20 to-rose-500/20 text-rose-400 border-pink-500/30"
    }
  ];

  // Restructuring and ensuring your internships and freelancing experiences are accurate and visually crisp
  const experiences = [
    {
      role: "Web Development Intern",
      company: "DC Office",
      duration: "Ongoing",
      type: "Government Scheme Dashboard Project",
      points: [
        "Developing a secure, user-friendly government scheme platform dashboard.",
        "Building modern, responsive frontend modules and robust structural backends using the MERN stack."
      ],
      current: true
    },
    {
      role: "MERN Stack Intern",
      company: "Unified Mentor",
      duration: "3 Months",
      type: "Full Stack Development",
      points: [
        "Developed full-stack MERN (MongoDB, Express, React, Node) applications and robust REST APIs.",
        "Implemented secure JWT (JSON Web Tokens) user authentication and modern routing logic."
      ],
      current: false
    },
    {
      role: "Freelance Full Stack Developer",
      company: "Self-Employed",
      duration: "Ongoing",
      type: "Custom Client Solutions",
      points: [
        "Built and deployed high-performance, secure MERN stack applications tailored to individual client requirements.",
        "Managed database schemas, API architecture, and structured responsive front-end elements."
      ],
      current: false
    }
  ];

  // Particle background coordinates
  const stars = useMemo(() => {
    const make = (count, min, max, speedMin, speedMax) =>
      Array.from({ length: count }).map((_, i) => ({
        id: `${count}-${i}`,
        size: Math.random() * (max - min) + min,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * (speedMax - speedMin) + speedMin,
        delay: Math.random() * 5,
      }));
    return [...make(100, 1, 2, 12, 20), ...make(40, 2, 3, 10, 16)];
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative bg-neutral-950 text-white min-h-screen overflow-x-hidden selection:bg-purple-500 selection:text-white font-sans antialiased">
      
      {/* COSMIC BACKGROUND - Smooth performance optimized elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
            style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%` }}
            className="absolute rounded-full bg-white/50"
          />
        ))}
        <div className="w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full absolute -top-40 -left-40 pointer-events-none" />
        <div className="w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full absolute bottom-10 right-10 pointer-events-none" />
      </div>

      {/* STICKY CLASSIC GLASSMORPHIC NAV BAR */}
      <header className="fixed top-0 inset-x-0 h-16 bg-neutral-950/70 backdrop-blur-md border-b border-neutral-900 z-50 px-6 flex items-center justify-between">
        <span className="font-mono text-lg tracking-widest font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          VARSHA.DEV
        </span>
       <nav className="hidden md:flex items-center gap-10 text-lg font-semibold text-neutral-300 font-mono">
          <button onClick={() => scrollTo("home")} className="hover:text-purple-400 hover:scale-105 transition-all duration-300">Home</button>
          <button onClick={() => scrollTo("about")} className="hover:text-purple-400 hover:scale-105 transition-all duration-300">About</button>
          <button onClick={() => scrollTo("skills")} className="hover:text-purple-400 hover:scale-105 transition-all duration-300">Skills</button>
          <button onClick={() => scrollTo("experience")} className="hover:text-purple-400 hover:scale-105 transition-all duration-300">Experience</button>
          <button onClick={() => scrollTo("projects")} className="hover:text-purple-400 hover:scale-105 transition-all duration-300">Projects</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-purple-400 hover:scale-105 transition-all duration-300">Contact</button>
        </nav>
        <button 
          onClick={() => scrollTo("contact")} 
          className="px-4 py-1.5 rounded-full border border-neutral-800 hover:border-purple-500 hover:text-purple-300 text-lg font-mono transition-all"
        >
          Hire Me
        </button>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-8 text-center pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-mono text-purple-400 mb-6 inline-block uppercase tracking-widest">
            Full Stack Developer
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">Varsha.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Building robust MERN applications with modern architectures and clean user experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollTo("experience")} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-all">
              My Experience
            </button>
            <button onClick={() => scrollTo("projects")} className="px-8 py-4 rounded-full border border-neutral-700 hover:border-purple-500 transition-all font-bold">
              View Projects
            </button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-8 max-w-6xl mx-auto scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-400 font-mono tracking-tight">Who Am I</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              I'm a Computer Science student driven by the passion to solve real-world problems. 
              I specialize in translating complex criteria into responsive, user-friendly digital systems. 
              With hands-on experience in public service dashboards and responsive client integrations, 
              I bring ideas to life using clean-code paradigms.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
                <div className="text-purple-400 font-bold mb-1">Frontend</div>
                <div className="text-xs text-neutral-500">React.js, Redux, Tailwind CSS</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
                <div className="text-blue-400 font-bold mb-1">Backend</div>
                <div className="text-xs text-neutral-500">Node.js, Express.js, MongoDB</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-3xl rotate-6 blur-xl opacity-20" />
              <div className="relative w-full h-full bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-700">
                  <CodeIcon />
                  <span className="mt-4 text-[10px] font-mono tracking-widest uppercase">Varsha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SKILLS SECTION */}
      <section id="skills" className="py-24 px-8 bg-neutral-900/10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">Stack Overview</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Technical Skills</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.4)" }}
                className="p-6 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl hover:bg-neutral-900/70 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-neutral-200 mb-4 font-mono">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-xs px-3 py-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition-colors text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mt-6 rounded" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE SECTION */}
      <section id="experience" className="py-24 px-8 bg-neutral-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold">My Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Work Experience</h2>
          </div>

          <div className="relative border-l border-neutral-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Custom Timeline Dot Marker */}
                <div className={`absolute -left-[45px] md:-left-[61px] top-1.5 w-8 h-8 rounded-full border ${exp.current ? 'bg-purple-500/20 border-purple-400' : 'bg-neutral-900 border-neutral-800'} flex items-center justify-center text-neutral-300`}>
                  <BriefcaseIcon />
                </div>

                <div className="bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-3xl p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        {exp.role}
                        {exp.current && (
                          <span className="text-xs py-1 px-3 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full font-mono font-normal">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-lg text-purple-400 font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 font-mono bg-neutral-950 py-1 px-3 rounded-xl border border-neutral-900">
                      <CalendarIcon />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  <span className="inline-block text-xs uppercase tracking-wider font-mono px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 mb-4">
                    {exp.type}
                  </span>

                  <ul className="space-y-3.5">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-neutral-400 text-sm md:text-base leading-relaxed flex items-start gap-3">
                        <span className="text-purple-400 mt-1.5 block min-w-[6px] max-w-[6px] h-[6px] rounded-full bg-purple-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS FLIP CARDS SECTION */}
      <section id="projects" className="py-24 px-8 bg-neutral-900/10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-pink-400 font-mono text-xs uppercase tracking-widest">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Projects</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                onClick={() => setFlipped(flipped === index ? null : index)}
                className="relative h-[420px] cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                <AnimatePresence mode="wait">
                  {flipped !== index ? (
                    <motion.div
                      key="front"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <div className="h-1/2 bg-neutral-800 relative overflow-hidden">
                        {project.illustration}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-neutral-500 line-clamp-2">{project.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-neutral-700 bg-neutral-950 text-neutral-400 uppercase font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      className="absolute inset-0 bg-neutral-900 border border-purple-500/50 rounded-3xl p-8 flex flex-col justify-between shadow-[0_0_40px_-12px_rgba(168,85,247,0.2)]"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">{project.title}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map(t => <span key={t} className="text-[10px] text-white/40 mr-1.5 bg-neutral-950/40 px-1.5 py-0.5 rounded border border-neutral-800">{t}</span>)}
                        </div>
                      </div>
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white text-black rounded-xl text-center font-bold text-xs hover:bg-neutral-200 transition-colors">Code</a>
                        <a href={project.live} className="flex-1 py-3 border border-neutral-700 rounded-xl text-center font-bold text-xs hover:bg-neutral-900 transition-colors">Live</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-8 max-w-5xl mx-auto scroll-mt-20">
        <div className="bg-neutral-900/30 border border-neutral-800/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full -mr-20 -mt-20" />
          
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-5xl font-bold mb-6">Let's <span className="text-purple-400">Connect.</span></h2>
              <p className="text-neutral-400 mb-10 text-lg">
                Have an exciting scheme dashboard, application idea, or role? My inbox is always open.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                    <MailIcon />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Email</div>
                    <div className="text-neutral-200">raniv0487@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <LinkedinIcon />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest font-mono">LinkedIn</div>
                    <a href="https://www.linkedin.com/in/varsha-rani-5841472a9/" target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-blue-400 transition-colors break-all">
                      linkedin.com/in/varsha-rani-5841472a9
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input 
                type="text" 
                name="user_name"
                placeholder="Name" 
                required
                className="w-full px-6 py-4 rounded-2xl bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:outline-none transition-all placeholder:text-neutral-700"
              />
              <input 
                type="email" 
                name="user_email"
                placeholder="Email" 
                required
                className="w-full px-6 py-4 rounded-2xl bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:outline-none transition-all placeholder:text-neutral-700"
              />
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="4" 
                required
                className="w-full px-6 py-4 rounded-2xl bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:outline-none transition-all placeholder:text-neutral-700 resize-none"
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-purple-400 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-neutral-900 px-8 text-center">
        <div className="flex justify-center gap-8 mb-8 text-neutral-500">
          <a href="https://github.com/coder-bloom" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/varsha-rani-5841472a9/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><LinkedinIcon /></a>
          <a href="mailto:raniv0487@gmail.com" className="hover:text-white transition-colors"><MailIcon /></a>
        </div>
        <p className="text-neutral-600 text-xs font-mono uppercase tracking-widest">© 2026 Varsha. Portfolio built with React</p>
      </footer>

    </div>
  );
};

export default App;
