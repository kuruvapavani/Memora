import React, { useContext, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!cardsRef.current) return;

    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        y: "+=10",
        duration: 2 + index * 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-black via-[#001133] to-black text-white min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-orbitron text-hero mb-4">
            Welcome, {currentUser?.displayName || "Explorer"}!
          </h1>
          <p className="text-lg text-white/80 mb-10">
            Your digital time capsules await. Create, preserve, and relive your
            memories.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Link
              to="/create-capsule"
              className="bg-hero text-black font-semibold px-6 py-3 rounded-lg hover:opacity-80 transition"
            >
              + Create New Capsule
            </Link>
            <Link
              to="/my-capsules"
              className="border border-hero text-hero font-semibold px-6 py-3 rounded-lg hover:bg-hero/20 transition"
            >
              View My Capsules
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-white/5 border border-white/10 hover:border-hero transition-all duration-300 p-6 rounded-2xl text-left"
            >
              <h2 className="text-2xl font-orbitron text-hero mb-3">
                Upcoming Capsules
              </h2>
              <p className="text-white/80 leading-relaxed">
                Keep track of capsules set to open soon. Never miss a memory
                moment again.
              </p>
            </div>

            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/5 border border-white/10 hover:border-hero transition-all duration-300 p-6 rounded-2xl text-left"
            >
              <h2 className="text-2xl font-orbitron text-hero mb-3">
                Friends' Capsules
              </h2>
              <p className="text-white/80 leading-relaxed">
                Join your friends in unlocking shared capsules and reliving
                memories together.
              </p>
            </div>

            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-white/5 border border-white/10 hover:border-hero transition-all duration-300 p-6 rounded-2xl text-left"
            >
              <h2 className="text-2xl font-orbitron text-hero mb-3">
                Opened Capsules
              </h2>
              <p className="text-white/80 leading-relaxed">
                Revisit your opened capsules anytime and cherish the memories
                you’ve preserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
