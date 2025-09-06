import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
  Mail,
  MessageCircle
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
            {/* Quick Facts */}
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

            {/* Download Resume */}
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

        {/* Personal Touch */}
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
