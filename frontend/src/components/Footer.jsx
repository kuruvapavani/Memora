// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-[#001133] to-black text-white py-12 px-6 border-t border-hero">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-orbitron text-hero">Memora</h2>
          <p className="text-sm text-white/70 mt-2">
            Preserve Your Memories for Tomorrow.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-orbitron text-hero mb-3">Explore</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link
                to="/about"
                className="hover:text-hero transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-hero transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-hero transition-colors duration-300"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/my-capsules"
                className="hover:text-hero transition-colors duration-300"
              >
                My Capsules
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-orbitron text-hero mb-3">Contact</h3>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-hero" />
              <a
                href="mailto:pavanikuruva2109@gmail.com"
                className="hover:text-hero transition-colors duration-300"
                aria-label="Email Pavani"
              >
                pavanikuruva2109@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={16} className="text-hero" />
              <a
                href="https://www.linkedin.com/in/kuruva-pavani-2109k/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hero transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Github size={16} className="text-hero" />
              <a
                href="https://github.com/kuruvapavani"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hero transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} className="text-hero" />
              <a
                href="https://kuruva-pavani.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hero transition-colors duration-300"
                aria-label="Portfolio Website"
              >
                Portfolio
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mt-8 text-sm text-white/70">
        <p>
          Made with <span className="text-hero">❤️</span> by{" "}
          <span className="font-semibold">Kuruva Pavani</span>
        </p>
        <p>© {new Date().getFullYear()} Memora</p>
      </div>
    </footer>
  );
};

export default Footer;
