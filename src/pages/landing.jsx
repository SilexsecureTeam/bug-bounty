import React, { useState, useEffect } from "react";
import bugBounty from "../assets/images/bug-bounty-logo.png";
import shieldBg from "../assets/images/Group-1450.svg";
import speaker1 from "../assets/images/image-1.png";
import speaker2 from "../assets/images/image-2.png";
import speaker3 from "../assets/images/image-3.png";
import speaker4 from "../assets/images/image-4.png";
import Logotypes from "../assets/images/Logotypes.png";


export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date("2025-12-01T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="bg-[#1c1c1c] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#1d1d1d] to-[#252525] text-white overflow-hidden">
        {/* Background Image */}
 <img
  src={shieldBg}
  alt="Shield Background"
  className="absolute w-[916px] h-[817.5px] top-[108px] left-[493px] opacity-100 object-contain pointer-events-none select-none"
/>
 

    <p
  className="absolute w-[247px] h-[30px] top-[140px] left-[100px] text-white font-bold"
  style={{
    fontFamily: 'Montserrat Alternates',
    fontSize: '22px',
    lineHeight: '30px',
    letterSpacing: '0%',
  }}
>
  DECEMBER 4-5, 2025
</p>
<p
  className="absolute w-[527px] h-[30px] top-[150px] left-[753px] text-right text-white font-bold"
  style={{
    fontFamily: 'Montserrat Alternates',
    fontSize: '22px',
    lineHeight: '30px',
    letterSpacing: '0%',
  }}
>
  Shehu Musa Yar'Adua Center, Abuja, Nigeria
</p>


         <img
  src={bugBounty}
  alt="Bug Bounty Programme"
  className="absolute w-[639.22px] h-[281.89px] top-[250px] left-[100px] opacity-100 object-contain select-none pointer-events-none"
/>

     <a
  href="/register"
  className="absolute flex items-center justify-center w-[307px] h-[74px] top-[650px] left-[139px] gap-[20px] px-[50px] rounded-[100px] text-black font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300"
  style={{
    background: 'linear-gradient(90deg, #36460A 0%, #9ecb32 100%)',
    opacity: 1,
  }}
>
  Register now ↗
</a>
      </section>

      {/* Info Section */}
<section className="bg-[#1c1c1c] text-white px-8 md:px-16 pt-24 relative z-10">
  <div className="flex flex-col space-y-12">
    {/* Line at top of section */}
    <div className="w-full border-t-3 border-[#85AB20]"></div>

    {/* Button container */}
    <div className="flex justify-start pl-[12px]">
      <button
        className="bg-gradient-to-r from-[#36460A] to-[#85AB20] text-white font-semibold py-[10px] px-[24px] rounded-full flex items-center gap-[10px]"
      >
        Sponsors
        <span className="transform rotate-45">↑</span>
      </button>
    </div>

    {/* Logos Image */}
    <div className="flex justify-center items-center">
      <img
        src={Logotypes}
        alt="Sponsors Logos"
        className="object-contain w-[90%] max-w-[1619px] h-[45px]"
      />
    </div>

    {/* Cards Grid */}
<div className="max-w-[2000px] mx-auto mt-4 flex md:flex-row justify-between items-start gap-8 overflow-visible">

  {/* Left Card */}
  <div
    className="bg-[#85AB20] text-black rounded-[50px] shadow-lg flex-shrink-0 transform transition-transform duration-300 hover:scale-105"
    style={{
      width: "290px",
      height: "350px",
      padding: "32px",
      opacity: 1,
    }}
  >
    <h2 className="text-2xl font-bold mb-6">
      <span className="text-white">Fortifying</span> <br />
      <span className="text-[#36450D]">Africa's Digital Future</span>
    </h2>
    <p className="text-base leading-relaxed mb-10">
      <span className="font-bold">Operation Iron Shield</span> brings together cybersecurity researchers, defence organizations, and government leaders for two days of live bounty testing, defense-tech demonstrations, and innovation showcases.
    </p>
    <a
      href="#"
      className="inline-flex items-center gap-2 text-white rounded-full hover:bg-[#2a340a] transition-all"
      style={{
        backgroundColor: "#36450D",
        border: "1px solid #000",
        marginTop: "30px",
        padding: "10px 20px",
      }}
    >
      Download Slide Deck →
    </a>
  </div>

  {/* Right Cards Stack */}
  <div className="flex flex-col justify-between gap-8">
    {/* Top Right Card */}
    <div
      className="bg-gradient-to-b from-[#36460A] to-[#85AB20] rounded-[50px] p-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
      style={{
        width: "450px",
        height: "250px",
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-white">
        <span className="font-bold">Why</span> <br /> Operation Iron Shield?
      </h2>
      <p className="text-sm text-gray-100 leading-relaxed">
        Operation Iron Shield is the official Bug Bounty Programme of Defcom Solutions, serving as a cybersecurity challenge and innovation showcase.
      </p>
    </div>

    {/* Bottom Right Card */}
    <div
      className="bg-white text-black rounded-[50px] p-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
      style={{
        width: "290px",
        height: "350px",
        opacity: 1,
      }}
    >
      <p className="text-sm leading-relaxed">
        The programme integrates <b>bounty testing</b>, <b>live demonstrations</b>, and <b>innovation exhibitions</b>.
      </p>
      <ul className="list-disc list-inside mt-4 space-y-1 text-sm">
        <li>1,500+ active participants from 10 nations</li>
        <li>$200,000+ in prizes and innovation grants</li>
        <li>Live hacking of Defcomm's Secure OS, Encrypted Drones, and Privacy Phones</li>
        <li>Strategic panels on encryption sovereignty and cyber resilience</li>
      </ul>
    </div>
  </div>
</div>
</div>
  
</section>


      {/* Agenda Section */}
      <section
        className="relative text-white py-24 px-8 md:px-16 bg-cover bg-center"
        style={{ backgroundImage: "url('../assets/images/group-1451.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">AGENDA</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lime-400 text-lg font-semibold">
                DAY 1 – December 4, 2025
              </h3>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li>09:00 – Opening Ceremony</li>
                <li>10:30 – Keynote: The Future of African Cyber Defence</li>
                <li>12:00 – Lunch & Networking</li>
                <li>14:00 – Live Hacking Demonstrations</li>
                <li>16:00 – Panel: Sovereign Encryption Challenges</li>
              </ul>

              <h3 className="text-lime-400 text-lg font-semibold mt-10">
                DAY 2 – December 5, 2025
              </h3>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li>09:00 – Capture the Flag (CTF) Challenge</li>
                <li>12:00 – Lunch Break</li>
                <li>13:30 – Innovation Showcase</li>
                <li>15:30 – Award Ceremony</li>
                <li>17:00 – Closing Remarks</li>
              </ul>
            </div>

            {/* Right column */}
            <div className="flex items-center justify-center">
              <div className="bg-lime-500/10 border border-lime-500/30 p-8 rounded-2xl w-full md:w-3/4 text-center">
                <p className="text-gray-300 text-sm">
                  Explore 2 days of cybersecurity excellence, live demos,
                  and collaboration between Africa’s top ethical hackers
                  and defense experts.
                </p>
                <a
                  href="#"
                  className="mt-6 inline-block bg-lime-500 hover:bg-lime-400 text-black font-semibold px-6 py-3 rounded-full transition-all"
                >
                  View detailed schedule →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="py-24 px-8 md:px-16 bg-[#0b0b0b] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Keynote <span className="text-lime-400">Speakers</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[speaker1, speaker2, speaker3, speaker4].map((img, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img src={img} alt={`Speaker ${i + 1}`} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-lime-400">
                    {["Dr. Emily Carter", "Elon Park", "Laura Kim", "Dr. Alan Foster"][i]}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {["Chief AI Scientist, OpenAI", "CTO, DeepMind", "AI Policy Advisor, EU Commission", "Standard AI Lab"][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <a href="#" className="hover:text-lime-300 font-semibold mt-6 inline-block">
          And more →
        </a>
      </section>

      {/* Register Now Section (Countdown) */}
      <section className="relative py-24 px-8 md:px-16 bg-[#0b0b0b] text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-lime-400">REGISTER</span> NOW
          </h2>
          <p className="text-gray-400 mb-8">
            Secure your spot at the Bug Bounty Programme 2025 and join the future of Cybersecurity.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="bg-[#1a1a1a] rounded-xl p-4 w-20">
            <h3 className="text-3xl font-bold text-lime-400">{timeLeft.days}</h3>
            <p className="text-xs text-gray-400">Days</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 w-20">
            <h3 className="text-3xl font-bold text-lime-400">{timeLeft.hours}</h3>
            <p className="text-xs text-gray-400">Hours</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 w-20">
            <h3 className="text-3xl font-bold text-lime-400">{timeLeft.minutes}</h3>
            <p className="text-xs text-gray-400">Minutes</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 w-20">
            <h3 className="text-3xl font-bold text-lime-400">{timeLeft.seconds}</h3>
            <p className="text-xs text-gray-400">Seconds</p>
          </div>
        </div>
      </section>
    </div>
    </>
    
      
  );
}
