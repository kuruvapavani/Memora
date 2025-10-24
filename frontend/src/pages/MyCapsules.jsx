// src/pages/MyCapsules.jsx
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "sonner";

const MyCapsules = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        if (!currentUser) {
          toast.error("Please log in to view your capsules.");
          setTimeout(() => navigate("/login"), 1500);
          return;
        }

        const token = await currentUser.getIdToken();

        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/capsule`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedCapsules = res.data.capsules || [];
        setCapsules(fetchedCapsules);

        if (fetchedCapsules.length === 0) {
          toast.info("No capsules found. Create your first memory!");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch capsules. Please try again.");
        toast.error("Failed to fetch capsules. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          y: 10,
          duration: 3 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }
  }, [capsules]);

  const handleViewCapsule = (capsule) => {
    const isOpenable = new Date(capsule.openDate) <= new Date();
    if (!isOpenable) {
      toast.warning("This capsule is still locked!");
      return;
    }
    navigate(`/capsule/${capsule._id}`);
  };

  if (loading)
    return (
      <Layout>
        <div className="text-center text-white py-20 animate-pulse">
          Loading your memories...
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="text-center text-red-400 py-20">{error}</div>
      </Layout>
    );

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-b from-black via-[#001133] to-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-orbitron text-hero mb-4">
            My Capsules
          </h1>
          <p className="text-white/70 mb-10">
            Relive your memories, one capsule at a time.
          </p>

          {capsules.length === 0 ? (
            <p className="text-white/70 text-lg">
              You haven’t created any capsules yet. Create one to preserve your
              memories!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {capsules.map((capsule, index) => {
                const isOpenable = new Date(capsule.openDate) <= new Date();
                return (
                  <div
                    key={capsule._id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="bg-white/5 border border-white/10 hover:border-hero transition-all duration-300 
                               p-6 rounded-2xl text-left backdrop-blur-sm shadow-lg hover:shadow-hero/40 
                               hover:scale-[1.03] transform-gpu"
                  >
                    <h2 className="text-2xl font-orbitron text-hero mb-2">
                      {capsule.title}
                    </h2>
                    <p className="text-white/80 mb-1">
                      📅{" "}
                      <span className="font-semibold text-white">
                        {new Date(capsule.openDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-white/70 mb-3">
                      Status:{" "}
                      <span
                        className={
                          capsule.status === "opened"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {capsule.status || "locked"}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {capsule.friends?.map((friend, i) => (
                        <span
                          key={i}
                          className={`text-xs px-3 py-1 rounded-full ${
                            friend.verified
                              ? "bg-green-500/20 text-green-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {friend.email}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleViewCapsule(capsule)}
                      className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold text-black ${
                        isOpenable
                          ? "bg-hero hover:opacity-80"
                          : "bg-gray-600 cursor-not-allowed"
                      }`}
                    >
                      {isOpenable ? "View Capsule" : "Locked until open date"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MyCapsules;
