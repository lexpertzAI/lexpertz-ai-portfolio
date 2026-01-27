"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Updated links with "/" to ensure they work from any page
const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Solutions", href: "/#solutions" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Mobile: Show Icon Only */}
          <div className="md:hidden relative h-10 w-10">
            <Image 
              src="/logo-icon.png" 
              alt="Lexpertz AI Icon" 
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop: Show Full Wordmark */}
          <div className="hidden md:block relative h-8 w-40">
            <Image 
              src="/logo-full.png" 
              alt="Lexpertz AI Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Linked Contact Button */}
          <Link href="/#contact">
            <button className="bg-white text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-cyan-400 transition-all flex items-center gap-2">
              Contact <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-zinc-400" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-brand-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden backdrop-blur-2xl h-screen"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-zinc-300"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Contact Button */}
            <Link href="/#contact" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-cyan-500 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2">
                Start Project <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
