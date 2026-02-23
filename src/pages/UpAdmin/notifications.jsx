import React from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { 
  Download, Check, ChevronDown, Eye, Trash2, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function UpAdminNotifications() {
  // Mock data representing the exact table in the design
  const notifications = [
    { severity: 'CRITICAL', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'WARNING', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'INFO', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'WARNING', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'INFO', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'INFO', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'INFO', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'CRITICAL', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'CRITICAL', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
    { severity: 'CRITICAL', event: 'Unauthorized Access Attempt', eventSub: 'Security', desc: 'Multiple failed login attempts detected from unknown IP', ip: '192.168.45.198', ipType: 'External IP', time: '16/02/2026', timeObj: '13:45:42', status: 'Unread' },
  ];

  const SeverityTag = ({ type }) => {
    const styles = {
      CRITICAL: 'text-[#D0404C] bg-[#D0404C]',
      WARNING: 'text-[#D97706] bg-[#D97706]',
      INFO: 'text-gray-600 bg-gray-600',
    };
    
    return (
      <div className={`flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase ${styles[type]?.split(' ')[0] || 'text-gray-500'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${styles[type]?.split(' ')[1] || 'bg-gray-500'}`}></span>
        {type}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Notifications</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
              Review critical system alerts and administrative events
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Toolbar: Multi-Filters */}
        <div className="flex flex-wrap gap-4 py-2">
          {['All Types', 'Last 7 days', 'All Status', 'All Severities'].map((filter, i) => (
            <div key={i} className="relative flex-1 min-w-[150px]">
              <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 ml-1">
                {filter.split(' ')[1] || filter}
              </div>
              <div className="relative">
                <select className="appearance-none w-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer">
                  <option>{filter}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Severity</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Event</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Description</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Affected</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Time Stamp</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {notifications.map((note, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SeverityTag type={note.severity} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-800">{note.event}</div>
                      <div className="text-[11px] font-semibold text-gray-400 mt-0.5">{note.eventSub}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-600 max-w-[250px] leading-relaxed">
                        {note.desc}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-800">{note.ip}</div>
                      <div className="text-[11px] font-semibold text-gray-400 mt-0.5">{note.ipType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-800">{note.time}</div>
                      <div className="text-[11px] font-semibold text-gray-400 mt-0.5">{note.timeObj}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block bg-[#EAF3D8]/60 text-[#557B1A] text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                        {note.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-gray-800 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-end gap-2 text-sm font-semibold text-gray-600">
            <button className="p-1 hover:text-gray-900 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-7 h-7 rounded bg-gray-100 text-gray-900 flex items-center justify-center">1</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">2</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">3</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">4</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">5</button>
            <button className="p-1 hover:text-gray-900 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
