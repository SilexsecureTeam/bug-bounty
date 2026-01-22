import React, { useState } from 'react';
import { 
  Search, Rocket, Calendar, Award, Shield, 
  CreditCard, Settings, Bug, ChevronRight, 
  QrCode, FileText, Clock, Headphones 
} from 'lucide-react';

// --- MOCK DATA ---
const helpCategories = [
  { 
    id: 1, 
    title: "Getting Started", 
    desc: "Account setup and basic navigation.", 
    icon: Rocket 
  },
  { 
    id: 2, 
    title: "Events & Attendance", 
    desc: "Managing check-ins and QR codes.", 
    icon: Calendar 
  },
  { 
    id: 3, 
    title: "Certificates & Souvenirs", 
    desc: "Issuing digital proofs and items.", 
    icon: Award 
  },
  { 
    id: 4, 
    title: "Security & Policies", 
    desc: "2FA, permissions, and compliance.", 
    icon: Shield 
  },
  { 
    id: 5, 
    title: "Payments & Rewards", 
    desc: "Billing cycles and payout info.", 
    icon: CreditCard 
  },
  { 
    id: 6, 
    title: "Platform Settings", 
    desc: "Issuing digital proofs and items.", 
    icon: Settings 
  },
  { 
    id: 7, 
    title: "Bug Bounty Programs", 
    desc: "Reporting vulnerabilities.", 
    icon: Bug 
  },
  { 
    id: 8, 
    title: "Events & Attendance", 
    desc: "Managing check-ins and QR codes.", 
    icon: Calendar 
  },
  { 
    id: 9, 
    title: "Certificates & Souvenirs", 
    desc: "Issuing digital proofs and items.", 
    icon: Award 
  },
];

const popularArticles = [
  { 
    id: 1, 
    title: "How QR attendance works", 
    icon: QrCode 
  },
  { 
    id: 2, 
    title: "Why a certificate was not issued", 
    icon: FileText 
  },
  { 
    id: 3, 
    title: "Troubleshooting Clock-in Issues", 
    icon: Clock 
  },
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");

  // Simple filter logic for demonstration
  const filteredCategories = helpCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cat.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans pb-20">
      
      {/* 1. HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">Help & Guides</h1>
        <p className="text-[#9CA3AF] text-sm max-w-2xl">
          Find guides and answers for using DefComm.
        </p>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
        <input 
          type="text" 
          placeholder="Search help articles..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 bg-[#1F221F] border border-[#2A2E2A] rounded-xl pl-12 pr-4 text-sm text-white placeholder-[#545C68] focus:border-[#9ECB32] focus:outline-none transition-colors shadow-lg"
        />
      </div>

      {/* 3. HELP CATEGORIES GRID */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-white mb-6">Help Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <button 
              key={cat.id} 
              className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6 text-left hover:border-[#9ECB32]/50 hover:bg-[#1A1D1A] transition-all group flex flex-col items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32] group-hover:scale-110 transition-transform">
                <cat.icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-400">{cat.desc}</p>
              </div>
            </button>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No categories found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* 4. POPULAR ARTICLES */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-white mb-6">Popular Articles</h2>
        
        <div className="space-y-4">
          {popularArticles.map((article) => (
            <button 
              key={article.id}
              className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-xl px-6 py-4 flex items-center justify-between hover:bg-[#2A2E2A] hover:border-[#9ECB32]/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-white group-hover:text-[#9ECB32] transition-colors">
                  <article.icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {article.title}
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-500 group-hover:text-[#9ECB32] transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* 5. CONTACT SUPPORT BANNER */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Getting Started</h3>
          <p className="text-sm text-gray-400">
            Can't find what you're looking for? Our dedicated support team is here to assist you
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#9ECB32] text-black rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-lg shadow-[#9ECB32]/10 whitespace-nowrap">
          <Headphones size={18} /> Contact Support
        </button>
      </div>

    </div>
  );
}
