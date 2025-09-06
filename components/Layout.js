import React from 'react';
import Link from 'next/link';
import { Home, Code, Briefcase, Mail } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <span className="text-white font-semibold">Meena Kannan</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </Link>
              <Link href="/#skills" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Skills</span>
              </Link>
              <Link href="/#projects" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">Projects</span>
              </Link>
              <Link href="/#contact" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}

