import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, Briefcase, Plus, 
  Circle
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Plans = () => {
  const [taxAutomation, setTaxAutomation] = useState(false);
  const [autoSuspension, setAutoSuspension] = useState(true);

  // Mock Data mimicking the image exactly
  const plansData = [
    { name: 'Super Plan', tier: 'Tier 3', tierColor: 'text-[#d6985a]', price: 'N12,500.00', cycle: 'Monthly', limits: 'Unlimited Users, 1TB Storage', orgs: '142', status: 'Active' },
    { name: 'Global Encryption...', tier: 'Tier 2', tierColor: 'text-emerald-500', price: 'N12,500.00', cycle: 'Monthly', limits: '50 Users, 500GB Storage', orgs: '142', status: 'Active' },
    { name: 'Bug Bounty', tier: 'Tier 1', tierColor: 'text-purple-500', price: 'N12,500.00', cycle: 'Monthly', limits: '10 Users, 100GB Storage', orgs: '142', status: 'Active' },
    { name: 'Enterprise Gold', tier: 'Tier 1', tierColor: 'text-purple-500', price: 'N12,500.00', cycle: 'Yearly', limits: '5 Users, 50GB Storage', orgs: '142', status: 'Active' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* Top Metric Cards */}
        <div className="grid grid-cols-5 gap-4">
          <TopMetricCard title="Total Subscriptions" value="1028" trend="+0%" />
          <TopMetricCard title="MRR" value="N205,000" trend="+5%" />
          <TopMetricCard title="Active Trials" value="842" trend="+1.5%" />
          <TopMetricCard title="Suspended" value="12" trend="-0%" isNegative />
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Watchlist</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">1028</h3>
          </div>
        </div>

        {/* Subscription Plans Table */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-2">Subscription Plans</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Plan Name</th>
                    <th className="px-6 py-4">Tier</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Cycle</th>
                    <th className="px-6 py-4">Limits</th>
                    <th className="px-6 py-4">Active Orgs</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {plansData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{row.name}</td>
                      <td className="px-6 py-4 font-bold"><span className={row.tierColor}>{row.tier}</span></td>
                      <td className="px-6 py-4 font-bold text-gray-900">{row.price}</td>
                      <td className="px-6 py-4 text-gray-700">{row.cycle}</td>
                      <td className="px-6 py-4 leading-snug">
                         {row.limits.split(',').map((line, i) => (
                           <React.Fragment key={i}>
                             <span className={i === 0 ? "font-bold text-gray-900" : "text-gray-500 text-xs"}>{line}</span>
                             {i === 0 && <br/>}
                           </React.Fragment>
                         ))}
                      </td>
                      <td className="px-6 py-4 font-medium">{row.orgs}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-green-700">
                          <Circle size={6} className="fill-green-600 text-green-600" /> {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Split Section */}
        <div className="grid grid-cols-2 gap-6 pt-4">
          
          {/* Left Column: Activity Feed */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex gap-6 border-b border-gray-100 text-sm font-bold pb-3 mb-6">
              <button className="text-gray-900 border-b-2 border-[#7CB342] pb-3 -mb-3">Subscription Activity</button>
              <button className="text-gray-400 hover:text-gray-700 transition">System Events</button>
            </div>
            
            <div className="space-y-6">
              <ActivityItem 
                icon={Briefcase} iconColor="text-[#A3E635]" iconBg="bg-[#f0f9e1]"
                text={<span>Plan <strong>Enterprise Gold</strong> was updated by <span className="text-green-600">admin_jef</span></span>}
                time="2 mins ago"
              />
              <ActivityItem 
                icon={Plus} iconColor="text-emerald-500" iconBg="bg-emerald-50"
                text={<span>New organization <strong>Stark Industries</strong> subscribed to Professional Plus</span>}
                time="45 minutes ago"
              />
              <ActivityItem 
                icon={Briefcase} iconColor="text-red-500" iconBg="bg-red-50"
                text={<span>Subscription failed for <strong>Wayne Corp</strong> due to payment error</span>}
                time="1 hour ago"
              />
            </div>
          </div>

          {/* Right Column: Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              {/* Note: Figma has the exact same tabs on the right side. Replicating design faithfully */}
              <div className="flex gap-6 border-b border-gray-100 text-sm font-bold pb-3 mb-6">
                <button className="text-gray-900 border-b-2 border-[#7CB342] pb-3 -mb-3">Subscription Activity</button>
                <button className="text-gray-400 hover:text-gray-700 transition">System Events</button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Automatic Suspension</h3>
                    <p className="text-xs text-gray-500">Suspend organizations after 3 failed payment attempts</p>
                  </div>
                  <ToggleSwitch isOn={autoSuspension} onToggle={() => setAutoSuspension(!autoSuspension)} />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Tax Automation</h3>
                    <p className="text-xs text-gray-500">Calculate regional VAT/GST automatically via Stripe</p>
                  </div>
                  <ToggleSwitch isOn={taxAutomation} onToggle={() => setTaxAutomation(!taxAutomation)} />
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Tax Automation</h3>
                  <select className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 bg-white">
                    <option>USD-US Dollar</option>
                    <option>NGN-Nigerian Naira</option>
                    <option>EUR-Euro</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#A3E635] text-[#2d4710] font-bold py-3.5 rounded-lg shadow-sm border border-[#92ce2f] hover:bg-[#8ee014] transition mt-6">
              Save Changes
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---

const TopMetricCard = ({ title, value, trend, isNegative }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-28">
    <div className="flex justify-between items-start mb-2">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
        {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        {trend}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

const ActivityItem = ({ icon: Icon, iconColor, iconBg, text, time }) => (
  <div className="flex items-start gap-3">
    <div className={`p-2 rounded-lg ${iconBg} ${iconColor} shrink-0`}>
      <Icon size={18} strokeWidth={2.5} />
    </div>
    <div>
      <p className="text-sm text-gray-700 leading-snug">{text}</p>
      <p className="text-xs text-gray-400 font-medium mt-1">{time}</p>
    </div>
  </div>
);

const ToggleSwitch = ({ isOn, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-10 h-6 rounded-full relative transition-colors duration-200 focus:outline-none shrink-0 ${isOn ? 'bg-[#5c8024]' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${isOn ? 'right-1' : 'left-1'}`}></div>
  </button>
);

export default Plans;
