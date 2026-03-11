import React, { useState, useEffect, useRef } from 'react';
import { X, Users, Image as ImageIcon, Loader, AlignLeft } from 'lucide-react';
import { createGroup, updateGroup } from '../../adminApi';

export default function GroupModal({ isOpen, onClose, group, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const isEditMode = !!group;

  useEffect(() => {
    if (isOpen) {
      if (group) {
        setFormData({
          name: group.name || '',
          description: group.decription || group.description || '', // Note API returns 'decription'
        });
      } else {
        setFormData({ name: '', description: '' });
      }
      setFile(null);
    }
  }, [group, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description); // Adjust if API strictly expects 'decription'
      
      // Add 'decription' just in case of API typo consistency
      payload.append('decription', formData.description); 

      if (file) {
          payload.append('avatar', file);
      }

      if (isEditMode) {
          payload.append('id', group.id);
          await updateGroup(payload);
      } else {
          await createGroup(payload);
      }

      if (onSuccess) onSuccess();
      
    } catch (error) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} group: ` + error.message);
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
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Group' : 'Create New Group'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isEditMode ? 'Update group details and avatar' : 'Set up a new operational group'}
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
          <form id="group-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center mb-2">
               <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#759C2A] bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden transition-colors group relative"
               >
                   {file ? (
                       <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                   ) : group?.avatar ? (
                       <img src={group.avatar} alt="Current" className="w-full h-full object-cover" />
                   ) : (
                       <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-[#759C2A] transition-colors" />
                   )}
                   
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[10px] font-bold text-white uppercase tracking-wider">Upload</span>
                   </div>
               </div>
               <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase">Group Avatar (Optional)</p>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
               />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Group Name
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all"
                  placeholder="e.g., Cyber Intel"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Description / Function
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all min-h-[100px] resize-none"
                  placeholder="Describe the primary function of this group..."
                />
              </div>
            </div>

            {isEditMode && (
               <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex justify-between items-center">
                   <span className="text-xs font-bold text-gray-500 uppercase">Current Members</span>
                   <span className="text-lg font-extrabold text-gray-900">{group.member_count}</span>
               </div>
            )}

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
                Cancel
            </button>
            <button 
                type="submit"
                form="group-form"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {isEditMode ? 'Save Changes' : 'Create Group'}
            </button>
        </div>

      </div>
    </div>
  );
}
