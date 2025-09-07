import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Meena Kannan</h3>
                <p className="text-slate-400 text-sm">Lead Software Engineer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building scalable solutions with passion and precision. 
              Let's create something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: "About", to: createPageUrl("About") },
                { name: "Skills", to: createPageUrl("Skills") },
                { name: "Experience", to: createPageUrl("Experience") },
                { name: "Contact", to: createPageUrl("Contact") }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/meena-kannan-mk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:meenakannan92@gmail.com"
                className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-green-500/20 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="tel:+6587373057"
                className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300 group"
              >
                <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Meena Kannan. Delivering reliable solutions with passion and precision
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

