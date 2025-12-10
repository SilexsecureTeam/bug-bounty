import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";

// Assets
import shieldBg from "../assets/images/Group-1450.svg";
import newsImg1 from "../assets/images/Image-1.png";
import newsImg2 from "../assets/images/Image-2.png";
import newsImg3 from "../assets/images/Image-3.png";
import newsImg4 from "../assets/images/Image-4.png";
import matrixImg from "../assets/images/authImg.jpg"; // Placeholder for the matrix/code image
import joinIcon from "../assets/images/red-team.png"; // Placeholder for the small CTA icon

// --- Data ---

const newsUpdates = [
  {
    id: 1,
    tag: "Innovation",
    title: "New Bug Bounty Challenge Launched",
    desc: "Defcomm introduces a continent-wide vulnerability discovery challenge to strengthen defence digital.",
    date: "August 20, 2022",
    image: newsImg1
  },
  {
    id: 2,
    tag: "Recognition",
    title: "Top Ethical Hackers Recognized",
    desc: "Meet the top security researchers advancing Africa's cybersecurity mission.",
    date: "August 20, 2022",
    image: newsImg2
  },
  {
    id: 3,
    tag: "Collaboration",
    title: "New Defence Tech Research Hub Opened",
    desc: "Collaboration center built for testing drones, communications tools, and threat simulation.",
    date: "August 20, 2022",
    image: newsImg3
  },
  {
    id: 4,
    tag: "Capacity Building",
    title: "Cybersecurity Training Cohort Graduates",
    desc: "Over 200 young professionals trained in ethical testing and secure system design.",
    date: "August 20, 2022",
    image: newsImg4
  },
  // Duplicating for the grid effect shown in design
  {
    id: 5,
    tag: "Innovation",
    title: "New Bug Bounty Challenge Launched",
    desc: "Defcomm introduces a continent-wide vulnerability discovery challenge to strengthen defence digital.",
    date: "August 20, 2022",
    image: newsImg1
  },
  {
    id: 6,
    tag: "Innovation",
    title: "New Bug Bounty Challenge Launched",
    desc: "Defcomm introduces a continent-wide vulnerability discovery challenge to strengthen defence digital.",
    date: "August 20, 2022",
    image: newsImg3
  },
  {
    id: 7,
    tag: "Recognition",
    title: "Top Ethical Hackers Recognized",
    desc: "Meet the top security researchers advancing Africa's cybersecurity mission.",
    date: "August 20, 2022",
    image: newsImg2
  },
  {
    id: 8,
    tag: "Innovation",
    title: "New Bug Bounty Challenge Launched",
    desc: "Defcomm introduces a continent-wide vulnerability discovery challenge to strengthen defence digital.",
    date: "August 20, 2022",
    image: newsImg4
  }
];

