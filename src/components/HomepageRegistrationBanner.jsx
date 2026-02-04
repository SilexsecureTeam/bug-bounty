// HomepageRegistrationBanner.tsx

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle, Users, X } from "lucide-react";

const HomepageRegistrationBanner = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only homepage
    if (location.pathname !== "/") {
      setVisible(false);
      return;
    }

    // Skip if already seen in this session
    // if (sessionStorage.getItem("registration_prompt_seen") === "true") {
    //   setVisible(false);
    //   return;
    // }

    // Show after small delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000); // a bit later so it doesn't fight with page load

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const markAsSeen = () => {
    sessionStorage.setItem("registration_prompt_seen", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-full max-w-sm animate-in slide-in-from-bottom-5 duration-500 sm:bottom-8 sm:right-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#0E1218] border border-[#9FC24D] p-5 shadow-[0_0_40px_rgba(159,194,77,0.15)]">
        <div className="absolute -right-6 -top-6 text-[#9FC24D]/10">
          <Users size={120} />
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-[#9FC24D]">
              <AlertTriangle size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Don't Miss Out
              </span>
            </div>
            <button
              onClick={markAsSeen}
              className="text-[#5E667B] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <h4 className="font-bold text-white">
              Register for our upcoming events
            </h4>
            <p className="mt-1 text-xs text-[#9CA3AF] leading-relaxed">
              Join now to access reports, leaderboard, certificates, souvenirs
              kit & more.
            </p>
          </div>

          <Link
            to="/register"
            onClick={markAsSeen} // also mark as seen when clicking register
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9FC24D] py-3 text-xs font-bold uppercase tracking-widest text-[#0B0F05] shadow-lg shadow-[#9FC24D]/20 transition-transform hover:scale-[1.02] hover:bg-[#B2D660]"
          >
            Register Now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageRegistrationBanner;
