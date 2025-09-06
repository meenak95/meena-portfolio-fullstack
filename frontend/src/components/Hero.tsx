import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { 
  ChevronRight, 
  Code, 
  Cloud, 
  Database, 
  Cpu, 
  Globe, 
  Award,
  ArrowRight,
  Download,
  Sparkles,
  Briefcase,
  MessageCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Counter = ({ to }: { to: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(to.replace("+", ""));
          if (start === end) return;
          
          let duration = 2000;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{to.includes('+') ? '+' : ''}</span>;
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10;
    const y = (e.clientY - top - height / 2) / 10;
    ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = [
    { name: "Java", icon: <Code className="w-6 h-6" />, color: "bg-orange-500", particles: "orange" },
    { name: "Spring Boot", icon: <Cpu className="w-6 h-6" />, color: "bg-green-500", particles: "green" },
    { name: "Angular", icon: <Globe className="w-6 h-6" />, color: "bg-red-500", particles: "red" },
    { name: "AWS", icon: <Cloud className="w-6 h-6" />, color: "bg-yellow-500", particles: "yellow" },
    { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, color: "bg-blue-500", particles: "blue" },
    { name: "Kubernetes", icon: <Cpu className="w-6 h-6" />, color: "bg-purple-500", particles: "purple" },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-7xl mx-auto text-center z-10">
        <div className="mb-12 opacity-0 translate-y-8 animate-fade-in-up">
          <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-lg animate-glow">
            <Sparkles className="w-5 h-5 mr-2 animate-spin-slow" />
            Lead Software Engineer
          </Badge>
          
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

        {/* Animated Tech Stack Orbit */}
        <div className="relative mb-16 h-96 w-96 mx-auto opacity-0 translate-y-8 animate-fade-in-up delay-300">
          <div className="absolute inset-0 animate-spin-very-slow">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="absolute flex items-center justify-center"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-140px) rotate(-${index * 60}deg)`,
                }}
              >
                <div className={`group relative p-4 rounded-2xl ${tech.color}/20 border ${tech.color}/30 backdrop-blur-sm hover:scale-125 transition-all duration-500 cursor-pointer animate-float-gentle`}
                     style={{ animationDelay: `${index * 0.5}s` }}>
                  <div className={`p-2 rounded-xl ${tech.color}/30 group-hover:animate-spin`}>
                    {tech.icon}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 px-3 py-1 rounded-full text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {tech.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Central Hub */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
              <Cpu className="w-12 h-12 text-white animate-icon-glow" />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-8 animate-fade-in-up delay-500">
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
