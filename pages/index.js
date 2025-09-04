import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Database, Server, Github, Linkedin, Mail } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              MEENA DAVIN
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 font-mono">
              <span className="text-green-400">&gt;</span> 
              <span className="ml-2">Full Stack Java Developer</span>
            </div>
            
            <div className="mt-12 flex justify-center gap-6">
              {[
                { icon: Github, href: "https://github.com/meenak95", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/meenadavin", label: "LinkedIn" },
                { icon: Mail, href: "mailto:meena.davin@example.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-gray-300 hover:text-green-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}