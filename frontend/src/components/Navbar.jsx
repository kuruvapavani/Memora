import React, { useState, useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../config/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 relative bg-black/50 backdrop-blur-md shadow-md z-50">
      <Link
        to="/"
        className="text-hero text-2xl font-bold cursor-pointer hover:opacity-80 transition font-orbitron"
      >
        Memora
      </Link>

      <div className="flex items-center space-x-6 font-inter">
        <Link to="/about" className="text-white hover:text-hero transition">
          About
        </Link>

        {!currentUser ? (
          <Link
            to="/login"
            className="bg-hero text-black px-5 py-2 rounded-xl font-medium hover:bg-opacity-80 transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <FaRegUserCircle
              className="text-hero text-4xl cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg overflow-hidden z-10">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-hero hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-capsule"
                  className="block px-4 py-2 hover:bg-hero hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Capsule
                </Link>
                <Link
                  to="/my-capsules"
                  className="block px-4 py-2 hover:bg-hero hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  My Capsules
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-hero hover:text-black transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
