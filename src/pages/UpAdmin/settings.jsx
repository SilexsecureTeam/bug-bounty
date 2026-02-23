import React, { useState } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { ChevronDown, Edit2 } from 'lucide-react';

// Reusable Toggle Component matching the design
const Toggle = ({ enabled, onChange }) => (
  <button 
    onClick={onChange}
    className={`w-10 h-6 rounded-full relative transition-colors duration-200 focus:outline-none shrink-0 ${enabled ? 'bg-[#4A5D23]' : 'bg-gray-200'}`}
  >
    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
  </button>
);

// Reusable Select Component
const SelectDropdown = ({ value, options }) => (
  <div className="relative">
    <select 
      className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer"
      defaultValue={value}
    >
      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Security Policies');

  // Using state to manage a few toggles for realism
  const [toggles, setToggles] = useState({
    upper: true, lower: true, numbers: false, special: true,
    mfaAll: false, mfaAdmin: true, rememberDevice: false,
    emailNotif: true, sysNotif: true, critNotif: true,
    sso: true, backup: true, threat: true, compliance: false,
    detailedLog: true, logIp: true, autoExport: true
  });

  const handleToggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }));

  const tabs = ['Security Policies', 'User & Role Management', 'Notification Rules', 'Service Configurations', 'Audit & Logs'];

  const roleData = [
    { role: 'Administrator', users: 12, perms: 'Full Access', status: 'Active' },
    { role: 'Security Analyst', users: 24, perms: 'Read, Write, Audit', status: 'Active' },
    { role: 'Auditor', users: 8, perms: 'Read Only, Audit', status: 'Active' },
    { role: 'Viewer', users: 45, perms: 'Read Only', status: 'Active' },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Configure enterprise security policies, roles, and platform configurations
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold tracking-wider transition-colors relative ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#759C2A]" />
              )}
            </button>
          ))}
        </div>

        {/* Settings Form Content */}
        <div className="space-y-10 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          
          {/* Password Policy */}
          <section className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Password Policy</h2>
              <p className="text-[11px] text-gray-500 font-medium">Define password requirements for all users</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Minimum Password length</div>
                  <div className="text-[11px] text-gray-500">Description: Require passwords to be at least this many characters</div>
                </div>
                <SelectDropdown value="12" options={['8', '10', '12', '14', '16']} />
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Require uppercase letters</div>
                  <div className="text-[11px] text-gray-500">At least one uppercase character required</div>
                </div>
                <Toggle enabled={toggles.upper} onChange={() => handleToggle('upper')} />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Require lowercase letters</div>
                  <div className="text-[11px] text-gray-500">At least one lowercase character required</div>
                </div>
                <Toggle enabled={toggles.lower} onChange={() => handleToggle('lower')} />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Require numbers</div>
                  <div className="text-[11px] text-gray-500">At least one numeric character required</div>
                </div>
                <Toggle enabled={toggles.numbers} onChange={() => handleToggle('numbers')} />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Require special characters</div>
                  <div className="text-[11px] text-gray-500">At least one special character (e.g., @,#,$,%) required</div>
                </div>
                <Toggle enabled={toggles.special} onChange={() => handleToggle('special')} />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-gray-800">Password expiration</div>
                  <div className="text-[11px] text-gray-500">Force password reset after specified days</div>
                </div>
                <SelectDropdown value="90 days" options={['30 days', '60 days', '90 days', '180 days']} />
              </div>
            </div>
          </section>

          {/* MFA Section */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Multi-Factor Authentication (MFA)</h2>
              <p className="text-[11px] text-gray-500 font-medium">Configure MFA requirements for user accounts</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Enforce MFA for all users</div>
                  <div className="text-[11px] text-gray-500">Require MFA for mobile device authorization</div>
                </div>
                <Toggle enabled={toggles.mfaAll} onChange={() => handleToggle('mfaAll')} />
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Enforce MFA for administrators</div>
                  <div className="text-[11px] text-gray-500">Require MFA for users with admin privileges</div>
                </div>
                <Toggle enabled={toggles.mfaAdmin} onChange={() => handleToggle('mfaAdmin')} />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Allowed MFA methods</div>
                  <div className="text-[11px] text-gray-500">At least one uppercase character required</div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-2 py-1 rounded">AUTHENTICATOR APP</span>
                  <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-2 py-1 rounded">SMS</span>
                  <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-2 py-1 rounded">EMAIL</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-gray-800">Grace period for MFA enrollment</div>
                  <div className="text-[11px] text-gray-500">Days before MFA becomes mandatory</div>
                </div>
                <SelectDropdown value="7 days" options={['3 days', '7 days', '14 days']} />
              </div>
            </div>
          </section>

          {/* Session Timeout */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Session Timeout</h2>
              <p className="text-[11px] text-gray-500 font-medium">Configure automatic logout settings</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Idle timeout duration</div>
                  <div className="text-[11px] text-gray-500">Automatically log out users after period of inactivity</div>
                </div>
                <SelectDropdown value="30 minutes" options={['15 minutes', '30 minutes', '1 hour']} />
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Maximum session duration</div>
                  <div className="text-[11px] text-gray-500">Require re-authentication after this time regardless of activity</div>
                </div>
                <SelectDropdown value="12 hours" options={['8 hours', '12 hours', '24 hours']} />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-gray-800">Remember device</div>
                  <div className="text-[11px] text-gray-500">Allow users to stay logged in on trusted devices</div>
                </div>
                <Toggle enabled={toggles.rememberDevice} onChange={() => handleToggle('rememberDevice')} />
              </div>
            </div>
          </section>

          {/* Role Definitions */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Role Definitions</h2>
              <p className="text-[11px] text-gray-500 font-medium">Manage user roles and their permission levels</p>
            </div>
            
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Role Name</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Permissions</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {roleData.map((role, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">{role.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{role.users}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{role.perms}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {role.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold text-gray-400 hover:text-gray-800 transition-colors">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Notification Rules */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Notification Rules</h2>
              <p className="text-[11px] text-gray-500 font-medium">Configure alert thresholds and account preferences</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Failed login attempts threshold</div>
                  <div className="text-[11px] text-gray-500">Alert admin if many attempts over failed logins</div>
                </div>
                <SelectDropdown value="7 days" options={['3 days', '7 days']} />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">Email notifications</div>
                  <div className="text-[11px] text-gray-500">Send admin alerts to security events</div>
                </div>
                <Toggle enabled={toggles.emailNotif} onChange={() => handleToggle('emailNotif')} />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-bold text-gray-800">System notifications</div>
                  <div className="text-[11px] text-gray-500">Display in-app alerts for security events</div>
                </div>
                <Toggle enabled={toggles.sysNotif} onChange={() => handleToggle('sysNotif')} />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-gray-800">Critical alert notifications</div>
                  <div className="text-[11px] text-gray-500">Immediate push notifications for un-clear security events</div>
                </div>
                <Toggle enabled={toggles.critNotif} onChange={() => handleToggle('critNotif')} />
              </div>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-[#759C2A] text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#638523] transition-colors shadow-sm">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
