import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";

// Assets (Reusing existing assets to match design placeholders)
import shieldBg from "../assets/images/Group-1450.svg";
import overviewImg from "../assets/images/first.jpg"; // Placeholder for the group photo

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
    <div className="flex min-h-screen flex-col bg-[#1E1E1E] text-white selection:bg-[#9FC24D] selection:text-black">
      <Helmet>
        <title>African Defence Tech Programme | Events, Hackathons & Defence Innovation</title>
        <meta
          name="description"
          content= "Explore the African Defence Tech programme featuring defence summits, cybersecurity hackathons, R&D showcases, and policy-driven innovation across Africa."
        />
      </Helmet>

      <main className="flex-1 pt-16 text-[16px]">
        
        {/* --- Hero Section --- */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src={shieldBg}
            alt="Abstract circuit shield"
            className="floating-pulse absolute right-5 top-20 h-full w-auto opacity-80"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-24 pt-18 sm:px-10 lg:gap-20 lg:px-0 lg:pt-10">
          <header className="flex flex-col gap-6 lg:gap-10">


            <div
              className="reveal-child flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
              style={{ "--reveal-child-delay": "0.2s" }}
            >
              <div className="flex max-w-3xl flex-col gap-6">
                <div className="relative z-10 space-y-6 text-left">
                  <h1 className="text-4xl font-bold leading-[1.1] text-white md:text-7xl">
                    Africa’s Defence <br /> Tech and Bug <br /> Bounty Programme
                  </h1>
                </div>

                <p className="text-lg text-[#C6D4A1] sm:text-xl">
                  Strengthening cybersecurity, fostering talent, and accelerating innovation across Africa.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold text-[#0D1206] shadow-[0_20px_45px_rgba(107,168,15,0.35)] transition-transform duration-200 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(90deg, #36460A 0%, #9ECB32 100%)"
                    }}
                  >
                    Register now ↗
                  </Link>
                  
                </div>
              </div>
              <div />
            </div>
          </header>
        </div>

        {/* --- Overview Section --- */}
        <section ref={overviewRef} className="bg-[#1E1E1E] px-6 py-20 sm:px-10">
           <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
              <div className="reveal-child relative h-[400px] overflow-hidden rounded-2xl">
                 <img src={overviewImg} alt="Team working" className="h-full w-full object-cover" />
              </div>
              
              <div className="reveal-child space-y-6">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">
                    African Defence Tech Programme Overview
                 </h2>
                 <div className="space-y-4 text-[16px] leading-relaxed text-[#D1D5DB]">
                    <p>
                      The African Defence Tech Programme brings together ethical hackers, engineers, and researchers to strengthen the security, reliability, and performance of defence technologies across Africa identifying vulnerabilities, developing solutions, and building a resilient, indigenous defence technology ecosystem.
                    </p>
                    
                 </div>
                 <Link 
                    to="/register" 
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#5E7618] px-8 py-3 text-[16px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#6E8A1C]"
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
                 <p className="mt-4 max-w-3xl text-[16px] text-[#D1D5DB]">
                   Defcomm's core strategies focus on innovation, talent growth, and strengthening the security of defence technologies across the continent.
                 </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {strategies.map((item, idx) => (
                    <div 
                      key={item.id}
                      className="reveal-child group flex flex-col justify-between rounded-sm bg-[#18181B] p-8 hover:bg-[#202024] transition-colors"
                      style={{ "--reveal-child-delay": `${idx * 0.1}s` }}
                    >
                       <div>
                          <div className="mb-6 flex h-12 w-12 text-[20px] items-center justify-center rounded-full bg-[#27272A] text-lg font-medium text-[#9FC24D] border border-[#3F3F46]">
                             {item.id}
                          </div>
                          <h3 className="mb-4 text-lg font-bold text-white">
                             {item.title}
                          </h3>
                          <p className="text-[15px] leading-relaxed text-[#A1A1AA]">
                             {item.desc}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

       

        {/* --- How It Works Section --- */}
        <section ref={howRef} className="bg-[#18181B] px-6 py-24 sm:px-10">
           <div className="mx-auto max-w-6xl text-center">
              <div className="mb-20">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">How it works</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-[16px] text-[#A1A1AA]">
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
                          <p className="max-w-xs text-[15px] leading-relaxed text-[#A1A1AA]">
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
              <p className="mx-auto max-w-2xl text-[16px] text-[#DCEBC3]">
                Join a community of innovators, security experts and policymakers dedicated to advancing defence technology and cyber security across the continent
              </p>
              <div className="pt-4">
                 <Link 
                   to="/register" 
                   className="inline-flex items-center gap-2 rounded-full bg-[#E4E4E7] px-8 py-4 text-[16px] font-bold text-[#18181B]! transition-transform hover:-translate-y-0.5 hover:bg-white"
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
