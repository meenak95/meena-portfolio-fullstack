import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  Wrench,
  TestTube,
  Linkedin,
  TrendingUp,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillsData, projectsData } from "@/components/skills/SkillsData";

const Counter = ({ to }) => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(String(to).replace("+", ""));
          if (start === end) return;
          let duration = 2000;
          let startTime = null;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [to]);

  return <span ref={ref}>{count}{String(to).includes("+") ? "+" : ""}</span>;
};

const TiltCard = ({ children, className, style }) => {
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
    ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className || ""}`}
      style={style}
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const elementsToObserve = [heroRef.current, skillsRef.current, projectsRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1 }
    );
    elementsToObserve.forEach((el) => observer.observe(el));
    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const techStack = [
    { name: "Java", icon: <Code className="w-6 h-6" />, color: "bg-orange-500" },
    { name: "Spring Boot", icon: <Cpu className="w-6 h-6" />, color: "bg-green-500" },
    { name: "Angular", icon: <Globe className="w-6 h-6" />, color: "bg-red-500" },
    { name: "AWS", icon: <Cloud className="w-6 h-6" />, color: "bg-yellow-500" },
    { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, color: "bg-blue-500" },
    { name: "Kubernetes", icon: <Building2 className="w-6 h-6" />, color: "bg-purple-500" },
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
    backend: { icon: Building2, color: "text-purple-400" },
    cloud: { icon: Cloud, color: "text-cyan-400" },
    database: { icon: Database, color: "text-orange-400" },
    devops: { icon: Wrench, color: "text-red-400" },
    testing: { icon: TestTube, color: "text-pink-400" },
  };

  const filteredSkills = activeSkillCategory === "all" ? skillsData : skillsData.filter((s) => s.category === activeSkillCategory);
  const filteredProjects = activeProjectCategory === "all" ? projectsData : projectsData.filter((p) => p.category === activeProjectCategory);

  const categoryColors = {
    government: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    fintech: "bg-green-500/20 text-green-400 border-green-500/30",
    ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "real-estate": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float-1" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float-2" />
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-400/5 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
        />
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-cloud-float"
              style={{ left: `${Math.random() * 100}%`, top: `${20 + Math.random() * 60}%`, animationDelay: `${i * 2}s`, animationDuration: `${15 + Math.random() * 10}s` }}
            >
              <Cloud className="w-8 h-8 text-slate-700" />
            </div>
          ))}
        </div>
      </div>

      <Link
        href="#contact"
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group animate-bounce-subtle"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
      </Link>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-7xl mx-auto text-center z-10">
          <div className="mb-12 opacity-0 translate-y-8 animate-fade-in-up">
            <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-lg animate-glow">
              <Sparkles className="w-5 h-5 mr-2 animate-spin-slow" />
              Lead Software Engineer
            </Badge>
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-300%">Meena</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-300% animation-delay-1000">Kannan</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Architecting the future with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold animate-pulse"> scalable solutions</span>,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold animate-pulse animation-delay-500"> cloud innovation</span>, and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold animate-pulse animation-delay-1000"> technical excellence</span>.
            </p>
          </div>

          <div className="relative mb-16 h-96 w-96 mx-auto opacity-0 translate-y-8 animate-fade-in-up delay-300">
            <div className="absolute inset-0 animate-spin-very-slow">
              {techStack.map((tech, index) => (
                <div key={tech.name} className="absolute flex items-center justify-center" style={{ left: "50%", top: "50%", transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-140px) rotate(-${index * 60}deg)` }}>
                  <div className={`group relative p-4 rounded-2xl ${tech.color}/20 border ${tech.color}/30 backdrop-blur-sm hover:scale-125 transition-all duration-500 cursor-pointer animate-float-gentle`} style={{ animationDelay: `${index * 0.5}s` }}>
                    <div className={`p-2 rounded-xl ${tech.color}/30`}>
                      {tech.icon}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 px-3 py-1 rounded-full text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {tech.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                <Cpu className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-8 animate-fade-in-up delay-500">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
              <Briefcase className="w-6 h-6 mr-3" />
              Explore My Work
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button
              className="border-2 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 hover:text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b53a59450b409515631d30/bd0a6ee13_Meena_Kannan_Java_Agile_Cloud_DevSecOps.pdf', '_blank')}
            >
              <Download className="w-6 h-6 mr-3" />
              Download Resume
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-scroll-indicator"></div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-400 rotate-90" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Milestones
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">At a Glance</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="group relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-slate-800/50 opacity-0 translate-y-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`${stat.color} mb-6 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-white mb-3">
                  <Counter to={stat.number} />
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={skillsRef} id="skills" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Code className="w-4 h-4 mr-2" />
              Technical Expertise
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Skills & Technologies</h2>
          </div>

          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveSkillCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger value="all" className="rounded-xl">All</TabsTrigger>
              {Object.keys(categoryIcons).map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize rounded-xl">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeSkillCategory} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSkills.map((skill, index) => (
                  <Card key={skill.id} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                        <Badge variant="outline" className="text-slate-300 border-slate-600 bg-slate-700/50">{skill.years_experience}y</Badge>
                      </div>
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-slate-400 mb-3">
                          <span>Proficiency</span>
                          <span className="font-bold text-white">{skill.proficiency}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={skill.proficiency} className="h-3 bg-slate-700/50 rounded-full overflow-hidden" />
                        </div>
                      </div>
                      {skill.description && <p className="text-sm text-slate-400 leading-relaxed">{skill.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section ref={projectsRef} id="projects" className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Projects
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Featured Work</h2>
          </div>

          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveProjectCategory}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger value="all" className="rounded-xl">All Projects</TabsTrigger>
              <TabsTrigger value="government" className="rounded-xl">Government</TabsTrigger>
              <TabsTrigger value="fintech" className="rounded-xl">FinTech</TabsTrigger>
              <TabsTrigger value="ai" className="rounded-xl">AI/ML</TabsTrigger>
              <TabsTrigger value="real-estate" className="rounded-xl">Real Estate</TabsTrigger>
            </TabsList>

            <TabsContent value={activeProjectCategory} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <Card key={project.id} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl text-white">{project.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-slate-400">
                            <div className="flex items-center space-x-2"><Building2 className="w-4 h-4" /><span className="text-sm font-medium">{project.company}</span></div>
                            <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span className="text-sm">{project.duration}</span></div>
                          </div>
                        </div>
                        {project.category && <Badge variant="outline" className={categoryColors[project.category]}>{project.category}</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>
                      {project.highlights && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center"><Target className="w-4 h-4 mr-2 text-green-400" />Key Achievements:</h4>
                          <ul className="space-y-2">
                            {project.highlights.slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.technologies && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center"><Code className="w-4 h-4 mr-2 text-blue-400" />Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 6).map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600">{tech}</Badge>
                            ))}
                            {project.technologies.length > 6 && <Badge variant="outline" className="text-slate-400 border-slate-600">+{project.technologies.length - 6} more</Badge>}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <TiltCard>
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-slate-900/50"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-red-400" />
                </div>
                <h2 className="text-4xl font-black text-white mb-6">Beyond the Code</h2>
                <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">When I'm not architecting systems, I'm exploring Singapore's tech scene, contributing to open-source, or diving into the latest in cloud computing and AI.</p>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            Let's Connect
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Ready to Collaborate?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">I'm always interested in discussing new opportunities and innovative projects.</p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Mail, label: "Email", value: "meenakannan92@gmail.com", href: "mailto:meenakannan92@gmail.com" },
              { icon: Phone, label: "Phone", value: "+65 87373057", href: "tel:+6587373057" },
              { icon: MessageCircle, label: "WhatsApp", value: "+91 97893 02084", href: "https://wa.me/919789302084" },
              { icon: MapPin, label: "Location", value: "Singapore", href: null },
            ].map((contact, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-blue-400 mb-4 flex justify-center"><contact.icon className="w-8 h-8" /></div>
                  <p className="text-slate-400 text-sm mb-2">{contact.label}</p>
                  {contact.href ? (
                    <a href={contact.href} target={contact.label === "WhatsApp" ? "_blank" : undefined} rel={contact.label === "WhatsApp" ? "noopener noreferrer" : undefined} className="text-white font-medium hover:text-blue-400 transition-colors duration-300">{contact.value}</a>
                  ) : (
                    <p className="text-white font-medium">{contact.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Link href="#contact">
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
              <Send className="w-6 h-6 mr-3" />
              Get In Touch
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg">MK</span></div>
                <div>
                  <h3 className="text-white font-bold text-xl">Meena Kannan</h3>
                  <p className="text-slate-400 text-sm">Lead Software Engineer</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Building scalable solutions with passion and precision.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">About</a>
                <a href="#skills" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">Skills</a>
                <a href="#projects" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">Projects</a>
                <a href="#contact" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">Contact</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/meenakannan-mk/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:meenakannan92@gmail.com" className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-green-500/20 transition-all duration-300 group">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="tel:+6587373057" className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300 group">
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">© 2024 Meena Kannan. Crafted with passion and precision.</p>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${2 + Math.random() * 3}s` }} />
          ))}
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(3rem); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
        @keyframes float-gentle { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); } 50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); } }
        @keyframes scroll-indicator { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(16px); opacity: 0; } }
        @keyframes cloud-float { 0% { transform: translateX(-100px); } 100% { transform: translateX(calc(100vw + 100px)); } }
        @keyframes twinkle { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
        @keyframes spin-very-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
        .animate-cloud-float { animation: cloud-float linear infinite; }
        .animate-twinkle { animation: twinkle ease-in-out infinite; }
        .animate-spin-very-slow { animation: spin-very-slow 20s linear infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .bg-300% { background-size: 300% 300%; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
        .animate-in { opacity: 1; transform: translateY(0); }
        .animate-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}