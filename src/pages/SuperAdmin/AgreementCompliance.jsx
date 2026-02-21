import React, { useState } from 'react';
import { Download } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AgreementCompliance = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] space-y-6 pb-12">
        
        {/* Page Header */}
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Agreement Compliance</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review and accept the platform usage terms to maintain operational access
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-8 border-b border-gray-200 text-sm font-bold pt-2">
          <button className="pb-3 text-gray-900 border-b-2 border-[#7CB342]">Platform Usage Policy</button>
          <button className="pb-3 text-gray-400 hover:text-gray-700">Data Protection</button>
          <button className="pb-3 text-gray-400 hover:text-gray-700">Security Guidelines</button>
          <button className="pb-3 text-gray-400 hover:text-gray-700">Confidentiality Agreement</button>
        </div>

        {/* Content Layout */}
        <div className="flex gap-8 mt-6">
          
          {/* Left Column (Metadata) */}
          <div className="w-64 shrink-0 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">DOCUMENT INFO</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Version</p>
                  <p className="text-sm font-bold text-gray-900">4.2.1. SEC</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Classification</p>
                  <p className="text-sm font-bold text-gray-900">RESTRICTED</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Legal contact</p>
                  <a href="mailto:compliance@defcomm.org" className="text-sm font-bold text-gray-900 hover:underline">
                    compliance@defcomm.org
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="font-serif text-lg leading-none mt-1">!</span> IMPORTANT
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                This document is legally binding. Failure to adhere to the platform usage policy may result in immediate suspension of system privileges and internal investigation.
              </p>
            </div>
          </div>

          {/* Right Column (Document & Actions) */}
          <div className="flex-1 space-y-4">
            
            {/* Document Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
              
              <div className="bg-[#EAF4D9] px-6 py-2.5 text-xs font-bold text-[#5c8024]">
                Last Updated: October 28, 2023 | 09:42 UTC
              </div>
              
              <div className="p-8 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar text-gray-600">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">1. Platform Usage Policy</h2>
                  <p className="text-sm leading-relaxed">
                    This Platform Usage Policy ("Policy") governs your access to and use of the Defcomm Unified Defense Environment Platform. By accessing the Platform, you agree to be bound by these terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">1.1 Authorized Use</h3>
                  <p className="text-sm leading-relaxed">
                    Users are granted a limited, non-exclusive, non-transferable right to access the Platform solely for authorized departmental operations. Use of the Platform for personal, commercial, or unauthorized intelligence gathering is strictly prohibited.
                  </p>
                </div>

                <div className="bg-[#F4F7F1] border-l-4 border-[#7CB342] p-5 rounded-r-xl">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">NOTICE OF MONITORING</h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    All activity performed on the Platform is subject to continuous monitoring, logging, and audit by the System Administration Center (SOC). There is no expectation of privacy when using government-connected infrastructure.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">1.2 Prohibited Activities</h3>
                  <ul className="text-sm leading-relaxed list-disc list-inside space-y-2">
                    <li>Circumventing, disabling, or tampering with any security-related features of the Platform.</li>
                    <li>Attempting to probe, scan, or test the vulnerability of the network without explicit written authorization.</li>
                    <li>Sharing credentials or multi-factor authentication devices with any other individual.</li>
                    <li>Exporting restricted data to non-cleared external storage devices.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">1.3 Incident Reporting</h3>
                  <p className="text-sm leading-relaxed">
                    Any suspected security breach, unauthorized access, or policy violation must be reported immediately to the System Administration via the "Emergency Report" protocol within 15 minutes of discovery.
                  </p>
                </div>
                
                <hr className="border-gray-100 my-6" />
                <p className="text-xs text-gray-400 italic">End of Section 1. Continuing to Section 2: Data Protection...</p>
              </div>
            </div>

            {/* Acknowledgment Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <input 
                type="checkbox" 
                id="legal-ack"
                className="w-5 h-5 mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <div className="flex-1">
                <label htmlFor="legal-ack" className="block text-base font-bold text-gray-900 mb-1 cursor-pointer">
                  Legal Acknowledgement
                </label>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  I acknowledge that I have read and understood the Platform Usage Policy and agree to comply with all stated regulations. I understand that my acceptance is logged from IP <span className="font-mono">192.168.1.104</span>.
                </p>
              </div>
              <div className="flex gap-3 mt-2 shrink-0">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm text-sm">
                  <Download size={16} /> Download PDF
                </button>
                <button 
                  disabled={!isChecked}
                  className={`flex items-center gap-2 px-6 py-2.5 font-bold rounded-lg transition shadow-sm text-sm ${isChecked ? 'bg-[#A3E635] text-[#2d4710] hover:bg-[#8ee014] border border-[#92ce2f]' : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'}`}
                >
                  Accept Agreement {'>'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgreementCompliance;
