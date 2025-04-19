import Spline from "@splinetool/react-spline";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";

export default function Footer() {
  const [isHovering, setIsHovering] = useState(null);

  // Social media links with animations
  const socialLinks = [
    { icon: "fab fa-instagram", url: "https://www.instagram.com/jidnesh__007?igsh=cnNzcXNkNnM3emhn", label: "Instagram" },
    { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/jidnesh-patil-229a822bb/", label: "LinkedIn" },
    { icon: "fab fa-github", url: "https://github.com/jidnesh007", label: "GitHub" },
    { icon: "fa-brands fa-whatsapp" , url: "https://wa.me/7208741007", label: "Whatsapp" },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black via-[#0a0011] to-[#1d0529] flex flex-col justify-end items-center relative overflow-hidden">
      {/* Fixed visible particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          // Generate random values before using in style
          const size = Math.floor(Math.random() * 4) + 2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.floor(Math.random() * 30) + 60;
          const delay = Math.floor(Math.random() * 30);

          return (
            <div
              key={i}
              className="absolute rounded-full bg-purple-400"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: 0.2,
                // Fix: Separate animation properties instead of shorthand
                animationName: "floatParticle",
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Enhanced visible stars with improved visibility */}
      <div className="absolute inset-0">
        {/* Large bright stars */}
        {[...Array(15)].map((_, i) => {
          const size = Math.floor(Math.random() * 3) + 2; // Larger stars
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.floor(Math.random() * 7) + 4;
          const delay = Math.floor(Math.random() * 5);

          return (
            <div
              key={`bright-star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: 0.9, // Much higher opacity
                boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)", // Add glow effect
                animationName: "twinkleBright",
                animationDuration: `${duration}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Medium stars */}
        {[...Array(35)].map((_, i) => {
          const size = Math.floor(Math.random() * 2) + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.floor(Math.random() * 5) + 5;
          const delay = Math.floor(Math.random() * 5);

          return (
            <div
              key={`med-star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: 0.7, // Higher opacity than before
                boxShadow: "0 0 5px 1px rgba(255, 255, 255, 0.5)", // Add subtle glow
                animationName: "twinkle",
                animationDuration: `${duration}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Small distant stars */}
        {[...Array(70)].map((_, i) => {
          const size = 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.floor(Math.random() * 8) + 3;
          const delay = Math.floor(Math.random() * 8);

          return (
            <div
              key={`small-star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: 0.5, // Still visible but more subtle
                animationName: "twinkleSmall",
                animationDuration: `${duration}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Gradient glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent blur-3xl"></div>

      {/* Get in Touch & Social Media Icons with hover effects */}
      <div className="absolute top-1/8 z-10 flex flex-col items-center gap-8 text-white">
        {/* Animated "Get in Touch" Text */}
        <h1
          className="text-3xl md:text-4xl font-bold tracking-wide relative group"
          style={{
            textShadow: "0 0 15px rgba(138, 43, 226, 0.6)",
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Get in Touch
          </span>
          <span className="text-purple-300">();</span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-700"></div>
        </h1>

        {/* Enhanced Social Media Icons - Fixed hover effects */}
        <div className="flex space-x-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              aria-label={link.label}
              className="group relative"
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-purple-500/30 bg-black/40 backdrop-blur-md group-hover:border-purple-400 transition-colors duration-300">
                <i
                  className={`${link.icon} text-2xl text-purple-300 group-hover:text-indigo-300 transition-colors duration-300`}
                ></i>

                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-full bg-purple-700/20 blur-md transition-opacity duration-300 ${
                    isHovering === index ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              {/* Tooltip on hover with fixed positioning */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <span
                  className={`px-3 py-1 bg-black/80 border border-purple-500/30 text-xs rounded-md transition-opacity duration-300 block ${
                    isHovering === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {link.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Spline Model */}
      <div className="w-full flex justify-center md:translate-y-55 translate-y-12">
        <Spline scene="https://prod.spline.design/Y-AssIub8IfCg40V/scene.splinecode" />
      </div>

      {/* Dark nebula effect */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Embedded styles for animations */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-150px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-300px);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            opacity: 0.5;
          }
        }

        @keyframes twinkleBright {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }

        @keyframes twinkleSmall {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
