import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bugBounty from "../assets/images/defensetech.png"; // Placeholder for the node diagram
import shieldBg from "../assets/images/Group-1450.svg";
import agendaMap from "../assets/images/Frame-34.png"; // Placeholder for the map background
import speaker1 from "../assets/images/fb.png";
import fallbackImg from '../assets/images/fb.png';
import Footer from "../components/Footer";
import sponsor2 from '../assets/images/sponsor2.png';
import sponsor3 from '../assets/images/sponsor4.png';
import sponsor5 from '../assets/images/sponsor5.png';
import sponsor7 from '../assets/images/sponsor7.png';
import { useReveal } from "../hooks/useReveal";
import linkedIn from '../assets/images/linkedIn.svg';
import instagram from '../assets/images/instagram.svg';
import youtube from '../assets/images/youtube.svg';
import { FaXTwitter } from "react-icons/fa6";
import { 
  Satellite, 
  Smartphone, 
  Radio, 
  Watch, 
  Plane, 
  ShieldCheck 
} from "lucide-react";


const sponsors = [
  { id: 1, img: sponsor3, link: '#' },
  { id: 2, img: sponsor2, link: '#' },
  { id: 3, img: sponsor5, link: '#' },
  { id: 4, img: sponsor7, link: 'https://aipressroom.com' },
  { id: 5, img: sponsor3, link: '#' },
  { id: 6, img: sponsor2, link: '#' },
  { id: 7, img: sponsor5, link: '#' },
  { id: 8, img: sponsor7, link: 'https://aipressroom.com' },
]

const socialLinks = [
  { label: "Twitter", href: "https://x.com/defcomms?s=21" },
  { label: "LinkedIn", icon: linkedIn, href: "https://www.linkedin.com/company/defcomm-solutions/" },
  { label: "Instagram", icon: instagram, href: "https://www.instagram.com/defcomm_solution?igsh=MWhuYzF5bGJ1ZnFlbQ==" },
  { label: "YouTube", icon: youtube, href: "https://youtube.com/@defcommng?si=ij0cqN_d63D4xkBf" }
];

const impactBullets = [
  "Defence-grade secure communication devices with hardened OS and controlled environments",
  "End-to-end encryption for mission-critical communications",
  "Direct-to-satellite connectivity enabling beyond-line-of-coverage operations",
  "Rapid deployment architecture with minimal reliance on ground infrastructure"
];

const agendaItems = [
  { label: "March 2026", title: "Pre Event", time: "Private briefings and threat modelling" },
  { label: "March 5", title: "Event Day", time: "Strategy labs · 09:30 – 18:00" },
  { label: "March 5, 2026", title: "Event Day", time: "CTF finals · 09:30 – 18:00" }
];

const speakerCardStyles = {
  text: {
    light: "bg-[#E3E4E9] text-[#1B1F24]",
    accent: "bg-linear-to-br from-[#1F3513] via-[#3C7A19] to-[#89D12F] text-white"
  },
  image: "bg-[#202227]"
};

const speakerCards = [
  { type: "text", name: "", role: "Chief AI Scientist, OpenAI", variant: "light" },
  { type: "image", name: "Dr. Emily Carter", image: speaker1 },
  { type: "text", name: "", role: "CTO, DeepMind", variant: "accent" },
  { type: "image", name: "Elon Park", image: speaker1 },
  { type: "image", name: "Laura Kim", image: speaker1 },
  { type: "text", name: "", role: "AI Policy Advisor, EU Commission", variant: "accent" },
  { type: "image", name: "Dr. Alan Foster", image: speaker1 },
  { type: "text", name: "", role: "Stanford AI Lab", variant: "accent" }
];

const sponsorReasons = [
  { title: "Exclusive Access", body: "Defence agencies & enterprise buyers. 1-on-1 briefings.", number: "01" },
  { title: "Innovation Credibility", body: "Innovation credibility, strategic tech halo.", number: "02" },
  { title: "Top Talents", body: "Recruit the top cyber talent through the bounty arena.", number: "03" },
  { title: "Strategic Positioning", body: "Strategic platform to seed, advise, and direct digital operations for West African resilience.", number: "04" }
];

