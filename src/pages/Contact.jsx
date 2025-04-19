import { useEffect, useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("about").offsetTop,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Floating Gradient Background */}
      <div className="absolute inset-0">
        <div id="contact" className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Contact Form */}
      <div className="relative z-10 w-full max-w-lg p-8 bg-white/10 backdrop-blur-lg shadow-lg rounded-lg border border-white/20">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Contact Me
        </h2>
        <p className="text-gray-300 text-center mt-2">
          I’d love to hear from you!
        </p>

        <form className="mt-6 space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transform hover:scale-105 transition-transform"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transform hover:scale-105 transition-transform"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transform hover:scale-105 transition-transform"
          ></textarea>

          <button className="w-full py-3 font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:shadow-purple-500/50">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
