// src/components/Model.jsx
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

const degToRad = (deg) => (deg * Math.PI) / 180;

const Model = ({ scrollY }) => {
  const modelRef = useRef();
  const { scene } = useGLTF("/assets/memora_capsule.glb");

const sections = [
  { scroll: 0, pos: [3, 9, 0], rot: [0, degToRad(-50), 0] },   // Section 1: Right
  { scroll: 1, pos: [-3, 4, 5], rot: [0, degToRad(50), 0] },   // Section 2: Left
  { scroll: 2, pos: [3, -3.2, 5], rot: [degToRad(0), degToRad(-50), 0] },  // Section 3: Right again
  { scroll: 3, pos: [-3, -7, 10], rot: [0, degToRad(70), 0] }, // Section 4: Left again
];


  const scale = 0.007;

  useFrame(({ clock }) => {
    if (!modelRef.current) return;

    const scrollProgress = scrollY.current / window.innerHeight;

    let start = sections[0];
    let end = sections[sections.length - 1];

    // Find current section range
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
      Math.max((scrollProgress - start.scroll) / (end.scroll - start.scroll), 0),
      1
    );

    // Smooth interpolation
    const x = start.pos[0] + (end.pos[0] - start.pos[0]) * sectionProgress;
    const y = start.pos[1] + (end.pos[1] - start.pos[1]) * sectionProgress;
    const z = start.pos[2] + (end.pos[2] - start.pos[2]) * sectionProgress;

    const rotX = start.rot[0] + (end.rot[0] - start.rot[0]) * sectionProgress;
    const rotY = start.rot[1] + (end.rot[1] - start.rot[1]) * sectionProgress;
    const rotZ = start.rot[2] + (end.rot[2] - start.rot[2]) * sectionProgress;

    // Floating + subtle rotation motion
    modelRef.current.position.set(
      x,
      y + Math.sin(clock.getElapsedTime()) * 0.25,
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

export default Model;
