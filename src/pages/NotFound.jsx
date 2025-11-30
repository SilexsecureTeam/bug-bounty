import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#05070C] text-white">
      <Navbar />
      
      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-6 text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#161B22] shadow-[0_0_40px_rgba(255,85,85,0.15)]">
          <div className="absolute inset-0 animate-pulse rounded-3xl bg-[#FF5555]/5" />
          <AlertTriangle size={48} className="text-[#FF5555]" strokeWidth={1.5} />
        </div>

        {/* Error Code */}
        <h1 className="mb-4 font-mono text-6xl font-bold tracking-widest text-[#2A303C]">
          404
        </h1>

        {/* Main Message */}
        <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
          Page Not Found
        </h2>
        
        <p className="mb-10 max-w-md text-sm leading-relaxed text-[#9BA1B0]">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable. It looks like you've ventured into uncharted territory.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="group flex items-center justify-center gap-2 rounded-full bg-[#9FC24D] px-8 py-3 text-sm font-bold text-[#0B0F05] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(159,194,77,0.2)]"
          >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <Link
            to="/submit-report"
            className="flex items-center justify-center rounded-full border border-[#2A303C] bg-[#0E131D] px-8 py-3 text-sm font-semibold text-[#C5CBD8] transition-colors duration-200 hover:border-[#9FC24D] hover:text-white"
          >
            Submit a Report
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}