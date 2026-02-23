import React from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { 
  Users, CheckCircle2, FileText, Shield, 
  UploadCloud, UserPlus, FileSignature, PlusSquare,
  AlertTriangle, Clock, RefreshCw, Check, X
} from 'lucide-react';

export default function UpAdminOverview() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">OVERVIEW</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">TechConsult Cyber Solutions. Group ID: TCS-2847</p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Team Members', value: '248', icon: Users, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' },
            { title: 'Active Services', value: '10', icon: CheckCircle2, sub: '—', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' },
            { title: 'Pending Requests', value: '248', icon: Users, sub: 'Pending', subColor: 'text-orange-400 bg-orange-50', iconBg: 'bg-orange-100/50', iconColor: 'text-orange-500' },
            { title: 'Documents', value: '182', icon: FileText, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-teal-100/50', iconColor: 'text-teal-600' },
            { title: 'Security Status', value: '100%', icon: Shield, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' },
            { title: 'Compliance Rate', value: '248', icon: FileSignature, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.trend && <span className={`text-xs font-semibold ${stat.trendColor}`}>{stat.trend}</span>}
                {stat.sub && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${stat.subColor || 'text-gray-400'}`}>{stat.sub}</span>}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
                <p className="text-xl font-bold text-gray-800 mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section: Activities & Service Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Team Activities */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Recent Team Activities</h2>
              <button className="text-xs font-semibold text-gray-500 hover:text-gray-800">View All</button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Sarah Mitchell', action: 'Uploaded document: Q4_Security_Report.pdf', time: '2 min ago', badges: [{ text: 'Document', color: 'bg-gray-100 text-gray-600' }] },
                { name: 'James Akanbi', action: 'Submitted access request for Classified Database Alpha', time: '2 hours ago', badges: [{ text: 'Pending Approval', color: 'bg-orange-50 text-orange-600' }] },
                { name: 'Sarah Mitchell', action: 'Uploaded document: Q4_Security_Report.pdf', time: '2 hours ago', badges: [{ text: 'Login', color: 'bg-gray-100 text-gray-600' }, { text: 'Verified', color: 'bg-teal-50 text-teal-600' }] },
                { name: 'Sarah Mitchell', action: 'Uploaded document: Q4_Security_Report.pdf', time: '2 min ago', badges: [{ text: 'Login', color: 'bg-gray-100 text-gray-600' }, { text: 'Verified', color: 'bg-teal-50 text-teal-600' }] },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <img src={`https://ui-avatars.com/api/?name=${activity.name.replace(' ', '+')}&background=random`} alt={activity.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-bold text-gray-800">{activity.name}</h3>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{activity.action}</p>
                    <div className="flex gap-2 mt-2">
                      {activity.badges.map((badge, j) => (
                        <span key={j} className={`text-[10px] font-semibold px-2 py-0.5 rounded ${badge.color}`}>{badge.text}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Service Status</h2>
            <div className="space-y-5 flex-1">
              {[
                { name: 'SecureDB', desc: 'Database Service', iconBg: 'bg-teal-100/50', iconColor: 'text-teal-600' },
                { name: 'SecureComms', desc: 'Communication Hub', iconBg: 'bg-purple-100/50', iconColor: 'text-purple-600' },
                { name: 'SecureComms', desc: 'Communication Hub', iconBg: 'bg-purple-100/50', iconColor: 'text-purple-600' },
                { name: 'SecureDB', desc: 'Database Service', iconBg: 'bg-teal-100/50', iconColor: 'text-teal-600' },
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${service.iconBg} ${service.iconColor}`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800">{service.name}</h3>
                    <p className="text-xs text-gray-500">{service.desc}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
              {[
                { label: 'Access Expirations', value: '3 soon' },
                { label: 'Classified DB Alph', value: '3 days' },
                { label: 'Intel Network', value: '7 days' },
                { label: 'Ops Dashboard', value: '30 days' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Admin Action Center */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Admin Action Center</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Invite Team Member', desc: 'Add new users to your organization', icon: UserPlus, color: 'text-blue-500 bg-blue-50' },
              { title: 'Upload Document', desc: 'Add files to secure storage', icon: UploadCloud, color: 'text-purple-500 bg-purple-50' },
              { title: 'Submit Form', desc: 'Complete required documentation', icon: FileText, color: 'text-teal-500 bg-teal-50' },
              { title: 'Request New Service', desc: 'Apply for additional access', icon: PlusSquare, color: 'text-green-500 bg-green-50' },
            ].map((action, i) => (
              <button key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-left hover:border-gray-300 transition-all hover:shadow-md group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#759C2A] transition-colors">{action.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section: Notifications & Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Notifications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Notification</h2>
              <span className="text-xs font-semibold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">3 New</span>
            </div>
            <div className="space-y-3">
              <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Security Alert</h3>
                  <p className="text-xs text-gray-600 mt-0.5">Unusual login activity detected from 192.168.1.45</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">15 min ago</span>
                </div>
              </div>
              <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Access Expiring Soon</h3>
                  <p className="text-xs text-gray-600 mt-0.5">Your access to Classified DB Alpha expires in 7 days</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">15 min ago</span>
                </div>
              </div>
              <div className="bg-[#759C2A]/10 border border-[#759C2A]/20 p-4 rounded-xl flex items-start gap-3 bg-[#89A846] text-white">
                {/* Note: The design uses a solid green block here */}
                <RefreshCw className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">System Update</h3>
                  <p className="text-xs text-white/90 mt-0.5">Platform maintenance scheduled for Dec 28, 2024</p>
                  <span className="text-[10px] text-white/70 mt-1 block">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Pending Approvals</h2>
              <span className="text-xs font-semibold bg-[#759C2A] text-white px-2 py-0.5 rounded-full">5</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'James Ben', req: 'Access request: Classified DB Alpha', time: '15 min ago' },
                { name: 'Lisa Anderson', req: 'Document approval: Security Protocol', time: '15 min ago' },
                { name: 'Robert Kim', req: 'Service request: ThreatWatch Pro', time: '15 min ago' },
              ].map((user, i) => (
                <div key={i} className="bg-[#F8FAFC] border border-gray-100 p-4 rounded-xl flex items-center justify-between hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{user.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{user.req}</p>
                      <span className="text-[10px] text-gray-400 block mt-1">{user.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 bg-[#759C2A] text-white rounded hover:bg-[#638523] transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
