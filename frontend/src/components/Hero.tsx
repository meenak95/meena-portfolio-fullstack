import React, { useRef } from "react";
import { 
  ChevronRight, 
  ArrowRight,
  Download,
  Sparkles,
  Briefcase,
  Cpu
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
