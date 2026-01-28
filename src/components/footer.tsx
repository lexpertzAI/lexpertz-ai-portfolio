import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="inline-block relative h-16 w-64">
             <Image 
               src="/logo-full.png" 
               alt="Lexpertz AI" 
               fill
               className="object-contain object-left"
             />
          </Link>
          <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
            Revolutionizing business through Enterprise RAG, Logic Evaluation, and 
            high-performance AI pipelines. Verified expertise, modernized solutions.
          </p>
          <div className="flex gap-4">
            <Link href="https://x.com/Lexpertz_tech" className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition">
              <Linkedin size={18} />
            </Link>
            <Link href="https://github.com/lexpertzAI" className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition">
              <Github size={18} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Capabilities</h4>
          <ul className="space-y-4 text-sm text-zinc-500 font-medium">
            <li className="hover:text-white transition cursor-pointer">RAG Architectures</li>
            <li className="hover:text-white transition cursor-pointer">Logic Auditing</li>
            <li className="hover:text-white transition cursor-pointer">Edge AI Training</li>
          </ul>
        </div>

        {/* Legal/Contact */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm text-zinc-500 font-medium">
            <li className="hover:text-white transition cursor-pointer">About Us</li>
            <li className="hover:text-white transition cursor-pointer">Case Studies</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
              <Mail size={14} /> lexpertzai@cc.cc
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
        <p>© 2026 Lexpertz AI. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-zinc-400 cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-zinc-400 cursor-pointer transition">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
