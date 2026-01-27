"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Zap, ShieldAlert, BarChart3, Radio } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    title: "NewsAgent Pro",
    category: "Autonomous Multi-Modal Agent",
    description: "Fully agentic workflow capable of researching, writing, and visualizing content in under 60 seconds. Features a self-correcting 'Critic Agent' loop.",
    metric: "60s End-to-End Creation",
    stack: ["LangGraph", "Llama 3.3", "Tavily API", "Flux.1"],
    icon: Zap,
    status: "Live Demo",
    link: "https://github.com/Eatosin/NewsAgent-Pro", // Replace with real link later
  },
  {
    title: "Sentinel",
    category: "MLOps & Anomaly Detection",
    description: "Real-time monitoring microservice using physics-informed Z-score thresholds (>2.5σ) to detect data drift. Integrated with Gemini 2.5 for RCA.",
    metric: "Self-Healing Workflows",
    stack: ["FastAPI", "Docker", "Gemini 2.5", "Render"],
    icon: ShieldAlert,
    status: "Live API",
    link: "https://github.com/Eatosin/Sentinel-MLOps",
  },
  {
    title: "PolyMind",
    category: "Quant Arbitrage Engine",
    description: "XGBoost classifier trained on 5,000 scenarios to predict trade fill probability. Avoids liquidity traps in hostile market environments.",
    metric: "+$18,211 Simulated PnL",
    stack: ["XGBoost", "Python", "Alpha Gen", "Pandas"],
    icon: BarChart3,
    status: "Research",
    link: "https://github.com/Eatosin/PolyMind-Crypto-Arbitrage",
  },
  {
    title: "Spectre",
    category: "Deepfake Audio Detection",
    description: "Physics-informed ResNet-style CNN that detects synthetic audio artifacts based on Mel-spectrogram analysis.",
    metric: "100% Detection Accuracy",
    stack: ["PyTorch", "ResNet", "Hugging Face", "Librosa"],
    icon: Radio,
    status: "HF Space",
    link: "https://github.com/Eatosin/Spectre-Deepfake-Detection",
  },
];

export const ProjectsSection = () => {
  return (
    <section className="py-24 px-6 bg-black" id="solutions">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:flex justify-between items-end">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Engineered <span className="text-cyan-500">Intelligence.</span>
            </h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              Deployment-ready AI architectures. From autonomous agents to high-frequency quant engines.
            </p>
          </div>
          <Link 
            href="https://github.com/eatosin" 
            className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-bold"
          >
            View all Repositories <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-cyan-500/50 hover:bg-zinc-900/80 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-lg bg-zinc-800/50 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
                  <project.icon size={24} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-400">
                  <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'Research' ? 'bg-purple-500' : 'bg-green-500 animate-pulse'}`} />
                  {project.status}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-500 font-mono mb-4">{project.category}</p>
              
              <p className="text-zinc-400 leading-relaxed mb-6 min-h-[80px]">
                {project.description}
              </p>

              {/* Key Metric Badge */}
              <div className="mb-6 inline-block bg-cyan-950/30 border border-cyan-900/50 px-4 py-2 rounded-lg">
                <p className="text-cyan-400 text-sm font-bold flex items-center gap-2">
                  <Zap size={14} /> {project.metric}
                </p>
              </div>

              {/* Tech Stack & Link */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <div className="flex gap-2 flex-wrap">
                  {project.stack.slice(0,3).map(tech => (
                    <span key={tech} className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={project.link} className="p-2 rounded-full hover:bg-white/10 text-white transition">
                  <ExternalLink size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="mt-8 md:hidden flex justify-center">
           <Link 
            href="https://github.com/eatosin" 
            className="flex items-center gap-2 text-cyan-400 font-bold"
          >
            View all Repositories <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};
