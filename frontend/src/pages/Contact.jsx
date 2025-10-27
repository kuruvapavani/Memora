import React, { useState } from "react";
import Layout from "../components/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJSKEY
      );

      toast.success("Message sent successfully! 💌");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-b from-black via-[#001133] to-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-orbitron text-hero mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or collaboration ideas?{" "}
            <span className="text-hero font-semibold">We’d love to hear from you.</span>{" "}
            Reach out and let’s make something memorable together.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-20 max-w-3xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 shadow-md hover:border-hero transition-all duration-300">
          <h2 className="text-2xl font-orbitron text-hero mb-6 text-center">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-white/80 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
                className="w-full p-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-hero"
              />
            </div>

            <div>
              <label className="block text-left text-white/80 mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="w-full p-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-hero"
              />
            </div>

            <div>
              <label className="block text-left text-white/80 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-hero resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-hero text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Send size={20} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="mt-16 text-center text-white/60 text-sm">
          <p>We’ll get back to you within 24–48 hours. 💌</p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
