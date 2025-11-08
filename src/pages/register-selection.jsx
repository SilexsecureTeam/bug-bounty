import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import shieldBg from "../assets/images/Group-1450.svg";

const roles = [
  { label: "Bug Hunter", value: "hunter" },
  { label: "Guest", value: "guest" },
  { label: "Volunteer", value: "volunteer" }
];

export default function RegisterSelection() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("defcommRegistrationRole", role);
    }
    navigate("/register/create", { state: { role } });
  };

  return (
    <>
      <Navbar />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#171B1E] pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-linear-to-b from-[#131518] via-[#1F221B] to-[#10140D] opacity-95" />
        <img
          src={shieldBg}
          alt="Circuit Shield"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />

        <div className="relative z-10 w-full max-w-3xl rounded-[48px] bg-linear-to-b from-[#0F1506]/60 via-[#31420F]/80 to-[#1A2509]/90 p-10 shadow-[0_45px_85px_rgba(12,18,7,0.55)]">
          <div className="space-y-4 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C7D47F]">
              Ready to
            </h3>
            <h1 className="text-4xl font-black uppercase tracking-[0.2em] text-white">
              Fortify the Shield?
            </h1>
          </div>

          <div className="mt-10 rounded-[36px] bg-[#1B2A07]/70 p-8 shadow-[0_30px_65px_rgba(10,17,3,0.6)]">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.3em] text-white text-center">
              Register As
            </h2>
            <div className="mt-8 flex flex-col gap-5">
              {roles.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className="w-full rounded-full bg-white/90 py-4 text-center text-lg font-semibold uppercase tracking-[0.3em] text-[#233108] shadow-[0_20px_35px_rgba(19,38,6,0.35)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
