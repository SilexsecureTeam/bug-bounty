import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Play, Award, Users, Trophy, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";
import shieldBg from "../assets/images/Group-1450.svg";
import eventImg1 from "../assets/images/Image-1.png";
import eventImg2 from "../assets/images/Image-2.png";
import eventImg3 from "../assets/images/Image-3.png";
import eventImg4 from "../assets/images/Image-4.png";

const stats = [
  { label: "Vulnerabilities Found", value: "850+", icon: BugIcon },
  { label: "Bounties Awarded", value: "$200k", icon: Trophy },
  { label: "Active Hackers", value: "1,200+", icon: Users },
  { label: "Participating Nations", value: "12", icon: GlobeIcon },
];

function BugIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function Highlights() {
  const heroRef = useReveal({ threshold: 0.1 });
  const galleryRef = useReveal({ threshold: 0.1 });
  const statsRef = useReveal({ threshold: 0.2 });

  return (
    <div className="flex min-h-screen flex-col bg-[#05070C] text-white selection:bg-[#9FC24D] selection:text-black">
      <Helmet>
        <title>Highlights | Defcomm</title>
        <meta
          name="description"
          content="Explore the highlights, impact, and key moments from previous Defcomm bug bounty events and defense summits."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section
          ref={heroRef}
          className="reveal-section relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-b border-[#1B1F2A] bg-[#080C14] px-6 py-20 text-center sm:px-10"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#9FC24D] blur-[120px]" />
          </div>
          <img
            src={shieldBg}
            alt=""
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-overlay"
          />

          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="reveal-child inline-block rounded-full border border-[#9FC24D]/30 bg-[#9FC24D]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9FC24D] backdrop-blur-md">
              Recap
            </span>
            <h1 className="reveal-child text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl" style={{ "--reveal-child-delay": "0.1s" }}>
              Event <span className="text-[#9FC24D]">Highlights</span>
            </h1>
            <p className="reveal-child mx-auto max-w-2xl text-lg text-[#9CA3AF]" style={{ "--reveal-child-delay": "0.2s" }}>
              Relive the intensity of Operation Iron Shield. From breakthrough vulnerabilities to strategic alliances, see how we are reshaping Africa's cyber defense.
            </p>
          </div>
        </section>

        {/* --- Stats Banner --- */}
        <section ref={statsRef} className="border-b border-[#1B1F2A] bg-[#0B0F15]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 sm:px-10 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="reveal-child flex flex-col items-center text-center space-y-2" style={{ "--reveal-child-delay": `${idx * 0.1}s` }}>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2334] text-[#9FC24D]">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#5E667B]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Gallery Grid --- */}
        <section ref={galleryRef} className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
             <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Moments in Action</h2>
                <p className="text-sm text-[#9CA3AF]">Snapshots from the war room and strategy summits.</p>
             </div>
             <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#9FC24D] hover:text-white transition-colors">
               View Full Archive <ArrowRight size={16} />
             </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 h-auto lg:h-[600px]">
             {/* Large item */}
             <div className="reveal-child group relative overflow-hidden rounded-[32px] border border-[#2A303C] bg-[#11151C] sm:col-span-2 lg:row-span-2" style={{ "--reveal-child-delay": "0.1s" }}>
                <img src={eventImg1} alt="Hackathon main event" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                   <span className="mb-2 inline-block rounded bg-[#9FC24D] px-2 py-1 text-[10px] font-bold uppercase text-black">Main Stage</span>
                   <h3 className="text-xl font-bold text-white">Live CTF Finals</h3>
                </div>
             </div>

             {/* Small items */}
             <div className="reveal-child group relative overflow-hidden rounded-[32px] border border-[#2A303C] bg-[#11151C]" style={{ "--reveal-child-delay": "0.2s" }}>
                <img src={eventImg2} alt="Panel session" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
             </div>
             
             <div className="reveal-child group relative overflow-hidden rounded-[32px] border border-[#2A303C] bg-[#11151C]" style={{ "--reveal-child-delay": "0.3s" }}>
                <img src={eventImg3} alt="Team collaboration" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>

             {/* Wide bottom item on mobile, standard on desktop if needed, adjusted for grid */}
             <div className="reveal-child group relative overflow-hidden rounded-[32px] border border-[#2A303C] bg-[#11151C] sm:col-span-2 lg:col-span-1" style={{ "--reveal-child-delay": "0.4s" }}>
                <img src={eventImg4} alt="Networking" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                 <div className="absolute bottom-6 left-6">
                   <h3 className="text-lg font-bold text-white">Networking & Awards</h3>
                </div>
             </div>
          </div>
        </section>

        {/* --- Video / Media Feature --- */}
        <section className="relative overflow-hidden border-y border-[#1B1F2A] bg-[#0E1218] py-24">
           <div className="mx-auto max-w-7xl px-6 sm:px-10">
              <div className="relative overflow-hidden rounded-[40px] border border-[#2A303C] bg-black shadow-2xl">
                 <div className="aspect-video w-full opacity-60">
                    {/* Placeholder for video thumbnail - using a solid color or gradient */}
                    <div className="h-full w-full bg-linear-to-br from-[#1A2334] to-[#0A0D13] flex items-center justify-center">
                       <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-[#9FC24D] text-[#0B0F05] shadow-[0_0_40px_rgba(159,194,77,0.4)] transition-transform hover:scale-110">
                          <Play size={32} fill="currentColor" className="ml-1" />
                       </button>
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 sm:p-12">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Watch the 2024 Recap</h2>
                    <p className="mt-2 max-w-xl text-[#9CA3AF]">See how the top teams breached the 'unbreakable' vault in record time.</p>
                 </div>
              </div>
           </div>
        </section>

         {/* --- Impact Stories --- */}
         <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10 text-center">
            <h2 className="mb-12 text-3xl font-black uppercase tracking-tight text-white">Community Impact</h2>
            <div className="grid gap-6 sm:grid-cols-2">
               <div className="rounded-3xl border border-[#1B1F2A] bg-[#0D1117] p-8 text-left hover:border-[#9FC24D]/30 transition-colors">
                  <div className="mb-4 text-[#9FC24D]">★★★★★</div>
                  <p className="mb-6 text-sm leading-relaxed text-[#D1D5DB]">
                    "Defcomm isn't just a CTF. It's a proving ground. The connections I made here led directly to a contract with a major fintech firm."
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-gray-700" />
                     <div>
                        <p className="text-sm font-bold text-white">Sarah O.</p>
                        <p className="text-xs text-[#6B7280]">Security Researcher, Lagos</p>
                     </div>
                  </div>
               </div>
               <div className="rounded-3xl border border-[#1B1F2A] bg-[#0D1117] p-8 text-left hover:border-[#9FC24D]/30 transition-colors">
                  <div className="mb-4 text-[#9FC24D]">★★★★★</div>
                  <p className="mb-6 text-sm leading-relaxed text-[#D1D5DB]">
                    "The level of technical sophistication at Operation Iron Shield was unmatched. It pushed our red team to the absolute limit."
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-gray-700" />
                     <div>
                        <p className="text-sm font-bold text-white">David K.</p>
                        <p className="text-xs text-[#6B7280]">Team Lead, Silex Secure</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         
         {/* --- CTA --- */}
         <section className="border-t border-[#1B1F2A] bg-linear-to-b from-[#080C14] to-black px-6 py-24 text-center">
            <h2 className="text-3xl font-black uppercase text-white sm:text-5xl">Don't Miss The Next One</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
              The next operation is loading. Secure your spot on the waitlist or register now.
            </p>
            <div className="mt-8 flex justify-center">
              <Link 
                to="/register" 
                className="rounded-full bg-[#9FC24D] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#0B0F05] shadow-[0_0_30px_rgba(159,194,77,0.25)] transition-transform hover:-translate-y-1"
              >
                Register Interest
              </Link>
            </div>
         </section>

      </main>

      <Footer />
    </div>
  );
}