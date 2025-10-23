import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="bg-gradient-to-b from-black via-[#001133] to-black text-white py-24 px-6 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-orbitron text-hero mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-orbitron text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Oops! The page you’re looking for doesn’t exist or has been moved.
            But don’t worry — your memories are still safe with{" "}
            <span className="text-hero font-semibold">Memora</span>.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/")}
            className="bg-hero text-black font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Go Back Home
          </button>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-xl md:text-2xl font-orbitron text-hero mb-4">
            Lost in Time?
          </h3>
          <p className="text-white/70 max-w-md mx-auto leading-relaxed">
            It seems this memory has faded into the void. 
            Head back to the homepage and continue your journey through time.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ErrorPage;
