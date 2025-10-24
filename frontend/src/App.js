import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyCapsules from "./pages/MyCapsules";
import CreateCapsule from "./pages/CreateCapsule";
import OpenCapsule from "./pages/OpenCapsule";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "sonner";
const App = () => {
  return (
    <>
    <Toaster position="top-right" richColors />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/my-capsules" element={<MyCapsules />}  />
        <Route path="/create-capsule" element={<CreateCapsule />} />
        <Route path="/capsule/:id" element={<OpenCapsule />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
