"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Search, Zap, FileText, ArrowRight, XCircle, CheckCircle2, Lock, Scale } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// --- Internal Components ---

const ComparisonDemo = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto mt-20">
      
      {/* LEFT: Standard RAG */}
      <div className="p-8 rounded-2xl border border-red-500/20 bg-red-950/5 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-6 text-red-400">
          <XCircle size={20} />
          <h3 className="font-bold uppercase tracking-widest text-sm">Standard RAG</h3>
        </div>
        <div className="space-y-4 font-mono text-sm text-zinc-400">
          <p className="text-zinc-600">// User Query: "What is the Q3 profit?"</p>
          <div className="p-4 bg-black/50 rounded-lg border border-red-500/10">
            <p className="text-white">"Based on the documents, the Q3 profit was $12.5M."</p>
          </div>
          <div className="flex items-center gap-2 text-red-400 text-xs">
            <span>⚠ Source: Hallucination (Real value was $10.5M)</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Axiom Engine */}
      <div className="p-8 rounded-2xl border border-brand-cyan/30 bg-brand-cyan/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient animate-pulse" />
        
        <div className="flex items-center gap-2 mb-6 text-brand-cyan">
          <ShieldCheck size={20} />
          <h3 className="font-bold uppercase tracking-widest text-sm">Axiom Engine</h3>
        </div>
        
        <div className="space-y-4 font-mono text-sm text-zinc-400">
          <p className="text-zinc-600">// User Query: "What is the Q3 profit?"</p>
          
          <div className="p-4 bg-black/50 rounded-lg border border-brand-cyan/20 relative">
            {step === 0 && <span className="text-brand-cyan animate-pulse">Scanning Vector DB (Qdrant)...</span>}
            {step === 1 && <span className="text-yellow-400">Critic Agent: Verifying Claims...</span>}
            {step === 2 && <span className="text-brand-blue">Mapping Source Coordinates...</span>}
            {step === 3 && (
              <p className="text-white">
                "The Q3 profit was <span className="text-emerald-400 font-bold">$10.5M</span>."
                <br />
                <span className="text-brand-cyan text-xs mt-2 block">[Source: Financial_Report_2025.pdf, Page 4, Row 12]</span>
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-brand-cyan text-xs">
             <CheckCircle2 size={12} /> <span>Confidence Score: 99.8% (Verified)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function AxiomVerifyPage() {
  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-cyan/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-6">
               <Lock size={12} /> Private Beta v1.0
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
              Trust is a <br />
              <span className="text-transparent bg-clip-text bg-brand-gradient">Mathematical Function.</span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Standard AI guesses. <strong>Axiom-Verify</strong> proves. <br />
              The world's first Evidence-Gated Agentic Engine for regulated industries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/#contact">
                <button className="px-10 py-4 bg-brand-cyan text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition flex items-center justify-center gap-2">
                  Request Access <ArrowRight size={18} />
                </button>
              </Link>
              <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white font-medium">
                Read Whitepaper
              </button>
            </div>
          </motion.div>

          <ComparisonDemo />
        </div>
      </section>

      {/* 2. ARCHITECTURE DEEP DIVE */}
      <section className="py-24 px-6 border-y border-white/5 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:flex justify-between items-end">
             <h2 className="text-3xl md:text-4xl font-bold text-white">
                The <span className="text-brand-cyan">Verification Loop.</span>
             </h2>
             <p className="text-zinc-400 max-w-lg mt-4 md:mt-0">
                We replaced "Temperature: 0.7" creativity with physics-informed outlier detection logic.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="p-8 bg-brand-black border border-white/10 rounded-2xl hover:border-brand-cyan/40 transition group">
                <div className="h-12 w-12 bg-brand-cyan/10 rounded-lg flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 transition">
                   <Search size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Hybrid Retrieval</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                   We don't just rely on vector similarity. We combine <span className="text-white">Dense Embeddings</span> (Semantic) with <span className="text-white">BM25</span> (Keyword) logic to catch exact-match financial/legal terms.
                </p>
             </div>

             {/* Card 2 */}
             <div className="p-8 bg-brand-black border border-white/10 rounded-2xl hover:border-brand-cyan/40 transition group">
                <div className="h-12 w-12 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition">
                   <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Adversarial Critic</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                   Before the user sees a word, a secondary "Prosecutor Agent" audits the draft. If a claim lacks a coordinate, it is rejected.
                </p>
             </div>

             {/* Card 3 - FIX APPLIED HERE */}
             <div className="p-8 bg-brand-black border border-white/10 rounded-2xl hover:border-brand-cyan/40 transition group">
                <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition">
                   <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Z-Score Gating</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                   Physics-informed thresholds. If the generation probability drifts &gt;2.5σ from the source material context, the system halts.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. CTA FOOTER */}
      <section className="py-32 px-6 text-center">
         <h2 className="text-4xl font-bold text-white mb-8">
            Stop Guessing. <br /> Start <span className="text-brand-cyan">Verifying.</span>
         </h2>
         <Link href="/#contact">
            <button className="px-12 py-5 bg-white text-black font-bold rounded-xl hover:bg-brand-cyan transition text-lg">
               Deploy Axiom Pipeline
            </button>
         </Link>
      </section>

    </main>
  );
}
