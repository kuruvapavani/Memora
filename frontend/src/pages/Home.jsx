// src/pages/Home.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import Layout from "../components/Layout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const degToRad = (deg) => (deg * Math.PI) / 180;

// 3D Model Component
const Model = ({ scrollY }) => {
  const modelRef = useRef();
  const { scene } = useGLTF("/assets/memora_capsule.glb");

  const sections = [
    { scroll: 0, pos: [5, 7, 0], rot: [0, degToRad(-50), 0] },
    { scroll: 1, pos: [-5, 0, 5], rot: [0, degToRad(50), 0] },
    { scroll: 2, pos: [0, -17, 0], rot: [0, 0, 0] },
  ];

  const scale = 0.01;

  useFrame(({ clock }) => {
    if (!modelRef.current) return;
    const scrollProgress = scrollY.current / window.innerHeight;

    let start = sections[0];
    let end = sections[sections.length - 1];

    for (let i = 0; i < sections.length - 1; i++) {
      if (
        scrollProgress >= sections[i].scroll &&
        scrollProgress <= sections[i + 1].scroll
      ) {
        start = sections[i];
        end = sections[i + 1];
        break;
      }
    }

    const sectionProgress = Math.min(
      Math.max(
        (scrollProgress - start.scroll) / (end.scroll - start.scroll),
        0
      ),
      1
    );

    const x = start.pos[0] + (end.pos[0] - start.pos[0]) * sectionProgress;
    const y = start.pos[1] + (end.pos[1] - start.pos[1]) * sectionProgress;
    const z = start.pos[2] + (end.pos[2] - start.pos[2]) * sectionProgress;

    const rotX = start.rot[0] + (end.rot[0] - start.rot[0]) * sectionProgress;
    const rotY = start.rot[1] + (end.rot[1] - start.rot[1]) * sectionProgress;
    const rotZ = start.rot[2] + (end.rot[2] - start.rot[2]) * sectionProgress;

    // Floating + slow rotation
    modelRef.current.position.set(
      x,
      y + Math.sin(clock.getElapsedTime()) * 0.2,
      z
    );
    modelRef.current.rotation.set(
      rotX,
      rotY + Math.sin(clock.getElapsedTime()) * 0.05,
      rotZ
    );
  });

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      modelRef.current.position,
      { y: sections[0].pos[1] - 2 },
      { y: sections[0].pos[1], duration: 1.5, ease: "power3.out" }
    );
  }, []);

  return <primitive ref={modelRef} object={scene} scale={scale} />;
};

const Home = () => {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-triggered animations for sections
  useEffect(() => {
    gsap.utils.toArray(".fade-up").forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });

    // Animate headings and paragraphs inside sections
    gsap.utils.toArray(".fade-text").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <Layout>
      <div className="h-[300vh] w-full relative bg-black">
        {/* Three.js Canvas */}
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

        {/* Section 0 - Hero */}
        <div className="fade-up absolute top-0 left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
          <div className="max-w-2xl text-white mb-12 md:mb-0">
            <h1 className="fade-text text-4xl md:text-5xl font-orbitron mb-6 text-hero">
              Preserve Your Memories for Tomorrow
            </h1>
            <p className="fade-text text-xl md:text-2xl leading-relaxed">
              Store your most precious moments—text, photos, and voice—in a
              secure digital capsule. Open them when the time is right.
            </p>
          </div>
          <div className="hidden md:block w-1/2" />
        </div>

        {/* Section 1 - Features */}
        <div className="fade-up absolute top-[100vh] left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
          <div className="flex-1 mb-12 md:mb-0">
            {/* Model handled by Canvas */}
          </div>
          <div className="flex-1 max-w-2xl text-white">
            <h2 className="fade-text text-4xl md:text-5xl font-orbitron mb-6 text-hero">
              A Capsule Built for You
            </h2>
            <p className="fade-text text-xl md:text-2xl leading-relaxed">
              Private, personal, and easy to use — Memora makes memory-keeping
              effortless. Securely capture moments and revisit them whenever you
              choose.
            </p>
          </div>
        </div>

        {/* Section 2 - Why Memora */}
        <div className="absolute top-[200vh] left-0 w-full h-screen flex flex-col items-center justify-center px-10 md:px-20 text-white font-orbitron fade-up">
          <h2 className="text-5xl md:text-6xl mb-24 text-center text-hero fade-text">
            Why Memora?
          </h2>
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-32 mt-24">
            {/* Left points */}
            <ul className="flex flex-col gap-12 text-lg md:text-xl max-w-[360px] text-right">
              <li className="fade-text">🔒 Private and secure</li>
              <li className="fade-text">📦 A true memory capsule</li>
              <li className="fade-text">✨ Simple and easy to use</li>
            </ul>

            {/* Middle model */}
            <div className="flex justify-center"></div>

            {/* Right points */}
            <ul className="flex flex-col gap-12 text-lg md:text-xl max-w-[360px] text-left">
              <li className="fade-text">📅 Capture memories anytime</li>
              <li className="fade-text">📝 Easy organization</li>
              <li className="fade-text">💖 Share with loved ones</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="min-h-32"></div>
    </Layout>
  );
};

export default Home;
