import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

import bloodImg from './assets/blood.png';
import citycareImg from './assets/citycare.png';
import jobhuntImg from './assets/jobhunt.png';


// --- ICONS (Inline SVGs) ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-3-7-3"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
);

const App = () => {
  const [flipped, setFlipped] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  emailjs.sendForm(
    import.meta.env.VITE_SERVICE_ID,
    import.meta.env.VITE_TEMPLATE_ID,
    e.target,
    import.meta.env.VITE_PUBLIC_KEY
  )
  .then(() => {
    setIsSubmitting(false);
    setSubmitted(true);
    e.target.reset();
  })
  .catch((error) => {
    console.error(error);
    setIsSubmitting(false);
  });
};

  // Projects - Update these to use your imported variables locally
  const projects = [
    {
      title: "City Care",
      image: citycareImg, 
      desc: "A modern healthcare platform that simplifies appointment booking and patient management.",
      github: "https://github.com/coder-bloom/city-care",
      live: "#",
      tech: ["React", "Express", "Node.js", "MongoDB"]
    },
    {
      title: "Blood Link",
      image:bloodImg, 
      desc: "A smart blood donation system connecting donors and recipients in real-time.",
      github: "https://github.com/coder-bloom/Blood_Link_web",
      live: "#",
      tech: ["Socket.io", "React", "Node.js", "MUI"]
    },
    {
      title: "Job Hunt",
      image: jobhuntImg, 
      desc: "A dynamic job portal designed to help users explore and manage applications.",
      github: "https://github.com/coder-bloom/jobhunt",
      live: "#",
      tech: ["MERN Stack", "Redux", "Tailwind CSS"]
    }
  ];

  const profilePhoto = ""; 

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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  

  return (
    <div className="relative bg-neutral-950 text-white min-h-screen overflow-x-hidden selection:bg-purple-500">
      
      {/* COSMIC BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
            style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%` }}
            className="absolute rounded-full bg-white/60"
          />
        ))}
        <div className="w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full absolute -top-48 -left-48" />
        <div className="w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full absolute bottom-0 right-0" />
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-8 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-mono text-purple-400 mb-6 inline-block uppercase tracking-widest">
            Full Stack Developer
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">Varsha.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Building scalable MERN applications with a focus on modern user experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollTo("projects")} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-all">
              View Projects
            </button>
            <button onClick={() => scrollTo("contact")} className="px-8 py-4 rounded-full border border-neutral-700 hover:border-purple-500 transition-all font-bold">
              Contact Me
            </button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-400">Who Am I</h2>
            <p className="text-neutral-400 text-lg">
              I'm a Computer Science student driven by the passion to solve real-world problems. 
              I specialize in transforming complex requirements into smooth digital products.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="text-purple-400 font-bold mb-1">Frontend</div>
                <div className="text-xs text-neutral-500">React, Tailwind, Framer Motion</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="text-blue-400 font-bold mb-1">Backend</div>
                <div className="text-xs text-neutral-500">Node.js, Express, MongoDB</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-3xl rotate-6 blur-xl opacity-20" />
              <div className="relative w-full h-full bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Varsha" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-700">
                    <CodeIcon />
                    <span className="mt-4 text-[10px] font-mono tracking-widest uppercase">Varsha</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-32 px-8 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
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
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                          <LayoutIcon />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-neutral-500 line-clamp-2">{project.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-neutral-700 bg-neutral-950 text-neutral-400 uppercase">
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
                        {project.tech.map(t => <span key={t} className="text-[10px] text-white/40">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white text-black rounded-xl text-center font-bold text-xs">Code</a>
                      <a href={project.live} className="flex-1 py-3 border border-neutral-700 rounded-xl text-center font-bold text-xs">Live</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-8 max-w-5xl mx-auto">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full -mr-20 -mt-20" />
          
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-5xl font-bold mb-6">Let's <span className="text-purple-400">Connect.</span></h2>
              <p className="text-neutral-400 mb-10 text-lg">
                Have a project in mind or just want to say hi? My inbox is always open.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                    <MailIcon />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">Email</div>
                    <div className="text-neutral-200">raniv0487@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <LinkedinIcon />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">LinkedIn</div>
                    <div className="text-neutral-200">https://www.linkedin.com/in/varsha-rani-5841472a9/</div>
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
          <a href="https://github.com/coder-bloom" className="hover:text-white transition-colors"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/varsha-rani-5841472a9/" className="hover:text-white transition-colors"><LinkedinIcon /></a>
          <a href="mailto:raniv0487@gmail.com" className="hover:text-white transition-colors"><MailIcon /></a>
        </div>
        <p className="text-neutral-600 text-xs font-mono uppercase tracking-widest">© 2026 Varsha. Portfolio built with React</p>
      </footer>

    </div>
  );
};

export default App;
