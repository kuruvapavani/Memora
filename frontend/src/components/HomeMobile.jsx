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

      {/* === Capsule Info Section === */}
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

      {/* === Why Memora Section === */}
      <section className="fade-up text-center px-6 py-20 space-y-10 border-t border-white/10">
        <h2 className="fade-text float-head text-3xl font-orbitron text-hero leading-snug">
          Why Memora?
        </h2>
        <div className="fade-text space-y-6 max-w-sm mx-auto text-white/90 text-base leading-relaxed">
          <div className="border-l-2 border-hero/50 pl-4 text-left">
            <p>
              <span className="text-hero font-semibold">Private:</span> Your
              memories stay completely yours.
            </p>
          </div>
          <div className="border-l-2 border-hero/50 pl-4 text-left">
            <p>
              <span className="text-hero font-semibold">Authentic:</span>{" "}
              Capture the real essence of every moment.
            </p>
          </div>
          <div className="border-l-2 border-hero/50 pl-4 text-left">
            <p>
              <span className="text-hero font-semibold">Effortless:</span>{" "}
              Designed to be simple and intuitive.
            </p>
          </div>
          <div className="border-l-2 border-hero/50 pl-4 text-left">
            <p>
              <span className="text-hero font-semibold">Timeless:</span> Relive
              emotions, not just events.
            </p>
          </div>
        </div>
      </section>

      {/* === How It Works Section === */}
      <section className="fade-up text-center px-6 py-20 space-y-10 border-t border-white/10">
        <h2 className="fade-text float-head text-3xl font-orbitron text-hero leading-snug">
          How It Works
        </h2>
        <p className="fade-text text-base leading-relaxed text-white/90 max-w-sm mx-auto">
          A simple 3-step process that keeps your memories safe until the right
          moment.
        </p>
        <div className="fade-text grid grid-cols-1 gap-6 max-w-sm mx-auto">
          {[
            {
              title: "Create",
              desc: "Add your messages, images, or voice notes to your capsule.",
            },
            {
              title: "Lock",
              desc: "Choose a date to seal your capsule until it’s time to open.",
            },
            {
              title: "Relive",
              desc: "Open it later and revisit your most cherished memories.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-hero/30 backdrop-blur-md hover:border-hero/70 transition duration-300 text-left"
            >
              <h3 className="text-hero font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-white/90 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeMobile;
