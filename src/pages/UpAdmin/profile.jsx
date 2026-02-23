import React from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { ShieldCheck, Monitor, MapPin } from 'lucide-react';

export default function UpAdminProfile() {
  const sessions = Array(7).fill({
    device: 'PRO-92X/Device v.12',
    location: 'Abuja, Abuja',
    ip: '192.168.1.10',
    status: 'Active Now'
  });

  const logs = [
    { title: 'Password changed', desc: 'Successfully updated administrative credentials', time: 'Oct 24, 2023, 12:45 PM' },
    { title: 'New Device authorized', desc: 'Successfully updated administrative credentials', time: 'Oct 24, 2023, 12:45 PM' },
    { title: 'SSH Tunnel Established', desc: 'Successfully updated administrative credentials', time: 'Oct 24, 2023, 12:45 PM' },
    { title: 'Daily Security Audit Run', desc: 'Successfully updated administrative credentials', time: 'Oct 24, 2023, 12:45 PM' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Profile</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Manage enterprise access and personal security configurations.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-sm">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-[#759C2A] text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#638523] transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Full Name</label>
              <input type="text" readOnly value="Sandra Abiodun" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-bold text-gray-700 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Admin Role</label>
              <input type="text" readOnly value="Senior Group Admin" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-bold text-gray-700 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Department</label>
              <input type="text" readOnly value="Cybersecurity & Infrastructure" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-bold text-gray-700 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Email Address</label>
              <input type="text" readOnly value="s.nana@defense-systems.internal" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-bold text-gray-700 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Security Controls */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                  Security Controls
                </h2>
                <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Enforced
                </span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl mb-6">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-[#F2F7E9] rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-[#557B1A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Multi-Factor Authentication (MFA)</h3>
                    <p className="text-[11px] text-gray-500 font-medium">Extra security verification is enabled</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors">
                  Manage MFA
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Change password</label>
                  <input type="password" placeholder="Current Password" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-medium text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50" />
                </div>
                <div className="sm:mt-[22px]">
                  <input type="password" placeholder="New Password" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-medium text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50" />
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  Active Sessions
                </h2>
                <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Enforced
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#CDE59C]">
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-800 uppercase tracking-wider">Device</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-800 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-800 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-800 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-800 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sessions.map((session, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-bold text-gray-600">{session.device}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-500">{session.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-500">{session.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {session.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="text-[10px] font-bold text-[#D0404C] hover:text-red-700 transition-colors uppercase tracking-wider">
                            End Session
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Log (Right Sidebar) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Activity Log
            </h2>
            <div className="relative border-l border-gray-200 ml-2 space-y-6">
              {logs.map((log, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-gray-300"></div>
                  <p className="text-[10px] text-gray-400 font-semibold mb-0.5">{log.time}</p>
                  <h5 className="text-xs font-bold text-gray-800">{log.title}</h5>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">{log.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
