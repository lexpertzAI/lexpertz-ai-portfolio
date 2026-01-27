"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, ArrowRight, Send } from "lucide-react";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="contact">
      {/* Background Gradients */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Architect <br />
              <span className="text-cyan-500">Your Intelligence.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              Ready to move beyond basic automation? Whether you need an Enterprise RAG pipeline 
              or a self-healing agentic workflow, I'm ready to engineer the solution.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Email Direct</p>
                  <Link href="mailto:lexpertzai@cc.cc" className="text-white text-lg font-medium hover:text-cyan-400 transition">
                    lexpertzai@cc.cc
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-green-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">WhatsApp / Mobile</p>
                  <p className="text-white text-lg font-medium">+234 818 429 2599 / +234 807 722 8021</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Base of Operations</p>
                  <p className="text-white text-lg font-medium">Lagos, Nigeria (Global Remote)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Intake Form UI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm"
          >
            <form className="space-y-6" action="mailto:tosinowadokun11@gmail.com" method="post" encType="text/plain">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">First Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">Last Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-medium">Email Address</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition" placeholder="jane@company.com" />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-medium">Project Interest</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition">
                  <option>Enterprise RAG Pipeline</option>
                  <option>Agentic Workflow Automation</option>
                  <option>Logic Evaluation / Auditing</option>
                  <option>Custom AI Development</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-medium">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition" placeholder="Tell me about your project data and goals..." />
              </div>

              <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
