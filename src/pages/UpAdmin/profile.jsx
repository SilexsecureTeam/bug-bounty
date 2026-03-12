import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { ShieldCheck, Monitor, MapPin, User, Mail, Camera, Loader } from 'lucide-react';
import { fetchProfile, updateProfile } from '../../adminApi';

export default function UpAdminProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Form State matching API requirements
  const [formData, setFormData] = useState({
    name: '',
    username: '', // From previous UI, keep it if needed visually, but API uses name
    email: '',    // Readonly usually, but keep in state
    phone: '',
    address: '',
    avatar: null, // Holds URL for preview
    enable_2fa: 0,
    device_token: '',
    device_type: '',
    pin: '',
    onboarding_stage: '',
    encryptorkey: '',
    role: '',     // To display Admin Role
    department: '',// To display Department/Company
  });
  
  const [selectedFile, setSelectedFile] = useState(null); // Holds actual file to upload

  // Mock data for sessions and logs as API doesn't seem to provide this yet
  const sessions = Array(4).fill({
    device: 'PRO-92X/Device v.12',
    location: 'Abuja, Abuja',
    ip: '192.168.1.10',
    status: 'Active Now'
  });

  const logs = [
    { title: 'Password changed', desc: 'Successfully updated administrative credentials', time: 'Oct 24, 2023, 12:45 PM' },
    { title: 'New Device authorized', desc: 'New login from Abuja', time: 'Oct 24, 2023, 12:45 PM' },
    { title: 'Profile Updated', desc: 'Avatar and phone number updated', time: 'Oct 24, 2023, 12:45 PM' },
  ];

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await fetchProfile();
      if (res && res.data && res.data.user) {
        const user = res.data.user;
        const company = res.data.companyUser;
        
        setFormData({
          name: user.name || '',
          username: user.username || '', 
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          avatar: user.avatar || null,
          enable_2fa: user.enable_2fa || 0,
          device_token: user.device_token || '',
          device_type: user.device_type || '',
          pin: user.pin || '',
          onboarding_stage: user.onboarding_stage || '',
          encryptorkey: user.encryptorkey || '',
          role: user.role || 'Admin',
          department: company?.name || 'Cybersecurity & Infrastructure',
        });
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
        ...formData, 
        [name]: type === 'checkbox' ? (checked ? 1 : 0) : value 
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create local preview
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = new FormData();
      
      // Append fields based on provided API spec
      payload.append('name', formData.name);
      payload.append('phone', formData.phone || '');
      payload.append('address', formData.address || '');
      payload.append('enable_2fa', formData.enable_2fa);
      
      // Append these if they exist to prevent sending "null" strings
      if(formData.device_token) payload.append('device_token', formData.device_token);
      if(formData.device_type) payload.append('device_type', formData.device_type);
      if(formData.pin) payload.append('pin', formData.pin);
      if(formData.onboarding_stage) payload.append('onboarding_stage', formData.onboarding_stage);
      if(formData.encryptorkey) payload.append('encryptor_key', formData.encryptorkey); // Note: API spec said encryptor_key, response was encryptorkey
      
      if (selectedFile) {
        payload.append('avatar', selectedFile);
      }

      await updateProfile(payload);
      alert("Profile updated successfully!");
      setSelectedFile(null); // Clear selected file after successful upload
      loadProfile(); // Reload to get definitive URLs and data
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Admin Profile</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
              Manage enterprise access and personal security configurations.
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <button 
                onClick={loadProfile}
                disabled={loading || saving}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
                onClick={handleSave}
                disabled={loading || saving}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#759C2A] text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#638523] transition-colors shadow-sm disabled:opacity-70"
            >
              {saving && <Loader className="w-3.5 h-3.5 animate-spin" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm relative">
          {loading && (
             <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                 <Loader className="w-8 h-8 animate-spin text-[#759C2A]" />
             </div>
          )}
          
          <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
            <User className="w-4 h-4 text-[#759C2A]" />
            Personal Details
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-gray-50 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-300" />
                  )}
                </div>
                <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-1 right-1 w-8 h-8 bg-[#759C2A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#638523] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                />
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Update Photo</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 flex-1">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-sm font-semibold text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[#759C2A] focus:bg-white transition-colors" 
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Email Address</label>
                <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="email" 
                        name="email"
                        readOnly
                        value={formData.email} 
                        className="w-full bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none cursor-not-allowed" 
                    />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-sm font-semibold text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[#759C2A] focus:bg-white transition-colors" 
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Admin Role</label>
                <input 
                  type="text" 
                  readOnly 
                  value={formData.role} 
                  className="w-full bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-500 rounded-xl px-4 py-3 focus:outline-none cursor-not-allowed uppercase" 
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Department / Company</label>
                <input 
                  type="text" 
                  readOnly 
                  value={formData.department} 
                  className="w-full bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-500 rounded-xl px-4 py-3 focus:outline-none cursor-not-allowed" 
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address} 
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-sm font-semibold text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[#759C2A] focus:bg-white transition-colors" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Security Controls */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#759C2A]" />
                  Security Controls
                </h2>
                {formData.enable_2fa === 1 && (
                  <span className="bg-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                    <ShieldCheck className="w-3.5 h-3.5" /> Enforced
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl mb-6 gap-4">
                <div className="flex gap-3 items-center">
                  <div className={`p-2 rounded-lg shrink-0 ${formData.enable_2fa === 1 ? 'bg-[#F2F7E9]' : 'bg-gray-100'}`}>
                    <ShieldCheck className={`w-5 h-5 ${formData.enable_2fa === 1 ? 'text-[#557B1A]' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Multi-Factor Authentication (MFA)</h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Extra security verification is {formData.enable_2fa === 1 ? 'enabled' : 'disabled'}</p>
                  </div>
                </div>
                
                {/* Toggle Switch for 2FA */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="enable_2fa"
                    checked={formData.enable_2fa === 1}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#759C2A]"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Change password</label>
                  <input type="password" placeholder="Current Password" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-medium text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#759C2A] focus:bg-white transition-colors" />
                </div>
                <div className="sm:mt-[22px]">
                  <input type="password" placeholder="New Password" className="w-full bg-[#F8FAFC] border border-gray-100 text-sm font-medium text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#759C2A] focus:bg-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 sm:p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  Active Sessions
                </h2>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                   {sessions.length} Devices
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[#CDE59C]/30">
                      <th className="px-4 sm:px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Device</th>
                      <th className="px-4 sm:px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 sm:px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">IP Address</th>
                      <th className="px-4 sm:px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sessions.map((session, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-gray-400" />
                            <span className="text-[11px] sm:text-xs font-bold text-gray-700">{session.device}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-[11px] sm:text-xs font-semibold text-gray-500">{session.location}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-[11px] sm:text-xs font-semibold text-gray-500">{session.ip}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="bg-[#EAF3D8] text-[#557B1A] text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {session.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                          <button className="text-[10px] font-bold text-red-400 hover:text-red-700 transition-colors uppercase tracking-wider bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg">
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
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin className="w-4 h-4 text-[#759C2A]" />
              Recent Activity
            </h2>
            <div className="relative border-l border-gray-200 ml-2 space-y-6 pb-2">
              {logs.map((log, i) => (
                <div key={i} className="relative pl-5">
                  <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full border-4 border-white bg-gray-50 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-[#759C2A] rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[9px] text-gray-400 font-bold mb-1 uppercase tracking-wider">{log.time}</p>
                    <h5 className="text-xs font-bold text-gray-800 leading-tight">{log.title}</h5>
                    <p className="text-[10px] text-gray-500 font-medium mt-1 leading-snug">{log.desc}</p>
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
