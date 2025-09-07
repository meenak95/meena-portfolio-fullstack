import React, { useRef } from "react";
import { 
  ChevronRight, 
  ArrowRight,
  Download,
  Sparkles,
  Briefcase,
  Cpu,
  Code,
  Globe,
  Cloud,
  Database,
  Server,
  Wrench,
  TestTube,
  Rocket,
  Monitor
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";


export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-7xl mx-auto text-center z-10">
        <div className="mb-12 opacity-0 translate-y-8 animate-fade-in-up">
          <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-lg animate-glow">
            <Sparkles className="w-5 h-5 mr-2 animate-spin-slow" />
            Lead Software Engineer
          </Badge>
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
              <Cpu className="w-7 h-7 text-cyan-400 animate-spin-very-slow" />
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Meena
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-300% animation-delay-1000">
              Kannan
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Architecting the future with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold animate-pulse"> scalable solutions</span>, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold animate-pulse animation-delay-500"> cloud innovation</span>, and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold animate-pulse animation-delay-1000"> technical excellence</span>.
          </p>
        </div>

        {/* Orbital CPU Animation (polished + full icons) */}
        <div className="relative mb-16 h-72 w-72 md:h-96 md:w-96 mx-auto opacity-0 translate-y-8 animate-fade-in-up delay-300">
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl"></div>

          {/* Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-700/40"></div>
          <div className="absolute inset-6 rounded-full border border-slate-700/30"></div>

          {/* Rotating orbit container */}
          <div className="absolute inset-0 animate-spin-very-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Code className="w-5 h-5 text-orange-300" />
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Server className="w-5 h-5 text-emerald-300" />
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Database className="w-5 h-5 text-sky-300" />
              </div>
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Globe className="w-5 h-5 text-fuchsia-300" />
              </div>
            </div>
            {/* Diagonals for SDLC icons */}
            <div className="absolute top-6 right-6">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Wrench className="w-5 h-5 text-yellow-300" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <TestTube className="w-5 h-5 text-pink-300" />
              </div>
            </div>
            <div className="absolute top-6 left-6">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Rocket className="w-5 h-5 text-red-300" />
              </div>
            </div>
            <div className="absolute bottom-6 right-6">
              <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-md">
                <Monitor className="w-5 h-5 text-indigo-300" />
              </div>
            </div>
          </div>

          {/* Central CPU */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Cpu className="w-10 h-10 md:w-12 md:h-12 text-white animate-icon-glow" />
            </div>
          </div>

          {/* Floating cloud icons for depth */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-cloud-float"
                style={{
                  left: `${10 + (i * 15) % 80}%`,
                  top: `${10 + ((i * 22) % 70)}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${12 + (i % 3) * 3}s`
                }}
              >
                <Cloud className="w-5 h-5 md:w-6 md:h-6 text-slate-500" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-8 animate-fade-in-up delay-300">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
            <Briefcase className="w-6 h-6 mr-3 group-hover:animate-bounce" />
            Explore My Work
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 hover:text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b53a59450b409515631d30/bd0a6ee13_Meena_Kannan_Java_Agile_Cloud_DevSecOps.pdf', '_blank')}
          >
            <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
            Download Resume
          </Button>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-scroll-indicator"></div>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-400 rotate-90 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
