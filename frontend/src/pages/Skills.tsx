import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  Mail,
  MessageCircle
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
  }, {} as Record<string, typeof skillsData>);

  const SkillCard = ({ skill, index }: { skill: typeof skillsData[0]; index: number }) => (
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

  const CategoryHeader = ({ category, skills }: { category: string; skills: typeof skillsData }) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons]?.icon || Code;
    const iconColor = categoryIcons[category as keyof typeof categoryIcons]?.color || "text-blue-400";
    
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

        {/* Skills Summary */}
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
    </div>
  );
}
