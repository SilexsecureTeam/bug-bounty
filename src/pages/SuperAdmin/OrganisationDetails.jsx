import React from 'react';
import { 
  Edit2, Lock, Users, Briefcase, CheckCircle2, Clock, 
  Crown, Headphones
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const OrganisationDetails = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Profile Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            {/* Mock Logo Container */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#1a2b10] to-[#4a6b20] rounded-2xl flex items-center justify-center shadow-inner border border-green-900/20">
              <span className="text-4xl font-serif text-[#EAB308] font-bold drop-shadow-md">q</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tech Corporation Industry</h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                <Crown size={16} className="text-gray-500" />
                Super Plan
              </div>
              <p className="text-sm text-gray-500 font-medium">Assigned Admin: Bisi Ekong</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
              <Edit2 size={16} />
              Edit Profile
            </button>
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
              <Lock size={16} />
              Manage Permissions
            </button>
          </div>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <MetricCard icon={Users} iconBg="bg-green-50" iconColor="text-green-600" value="128" label="Total Users" topText="+5% this month" />
          <MetricCard icon={Briefcase} iconBg="bg-purple-50" iconColor="text-purple-600" value="08" label="Active Service" topText="All Active" topTextColor="text-blue-500" />
          <MetricCard icon={CheckCircle2} iconBg="bg-emerald-50" iconColor="text-emerald-500" value="Active" label="Subscription Status" topText="View all" />
          <MetricCard icon={Clock} iconBg="bg-orange-50" iconColor="text-orange-500" value="Jan 15, 2025" label="Suspended Organisation" topText="- 3%" isNegative topIcon />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          
          {/* Left Column: Company Details (Spans 2 columns) */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-gray-900">Company Details</h2>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                <Edit2 size={16} /> Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <DetailItem label="Company name" value="Tech Corporation Industry" />
              <DetailItem label="Industry" value="Software and Technology" />
              
              <DetailItem label="Company size" value="50-100 Employees" />
              <DetailItem label="Registration ID" value="XXXXXXXXXXXXXXXX" />
              
              <DetailItem label="Address" value="1234 Pencinema Avenue, Oshodi-Oke, Lagos" />
              
              <div>
                <p className="text-sm text-gray-500 mb-1.5">Compliance Status</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs font-bold text-gray-600 border border-gray-300 rounded-md uppercase">ITAR</span>
                  <span className="px-3 py-1 text-xs font-bold text-green-700 border border-green-600 rounded-md uppercase">NIST 800-171</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1.5">Website</p>
                <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">www.testingwebsite.com</a>
              </div>
              
              <DetailItem label="Date Created" value="Jan 25th, 2025" />
            </div>
          </div>

          {/* Right Column: Contact & Support (Spans 1 column) */}
          <div className="space-y-6">
            
            {/* Primary Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Company Details</h2>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                  <Edit2 size={16} /> Edit
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Primary Contact</p>
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=yahaya" alt="Yahaha Yakubu" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Yahaha Yakubu</p>
                      <p className="text-xs text-gray-500 font-medium">CEO</p>
                    </div>
                  </div>
                </div>

                <DetailItem label="Email" value="yahay.yakubu@tech.com" />
                <DetailItem label="Phone" value="+234 80123456789" />
                <DetailItem label="Billing Contact" value="billing@tch.com" />
              </div>
            </div>

            {/* Dedicated Manager Card */}
            <div className="bg-gradient-to-br from-[#3b4435] to-[#7CB342] rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <Headphones size={24} className="text-white" />
                  <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">
                    Premium
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Jan 25th, 2025</h3>
                <p className="text-sm text-green-50 mb-6 leading-relaxed">
                  Contact your dedicated account manager for assistance
                </p>
                
                <button className="w-full bg-white text-green-800 font-bold py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
                  Contact Manager
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Sub-components
const MetricCard = ({ icon: Icon, iconBg, iconColor, value, label, topText, topTextColor = "text-gray-500", isNegative, topIcon }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {topText && (
        <span className={`text-xs font-semibold flex items-center gap-1 ${isNegative ? 'text-red-500' : topTextColor} ${topText === 'View all' ? 'cursor-pointer hover:underline' : ''}`}>
          {topText}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1.5">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

export default OrganisationDetails;
