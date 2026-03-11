import React, { useState, useEffect } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { 
  Users, CheckCircle2, FileText, Shield, 
  UploadCloud, UserPlus, FileSignature, PlusSquare,
  AlertTriangle, Clock, RefreshCw, Check, X, Bell
} from 'lucide-react';
import { 
  fetchTeams, 
  fetchGroups, 
  fetchNotifications, 
  getAdminSession 
} from '../../adminApi';

export default function UpAdminOverview() {
  const [teams, setTeams] = useState([]);
  const [groups, setGroups] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userContext, setUserContext] = useState({});

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const session = getAdminSession();
        setUserContext(session?.user || {});

        const [teamsRes, groupsRes, notifRes] = await Promise.allSettled([
          fetchTeams(),
          fetchGroups(),
          fetchNotifications()
        ]);

        if (teamsRes.status === 'fulfilled') setTeams(teamsRes.value.data || []);
        if (groupsRes.status === 'fulfilled') setGroups(groupsRes.value.data || []);
        if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data || []);

      } catch (error) {
        console.error("Failed to load UpAdmin dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">OVERVIEW</h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
            {userContext?.company_name || 'TechConsult Cyber Solutions'}. Group ID: {userContext?.id ? `TCS-${userContext.id}` : 'TCS-2847'}
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Team Members', value: loading ? '...' : teams.length.toString(), icon: Users, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' },
            { title: 'Active Groups', value: loading ? '...' : groups.length.toString(), icon: CheckCircle2, sub: '—', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' },
            { title: 'Pending Requests', value: '24', icon: Users, sub: 'Pending', subColor: 'text-orange-400 bg-orange-50', iconBg: 'bg-orange-100/50', iconColor: 'text-orange-500' }, // Placeholder
            { title: 'Documents', value: '182', icon: FileText, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-teal-100/50', iconColor: 'text-teal-600' }, // Placeholder
            { title: 'Security Status', value: '100%', icon: Shield, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' }, // Placeholder
            { title: 'Compliance Rate', value: '98%', icon: FileSignature, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50', iconColor: 'text-green-600' }, // Placeholder
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                {stat.trend && <span className={`text-[10px] sm:text-xs font-semibold ${stat.trendColor}`}>{stat.trend}</span>}
                {stat.sub && <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded ${stat.subColor || 'text-gray-400'}`}>{stat.sub}</span>}
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">{stat.title}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800 mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section: Activities & Service Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Team Activities (Placeholder Data) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">Recent Team Activities</h2>
              <button className="text-[10px] sm:text-xs font-semibold text-gray-500 hover:text-gray-800">View All</button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Sarah Mitchell', action: 'Uploaded document: Q4_Security_Report.pdf', time: '2 min ago', badges: [{ text: 'Document', color: 'bg-gray-100 text-gray-600' }] },
                { name: 'James Akanbi', action: 'Submitted access request for Classified Database Alpha', time: '2 hours ago', badges: [{ text: 'Pending Approval', color: 'bg-orange-50 text-orange-600' }] },
                { name: 'Sarah Mitchell', action: 'Logged into dashboard', time: '2 hours ago', badges: [{ text: 'Login', color: 'bg-gray-100 text-gray-600' }, { text: 'Verified', color: 'bg-teal-50 text-teal-600' }] },
                { name: 'Sarah Mitchell', action: 'Created new event config', time: '2 min ago', badges: [{ text: 'Config', color: 'bg-gray-100 text-gray-600' }, { text: 'Verified', color: 'bg-teal-50 text-teal-600' }] },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <img src={`https://ui-avatars.com/api/?name=${activity.name.replace(' ', '+')}&background=random`} alt={activity.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">{activity.name}</h3>
                      <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate">{activity.action}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activity.badges.map((badge, j) => (
                        <span key={j} className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded ${badge.color}`}>{badge.text}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Status (Placeholder Data) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-6">Service Status</h2>
            <div className="space-y-5 flex-1">
              {[
                { name: 'SecureDB', desc: 'Database Service', iconBg: 'bg-teal-100/50', iconColor: 'text-teal-600' },
                { name: 'SecureComms', desc: 'Communication Hub', iconBg: 'bg-purple-100/50', iconColor: 'text-purple-600' },
                { name: 'SecureAnalytics', desc: 'Analytics Engine', iconBg: 'bg-purple-100/50', iconColor: 'text-purple-600' },
                { name: 'AuthGateway', desc: 'Auth Service', iconBg: 'bg-teal-100/50', iconColor: 'text-teal-600' },
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`p-2 sm:p-2.5 rounded-xl ${service.iconBg} ${service.iconColor} shrink-0`}>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">{service.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">{service.desc}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></div>
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
                <div key={i} className="flex justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-500 truncate pr-2">{item.label}</span>
                  <span className="font-semibold text-gray-800 whitespace-nowrap">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Admin Action Center */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Admin Action Center</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Invite Team Member', desc: 'Add new users to your organization', icon: UserPlus, color: 'text-blue-500 bg-blue-50' },
              { title: 'Upload Document', desc: 'Add files to secure storage', icon: UploadCloud, color: 'text-purple-500 bg-purple-50' },
              { title: 'Submit Form', desc: 'Complete required documentation', icon: FileText, color: 'text-teal-500 bg-teal-50' },
              { title: 'Request New Service', desc: 'Apply for additional access', icon: PlusSquare, color: 'text-green-500 bg-green-50' },
            ].map((action, i) => (
              <button key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-left hover:border-gray-300 transition-all hover:shadow-md group flex flex-col h-full">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shrink-0 ${action.color}`}>
                  <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#759C2A] transition-colors">{action.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section: Notifications & Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">Notifications</h2>
              <span className="text-[10px] sm:text-xs font-semibold bg-green-100 text-green-600 px-2.5 py-1 rounded-full">
                 {notifications.length} Active
              </span>
            </div>
            <div className="space-y-3">
              {loading ? (
                 <div className="text-center text-xs text-gray-500 py-4">Loading notifications...</div>
              ) : notifications.length > 0 ? (
                 notifications.slice(0, 3).map((item, i) => (
                   <div key={item.id || i} className="bg-[#759C2A]/10 border border-[#759C2A]/20 p-3 sm:p-4 rounded-xl flex items-start gap-3 transition-colors hover:bg-[#759C2A]/20">
                     <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#759C2A] shrink-0 mt-0.5" />
                     <div className="min-w-0">
                       <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">{item.label}</h3>
                       <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 line-clamp-2">{item.short_message}</p>
                       <span className="text-[9px] sm:text-[10px] text-gray-400 mt-1 block font-mono">
                         {new Date(item.created_at).toLocaleDateString()}
                       </span>
                     </div>
                   </div>
                 ))
              ) : (
                <>
                  <div className="bg-red-50/50 border border-red-100 p-3 sm:p-4 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800">Security Alert</h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">Unusual login activity detected from 192.168.1.45</p>
                      <span className="text-[9px] sm:text-[10px] text-gray-400 mt-1 block">15 min ago</span>
                    </div>
                  </div>
                  <div className="bg-orange-50/50 border border-orange-100 p-3 sm:p-4 rounded-xl flex items-start gap-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800">Access Expiring Soon</h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">Your access to Classified DB Alpha expires in 7 days</p>
                      <span className="text-[9px] sm:text-[10px] text-gray-400 mt-1 block">15 min ago</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Pending Approvals (Placeholder Data) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">Pending Approvals</h2>
              <span className="text-[10px] sm:text-xs font-semibold bg-[#759C2A] text-white px-2 py-0.5 rounded-full">3</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'James Ben', req: 'Access request: Classified DB Alpha', time: '15 min ago' },
                { name: 'Lisa Anderson', req: 'Document approval: Security Protocol', time: '15 min ago' },
                { name: 'Robert Kim', req: 'Service request: ThreatWatch Pro', time: '15 min ago' },
              ].map((user, i) => (
                <div key={i} className="bg-[#F8FAFC] border border-gray-100 p-3 sm:p-4 rounded-xl flex items-center justify-between hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 mr-2">
                    <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} alt={user.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">{user.name}</h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{user.req}</p>
                      <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-1 whitespace-nowrap">{user.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2 shrink-0">
                    <button className="p-1 sm:p-1.5 bg-[#759C2A] text-white rounded hover:bg-[#638523] transition-colors">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-1 sm:p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
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
