import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Target,
  Shield,
  Cpu,
  Wifi,
  Crosshair,
  Plane,
  Plus,
  Minus,
  Loader2,
  Lock, // Added missing icon import
  Users, // Added missing icon import
  Zap    // Added missing icon import
} from "lucide-react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import shieldBg from "../assets/images/Group-1450.svg";
// Replaced missing first_icon with a placeholder or lucide icon to prevent crash
import first_icon from "../assets/images/Icons.png"; 
import second_icon from "../assets/images/IIcon.png"; 
import aboutImage from "../assets/images/aboutImg.png";

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

const faqs = [
  {
    question: "What is the Defcomm Bug Bounty Program?",
    answer: "The Defcomm Bug Bounty Program is a defence technology initiative that invites ethical hackers, researchers, and engineers to identify vulnerabilities in approved systems to help improve Africa's defence and cybersecurity readiness."
  },
  {
    question: "Who can participate in the program?",
    answer: "The program is open to ethical hackers, cybersecurity researchers, developers, and defence technology enthusiasts who meet our vetting requirements."
  },
  {
    question: "Is the program safe and legal to participate in?",
    answer: "Yes. All activities are conducted within a strictly defined scope and legal framework. Participants must adhere to our Rules of Engagement to ensure legality and safety."
  },
  {
    question: "How do I submit a vulnerability report?",
    answer: "You can submit reports through our secure portal dashboard. You must be a registered user to access the submission forms and track your reports."
  }
];

const innovations = [
  { icon: Plane, label: "Drone Surveillance" },
  { icon: Crosshair, label: "Precision Systems" },
  { icon: Wifi, label: "Signal Intelligence" },
  { icon: Cpu, label: "Cyber Hardware" }
];

// --- Components ---

