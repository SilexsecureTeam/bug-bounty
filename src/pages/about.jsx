import React, { useState } from "react";
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
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import shieldBg from "../assets/images/Group-1450.svg";
import aboutImage from "../assets/images/authImg.jpg"; // Using the auth image as placeholder for the person at computer

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
  { icon: Plane, label: "Drone Surveillance" }, // Approximating drone
  { icon: Crosshair, label: "Precision Systems" }, // Approximating weapon systems
  { icon: Wifi, label: "Signal Intelligence" },
  { icon: Cpu, label: "Cyber Hardware" }
];

// --- Components ---

export default function About() {
  const [activeTab, setActiveTab] = useState("About Us");
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // First one open by default as per design hint
  
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
      // Using the base URL logic from api.js or fallback
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend.defcomm.ng/api";
      
      const payload = {
        first_name: contactForm.name.split(" ")[0] || contactForm.name,
        last_name: contactForm.name.split(" ").slice(1).join(" ") || ".",
        email: contactForm.email,
        phone: "", // Optional in UI, but maybe required by API, sending empty
        company: contactForm.subject, // Mapping subject to company/detail based on available fields
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
    <div className="min-h-screen bg-[#060706] text-white font-sans selection:bg-[#9FC24D] selection:text-black">
      <Helmet>
        <title>About Us | Defcomm</title>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24">
        
        {/* --- Hero Section --- */}
        <section className="relative flex flex-col items-center justify-center px-6 py-16 text-center lg:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-40">
             <img src={shieldBg} alt="" className="h-full w-full object-cover opacity-20" />
          </div>
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Accelerating secure defence <br />
              innovation in Africa.
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-[#C7D2B7] md:text-base">
              Learn about Defcomm's mission to build a stronger and more resilient Africa through defence technology development, ethical security research, and collaborative innovation that supports national and regional stability.
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 rounded-full border border-[#232918] bg-[#0E120A] p-1.5">
            {["About Us", "Our Mission", "Our Vision"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#4E6413] text-[#DCEBC3]" // Active State
                    : "bg-transparent text-[#7D8A5A] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* --- Tab Content Section --- */}
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#1F2611] bg-[#131516] p-6 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              
              {/* Left: Image */}
              <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px]">
                <img 
                  src={aboutImage} 
                  alt="Professional at computer" 
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Right: Content */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  {activeTab === "About Us" && "About Defcomm Bug Bounty"}
                  {activeTab === "Our Mission" && "Our Mission"}
                  {activeTab === "Our Vision" && "Our Vision"}
                </h2>
                
                <div className="space-y-4 text-sm leading-relaxed text-[#B6C197]">
                  {activeTab === "About Us" && (
                    <>
                      <p>
                        The Defcomm Bug Bounty Program is a continental defence technology initiative focused on improving the security, reliability, and performance of digital defence systems used across Africa. It brings together ethical hackers, engineers, researchers, and defence innovators to identify weaknesses, propose solutions, and contribute to a stronger defence technology ecosystem.
                      </p>
                      <p>
                        As African nations confront rising insecurity, cross-border threats, surveillance challenges, and rapid digital transformation, Defcomm provides a structured platform that supports collaboration, research, and growth. The program serves both as a security improvement initiative and as a talent development pipeline for Africa's next generation of defence innovators.
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
                  Register now ↗
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
              <p className="mt-4 text-sm text-[#9CA3AF]">
                Defcomm's core strategies focus on innovation, talent growth, and strengthening the security of defence technologies across the continent.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {strategies.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex flex-col justify-between rounded-xl bg-[#131516] p-8 transition-colors hover:bg-[#1A1D1F]"
                >
                  <div>
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#1E2415] text-sm font-bold text-[#9FC24D] border border-[#2C351F]">
                      {item.id}
                    </div>
                    <h3 className="mb-4 text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#9CA3AF]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Defence Innovation Section (Image 1 Style) --- */}
        <section className="bg-[#0B0D0F] py-24 px-6 border-y border-[#1B1F2A]">
           <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                 <h2 className="text-3xl font-bold text-white">Defence Innovation and <br/> Cyber Readiness</h2>
                 <p className="mt-4 text-sm text-[#9CA3AF] max-w-2xl mx-auto">
                   Building Africa's resilience with modern defence-tech solutions, ethical security research, and structured collaboration.
                 </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                 {/* Text Content */}
                 <div className="rounded-3xl bg-[#131611] border border-[#1F2611] p-10 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-4">Core Defence & Cyber Innovation</h3>
                    <p className="text-sm leading-relaxed text-[#B6C197]">
                      Advancing modern, scalable technologies that strengthen Africa's defence ecosystem. From drone development and smart surveillance systems to cybersecurity tools and software that tracks weapons and threats, Defcomm supports reliable operations, improves situational awareness, and enables smarter, faster responses to emerging security challenges.
                    </p>
                 </div>

                 {/* Icon Grid */}
                 <div className="grid grid-cols-2 gap-6">
                    {innovations.map((inv, i) => (
                       <div key={i} className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-[#131516] border border-[#1F2611] p-10 hover:border-[#9FC24D]/30 transition-colors group">
                          <inv.icon 
                            size={48} 
                            strokeWidth={1} 
                            className="text-[#9CA3AF] group-hover:text-[#9FC24D] transition-colors" 
                          />
                          {/* <span className="text-xs uppercase tracking-widest text-[#5E667B]">{inv.label}</span> */}
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* --- FAQ & Contact Section --- */}
        <section className="py-24 px-6 mx-auto max-w-7xl">
           <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Frequently asked questions.</h2>
              <p className="mt-2 text-sm text-[#9CA3AF]">Find quick answers to the most common questions about the Defcomm program.</p>
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
                        <span className="text-sm font-medium text-white">{faq.question}</span>
                        {openFaqIndex === index ? (
                           <Minus size={16} className="text-[#9FC24D]" />
                        ) : (
                           <Plus size={16} className="text-[#9CA3AF]" />
                        )}
                      </button>
                      
                      {openFaqIndex === index && (
                        <div className="pb-4 text-xs leading-relaxed text-[#9CA3AF] animate-in fade-in slide-in-from-top-2 duration-200">
                           {faq.answer}
                        </div>
                      )}
                   </div>
                 ))}
              </div>

              {/* Right: Contact Form */}
              <div className="rounded-3xl bg-[#E6E6E6] p-8 text-[#1A1D21] shadow-xl">
                 <h3 className="text-lg font-bold uppercase tracking-tight mb-2">GET IN TOUCH</h3>
                 <p className="text-xs text-[#5E667B] mb-8">
                   Reach out with inquiries about Sponsorships, partnerships, or event details.
                 </p>

                 <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                       <label className="block text-xs text-[#5E667B] mb-1 pl-1">Name</label>
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
                       <label className="block text-xs text-[#5E667B] mb-1 pl-1">Email</label>
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
                       <label className="block text-xs text-[#5E667B] mb-1 pl-1">Subject</label>
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
                       <label className="block text-xs text-[#5E667B] mb-1 pl-1">Message</label>
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
                         className="rounded-full bg-[#4E6413] px-8 py-3 text-xs font-bold text-[#E2E8F0] shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
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