export default function Highlights() {
  const heroRef = useReveal({ threshold: 0.1 });
  const newsRef = useReveal({ threshold: 0.1 });
  const featureRef = useReveal({ threshold: 0.1 });
  const statsRef = useReveal({ threshold: 0.1 });

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-white selection:bg-[#9FC24D] selection:text-black font-sans">
      <Helmet>
        <title>Highlights & Updates | Defcomm</title>
        <meta
          name="description"
          content="Explore major milestones shaping Africa's defence technology, cybersecurity advancements, and community achievements."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-20">
        
        {/* --- Hero Section --- */}
        <section 
          ref={heroRef}
          className="reveal-section relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-[#1A1D1A] px-6 py-20 text-center"
        >
          {/* Background Graphic */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
             <img src={shieldBg} alt="" className="h-[150%] w-auto object-cover" />
          </div>

          <div className="relative z-10 max-w-5xl space-y-6">
            <h1 className="reveal-child text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              Defcomm <span className="text-[#9FC24D]">Highlights</span> & <br />
              <span className="text-[#9FC24D]">Innovation</span> Updates
            </h1>
            <p className="reveal-child mx-auto max-w-2xl text-base text-[#D1D5DB] sm:text-lg">
              Explore major milestones shaping Africa's defence technology, cybersecurity advancements, and community achievements.
            </p>
          </div>
        </section>

        {/* --- News Grid Section --- */}
        <section ref={newsRef} className="bg-[#121212] px-6 py-24">
           <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">What's Happening Across Defcomm</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-sm text-[#9CA3AF]">
                   Explore the most important updates shaping Africa's defence technology, cybersecurity readiness, and innovation ecosystem.
                 </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                 {newsUpdates.map((news) => (
                    <div 
                      key={news.id} 
                      className="reveal-child group flex flex-col overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1E1E1E] transition-all hover:border-[#9FC24D]/50"
                    >
                       <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={news.image} 
                            alt={news.title} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                       </div>
                       <div className="flex flex-1 flex-col p-5">
                          <span className="mb-3 inline-block w-fit rounded bg-[#2D3320] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9FC24D]">
                             {news.tag}
                          </span>
                          <h3 className="mb-2 text-lg font-bold leading-tight text-white">
                             {news.title}
                          </h3>
                          <p className="mb-4 flex-1 text-xs leading-relaxed text-[#9CA3AF]">
                             {news.desc}
                          </p>
                          <p className="text-[10px] font-medium text-[#6B7280]">
                             {news.date}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* --- Key Updates & Feature Section (Image 2 Top) --- */}
        <section ref={featureRef} className="bg-[#121212] px-6 py-24">
           <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">Key Updates & Defence Tech Innovations</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-sm text-[#9CA3AF]">
                   Highlighting Defcomm's major breakthroughs, security discoveries, and technology milestones driving Africa's defence ecosystem forward
                 </p>
              </div>

              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                 {/* Left: Matrix Image */}
                 <div className="reveal-child relative h-[500px] overflow-hidden rounded-3xl border border-[#2A2A2A]">
                    <img 
                      src={matrixImg} 
                      alt="Cybersecurity Matrix" 
                      className="h-full w-full object-cover opacity-60 mix-blend-luminosity" 
                    />
                    <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay pointer-events-none" />
                    
                    {/* Simulated Code Rain Overlay Effect */}
                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif')] opacity-10 bg-cover mix-blend-screen pointer-events-none" />
                 </div>

                 {/* Right: Content */}
                 <div className="reveal-child space-y-8">
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                         200+ <br />
                         Vulnerabilities <br />
                         Identified
                       </h2>
                       <p className="text-sm leading-relaxed text-[#9CA3AF]">
                         Through structured bug bounty challenges, Defcomm researchers discovered and responsibly reported over 200 system vulnerabilities. These findings have strengthened cybersecurity protocols across multiple defence platforms, helping nations safeguard critical infrastructure and sensitive operations.
                       </p>
                    </div>

                    {/* Join Mission Card */}
                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#1E1E1E] p-6">
                       <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-black">
                             <img src={joinIcon} alt="Icon" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-2">
                             <h4 className="text-lg font-bold text-white">Join the Mission</h4>
                             <p className="text-xs text-[#9CA3AF]">
                               Strengthening Africa's security through bold innovation and talent.
                             </p>
                          </div>
                          <Link 
                            to="/register" 
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#5E7618] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#6E8A1C]"
                          >
                            Register now <ArrowUpRight size={16} />
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Green Stats Section (Image 2 Bottom) --- */}
        <section ref={statsRef} className="relative overflow-hidden bg-[#26330A] px-6 py-24 text-center">
           {/* Background Map Overlay */}
           <div className="pointer-events-none absolute inset-0 opacity-10">
              <img src={shieldBg} alt="Map" className="h-full w-full object-cover scale-150" />
           </div>

           <div className="relative z-10 mx-auto max-w-6xl">
              <div className="mb-16">
                 <h2 className="text-3xl font-black text-white sm:text-4xl">Driving Africa's Defence Tech Forward</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-sm text-[#DCEBC3]">
                   Discover vulnerabilities, track trends, and support Africa's defence tech innovation. Connect with experts to strengthen security and accelerate scalable, homegrown solutions
                 </p>
              </div>

              {/* Stats Layout - Creating the connected line look */}
              <div className="relative">
                 {/* Top Row */}
                 <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="reveal-child flex flex-col items-center">
                       <h3 className="text-4xl font-bold text-white">91k+</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Ethical Hackers</p>
                    </div>
                    
                    <div className="reveal-child relative flex flex-col items-center md:border-x md:border-[#FFFFFF]/20">
                       <h3 className="text-4xl font-bold text-white">51+</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Vulnerabilities Found</p>
                       {/* Vertical Line Drop for bottom row */}
                       <div className="absolute -bottom-12 left-1/2 hidden h-12 w-px bg-[#FFFFFF]/20 md:block"></div>
                    </div>

                    <div className="reveal-child flex flex-col items-center">
                       <h3 className="text-4xl font-bold text-white">90k</h3>
                       <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#DCEBC3]">Countries Reached</p>
                    </div>
                 </div>

                 {/* Horizontal Divider Line */}
                 <div className="my-12 hidden h-px w-full bg-[#FFFFFF]/20 md:block"></div>

                 {/* Bottom Row */}
                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

      </main>

      <Footer />
    </div>
  );
              }
