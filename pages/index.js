import React, { useEffect, useRef, useState } from "react";
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
  Send,
  MessageCircle,
  Briefcase,
  User,
  Target,
  Lightbulb,
  Users,
  Server,
  Wrench,
  TestTube,
  Linkedin,
  TrendingUp,
} from "lucide-react";

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
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
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
    { name: "Kubernetes", icon: <Server className="w-6 h-6" />, color: "bg-purple-500" },
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

  const skillsData = [
    { id: 1, name: "Java", category: "programming", proficiency: 95, years_experience: 9, description: "Core Java, Java 21, J2EE" },
    { id: 2, name: "Spring Boot", category: "backend", proficiency: 92, years_experience: 7, description: "Microservices, Security, Data JPA" },
    { id: 3, name: "Angular", category: "frontend", proficiency: 88, years_experience: 5, description: "Angular 18, RxJS, NgRx" },
    { id: 4, name: "AWS", category: "cloud", proficiency: 85, years_experience: 4, description: "EC2, S3, Lambda, ECS" },
    { id: 5, name: "PostgreSQL", category: "database", proficiency: 90, years_experience: 6, description: "Design, optimization, queries" },
    { id: 6, name: "Docker", category: "devops", proficiency: 87, years_experience: 5, description: "Containerization, compose" },
    { id: 7, name: "Kubernetes", category: "devops", proficiency: 82, years_experience: 3, description: "Orchestration, Helm" },
    { id: 8, name: "Apache Kafka", category: "backend", proficiency: 85, years_experience: 4, description: "Event streaming, Streams" },
    { id: 9, name: "React", category: "frontend", proficiency: 80, years_experience: 3, description: "Hooks, Context" },
    { id: 10, name: "Jenkins", category: "devops", proficiency: 85, years_experience: 5, description: "CI/CD pipelines" },
    { id: 11, name: "MongoDB", category: "database", proficiency: 75, years_experience: 3, description: "Aggregation, modeling" },
    { id: 12, name: "JUnit", category: "testing", proficiency: 90, years_experience: 7, description: "TDD, Mockito" },
    { id: 13, name: "Python", category: "programming", proficiency: 70, years_experience: 2, description: "Scripting, APIs" },
    { id: 14, name: "Terraform", category: "devops", proficiency: 75, years_experience: 2, description: "IaC, provisioning" },
    { id: 15, name: "Redis", category: "database", proficiency: 80, years_experience: 4, description: "Caching, pub/sub" },
  ];

  const projectsData = [
    {
      id: 1,
      title: "Vehicle-Related Licensing System 2.0 (VRLS)",
      company: "NCS, Singapore",
      role: "Lead Software Engineer",
      duration: "Dec 2021 - Present",
      category: "government",
      description:
        "Modernized VRLS 2.0 using microservices with Spring Boot and Angular on AWS GovCloud for high availability and security.",
      technologies: [
        "Spring Boot",
        "Angular 13",
        "AWS ECS",
        "PostgreSQL",
        "Redis",
        "Kafka",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitHub Actions",
        "Prometheus",
        "Grafana",
      ],
      highlights: [
        "Led modernization serving entire Singapore population",
        "Architected microservices reducing downtime by 99.9%",
        "Implemented Kafka event-driven processing",
      ],
    },
    {
      id: 2,
      title: "Promo Power Solution",
      company: "BlackStraw.AI",
      role: "Senior Software Engineer",
      duration: "May 2021 - Nov 2021",
      category: "ai",
      description:
        "Automated promotion optimization for retailers, improving efficiency and forecasting sales.",
      technologies: [
        "Java",
        "Spring Boot",
        "Groovy",
        "Kafka",
        "AWS Lambda",
        "PostgreSQL",
        "REST APIs",
        "Jenkins",
        "SonarQube",
      ],
      highlights: [
        "Developed optimization algorithms",
        "Serverless architecture cutting costs by 40%",
        "Real-time analytics dashboard",
      ],
    },
    {
      id: 3,
      title: "HDB Resale Portal",
      company: "HDB (via AllTech Systems)",
      role: "Software Engineer",
      duration: "Aug 2019 - Dec 2020",
      category: "real-estate",
      description:
        "Resale portal simplifying guided journeys, eligibility checks, and multi-level approvals.",
      technologies: ["Java", "JSF", "PrimeFaces", "Oracle DB", "WebLogic", "SOAP", "SVN"],
      highlights: [
        "Streamlined 50k+ annual transactions",
        "Implemented complex eligibility logic",
        "Reduced processing time from weeks to days",
      ],
    },
  ];

  const filteredSkills =
    activeSkillCategory === "all" ? skillsData : skillsData.filter((skill) => skill.category === activeSkillCategory);
  const filteredProjects =
    activeProjectCategory === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeProjectCategory);

  const categoryColors = {
    government: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    fintech: "bg-green-500/20 text-green-400 border-green-500/30",
    ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "real-estate": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  const Counter = ({ to }) => {
    const ref = useRef();
    const [count, setCount] = useState(0);

    useEffect(() => {
      const node = ref.current;
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

    return (
      <span ref={ref}>
        {count}
        {to.includes("+") ? "+" : ""}
      </span>
    );
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
              style={{
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              <Cloud className="w-8 h-8 text-slate-700" />
            </div>
          ))}
        </div>
      </div>

      <a
        href="#contact"
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group animate-bounce-subtle"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
      </a>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-7xl mx-auto text-center z-10">
          <div className="mb-12 opacity-0 translate-y-8 animate-fade-in-up">
            <span className="inline-flex items-center mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 px-6 py-2 text-lg rounded-xl animate-glow">
              <Sparkles className="w-5 h-5 mr-2 animate-spin-slow" />
              Lead Software Engineer
            </span>
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
                <div
                  key={tech.name}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-140px) rotate(-${index * 60}deg)`,
                  }}
                >
                  <div
                    className={`group relative p-4 rounded-2xl ${tech.color}/20 border ${tech.color}/30 backdrop-blur-sm hover:scale-125 transition-all duration-500 cursor-pointer animate-float-gentle`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className={`p-2 rounded-xl ${tech.color}/30 group-hover:animate-spin`}>{tech.icon}</div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 px-3 py-1 rounded-full text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {tech.name}
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 ${tech.color} rounded-full animate-particle-explosion`}
                          style={{ left: "50%", top: "50%", animationDelay: `${i * 0.1}s`, transform: `rotate(${i * 60}deg)` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                <Cpu className="w-12 h-12 text-white animate-icon-glow" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-8 animate-fade-in-up delay-500">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 inline-flex items-center">
              <Briefcase className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Explore My Work
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              className="border-2 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 hover:text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
              onClick={() => window.open("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b53a59450b409515631d30/bd0a6ee13_Meena_Kannan_Java_Agile_Cloud_DevSecOps.pdf", "_blank")}
            >
              <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Download Resume
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-scroll-indicator"></div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-400 rotate-90 animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center mb-6 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl px-4 py-2 animate-glow">
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Milestones
            </span>
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
                <div className={`mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300 ease-in-out">
                  <Counter to={stat.number} />
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={skillsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center mb-6 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl px-4 py-2 animate-glow">
              <Code className="w-4 h-4 mr-2" />
              Technical Expertise
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent bg-300%">
              Skills & Technologies
            </h2>
          </div>

          <div className="mb-12 grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
            <button
              onClick={() => setActiveSkillCategory("all")}
              className={`rounded-xl px-3 py-2 transition-all duration-300 ${
                activeSkillCategory === "all" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "text-slate-300"
              }`}
            >
              All
            </button>
            {Object.keys(categoryIcons).map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`rounded-xl px-3 py-2 capitalize transition-all duration-300 ${
                  activeSkillCategory === category ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.id}
                className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden rounded-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                    <span className="inline-flex items-center px-2 py-1 text-xs rounded border text-slate-300 border-slate-600 bg-slate-700/50">{skill.years_experience}y</span>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-400 mb-3">
                      <span>Proficiency</span>
                      <span className="font-bold text-white">{skill.proficiency}%</span>
                    </div>
                    <div className="relative">
                      <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-shimmer"></div>
                    </div>
                  </div>
                  {skill.description && (
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{skill.description}</p>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center mb-6 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl px-4 py-2 animate-glow">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Projects
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-300%">
              Featured Work
            </h2>
          </div>

          <div className="mb-12 grid w-full grid-cols-5 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
            {[
              { value: "all", label: "All Projects" },
              { value: "government", label: "Government" },
              { value: "fintech", label: "FinTech" },
              { value: "ai", label: "AI/ML" },
              { value: "real-estate", label: "Real Estate" },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveProjectCategory(t.value)}
                className={`rounded-xl px-3 py-2 transition-all duration-300 ${
                  activeProjectCategory === t.value ? "bg-gradient-to-r from-green-500 to-blue-600 text-white" : "text-slate-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative rounded-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl text-white group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
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
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded border ${categoryColors[project.category]}`}>{project.category}</span>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0 relative z-10">
                  <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">{project.description}</p>
                  {project.highlights && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <Target className="w-4 h-4 text-green-400 mr-2" /> Key Achievements:
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
                        <Code className="w-4 h-4 text-blue-400 mr-2" /> Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-slate-700/50 text-slate-300 border border-slate-600 rounded"
                            style={{ animationDelay: `${techIndex * 0.1}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-2 py-1 text-slate-400 border border-slate-600 rounded">+{project.technologies.length - 6} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${
                    project.category === "government"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : project.category === "fintech"
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : project.category === "ai"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600"
                      : "bg-gradient-to-r from-orange-500 to-orange-600"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-transparent to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl px-4 py-2 animate-glow">
              <User className="w-4 h-4 mr-2" /> About Me
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-300%">
              Passion Meets Excellence
            </h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-8 space-y-6 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-8 h-8 text-blue-400 mr-3 animate-spin-slow" /> My Professional Journey
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                With 9+ years in software development, I've architected solutions serving millions across government, fintech, and AI. As a Lead Engineer at NCS Singapore, I drive mission-critical projects, blending technical expertise with a passion for mentoring.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Code, title: "Technical Excellence", color: "text-blue-400" },
                  { icon: Users, title: "Team Leadership", color: "text-green-400" },
                  { icon: Lightbulb, title: "Innovation", color: "text-purple-400" },
                  { icon: Target, title: "Results Driven", color: "text-cyan-400" },
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
            </div>

            <div className="lg:col-span-2 space-y-8">
              {[
                { title: "Professional Scrum Product Owner™ I", desc: "Product Strategy & Management", color: "yellow" },
                { title: "Professional Scrum Master™ I", desc: "Agile Leadership", color: "blue" },
                { title: "ICT Assessment Certification", desc: "NUS-ISS Singapore", color: "green" },
              ].map((cert, index) => (
                <TiltCard key={index} className="opacity-0 translate-y-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="group relative bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:bg-slate-800/50">
                    <div className={`absolute -top-1 -left-1 w-1/2 h-1/2 rounded-tl-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${cert.color}-500/50 to-transparent`}></div>
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

      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center mb-6 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl px-4 py-2 animate-glow">
            <MessageCircle className="w-4 h-4 mr-2" /> Let's Connect
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 animate-gradient-x bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-300%">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, and ways we can create amazing solutions together.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Mail, label: "Email", value: "meenakannan92@gmail.com", href: "mailto:meenakannan92@gmail.com" },
              { icon: Phone, label: "Phone", value: "+65 87373057", href: "tel:+6587373057" },
              { icon: MessageCircle, label: "WhatsApp", value: "+91 97893 02084", href: "https://wa.me/919789302084" },
              { icon: Building2, label: "Location", value: "Singapore", href: null },
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up rounded-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 text-center">
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
                </div>
              </div>
            ))}
          </div>

          <a href="#contact">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 inline-flex items-center">
              <Send className="w-6 h-6 mr-3 group-hover:animate-bounce" /> Get In Touch
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </a>
        </div>
      </section>

      <footer className="py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl relative">
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
              <p className="text-slate-400 text-sm leading-relaxed">
                Building scalable solutions with passion and precision. Let's create something amazing together.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  About
                </a>
                <a href="#skills" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Skills
                </a>
                <a href="#projects" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Projects
                </a>
                <a href="#contact" className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Contact
                </a>
              </div>
            </div>
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
                <a href="mailto:meenakannan92@gmail.com" className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-green-500/20 transition-all duration-300 group">
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
            <p className="text-slate-400 text-sm">© 2024 Meena Kannan. Crafted with passion and precision.</p>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(3rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
        @keyframes float-gentle { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-very-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); } 50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); } }
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes scroll-indicator { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(16px); opacity: 0; } }
        @keyframes cloud-float { 0% { transform: translateX(-100px); } 100% { transform: translateX(calc(100vw + 100px)); } }
        @keyframes particle-explosion { 0% { transform: rotate(var(--rotation)) translateY(0); opacity: 1; } 100% { transform: rotate(var(--rotation)) translateY(-30px); opacity: 0; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes twinkle { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 5px currentColor; } 50% { box-shadow: 0 0 20px currentColor; } }
        @keyframes icon-glow { 0%, 100% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7)); } 50% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px rgba(0, 255, 255, 0.6)); } }
        .bg-grid-pattern { background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 2rem 2rem; }
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
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
        .animate-in { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}