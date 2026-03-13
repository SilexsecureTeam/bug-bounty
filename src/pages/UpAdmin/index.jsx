import React, { useState, useEffect } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { Link } from 'react-router-dom';
import { 
  Users, CheckCircle2, FileText, Shield, 
  UploadCloud, UserPlus, FileSignature, PlusSquare,
  AlertTriangle, Clock, RefreshCw, Check, X, Bell
} from 'lucide-react';
import { 
  fetchTeams, fetchGroups, fetchNotifications, fetchFiles,
  changeTeamStatus, getAdminSession 
} from '../../adminApi';

export default function UpAdminOverview() {
  const [teams, setTeams] = useState([]);
  const [groups, setGroups] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filesCount, setFilesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [userContext, setUserContext] = useState({});

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const session = getAdminSession();
        setUserContext(session?.user || {});

        const [teamsRes, groupsRes, notifRes, filesRes] = await Promise.allSettled([
          fetchTeams(), fetchGroups(), fetchNotifications(), fetchFiles()
        ]);

        if (teamsRes.status === 'fulfilled') setTeams(teamsRes.value.data || []);
        if (groupsRes.status === 'fulfilled') setGroups(groupsRes.value.data || []);
        if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data || []);
        if (filesRes.status === 'fulfilled') setFilesCount((filesRes.value.data || []).length);

      } catch (error) {
        console.error("Failed to load UpAdmin dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const handleApprovalAction = async (id, status) => {
    setActionLoading(id);
    try {
      await changeTeamStatus(id, status);
      setTeams(prev => prev.map(member => member.id === id ? { ...member, status: status } : member));
    } catch (error) {
      alert(`Failed to ${status === 'active' ? 'approve' : 'decline'} user.`);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingMembers = teams.filter(t => t.status === 'pending');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">OVERVIEW</h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mt-1 transition-colors">
            {userContext?.company_name || 'TechConsult Cyber Solutions'}. Group ID: {userContext?.id ? `TCS-${userContext.id}` : 'TCS-2847'}
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Team Members', value: loading ? '...' : teams.length.toString(), icon: Users, trend: '+ 12%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50 dark:bg-[#1F3513]', iconColor: 'text-green-600 dark:text-[#4ADE80]' },
            { title: 'Active Groups', value: loading ? '...' : groups.length.toString(), icon: CheckCircle2, sub: '—', iconBg: 'bg-green-100/50 dark:bg-[#1F3513]', iconColor: 'text-green-600 dark:text-[#4ADE80]' },
            { title: 'Pending Requests', value: loading ? '...' : pendingMembers.length.toString(), icon: Users, sub: 'Pending', subColor: 'text-orange-400 bg-orange-50 dark:bg-[#352E13] dark:text-[#FACC15]', iconBg: 'bg-orange-100/50 dark:bg-[#352E13]', iconColor: 'text-orange-500 dark:text-[#FACC15]' },
            { title: 'Documents', value: loading ? '...' : filesCount.toString(), icon: FileText, trend: '+ 4%', trendColor: 'text-green-500', iconBg: 'bg-teal-100/50 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400' },
            { title: 'Security Status', value: '100%', icon: Shield, trend: '+ 0%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50 dark:bg-[#1F3513]', iconColor: 'text-green-600 dark:text-[#4ADE80]' }, 
            { title: 'Compliance Rate', value: '98%', icon: FileSignature, trend: '+ 2%', trendColor: 'text-green-500', iconBg: 'bg-green-100/50 dark:bg-[#1F3513]', iconColor: 'text-green-600 dark:text-[#4ADE80]' }, 
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#141613] p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-[#2A2E2A] shadow-sm flex flex-col justify-between transition-colors duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                {stat.trend && <span className={`text-[10px] sm:text-xs font-semibold ${stat.trendColor}`}>{stat.trend}</span>}
                {stat.sub && <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded ${stat.subColor || 'text-gray-400 dark:text-gray-500'}`}>{stat.sub}</span>}
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#9CA3AF] font-medium truncate">{stat.title}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section: Activities & Service Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Team Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-[#141613] rounded-2xl border border-gray-100 dark:border-[#2A2E2A] shadow-sm p-4 sm:p-6 overflow-x-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Recent Team Activities</h2>
              <button className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-[#9CA3AF] hover:text-gray-800 dark:hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Sarah Mitchell', action: 'Uploaded document: Q4_Security_Report.pdf', time: '2 min ago', badges: [{ text: 'Document', color: 'bg-gray-100 dark:bg-[#1F221F] text-gray-600 dark:text-gray-300' }] },
                { name: 'James Akanbi', action: 'Submitted access request for Classified Database Alpha', time: '2 hours ago', badges: [{ text: 'Pending Approval', color: 'bg-orange-50 dark:bg-[#352E13] text-orange-600 dark:text-[#FACC15]' }] },
                { name: 'Sarah Mitchell', action: 'Logged into dashboard', time: '2 hours ago', badges: [{ text: 'Login', color: 'bg-gray-100 dark:bg-[#1F221F] text-gray-600 dark:text-gray-300' }, { text: 'Verified', color: 'bg-teal-50 dark:bg-[#1F3513] text-teal-600 dark:text-[#4ADE80]' }] },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-50 dark:border-[#2A2E2A] last:border-0 last:pb-0">
                  <img src={`https://ui-avatars.com/api/?name=${activity.name.replace(' ', '+')}&background=random`} alt={activity.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 border dark:border-[#2A2E2A]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{activity.name}</h3>
                      <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#9CA3AF] mt-1 truncate">{activity.action}</p>
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

          {/* Service Status */}
          <div className="bg-white dark:bg-[#141613] rounded-2xl border border-gray-100 dark:border-[#2A2E2A] shadow-sm p-4 sm:p-6 flex flex-col transition-colors duration-300">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-6">Service Status</h2>
            <div className="space-y-5 flex-1">
              {[
                { name: 'SecureDB', desc: 'Database Service', iconBg: 'bg-teal-100/50 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400' },
                { name: 'SecureComms', desc: 'Communication Hub', iconBg: 'bg-purple-100/50 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
                { name: 'SecureAnalytics', desc: 'Analytics Engine', iconBg: 'bg-purple-100/50 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
                { name: 'AuthGateway', desc: 'Auth Service', iconBg: 'bg-teal-100/50 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400' },
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`p-2 sm:p-2.5 rounded-xl ${service.iconBg} ${service.iconColor} shrink-0`}>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{service.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#9CA3AF] truncate">{service.desc}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-[#2A2E2A] space-y-3">
              {[
                { label: 'Access Expirations', value: '3 soon' },
                { label: 'Classified DB Alph', value: '3 days' },
                { label: 'Intel Network', value: '7 days' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-500 dark:text-[#9CA3AF] truncate pr-2">{item.label}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Admin Action Center */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-4 transition-colors">Admin Action Center</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Invite Team Member', desc: 'Add new users', icon: UserPlus, color: 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20', path: '/upadmin/team' },
              { title: 'Upload Document', desc: 'Add files to storage', icon: UploadCloud, color: 'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20', path: '/upadmin/files' },
              { title: 'Submit Form', desc: 'Complete documentation', icon: FileText, color: 'text-teal-500 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20', path: '/upadmin/forms' },
              { title: 'Request Service', desc: 'Apply for access', icon: PlusSquare, color: 'text-green-500 dark:text-[#9ECB32] bg-green-50 dark:bg-[#1F3513]', path: '/upadmin/forms' },
            ].map((action, i) => (
              <Link to={action.path} key={i} className="bg-white dark:bg-[#141613] p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-[#2A2E2A] shadow-sm text-left hover:border-[#759C2A] dark:hover:border-[#9ECB32] transition-all hover:shadow-md group flex flex-col h-full cursor-pointer">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shrink-0 ${action.color}`}>
                  <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white group-hover:text-[#759C2A] dark:group-hover:text-[#9ECB32] transition-colors">{action.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#9CA3AF] mt-1">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section: Notifications & Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Notifications */}
          <div className="bg-white dark:bg-[#141613] rounded-2xl border border-gray-100 dark:border-[#2A2E2A] shadow-sm p-4 sm:p-6 overflow-hidden transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Notifications</h2>
              <span className="text-[10px] sm:text-xs font-bold bg-[#1F3513] text-[#4ADE80] px-2.5 py-1 rounded-full border border-[#2F4523]">
                 {notifications.length} Active
              </span>
            </div>
            <div className="space-y-3">
              {loading ? (
                 <div className="text-center text-xs text-gray-500 py-4"><Loader className="w-5 h-5 animate-spin text-[#759C2A] mx-auto mb-2"/>Loading notifications...</div>
              ) : notifications.length > 0 ? (
                 notifications.slice(0, 4).map((item, i) => (
                   <div key={item.id || i} className="bg-gray-50 dark:bg-[#1F221F] border border-gray-100 dark:border-[#2A2E2A] p-3 sm:p-4 rounded-xl flex items-start gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-[#2A2E2A]">
                     <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                     <div className="min-w-0">
                       <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white truncate">{item.label}</h3>
                       <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#9CA3AF] mt-0.5 line-clamp-2">{item.short_message || item.message}</p>
                       <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-600 mt-1 block font-mono">
                         {new Date(item.created_at).toLocaleDateString()}
                       </span>
                     </div>
                   </div>
                 ))
              ) : (
                <div className="text-center py-6 bg-gray-50 dark:bg-[#1F221F] rounded-xl border border-dashed border-gray-200 dark:border-[#2A2E2A]">
                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No new notifications.</p>
                </div>
              )}
            </div>
          </div>

          {/* Pending Team Approvals */}
          <div className="bg-white dark:bg-[#141613] rounded-2xl border border-gray-100 dark:border-[#2A2E2A] shadow-sm p-4 sm:p-6 overflow-hidden transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Pending Approvals</h2>
              <span className="text-[10px] sm:text-xs font-semibold bg-[#759C2A] text-black px-2 py-0.5 rounded-full">
                  {pendingMembers.length}
              </span>
            </div>
            <div className="space-y-3">
              {loading ? (
                  <div className="text-center text-xs text-gray-500 py-4"><Loader className="w-5 h-5 animate-spin text-[#759C2A] mx-auto mb-2"/>Loading members...</div>
              ) : pendingMembers.length > 0 ? (
                pendingMembers.map((user, i) => (
                  <div key={user.id || i} className="bg-[#F8FAFC] dark:bg-[#1F221F] border border-gray-100 dark:border-[#2A2E2A] p-3 sm:p-4 rounded-xl flex items-center justify-between hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 mr-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 bg-[#1A2530] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase overflow-hidden border dark:border-[#2A2E2A]">
                        {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover"/> : user.name?.substring(0, 2) || 'US'}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white truncate">{user.name || user.email}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#9CA3AF] mt-0.5 truncate">Team Access Request</p>
                        <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-1 whitespace-nowrap">
                            {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2 shrink-0">
                      <button 
                        disabled={actionLoading === user.id}
                        onClick={() => handleApprovalAction(user.id, 'active')}
                        className="p-1 sm:p-1.5 bg-[#759C2A] text-black rounded hover:bg-[#8AB32A] transition-colors disabled:opacity-50"
                        title="Approve"
                      >
                        {actionLoading === user.id ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </button>
                      <button 
                        disabled={actionLoading === user.id}
                        onClick={() => handleApprovalAction(user.id, 'block')}
                        className="p-1 sm:p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                        title="Decline"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                 <div className="text-center py-6 bg-gray-50 dark:bg-[#1F221F] rounded-xl border border-dashed border-gray-200 dark:border-[#2A2E2A]">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No pending approvals at this time.</p>
                 </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
