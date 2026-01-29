"use client";

import { motion } from "framer-motion";
import { Database, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// --- Nano-Tech Background Engine ---

const NanoGrid = () => {
  const [beams, setBeams] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random vertical "data beams"
    const newBeams = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 100), // Random % position
      delay: Math.random() * 5, // Random delay
    }));
    setBeams(newBeams);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 1. The Base Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #18181b 1px, transparent 1px),
                            linear-gradient(to bottom, #18181b 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      {/* 2. The Moving Data Beams (Nano Tech Effect) */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-0 w-[1px] h-40 bg-gradient-to-b from-transparent via-brand-cyan to-transparent z-0 opacity-50"
          style={{ left: `${beam.x}%` }}
          animate={{
            y: ["-100%", "500%"], // Moves from top to bottom
            opacity: [0, 1, 0],   // Fades in and out
          }}
          transition={{
            duration: 3 + Math.random() * 2, // Random speed
            repeat: Infinity,
            delay: beam.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* 3. The Central Glow (Atmosphere) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

// --- Components ---

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-900/50 bg-cyan-950/10 text-brand-cyan text-xs md:text-sm font-medium mb-6 backdrop-blur-md">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
    </span>
    {children}
  </div>
);

export const ServiceCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl border border-white/10 bg-brand-black/50 backdrop-blur-sm hover:bg-white/5 hover:border-brand-cyan/30 transition-all duration-300 group z-10"
  >
    <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-brand-cyan w-5 h-5" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

// --- Sections ---

export const Hero = () => (
  <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 pt-20 overflow-hidden">
    {/* Activate Nano Grid */}
    <NanoGrid />
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <Badge>Lexpertz AI • Architecture v2.0</Badge>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
        Innovate. Create. <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-brand-gradient">
          Excel Intelligently.
        </span>
      </h1>
      
      <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        We architect Enterprise RAG Pipelines and Edge AI solutions that turn data into decision-making power.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/#contact"
          className="px-8 py-3.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-black font-bold transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
        >
          Start Automation <ArrowRight size={18} />
        </Link>
        <Link 
          href="/#solutions"
          className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition backdrop-blur-md"
        >
          View Solutions
        </Link>
      </div>
    </motion.div>
  </section>
);

export const ServicesGrid = () => (
  <section className="max-w-6xl mx-auto px-4 py-20 relative z-10" id="services">
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
