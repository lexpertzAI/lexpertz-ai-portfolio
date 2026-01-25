"use client";

import { motion } from "framer-motion";
import { Database, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-900/50 bg-cyan-950/10 text-cyan-400 text-xs md:text-sm font-medium mb-6">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
    </span>
    {children}
  </div>
);

export const ServiceCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
  >
    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-cyan-400 w-5 h-5" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

// --- Sections ---

export const Hero = () => (
  <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pt-20">
    <div className="absolute top-0 z-[-1] w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(6,182,212,0.15),transparent_50%)]" />
    
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Badge>Lexpertz AI • Architecture v2.0</Badge>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
        Innovate. Create. <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Excel Intelligently.
        </span>
      </h1>
      
      <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
        We architect Enterprise RAG Pipelines and Edge AI solutions that turn data into decision-making power.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition flex items-center justify-center gap-2">
          Start Automation <ArrowRight size={18} />
        </button>
        <button className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition">
          View Solutions
        </button>
      </div>
    </motion.div>
  </section>
);

export const ServicesGrid = () => (
  <section className="max-w-6xl mx-auto px-4 py-20">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ServiceCard 
        icon={Database}
        title="Enterprise RAG"
        desc="Secure knowledge pipelines that turn your company data into an interactive, hallucination-free AI brain."
      />
      <ServiceCard 
        icon={ShieldCheck}
        title="Logic Auditing"
        desc="Rigorous evaluation frameworks to ensure your AI models remain compliant, accurate, and safe."
      />
      <ServiceCard 
        icon={Cpu}
        title="Edge AI"
        desc="High-performance models optimized for mobile and local devices, reducing cloud costs and latency."
      />
    </div>
  </section>
);
