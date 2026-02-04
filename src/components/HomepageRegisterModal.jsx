import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import shieldBg from "../assets/images/Group-1450.svg"; // same background image

const roles = [
  { label: "Bug Hunter", value: "hunter" },
  { label: "Guest", value: "guest" },
  { label: "Volunteer", value: "volunteer" },
];

const HomepageRegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only show on exact homepage
    if (location.pathname !== "/") {
      setIsOpen(false);
      return;
    }

    // Only show once per session (refresh won't re-show, new tab will)
    const hasSeen = sessionStorage.getItem("homepage_register_seen");
    if (hasSeen === "true") {
      setIsOpen(false);
      return;
    }

    // Slight delay so page loads first
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("homepage_register_seen", "true");
  };

  const handleSelect = (role) => {
    handleClose(); // close modal immediately

    if (role === "volunteer") {
      window.location.href = "https://www.defcomm.ng/programme/bug-bounty";
      return;
    }

    // Save role like in original page
    if (typeof window !== "undefined") {
      localStorage.setItem("defcommRegistrationRole", role);
    }

    // Navigate to the create form
    navigate("/register/create", { state: { role } });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Modal container */}
      <div className="relative w-full max-w-3xl mx-4 sm:mx-6 rounded-[48px] bg-gradient-to-b from-[#0F1506]/60 via-[#31420F]/80 to-[#1A2509]/90 p-8 md:p-10 shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 md:top-6 md:right-6 text-gray-300 hover:text-white transition-colors z-10"
          aria-label="Close registration modal"
        >
          <X size={28} />
        </button>

        {/* Background image */}
        <img
          src={shieldBg}
          alt="Circuit Shield"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 rounded-[48px]"
        />

        {/* Content */}
        <div className="relative z-10 space-y-6 text-center">
          <div className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold uppercase tracking-[0.35em] text-[#C7D47F]">
              Ready to
            </h3>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[0.2em] text-white">
              Fortify the Shield?
            </h1>
          </div>

          <div className="mt-8 md:mt-10 rounded-[36px] bg-[#1B2A07]/70 p-6 md:p-8 shadow-[0_30px_65px_rgba(10,17,3,0.6)]">
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.3em] text-white">
              Register As
            </h2>

            <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-5">
              {roles.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className="w-full rounded-full bg-white/90 py-4 text-center text-base md:text-lg font-semibold uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#233108] shadow-[0_20px_35px_rgba(19,38,6,0.35)] transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageRegisterModal;
