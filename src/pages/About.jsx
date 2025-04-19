import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const sectionRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // For parallax effect on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // For scroll-triggered animations
  useEffect(() => {
    setIsVisible(true);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    // Create particle animations - only on larger screens
    if (windowWidth > 768) {
      createParticles();
    } else {
      createParticlesMobile(); // Create fewer, simpler particles for mobile
    }

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [windowWidth]);

  // Function to create particle elements
  const createParticles = () => {
    const container = document.getElementById("about");
    if (!container) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Random size between 4px and 12px
      const size = Math.random() * 8 + 4;

      // Random position
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;

      // Random direction and distance for movement
      const xDistance = (Math.random() - 0.5) * 200;
      const yDistance = (Math.random() - 0.5) * 200;

      // Set CSS properties
      particle.classList.add("absolute", "rounded-full", "bg-purple-500/20");
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${xPos}%`;
      particle.style.top = `${yPos}%`;
      particle.style.animation = `float${Math.floor(Math.random() * 3) + 1} ${
        Math.random() * 10 + 15
      }s infinite ease-in-out`;

      // Add to container
      container.appendChild(particle);
    }
  };

  // Function to create simpler particles for mobile
  const createParticlesMobile = () => {
    const container = document.getElementById("about");
    if (!container) return;

    // Create only 5 larger particles for mobile
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div");

      // Larger size for better visibility on small screens
      const size = Math.random() * 12 + 8;

      // Random position
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;

      // Set CSS properties
      particle.classList.add("absolute", "rounded-full", "opacity-30");
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${xPos}%`;
      particle.style.top = `${yPos}%`;
      particle.style.background =
        "radial-gradient(circle at center, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0))";
      particle.style.animation = "floatUp 15s infinite ease-in-out";

      // Add to container
      container.appendChild(particle);
    }
  };

  // Skills with ratings for visual display
  const skills = [
    { icon: "🔥", skill: "React & Vite", level: 95 },
    { icon: "🎨", skill: "Tailwind CSS", level: 90 },
    { icon: "📊", skill: "Chart.js", level: 85 },
    { icon: "⚡", skill: "API Integrations", level: 88 },
    { icon: "🚀", skill: "CSS Animations", level: 92 },
  ];

  return (
    <div className="relative overflow-hidden bg-zinc-950" ref={sectionRef}>
      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="bg-gradient-to-br from-zinc-950 via-purple-950/30 to-zinc-950 w-full">
        {/* Animated background elements */}
        <div className="absolute top-20 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full bg-purple-600/10 filter blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-40 right-1/4 w-40 h-40 md:w-80 md:h-80 rounded-full bg-blue-500/10 filter blur-[100px] animate-pulse"
          style={{ animationDelay: "-3s" }}
        ></div>

        <section
          id="about"
          className="relative mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 lg:py-28 max-w-7xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Left Section - Info */}
            <div className="w-full md:w-1/2 text-left z-20">
              <div className="inline-block reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  About Me
                </h2>
                <div className="h-1.5 w-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-6 md:mb-8"></div>
              </div>

              {/* Introduction */}
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8 reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
                Hey there! I'm{" "}
                <span className="relative inline-block group">
                  <span className="text-white font-bold text-lg md:text-xl">
                    Jidnesh Patil
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </span>
                , a{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-semibold px-1 py-0.5 relative">
                  Frontend & MERN Stack Developer
                  <span className="absolute inset-0 bg-purple-900/10 rounded blur-sm"></span>
                </span>{" "}
                with a passion for building dynamic, responsive, and engaging
                web experiences. I love blending creativity with functionality
                to craft seamless user experiences.
              </p>

              {/* Skills & Expertise */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 flex items-center reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200">
                <span className="mr-3">Skills & Expertise</span>
                <div className="h-px flex-grow bg-gradient-to-r from-purple-400 to-transparent ml-2"></div>
              </h3>

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                {skills.map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-purple-900/30 hover:border-purple-500/50 shadow-lg transform hover:-translate-y-1 transition duration-300 reveal-on-scroll opacity-0 translate-y-4"
                    style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">{item.icon}</span>
                        <span className="text-gray-200 font-medium text-sm md:text-base">
                          {item.skill}
                        </span>
                      </div>
                      <div className="w-20 sm:w-24 md:w-36 bg-zinc-800/80 rounded-full h-2 md:h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000"
                          style={{
                            width: `${item.level}%`,
                            transitionDelay: `${0.6 + index * 0.1}s`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Passion & Goals */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 flex items-center reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-600">
                <span className="mr-3">Passion & Goals</span>
                <div className="h-px flex-grow bg-gradient-to-r from-purple-400 to-transparent ml-2"></div>
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8 reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-700">
                I constantly strive to learn and innovate, pushing my limits in
                Full-Stack development. My goal is to build impactful, scalable
                solutions that enhance user engagement and experience.
              </p>

              
            </div>

            {/* Right Section - Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-20 reveal-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 mt-8 md:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                {/* Animated ring */}
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur animate-pulse"></div>

                {/* Image container */}
                <div className="relative transition duration-300 transform hover:scale-[1.02]">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/pr.jpg"
                      alt="Jidnesh Patil"
                      className="w-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Image overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-60"></div>

                  {/* Experience badge */}
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Add animations for particles */}
      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(
              var(--x-distance, 20px),
              var(--y-distance, 20px)
            );
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(
              var(--x-distance, -20px),
              var(--y-distance, 20px)
            );
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(var(--x-distance, 20px), 0);
          }
          66% {
            transform: translate(0, var(--y-distance, 20px));
          }
        }
        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
