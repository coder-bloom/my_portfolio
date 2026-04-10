import { motion } from "framer-motion";
import { useMemo } from "react";
import profile from "./assets/profile.jpg";
import citycare from "./assets/citycare.png";
import blood from "./assets/blood.png";
import jobhunt from "./assets/jobhunt.png";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function App() {
  // Create layered starfield (small, medium, big)
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

    return [
      ...make(120, 1, 2, 12, 20),   // small stars (dense)
      ...make(60, 2, 3, 10, 16),    // medium
      ...make(25, 3, 4.5, 8, 12),   // big (bright)
    ];
  }, []);

 const [flipped, setFlipped] = useState(null);

const projects = [
  {
    title: "City Care",
    img: citycare,
    desc: "A modern healthcare platform that simplifies appointment booking, patient management, and doctor interaction through an intuitive and responsive interface.",
    github: "https://github.com/coder-bloom/city-care",
    live: "#"
  },
  {
    title: "Blood Bank",
    img: blood,
    desc:"A smart blood donation system that connects donors and recipients in real-time, ensuring faster access to critical resources when needed.",
    github: "https://github.com/coder-bloom/Blood_Link_web",
    live: "#"
  },
  {
    title: "Job Hunt",
    img: jobhunt,
    desc: "A dynamic job portal designed to help users explore opportunities, apply seamlessly, and manage applications with a clean and user-friendly experience.",
    github: "https://github.com/coder-bloom/jobhunt",
    live: "#"
  }
];
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const formRef = useRef();
 const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cw7vg9v",
        "template_3a7v99e",
        formRef.current,
        "tmryk4t0BoxRVcr7F"
      )
      .then(() => {
        alert("Message sent successfully 🚀");
        formRef.current.reset(); // clears form
      })
      .catch(() => {
        alert("Failed to send ❌");
      });
  };

  return (
    <div className="relative bg-neutral-950 text-white min-h-screen overflow-hidden">

      {/* STARFIELD BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.3], // twinkle
              scale: [1, 1.2, 1],     // slight pulse
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: s.size,
              height: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
            className="absolute rounded-full bg-white"
          />
        ))}

        {/* Shooting stars */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ x: "-10%", y: "10%", opacity: 0 }}
            animate={{ x: "110%", y: "-10%", opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + i,
              delay: i * 4,
              repeat: Infinity,
            }}
            className="absolute w-24 h-[2px] bg-white/70 blur-[1px] rotate-45"
          />
        ))}
      </div>

      {/* SOFT GLOW BLOBS */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full absolute top-10 left-10"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
          transition={{ duration: 26, repeat: Infinity }}
          className="w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full absolute bottom-10 right-10"
        />
      </div>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center px-8 md:px-20 min-h-screen">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm
            <span className="block mt-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text animate-pulse">
              Varsha
            </span>
          </h1>

          <p className="mt-6 text-lg opacity-80 max-w-md">
            Building modern, responsive and visually stunning web applications.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
            >
              View Projects
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-xl border border-neutral-600 hover:border-purple-400 hover:scale-105 transition"
            >
              Contact Me
            </button>
          </div>
        </motion.div>

       <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  className="flex justify-center mt-10 md:mt-0"
>
  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px] bg-gradient-to-br from-purple-500 to-blue-500 shadow-2xl">
    
    <img
      src={profile}
      alt="Varsha"
      className="w-full h-full object-cover rounded-full"
    />
    
  </div>
</motion.div>
      </section>


      {/* ABOUT */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-semibold text-center">
          Who Am I
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
            <h3 className="text-lg font-medium text-purple-400">About Me</h3>
            <p className="mt-3 text-sm opacity-70 leading-relaxed">
              I'm a Computer Science student who loves building modern web apps. I focus on clean UI, performance, and smooth user experience.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
            <h3 className="text-lg font-medium text-blue-400">My Goal</h3>
            <p className="mt-3 text-sm opacity-70 leading-relaxed">
              To become a skilled developer and build impactful digital products that solve real-world problems.
            </p>
          </motion.div>
        </div>
      </section>

    <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
  <h2 className="text-3xl text-center text-blue-400 font-semibold">
    Projects
  </h2>

  <div className="mt-12 grid md:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        onClick={() => setFlipped(flipped === index ? null : index)}
        className="cursor-pointer"
      >
        <div className="w-full h-64">

          {flipped === index ? (
            // BACK
            <motion.div
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              className="w-full h-full bg-neutral-900 border border-purple-500 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg text-purple-400 font-semibold">
                  {project.title}
                </h3>
                <p className="text-sm mt-3 opacity-70">
                  {project.desc}
                </p>
              </div>

              {/* ✅ FIX: stopPropagation */}
              <div
                className="flex gap-3 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.github}
                  target="_blank"
                  className="px-4 py-2 text-sm rounded-lg bg-purple-500 hover:scale-105 transition"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  className="px-4 py-2 text-sm rounded-lg border border-blue-400 hover:scale-105 transition"
                  rel="noopener noreferrer"
                >
                  Live
                </a>
              </div>
            </motion.div>

          ) : (
            // FRONT
            <motion.img
              src={project.img}
              alt={project.title}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="w-full h-full object-cover rounded-2xl border border-neutral-800 shadow-lg"
            />
          )}

        </div>
      </motion.div>

    ))}
  </div>
</section>

      {/* CONTACT */}
     <section id="contact" className="max-w-2xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-medium text-center text-blue-400">
        Contact Me
      </h2>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="mt-10 space-y-6"
      >
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-purple-400 outline-none"
        />

        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-purple-400 outline-none"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-purple-400 outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 mt-10 py-6 text-center text-sm opacity-70">
        <p>© 2026 Varsha</p>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <span className="hover:text-purple-400 cursor-pointer">GitHub</span>
          <span className="hover:text-blue-400 cursor-pointer">LinkedIn</span>
          <span className="hover:text-purple-400 cursor-pointer">Email</span>
        </div>
      </footer>

    </div>
  );
}