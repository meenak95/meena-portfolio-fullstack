//Pages

 Portfolio
import React, { useState, useEffect } from "react";
import { Project, Experience } from "@/entities/all";

import HeroSection from "../components/portfolio/HeroSection";
import SkillsMatrix from "../components/portfolio/SkillsMatrix";
import ProjectShowcase from "../components/portfolio/ProjectShowcase";
import ExperienceTimeline from "../components/portfolio/ExperienceTimeline";
import ContactTerminal from "../components/portfolio/ContactTerminal";
import NavigationDock from "../components/portfolio/NavigationDock";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    loadData();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadData = async () => {
    try {
      const [projectData, experienceData] = await Promise.all([
        Project.list('-created_date'),
        Experience.list('-start_date')
      ]);
      setProjects(projectData);
      setExperiences(experienceData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleScroll = () => {
    const sections = ['hero', 'skills', 'projects', 'experience', 'contact'];
    const scrollPos = window.scrollY + window.innerHeight / 3;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Navigation */}
      <NavigationDock 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Sections */}
      <section id="hero">
        <HeroSection />
      </section>

      <section id="skills">
        <SkillsMatrix />
      </section>

      <section id="projects">
        <ProjectShowcase projects={projects} />
      </section>

      <section id="experience">
        <ExperienceTimeline experiences={experiences} />
      </section>

      <section id="contact">
        <ContactTerminal />
      </section>
    </div>
  );
}

/Components

//Portfolio

