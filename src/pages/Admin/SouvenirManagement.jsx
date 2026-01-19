import React, { useState } from 'react';
import { 
  Search, Filter, Download, AlertCircle, RefreshCw, 
  Package, ShoppingBag, Minimize2, QrCode, SlidersHorizontal, 
  ChevronLeft, ChevronRight, ChevronDown, CheckCircle2
} from 'lucide-react';

// --- MOCK DATA: INVENTORY STATUS ---
const inventoryData = [
  { id: 1, name: "Delegate Kit", itemId: "SK-1024", quantity: "5,000", claimed: "3,200", remaining: "1,800", method: "QR Scan", status: "Available" },
  { id: 2, name: "VIP Gift Bag", itemId: "SK-5011", quantity: "500", claimed: "450", remaining: "50", method: "Manual", status: "Low Stock" },
  { id: 3, name: "Tech Summit T-Shirt", itemId: "SK-2022", quantity: "5,000", claimed: "4,800", remaining: "200", method: "Manual", status: "Low Stock" },
  { id: 4, name: "Branded Hoodie", itemId: "SK-2023", quantity: "2,000", claimed: "1,950", remaining: "50", method: "Manual", status: "Low Stock" },
  { id: 5, name: "Smart Water Bottle", itemId: "SK-3001", quantity: "5,000", claimed: "1,200", remaining: "3,800", method: "QR Scan", status: "Available" },
  { id: 6, name: "Conference Notebook", itemId: "SK-4005", quantity: "5,000", claimed: "2,100", remaining: "2,900", method: "QR Scan", status: "Available" },
  { id: 7, name: "Eco Pen Set", itemId: "SK-4006", quantity: "5,000", claimed: "1,500", remaining: "3,500", method: "Manual", status: "Available" },
  { id: 8, name: "Power Bank 10k", itemId: "SK-6001", quantity: "1,000", claimed: "1,000", remaining: "0", method: "Manual", status: "Out of stock" },
  { id: 9, name: "Lanyard Premium", itemId: "SK-1002", quantity: "5,000", claimed: "5,000", remaining: "0", method: "Manual", status: "Out of stock" },
  { id: 10, name: "Sticker Pack", itemId: "SK-9001", quantity: "5,000", claimed: "5,000", remaining: "0", method: "Manual", status: "Out of stock" },
];

// --- MOCK DATA: REDEMPTION LOGS ---
const redemptionData = [
  { id: 1, name: "Dammy Bright", userId: "ID-8821-XJ", item: "PREMIUM TOTE BAG", time: "10:42 AM", verify: "QR Scan", status: "Verified" },
  { id: 2, name: "Michael Ross", userId: "ID-8821-XJ", item: "LANYARD", time: "10:38 AM", verify: "Manual", status: "Flagged" },
  { id: 3, name: "Elena Wu", userId: "ID-1234-XY", item: "POWER BANK", time: "10:38 AM", verify: "Manual", status: "Flagged" },
  { id: 4, name: "Alex Smith", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "Manual", status: "Low Stock" },
  { id: 5, name: "Dammy Bright", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "QR Scan", status: "Duplicate" },
  { id: 6, name: "Dammy Bright", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "QR Scan", status: "Verified" },
  { id: 7, name: "Dammy Bright", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "Manual", status: "Verified" },
  { id: 8, name: "Dammy Bright", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "Manual", status: "Duplicate" },
  { id: 9, name: "Dammy Bright", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "Manual", status: "Duplicate" },
  { id: 10, name: "Dammy Bright", userId: "ID-3321-PO", item: "PREMIUM TOTE BAG", time: "10:38 AM", verify: "Manual", status: "Duplicate" },
];

// --- COMPONENTS ---

