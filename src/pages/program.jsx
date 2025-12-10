import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";

// Assets (Reusing existing assets to match design placeholders)
import shieldBg from "../assets/images/Group-1450.svg";
import overviewImg from "../assets/images/authImg.jpg"; // Placeholder for the group photo
import matrixImg from "../assets/images/Image-1.png"; // Placeholder for the tech/matrix image
import avatarImg from "../assets/images/red-team.png"; // Placeholder for the 'Join Mission' avatar

// --- Data Constants ---

const strategies = [
  {
    id: "01",
    title: "Accelerate Defence Innovation",
    desc: "Create pathways for rapid testing, validation, and improvement of defence-related tech solutions through structured bug bounty challenges and open innovation programs."
  },
  {
    id: "02",
    title: "Strengthen Cybersecurity Readiness",
    desc: "Encourage ethical vulnerability discovery and responsible reporting to improve the security posture of digital defence systems without exposing sensitive operations."
  },
  {
    id: "03",
    title: "Build and Empower Talent",
    desc: "Offer opportunities for young cybersecurity professionals, researchers, and engineers to work on real defence challenges and gain experience in high-impact problem solving."
  },
  {
    id: "04",
    title: "Support Scalable, Local Solutions",
    desc: "Promote Africa-built defence technologies that address regional challenges in communication, surveillance, border management, and digital command systems."
  },
  {
    id: "05",
    title: "Foster Collaboration and Knowledge Sharing",
    desc: "Bring together industry experts, defence institutions, startups, and researchers to share insights and build a united defence tech community."
  },
  {
    id: "06",
    title: "Guide Responsible Innovation",
    desc: "Ensure all research and testing happens in secure, controlled environments with a focus on ethical standards, transparency, and continental security priorities."
  }
];

const steps = [
  {
    id: "01",
    title: "Identify Vulnerabilities",
    desc: "Discover potential weaknesses in digital defence systems and assess areas for improvement to enhance overall security."
  },
  {
    id: "02",
    title: "Report Responsibly",
    desc: "Submit your findings through a secure, ethical process, ensuring sensitive information is protected while contributing to safer technologies."
  },
  {
    id: "03",
    title: "Reward & Improve Technology",
    desc: "Discover potential weaknesses in digital defence systems and assess areas for improvement to enhance overall security."
  }
];

