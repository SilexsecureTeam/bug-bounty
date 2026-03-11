import React, { useState, useEffect } from 'react';
import { X, FileText, AlignLeft, Users, Loader, Settings, ShieldAlert } from 'lucide-react';
import { createEvent, updateEvent } from '../../adminApi';

export default function RequestModal({ isOpen, onClose, request, mode, groups = [], onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    group_id: '',
    meeting_id: '',
    signup: 'disabled',
    attendance: 'disabled',
    status: 'active'
  });

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  useEffect(() => {
    if (isOpen) {
      if (request && (isEditMode || isViewMode)) {
        // Resolve group ID if name is passed
        let selectedGroupId = request.group_id;
        const matchedGroup = groups.find(g => g.name === request.group_id);
        if (matchedGroup) selectedGroupId = matchedGroup.id;

        setFormData({
          id: request.id,
          name: request.name || '',
          message: request.message || '',
          group_id: selectedGroupId || '',
          meeting_id: request.meeting_id || '',
          signup: request.signup || 'disabled',
          attendance: request.attendance || 'disabled',
          status: request.status || 'active'
        });
      } else {
        setFormData({
            name: '', message: '', group_id: '', meeting_id: '', 
            signup: 'disabled', attendance: 'disabled', status: 'active'
        });
      }
    }
  }, [request, isOpen, isEditMode, isViewMode, groups]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) {
        onClose();
        return;
    }

    setLoading(true);
    try {
      // The API expects JSON object for forms/events
      const payload = { ...formData };
      
      if (isEditMode) {
          await updateEvent(payload);
      } else {
          await createEvent(payload);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} form: ` + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isViewMode ? 'Form Details' : isEditMode ? 'Edit Form/Request' : 'Create Form/Request'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isViewMode ? 'View submission details' : 'Configure operational form details'}
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
        <div className="p-6 overflow-y-auto flex-1">
          <form id="form-request" onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Form / Event Title
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  required
                  disabled={isViewMode}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Enter Title"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Description / Message
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea 
                  disabled={isViewMode}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all min-h-[80px] disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Optional description"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Group Assignment</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                        <select 
                            required
                            disabled={isViewMode}
                            value={formData.group_id}
                            onChange={(e) => setFormData({...formData, group_id: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] appearance-none disabled:bg-gray-50 disabled:text-gray-500 cursor-pointer"
                        >
                            <option value="" disabled>Select Group</option>
                            {groups.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Meeting ID</label>
                    <input 
                        type="text" 
                        disabled={isViewMode}
                        value={formData.meeting_id}
                        onChange={(e) => setFormData({...formData, meeting_id: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Optional"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Settings className="w-3.5 h-3.5" /> Signup Status
                    </label>
                    <select 
                        disabled={isViewMode}
                        value={formData.signup}
                        onChange={(e) => setFormData({...formData, signup: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] appearance-none disabled:bg-gray-50 disabled:text-gray-500 cursor-pointer"
                    >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Settings className="w-3.5 h-3.5" /> Attendance
                    </label>
                    <select 
                        disabled={isViewMode}
                        value={formData.attendance}
                        onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] appearance-none disabled:bg-gray-50 disabled:text-gray-500 cursor-pointer"
                    >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Form Status
                </label>
                <select 
                    disabled={isViewMode}
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] appearance-none disabled:bg-gray-50 disabled:text-gray-500 cursor-pointer"
                >
                    <option value="active">Active</option>
                    <option value="block">Blocked</option>
                </select>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 shrink-0">
            <button 
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
                {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
                <button 
                    type="submit"
                    form="form-request"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {isEditMode ? 'Save Changes' : 'Create Form'}
                </button>
            )}
        </div>

      </div>
    </div>
  );
}