export default function About() {
  const [activeTab, setActiveTab] = useState("About Us");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend.defcomm.ng/api";

      const payload = {
        first_name: contactForm.name.split(" ")[0] || contactForm.name,
        last_name: contactForm.name.split(" ").slice(1).join(" ") || ".",
        email: contactForm.email,
        phone: "",
        company: contactForm.subject,
        detail: contactForm.message
      };

      const response = await fetch(`${baseUrl}/web/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060706] text-white selection:bg-[#9FC24D] selection:text-black">
      <Helmet>
        <title>About Us | Defcomm</title>
      </Helmet>


      <main className="flex-1">

        {/* --- Hero Section --- */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src={shieldBg}
            alt="Abstract circuit shield"
            className="floating-pulse absolute right-5 top-20 h-full w-auto opacity-70"
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
                    Building Africa’s <br /> Future of Defence <br /> Technology
                  </h1>
                </div>

                <p className="text-lg text-[#C6D4A1] sm:text-xl">
                  Empowering innovators, strengthening cybersecurity, and advancing a safer, more resilient continent.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-[#0D1206] shadow-[0_20px_45px_rgba(107,168,15,0.35)] transition-transform duration-200 hover:scale-[1.02]"
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

        {/* --- Section with the Grid Fix --- */}
        <section className="bg-[#151C04] p-6 lg:p-16">
          <div className="text-center max-w-4xl mx-auto space-y-4 mb-8 text-[17px]">
            <h3 className="text-2xl font-bold leading-tight text-white md:text-4xl">Accelerating secure defence innovation in Africa.</h3>
            <p>Learn about Defcomm’s mission to build a stronger and more resilient Africa through defence technology development, ethical security research, and collaborative innovation that supports national and regional stability.</p>
          </div>

          {/* FIX: Added 'grid' class and responsive breakpoints */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-5 p-4">
            <div className="md:col-span-3 md:row-span-2 bg-[#192204] p-6 rounded-2xl border border-[#26330A]">
              <p className="font-bold text-[18px] mb-4">Core Defence & Cyber Innovation</p>
              <p className="leading-relaxed text-[17px] text-[#B6C197]">Advancing modern, scalable technologies that strengthen Africa’s defence ecosystem. From drone development and smart surveillance systems to cybersecurity tools and software that tracks weapons and threats, Defcomm supports reliable operations, improves situational awareness, and enables smarter, faster responses to emerging security challenges.</p>
            </div>

            {/* Using Lucide icons as fallback since first_icon.png was missing */}
            <div className="bg-[#192204] p-6 md:col-span-2 flex items-center justify-center rounded-2xl border border-[#26330A]">
              <img src={first_icon} alt="" className="w-34 h-34" />
            </div>
            <div className="bg-[#192204] p-6 md:col-span-2 flex items-center justify-center rounded-2xl border border-[#26330A]">
              <img src={second_icon} alt="" className="w-34 h-34" />
            </div>
            <div className="bg-[#192204] p-6 md:col-span-2 flex items-center justify-center rounded-2xl border border-[#26330A]">
              <img src={first_icon} alt="" className="w-34 h-34" />
            </div>
            <div className="bg-[#192204] p-6 md:col-span-2 flex items-center justify-center rounded-2xl border border-[#26330A]">
              <img src={first_icon} alt="" className="w-34 h-34" />
            </div>
            
          </div>
        </section>

        {/* --- Tabs Section --- */}
        <div className="text-center max-w-5xl mx-auto py-6 pt-12 space-y-4 px-6">
          <h3 className="text-2xl font-bold leading-tight text-white md:text-4xl">Accelerating secure defence innovation in Africa.</h3>
          <p>Learn about Defcomm’s mission to build a stronger and more resilient Africa through defence technology development, ethical security research, and collaborative innovation that supports national and regional stability.</p>
        </div>

        <div className="mt-12 max-w-7xl mx-auto flex flex-wrap justify-between gap-2 rounded-full p-1.5 px-6">
          {["About Us", "Our Mission", "Our Vision"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-8 py-3 w-3/10 text-sm font-semibold transition-all duration-300 ${activeTab === tab
                ? "bg-[#4E6413] text-[#DCEBC3]"
                : "bg-[#85AB20] text-white hover:text-[#DCEBC3] hover:bg-[#4E6413]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Tab Content Section --- */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="overflow-hidden rounded-3xl border border-[#1F2611] bg-[#131516] p-6 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left: Image */}
              <div className="relative h-[300px] w-full overflow-hidden rounded-md lg:h-[500px]">
                <img
                  src={aboutImage}
                  alt="Professional at computer"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Right: Content */}
              <div className="space-y-6">
                <h2 className="text-2xl flex justify-between font-bold text-white md:text-3xl">
                  {activeTab === "About Us" && "About Defcomm Bug Bounty"}
                  {activeTab === "Our Mission" && "Our Mission"}
                  {activeTab === "Our Vision" && "Our Vision"}
                </h2>

                <div className="space-y-4 text-[16px] leading-relaxed text-[#B6C197]">
                  {activeTab === "About Us" && (
                    <>
                      <p>
                        The Defcomm Bug Bounty Program is a continental defence technology initiative focused on improving the security, reliability, and performance of digital defence systems used across Africa. It brings together ethical hackers, engineers, researchers, and defence innovators to identify weaknesses, propose solutions, and contribute to a stronger defence technology ecosystem.
                      </p>
                      <p>
                        As African nations confront rising insecurity, cross-border threats, surveillance challenges, and rapid digital transformation, Defcomm provides a structured platform that supports collaboration, research, and growth. The program serves both as a security improvement initiative and as a talent development pipeline for Africa’s next generation of defence innovators.
                      </p>
                    </>
                  )}
                  {activeTab === "Our Mission" && (
                    <p>
                      To accelerate innovation, strengthen cybersecurity, and empower talented researchers through structured bug bounty challenges and modern defence tech initiatives. We aim to identify vulnerabilities before adversaries do and create a sovereign, resilient defence ecosystem.
                    </p>
                  )}
                  {activeTab === "Our Vision" && (
                    <p>
                      A secure, self-reliant African digital ecosystem where critical infrastructure is protected by homegrown talent, and where defence technology drives economic growth, national stability, and technological sovereignty.
                    </p>
                  )}
                </div>

                <button className="inline-flex items-center rounded-full bg-[#4E6413] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#5C751A]">
                  Register now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Strategies Grid Section --- */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Our key strategies</h2>
              <p className="mt-4 text-[17px] mx-auto text-[#9CA3AF] max-w-5xl ">
                Defcomm's core strategies focus on innovation, talent growth, and strengthening the security of defence technologies across the continent.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-[17px]">
              {strategies.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between rounded-xl bg-[#131516] p-8 transition-colors hover:bg-[#1A1D1F]"
                >
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E2415] text-[20px] font-medium text-[#9FC24D] border border-[#2C351F]">
                      {item.id}
                    </div>
                    <h3 className="mb-4 text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-[#9CA3AF]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      

        {/* --- FAQ & Contact Section --- */}
        <section className="py-24 px-6 mx-auto max-w-7xl text-[17px]">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white">Frequently asked questions.</h2>
            <p className="mt-2 text-[#9CA3AF]">Find quick answers to the most common questions about the Defcomm program.</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left: Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#1F242C] pb-4">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                    className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
                  >
                    <span className=" font-medium text-white">{faq.question}</span>
                    {openFaqIndex === index ? (
                      <Minus size={16} className="text-[#9FC24D]" />
                    ) : (
                      <Plus size={16} className="text-[#9CA3AF]" />
                    )}
                  </button>

                  {openFaqIndex === index && (
                    <div className="pb-4 text-[15px] leading-relaxed text-[#9CA3AF] animate-in fade-in slide-in-from-top-2 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Contact Form */}
            <div className="rounded-3xl bg-[#E6E6E6] p-8 text-[#1A1D21] shadow-xl">
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2">GET IN TOUCH</h3>
              <p className="text-[15px] text-[#5E667B] mb-8">
                Reach out with inquiries about Sponsorships, partnerships, or event details.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block text-[15px] text-[#5E667B] mb-1 pl-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className="w-full border-b border-[#C7CBD1] bg-transparent px-1 py-2 text-sm font-medium text-[#1A1D21] placeholder-gray-400 focus:border-[#4E6413] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[15px] text-[#5E667B] mb-1 pl-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full border-b border-[#C7CBD1] bg-transparent px-1 py-2 text-sm font-medium text-[#1A1D21] placeholder-gray-400 focus:border-[#4E6413] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[15px] text-[#5E667B] mb-1 pl-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    className="w-full border-b border-[#C7CBD1] bg-transparent px-1 py-2 text-sm font-medium text-[#1A1D21] placeholder-gray-400 focus:border-[#4E6413] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[15px] text-[#5E667B] mb-1 pl-1">Message</label>
                  <textarea
                    rows={2}
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className="w-full border-b border-[#C7CBD1] bg-transparent px-1 py-2 text-sm font-medium text-[#1A1D21] placeholder-gray-400 resize-none focus:border-[#4E6413] focus:outline-none"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-[#4E6413] px-8 py-3 text-[15px] font-bold text-[#E2E8F0] shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 size={14} className="animate-spin" />}
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}