// src/pages/Home.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import Layout from '../components/Layout';
import gsap from 'gsap';

const degToRad = (deg) => (deg * Math.PI) / 180;

const Model = ({ scrollY }) => {
  const modelRef = useRef();
  const { scene } = useGLTF('/assets/memora_capsule.glb');

  // Finalized keyframes (hardcoded after tuning in Leva)
  const sections = [
    { scroll: 0, pos: [5, 7, 0], rot: [0, degToRad(-50), 0] }, // section 0
    { scroll: 1, pos: [-5, 0, 5], rot: [0, degToRad(50), 0] }, // section 1
    { scroll: 2, pos: [0, -12, 0], rot: [0, 0, 0] }            // section 2
  ];

  const scale = 0.01;

  // Scroll-based interpolation
  useFrame(() => {
    if (!modelRef.current) return;
    const scrollProgress = scrollY.current / window.innerHeight;

    // Find current section
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
      Math.max((scrollProgress - start.scroll) / (end.scroll - start.scroll), 0),
      1
    );

    // Lerp position
    const x = start.pos[0] + (end.pos[0] - start.pos[0]) * sectionProgress;
    const y = start.pos[1] + (end.pos[1] - start.pos[1]) * sectionProgress;
    const z = start.pos[2] + (end.pos[2] - start.pos[2]) * sectionProgress;

    // Lerp rotation
    const rotX = start.rot[0] + (end.rot[0] - start.rot[0]) * sectionProgress;
    const rotY = start.rot[1] + (end.rot[1] - start.rot[1]) * sectionProgress;
    const rotZ = start.rot[2] + (end.rot[2] - start.rot[2]) * sectionProgress;

    modelRef.current.position.set(x, y, z);
    modelRef.current.rotation.set(rotX, rotY, rotZ);
  });

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      modelRef.current.position,
      { y: sections[0].pos[1] - 2 },
      { y: sections[0].pos[1], duration: 1.5, ease: 'power3.out' }
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <div className="h-[300vh] w-full" style={{ backgroundColor: 'black' }}>
        <Canvas camera={{ position: [0, 10, 30], fov: 50 }}>
          <color attach="background" args={['black']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Model scrollY={scrollY} />

          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>

        {/* Hero text for sections */}
        <div className="absolute top-1/4 left-10 text-white text-4xl font-bold">
          Hero Text Left
        </div>
        <div className="absolute top-[100vh] right-10 text-white text-4xl font-bold">
          Hero Text Right
        </div>
        <div className="absolute top-[200vh] left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold">
          Hero Text Center
        </div>
      </div>
    </Layout>
  );
};

export default Home;
