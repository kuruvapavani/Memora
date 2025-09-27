// src/pages/Home.jsx
import React, { useRef, useEffect } from "react";
import Layout from "../components/Layout";
import HomeDesktop from "../components/HomeDesktop";
import HomeMobile from "../components/HomeMobile";

const Home = () => {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div className="relative bg-black">
        <HomeDesktop scrollY={scrollY} />
        <HomeMobile />
      </div>

      {/* Footer spacing */}
      <div className="min-h-32"></div>
    </Layout>
  );
};

export default Home;
