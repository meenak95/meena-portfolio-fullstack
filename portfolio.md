Folder - Paages

File - Portfolio

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
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
  Building2,
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Briefcase,
  User,
  Target,
  Heart,
  Lightbulb,
  Users,
  Server,
  Wrench,
  TestTube,
  TrendingUp,
  Linkedin,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillsData, projectsData } from "../components/skills/SkillsData";

const Counter = ({ to }) => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current; // Capture ref value
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(to.replace("+", ""));
          if (start === end) return;
          
          let duration = 2000;
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect(); // Disconnect after animation starts
        }
      },
      { threshold: 0.5 }
    );
    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, [to]);

  return <span ref={ref}>{count}{to.includes('+') ? '+' : ''}</span>;
};

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
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
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");
  const [activeProjectCategory, setActiveProjectCategory] = useState("all");
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const elementsToObserve = [heroRef.current, skillsRef.current, projectsRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsToObserve.forEach(el => observer.observe(el));

    return () => {
      elementsToObserve.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const techStack = [
    { name: "Java", icon: <Code className="w-6 h-6" />, color: "bg-orange-500", particles: "orange" },
    { name: "Spring Boot", icon: <Cpu className="w-6 h-6" />, color: "bg-green-500", particles: "green" },
    { name: "Angular", icon: <Globe className="w-6 h-6" />, color: "bg-red-500", particles: "red" },
    { name: "AWS", icon: <Cloud className="w-6 h-6" />, color: "bg-yellow-500", particles: "yellow" },
    { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, color: "bg-blue-500", particles: "blue" },
    { name: "Kubernetes", icon: <Server className="w-6 h-6" />, color: "bg-purple-500", particles: "purple" },
  ];

  const stats = [
    { number: "9+", label: "Years Experience", icon: <Award className="w-8 h-8" />, color: "text-blue-400" },
    { number: "15+", label: "Technologies", icon: <Code className="w-8 h-8" />, color: "text-green-400" },
    { number: "50+", label: "Projects", icon: <Globe className="w-8 h-8" />, color: "text-purple-400" },
    { number: "3", label: "Certifications", icon: <Award className="w-8 h-8" />, color: "text-cyan-400" },
  ];

  const categoryIcons = {
    programming: { icon: Code, color: "text-blue-400" },
    frontend: { icon: Globe, color: "text-green-400" },
    backend: { icon: Server, color: "text-purple-400" },
    cloud: { icon: Cloud, color: "text-cyan-400" },
    database: { icon: Database, color: "text-orange-400" },
    devops: { icon: Wrench, color: "text-red-400" },
    testing: { icon: TestTube, color: "text-pink-400" },
  };

  const filteredSkills = activeSkillCategory === "all" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeSkillCategory);

  const filteredProjects = activeProjectCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeProjectCategory);

  const categoryColors = {
    government: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    fintech: "bg-green-500/20 text-green-400 border-green-500/30",
    ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "real-estate": "bg-orange-500/20 text-orange-400 border-orange-500/30"
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Dynamic Background with Particle System */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Gradients */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float-1" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float-2" />
        
        {/* Interactive Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-blue-400/5 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Cloud Infrastructure Animation */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-cloud-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              <Cloud className="w-8 h-8 text-slate-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Contact Button */}
      <Link
        to={createPageUrl("Contact")}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group animate-bounce-subtle"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
      </Link>

      {/* Hero Section */}
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
                    
                    {/* Particle Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 ${tech.color} rounded-full animate-particle-explosion`}
                          style={{
                            left: '50%',
                            top: '50%',
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${i * 60}deg)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Central Hub - Updated with CPU icon */}
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

      {/* Stats Section (Professional Growth) - REDESIGNED */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 animate-glow">
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Milestones
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent bg-300%">
              At a Glance
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-slate-800/50 opacity-0 translate-y-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl animate-shimmer`}></div>
                <div className={`${stat.color} mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out`}>
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300 ease-in-out">
                  <Counter to={stat.number} />
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30 animate-glow">
              <Code className="w-4 h-4 mr-2" />
              Technical Expertise
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent bg-300%">
              Skills & Technologies
            </h2>
          </div>

          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveSkillCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300">
                All
              </TabsTrigger>
              {Object.keys(categoryIcons).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300 capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeSkillCategory} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSkills.map((skill, index) => (
                  <Card 
                    key={skill.id}
                    className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <Badge variant="outline" className="text-slate-300 border-slate-600 bg-slate-700/50">
                          {skill.years_experience}y
                        </Badge>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-slate-400 mb-3">
                          <span>Proficiency</span>
                          <span className="font-bold text-white">{skill.proficiency}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={skill.proficiency} 
                            className="h-3 bg-slate-700/50 rounded-full overflow-hidden"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-shimmer"></div>
                        </div>
                      </div>
                      
                      {skill.description && (
                        <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                          {skill.description}
                        </p>
                      )}
                    </CardContent>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 animate-glow">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Projects
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-300%">
              Featured Work
            </h2>
          </div>

          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveProjectCategory}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger 
                value="government" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Government
              </TabsTrigger>
              <TabsTrigger 
                value="fintech" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                FinTech
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                AI/ML
              </TabsTrigger>
              <TabsTrigger 
                value="real-estate" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Real Estate
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeProjectCategory} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <Card 
                    key={project.id}
                    className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-slate-400">
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4" />
                              <span className="text-sm font-medium">{project.company}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{project.duration}</span>
                            </div>
                          </div>
                        </div>
                        {project.category && (
                          <Badge variant="outline" className={`${categoryColors[project.category]} animate-pulse-gentle`}>
                            {project.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {project.description}
                      </p>
                      
                      {project.highlights && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-green-400" />
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {project.highlights.slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.technologies && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-400" />
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 6).map((tech, techIndex) => (
                              <Badge 
                                key={tech} 
                                variant="secondary" 
                                className="bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:text-white transition-all duration-300 animate-fade-in"
                                style={{ animationDelay: `${techIndex * 0.1}s` }}
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 6 && (
                              <Badge variant="outline" className="text-slate-400 border-slate-600">
                                +{project.technologies.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    {/* Project Category Color Strip */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                      project.category === 'government' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      project.category === 'fintech' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      project.category === 'ai' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                      'bg-gradient-to-r from-orange-500 to-orange-600'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-transparent to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* About & Certifications Section - REDESIGNED */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 animate-glow">
              <User className="w-4 h-4 mr-2" />
              About Me
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-300%">
              Passion Meets Excellence
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main About Content */}
            <Card className="lg:col-span-3 bg-slate-800/30 border-slate-700/50 backdrop-blur-xl p-8 space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-8 h-8 text-blue-400 mr-3 animate-spin-slow" />
                My Professional Journey
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                With 9+ years in software development, I've architected solutions serving millions across government, fintech, and AI. As a Lead Engineer at NCS Singapore, I drive mission-critical projects, blending technical expertise with a passion for mentoring.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Code, title: "Technical Excellence", color: "text-blue-400" },
                  { icon: Users, title: "Team Leadership", color: "text-green-400" },
                  { icon: Lightbulb, title: "Innovation", color: "text-purple-400" },
                  { icon: Target, title: "Results Driven", color: "text-cyan-400" }
                ].map((value) => (
                  <div key={value.title} className="group flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-slate-700/50 group-hover:bg-slate-700 transition-all duration-300 ${value.color}`}>
                      <value.icon className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{value.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications & Quick Facts */}
            <div className="lg:col-span-2 space-y-8">
              {[
                { title: "Professional Scrum Product Owner™ I", desc: "Product Strategy & Management", color: "yellow" },
                { title: "Professional Scrum Master™ I", desc: "Agile Leadership", color: "blue" },
                { title: "ICT Assessment Certification", desc: "NUS-ISS Singapore", color: "green" }
              ].map((cert, index) => (
                <TiltCard key={index} className="opacity-0 translate-y-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className={`group relative bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:bg-slate-800/50`}>
                    <div className={`absolute -top-1 -left-1 w-1/2 h-1/2 bg-gradient-to-br from-${cert.color}-500/50 to-transparent rounded-tl-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-${cert.color}-500/20 text-${cert.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <p className={`text-white font-semibold text-lg group-hover:text-${cert.color}-400 transition-colors duration-300`}>{cert.title}</p>
                        <p className="text-slate-400 text-sm">{cert.desc}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beyond the Code - REDESIGNED */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <TiltCard>
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-slate-900/50"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gentle">
                  <Heart className="w-12 h-12 text-red-400" />
                </div>
                <h2 className="text-4xl font-black text-white mb-6">Beyond the Code</h2>
                <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
                  When I'm not architecting systems, I'm exploring Singapore's tech scene, contributing to open-source, or diving into the latest in cloud computing and AI. I believe in balancing a passion for technology with continuous personal growth.
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 animate-glow">
            <MessageCircle className="w-4 h-4 mr-2" />
            Let's Connect
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-300%">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, 
            and ways we can create amazing solutions together.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Mail, label: "Email", value: "meenakannan92@gmail.com", href: "mailto:meenakannan92@gmail.com" },
              { icon: Phone, label: "Phone", value: "+65 87373057", href: "tel:+6587373057" },
              { icon: MessageCircle, label: "WhatsApp", value: "+91 97893 02084", href: "https://wa.me/919789302084" },
              { icon: MapPin, label: "Location", value: "Singapore", href: null }
            ].map((contact, index) => (
              <Card 
                key={index}
                className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <contact.icon className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{contact.label}</p>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      target={contact.label === "WhatsApp" ? "_blank" : undefined}
                      rel={contact.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="text-white font-medium hover:text-blue-400 transition-colors duration-300"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{contact.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Link to={createPageUrl("Contact")}>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
              <Send className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Get In Touch
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl relative">
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
                  { name: "About", url: "#about" },
                  { name: "Skills", url: "#skills" },
                  { name: "Projects", url: "#projects" },
                  { name: "Contact", url: createPageUrl("Contact") }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/meenakannan-mk/"
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
              © 2024 Meena Kannan. Crafted with passion and precision.
            </p>
          </div>
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
      </footer>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }

        @keyframes cloud-float {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }

        @keyframes particle-explosion {
          0% {
            transform: rotate(var(--rotation)) translateY(0);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) translateY(-30px);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }

        @keyframes icon-glow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px rgba(0, 255, 255, 0.6));
          }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }

        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-very-slow { animation: spin-very-slow 20s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
        .animate-cloud-float { animation: cloud-float linear infinite; }
        .animate-particle-explosion { animation: particle-explosion 1s ease-out forwards; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-icon-glow { animation: icon-glow 2.5s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-slow 3s ease-in-out infinite; }

        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }

        .bg-300% { background-size: 300% 300%; }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}


File - skills

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Globe, 
  Server, 
  Cloud, 
  Database, 
  Wrench, 
  TestTube,
  Sparkles,
  TrendingUp,
  Mail, // Added Mail icon
  MessageCircle // Added MessageCircle icon for WhatsApp
} from "lucide-react";
import { skillsData } from "../components/skills/SkillsData";

const categoryIcons = {
  programming: { icon: Code, color: "text-blue-400" },
  frontend: { icon: Globe, color: "text-green-400" },
  backend: { icon: Server, color: "text-purple-400" },
  cloud: { icon: Cloud, color: "text-cyan-400" },
  database: { icon: Database, color: "text-orange-400" },
  devops: { icon: Wrench, color: "text-red-400" },
  testing: { icon: TestTube, color: "text-pink-400" },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const SkillCard = ({ skill, index }) => (
    <Card 
      className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
          <Badge variant="outline" className="text-slate-300 border-slate-600">
            {skill.years_experience}y
          </Badge>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Proficiency</span>
            <span>{skill.proficiency}%</span>
          </div>
          <Progress 
            value={skill.proficiency} 
            className="h-2 bg-slate-700"
          />
        </div>
        {skill.description && (
          <p className="text-sm text-slate-400">{skill.description}</p>
        )}
      </CardContent>
    </Card>
  );

  const CategoryHeader = ({ category, skills }) => {
    const IconComponent = categoryIcons[category]?.icon || Code;
    const iconColor = categoryIcons[category]?.color || "text-blue-400";
    
    return (
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-3 rounded-xl bg-slate-800/50 ${iconColor}`}>
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">
              {category.replace('_', ' ')} Technologies
            </h2>
            <p className="text-slate-400">{skills.length} skills</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Technical Expertise
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Skills & Technologies
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, proficiency levels, 
            and years of experience across different technology stacks.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              All
            </TabsTrigger>
            {Object.keys(categoryIcons).map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <CategoryHeader category={category} skills={categorySkills} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill, index) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {Object.keys(categoryIcons).map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <CategoryHeader category={category} skills={groupedSkills[category] || []} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(groupedSkills[category] || []).map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Skills Summary - Updated Design */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
              Professional Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="text-3xl font-bold text-blue-400 mb-2">9+</div>
                <div className="text-slate-400">Years of Experience</div>
              </div>
              <div className="text-center p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                <div className="text-slate-400">Core Technologies</div>
              </div>
              <div className="text-center p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="text-3xl font-bold text-cyan-400 mb-2">3</div>
                <div className="text-slate-400">Professional Certifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
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
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">About</a>
                <a href="#skills" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Skills</a>
                <a href="#projects" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Projects</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/meenakannan-mk/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:meenakannan92@gmail.com" className="text-slate-400 hover:text-green-400">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://wa.me/919789302084" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">© 2024 Meena Kannan. Crafted with passion and precision.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

File - Experience


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle,
  Briefcase,
  Award,
  Mail,
  MessageCircle
} from "lucide-react";
import { projectsData } from "../components/skills/SkillsData";

const categoryColors = {
  government: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  fintech: "bg-green-500/20 text-green-400 border-green-500/30",
  ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "real-estate": "bg-orange-500/20 text-orange-400 border-orange-500/30"
};

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  const timeline = [
    {
      period: "Dec 2021 - Present",
      role: "Lead Software Engineer",
      company: "NCS, Singapore",
      location: "Singapore",
      current: true
    },
    {
      period: "May 2021 - Nov 2021",
      role: "Senior Software Engineer",
      company: "BlackStraw.AI",
      location: "India",
    },
    {
      period: "Aug 2019 - Dec 2020",
      role: "Software Engineer",
      company: "HDB (via AllTech Systems)",
      location: "Singapore",
    },
    {
      period: "Jul 2018 - Jul 2019",
      role: "Software Engineer",
      company: "Wolters Kluwer",
      location: "India",
    },
    {
      period: "May 2016 - Jul 2018",
      role: "Associate Software Engineer",
      company: "SysArc Infomatix",
      location: "India",
    }
  ];

  const ProjectCard = ({ project, index }) => (
    <Card 
      className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-white">{project.title}</CardTitle>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{project.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{project.duration}</span>
              </div>
            </div>
          </div>
          {project.category && (
            <Badge variant="outline" className={categoryColors[project.category]}>
              {project.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>
        
        {project.highlights && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Key Achievements:</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && (
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="bg-slate-700/50 text-slate-300 border-slate-600"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Briefcase className="w-4 h-4 mr-2" />
            Professional Journey
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Experience & Projects
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive look at my professional journey, key projects, and 
            the impact I've made across different industries and technologies.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Career Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className={`w-4 h-4 rounded-full border-2 ${item.current ? 'bg-blue-500 border-blue-500' : 'bg-slate-800 border-slate-600'} z-10`}></div>
                  <Card className="flex-1 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                          <p className="text-blue-400 font-medium">{item.company}</p>
                          <div className="flex items-center space-x-4 mt-2 text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{item.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{item.location}</span>
                            </div>
                          </div>
                        </div>
                        {item.current && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2 md:mt-0">
                            Current Position
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
          
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger 
                value="government" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                Government
              </TabsTrigger>
              <TabsTrigger 
                value="fintech" 
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                FinTech
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                AI/ML
              </TabsTrigger>
              <TabsTrigger 
                value="real-estate" 
                className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
              >
                Real Estate
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Certifications - Updated Design */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Award className="w-8 h-8 text-yellow-400 mr-3" />
              Professional Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Professional Scrum Product Owner™ I</h3>
                  <p className="text-sm text-slate-400">Product Management & Strategy</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Professional Scrum Master™ I</h3>
                  <p className="text-sm text-slate-400">Agile Leadership & Team Management</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">ICT Assessment Certification</h3>
                  <p className="text-sm text-slate-400">NUS-ISS Singapore</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
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
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                {/* These links are placeholders and should ideally link to sections within the same page or other pages. */}
                {/* For a single page app, you might use hash links like #about, #skills, #projects */}
                <a href="#about" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">About</a>
                <a href="#skills" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Skills</a>
                <a href="#projects" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Projects</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/meenakannan-mk/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:meenakannan92@gmail.com" className="text-slate-400 hover:text-green-400">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://wa.me/919789302084" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">© 2024 Meena Kannan. Crafted with passion and precision.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

File - Contact

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { SendEmail } from "@/integrations/Core";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await SendEmail({
        to: "meenakannan92@gmail.com",
        subject: `Portfolio Contact: ${formData.subject}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          Subject: ${formData.subject}
          
          Message:
          ${formData.message}
        `
      });
      
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "meenakannan92@gmail.com",
      link: "mailto:meenakannan92@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+65 87373057",
      link: "tel:+6587373057",
      color: "text-green-400"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+91 97893 02084",
      link: "https://wa.me/919789302084",
      color: "text-green-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Singapore",
      link: null,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Connect
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and software development.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-slate-700/50 ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target={item.label === "WhatsApp" ? "_blank" : undefined}
                          rel={item.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                          className="text-white hover:text-blue-400 transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Availability - Updated Design */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <Clock className="w-6 h-6 text-blue-400 mr-3" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Currently open to new opportunities and interesting projects. 
                  I typically respond to messages within 24 hours.
                </p>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Available for Work
                </Badge>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Connect on Social</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a
                    href="https://www.linkedin.com/in/meenakannan-mk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">LinkedIn</p>
                      <p className="text-slate-400 text-sm">Professional Network</p>
                    </div>
                  </a>
                  
                  <a
                    href="mailto:meenakannan92@gmail.com"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-slate-400 text-sm">Direct Communication</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Send a Message</CardTitle>
                <p className="text-slate-400">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-slate-400 mb-6">
                      Thank you for reaching out. I'll respond to your message within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setSubmitted(false)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                        placeholder="Project Discussion"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 resize-none"
                        placeholder="Tell me about your project or just say hello..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
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
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">About</a>
                <a href="#skills" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Skills</a>
                <a href="#projects" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Projects</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/meenakannan-mk/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:meenakannan92@gmail.com" className="text-slate-400 hover:text-green-400">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://wa.me/919789302084" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">© 2024 Meena Kannan. Crafted with passion and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


File - About

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Award,
  Target,
  Heart,
  Code,
  Users,
  Lightbulb,
  Download,
  Sparkles,
  Mail, // Added for footer contact
  MessageCircle // Added for WhatsApp contact
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Committed to writing clean, maintainable code and following industry best practices.",
      color: "text-blue-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Leadership",
      description: "Passionate about mentoring developers and fostering collaborative team environments.",
      color: "text-green-400"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Always staying updated with latest technologies and industry trends.",
      color: "text-purple-400"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Business Impact",
      description: "Focus on delivering solutions that drive real business value and user satisfaction.",
      color: "text-cyan-400"
    }
  ];

  const achievements = [
    "Led modernization of Singapore's national vehicle licensing system",
    "Mentored 15+ junior developers across multiple projects",
    "Achieved 99.9% uptime for mission-critical government applications",
    "Reduced system processing time by 60% through optimization",
    "Implemented DevOps practices reducing deployment time by 75%"
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <User className="w-4 h-4 mr-2" />
            About Me
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Passionate About Technology
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            I'm a Lead Software Engineer with 9+ years of experience building scalable,
            high-performance applications. Based in Singapore, I specialize in full-stack
            development, cloud architecture, and Agile team leadership.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Professional Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  My journey in software development began in 2016, and since then, I've had the privilege
                  of working on diverse projects spanning government systems, fintech, AI/ML, and real estate
                  platforms. Currently based in Singapore, I serve as a Lead Software Engineer at NCS,
                  where I lead the development of mission-critical systems for government agencies.
                </p>
                <p>
                  What drives me most is the opportunity to solve complex technical challenges while
                  mentoring the next generation of developers. I believe in building not just great software,
                  but great teams that can deliver sustainable, scalable solutions.
                </p>
                <p>
                  My expertise spans the full technology stack - from designing microservices architectures
                  with Spring Boot and deploying them on AWS, to crafting responsive user interfaces with
                  Angular and React. I'm particularly passionate about cloud-native development and DevOps practices.
                </p>
              </CardContent>
            </Card>

            {/* Core Values */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Core Values & Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="space-y-3">
                      <div className={`${value.color}`}>
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                      <p className="text-slate-400 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Facts - Updated Design */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Experience</p>
                    <p className="text-white font-medium">9+ Years</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-medium">Singapore</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Specialization</p>
                    <p className="text-white font-medium">Full-Stack Development</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Current Role</p>
                    <p className="text-white font-medium">Lead Software Engineer</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Education</p>
                    <p className="text-white font-medium">B.E, Anna University</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-white font-medium">Professional Scrum Product Owner™ I</p>
                  <p className="text-slate-400 text-sm">Product Strategy & Management</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">Professional Scrum Master™ I</p>
                  <p className="text-slate-400 text-sm">Agile Leadership</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">ICT Assessment Certification</p>
                  <p className="text-slate-400 text-sm">NUS-ISS Singapore</p>
                </div>
              </CardContent>
            </Card>

            {/* Download Resume - Updated Design */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group hover:bg-slate-800/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-green-400 group-hover:animate-bounce" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Download Resume</h3>
                <p className="text-slate-400 text-sm mb-4">Complete professional profile with detailed experience</p>
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/25"
                  onClick={() => window.open('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b53a59450b409515631d30/bd0a6ee13_Meena_Kannan_Java_Agile_Cloud_DevSecOps.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Get PDF Resume
                </Button>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          </div>
        </div>

        {/* Key Achievements */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Target className="w-8 h-8 text-green-400 mr-3" />
              Key Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300">{achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Touch - Updated Design */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center">
              <Heart className="w-8 h-8 text-red-400 mr-3" />
              Beyond the Code
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
              When I'm not coding, I enjoy exploring Singapore's vibrant tech community,
              contributing to open-source projects, and staying up-to-date with the latest
              developments in cloud computing and AI. I believe in work-life balance and
              the importance of continuous learning both professionally and personally.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
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
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">About</a>
                <a href="#skills" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Skills</a>
                <a href="#projects" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Projects</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/meenakannan-mk/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:meenakannan92@gmail.com" className="text-slate-400 hover:text-green-400">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://wa.me/919789302084" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">© 2024 Meena Kannan. Crafted with passion and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

Folder - Components
Folder - Skills
File - skillsData
import React from "react";

export const skillsData = [
  {
    id: 1,
    name: "Java",
    category: "programming",
    proficiency: 95,
    years_experience: 9,
    description: "Core Java, Java 21, J2EE - Primary programming language for enterprise applications"
  },
  {
    id: 2,
    name: "Spring Boot",
    category: "backend",
    proficiency: 92,
    years_experience: 7,
    description: "Microservices architecture, REST APIs, Spring Security, Spring Data JPA"
  },
  {
    id: 3,
    name: "Angular",
    category: "frontend",
    proficiency: 88,
    years_experience: 5,
    description: "Angular 18, RxJS, NgRx state management, TypeScript"
  },
  {
    id: 4,
    name: "AWS",
    category: "cloud",
    proficiency: 85,
    years_experience: 4,
    description: "EC2, S3, RDS, Lambda, ECS, IAM - Cloud-native application deployment"
  },
  {
    id: 5,
    name: "PostgreSQL",
    category: "database",
    proficiency: 90,
    years_experience: 6,
    description: "Database design, optimization, complex queries, data modeling"
  },
  {
    id: 6,
    name: "Docker",
    category: "devops",
    proficiency: 87,
    years_experience: 5,
    description: "Containerization, Docker Compose, multi-stage builds"
  },
  {
    id: 7,
    name: "Kubernetes",
    category: "devops",
    proficiency: 82,
    years_experience: 3,
    description: "Container orchestration, Helm charts, service mesh with Istio"
  },
  {
    id: 8,
    name: "Apache Kafka",
    category: "backend",
    proficiency: 85,
    years_experience: 4,
    description: "Event streaming, Kafka Streams, message queuing for microservices"
  },
  {
    id: 9,
    name: "React",
    category: "frontend",
    proficiency: 80,
    years_experience: 3,
    description: "Component-based architecture, Hooks, Context API, Next.js"
  },
  {
    id: 10,
    name: "Jenkins",
    category: "devops",
    proficiency: 85,
    years_experience: 5,
    description: "CI/CD pipelines, automated testing, deployment orchestration"
  },
  {
    id: 11,
    name: "MongoDB",
    category: "database",
    proficiency: 75,
    years_experience: 3,
    description: "NoSQL database design, aggregation pipelines, document modeling"
  },
  {
    id: 12,
    name: "JUnit",
    category: "testing",
    proficiency: 90,
    years_experience: 7,
    description: "Unit testing, test-driven development, Mockito for mocking"
  },
  {
    id: 13,
    name: "Python",
    category: "programming",
    proficiency: 70,
    years_experience: 2,
    description: "Data processing, automation scripts, API development"
  },
  {
    id: 14,
    name: "Terraform",
    category: "devops",
    proficiency: 75,
    years_experience: 2,
    description: "Infrastructure as Code, cloud resource provisioning"
  },
  {
    id: 15,
    name: "Redis",
    category: "database",
    proficiency: 80,
    years_experience: 4,
    description: "Caching strategies, session management, pub/sub messaging"
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Vehicle-Related Licensing System 2.0 (VRLS)",
    company: "NCS, Singapore",
    role: "Lead Software Engineer",
    duration: "Dec 2021 - Present",
    category: "government",
    description: "The modernized VRLS 2.0 is built using microservices architecture with Spring Boot and Angular, deployed on AWS Government Cloud with high availability, security, and scalability to support nationwide digital services for Singapore's Land Transport Authority.",
    technologies: ["Spring Boot", "Angular 13", "AWS ECS", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Prometheus", "Grafana"],
    highlights: [
      "Led modernization of critical government system serving entire Singapore population",
      "Architected microservices solution reducing system downtime by 99.9%",
      "Implemented event-driven architecture with Kafka for real-time processing",
      "Mentored team of 8 developers on cloud-native development practices",
      "Achieved SOC2 compliance and enhanced security protocols"
    ]
  },
  {
    id: 2,
    title: "Promo Power Solution",
    company: "BlackStraw.AI",
    role: "Senior Software Engineer",
    duration: "May 2021 - Nov 2021",
    category: "ai",
    description: "The automated Promo Power solution helps retailers streamline store-level execution by eliminating manual processes, improving efficiency, and forecasting sales. It supports CPG companies in maximizing the impact of trade promotions.",
    technologies: ["Java", "Spring Boot", "Groovy", "Kafka", "AWS Lambda", "PostgreSQL", "REST APIs", "Jenkins", "SonarQube"],
    highlights: [
      "Developed AI-powered promotion optimization algorithms",
      "Implemented serverless architecture reducing infrastructure costs by 40%",
      "Built real-time analytics dashboard for retail performance tracking",
      "Integrated machine learning models for demand forecasting"
    ]
  },
  {
    id: 3,
    title: "Housing Development Board Resale Portal",
    company: "HDB (via AllTech Systems)",
    role: "Software Engineer",
    duration: "Aug 2019 - Dec 2020",
    category: "real-estate",
    description: "The Resale One Stop Portal simplifies the resale process for flat buyers and sellers through a guided, step-by-step journey. The system includes eligibility checks, fee computation, and multi-level approval workflows.",
    technologies: ["Java", "JSF", "PrimeFaces", "Oracle DB", "WebLogic", "SOAP Web Services", "SVN"],
    highlights: [
      "Streamlined property transaction process for 50,000+ annual transactions",
      "Implemented complex business logic for eligibility validation",
      "Reduced processing time from weeks to days through automation",
      "Developed comprehensive approval workflow system"
    ]
  },
  {
    id: 4,
    title: "Legal View Bill Analyzer",
    company: "Wolters Kluwer",
    role: "Software Engineer",
    duration: "Jul 2018 - Jul 2019",
    category: "ai",
    description: "Developed a Spring Boot microservice for an end-to-end bill review system that combines AI models and legal expert input to analyze data and provide smart insights to legal professionals.",
    technologies: ["Spring Boot", "MongoDB", "REST APIs", "AI/ML Models", "Jenkins", "Git", "SonarQube"],
    highlights: [
      "Integrated AI engines for automated legal document analysis",
      "Built microservices architecture for scalable legal tech platform",
      "Implemented smart insights generation reducing manual review time by 60%",
      "Developed REST APIs serving 10,000+ daily requests"
    ]
  },
  {
    id: 5,
    title: "Lending Automation Processing System (LAPS)",
    company: "SysArc Infomatix",
    role: "Associate Software Engineer",
    duration: "May 2016 - Jul 2018",
    category: "fintech",
    description: "LAPS is a comprehensive banking solution that automates the entire lending process, including risk analysis, workflow management, document handling, and scanning, streamlining all lending functions for financial institutions.",
    technologies: ["Java", "Struts", "JSP", "Oracle DB", "WebLogic", "JDBC", "SVN"],
    highlights: [
      "Automated end-to-end lending workflow reducing processing time by 50%",
      "Implemented risk assessment algorithms for loan approval",
      "Built document management system with OCR integration",
      "Developed comprehensive reporting dashboard for loan officers"
    ]
  }
];

Folder - Entities

File - Project
{
    "name": "Project",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Project title"
      },
      "company": {
        "type": "string",
        "description": "Company name"
      },
      "role": {
        "type": "string",
        "description": "Role in the project"
      },
      "duration": {
        "type": "string",
        "description": "Project duration"
      },
      "description": {
        "type": "string",
        "description": "Project description"
      },
      "technologies": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Technologies used"
      },
      "highlights": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Key achievements and highlights"
      },
      "category": {
        "type": "string",
        "enum": [
          "government",
          "fintech",
          "ai",
          "real-estate"
        ],
        "description": "Project category"
      }
    },
    "required": [
      "title",
      "company",
      "description"
    ]
  }

  File - Skill
  {
    "name": "Skill",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Skill name"
      },
      "category": {
        "type": "string",
        "enum": [
          "programming",
          "frontend",
          "backend",
          "cloud",
          "devops",
          "database",
          "testing"
        ],
        "description": "Skill category"
      },
      "proficiency": {
        "type": "number",
        "minimum": 1,
        "maximum": 100,
        "description": "Proficiency level (1-100)"
      },
      "years_experience": {
        "type": "number",
        "description": "Years of experience with this skill"
      },
      "description": {
        "type": "string",
        "description": "Skill description or context"
      }
    },
    "required": [
      "name",
      "category",
      "proficiency"
    ]
  }

  File - Layout
  
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, User, Code, Briefcase, Mail, FileText, MessageCircle } from "lucide-react";

const navigationItems = [
  { title: "Home", url: createPageUrl("Portfolio"), icon: Home },
  { title: "About", url: createPageUrl("About"), icon: User },
  { title: "Skills", url: createPageUrl("Skills"), icon: Code },
  { title: "Experience", url: createPageUrl("Experience"), icon: Briefcase },
  { title: "Contact", url: createPageUrl("Contact"), icon: Mail },
];

export default function Layout({ children, currentPageName }) {
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
