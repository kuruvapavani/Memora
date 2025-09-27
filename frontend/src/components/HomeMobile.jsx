// src/components/HomeMobile.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeMobile = () => {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-text, .fade-btn").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            delay: i * 0.1,
          }
        );
      });

      gsap.utils.toArray(".float-head").forEach((head) => {
        gsap.to(head, {
          y: "+=8",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 2,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="block md:hidden flex flex-col bg-gradient-to-b from-black via-[#001133] to-black"
    >
      {/* Hero Section */}
      <section className="fade-up text-center px-6 py-20 space-y-8">
        <h1 className="fade-text float-head text-3xl font-orbitron text-hero leading-snug">
          Preserve Your Memories
        </h1>
        <p className="fade-text text-base leading-relaxed text-white/90 max-w-sm mx-auto">
          Store your most precious moments—text, photos, and voice—in a secure
          digital capsule. Open them when the time is right.
        </p>
        <Link
          to="/create-capsule"
          className="fade-btn inline-block px-6 py-3 rounded-xl font-orbitron bg-black text-hero border border-hero shadow-lg hover:scale-105 hover:shadow-hero/50 transition-transform duration-300"
        >
          Create Capsule
        </Link>
      </section>

      {/* Capsule Info Section */}
      <section className="fade-up text-center px-6 py-20 space-y-8 border-t border-white/10">
        <h2 className="fade-text float-head text-3xl font-orbitron text-hero leading-snug">
          A Capsule Built for You
        </h2>
        <p className="fade-text text-base leading-relaxed text-white/90 max-w-sm mx-auto">
          Private, personal, and easy to use — Memora makes memory-keeping
          effortless. Securely capture moments and revisit them whenever you
          choose.
        </p>
        <Link
          to="/create-capsule"
          className="fade-btn inline-block px-6 py-3 rounded-xl font-orbitron bg-black text-hero border border-hero shadow-lg hover:scale-105 hover:shadow-hero/50 transition-transform duration-300"
        >
          Create Capsule
        </Link>
      </section>

      {/* Features Section */}
      <section className="fade-up px-6 py-20 space-y-10 border-t border-white/10">
        <h2 className="fade-text float-head text-3xl font-orbitron text-center text-hero leading-snug">
          Why Memora?
        </h2>
        <ul className="fade-list flex flex-col gap-6 max-w-sm mx-auto">
          {[
            "🔒 Private and secure",
            "📦 A true memory capsule",
            "✨ Simple and easy to use",
            "📅 Capture memories anytime",
            "📝 Easy organization",
            "💖 Share with loved ones",
          ].map((item, idx) => (
            <li
              key={idx}
              className="fade-text bg-white/10 backdrop-blur-md rounded-xl py-4 px-5 text-white text-base font-medium shadow-md"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomeMobile;
