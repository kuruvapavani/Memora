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
    // Fade-up for sections
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

    // Fade text elements
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

    // Buttons pulse
    gsap.utils.toArray(".fade-btn").forEach((btn) => {
      gsap.fromTo(
        btn,
        { scale: 0.9, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "elastic.out(1,0.5)",
          scrollTrigger: { trigger: btn, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <div className="hidden md:block h-[400vh] w-full relative">
      {/* === 3D Scene === */}
      <Canvas camera={{ position: [0, 10, 30], fov: 50 }}>
        <color attach="background" args={["black"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model scrollY={scrollY} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>

      {/* === Section 0: Hero (UI Left → Model Right) === */}
      <div className="fade-up absolute top-0 left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="fade-text text-5xl font-orbitron text-hero">
            Preserve Your Memories for Tomorrow
          </h1>
          <p className="fade-text text-2xl leading-relaxed">
            Store your most precious moments—text, photos, and voice—in a secure
            digital capsule.
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

      {/* === Section 1: Capsule Info (UI Right → Model Left) === */}
      <div className="fade-up absolute top-[100vh] left-0 w-full h-screen flex flex-col md:flex-row-reverse items-center justify-between px-10 md:px-20">
        <div className="max-w-2xl text-white space-y-6">
          <h2 className="fade-text text-5xl font-orbitron text-hero">
            A Capsule Built for You
          </h2>
          <p className="fade-text text-2xl leading-relaxed">
            Private, personal, and easy to use — Memora makes memory-keeping
            effortless.
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

      {/* === Section 2: Why Memora (UI Left → Model Right) === */}
      <div className="fade-up absolute top-[200vh] left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
        <div className="max-w-2xl text-white space-y-8">
          <h2 className="fade-text text-5xl font-orbitron text-hero tracking-wide">
            Why Memora?
          </h2>
          <p className="fade-text text-2xl leading-relaxed opacity-90">
            Memora redefines how memories are preserved — giving you a timeless,
            private space to relive the past beautifully.
          </p>

          <div className="fade-text mt-8 space-y-4 border-l-2 border-hero/50 pl-6">
            <p className="text-2xl">
              <span className="text-hero font-semibold">Private:</span> Your
              moments stay truly yours.
            </p>
            <p className="text-2xl">
              <span className="text-hero font-semibold">Authentic:</span>{" "}
              Capture the real essence of every memory.
            </p>
            <p className="text-2xl">
              <span className="text-hero font-semibold">Effortless:</span>{" "}
              Designed to be simple and intuitive.
            </p>
            <p className="text-2xl">
              <span className="text-hero font-semibold">Timeless:</span> Relive
              emotions, not just events.
            </p>
          </div>
        </div>
        <div className="hidden md:block w-1/2" />
      </div>

      {/* === Section 3: How It Works (UI Right → Model Left) === */}
      <div className="fade-up absolute top-[300vh] left-0 w-full h-screen flex flex-col md:flex-row-reverse items-center justify-between px-10 md:px-20">
        <div className="max-w-2xl text-white space-y-8">
          <h2 className="fade-text text-5xl font-orbitron text-hero tracking-wide">
            How It Works
          </h2>
          <p className="fade-text text-2xl leading-relaxed opacity-90">
            A simple process that keeps your memories safe until the right
            moment.
          </p>

          <div className="fade-text mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-hero/30 backdrop-blur-md hover:border-hero/70 transition duration-300">
              <h3 className="text-hero font-semibold text-xl mb-2">Create</h3>
              <p className="text-lg opacity-90">
                Add your messages, images, or voice notes to your capsule.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-hero/30 backdrop-blur-md hover:border-hero/70 transition duration-300">
              <h3 className="text-hero font-semibold text-xl mb-2">Lock</h3>
              <p className="text-lg opacity-90">
                Choose a date to seal your capsule until it’s time to open.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-hero/30 backdrop-blur-md hover:border-hero/70 transition duration-300">
              <h3 className="text-hero font-semibold text-xl mb-2">Relive</h3>
              <p className="text-lg opacity-90">
                When the time comes, open it and relive your most cherished
                memories.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-1/2" />
      </div>
    </div>
  );
};

export default HomeDesktop;
