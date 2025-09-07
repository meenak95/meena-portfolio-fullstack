import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { 
  Code, 
  Cloud, 
  Database, 
  Globe, 
  Award,
  ArrowRight,
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
  Linkedin
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { skillsData, projectsData } from "../components/skills/SkillsData";
import Hero from "../components/Hero";
import Stats from "../components/Stats";


const TiltCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = React.useRef<HTMLDivElement>(null);

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
  const heroRef = React.useRef<HTMLElement>(null);
  const skillsRef = React.useRef<HTMLElement>(null);
  const projectsRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const elementsToObserve = [heroRef.current, skillsRef.current, projectsRef.current].filter((el): el is HTMLElement => el !== null);
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
    <div className="relative">
      {/* Dynamic Background with Particle System */}
      <div className="fixed inset-0 pointer-events-none z-0">
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


      {/* Hero Section */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Stats Section */}
      <div className="relative z-10">
        <Stats />
      </div>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-6 relative z-10">
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
                          <span className="font-bold text-white" aria-live="polite">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} delayMs={index * 100} />
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
      <section ref={projectsRef} className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-950 relative z-10">
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
                          <Badge variant="outline" className={`${categoryColors[project.category as keyof typeof categoryColors]} animate-pulse-gentle`}>
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

      {/* About & Certifications Section */}
      <section className="py-20 px-6 relative z-10">
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

      {/* Beyond the Code */}
      <section className="py-20 px-6 relative z-10">
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
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative z-10">
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

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <Card 
              className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up"
              style={{ animationDelay: `0s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm mb-2">Email</p>
                <a 
                  href="mailto:meenakannan92@gmail.com"
                  className="text-white font-medium hover:text-blue-400 transition-colors duration-300 break-all"
                >
                  meenakannan92@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Phone & WhatsApp combined */}
            <Card 
              className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up"
              style={{ animationDelay: `0.1s` }}
            >
              <CardContent className="p-6">
                <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm mb-3 text-center">Phone & WhatsApp</p>
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <a href="tel:+6587373057" className="text-white font-medium hover:text-blue-400 transition-colors duration-300">
                      +65 87373057
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <a href="https://wa.me/919789302084" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-blue-400 transition-colors duration-300">
                      +91 97893 02084
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card 
              className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up"
              style={{ animationDelay: `0.2s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm mb-2">Location</p>
                <p className="text-white font-medium">Singapore • India</p>
              </CardContent>
            </Card>
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

      {/* Footer moved to global Layout */}
    </div>
  );
}
