import React, { useState } from 'react';
import { 
  Calendar, Layers, Users, RefreshCw, Search, 
  ChevronDown, ShoppingBag, CreditCard, Clock, 
  RotateCcw, ChevronLeft, ChevronRight, Filter, 
  Download, Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- MOCK DATA ---
const transactionData = [
  { id: "ORD-23-899", date: "Mar 12, 2025", event: "DefComm Summit 2025", payer: "Martin Eno", type: "Sponsorship", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-900", date: "Mar 12, 2025", event: "Naval Tech Expo", payer: "Bola Osas", type: "Event Registration", amount: "N15,000", status: "Pending" },
  { id: "ORD-23-901", date: "Mar 12, 2025", event: "Space Command Conf", payer: "Pius Afang", type: "Certificate", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-902", date: "Mar 12, 2025", event: "Naval Tech Expo", payer: "Martin Eno", type: "Sponsorship", amount: "N15,000", status: "Failed" },
  { id: "ORD-23-903", date: "Mar 12, 2025", event: "Naval Tech Expo", payer: "Martin Eno", type: "Event Registration", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-904", date: "Mar 12, 2025", event: "Naval Tech Expo", payer: "Martin Eno", type: "Event Registration", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-905", date: "Mar 12, 2025", event: "Naval Tech Expo", payer: "Martin Eno", type: "Event Registration", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-906", date: "Mar 12, 2025", event: "Naval Tech Expo", payer: "Martin Eno", type: "Certificate", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-907", date: "Mar 12, 2025", event: "DEFCOMM HQ", payer: "Pius Afang", type: "Certificate", amount: "N15,000", status: "Paid" },
  { id: "ORD-23-908", date: "Mar 12, 2025", event: "Space Command Conf", payer: "Pius Afang", type: "Certificate", amount: "N15,000", status: "Paid" },
];

const refundsData = [
  { id: "#ORD -23 -835", date: "Mar 12, 2025", reason: "Duplicate Charge", admin: "Ben Obi (Admin)", amount: "N50,000" },
  { id: "#ORD -23 -836", date: "Mar 12, 2025", reason: "Event Cancellation", admin: "System", amount: "N700,000" },
];

const paymentStatusData = [
  { name: 'Paid', value: 70, color: '#4ADE80' },    // Green
  { name: 'Pending', value: 10, color: '#F97316' }, // Orange
  { name: 'Failed', value: 10, color: '#22C55E' },  // Darker Green (as per design)
  { name: 'Refunded', value: 5, color: '#EAB308' }, // Yellow/Gold
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  let styles = "";
  if (status === "Paid") styles = "text-[#4ADE80]";
  else if (status === "Pending") styles = "text-[#9CA3AF]"; // Greyish for pending in design
  else if (status === "Failed") styles = "text-[#EF4444]";
  else styles = "text-white";

  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      {status}
    </span>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-[#9ECB32] transition-colors">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32] group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
    </div>
  </div>
);

export default function Payment() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Custom Tooltip for Pie Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F221F] border border-[#2A2E2A] p-2 rounded shadow-lg text-xs text-white">
          <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase tracking-wide">Payments & Orders</h1>
          <p className="text-[#9CA3AF] text-xs">Audit and review financial transactions across all events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-lg shadow-[#9ECB32]/10">
          <Plus size={14} strokeWidth={3} /> Create a Message
        </button>
      </div>

      {/* 2. FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Calendar size={14} /> Last 30 Days <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Layers size={14} /> All Events <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Users size={14} /> All organisers <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Layers size={14} /> Type: Training <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <RefreshCw size={14} /> Status: All <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613] ml-auto transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* 3. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Orders" value="1,248" icon={ShoppingBag} />
        <StatCard title="Total Revenue" value="8,542" icon={CreditCard} />
        <StatCard title="Pending Payment" value="8,542" icon={Clock} />
        <StatCard title="Amt Refunded" value="1,508" icon={RotateCcw} />
      </div>

      {/* 4. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Transaction Log (Takes up 2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-white">Transaction Log</h2>
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#9CA3AF]" />
               <input 
                 type="text" 
                 placeholder="Search" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-[#141613] border border-[#2A2E2A] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
               />
            </div>
          </div>

          <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden min-h-[500px] flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-10 text-center">#</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Order ID</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Date</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Event Name</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Payer</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Type</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Amount</th>
                    <th className="py-4 px-4 text-[10px] font-bold uppercase text-white tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E2A]">
                  {transactionData.map((item, index) => (
                    <tr key={index} className="hover:bg-[#1A1D1A] transition-colors text-xs group">
                      <td className="py-3 px-4 text-gray-500 text-center">{index + 1}</td>
                      <td className="py-3 px-4 font-mono text-[#9CA3AF]">{item.id}</td>
                      <td className="py-3 px-4 text-gray-300">{item.date}</td>
                      <td className="py-3 px-4 text-white font-medium truncate max-w-[120px]">{item.event}</td>
                      <td className="py-3 px-4 text-gray-300">{item.payer}</td>
                      <td className="py-3 px-4 text-gray-300">{item.type}</td>
                      <td className="py-3 px-4 text-white font-mono">{item.amount}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#141613]">
              <div className="text-xs text-gray-500">
                1 - 10 of 460
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
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
          </div>
        </div>

        {/* Right Column: Charts & Refunds */}
        <div className="space-y-6">
          
          {/* Payment Status Overview Chart */}
          <div className="bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-6">Payment Status Overview</h3>
            
            <div className="flex items-center justify-between">
              {/* Donut Chart */}
              <div className="relative w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={65}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      paddingAngle={5}
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <div className="text-[10px] text-gray-400 uppercase tracking-widest">Total</div>
                   <div className="text-sm font-bold text-[#9ECB32]">45,251</div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                {paymentStatusData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between w-32">
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></span>
                        <span className="text-xs text-gray-300">{item.name}</span>
                     </div>
                     <span className="text-xs font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Refunds Section */}
          <div className="bg-[#1F221F] border border-[#2A2E2A] rounded-2xl overflow-hidden flex flex-col h-auto">
            <div className="p-4 bg-[#21251F] border-b border-[#2A2E2A]">
               <h3 className="text-white font-bold">Recent Refunds</h3>
            </div>
            
            <div className="flex-1 p-4 space-y-4">
              {refundsData.map((refund, i) => (
                <div key={i} className="border-b border-[#2A2E2A] last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-white font-bold text-sm">{refund.id}</span>
                    <span className="text-gray-400 text-xs">{refund.date}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Reason: {refund.reason}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">By: {refund.admin}</span>
                    <span className="text-white font-bold text-sm">{refund.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-3 bg-[#1F221F] text-[#9CA3AF] text-xs font-bold uppercase tracking-wide border-t border-[#2A2E2A] hover:bg-[#2A2E2A] hover:text-white transition-colors">
              View Audit Log
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
