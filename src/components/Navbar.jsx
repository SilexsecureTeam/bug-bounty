import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // 1. Import useLocation
import Defcomm from "../assets/images/AFD.svg";
import { HiMenu, HiX } from "react-icons/hi"; 

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 2. Get the current location object

  const navItems = [
    { name: "Home", to: "/" }, // Removed 'special: true' (it's automatic now)
    { name: "About", to: "/about" },
    { name: "Programme", to: "/program" },
    { name: "Highlights", to: "/highlights" },
    { name: "Contact", to: "/contact" },
    { name: "Leaderboard", to: "/leaderboard" },
    { name: "Login", to: "/signin" },
  ];

  const homeNavigate = () => {
    navigate("/");
  };

  return (
    <nav className="fixed w-full! top-0 left-0 z-50 shadow-lg">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(to right, #36460A, #85AB20, #36450D)",
        }}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 cursor-pointer" onClick={homeNavigate}>
            <img src={Defcomm} alt="Logo" className="h-10" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => {
              // 3. Check if this link is the active one
              const isActive = location.pathname === item.to;

              return item.to ? (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-slate-100 hover:bg-[#85AB20] text-sm font-medium transition-all duration-200"
                  style={{
                    padding: "8px 12px",
                    // 4. Use isActive to determine the border radius
                    borderRadius: isActive ? "20px" : "6px",
                    // 5. Use isActive to apply the border
                    border: isActive ? "1px solid white" : "1px solid transparent", 
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-100 hover:bg-[#85AB20] px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full h-screen bg-linear-to-b from-[#36460A] via-[#85AB20] to-[#36450D] transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-6 z-40`}
      >
        {navItems.map((item) => {
           // Optional: You can add active styling for mobile here too if you want
           const isActive = location.pathname === item.to;
           
           return item.to ? (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xl font-semibold transition-colors duration-200 ${
                  isActive ? "text-[#F7FAEE] underline" : "text-white hover:text-[#F7FAEE]"
              }`}
            >
              {item.name}
            </Link>
          ) : (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-xl font-semibold hover:text-[#F7FAEE] transition-colors duration-200"
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
