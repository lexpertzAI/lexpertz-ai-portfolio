"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, MessageSquare, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

// strictly typed interface to satisfy the build system
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  message: string;
  botcheck: boolean;
};

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Using the specific type definition here
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    
    // Your specific Web3Forms Access Key
    const object = {
      access_key: "7e0196dc-e3d1-4199-ac9d-b4f9145311ea", 
      ...data
    };
    
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        reset(); 
      }
    } catch (error) {
      console.error("Form Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="contact">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Architect <br />
              <span className="text-brand-cyan">Your Intelligence.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              Ready to move beyond basic automation? Whether you need an Enterprise RAG pipeline 
              or a self-healing agentic workflow, I'm ready to engineer the solution.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Email Direct</p>
                  <Link href="mailto:tosinowadokun11@gmail.com" className="text-white text-lg font-medium hover:text-brand-cyan transition">
                    tosinowadokun11@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">WhatsApp / Mobile</p>
                  <p className="text-white text-lg font-medium">+234 807 722 8021</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-blue">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Base of Operations</p>
                  <p className="text-white text-lg font-medium">Lagos, Nigeria (Global Remote)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm shadow-2xl shadow-black/50"
          >
            {isSuccess ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received.</h3>
                <p className="text-zinc-400">I will analyze your request and deploy a response shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-brand-cyan font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <input type="checkbox" className="hidden" style={{ display: 'none' }} {...register("botcheck")} />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-zinc-400 text-sm font-medium">First Name</label>
                    <input 
                      {...register("firstName", { required: true })}
                      type="text" 
                      className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-zinc-400 text-sm font-medium">Last Name</label>
                    <input 
                      {...register("lastName")}
                      type="text" 
                      className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">Email Address</label>
                  <input 
                    {...register("email", { required: true })}
                    type="email" 
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition" 
                    placeholder="jane@company.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">Project Interest</label>
                  <select 
                    {...register("projectType")}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition"
                  >
                    <option>Enterprise RAG Pipeline</option>
                    <option>Agentic Workflow Automation</option>
                    <option>Logic Evaluation / Auditing</option>
                    <option>Custom AI Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">Message</label>
                  <textarea 
                    {...register("message", { required: true })}
                    rows={4} 
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition" 
                    placeholder="Tell me about your project data and goals..." 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-cyan text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending <Loader2 className="animate-spin" size={18} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
