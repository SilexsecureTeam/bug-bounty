import React from 'react';
import { 
  Plus, ArrowUpRight, ArrowDownRight, ShieldCheck, Edit
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const SystemMail = () => {
  // Mock Data mimicking the image exactly
  const tableData = [
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'USER_REGISTERED', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'AUTH_FORGOT_PW', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'USER_REGISTERED', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'USER_REGISTERED', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'USER_REGISTERED', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'AUTH_FORGOT_PW', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'AUTH_FORGOT_PW', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'AUTH_FORGOT_PW', date: 'Oct, 24, 2025' },
    { id: 'TMP-00124', name: 'Account Creation', purpose: 'New User Onboarding Mailer', trigger: 'AUTH_FORGOT_PW', date: 'Oct, 24, 2025' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end pb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Mails</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage automated Enterprise communications and triggers
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
            <Plus size={16} />
            Create New Template
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-3 gap-6">
          <MetricCard title="Total Active" value="28" trend="+0%" />
          <MetricCard title="Emails sent (24h)" value="1,284" trend="+12%" />
          <MetricCard title="Delivery Rate" value="99.9%" trend="-0.1%" isNegative />
        </div>

        {/* Main Content Split Layout */}
        <div className="grid grid-cols-3 gap-6 mt-2">
          
          {/* Left Column: Templates Table (Spans 2) */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-fit">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Template Name</th>
                    <th className="px-6 py-4">Purpose</th>
                    <th className="px-6 py-4">Trigger Event</th>
                    <th className="px-6 py-4">Last Modified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition cursor-pointer">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">ID: {row.id}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600 w-48 truncate whitespace-normal leading-tight">
                        {row.purpose}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1.5 bg-[#9ca986] text-white text-xs font-bold rounded shadow-sm tracking-wider">
                          {row.trigger}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Template Preview & Placeholders */}
          <div className="space-y-6">
            
            {/* Template Preview Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#D4E7B5] px-5 py-3.5 border-b border-[#C2DB9E] flex justify-between items-center">
                <h2 className="text-sm font-bold text-gray-900">Template Preview</h2>
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-gray-700 text-xs font-bold rounded border border-gray-200 hover:bg-gray-50 transition shadow-sm">
                  Edit Template
                </button>
              </div>
              
              <div className="p-5">
                {/* Mock Email Body */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  {/* Email Header */}
                  <div className="bg-[#F4F7F1] p-4 flex items-center justify-center border-b border-gray-100">
                    <div className="flex items-center gap-2 font-bold text-gray-800 tracking-wide">
                      <ShieldCheck size={18} /> DEFCOMM
                    </div>
                  </div>
                  
                  {/* Email Content */}
                  <div className="p-6 bg-white text-sm text-gray-700 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      Welcome to Defcomm,<br/>{`{{user_name}}`}!
                    </h3>
                    <p className="leading-relaxed">
                      Your administrative account has been successfully provisioned. 
                      Please complete your security profile within {`{expiry_days}`} days to maintain access.
                    </p>
                    
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Security Clearance</span>
                        <span className="font-bold text-gray-900">Level 4 - Enterprise</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Assigned Node</span>
                        <span className="font-bold text-gray-900">US-East-01</span>
                      </div>
                    </div>

                    <button className="w-full bg-[#A3E635] text-[#2d4710] font-bold py-3 rounded-lg shadow-sm border border-[#92ce2f] mt-2">
                      Secure Login
                    </button>
                  </div>
                  
                  {/* Email Footer */}
                  <div className="bg-gray-50 p-4 text-center">
                    <p className="text-[10px] text-gray-400 italic">Automated system message. Do not reply.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Placeholders */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Available Placeholders</h3>
              <div className="space-y-2">
                <PlaceholderRow tag="{{user_name}}" desc="Full Name" />
                <PlaceholderRow tag="{{Expiry_Days}}" desc="Days to Expire" />
                <PlaceholderRow tag="{{Access_Node}}" desc="Server Node" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// Sub-components
const MetricCard = ({ title, value, trend, isNegative }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md ${isNegative ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-50 text-emerald-600'}`}>
      {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
      {trend}
    </div>
  </div>
);

const PlaceholderRow = ({ tag, desc }) => (
  <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
    <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">{tag}</span>
    <span className="text-sm text-gray-500 font-medium">{desc}</span>
  </div>
);

export default SystemMail;
