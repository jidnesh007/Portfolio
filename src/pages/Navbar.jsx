import { useState, useEffect } from "react";
import { Menu, X, Code, Star } from "lucide-react";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    // Handle navbar transparency based on scroll position
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    // Implement scroll spy functionality
    const handleScrollSpy = () => {
      const sections = navLinks
        .map((link) => ({
          id: link.id,
          name: link.name,
          element: document.getElementById(link.id),
        }))
        .filter((section) => section.element);

      // Find which section is currently in view
      let currentSection = "Home";

      // Special case for home (top of page)
      if (window.scrollY < 100) {
        currentSection = "Home";
      } else {
        for (const section of sections) {
          const sectionTop = section.element.offsetTop - 100; // Offset for navbar height
          const sectionBottom = sectionTop + section.element.offsetHeight;

          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.name;
            break;
          }
        }
      }

      if (currentSection !== activeLink) {
        setActiveLink(currentSection);
      }
    };

    // Combined scroll handler for both functions
    const handleScrollEvents = () => {
      handleScroll();
      handleScrollSpy();
    };

    window.addEventListener("scroll", handleScrollEvents);

    // Initial check
    handleScrollEvents();

    return () => {
      window.removeEventListener("scroll", handleScrollEvents);
    };
  }, [activeLink]);

  // Add function to handle smooth scrolling
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Tech-Stack", href: "#tech-stack", id: "tech-stack" },
    { name: "Projects", href: "#project", id: "project" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolling
          ? "backdrop-blur-lg bg-black/30 shadow-[0_8px_30px_rgb(138,43,226,0.1)]"
          : "bg-transparent"
      }`}
    >
      {/* Animated stars in navbar background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {scrolling &&
          [...Array(10)].map((_, i) => (
            <div
              key={`nav-star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: 0.5,
                animation: `navTwinkle ${
                  Math.random() * 4 + 3
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center relative">
        {/* Enhanced Logo with glow effect */}
        <a
          href="#"
          className="text-white text-2xl font-bold flex items-center group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveLink("Home");
          }}
        >
          <Code
            className="mr-2 text-purple-300 group-hover:text-purple-400 transition-colors duration-300"
            size={24}
          />
          <span className="relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
              &lt;Jidnesh/&gt;
            </span>
            <span className="absolute -inset-1 bg-purple-500/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
        </a>

        {/* Desktop Nav Links with enhanced hover effects */}
        <ul className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`relative text-lg font-medium hover:text-purple-300 transition-colors duration-300 group ${
                  activeLink === link.name ? "text-purple-300" : "text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.name);
                  scrollToSection(link.id);
                }}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 ${
                    activeLink === link.name
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Enhanced Mobile Menu Button with animations */}
        <button
          className="md:hidden relative text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-purple-900/30"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="absolute inset-0 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"></div>
          {isOpen ? (
            <X className="text-purple-200" />
          ) : (
            <Menu className="text-purple-200" />
          )}
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`md:hidden absolute w-full backdrop-blur-xl bg-black/60 text-white transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96 border-b border-purple-900/30" : "max-h-0"
        }`}
      >
        <div className="relative py-6 px-6 flex flex-col items-center gap-6">
          {/* Decorative elements */}
          <Star className="absolute top-6 right-10 text-purple-500/20 w-24 h-24 opacity-20" />
          <Star className="absolute bottom-6 left-10 text-purple-500/20 w-16 h-16 opacity-10" />

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-lg font-medium relative group ${
                activeLink === link.name
                  ? "text-purple-300"
                  : "text-white hover:text-purple-300"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.name);
                setIsOpen(false);
                scrollToSection(link.id);
              }}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 ${
                  activeLink === link.name ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </a>
          ))}
        </div>
      </div>

      {/* Embedded styles for animations */}
      <style jsx>{`
        @keyframes navTwinkle {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
