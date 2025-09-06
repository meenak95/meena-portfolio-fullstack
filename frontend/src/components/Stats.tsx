import React from "react";
import { Award, Code, Globe, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";

const Counter = ({ to }: { to: string }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
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

export default function Stats() {
  const stats = [
    { number: "9+", label: "Years Experience", icon: <Award className="w-8 h-8" />, color: "text-blue-400" },
    { number: "15+", label: "Technologies", icon: <Code className="w-8 h-8" />, color: "text-green-400" },
    { number: "50+", label: "Projects", icon: <Globe className="w-8 h-8" />, color: "text-purple-400" },
    { number: "3", label: "Certifications", icon: <Award className="w-8 h-8" />, color: "text-cyan-400" },
  ];

  return (
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
  );
}