const contactDetails = {
  phones: ["+234 803 697 5198", "+44 746 347 4337", "+234 703 220 5576"],
  email: "business@defcomm.ng",
};

export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  const heroRef = useReveal({ threshold: 0.2 });
  const logosRef = useReveal({ threshold: 0.25 });
  const highlightsRef = useReveal({ threshold: 0.25 });
  const agendaRef = useReveal({ threshold: 0.25 });
  const speakersRef = useReveal({ threshold: 0.2 });
  const sponsorsRef = useReveal({ threshold: 0.2 });
  const contactRef = useReveal({ threshold: 0.2 });

  useEffect(() => {
    const target = new Date("2026-03-05T09:30:00").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0")
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#060706] text-white">
      <Helmet>
        <title>Defcomm | Africa’s Defense Tech Vision and Bug Bounty Program</title>
        <meta
          name="description"
          content="Defcomm leads Africa’s defense technology vision by accelerating innovation, strengthening cybersecurity, and empowering talented researchers through structured bug bounty challenges and modern defense tech initiatives."
        />
      </Helmet>

      {/* --- NEW HERO SECTION START --- */}
      <section
        id="hero"
        ref={heroRef}
        className="reveal-section relative flex flex-col justify-between bg-[#050605] overflow-hidden"
      >
        {/* Background Map Effect - Right aligned */}
        <div className="absolute right-0 top-0 h-full w-full lg:w-3/5 opacity-20 pointer-events-none">
          <img
            src={agendaMap}
            alt="Map Background"
            className="h-full w-full object-cover grayscale opacity-50"
          />
        </div>

        {/* Decorative Grid/Lines (Optional) */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(#1A230A 1px, transparent 1px), linear-gradient(90deg, #1A230A 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex-grow flex items-center px-6 pt-4 md:pt-6 pb-12 sm:px-10 lg:px-16">
          <div className="w-full grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-8 items-center">

            {/* Left Side: Typography & Buttons */}
            <div className="flex flex-col gap-8 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-[#6EA633] font-bold text-2xl lg:text-3xl tracking-wide uppercase font-sans">
                  Theme
                </h3>
                <h1 className="text-white font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-wide">
                  Securing 
                  Communications, <br />
                  Systems, and Skies.
                </h1>
              </div>

              {/* The "Live Testing / Challenge" Pills */}
              <div className="relative flex flex-col items-start pt-4 pl-2">
                {/* Connecting Line (Simulated) */}
                <div className="hidden lg:block absolute left-[85%] top-1/2 w-48 h-[2px] bg-[#6EA633]/50 -z-10 transform rotate-12 origin-left"></div>

                <div className="relative z-20">
                  <div className="bg-white text-[#6EA633] border-2 border-white px-8 py-3 rounded-full font-black text-lg sm:text-xl uppercase transform -rotate-2 shadow-[0_10px_20px_rgba(0,0,0,0.3)] inline-block">
                    Live Testing
                  </div>
                </div>
                <div className="relative z-10 -mt-3 ml-2">
                  <div className="bg-[#6EA633] text-black border-2 border-[#6EA633] px-10 py-4 rounded-full font-black text-xl sm:text-2xl uppercase transform rotate-1 shadow-[0_15px_30px_rgba(110,166,51,0.3)] inline-block">
                    Challenge
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Node Diagram Visual */}
            {/* Right Side: Node Diagram Visual */}
            <div className="relative hidden sm:flex items-center justify-center lg:justify-end w-full h-[500px] lg:h-[600px]">
              
              {/* Diagram Container */}
              <div className="relative w-full max-w-[550px] aspect-square">
                
                {/* SVG Connecting Lines Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 drop-shadow-[0_0_10px_rgba(158,203,50,0.3)]">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3F550F" />
                      <stop offset="100%" stopColor="#9ECB32" />
                    </linearGradient>
                  </defs>
                  
                  {/* Center to Drone (Top) */}
                  <path d="M50% 50% Q55% 30% 55% 15%" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                  
                  {/* Center to Privacy Phone (Right) */}
                  <path d="M50% 50% Q70% 45% 85% 40%" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                  
                  {/* Center to Tower (Bottom Right) */}
                  <path d="M50% 50% Q65% 65% 75% 75%" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                  
                  {/* Center to Watch (Bottom Left) */}
                  <path d="M50% 50% Q40% 65% 35% 75%" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                  
                  {/* Center to Secure OS (Left) */}
                  <path d="M50% 50% Q30% 45% 15% 40%" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />

                  {/* Line trailing off to the left (Simulating connection to 'Challenge' button) */}
                  <path d="M15% 40% Q5% 45% -10% 50%" fill="none" stroke="#9ECB32" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="5,5" />
                </svg>

                {/* --- NODES --- */}

                {/* 1. Center Node: Satellite Connectivity */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#9ECB32] bg-[#050605] shadow-[0_0_40px_rgba(158,203,50,0.2)]">
                    <Satellite className="h-12 w-12 text-[#9ECB32] animate-pulse" strokeWidth={1.5} />
                    {/* Inner spinning ring effect */}
                    <div className="absolute inset-2 rounded-full border border-[#9ECB32]/30 border-t-transparent animate-spin-slow"></div>
                  </div>
                  <span className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-white">
                    Satellite Connectivity
                  </span>
                </div>

                {/* 2. Top Node: Drone */}
                <div className="absolute top-[5%] left-[55%] -translate-x-1/2 z-20 flex flex-col items-center w-40">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#9ECB32] bg-[#0B0E07]">
                    <Plane className="h-8 w-8 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="mt-3 text-center text-[10px] font-medium leading-tight text-[#D7E4BB]">
                    Autonomous Drone<br />Security Frameworks
                  </span>
                </div>

                {/* 3. Right Node: Privacy Phone */}
                <div className="absolute top-[30%] left-[85%] -translate-x-1/2 z-20 flex flex-col items-center w-32">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#9ECB32] bg-[#0B0E07]">
                    {/* Using double ring for privacy phone look */}
                    <div className="h-14 w-14 rounded-full border border-[#9ECB32]/50 flex items-center justify-center">
                       <Smartphone className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <span className="mt-3 text-center text-[10px] font-medium leading-tight text-[#D7E4BB]">
                    Defcomm privacy<br />phone
                  </span>
                </div>

                {/* 4. Bottom Right Node: Secure Comms */}
                <div className="absolute top-[75%] left-[75%] -translate-x-1/2 z-20 flex flex-col items-center w-36">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#9ECB32] bg-[#0B0E07]">
                    <Radio className="h-8 w-8 text-[#9ECB32]" strokeWidth={1.5} />
                  </div>
                  <span className="mt-3 text-center text-[10px] font-medium leading-tight text-[#D7E4BB]">
                    Secure<br/>Communications
                  </span>
                </div>

                {/* 5. Bottom Left Node: Watch */}
                <div className="absolute top-[75%] left-[35%] -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#9ECB32] bg-[#0B0E07]">
                    <Watch className="h-7 w-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* 6. Left Node: Secure OS */}
                <div className="absolute top-[32%] left-[15%] -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="flex h-24 w-16 flex-col items-center justify-center rounded-[20px] border-2 border-[#9ECB32] bg-[#0B0E07]">
                    <ShieldCheck className="h-6 w-6 text-[#9ECB32] mb-1" strokeWidth={1.5} />
                    <div className="h-1 w-6 rounded-full bg-[#36460A]"></div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="block text-lg font-black tracking-widest text-[#9ECB32]">DOS</span>
                    <span className="text-[10px] font-medium text-[#D7E4BB]">Defcomm Secure OS</span>
                  </div>
                </div>

              </div>
          
            </div>
          </div>
        </div>

        {/* Hero Footer: Timer & Slogan */}
        <div className="relative z-20 w-full border-t border-[#1F2A10] bg-[#050605] py-6 px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Timer */}
            <div className="flex items-center gap-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono tracking-wider">
              <span className="tabular-nums">{timeLeft.days}</span>
              <span className="text-[#6EA633] pb-2">:</span>
              <span className="tabular-nums">{timeLeft.hours}</span>
              <span className="text-[#6EA633] pb-2">:</span>
              <span className="tabular-nums">{timeLeft.minutes}</span>
              <span className="text-[#6EA633] pb-2">:</span>
              <span className="tabular-nums">{timeLeft.seconds}</span>
            </div>

            {/* Slogan */}
            <div className="text-right hidden md:block">
              <p className="text-white italic text-lg sm:text-xl font-bold tracking-wide">
                Fortifying Africa's Cyber Defenses
              </p>
            </div>
             {/* Mobile Slogan */}
            <div className="block md:hidden text-center">
              <p className="text-white italic text-base font-bold tracking-wide">
                Fortifying Africa's Cyber Defenses
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* --- NEW HERO SECTION END --- */}

      <section
          id="speakers"
          ref={speakersRef}
          className="reveal-section mt-24 flex flex-col gap-14 rounded-[55px] border border-[#3A3D42] bg-[#2B2E32] px-6 py-16 sm:px-10 lg:px-16"
        >
          <div className="reveal-child flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between" style={{ "--reveal-child-delay": "0.1s" }}>
            <div className="space-y-6">
              <h2 className="text-5xl font-black uppercase leading-none text-white sm:text-[3.75rem]">
                <span className="relative inline-block">
                  <span>Keynote</span>
                  <span className="absolute left-0 -bottom-3 h-2 w-full rounded-full bg-[#89D12F]"></span>
                </span>
                <br />
                <span className="relative mt-4 inline-block">
                  <span>Speakers</span>
                  <span className="absolute left-0 -bottom-3 h-2 w-full rounded-full bg-[#89D12F]"></span>
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#D8DCE4] lg:text-right">
              Meet the industry leaders shaping the future of Cyber security.
            </p>
          </div>

          <div className="py-4">
            <div className="flex gap-6 sm:gap-6 overflow-x-auto sm:overflow-x-visible w-full no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {speakerCards.map((card, index) => {
                const delay = 0.18 + index * 0.06;
                if (card.type === "text") {
                  const hasName = card.name && card.name.trim() !== "";
                  return (
                    <article
                      key={`${card.name || "no-name"}-text-${index}`}
                      className={`reveal-child flex flex-col justify-between rounded-[40px] p-6 sm:p-8 shadow-[0_25px_60px_rgba(5,7,9,0.35)] min-w-60 sm:min-w-auto ${speakerCardStyles.text[card.variant ?? "light"]}`}
                      style={{ "--reveal-child-delay": `${delay}s` }}
                    >
                      {hasName ? (
                        <>
                          <h3 className="text-lg sm:text-2xl font-semibold tracking-tight">
                            {card.name}
                          </h3>
                          <p className={`text-sm sm:text-base leading-relaxed ${card.variant === "light" ? "text-[#4A4F58]" : "text-white/80"}`}>
                            {card.role}
                          </p>
                        </>
                      ) : (
                        <div className="flex flex-1 items-center justify-center">
                          <img
                            src={fallbackImg}
                            alt="Speaker placeholder"
                            className="max-h-[70%] max-w-[70%] object-contain opacity-90"
                          />
                        </div>
                      )}
                    </article>
                  );
                }
                return (
                  <article
                    key={`${card.name || "no-name"}-image-${index}`}
                    className={`reveal-child overflow-hidden rounded-[40px] shadow-[0_25px_60px_rgba(5,7,9,0.35)] min-w-60 sm:min-w-auto ${speakerCardStyles.image}`}
                    style={{ "--reveal-child-delay": `${delay}s` }}
                  >
                    <img
                      src={card.image || fallbackImg}
                      alt={card.name || "Speaker"}
                      className="h-full w-full object-cover"
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>


      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-24 pt-10 sm:px-10 lg:gap-20 lg:px-0">
        
        {/* Sponsors Strip */}
        <div
          ref={logosRef}
          className="flex items-center justify-between gap-8 reveal-section rounded-[45px] border border-[#1E2A0A] bg-[#0E1309]/70 px-6 py-8 backdrop-blur-md sm:px-10 overflow-x-auto no-scrollbar"
          style={{ "--reveal-delay": "0.15s" }}
        >
          {sponsors.map((spons) => (
            <div key={spons.id} className="min-w-[120px] max-h-24 flex items-center justify-center">
              <a href={spons.link} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center">
                <img
                  src={spons.img}
                  alt="Sponsor logos"
                  className="w-auto h-12 object-contain grayscale brightness-200 opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          ))}
        </div>

        <section
          id="highlights"
          ref={highlightsRef}
          className="reveal-section grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article
            className="reveal-child flex h-full flex-col justify-between rounded-[45px] bg-[#85AB20] p-10 text-[#102206] shadow-[0_45px_90px_rgba(133,171,32,0.35)]"
            style={{ "--reveal-child-delay": "0.05s" }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-[2.6rem]">
                Fortifying Africa’s Digital Defence Sovereignty
              </h2>
              <p className="text-base leading-relaxed text-[#173008]">
                Africa’s security landscape is rapidly evolving, driven by digital transformation, emerging cyber threats, and the increasing reliance on connected systems across defence, government, and critical infrastructure. Fortifying Africa’s Digital Defence Future represents a strategic commitment to strengthening the continent’s resilience through indigenous technology, secure innovation, and collaborative defence ecosystems.
<br /><br />This vision emphasizes the development and deployment of secure communications, cybersecurity capabilities, wargaming and simulation technologies, and resilient digital infrastructure tailored to Africa’s unique operational environments. It prioritizes sovereignty, trust, and readiness, ensuring that sensitive defence and security operations remain protected from external interference and evolving cyber risks.

              </p>
            </div>
            <a
  href="/Bug Bounty Slide Deck (with Sponsors).pdf"
  download="Bug Bounty Slide Deck (with Sponsors).pdf"
  className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-black/20 bg-[#f7f7f7] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
>
  <span className="text-black">Download slide deck →</span>
</a>
          </article>

          <div className="grid gap-8 lg:grid-cols-1">
            <article
              className="reveal-child rounded-[45px] bg-linear-to-br from-[#36460A] to-[#85AB20] p-10 text-white shadow-[0_35px_70px_rgba(24,34,11,0.55)]"
              style={{ "--reveal-child-delay": "0.18s" }}
            >
              <h3 className="text-2xl font-bold leading-snug">
                Why Operation Iron Shield?
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-[#F4FCE8]">
                Defcomm's flagship programme harmonises strategic intelligence, live bounty testing, and rapid deployment teams to lock down the next frontier of digital sovereignty.
              </p>
            </article>

            <article
              className="reveal-child rounded-[45px] border border-[#E6EEDF] bg-[#F6FBF0] p-10 text-[#1A2A08] shadow-[0_35px_60px_rgba(16,22,10,0.15)]"
              style={{ "--reveal-child-delay": "0.28s" }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7A8C3A]">
                Programme Highlights
              </p>
              <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-[#1C2810]">
                {impactBullets.map((item, index) => (
                  <li
                    key={item}
                    className="reveal-child flex gap-3"
                    style={{ "--reveal-child-delay": `${0.35 + index * 0.07}s` }}
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#85AB20]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section
          id="agenda"
          ref={agendaRef}
          className="reveal-section mt-24 flex flex-col gap-16 rounded-[55px] border border-[#1F2611] bg-[#131516] px-6 py-16 sm:px-10 lg:px-16"
        >
          <div className="reveal-child flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between" style={{ "--reveal-child-delay": "0.08s" }}>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-[0.3em] text-white sm:text-5xl">
                Agenda
              </h2>
              <p className="mt-4 max-w-md text-sm text-[#B6C197]">
                Two days engineered around reconnaissance, live testing, and collaborative defence frameworks across the continent.
              </p>
            </div>
            <p className="text-right text-xs uppercase tracking-[0.35em] text-[#7D8A5A]">
              March 5, 2026 ·
            </p>
          </div>

          <div className="reveal-child relative overflow-hidden rounded-[48px] border border-[#2C3218] bg-[#1A1D1D]/90 p-10 shadow-[0_35px_90px_rgba(6,10,6,0.6)]" style={{ "--reveal-child-delay": "0.2s" }}>
            <div className="pointer-events-none absolute inset-0 opacity-80">
              <img src={agendaMap} alt="African map" className="h-full w-full object-cover" />
            </div>
            <div className="relative z-10 grid gap-8 text-sm text-[#F3F7E8] lg:grid-cols-2">
              {agendaItems.map(({ label, title, time }, index) => (
                <div
                  key={label}
                  className="reveal-child flex flex-col gap-2"
                  style={{ "--reveal-child-delay": `${0.28 + index * 0.08}s` }}
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-[#C7E27A]">
                    {label}
                  </span>
                  <h3 className="text-2xl font-semibold text-white">{title}</h3>
                  <p className="text-sm text-[#DEE7C8]">{time}</p>
                </div>
              ))}
            </div>
            <div className="relative z-10 mt-10 flex justify-center">
              <Link
                to="/register"
                className="reveal-child inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-[#10150A] shadow-[0_15px_40px_rgba(133,171,32,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(90deg, #3F550F 0%, #9ECB32 100%)" }}
              >
                View in executive reader →
              </Link>
            </div>
          </div>
        </section>

        
        <section
          id="sponsors"
          ref={sponsorsRef}
          className="reveal-section mt-24 flex flex-col gap-14 rounded-[55px] border border-[#1D2115] bg-[#101213] px-6 py-16 sm:px-10 lg:px-16"
        >
          <div className="reveal-child flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between" style={{ "--reveal-child-delay": "0.08s" }}>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-[0.3em] text-white sm:text-5xl">
                Why Sponsor?
              </h2>
              <p className="mt-4 max-w-xl text-sm text-[#B6C197]">
                Discover what makes Bug Bounty the ideal event to sponsor.
              </p>
            </div>
            <p className="max-w-sm text-right text-xs uppercase tracking-[0.32em] text-[#7D8A5A]">
              Discover what makes bug bounty the ideal event to sponsor.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {sponsorReasons.map(({ title, body, number }, index) => (
              <article
                key={number}
                className="reveal-child group flex flex-col justify-between gap-6 rounded-[36px] bg-[#1A1D1F] p-8 text-white shadow-[0_30px_70px_rgba(10,12,12,0.45)] transition-transform duration-300 hover:-translate-y-1"
                style={{ "--reveal-child-delay": `${0.18 + index * 0.08}s` }}
              >
                <div className="flex flex-col gap-4">
                  <span className="text-5xl font-black tracking-tight text-[#9ECB32]">{number}</span>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.15em] text-white">
                    {title}
                  </h3>
                </div>
                <p className="text-sm text-[#DDE5C8]">{body}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="reveal-child flex flex-col gap-3 text-white" style={{ "--reveal-child-delay": "0.38s" }}>
              <h3 className="text-4xl font-black uppercase tracking-[0.25em] sm:text-5xl">
                Register Now
              </h3>
              <p className="max-w-lg text-sm text-[#B6C197]">
                Secure your spot at the Bug Bounty programme 2025 and join the future of cyber security.
              </p>
            </div>

            <div className="reveal-child relative overflow-hidden rounded-[48px] border border-[#242A1A] bg-[#0F1011] p-10 shadow-[0_35px_80px_rgba(8,10,5,0.55)]" style={{ "--reveal-child-delay": "0.46s" }}>
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <img src={shieldBg} alt="Circuit overlay" className="h-full w-full object-cover" />
              </div>
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-[#9ECB32]">
                    Event begins in...
                  </span>
                  <div className="flex flex-wrap items-baseline gap-6 text-[#F4F8E8]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl font-black tracking-widest">{timeLeft.days}</span>
                      <span className="text-xs uppercase tracking-[0.4em] text-[#7D8A5A]">Days</span>
                    </div>
                    <span className="text-5xl font-light text-[#495024]">:</span>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl font-black tracking-widest">{timeLeft.hours}</span>
                      <span className="text-xs uppercase tracking-[0.4em] text-[#7D8A5A]">Hours</span>
                    </div>
                    <span className="text-5xl font-light text-[#495024]">:</span>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl font-black tracking-widest">{timeLeft.minutes}</span>
                      <span className="text-xs uppercase tracking-[0.4em] text-[#7D8A5A]">Minutes</span>
                    </div>
                    <span className="text-5xl font-light text-[#495024]">:</span>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl font-black tracking-widest">{timeLeft.seconds}</span>
                      <span className="text-xs uppercase tracking-[0.4em] text-[#7D8A5A]">Seconds</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    to="/register"
                    className="reveal-child inline-flex items-center justify-center rounded-full border border-[#9ECB32] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#1A220D] shadow-[0_18px_45px_rgba(133,171,32,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(90deg, #3F550F 0%, #9ECB32 100%)" }}
                  >
                    Register now ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={contactRef}
          className="reveal-section mt-24 flex flex-col gap-14 rounded-[55px] border border-[#1E1F23] bg-[#0D0F10] px-6 py-16 sm:px-10 lg:px-16"
        >
          <div className="reveal-child flex flex-col gap-10 lg:flex-row lg:gap-16" style={{ "--reveal-child-delay": "0.08s" }}>
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-[0.25em] text-white sm:text-5xl">
                  We're Here To Connect And Assist You
                </h2>
                <p className="max-w-lg text-sm text-[#C7D2B7]">
                  Have questions about the Programme? Need help with registration or travel? Our team is ready to assist you.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="reveal-child space-y-3" style={{ "--reveal-child-delay": "0.2s" }}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9ECB32]">Contact Us</h3>
                  <ul className="space-y-2 text-sm text-[#E9F0DA]">
                    {contactDetails.phones.map((phone, index) => (
                      <li
                        key={phone}
                        className="reveal-child"
                        style={{ "--reveal-child-delay": `${0.26 + index * 0.06}s` }}
                      >
                        {phone}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="reveal-child space-y-3" style={{ "--reveal-child-delay": "0.32s" }}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9ECB32]">Event Location</h3>
                  <p className="text-sm text-[#E9F0DA]">
                    {contactDetails.address}
                  </p>
                </div>
                <div className="reveal-child space-y-3" style={{ "--reveal-child-delay": "0.38s" }}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9ECB32]">Email</h3>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="block text-sm font-medium text-[#F4F9E6] underline-offset-4 hover:underline"
                  >
                    {contactDetails.email}
                  </a>
                </div>
                <div className="reveal-child space-y-3" style={{ "--reveal-child-delay": "0.44s" }}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9ECB32]">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    {socialLinks.map(({ label, href, icon }, index) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reveal-child inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:border-[#9ECB32] hover:text-[#9ECB32]"
                        style={{ "--reveal-child-delay": `${0.5 + index * 0.05}s` }}
                      >
                        {icon ? <img src={icon} alt={label} /> : <FaXTwitter />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="reveal-child rounded-[36px] border border-[#2B2D31] bg-[#F2F3F8] p-8 text-[#1B2126] shadow-[0_30px_70px_rgba(7,8,9,0.45)]" style={{ "--reveal-child-delay": "0.28s" }}>
                <h3 className="text-lg font-bold uppercase tracking-[0.25em]">Get In Touch</h3>
                <p className="mt-3 text-sm text-[#4B545E]">
                  Reach out with inquiries about sponsorships, partnerships, or event details.
                </p>
                <form className="mt-8 space-y-5">
                  {[
                    { name: "name", label: "Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "subject", label: "Subject", type: "text" }
                  ].map(({ name, label, type }) => (
                    <label key={name} className="block space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6B7683]">{label}</span>
                      <input
                        type={type}
                        name={name}
                        className="w-full rounded-2xl border border-[#D9DBE1] bg-white px-4 py-3 text-sm text-[#20252B] shadow-inner focus:border-[#9ECB32] focus:outline-none"
                        placeholder={label}
                      />
                    </label>
                  ))}
                  <label className="block space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6B7683]">Message</span>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full rounded-2xl border border-[#D9DBE1] bg-white px-4 py-3 text-sm text-[#20252B] shadow-inner focus:border-[#9ECB32] focus:outline-none"
                      placeholder="Message"
                    ></textarea>
                  </label>
                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-[#36460A] bg-[#7EA522] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div
            className="reveal-child overflow-hidden rounded-[45px] border border-[#1F2227] bg-[#0B0C0E]"
            style={{ "--reveal-child-delay": "0.5s" }}
          >
            <iframe
              title="Shehu Musa Yar'Adua Center map"
              src="https://www.google.com/maps?q=9.0468,7.4867&z=16&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div >
  );
  }
