import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";
import { login, loginWithGoogle, sendPasswordResetEmail } from "../config/auth";
import { FcGoogle } from "react-icons/fc";
import { gsap } from "gsap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
        <h2 className="text-3xl font-orbitron text-hero mb-6 text-center">Login</h2>
        {error && <div className="p-3 mb-4 text-sm text-red-300 bg-red-900/50 rounded-lg border border-red-700">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            />
          </div>
          <button type="submit" disabled={isLoading} className={`w-full text-black py-2 rounded-lg font-semibold transition ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-hero hover:opacity-80"}`}>
            {isLoading ? <span className="flex items-center justify-center gap-2"><Loader className="animate-spin" size={18} /> Logging in...</span> : "Login"}
          </button>
        </form>

        <button onClick={handleGoogleLogin} disabled={isLoading} className={`w-full flex items-center justify-center gap-2 mt-4 py-2 rounded-lg transition ${isLoading ? "border border-gray-500 text-gray-500 cursor-not-allowed" : "border border-white/30 hover:bg-white/10"}`}>
          <FcGoogle size={20} /> Sign in with Google
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-white/70 gap-2 sm:gap-0">
        <div>Welcome Back</div>
          <Link to="/register" className="hover:text-hero transition">Don’t have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
