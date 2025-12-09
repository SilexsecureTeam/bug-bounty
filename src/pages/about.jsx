import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, Target, Users, Zap, Globe, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";
import shieldBg from "../assets/images/Group-1450.svg"; // Reusing from landing
import authImg from "../assets/images/authImg.jpg"; // Reusing or using a placeholder

export default function About() {
  const heroRef = useReveal({ threshold: 0.1 });
  const missionRef = useReveal({ threshold: 0.2 });
  const valuesRef = useReveal({ threshold: 0.1 });
  const teamRef = useReveal({ threshold: 0.1 });

  return (
    <div className="flex min-h-screen flex-col bg-[#05070C] text-white selection:bg-[#9FC24D] selection:text-black">
      <Helmet>
        <title>About Us | Defcomm</title>
        <meta
          name="description"
          content="Learn about Defcomm's mission to secure Africa's digital infrastructure through ethical hacking and defense technology."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section
          ref={heroRef}
          className="reveal-section relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden border-b border-[#1B1F2A] bg-[#080C14] px-6 py-24 text-center sm:px-10"
        >
          {/* Background Elements */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9FC24D] blur-[150px]" />
          </div>
          <img
            src={shieldBg}
            alt=""
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-30 mix-blend-overlay"
          />

          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="reveal-child inline-block rounded-full border border-[#9FC24D]/30 bg-[#9FC24D]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9FC24D] backdrop-blur-md">
              Who We Are
            </span>
            <h1 className="reveal-child text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl" style={{ "--reveal-child-delay": "0.1s" }}>
              Securing Africa’s <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9FC24D] to-[#FFFFFF]">
                Digital Sovereignty
              </span>
            </h1>
            <p className="reveal-child mx-auto max-w-2xl text-lg text-[#9CA3AF] sm:text-xl" style={{ "--reveal-child-delay": "0.2s" }}>
              Defcomm is the premier defense technology community uniting ethical hackers, security researchers, and government agencies to build a resilient cyber ecosystem.
            </p>
          </div>
        </section>

        {/* --- Mission & Vision Grid --- */}
        <section ref={missionRef} className="reveal-section mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="reveal-child group relative overflow-hidden rounded-[40px] border border-[#1B1F2A] bg-[#0E131D] p-10 transition-all hover:border-[#9FC24D]/50" style={{ "--reveal-child-delay": "0.1s" }}>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A2334] text-[#9FC24D]">
                <Target size={28} strokeWidth={2} />
              </div>
              <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white">Our Mission</h2>
              <p className="text-[#9CA3AF] leading-relaxed">
                To accelerate innovation, strengthen cybersecurity, and empower talented researchers through structured bug bounty challenges and modern defense tech initiatives. We aim to identify vulnerabilities before adversaries do.
              </p>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#9FC24D]/5 blur-3xl group-hover:bg-[#9FC24D]/10 transition-all" />
            </div>

            {/* Vision Card */}
            <div className="reveal-child group relative overflow-hidden rounded-[40px] border border-[#1B1F2A] bg-[#0E131D] p-10 transition-all hover:border-[#9FC24D]/50" style={{ "--reveal-child-delay": "0.2s" }}>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A2334] text-[#9FC24D]">
                <Globe size={28} strokeWidth={2} />
              </div>
              <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white">Our Vision</h2>
              <p className="text-[#9CA3AF] leading-relaxed">
                A secure, self-reliant African digital ecosystem where critical infrastructure is protected by homegrown talent, and where defense technology drives economic growth and national stability.
              </p>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#9FC24D]/5 blur-3xl group-hover:bg-[#9FC24D]/10 transition-all" />
            </div>
          </div>
        </section>

        {/* --- Image Split Section --- */}
        <section className="border-y border-[#1B1F2A] bg-[#080C14]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">
            <div className="reveal-child order-2 lg:order-1 relative overflow-hidden rounded-[40px] border border-[#2A303C]">
               <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
               <img src={authImg} alt="Team collaboration" className="h-full w-full object-cover opacity-80" />
               <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-sm font-mono text-[#9FC24D] uppercase tracking-widest mb-1">Since 2023</p>
                  <p className="text-xl font-bold text-white">Building the Frontline</p>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
               <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                 Why Defcomm Exists
               </h2>
               <div className="space-y-6 text-[#9CA3AF]">
                 <p>
                   As digital threats evolve, traditional security measures are no longer sufficient. Africa needs a proactive, offensive security approach. Defcomm was born from the need to bridge the gap between skilled independent researchers and the organizations that need them most.
                 </p>
                 <p>
                   We provide a platform where security is gamified, talent is rewarded, and critical systems are hardened against real-world attacks.
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-white">500+</h3>
                    <p className="text-xs uppercase tracking-widest text-[#5E667B]">Hackers Verified</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-white">$200k</h3>
                    <p className="text-xs uppercase tracking-widest text-[#5E667B]">Bounties Paid</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- Core Values --- */}
        <section ref={valuesRef} className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Our Core Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#9CA3AF]">The principles that guide our operations and community interactions.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
             {[
               { icon: Lock, title: "Integrity", desc: "Trust is our currency. We operate with absolute transparency and ethical standards." },
               { icon: Zap, title: "Innovation", desc: "We constantly push the boundaries of what's possible in defense tech." },
               { icon: Users, title: "Community", desc: "We believe in the power of the collective. Together we are stronger." },
               { icon: Shield, title: "Resilience", desc: "Building systems and teams that can withstand and recover from any threat." }
             ].map((val, idx) => (
               <div key={idx} className="reveal-child flex flex-col items-center text-center rounded-3xl bg-[#0E131D] p-8 border border-[#1B1F2A] hover:bg-[#151A25] transition-colors" style={{ "--reveal-child-delay": `${idx * 0.1}s` }}>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#9FC24D]/10 text-[#9FC24D]">
                    <val.icon size={24} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">{val.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{val.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="border-t border-[#1B1F2A] bg-[#080C14] px-6 py-24 text-center">
           <div className="mx-auto max-w-3xl space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">Ready to Secure the Future?</h2>
              <p className="text-lg text-[#9CA3AF]">
                Whether you are a researcher looking to test your skills or an organization needing to secure your assets, Defcomm is your partner.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                 <Link 
                   to="/register/create" 
                   className="rounded-full bg-[#9FC24D] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0B0F05] shadow-[0_10px_30px_rgba(159,194,77,0.3)] transition-transform hover:-translate-y-1"
                 >
                   Join as a Hunter
                 </Link>
                 <Link 
                   to="/register" 
                   className="rounded-full border border-[#2A303C] bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1A1F2A]"
                 >
                   Partner With Us
                 </Link>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}