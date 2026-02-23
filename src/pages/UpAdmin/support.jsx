import React from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { 
  BookOpen, Plus, Search, Filter, ChevronDown,
  Eye, Edit2, Trash2, ChevronLeft, ChevronRight,
  Briefcase, Clock, AlertCircle, CheckCircle2
} from 'lucide-react';

export default function Support() {
  // Support Tickets Mock Data
  const tickets = [
    { id: '#TK-2847', title: 'Database connection timeout', raisedBy: 'Angela Remi', category: 'Technical', priority: 'Critical', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'High', status: 'In Progress', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'VPN connectivity issue', raisedBy: 'Angela Remi', category: 'Service Issue', priority: 'Medium', status: 'Open', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Hardware replacement', raisedBy: 'Angela Remi', category: 'Access', priority: 'Low', status: 'Resolved', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'Critical', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'Critical', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'High', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'High', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'Medium', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
    { id: '#TK-2847', title: 'Server performance degradation', raisedBy: 'Angela Remi', category: 'Technical', priority: 'Medium', status: 'Escalated', assignedTo: 'Michael Obi', updated: '2 hours ago' },
  ];

  const StatusPill = ({ status }) => {
    const styles = {
      Escalated: 'bg-[#FBE4E6] text-[#C93B47]',
      'In Progress': 'bg-[#FFF3CD] text-[#A67C00]',
      Open: 'bg-[#E0F2FE] text-[#0284C7]',
      Resolved: 'bg-[#EAF3D8] text-[#557B1A]',
    };
    return (
      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  const PriorityText = ({ priority }) => {
    const colors = {
      Critical: 'text-[#D0404C]',
      High: 'text-[#EA580C]',
      Medium: 'text-[#D97706]',
      Low: 'text-[#059669]'
    };
    return (
      <span className={`text-xs font-bold ${colors[priority] || 'text-gray-600'}`}>
        {priority}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Support Center</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
              Manage and track internal support tickets
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <BookOpen className="w-4 h-4" />
              View Knowledge Base
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Create Ticket
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[
            { title: 'Open Tickets', count: '50', icon: Briefcase, color: 'text-gray-500', bg: 'bg-gray-100' },
            { title: 'In Progress', count: '28', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
            { title: 'Critical', count: '5', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
            { title: 'Resolved Today', count: '20', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
                <h3 className="text-2xl font-extrabold text-gray-800">{stat.count}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 py-2">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
            />
          </div>

          <div className="flex gap-3">
            {/* Date Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer h-full">
                <option>Date</option>
                <option>Today</option>
                <option>This Week</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer h-full">
                <option>Status</option>
                <option>Open</option>
                <option>Resolved</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Ticket ID</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Issue Title</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Raised By</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Priority</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Assigned To</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Last Updated</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap text-right">More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tickets.map((ticket, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-800 min-w-[180px]">{ticket.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                      {ticket.raisedBy}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {ticket.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PriorityText priority={ticket.priority} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill status={ticket.status} />
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                      {ticket.assignedTo}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {ticket.updated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-gray-800 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="hover:text-gray-800 transition-colors">
                          <Edit2 className="w-4 h-4" />
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
            <button className="p-1 hover:text-gray-900 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
