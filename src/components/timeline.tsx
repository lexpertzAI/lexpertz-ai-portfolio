"use client";

import { motion } from "framer-motion";
import { GraduationCap, Rocket, Lightbulb, TrendingUp } from "lucide-react";

const MILESTONES = [
  {
    year: "2018",
    title: "The Foundation",
    description: "Launched Lexpertz Technologies. Focused on the digital frontier—SEO, Marketing, and Web Architecture. The 'Passive Learning' phase where the seed of entrepreneurship was planted.",
    icon: Rocket,
    color: "bg-blue-500",
  },
  {
    year: "2023",
    title: "The Catalyst: 2 Weeks to 3 Days",
    description: "The pivotal 'Aha!' moment. Facing a complex Physics concept in solid state physics and quantum mechanics that traditionally required 14 days of study, I used Generative AI to deconstruct and master it in just 72 hours. The power of AI as a force multiplier became undeniable.",
    icon: Lightbulb,
    color: "bg-cyan-500",
  },
  {
    year: "2024",
    title: "The Strategic Pivot",
    description: "Shifted focus from general tech to deep AI Engineering. Began architecting Enterprise RAG pipelines and decision-making systems. Transitioned from using tools to building intelligence.",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    year: "2025",
    title: "Lexpertz AI: The Visionary Phase",
    description: "The evolution is complete. Architecting SOTA (State-Of-The-Art) Agentic workflows for forward-thinking organizations. Waking up the 'sleeping entrepreneur' through intelligent automation.",
    icon: GraduationCap,
    color: "bg-emerald-500",
  },
];

export const TimelineSection = () => {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden" id="about">
      {/* Background Etymology Decoration */}
      <div className="absolute top-10 right-10 text-zinc-900 font-bold text-9xl opacity-20 pointer-events-none select-none">
        L'EXPERT
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-cyan-500">Evolution</span> Journey
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            From digital marketing to Physics-informed AI architecture. 
            A timeline of intelligent growth.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-px h-full bg-zinc-800" />

          <div className="space-y-16">
            {MILESTONES.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Desktop Empty Space for alignment */}
                <div className="hidden md:block w-5/12" />

                {/* The glowing dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center border-4 border-black shadow-[0_0_15px_rgba(6,182,212,0.5)]`}>
                    <item.icon className="text-black w-5 h-5" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-5/12 ml-12 md:ml-0 bg-zinc-900/50 border border-white/5 p-8 rounded-2xl hover:border-cyan-500/30 transition-all group">
                  <span className="text-cyan-500 font-mono font-bold text-xl mb-2 block tracking-widest">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