export default function Program() {
  const heroRef = useReveal({ threshold: 0.1 });
  const overviewRef = useReveal({ threshold: 0.1 });
  const strategiesRef = useReveal({ threshold: 0.1 });
  const innovationRef = useReveal({ threshold: 0.1 });
  const statsRef = useReveal({ threshold: 0.1 });
  const howRef = useReveal({ threshold: 0.1 });

  return (
    <div className="flex min-h-screen flex-col bg-[#1E1E1E] text-white selection:bg-[#9FC24D] selection:text-black font-sans">
      <Helmet>
        <title>Programme | Defcomm</title>
        <meta
          name="description"
          content="Defcomm's Defence Tech and Bug Bounty Programme: Strengthening cybersecurity, fostering talent, and accelerating innovation across Africa."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-16">
        
        {/* --- Hero Section --- */}
        <section 
          ref={heroRef}
          className="reveal-section relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-[#1E1E1E] px-6 py-20 sm:px-10"
        >
          {/* Background Graphic */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-20">
             <img src={shieldBg} alt="" className="h-full w-full object-contain object-right" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <h1 className="reveal-child text-5xl font-black leading-tight text-white sm:text-6xl md:text-7xl">
              Africa's Defence <br />
              Tech and Bug <br />
              Bounty Programme
            </h1>
            <p className="reveal-child max-w-xl text-base text-[#D1D5DB]">
              Strengthening cybersecurity, fostering talent, and accelerating innovation across Africa.
            </p>
            <div className="reveal-child pt-4">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 rounded-full bg-[#5E7618] px-8 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#6E8A1C]"
              >
                Register now <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* --- Overview Section --- */}
        <section ref={overviewRef} className="bg-[#1E1E1E] px-6 py-20 sm:px-10">
           <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
              <div className="reveal-child relative h-[400px] overflow-hidden rounded-2xl">
                 <img src={overviewImg} alt="Team working" className="h-full w-full object-cover" />
              </div>
              
              <div className="reveal-child space-y-6">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">
                    Defcomm Programme Overview
                 </h2>
                 <div className="space-y-4 text-sm leading-relaxed text-[#D1D5DB]">
                    <p>
                      The Defcomm Bug Bounty Program brings together ethical hackers, engineers, and researchers to improve the security, reliability, and performance of defence technologies across Africa.
                    </p>
                    <p>
                      Participants identify vulnerabilities, propose solutions, and contribute to a stronger defence technology ecosystem.
                    </p>
                 </div>
                 <Link 
                    to="/register" 
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#5E7618] px-8 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#6E8A1C]"
                  >
                    Register now <ArrowUpRight size={16} />
                  </Link>
              </div>
           </div>
        </section>

        {/* --- Strategies Grid --- */}
        <section ref={strategiesRef} className="bg-[#1E1E1E] px-6 py-24 sm:px-10">
           <div className="mx-auto max-w-7xl">
              <div className="mb-16">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">Our key strategies</h2>
                 <p className="mt-4 max-w-3xl text-sm text-[#D1D5DB]">
                   Defcomm's core strategies focus on innovation, talent growth, and strengthening the security of defence technologies across the continent.
                 </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {strategies.map((item, idx) => (
                    <div 
                      key={item.id}
                      className="reveal-child group flex flex-col justify-between rounded-[4px] bg-[#18181B] p-8 hover:bg-[#202024] transition-colors"
                      style={{ "--reveal-child-delay": `${idx * 0.1}s` }}
                    >
                       <div>
                          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#27272A] text-lg font-bold text-[#9FC24D] border border-[#3F3F46]">
                             {item.id}
                          </div>
                          <h3 className="mb-4 text-lg font-bold text-white">
                             {item.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-[#A1A1AA]">
                             {item.desc}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* --- Innovation / 200+ Vulnerabilities Section --- */}
        <section ref={innovationRef} className="bg-[#18181B] px-6 py-24 sm:px-10 border-y border-[#27272A]">
           <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">Key Updates & Defence Tech Innovations</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-sm text-[#D1D5DB]">
                   Highlighting Defcomm's major breakthroughs, security discoveries, and technology milestones driving Africa's defence ecosystem forward
                 </p>
              </div>

              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                 {/* Left Image (Matrix/Code style) */}
                 <div className="reveal-child h-[500px] overflow-hidden rounded-xl bg-black relative">
                    <img src={matrixImg} alt="Cybersecurity Data" className="h-full w-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay"></div>
                 </div>

                 {/* Right Content */}
                 <div className="reveal-child space-y-8">
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                         200+ <br />
                         Vulnerabilities <br />
                         Identified
                       </h2>
                       <p className="text-sm leading-relaxed text-[#D1D5DB]">
                         Through structured bug bounty challenges, Defcomm researchers discovered and responsibly reported over 200 system vulnerabilities. These findings have strengthened cybersecurity protocols across multiple defence platforms, helping nations safeguard critical infrastructure and sensitive operations.
                       </p>
                    </div>

                    {/* Inner Card */}
                    <div className="rounded-xl border border-[#27272A] bg-[#27272A]/50 p-6 backdrop-blur-sm">
                       <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black">
                             <img src={avatarImg} alt="Avatar" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-3">
                             <h4 className="text-lg font-bold text-white">Join the Mission</h4>
                             <p className="text-xs text-[#A1A1AA]">
                               Strengthening Africa's security through bold innovation and talent.
                             </p>
                             <Link 
                                to="/register" 
                                className="inline-flex items-center gap-2 rounded-full bg-[#5E7618] px-6 py-2 text-xs font-bold text-white hover:bg-[#6E8A1C]"
                              >
                                Register now <ArrowUpRight size={14} />
                              </Link>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Green Stats Section --- */}
        <section ref={statsRef} className="relative overflow-hidden bg-[#2D3A0A] px-6 py-24 text-center">
           <div className="pointer-events-none absolute inset-0 opacity-10">
              <img src={shieldBg} alt="" className="h-full w-full object-cover scale-125" />
           </div>

           <div className="relative z-10 mx-auto max-w-6xl">
              <div className="mb-16">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">Driving Africa's Defence Tech Forward</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-sm text-[#DCEBC3]">
                   Discover vulnerabilities, track trends, and support Africa's defence tech innovation. Connect with experts to strengthen security and accelerate scalable, homegrown solutions
                 </p>
              </div>

              {/* Stats Grid with Lines */}
              <div className="relative">
                 {/* Top Row */}
                 <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="reveal-child flex flex-col items-center">
                       <h3 className="text-4xl font-bold text-white">91k+</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Ethical Hackers</p>
                    </div>
                    
                    <div className="reveal-child relative flex flex-col items-center md:border-x md:border-[#FFFFFF]/20">
                       <h3 className="text-4xl font-bold text-white">51+</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Vulnerabilities Found</p>
                       {/* Vertical Connector */}
                       <div className="absolute -bottom-16 left-1/2 hidden h-16 w-px bg-[#FFFFFF]/20 md:block"></div>
                    </div>

                    <div className="reveal-child flex flex-col items-center">
                       <h3 className="text-4xl font-bold text-white">90k</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Countries Reached</p>
                    </div>
                 </div>

                 {/* Horizontal Connector */}
                 <div className="my-16 hidden h-px w-full bg-[#FFFFFF]/20 md:block"></div>

                 {/* Bottom Row */}
                 <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="reveal-child flex flex-col items-center md:border-r md:border-[#FFFFFF]/20">
                       <h3 className="text-4xl font-bold text-white">198k+</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Partners Onboarded</p>
                    </div>
                    <div className="reveal-child flex flex-col items-center">
                       <h3 className="text-4xl font-bold text-white">21k</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Programs Launched</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- How It Works Section --- */}
        <section ref={howRef} className="bg-[#18181B] px-6 py-24 sm:px-10">
           <div className="mx-auto max-w-6xl text-center">
              <div className="mb-20">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">How it works</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-sm text-[#A1A1AA]">
                   A simple, structured process where experts find vulnerabilities, report them responsibly, and help strengthen Africa's defence systems
                 </p>
              </div>

              <div className="relative">
                 {/* Connecting Line (Desktop) */}
                 <div className="absolute left-0 top-8 hidden h-px w-full bg-[#27272A] lg:block"></div>

                 <div className="grid gap-12 lg:grid-cols-3">
                    {steps.map((step, idx) => (
                       <div key={step.id} className="reveal-child relative flex flex-col items-center" style={{ "--reveal-child-delay": `${idx * 0.15}s` }}>
                          <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5E7618] text-xl font-bold text-white shadow-[0_0_0_8px_#18181B]">
                             {step.id}
                          </div>
                          <h3 className="mb-4 text-lg font-bold text-white">{step.title}</h3>
                          <p className="max-w-xs text-xs leading-relaxed text-[#A1A1AA]">
                             {step.desc}
                          </p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* --- Bottom CTA --- */}
        <section className="bg-[#2D3A0A] px-6 py-20 text-center">
           <div className="mx-auto max-w-4xl space-y-6">
              <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to secure Africa's Digital Future</h2>
              <p className="mx-auto max-w-2xl text-sm text-[#DCEBC3]">
                Join a community of innovators, security experts and policymakers dedicated to advancing defence technology and cyber security across the continent
              </p>
              <div className="pt-4">
                 <Link 
                   to="/register" 
                   className="inline-flex items-center gap-2 rounded-full bg-[#E4E4E7] px-8 py-4 text-sm font-bold text-[#18181B] transition-transform hover:-translate-y-0.5 hover:bg-white"
                 >
                   Register now <ArrowUpRight size={16} />
                 </Link>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
