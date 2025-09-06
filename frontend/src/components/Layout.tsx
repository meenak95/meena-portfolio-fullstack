import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Home, User, Code, Briefcase, Mail, MessageCircle } from "lucide-react";

const navigationItems = [
  { title: "Home", url: createPageUrl("Portfolio"), icon: Home },
  { title: "About", url: createPageUrl("About"), icon: User },
  { title: "Skills", url: createPageUrl("Skills"), icon: Code },
  { title: "Experience", url: createPageUrl("Experience"), icon: Briefcase },
  { title: "Contact", url: createPageUrl("Contact"), icon: Mail },
];

interface LayoutProps {
  children: React.ReactNode;
  currentPageName?: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Portfolio")} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <span className="text-white font-semibold">Meena Kannan</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.url
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Contact Button */}
      <Link
        to={createPageUrl("Contact")}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      >
        <Mail className="w-6 h-6 group-hover:animate-bounce" />
      </Link>

      {/* Social Links */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 space-y-4 hidden lg:block">
        <a
          href="https://www.linkedin.com/in/meenakannan-mk/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href="mailto:meenakannan92@gmail.com"
          className="block w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-green-500/20 transition-all duration-300 group"
        >
          <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://wa.me/919789302084"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-green-500/20 transition-all duration-300 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="tel:+6587373057"
          className="block w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  );
}
