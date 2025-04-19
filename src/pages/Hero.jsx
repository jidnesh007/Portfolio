import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Github, Linkedin, CodeXml } from "lucide-react";
import * as THREE from "three";
import "../style/Hero.css";

export default function Hero() {
  // Typing effect state
  const roles = ["Frontend Developer", "MERN Stack Developer", "Web Developer"];
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // THREE.js refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());
  const targetMouseRef = useRef(new THREE.Vector2());

  // Helper function to render letters with hover effect
  const renderLetters = (text) =>
    text.split("").map((char, index) => (
      <span key={index} className="hover-letter">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  // Typing effect animation
  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(() => {
      const currentText = roles[roleIndex];

      setCurrentRole(
        isDeleting
          ? currentText.substring(0, charIndex - 1)
          : currentText.substring(0, charIndex + 1)
      );

      if (!isDeleting && charIndex === currentText.length) {
        setIsDeleting(true);
        setTimeout(() => {}, 1000); // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // THREE.js particle system
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize scene, camera and renderer
    sceneRef.current = new THREE.Scene();

    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particleCount = window.innerWidth < 768 ? 1500 : 3000;
    createParticles(particleCount);

    // Set up event listeners
    const windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    const onMouseMove = (event) => {
      targetMouseRef.current.x = (event.clientX - windowHalf.x) * 0.0003;
      targetMouseRef.current.y = (event.clientY - windowHalf.y) * 0.0003;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Handle scroll indicator animation
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator && window.gsap) {
      window.gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Animation loop
    const animate = () => {
      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !particlesRef.current
      )
        return;

      animationRef.current = requestAnimationFrame(animate);

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Update particle positions
      if (particlesRef.current) {
        const positions =
          particlesRef.current.geometry.attributes.position.array;
        const velocities = particlesRef.current.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.x += 0.0001 + mouseRef.current.y * 0.02;
        particlesRef.current.rotation.y += 0.0002 + mouseRef.current.x * 0.02;
      }

      // Update camera position
      cameraRef.current.position.x +=
        (mouseRef.current.x * 2 - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y +=
        (-mouseRef.current.y * 2 - cameraRef.current.position.y) * 0.05;
      cameraRef.current.lookAt(sceneRef.current.position);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      windowHalf.set(width / 2, height / 2);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (particlesRef.current && particlesRef.current.geometry) {
        particlesRef.current.geometry.dispose();
      }

      if (particlesRef.current && particlesRef.current.material) {
        particlesRef.current.material.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current = null;
      }
    };
  }, []);

  // Create particle system
  const createParticles = (particleCount) => {
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      colors[i] = 0.5 + Math.random() * 0.5;
      colors[i + 1] = 0.2 + Math.random() * 0.3;
      colors[i + 2] = 0.8 + Math.random() * 0.2;

      sizes[i / 3] = Math.random() * 3;

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(vColor, smoothstep(0.5, 0.2, dist));
        }
      `,
      transparent: true,
      vertexColors: true,
    });

    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current.userData.velocities = velocities;
    sceneRef.current.add(particlesRef.current);
  };

  return (
    <div id="home" className="relative min-h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 mt-16">
          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {renderLetters("JIDNESH PATIL")}
          </motion.h1>

          {/* Typing Effect */}
          <p
            className="typing-text text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-6 sm:mb-8"
            aria-hidden="true"
          >
            {currentRole}
            <span className="cursor">|</span>
          </p>

          {/* Description */}
          <motion.div
            className="desc leading-relaxed text-lg sm:text-xl md:text-2xl w-[90%] sm:w-[60%] md:w-[50%] text-gray-400 text-center mb-8 sm:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            I specialize in crafting responsive and interactive web experiences
            that merge creativity with functionality. Let's build something
            amazing together!
          </motion.div>

          <motion.div
            className="flex gap-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* Resume Button */}
            <motion.a
              href="https://drive.google.com/file/d/1_6Xs7CvXGJgN_guVmWYX-BO1jEpzXIzn/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent rounded-lg font-semibold border border-purple-500/50 flex items-center justify-center gap-2 text-sm sm:text-base"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(147, 51, 234, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>Resume</span>
            </motion.a>

            <motion.a
              href="https://github.com/jidnesh007"
              className="px-6 sm:px-8 py-3 sm:py-4 animated-butto flex items-center justify-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>View My Work</span>
            </motion.a>
          </motion.div>

          <motion.div
            className="flex gap-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href="https://www.linkedin.com/in/jidnesh-patil-229a822bb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <Linkedin className="w-8 h-8 sm:w-9 sm:h-9" />
            </a>

            <a
              href="https://leetcode.com/u/Jidnesh007/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <CodeXml className="w-8 h-8 sm:w-9 sm:h-9" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
