// src/components/HomeDesktop.jsx
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "./Model";

gsap.registerPlugin(ScrollTrigger);

const HomeDesktop = ({ scrollY }) => {
  useEffect(() => {
    // Section fade-up
    gsap.utils.toArray(".fade-up").forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    });

    // Headings / text fade
    gsap.utils.toArray(".fade-text").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });

    // Button pulse animation
    gsap.utils.toArray(".cta-btn").forEach((btn) => {
      gsap.fromTo(
        btn,
        { scale: 0.9, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: btn, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <div className="hidden md:block h-[300vh] w-full relative">
      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, 10, 30], fov: 50 }}>
        <color attach="background" args={["black"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model scrollY={scrollY} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* Section 0 - Hero */}
      <div className="fade-up absolute top-0 left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
        <div className="max-w-2xl text-white mb-12 md:mb-0 space-y-6">
          <h1 className="fade-text text-5xl font-orbitron text-hero">
            Preserve Your Memories for Tomorrow
          </h1>
          <p className="fade-text text-2xl leading-relaxed">
            Store your most precious moments—text, photos, and voice—in a secure digital capsule.
          </p>
          <Link
              to="/create-capsule"
              className="fade-btn inline-block px-8 py-3 rounded-xl font-orbitron bg-black text-hero border border-hero shadow-lg hover:scale-105 hover:shadow-hero/50 transition-transform duration-300"
            >
              Create Capsule
            </Link>
        </div>
        <div className="hidden md:block w-1/2" />
      </div>

      {/* Section 1 - Capsule Info */}
      <div className="fade-up absolute top-[100vh] left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
        <div className="flex-1 mb-12 md:mb-0" />
        <div className="flex-1 max-w-2xl text-white space-y-6">
          <h2 className="fade-text text-5xl font-orbitron text-hero">
            A Capsule Built for You
          </h2>
          <p className="fade-text text-2xl leading-relaxed">
            Private, personal, and easy to use — Memora makes memory-keeping effortless.
          </p>
          <Link
              to="/create-capsule"
              className="fade-btn inline-block px-8 py-3 rounded-xl font-orbitron bg-black text-hero border border-hero shadow-lg hover:scale-105 hover:shadow-hero/50 transition-transform duration-300"
            >
              Create Capsule
            </Link>
        </div>
      </div>

      {/* Section 2 - Why Memora */}
      <div className="absolute top-[200vh] left-0 w-full h-screen flex flex-col items-center justify-center px-10 md:px-20 text-white font-orbitron fade-up">
        <h2 className="text-6xl mb-24 text-center text-hero fade-text">Why Memora?</h2>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-52 mt-24">
          <ul className="flex flex-col gap-12 text-xl max-w-[360px] text-right">
            <li className="fade-text">🔒 Private and secure</li>
            <li className="fade-text">📦 A true memory capsule</li>
            <li className="fade-text">✨ Simple and easy to use</li>
          </ul>
          <ul className="flex flex-col gap-12 text-xl max-w-[360px] text-left">
            <li className="fade-text">📅 Capture memories anytime</li>
            <li className="fade-text">📝 Easy organization</li>
            <li className="fade-text">💖 Share with loved ones</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeDesktop;
