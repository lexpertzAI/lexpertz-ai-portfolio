"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, BrainCircuit, Workflow, Activity, TrendingUp } from "lucide-react";

export const FounderSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden" id="about">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-0 bg-brand-gradient rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-[500px] w-full bg-brand-black rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-end">
              <Image 
                src="/founder.jpg" 
                alt="Owadokun Tosin Tobi" 
                fill 
                className="object-cover opacity-90 group-hover:opacity-100 transition duration-500"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                <p className="text-white font-bold text-xl">Owadokun Tosin Tobi</p>
                <p className="text-brand-cyan text-xs uppercase tracking-widest mb-2">Senior AI Engineer</p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                   </span>
                   <span className="text-xs text-zinc-200">Building Agentic Systems</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-4 uppercase tracking-wider">
                <BrainCircuit size={14} /> Physics-Informed Intelligence
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Building Self-Healing <br />
                <span className="text-transparent bg-clip-text bg-brand-gradient">
                  Agentic Infrastructure.
                </span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed border-l-2 border-brand-cyan/20 pl-6">
                I am a Physics undergraduate turned AI Architect. I apply first-principles thinking to build <span className="text-white">deterministic AI pipelines</span>. From engineering <strong>autonomous content agents</strong> (NewsAgent Pro) to deploying <strong>physics-informed anomaly detection</strong> (Sentinel), I specialize in systems that reason, act, and self-correct.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-brand-cyan/30 transition group">
                <Workflow className="text-brand-cyan mb-2 group-hover:scale-110 transition" size={20} />
                <h4 className="text-white font-bold text-sm">Agentic Workflows</h4>
                <p className="text-zinc-500 text-xs mt-1">LangGraph, Llama 3.3, Tavily API</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-brand-cyan/30 transition group">
                <Activity className="text-brand-blue mb-2 group-hover:scale-110 transition" size={20} />
                <h4 className="text-white font-bold text-sm">MLOps & Vision</h4>
                <p className="text-zinc-500 text-xs mt-1">Docker, FastAPI, ResNet-Style CNNs</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-brand-cyan/30 transition group">
                <TrendingUp className="text-emerald-500 mb-2 group-hover:scale-110 transition" size={20} />
                <h4 className="text-white font-bold text-sm">Quant Analysis</h4>
                <p className="text-zinc-500 text-xs mt-1">XGBoost, Pandas, Alpha Gen</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-brand-cyan/30 transition group">
                <BrainCircuit className="text-brand-cyan mb-2 group-hover:scale-110 transition" size={20} />
                <h4 className="text-white font-bold text-sm">Deep Learning</h4>
                <p className="text-zinc-500 text-xs mt-1">PyTorch, Transformers, SASRec</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="https://github.com/eatosin" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-brand-cyan transition"
              >
                <Github size={18} /> GitHub
              </Link>
              <Link 
                href="https://www.linkedin.com/in/owadokun-tosin-tobi-6159091a3" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition"
              >
                <Linkedin size={18} /> LinkedIn
              </Link>
              <Link 
                href="https://x.com/TosinOwadokun" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition"
              >
                <Twitter size={18} /> X
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
