import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Database, Server, Github, Linkedin, Mail, Home, User, Briefcase, Calendar, Building2, ExternalLink, Send } from "lucide-react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const skills = [
    { name: "Spring Boot", level: 95, icon: "🚀" },
    { name: "Java 21", level: 90, icon: "☕" },
    { name: "React.js", level: 88, icon: "⚛️" },
    { name: "Docker", level: 90, icon: "🐳" },
    { name: "PostgreSQL", level: 92, icon: "🐘" },
    { name: "AWS/GCP", level: 88, icon: "☁️" }
  ];

  const projects = [
    {
      title: "Enterprise E-commerce Platform",
      description: "Scalable microservices architecture with Spring Cloud, handling 100K+ concurrent users",
      tech: ["Spring Boot", "PostgreSQL", "Redis", "Docker", "Kubernetes", "React"],
      github: "https://github.com/meenak95/ecommerce",
      demo: "https://ecommerce-demo.com"
    },
    {
      title: "Real-time Trading Algorithm",
      description: "High-frequency trading system using WebSockets, Event Sourcing, and CQRS patterns",
      tech: ["Spring WebFlux", "Apache Kafka", "MongoDB", "WebSockets"],
      github: "https://github.com/meenak95/trading-algo"
    },
    {
      title: "DevOps Automation Suite",
      description: "CI/CD pipeline automation with Infrastructure as Code and monitoring dashboards",
      tech: ["Jenkins", "Terraform", "AWS", "Grafana", "Prometheus"],
      github: "https://github.com/meenak95/devops-suite"
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-2xl p-2 shadow-2xl">
          <div className="flex gap-2">
            {[
              { id: "hero", icon: Home, label: "Home" },
              { id: "skills", icon: Code2, label: "Skills" },
              { id: "projects", icon: Briefcase, label: "Projects" },
              { id: "experience", icon: User, label: "Experience" },
              { id: "contact", icon: Mail, label: "Contact" }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative p-3 rounded-xl transition-all duration-300 group ${
                  activeSection === item.id
                    ? "bg-green-500 text-black"
                    : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
              <motion.span
                key={currentCode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-2"
              >
                {roles[currentCode % roles.length]}
              </motion.span>
            </div>

            {/* Code Terminal */}
            <motion.div 
              className="bg-black/80 rounded-lg border border-green-500/30 p-6 mb-8 font-mono text-left max-w-2xl mx-auto mt-8"
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
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-700 hover:border-green-500/50 transition-all duration-300 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-900/80 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded border border-gray-600">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 hover:text-green-400 rounded text-sm transition-colors">
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 hover:text-blue-400 rounded text-sm transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
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

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                company: "TechCorp Solutions",
                position: "Senior Full Stack Java Developer",
                period: "2022 - Present",
                description: "Leading development of cloud-native microservices architecture serving 1M+ users.",
                tech: ["Spring Boot", "Kubernetes", "PostgreSQL", "Apache Kafka", "React", "AWS"]
              },
              {
                company: "InnovateLabs Inc",
                position: "Java Backend Engineer", 
                period: "2020 - 2021",
                description: "Architected RESTful APIs using Spring MVC. Optimized database queries resulting in 40% performance improvement.",
                tech: ["Spring Framework", "MySQL", "Docker", "Jenkins", "JUnit"]
              }
            ].map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/80 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-400">
                      <Building2 className="w-4 h-4" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                  </div>
                  <span className="text-green-400 font-mono text-sm">{exp.period}</span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800 text-blue-400 text-xs rounded border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
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

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white font-mono">contact_form.execute()</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">var emailAddress =</label>
                    <div className="bg-black border border-gray-600 rounded px-3 py-2 text-white font-mono">
                      meena.davin@dev.com
                    </div>
                  </div>
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">var responseTime =</label>
                    <div className="bg-black border border-gray-600 rounded px-3 py-2 text-white font-mono">
                      &lt; 24 hours
                    </div>
                  </div>
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">var availability =</label>
                    <div className="bg-black border border-gray-600 rounded px-3 py-2 text-white font-mono">
                      Open for opportunities
                    </div>
                  </div>
                </div>
                
                <div className="bg-black border border-gray-700 rounded p-4">
                  <div className="text-cyan-400 text-sm mb-2">// Available for collaboration:</div>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>• Enterprise Java Development</div>
                    <div>• Microservices Architecture Design</div>
                    <div>• Cloud Infrastructure & DevOps</div>
                    <div>• Performance Optimization</div>
                    <div>• Technical Consulting & Code Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}