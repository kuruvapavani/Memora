import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { FaLock, FaUnlock, FaSpinner } from "react-icons/fa";
import gsap from "gsap";

const OpenCapsule = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sectionRef = useRef(null);
  const imageTrackRef = useRef(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        if (!currentUser) return;
        const token = await currentUser.getIdToken();
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/capsule/${id}/open`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCapsule(res.data.capsule);
      } catch (err) {
        console.error(err);
        setError("Failed to load capsule. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, currentUser]);

  useEffect(() => {
    if (capsule && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out" }
      );

      if (imageTrackRef.current) {
        gsap.to(imageTrackRef.current, {
          x: "-50%",
          ease: "linear",
          repeat: -1,
          duration: capsule.media?.images?.length * 5,
        });
      }
    }
  }, [capsule]);

  if (loading)
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen text-white text-xl gap-3">
          <FaSpinner className="animate-spin text-hero" /> Loading your memory...
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="text-center text-red-400 py-20">{error}</div>
      </Layout>
    );

  if (!capsule)
    return (
      <Layout>
        <div className="text-center text-white/70 py-20">Capsule not found.</div>
      </Layout>
    );

  const openDate = new Date(capsule.openDate);
  const isOpenable = openDate <= new Date();

  return (
    <Layout>
      <section
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-b from-black via-[#001133] to-black text-white py-16 px-6 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-orbitron text-hero mb-4">
            {capsule.title}
          </h1>
          <p className="text-white/70 mb-6">
            Opening Date:{" "}
            <span className="font-semibold text-white">
              {openDate.toLocaleDateString()}
            </span>
          </p>

          {!isOpenable ? (
            <div className="flex flex-col items-center justify-center mt-16">
              <FaLock className="text-6xl text-gray-500 mb-4" />
              <p className="text-lg text-white/70">
                This capsule is locked until{" "}
                <span className="text-hero font-semibold">
                  {openDate.toLocaleDateString()}
                </span>
                .
              </p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl mt-8 space-y-10">
              <div className="flex items-center justify-center mb-6">
                <FaUnlock className="text-4xl text-green-400 mr-2" />
                <h2 className="text-3xl font-orbitron text-hero">
                  Capsule Unlocked!
                </h2>
              </div>

              {capsule.text && (
                <p className="text-lg text-white/80 mb-6 whitespace-pre-line leading-relaxed">
                  {capsule.text}
                </p>
              )}

              {/* 🖼 Photo Carousel with GSAP Track */}
              {capsule.media?.images?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-orbitron text-hero mb-4">
                    📸 Photo Memories
                  </h3>
                  <div className="overflow-hidden relative w-full">
                    <div
                      ref={imageTrackRef}
                      className="flex gap-4 w-max"
                    >
                      {[...capsule.media.images, ...capsule.media.images].map(
                        (url, i) => (
                          <div
                            key={i}
                            className="rounded-2xl overflow-hidden border border-white/10 min-w-[300px] max-w-[300px] hover:scale-[1.02] transition-all duration-300 shadow-lg"
                          >
                            <img
                              src={url}
                              alt={`capsule-${i}`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 🎥 Video Memories */}
              {capsule.media?.videos?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-orbitron text-hero mb-4">
                    🎥 Video Memories
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {capsule.media.videos.map((url, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-hero/30"
                      >
                        <video
                          src={url}
                          controls
                          className="w-full h-[250px] rounded-2xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 🎤 Voice Memories */}
              {capsule.media?.voiceMessages?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-orbitron text-hero mb-4">
                    🎤 Voice Memories
                  </h3>
                  <div className="flex flex-col gap-4">
                    {capsule.media.voiceMessages.map((url, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-hero/10 border border-hero/30 backdrop-blur-lg shadow-lg hover:scale-[1.02] transition-all duration-300 animate-pulse-slow"
                      >
                        <audio src={url} controls className="w-full rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default OpenCapsule;
