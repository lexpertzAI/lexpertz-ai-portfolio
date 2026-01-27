"use client";

import { motion } from "framer-motion";

const STACK_AI = [
  "Python", "PyTorch", "LangGraph", "Llama 3.3", "OpenAI API", 
  "Hugging Face", "XGBoost", "Pandas", "NumPy", "Scikit-learn", 
  "Flux.1", "Tavily API", "Gemini 2.5"
];

const STACK_OPS = [
  "Next.js 14", "TypeScript", "FastAPI", "Docker", "Supabase", 
  "Vercel Edge", "Tailwind CSS", "PostgreSQL", "Git", "GitHub Actions", 
  "Framer Motion", "Shadcn UI", "REST APIs"
];

const MarqueeRow = ({ items, direction = "left", speed = 20 }: { items: string[], direction?: "left" | "right", speed?: number }) => {
  return (
    <div className="flex overflow-hidden relative z-10">
      <motion.div 
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        className="flex gap-8 py-4 flex-shrink-0 pr-8"
      >
        {/* Double the list to ensure seamless looping */}
        {[...items, ...items].map((item, idx) => (
          <div 
            key={`${item}-${idx}`} 
            className="flex items-center justify-center px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm whitespace-nowrap"
          >
            <span className="text-zinc-300 font-mono font-bold text-sm md:text-base">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const TechStack = () => {
  return (
    <section className="py-24 bg-brand-black relative overflow-hidden border-t border-white/5">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The <span className="text-cyan-500">Engine Room</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Built on a foundation of rigorous physics and modern software architecture.
          We don't just use tools; we orchestrate them.
        </p>
      </div>

      <div className="space-y-8 relative">
        {/* Side Gradients for Fade Effect */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-brand-black to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-brand-black to-transparent z-20 pointer-events-none" />

        {/* Row 1: AI & Data (Slow, Left) */}
        <MarqueeRow items={STACK_AI} direction="left" speed={40} />

        {/* Row 2: Ops & Web (Slightly Faster, Right) */}
        <MarqueeRow items={STACK_OPS} direction="right" speed={35} />
      </div>
    </section>
  );
};