HeroSection

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Database, Server, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [currentCode, setCurrentCode] = useState(0);
  const [typedText, setTypedText] = useState("");

  const codeSnippets = [
    "public class Developer { ... }",
    "@SpringBootApplication",
    "SELECT * FROM innovations;",
    "docker build -t portfolio .",
    "npm run deploy --production"
  ];

  const roles = [
    "Full Stack Java Developer",
    "Spring Boot Architect", 
    "Microservices Engineer",
    "DevOps Automation Specialist",
    "Cloud Infrastructure Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  useEffect(() => {
    let timeout;
    const snippet = codeSnippets[currentCode];
    setTypedText("");
    
    let index = 0;
    const typeCharacter = () => {
      if (index < snippet.length) {
        setTypedText(snippet.slice(0, index + 1));
        index++;
        timeout = setTimeout(typeCharacter, 100);
      }
    };
    
    timeout = setTimeout(typeCharacter, 500);
    return () => clearTimeout(timeout);
  }, [currentCode, codeSnippets]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/20 font-mono text-xs"
            initial={{ y: "100vh", x: `${Math.random() * 100}vw` }}
            animate={{ 
              y: "-20vh",
              x: `${Math.random() * 100}vw`
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            {codeSnippets[i % codeSnippets.length]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              JOHN DOE
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 font-mono">
              <span className="text-green-400">&gt;</span> 
              <motion.span
                key={currentCode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-2"
              >
                {roles[currentCode % roles.length]}
              </motion.span>
            </div>
          </motion.div>

          {/* Code Terminal */}
          <motion.div 
            className="bg-black/80 rounded-lg border border-green-500/30 p-6 mb-8 font-mono text-left max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-auto text-gray-500 text-xs">portfolio.java</span>
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">$</span> {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-5 bg-green-400 ml-1"
              />
            </div>
          </motion.div>

          {/* Tech Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { icon: Code2, label: "Lines of Code", value: "500K+" },
              { icon: Server, label: "Microservices", value: "50+" },
              { icon: Database, label: "Databases", value: "15+" },
              { icon: Terminal, label: "Deployments", value: "200+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <stat.icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:john@example.com", label: "Email" }
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
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-green-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

SkillsMatrix
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState("backend");

  const skillCategories = {
    backend: {
      title: "Backend Architecture",
      skills: [
        { name: "Spring Boot", level: 95, icon: "🚀", description: "Enterprise-grade REST APIs & Microservices" },
        { name: "Java 21", level: 90, icon: "☕", description: "OOP, Streams, Lambda, Virtual Threads" },
        { name: "JPA/Hibernate", level: 88, icon: "🗄️", description: "Complex ORM mappings & Query optimization" },
        { name: "Maven/Gradle", level: 85, icon: "⚙️", description: "Build automation & Dependency management" },
        { name: "JUnit/Mockito", level: 92, icon: "🧪", description: "Unit testing & Test-driven development" }
      ]
    },
    frontend: {
      title: "Frontend Engineering", 
      skills: [
        { name: "React.js", level: 88, icon: "⚛️", description: "Component architecture & State management" },
        { name: "TypeScript", level: 85, icon: "🔷", description: "Type-safe development & Advanced generics" },
        { name: "Tailwind CSS", level: 90, icon: "🎨", description: "Responsive design & Component styling" },
        { name: "Next.js", level: 82, icon: "▲", description: "SSR/SSG & Performance optimization" },
        { name: "Redux Toolkit", level: 80, icon: "🔄", description: "Global state & Async data management" }
      ]
    },
    devops: {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 90, icon: "🐳", description: "Containerization & Multi-stage builds" },
        { name: "Kubernetes", level: 85, icon: "☸️", description: "Container orchestration & Scaling" },
        { name: "AWS/GCP", level: 88, icon: "☁️", description: "Cloud infrastructure & Serverless" },
        { name: "Jenkins/GitHub Actions", level: 87, icon: "🔄", description: "CI/CD pipelines & Automation" },
        { name: "Terraform", level: 83, icon: "🏗️", description: "Infrastructure as Code & Provisioning" }
      ]
    },
    database: {
      title: "Database & Storage",
      skills: [
        { name: "PostgreSQL", level: 92, icon: "🐘", description: "Advanced SQL & Query optimization" },
        { name: "MongoDB", level: 85, icon: "🍃", description: "NoSQL design & Aggregation pipelines" },
        { name: "Redis", level: 88, icon: "🔴", description: "Caching strategies & Session management" },
        { name: "Elasticsearch", level: 80, icon: "🔍", description: "Full-text search & Analytics" },
        { name: "Apache Kafka", level: 83, icon: "📨", description: "Event streaming & Message queues" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            &lt; Technical Stack /&gt;
          </h2>
          <p className="text-xl text-gray-400 font-mono">
            Enterprise-level expertise across the full development lifecycle
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-lg font-mono font-semibold transition-all duration-300 ${
                selectedCategory === key
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-green-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={selectedCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {skillCategories[selectedCategory].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-gray-400">{skill.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-green-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Certifications */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-green-400">
            Professional Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Oracle Certified Java Developer",
              "AWS Solutions Architect",
              "Spring Professional Certification",
              "Kubernetes Administrator (CKA)",
              "Docker Certified Associate"
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  {cert}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

ProjectShowcase
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, Server, Code, Zap } from "lucide-react";

export default function ProjectShowcase({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const projectCategories = ["all", "enterprise", "microservices", "full-stack", "devops"];

  const complexityIcons = {
    beginner: { icon: Code, color: "text-green-400" },
    intermediate: { icon: Server, color: "text-blue-400" },
    advanced: { icon: Database, color: "text-purple-400" },
    enterprise: { icon: Zap, color: "text-red-400" }
  };

  // Sample projects if none exist
  const sampleProjects = projects.length > 0 ? projects : [
    {
      id: 1,
      title: "Enterprise E-commerce Platform",
      description: "Scalable microservices architecture with Spring Cloud, handling 100K+ concurrent users",
      tech_stack: ["Spring Boot", "PostgreSQL", "Redis", "Docker", "Kubernetes", "React"],
      github_url: "https://github.com/johndoe/ecommerce",
      live_url: "https://ecommerce-demo.com",
      image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      complexity: "enterprise",
      status: "production"
    },
    {
      id: 2,
      title: "Real-time Trading Algorithm",
      description: "High-frequency trading system using WebSockets, Event Sourcing, and CQRS patterns",
      tech_stack: ["Spring WebFlux", "Apache Kafka", "MongoDB", "WebSockets", "Docker"],
      github_url: "https://github.com/johndoe/trading-algo",
      complexity: "advanced",
      status: "production"
    },
    {
      id: 3,
      title: "DevOps Automation Suite", 
      description: "CI/CD pipeline automation with Infrastructure as Code and monitoring dashboards",
      tech_stack: ["Jenkins", "Terraform", "AWS", "Grafana", "Prometheus", "Ansible"],
      github_url: "https://github.com/johndoe/devops-suite",
      complexity: "enterprise",
      status: "production"
    }
  ];

  const displayProjects = sampleProjects.filter(project => 
    filter === "all" || project.tech_stack.some(tech => 
      tech.toLowerCase().includes(filter.replace("-", " "))
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 font-mono">
            Production-ready applications with enterprise-grade architecture
          </p>
        </motion.div>

        {/* Project Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {projectCategories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={`font-mono ${
                filter === category 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
              }`}
            >
              {category.replace("-", " ").toUpperCase()}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayProjects.map((project, index) => {
              const ComplexityIcon = complexityIcons[project.complexity]?.icon || Code;
              const complexityColor = complexityIcons[project.complexity]?.color || "text-gray-400";

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-gray-900/80 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group h-full">
                    {project.image_url && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={`${complexityColor} bg-black/80`}>
                            <ComplexityIcon className="w-3 h-3 mr-1" />
                            {project.complexity}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech, i) => (
                          <Badge 
                            key={i}
                            variant="outline" 
                            className="text-xs border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        {project.github_url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
                          >
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Source
                            </a>
                          </Button>
                        )}
                        {project.live_url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                          >
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Architecture Philosophy */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Development Philosophy</h3>
            <p className="text-gray-300 font-mono leading-relaxed">
              "Building scalable, maintainable software through clean architecture principles, 
              test-driven development, and continuous integration. Every line of code is an 
              investment in future stability and performance."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

ExperienceTimeline

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, Server, Code } from "lucide-react";
import { format } from "date-fns";

export default function ExperienceTimeline({ experiences }) {
  // Sample experience data if none provided
  const sampleExperiences = experiences.length > 0 ? experiences : [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Full Stack Java Developer",
      start_date: "2022-01-15",
      current: true,
      type: "full-time",
      description: "Leading development of cloud-native microservices architecture serving 1M+ users. Implemented domain-driven design patterns, event sourcing with Apache Kafka, and CQRS for high-throughput trading systems.",
      technologies: ["Spring Boot", "Kubernetes", "PostgreSQL", "Apache Kafka", "React", "AWS"]
    },
    {
      id: 2,
      company: "InnovateLabs Inc",
      position: "Java Backend Engineer",
      start_date: "2020-03-01", 
      end_date: "2021-12-31",
      type: "full-time",
      description: "Architected RESTful APIs using Spring MVC and Spring Security. Optimized database queries resulting in 40% performance improvement. Implemented OAuth2 JWT authentication and role-based authorization.",
      technologies: ["Spring Framework", "MySQL", "Docker", "Jenkins", "JUnit"]
    },
    {
      id: 3,
      company: "StartupHub",
      position: "Junior Java Developer",
      start_date: "2019-06-01",
      end_date: "2020-02-28", 
      type: "full-time",
      description: "Developed monolithic applications using Spring Boot. Collaborated on agile teams implementing SOLID principles and design patterns. Built responsive frontends with Thymeleaf and Bootstrap.",
      technologies: ["Spring Boot", "Thymeleaf", "Bootstrap", "Maven", "Git"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Experience Log
          </h2>
          <p className="text-xl text-gray-400 font-mono">
            Professional journey through enterprise software development
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600"></div>

          {sampleExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${
                index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-green-400/50"></div>

              <Card className="bg-gray-900/80 border-gray-700 hover:border-green-500/50 transition-all duration-300 ml-16 md:ml-0 md:max-w-lg group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-gray-400">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    {exp.current && (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        Current Role
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Date Range */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(exp.start_date), "MMM yyyy")} - {
                        exp.current ? "Present" : format(new Date(exp.end_date), "MMM yyyy")
                      }
                    </span>
                    <Badge variant="outline" className="ml-2 text-xs border-gray-600 text-gray-400">
                      {exp.type}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400 font-mono">Technologies & Frameworks:</div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies?.map((tech, i) => (
                        <Badge 
                          key={i}
                          variant="outline" 
                          className="text-xs border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technical Achievements */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "System Performance",
                metric: "99.9%",
                description: "Uptime achieved across microservices infrastructure",
                icon: Server
              },
              {
                title: "Code Quality",
                metric: "90%+",
                description: "Test coverage maintained across enterprise applications",
                icon: Code
              },
              {
                title: "Team Leadership",
                metric: "15+",
                description: "Developers mentored in Spring ecosystem best practices",
                icon: Building2
              }
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 border-gray-700 text-center p-6 hover:border-purple-500/50 transition-all duration-300">
                  <achievement.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{achievement.metric}</div>
                  <div className="text-purple-400 font-semibold mb-2">{achievement.title}</div>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

ContactTerminal
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, Send, CheckCircle } from "lucide-react";
import { SendEmail } from "@/integrations/Core";

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [terminalOutput, setTerminalOutput] = useState([
    "$ initializing contact_protocol...",
    "$ loading secure_communication_channel...",
    "$ ready for incoming_transmission"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTerminalOutput(prev => [...prev, `$ processing message from ${formData.name}...`]);
    
    try {
      await SendEmail({
        to: "john.doe@example.com",
        subject: `Portfolio Contact: ${formData.subject}`,
        body: `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      });
      
      setTerminalOutput(prev => [
        ...prev,
        "$ message_transmission: SUCCESS",
        "$ response_time: 0.23ms",
        "$ connection established with john.doe@dev",
        "$ await response..."
      ]);
      setIsSubmitted(true);
    } catch (error) {
      setTerminalOutput(prev => [
        ...prev,
        "$ ERROR: transmission_failed",
        "$ retrying connection..."
      ]);
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Initialize Contact
          </h2>
          <p className="text-xl text-gray-400 font-mono">
            $ ./contact_developer --message="your_project_idea"
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/80 border-green-500/30 glow-border">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white font-mono">
                    contact_form.execute()
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-400 font-mono text-sm mb-2">
                        var fullName =
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-black border-gray-600 text-white focus:border-green-500 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-400 font-mono text-sm mb-2">
                        var emailAddress =
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@domain.com"
                        className="bg-black border-gray-600 text-white focus:border-green-500 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      var projectSubject =
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Web Development | API Integration | Consulting"
                      className="bg-black border-gray-600 text-white focus:border-green-500 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      var messageBody = """
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe your project requirements, technical challenges, or collaboration opportunities..."
                      rows={6}
                      className="bg-black border-gray-600 text-white focus:border-green-500 resize-none font-mono"
                      required
                    />
                    <div className="text-green-400 font-mono text-sm mt-1">""";</div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 font-mono text-lg py-6"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Message Transmitted
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        transmitMessage()
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terminal Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black border-green-500/30 h-full">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-auto text-gray-400 font-mono text-sm">terminal.log</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 font-mono">
                <div className="space-y-2">
                  {terminalOutput.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.5 }}
                      className="text-green-400 text-sm"
                    >
                      {line}
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-green-400"
                  />
                </div>

                <div className="mt-8 p-4 bg-gray-800/50 rounded border border-gray-700">
                  <div className="text-cyan-400 text-sm mb-2">// Available for collaboration:</div>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>• Enterprise Java Development</div>
                    <div>• Microservices Architecture Design</div>
                    <div>• Cloud Infrastructure & DevOps</div>
                    <div>• Performance Optimization</div>
                    <div>• Technical Consulting & Code Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex gap-8 bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            {[
              { label: "Email", value: "john.doe@dev.com", icon: "📧" },
              { label: "Response Time", value: "< 24 hours", icon: "⚡" },
              { label: "Timezone", value: "UTC-5 (EST)", icon: "🌍" }
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-gray-400 text-sm font-mono">{item.label}</div>
                <div className="text-white font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

NavigationDock
import React from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Code2, Mail } from "lucide-react";

export default function NavigationDock({ activeSection, onSectionClick }) {
  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "skills", icon: Code2, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "experience", icon: User, label: "Experience" },
    { id: "contact", icon: Mail, label: "Contact" }
  ];

  return (
    <motion.nav 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-2xl p-2 shadow-2xl">
        <div className="flex gap-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                activeSection === item.id
                  ? "bg-green-500 text-black"
                  : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
              }`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -10 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded border border-green-500/30 whitespace-nowrap"
              >
                {item.label}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

//Entities
Project
{
    "name": "Project",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Project title"
      },
      "description": {
        "type": "string",
        "description": "Detailed project description"
      },
      "tech_stack": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Technologies used"
      },
      "github_url": {
        "type": "string",
        "description": "GitHub repository URL"
      },
      "live_url": {
        "type": "string",
        "description": "Live deployment URL"
      },
      "image_url": {
        "type": "string",
        "description": "Project preview image"
      },
      "status": {
        "type": "string",
        "enum": [
          "production",
          "development",
          "archived"
        ],
        "default": "production"
      },
      "complexity": {
        "type": "string",
        "enum": [
          "beginner",
          "intermediate",
          "advanced",
          "enterprise"
        ],
        "default": "intermediate"
      }
    },
    "required": [
      "title",
      "description"
    ]
  }

  Experience
  {
    "name": "Experience",
    "type": "object",
    "properties": {
      "company": {
        "type": "string",
        "description": "Company name"
      },
      "position": {
        "type": "string",
        "description": "Job position/title"
      },
      "start_date": {
        "type": "string",
        "format": "date"
      },
      "end_date": {
        "type": "string",
        "format": "date"
      },
      "current": {
        "type": "boolean",
        "default": false,
        "description": "Currently working here"
      },
      "description": {
        "type": "string",
        "description": "Role description and achievements"
      },
      "technologies": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Technologies used in this role"
      },
      "type": {
        "type": "string",
        "enum": [
          "full-time",
          "part-time",
          "contract",
          "internship"
        ],
        "default": "full-time"
      }
    },
    "required": [
      "company",
      "position",
      "start_date"
    ]
  }

  Layout.js
  import React from "react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        :root {
          --neon-green: #00ff88;
          --neon-blue: #0088ff;
          --dark-bg: #0a0a0a;
          --darker-bg: #050505;
          --accent-gray: #1a1a1a;
        }
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px var(--neon-green); }
          50% { box-shadow: 0 0 40px var(--neon-green), 0 0 60px var(--neon-green); }
        }
        
        @keyframes code-typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .matrix-bg::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 136, 0.02) 50%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }
        
        .glow-border {
          border: 1px solid var(--neon-green);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .cyber-grid {
          background-image: 
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      <div className="matrix-bg relative z-10">
        {children}
      </div>
    </div>
  );
}









