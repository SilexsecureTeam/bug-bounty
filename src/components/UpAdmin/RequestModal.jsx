import React from 'react';
import { X, CheckCircle2, Circle, FileText, FileCheck } from 'lucide-react';

const RequestModal = ({ isOpen, onClose, request }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div className="relative bg-[#F8FAFC] w-full max-w-md h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Request Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">
          
          {/* ActiveTrack Info Box */}
          <div className="bg-[#EAF3D8] border border-[#D5E8B5] rounded-xl p-5">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider mb-1">ACTIVETRACK</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{request?.id || 'REQ-9942-A'}</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Quarterly Security Audit - Site B. Initiated by Sarah Chen for this regulatory compliance cycle.
            </p>
          </div>

          {/* Lifecycle Timeline */}
          <div>
            <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-6">LIFECYCLE TIMELINE</h4>
            
            <div className="relative border-l border-gray-300 ml-3 space-y-8 pb-4">
              
              {/* Step 1: Completed */}
              <div className="relative pl-8">
                <div className="absolute -left-[11px] top-0 bg-[#F8FAFC] py-1">
                  <CheckCircle2 className="w-5 h-5 text-white fill-[#14B8A6]" />
                </div>
                <h5 className="text-sm font-bold text-gray-800">Database Connection Timeout</h5>
                <p className="text-[10px] text-gray-500 mt-0.5 mb-1">Oct 24, 2025, 09:12 AM</p>
                <p className="text-[11px] text-gray-600 font-medium">Verified by S. Chen (Original Submitter)</p>
              </div>

              {/* Step 2: Completed with Document */}
              <div className="relative pl-8">
                <div className="absolute -left-[11px] top-0 bg-[#F8FAFC] py-1">
                  <CheckCircle2 className="w-5 h-5 text-white fill-[#14B8A6]" />
                </div>
                <h5 className="text-sm font-bold text-gray-800">Security Verification</h5>
                <p className="text-[10px] text-gray-500 mt-0.5 mb-1">Oct 25, 2025, 14:45</p>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium bg-white border border-gray-200 inline-flex px-2 py-1 rounded">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  Verified by S. Chen (Original Submitter)
                </div>
              </div>

              {/* Step 3: In Progress */}
              <div className="relative pl-8">
                <div className="absolute -left-[11px] top-0 bg-[#F8FAFC] py-1">
                  <div className="w-5 h-5 rounded-full border-2 border-[#F59E0B] bg-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                  </div>
                </div>
                <h5 className="text-sm font-bold text-[#D97706]">Final Approval</h5>
                <p className="text-[11px] text-gray-600 font-medium mt-0.5">In Progress...</p>
                <p className="text-[11px] text-gray-500 italic mt-1">Awaiting response from Chief Compliance Officer</p>
              </div>

              {/* Step 4: Not Started */}
              <div className="relative pl-8">
                <div className="absolute -left-[11px] top-0 bg-[#F8FAFC] py-1">
                  <Circle className="w-5 h-5 text-gray-300 fill-white" />
                </div>
                <h5 className="text-sm font-bold text-gray-500">Archival & Distribution</h5>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Not Started</p>
              </div>

            </div>
          </div>

          {/* Compliance Audit Note */}
          <div className="bg-[#EAF3D8] border border-[#D5E8B5] rounded-xl p-5 flex gap-3 items-start">
            <FileCheck className="w-5 h-5 text-[#557B1A] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">COMPLIANCE AUDIT NOTE</div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed italic">
                "All verification steps followed protocol & documentation package is complete for final signoff."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestModal;
