import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook, Instagram, Twitter, Mail, MapPin, Phone,
  Heart, Shield, Award, Clock, Users, Ambulance, Send
} from "lucide-react";
import { motion } from "framer-motion";
import useSite from "../store/useSite";

export default function Footer() {
  const { state } = useSite();
  const brand = state?.brand || {};
  const social = brand.social || {};

  const currentYear = new Date().getFullYear();

  const FadeIn = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
    e.target.reset();
  };

  return (
    <footer className="relative bg-gray-900 border-t border-white/10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-ukBlue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-ukYellow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <FadeIn>
                <div className="flex items-center space-x-3 mb-6">
                  {/* Logo frame: fixed square + object-contain */}
                  <div className="w-14 h-14 rounded-xl border border-white/15 bg-slate-800/40 p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={brand.logo || "/logo.png"}
                      alt={brand.name || "Servants of Compassion"}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                    />
                  </div>

                  <div>
                    <div className="font-bold text-white text-xl leading-tight">
                      {brand.name || "Servants of Compassion"}
                    </div>
                    <div className="text-white/60 text-sm">Delivering hope and emergency care</div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We are a registered non-profit organization dedicated to providing critical
                  medical aid and support to communities in need across Ukraine. Your support
                  helps us deliver ambulances, trauma kits, and life-saving equipment.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="flex space-x-3">
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-xl text-white hover:bg-ukBlue hover:text-white transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-xl text-white hover:bg-pink-600 hover:text-white transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-xl text-white hover:bg-blue-400 hover:text-white transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Quick links */}
            <FadeIn delay={0.3}>
              <div>
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-ukYellow" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { path: "/about", label: "About Us" },
                    { path: "/mission", label: "Our Mission" },
                    { path: "/impact", label: "Impact Dashboard" },
                    { path: "/events", label: "Events" },
                    { path: "/stories", label: "Success Stories" },
                    { path: "/resources", label: "Resources" },
                    { path: "/contact", label: "Contact Us" },
                    { path: "/admin", label: "Admin Portal" }
                  ].map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-white/70 hover:text-ukYellow transition-colors flex items-center group"
                      >
                        <span className="w-2 h-2 bg-ukYellow/0 rounded-full mr-3 group-hover:bg-ukYellow transition-all"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Programs */}
            <FadeIn delay={0.4}>
              <div>
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Ambulance className="w-5 h-5 mr-2 text-ukYellow" />
                  Our Programs
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: "Ambulance Deployment", desc: "Emergency vehicle delivery" },
                    { label: "Medical Supplies", desc: "Trauma kits and equipment" },
                    { label: "Training Programs", desc: "Medic and first responder training" },
                    { label: "Community Support", desc: "Local community initiatives" },
                    { label: "Emergency Response", desc: "24/7 crisis response" },
                    { label: "Volunteer Network", desc: "Global volunteer community" }
                  ].map((program, index) => (
                    <li key={index} className="group">
                      <div className="text-white font-medium group-hover:text-ukYellow transition-colors">
                        {program.label}
                      </div>
                      <div className="text-white/60 text-sm">
                        {program.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Contact & Newsletter */}
            <FadeIn delay={0.5}>
              <div>
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-ukYellow" />
                  Stay Connected
                </h3>

                {/* Contact info */}
                <div className="space-y-3 mb-6">
                  {brand.address && (
                    <div className="flex items-start space-x-3 text-white/70">
                      <MapPin className="w-5 h-5 text-ukYellow flex-shrink-0 mt-1" />
                      <span>{brand.address}</span>
                    </div>
                  )}
                  {brand.email && (
                    <a
                      href={`mailto:${brand.email}`}
                      className="flex items-center space-x-3 text-white/70 hover:text-ukYellow transition-colors"
                    >
                      <Mail className="w-5 h-5 text-ukYellow" />
                      <span>{brand.email}</span>
                    </a>
                  )}
                  {brand.phone && (
                    <a
                      href={`tel:${brand.phone}`}
                      className="flex items-center space-x-3 text-white/70 hover:text-ukYellow transition-colors"
                    >
                      <Phone className="w-5 h-5 text-ukYellow" />
                      <span>{brand.phone}</span>
                    </a>
                  )}
                </div>

                {/* Newsletter signup */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3">Newsletter Signup</h4>
                  <p className="text-white/60 text-sm mb-4">
                    Get updates on our mission and impact
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-ukYellow text-gray-900 font-semibold py-2 px-4 rounded-xl hover:bg-ukYellow/90 transition-colors flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Trust badges */}
          <FadeIn delay={0.6}>
            <div className="grid md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10">
              {[
                { icon: <Shield className="w-8 h-8" />, label: "Verified Non-Profit", desc: "Fully registered and transparent" },
                { icon: <Heart className="w-8 h-8" />, label: "100% Donation Policy", desc: "Every dollar makes an impact" },
                { icon: <Award className="w-8 h-8" />, label: "Award-Winning", desc: "Recognized for excellence" },
                { icon: <Clock className="w-8 h-8" />, label: "24/7 Response", desc: "Always ready to help" }
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="text-ukYellow mb-3 flex justify-center">{badge.icon}</div>
                  <div className="text-white font-semibold mb-1">{badge.label}</div>
                  <div className="text-white/60 text-sm">{badge.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © {currentYear} Servants of Compassion. All rights reserved.
              </div>

              <div className="flex flex-wrap justify-center space-x-6 text-sm">
                <Link to="/privacy" className="text-white/60 hover:text-ukYellow transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/60 hover:text-ukYellow transition-colors">
                  Terms of Service
                </Link>
                <Link to="/transparency" className="text-white/60 hover:text-ukYellow transition-colors">
                  Transparency Report
                </Link>
                <Link to="/financials" className="text-white/60 hover:text-ukYellow transition-colors">
                  Financial Reports
                </Link>
              </div>

              <div className="text-white/60 text-sm">
                Made with ❤️ for Ukraine
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}