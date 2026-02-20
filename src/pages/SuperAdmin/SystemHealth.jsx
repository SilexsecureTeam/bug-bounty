import React from 'react';
import { 
  CheckCircle2, Activity, AlertOctagon, Key, Zap, 
  Database, LineChart, Link as LinkIcon, Timer, 
  Ban, BarChart2, CheckSquare, Clock, ArrowUpRight, 
  ArrowDownRight, CalendarDays, Server
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const SystemHealth = () => {
  // Mock Data arrays to keep the main return clean
  const systemComponents = [
    { name: 'Authentication Services', desc: 'Authentication Services', icon: Key, status: 'Operational', time: 'Checked 1 Min ago' },
    { name: 'Core API', desc: 'REST endpoints, GraphQL, WebSocket, Connections', icon: Zap, status: 'Operational', time: 'Checked 1 Min ago' },
    { name: 'Data Services', desc: 'Primary database, Cache layer, Storage services', icon: Database, status: 'Operational', time: 'Checked 1 Min ago' },
    { name: 'Monitoring and Alerts', desc: 'System monitoring, Log aggregation, Alert dispatching', icon: LineChart, status: 'Operational', time: 'Checked 1 Min ago' },
    { name: 'Third-party Integrations', desc: 'Payment gateway, Email service, Cloud storage', icon: LinkIcon, status: 'Operational', time: 'Checked 1 Min ago' }
  ];

  const performanceMetrics = [
    { title: 'API response Time', value: '124ms', trend: '+ 2% from Last hour', trendUp: true, target: 'Target <200ms', status: 'On target', icon: Zap, iconColor: 'text-blue-500' },
    { title: 'System Latency', value: '45ms', trend: '- 3% from Last hour', trendUp: false, target: 'Target <100ms', status: 'On target', icon: Timer, iconColor: 'text-purple-500' },
    { title: 'Error Rate', value: '0.02%', trend: '- 1% from Last hour', trendUp: false, target: 'Target <0.05%', status: 'On target', icon: Ban, iconColor: 'text-yellow-500' },
    { title: 'Request Volume', value: '8.4k', trend: '+ 15% from Last hour', trendUp: true, target: 'Request limit', status: 'Normal Load', icon: BarChart2, iconColor: 'text-cyan-500' }
  ];

  const recentIncidents = [
    { title: 'Database Connection Timeout', desc: 'Brief connection timeout to primary database cluster', time: '2 days ago', tags: [{ label: 'Warn', color: 'bg-yellow-100 text-yellow-700' }, { label: 'Resolved', color: 'bg-green-100 text-green-700' }], duration: 'Duration: 8 minutes' },
    { title: 'API Rate Limit Exceeded', desc: 'Temporary rate limiting on authentication endpoints', time: '2 days ago', tags: [{ label: 'Info', color: 'bg-blue-100 text-blue-700' }, { label: 'Resolved', color: 'bg-green-100 text-green-700' }], duration: 'Duration: 8 minutes' },
    { title: 'CDN Performance Degradation', desc: 'Slower response times from edge locations', time: '2 days ago', tags: [{ label: 'Warn', color: 'bg-yellow-100 text-yellow-700' }, { label: 'Resolved', color: 'bg-green-100 text-green-700' }], duration: 'Duration: 15 minutes' }
  ];

  const scheduledMaintenance = [
    { title: 'Database Maintenance', desc: 'Brief connection timeout to primary database cluster', time: 'Jan 20, 2024 2:00 AM UTC Duration: 30 min', status: 'Upcoming', statusColor: 'text-blue-500', icon: Database, iconBg: 'bg-blue-50' },
    { title: 'Security Patch Deployment', desc: 'Brief connection timeout to primary database cluster', time: 'Jan 20, 2024 2:00 AM UTC Duration: 30 min', status: 'Scheduled', statusColor: 'text-purple-500', icon: Server, iconBg: 'bg-purple-50' }
  ];

  const recentDeployments = [
    { title: 'Core API v2.4.1', desc: 'Performance improvements and bug fixes', time: '2 hours ago', tag: 'Deployed', icon: CheckSquare, iconBg: 'bg-green-50' },
    { title: 'Monitoring system v1.4.2', desc: 'Performance improvements and bug fixes', time: 'Yesterday', tag: 'Deployed', icon: CheckSquare, iconBg: 'bg-green-50' }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">SYSTEM HEALTH</h1>
          <p className="text-gray-500 text-sm mt-1 max-w-lg">
            Real-time status of Defcomm's core systems, services, and infrastructure.
          </p>
        </div>

        {/* Top 4 Status Cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatusCard title="Platform Status" value="Healthy" valueColor="text-green-500" subtitle="All systems operational" icon={CheckCircle2} />
          <StatusCard title="System Uptime" value="99.8%" valueColor="text-gray-900" subtitle="Last 30 days" icon={Activity} />
          <StatusCard title="Active Services" value="12/13" valueColor="text-gray-900" subtitle="All services running" icon={CheckCircle2} />
          <StatusCard title="Active Incidents" value="0" valueColor="text-gray-900" subtitle="No Active Incidents" icon={AlertOctagon} />
        </div>

        {/* System Components Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Components</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {systemComponents.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F4F7F1] rounded-xl text-[#7CB342]">
                    <comp.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{comp.name}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{comp.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{comp.status}</span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{comp.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-4 gap-4">
            {performanceMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-bold text-gray-600">{metric.title}</p>
                  <metric.icon size={18} className={metric.iconColor} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</h3>
                <div className="flex items-center gap-1 text-xs font-semibold text-green-500 mb-6">
                  {metric.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {metric.trend}
                </div>
                <div className="flex justify-between items-center text-xs border-t border-gray-50 pt-3">
                  <span className="text-gray-400 font-medium">{metric.target}</span>
                  <span className="text-gray-600 font-bold">{metric.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Split Section: Incidents & Alerts | Maintenance & Updates */}
        <div className="grid grid-cols-2 gap-6 pb-8">
          
          {/* Left Column: Incidents & Alerts */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Incidents & Alerts</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              
              {/* No Active Incidents Banner */}
              <div className="flex items-center gap-3 p-4 bg-[#F4F7F1] border border-[#D4E7B5] rounded-xl">
                <CheckCircle2 size={24} className="text-[#7CB342]" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">No active incidents</h4>
                  <p className="text-xs text-gray-600 mt-0.5">All systems running normally</p>
                </div>
              </div>

              {/* Recent Incidents List */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4">Recent Incidents</h4>
                <div className="space-y-6">
                  {recentIncidents.map((incident, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1">
                        <CheckSquare size={20} className="text-[#7CB342]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm font-bold text-gray-900">{incident.title}</h5>
                          <span className="text-xs text-gray-400 font-medium">{incident.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mb-2">{incident.desc}</p>
                        <div className="flex items-center gap-2 text-xs">
                          {incident.tags.map((tag, tIdx) => (
                            <span key={tIdx} className={`px-2 py-0.5 rounded font-bold ${tag.color}`}>
                              {tag.label}
                            </span>
                          ))}
                          <span className="text-gray-500 ml-2">{incident.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Maintenance & Updates */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Maintenance & Updates</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8">
              
              {/* Scheduled Events */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4">Scheduled Events</h4>
                <div className="space-y-6">
                  {scheduledMaintenance.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className={`p-2.5 rounded-lg ${item.iconBg} h-fit`}>
                        <item.icon size={18} className={item.statusColor} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                          <span className={`text-xs font-bold ${item.statusColor}`}>{item.status}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 font-medium">
                          <Clock size={14} />
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Recent Deployments */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4">Recent Deployments</h4>
                <div className="space-y-6">
                  {recentDeployments.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className={`p-2.5 rounded-lg ${item.iconBg} h-fit text-[#7CB342]`}>
                        <item.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                          <span className="text-xs text-gray-400 font-medium">{item.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mb-2">{item.desc}</p>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

// Sub-component for Top Cards
const StatusCard = ({ title, value, valueColor, subtitle, icon: Icon }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-bold text-gray-600">{title}</h3>
      <div className="p-2 rounded-lg border border-gray-100 text-gray-600">
        <Icon size={18} />
      </div>
    </div>
    <div>
      <h2 className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</h2>
      <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
    </div>
  </div>
);

export default SystemHealth;