const StatCard = ({ title, value, subtext, subtextColor, icon: Icon, iconColor, borderColor }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${borderColor} bg-[#1F221F]`}>
        <Icon size={20} className={iconColor} />
      </div>
    </div>
    <div className="mt-auto z-10">
      <p className={`text-xs font-bold ${subtextColor}`}>{subtext}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";

  switch (status) {
    case "Available":
    case "Verified":
      styles = "bg-[#1F3513] text-[#4ADE80] border border-[#2F4523]";
      dotColor = "bg-[#4ADE80]";
      break;
    case "Low Stock":
    case "Flagged":
      styles = "bg-[#352E13] text-[#FACC15] border border-[#453A13]";
      dotColor = "bg-[#FACC15]";
      break;
    case "Out of stock":
      styles = "bg-[#2A2E2A] text-gray-400 border border-[#3F423F]";
      dotColor = "bg-gray-400";
      break;
    case "Duplicate":
    case "Claim Issues":
      styles = "bg-[#351313] text-[#EF4444] border border-[#452323]";
      dotColor = "bg-[#EF4444]";
      break;
    default:
      styles = "bg-[#2A2E2A] text-gray-400 border border-[#3F423F]";
      dotColor = "bg-gray-400";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

const PaginationFooter = () => (
  <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#141613]">
    <div className="text-xs text-gray-400">
      1 - 10 of 460
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        Rows per page:
        <div className="relative">
          <select className="appearance-none bg-[#1F221F] border border-[#2A2E2A] rounded px-2 py-1 pr-6 text-white focus:outline-none cursor-pointer">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex gap-1">
        <button className="p-1.5 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default function SouvenirManagement() {
  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans pb-20">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Souvenir Management</h1>
          <p className="text-[#9CA3AF] text-sm">Real-time tracking of Souvenir distributions and stock levels</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-bold text-gray-300">
             Annual Technology Summit
           </button>
           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9ECB32] text-black hover:bg-[#8AB32A] transition-colors">
             <RefreshCw size={18} />
           </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Items" 
          value="12,500" 
          subtext="Across all categories" 
          subtextColor="text-[#9CA3AF]"
          icon={Package}
          iconColor="text-white"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Items Claimed" 
          value="8,240" 
          subtext="↗ 12% from yesterday" 
          subtextColor="text-[#4ADE80]"
          icon={ShoppingBag}
          iconColor="text-[#9ECB32]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Items remaining" 
          value="4,260" 
          subtext="" 
          subtextColor="text-white"
          icon={Minimize2}
          iconColor="text-[#9ECB32]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Claim Issues" 
          value="14" 
          subtext="! Action needed" 
          subtextColor="text-[#EF4444]"
          icon={AlertCircle}
          iconColor="text-[#EF4444]"
          borderColor="border-[#EF4444]/30"
        />
      </div>

      {/* 3. SECTION: INVENTORY STATUS */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Inventory Status</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-[#2A2E2A] bg-[#141613] rounded-lg text-[#9ECB32] hover:bg-[#1F221F]">
              <Filter size={18} />
            </button>
            <button className="p-2 border border-[#2A2E2A] bg-[#141613] rounded-lg text-[#9ECB32] hover:bg-[#1F221F]">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-16 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Souvenir Item</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Quantity</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Claimed</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Remaining</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Claim Method</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {inventoryData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-[#1A1D1A] transition-colors group">
                    <td className="py-4 px-6 text-xs text-gray-500 text-center">{index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-gray-400">
                          <Package size={14} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-white">{item.name}</p>
                           <p className="text-[10px] text-gray-500 tracking-wide uppercase">ID: {item.itemId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-medium text-white">{item.quantity}</td>
                    <td className="py-4 px-6 text-xs font-medium text-white">{item.claimed}</td>
                    <td className="py-4 px-6 text-xs font-medium text-white">{item.remaining}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs text-white">
                        {item.method === 'QR Scan' ? <QrCode size={14} /> : <SlidersHorizontal size={14} />}
                        {item.method}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationFooter />
        </div>
      </div>

      {/* 4. SECTION: REDEMPTION LOGS */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Redemption Logs</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-[#2A2E2A] bg-[#141613] rounded-lg text-[#9ECB32] hover:bg-[#1F221F]">
              <Filter size={18} />
            </button>
            <button className="p-2 border border-[#2A2E2A] bg-[#141613] rounded-lg text-[#9ECB32] hover:bg-[#1F221F]">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-16 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Attendee Name</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Attendee ID</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Item</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Time Claimed</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Verification Method</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {redemptionData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-[#1A1D1A] transition-colors group">
                    <td className="py-4 px-6 text-xs text-gray-500 text-center">{index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-[#2A2E2A]">
                          <img src={`https://i.pravatar.cc/150?u=${item.id + 20}`} alt="" className="w-full h-full object-cover opacity-90" />
                        </div>
                        <span className="text-sm font-bold text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-[#9CA3AF] tracking-wide">{item.userId}</td>
                    <td className="py-4 px-6 text-[10px] font-bold text-white uppercase tracking-wider">{item.item}</td>
                    <td className="py-4 px-6 text-xs font-medium text-white">{item.time}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs text-white">
                         {item.verify === 'QR Scan' ? <QrCode size={14} /> : <SlidersHorizontal size={14} />}
                         {item.verify}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationFooter />
        </div>
      </div>

    </div>
  );
}
