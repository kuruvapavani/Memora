// src/pages/About.jsx
import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-black via-[#001133] to-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-orbitron text-hero mb-6">
            About Memora
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Memora is a digital time capsule platform that helps you{" "}
            <span className="text-hero font-semibold">
              preserve your memories for tomorrow
            </span>
            . Whether it’s your thoughts, milestones, or special moments, 
            Memora allows you to securely store them and revisit in the future.
          </p>
        </div>

        {/* Mission / Vision Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white/5 p-8 rounded-2xl shadow-md border border-white/10 hover:border-hero transition-all duration-300">
            <h2 className="text-2xl font-orbitron text-hero mb-4">Our Mission</h2>
            <p className="text-white/80 leading-relaxed">
              To create a safe, personalized space where memories can be stored,
              cherished, and shared across generations.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl shadow-md border border-white/10 hover:border-hero transition-all duration-300">
            <h2 className="text-2xl font-orbitron text-hero mb-4">Our Vision</h2>
            <p className="text-white/80 leading-relaxed">
              Building a future where technology and emotions merge — 
              ensuring no story, no feeling, and no journey is ever lost.
            </p>
          </div>
        </div>

        {/* Team / Credits Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-orbitron text-hero mb-6">
            Crafted by Kuruva Pavani
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            A passionate MERN Stack Developer and aspiring Software Engineer, 
            committed to building meaningful digital experiences that last. 
            Memora is not just a project, it’s a reflection of my journey and dedication.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
