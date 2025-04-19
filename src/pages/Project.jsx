import React, { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Investment Portal",
    type: "Finance Platform",
    description:
      "A platform that provides real-time investment analytics, stock recommendations, and financial insights.",
    image: "/c1.png",
    link: "#",
    tags: ["react.js", "tailwind", "api", "chart.js", "finance"],
    color: "text-blue-400",
    borderColor: "border-blue-400",
    align: "left",
  },
  {
    name: "Medsync",
    type: "Healthcare Platform",
    description:
      "A personalized treatment planning app for chronic disease patients, collecting patient data and medical history.",
    image: "/c2.png",
    link: "#",
    tags: ["react.js", "healthcare", "tailwind", "next.js", "api"],
    color: "text-green-400",
    borderColor: "border-green-400",
    align: "right",
  },
];

function Project() {
  const [activeSection, setActiveSection] = useState("projects");
  const [hoveredProject, setHoveredProject] = useState(null);

  // Handler functions for button clicks
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="bg-zinc-950 overflow-hidden">
      <section id="project" className="max-w-screen-xl mx-auto px-4 sm:px-8 py-16 text-white relative">
        {/* Section Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 relative">
          {/* Vertical Line at the Top (Hidden in Mobile) */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "calc(100% + 50px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] bg-gray-500 hidden sm:block"
          />

          {/* Certificates Button (Left) */}
          <div className="relative w-full sm:w-1/3 flex justify-center sm:justify-end sm:pr-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "calc(100% - 20px)" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-1/2 right-full h-[0px] bg-gray-500 hidden sm:block"
            />
            <button
              onClick={() => handleSectionChange("certificates")}
              className={`relative hidden px-5 py-2 text-lg font-semibold rounded-md transition duration-300 w-full sm:w-auto
                ${
                  activeSection === "certificates"
                    ? "bg-gradient-to-r from-[#1788ae] to-[#0c5a74] text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 hover:bg-gradient-to-r hover:from-[#1788ae] hover:to-[#0c5a74] hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                }`}
            >
              Certificates
            </button>
          </div>

          {/* Projects Button (Center) */}
          <div className="relative w-full sm:w-1/3 flex justify-center">
            <button
              onClick={() => handleSectionChange("projects")}
              className={`relative px-5 py-2 text-lg font-semibold rounded-md transition duration-300 w-full sm:w-auto
                ${
                  activeSection === "projects"
                    ? "bg-gradient-to-r from-[#1788ae] to-[#0c5a74] text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 hover:bg-gradient-to-r hover:from-[#1788ae] hover:to-[#0c5a74] hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                }`}
            >
              Projects
            </button>
          </div>

          {/* Experience Button (Right) */}
          <div className="relative w-full sm:w-1/3 flex justify-center sm:justify-start sm:pl-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "calc(100% - 20px)" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-1/2 left-full h-[0px] bg-gray-500 hidden sm:block"
            />
            <button
              onClick={() => handleSectionChange("experience")}
              className={`relative hidden px-5 py-2 text-lg font-semibold rounded-md transition duration-300 w-full sm:w-auto
                ${
                  activeSection === "experience"
                    ? "bg-gradient-to-r from-[#1788ae] to-[#0c5a74] text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 hover:bg-gradient-to-r hover:from-[#1788ae] hover:to-[#0c5a74] hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                }`}
            >
              Experience
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical Line (Hidden on Mobile) */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-gray-500 hidden sm:block"
          />

          {/* Projects */}
          {activeSection === "projects" &&
            projects.map((project, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-12 my-12 relative ${
                  project.align === "right" ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Connector Dot (Hidden on Mobile) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 bg-[#121212] z-10 hidden sm:block ${project.borderColor}`}
                />

                {/* Horizontal Line (Hidden on Mobile) */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 200 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className={`absolute top-1/2 h-[2px] bg-gray-500 hidden sm:block ${
                    project.align === "left" ? "right-1/2" : "left-1/2"
                  }`}
                />

                {/* Image with Hover Effect */}
                <motion.div
                  initial={{
                    x: project.align === "right" ? 100 : -100,
                    opacity: 0,
                  }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-full sm:w-1/2 flex justify-center relative"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative group overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.name}
                      className={`max-w-[400px] w-full rounded-lg shadow-lg transition-transform duration-500 ${
                        hoveredProject === index ? "scale-110" : "scale-100"
                      }`}
                    />
                    {/* Top Link Button */}
                    <div
                      className={`absolute top-[-1rem] inset-x-0 p-4 flex justify-center transition-opacity duration-300 ${
                        hoveredProject === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <a
                        href={project.link}
                        className="px-4 py-2 bg-[#ff6b47] text-white font-medium rounded hover:bg-[#e55b3c] transition duration-300 flex items-center text-sm"
                      >
                        <span>{project.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-full sm:w-1/2"
                >
                  <h3
                    className={`font-bold text-2xl md:text-4xl ${project.color}`}
                  >
                    {project.name}
                  </h3>
                  <span className={`${project.color} text-base md:text-lg`}>
                    ({project.type})
                  </span>
                  <p className="text-sm md:text-base mt-2 text-gray-300">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, idx) => (
                      <li
                        key={idx}
                        className="border rounded-full px-3 py-1 text-sm border-gray-500 text-gray-300"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}

          {/* View More Button */}
          {activeSection === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <a href="https://github.com/jidnesh007">
                <button className="px-6 py-2 text-lg font-semibold animated-butto z-10 relative hover:bg-[#0c5a74] text-white transition duration-300 rounded-md">
                  View More
                </button>
              </a>
            </motion.div>
          )}

          {activeSection === "certificates" && (
            <div className="text-center text-gray-300 text-lg">
              📜 Certificates will be listed here.
            </div>
          )}

          {activeSection === "experience" && (
            <div className="text-center text-gray-300 text-lg">
              💼 Experience details will be displayed here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Project;
