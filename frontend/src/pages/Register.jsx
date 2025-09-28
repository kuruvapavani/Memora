import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";
import { register, loginWithGoogle } from "../config/auth";
import { FcGoogle } from "react-icons/fc";
import { gsap } from "gsap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, transform: "translate3d(0,0,0)" },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", clearProps: "transform" }
    );
  }, []);

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
  }, [currentUser, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#001133] to-black px-4">
      <div ref={cardRef} className="bg-black/40 backdrop-blur-xl border border-hero rounded-2xl p-8 max-w-md w-full text-white shadow-lg">
        <h2 className="text-3xl font-orbitron text-hero mb-6 text-center">Register</h2>

        {error && <div className="p-3 mb-4 text-sm text-red-300 bg-red-900/50 rounded-lg border border-red-700">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center gap-2 border border-white/30 rounded-lg px-3 py-2">
            <Mail className="text-hero" size={18} />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            />
          </div>

          <div className="flex items-center gap-2 border border-white/30 rounded-lg px-3 py-2">
            <Lock className="text-hero" size={18} />
            <input
              type="password"
              placeholder="Password (min 8 chars)"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            />
          </div>

          <div className="flex items-center gap-2 border border-white/30 rounded-lg px-3 py-2">
            <Lock className="text-hero" size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            />
          </div>

          <button type="submit" disabled={isLoading} className={`w-full text-black py-2 rounded-lg font-semibold transition ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-hero hover:opacity-80"}`}>
            {isLoading ? <span className="flex items-center justify-center gap-2"><Loader className="animate-spin" size={18} /> Registering...</span> : "Register"}
          </button>
        </form>

        <button onClick={handleGoogleRegister} disabled={isLoading} className={`w-full flex items-center justify-center gap-2 mt-4 py-2 rounded-lg transition ${isLoading ? "border border-gray-500 text-gray-500 cursor-not-allowed" : "border border-white/30 hover:bg-white/10"}`}>
          <FcGoogle size={20} /> Sign up with Google
        </button>

        <div className="text-sm text-center mt-4 text-white/70">
          Already have an account? <Link to="/login" className="hover:text-hero transition">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
