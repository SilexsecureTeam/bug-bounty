import { useState } from "react";
import bugBountyLogo from "../assets/images/real-logo.png";
import { Shield } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    // --- Footer / Newsletter Section (Custom to Design) ---
    <div className="bg-[#1A1D21] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Top Row: Stay Secure & Subscribe */}
        <div className="flex flex-col justify-between gap-8 border-b border-[#3A3D42] pb-12 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[#2A2D32] p-3 text-white">
              <img src={bugBountyLogo} alt="" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                Stay Secure,<br />
                <span className="text-[#9FC24D]">Stay Informed</span>
              </h3>
              <p className="mt-2 max-w-xs text-[15px] text-[#9CA3AF]">
                Get The Latest Security Insights, Product Updates, And Best Practices Delivered To Your Inbox.
              </p>
            </div>
          </div>

          <div className="flex w-full max-w-md flex-col items-end gap-2">
            <div className="relative w-full">
              <input 
                type="email" 
                placeholder="Enter Your Email Address" 
                className="w-full rounded-lg border border-[#3A3D42] bg-transparent px-4 py-3 text-[16px] text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
              />
            </div>
            <button className="text-[16px] font-bold text-white hover:text-[#9FC24D] transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Row: Links */}
        <div className="grid gap-12 pt-12 text-[16px] sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="max-w-xs text-[15px] leading-relaxed text-[#9CA3AF]">
              Military-Grade Security For The Digital Age. Protecting Your Most Sensitive Communications With Enterprise-Level Encryption And Zero-Knowledge Architecture.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[#9FC24D] font-bold">Solutions</h4>
            <ul className="space-y-3 text-[15px] text-[#E0E0E0]">
              <li><a href="#" className="hover:text-white">Secure Messaging</a></li>
              <li><a href="#" className="hover:text-white">File Encryption</a></li>
              <li><a href="#" className="hover:text-white">Video Conferencing</a></li>
              <li><a href="#" className="hover:text-white">Enterprise Suite</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[#9FC24D] font-bold">Company</h4>
            <ul className="space-y-3 text-[15px] text-[#E0E0E0]">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Security Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}