import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Shield, Loader } from 'lucide-react';
import { createTeam } from '../../adminApi';

export default function TeamModal({ isOpen, onClose, user, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // If viewing an existing user, populate fields (read-only mode)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
        // Just close if in view mode
        onClose();
        return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      
      await createTeam(payload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      alert("Failed to create team member: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isViewMode = !!user;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isViewMode ? 'Member Details' : 'Add Team Member'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isViewMode ? 'View member information' : 'Invite a new member to your organization'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {isViewMode && (
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-[#1A2530] rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase shadow-inner mb-3 overflow-hidden">
                       {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover"/> : user.name?.substring(0, 2)}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {user.status || 'Unknown'}
                    </span>
                </div>
            )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                disabled={isViewMode}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                required
                disabled={isViewMode}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                disabled={isViewMode}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="+234..."
              />
            </div>
          </div>

          {isViewMode && user.role && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                System Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  disabled
                  value={user.role}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 capitalize"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
                <button 
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                Send Invite
                </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
