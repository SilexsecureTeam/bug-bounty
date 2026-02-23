import React, { useState } from 'react';
import { X, Share2, File, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const ShareDocumentModal = ({ isOpen, onClose, document }) => {
  const [permissions, setPermissions] = useState('VIEW');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Centered Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-800">
            <Share2 className="w-5 h-5" />
            <h2 className="text-sm font-bold tracking-wider uppercase">Share Document Control</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* File Target */}
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">FILE TARGET</span>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <File className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {document?.name || 'rad_spec_phase4_v2.pdf'}
                </span>
              </div>
              <span className="bg-[#A098E5] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                Top Secret
              </span>
            </div>
          </div>

          {/* Assign Recipient */}
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">ASSIGN RECIPIENT / ROLE</span>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Enter name, email, or operational group..." 
                className="w-full bg-[#F2F7E9] border-none text-sm font-medium text-gray-700 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 placeholder:text-gray-400"
              />
              {/* Selected User Pills */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-lg">
                  Daniel Michael
                  <button className="hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-lg">
                  Rose Michel
                  <button className="hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>
                </span>
              </div>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Permissions Matrix</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'VIEW', label: 'VIEW' },
                { id: 'DOWNLOAD', label: 'DOWNLOAD' },
                { id: 'RE-SHARE', label: 'RE-SHARE' }
              ].map((perm) => (
                <button
                  key={perm.id}
                  onClick={() => setPermissions(perm.id)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[11px] font-bold transition-all ${
                    permissions === perm.id 
                      ? 'bg-[#EAF3D8] border-[#759C2A] text-[#557B1A]' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {permissions === perm.id ? (
                    <CheckCircle2 className="w-4 h-4 fill-[#557B1A] text-white" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  {perm.label}
                </button>
              ))}
            </div>
          </div>

          {/* Security Warning */}
          <div className="bg-[#FFF8EC] border border-[#F5D7B6] rounded-xl p-4 flex gap-3 items-start">
            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider mb-1">VIEW!</div>
              <p className="text-[11px] text-[#B45309] font-medium leading-relaxed">
                All sharing events are recorded in the Permanent Audit Log. Recipients will see dynamic watermarks including their ID and current timestamp. Breach of protocol will trigger an automated security event notification.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex gap-4 mt-2 justify-center sm:justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            CANCEL
          </button>
          <button className="px-6 py-2.5 bg-[#759C2A] text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#638523] transition-colors shadow-sm">
            AUTHORIZE SHARE
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShareDocumentModal;
