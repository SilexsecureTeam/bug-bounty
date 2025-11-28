// /src/pages/submit-report.jsx
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {
  Smartphone,
  Monitor,
  Globe,
  HelpCircle,
  ChevronDown,
  Paperclip,
  Image as ImageIcon,
  RefreshCw
} from "lucide-react";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import { fetchPrograms, submitReport, fetchReportLogs } from "../api";
import { getUser } from "../hooks/useAuthToken";

// Default ID provided in prompt/previous context
const DEFAULT_PROGRAM_ID =
  "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

const DRAFT_KEY = "reportDraft";
const DRAFTS_LIST_KEY = "reportDrafts";

const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "text-[#FF4D4D] bg-[#FF4D4D]/10 border-[#FF4D4D]/20";
    case "high":
      return "text-[#FF884D] bg-[#FF884D]/10 border-[#FF884D]/20";
    case "medium":
      return "text-[#FFD166] bg-[#FFD166]/10 border-[#FFD166]/20";
    case "low":
      return "text-[#06D6A0] bg-[#06D6A0]/10 border-[#06D6A0]/20";
    default:
      return "text-gray-400 bg-gray-800 border-gray-700";
  }
};

const PLATFORM_CATEGORIES = {
  device: [
    "Hardware Security", "Firmware Analysis", "Side Channel Attacks",
    "Radio Frequency (RF)", "IoT Misconfiguration"
  ],
  software: [
    "Buffer Overflow", "Logic Errors", "Privilege Escalation",
    "Memory Corruption", "Cryptographic Weakness"
  ],
  web: [
    "Cross-Site Scripting (XSS)", "SQL Injection", "Broken Authentication",
    "IDOR", "SSRF", "CSRF", "Security Misconfiguration"
  ]
};

const SEVERITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" }
];

const REPORT_TEMPLATE = `
<p><strong>#Summary</strong></p>
<p><br></p>
<p><strong>#Steps to reproduce</strong></p>
<ol>
  <li></li>
  <li></li>
  <li></li>
</ol>
<p><br></p>
<p><strong>#Expected result</strong></p>
<p><br></p>
<p><strong>#Actual result</strong></p>
<p><br></p>
`;

export default function SubmitReport() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  // Data for sidebar logs
  const [reportLogs, setReportLogs] = useState([]);
  const [activeQueueTab, setActiveQueueTab] = useState("Open"); // "Open" or "Closed"

  // Selection States
  const [selectedPlatform, setSelectedPlatform] = useState("web");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const fileInputRef = useRef(null);
  const autosaveRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    category: "",
    severity: "low",
    detail: REPORT_TEMPLATE, // Default template
    attachment: null
  });

  // UI State
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [lastAutosave, setLastAutosave] = useState(null);

  // --- Effects ---

  // 1. Fetch User, Programs & Logs on Mount
  useEffect(() => {
    const initData = async () => {
      // Get User
      const userData = getUser();
      if (userData) {
        setUser(userData);
      }

      try {
        const progData = await fetchPrograms();
        if (Array.isArray(progData.programs) && progData.programs.length) {
          setPrograms(progData.programs);
        }
      } catch (error) {
        console.error("Failed to fetch programs", error);
      }

      try {
        const logData = await fetchReportLogs();
        if (logData?.data) {
          setReportLogs(logData.data);
        }
      } catch (error) {
        console.error("Failed to fetch report logs", error);
      }
    };

    initData();

    // Load Named Drafts List
    try {
      const savedDrafts = JSON.parse(localStorage.getItem(DRAFTS_LIST_KEY) || "[]");
      setDrafts(Array.isArray(savedDrafts) ? savedDrafts : []);
    } catch {
      setDrafts([]);
    }

    // Check for Autosave
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title) {
           setFormData(prev => ({
             ...prev,
             ...parsed,
             attachment: null 
           }));
           if(parsed.selectedPlatform) setSelectedPlatform(parsed.selectedPlatform);
           setLastAutosave(new Date().toISOString());
           toast("Restored unsaved draft", { icon: "📝", duration: 2000 });
        }
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  // 2. Autosave Logic
  useEffect(() => {
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    
    autosaveRef.current = setTimeout(() => {
      // Don't autosave if empty or just template
      if (formData.title === "" && formData.detail === REPORT_TEMPLATE) return;

      const draftData = {
        program_id: formData.program_id,
        title: formData.title,
        category: formData.category,
        severity: formData.severity,
        detail: formData.detail,
        selectedPlatform: selectedPlatform
      };
      
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
      setLastAutosave(new Date().toISOString());
    }, 3000); // Autosave every 3 seconds of inactivity

    return () => clearTimeout(autosaveRef.current);
  }, [formData, selectedPlatform]);

  // 3. Attachment Preview
  useEffect(() => {
    if (formData.attachment instanceof File) {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
      try {
        const url = URL.createObjectURL(formData.attachment);
        setAttachmentPreview(url);
      } catch {
        setAttachmentPreview(null);
      }
    } else {
      if (attachmentPreview) {
        URL.revokeObjectURL(attachmentPreview);
        setAttachmentPreview(null);
      }
    }
    return () => {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
  }, [formData.attachment]);


  // --- Handlers ---

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    setFormData(prev => ({ ...prev, category: "" }));
  };

  const handleDetailChange = (content) => {
    setFormData(prev => ({ ...prev, detail: content }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, attachment: file }));
      toast.success(`Attached: ${file.name}`);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const resetForm = () => {
    setFormData({
      program_id: "",
      title: "",
      category: "",
      severity: "low",
      detail: REPORT_TEMPLATE, // Keep placeholders
      attachment: null
    });
    setAttachmentPreview(null);
    localStorage.removeItem(DRAFT_KEY); // Clear autosave
    toast.success("Form reset for new post");
  };

  const saveNamedDraft = () => {
    if (!formData.title) {
      toast.error("Please enter a title to save a draft");
      return;
    }
    const newDraft = {
      id: Date.now(),
      name: formData.title,
      savedAt: new Date().toISOString(),
      data: {
        ...formData,
        selectedPlatform,
        attachment: null // Files can't be saved
      }
    };

    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);
    localStorage.setItem(DRAFTS_LIST_KEY, JSON.stringify(updatedDrafts));
    toast.success("Draft saved successfully");
  };

  const loadDraft = (draft) => {
    setFormData({
      ...draft.data,
      attachment: null
    });
    if(draft.data.selectedPlatform) setSelectedPlatform(draft.data.selectedPlatform);
    toast.success(`Loaded draft: ${draft.name}`);
  };

  const deleteDraft = (id, e) => {
    e.stopPropagation();
    const updated = drafts.filter(d => d.id !== id);
    setDrafts(updated);
    localStorage.setItem(DRAFTS_LIST_KEY, JSON.stringify(updated));
    toast.success("Draft deleted");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct Payload exactly as requested
    const payload = new FormData();
    
    // Use existing program ID if selected, else default or first available
    const progId = formData.program_id || (programs[0]?.id || DEFAULT_PROGRAM_ID);
    
    payload.append("program_id", progId);
    payload.append("title", formData.title);
    payload.append("detail", formData.detail); // Sending HTML content
    payload.append("category", formData.category);
    payload.append("severity", formData.severity);

    if (formData.attachment) {
      payload.append("attachment", formData.attachment);
    }

    try {
      await submitReport(payload);
      toast.success("Report submitted successfully!");
      
      // Refresh logs
      const logData = await fetchReportLogs();
      if(logData?.data) setReportLogs(logData.data);

      resetForm();
    } catch (error) {
      toast.error(error?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  // --- Helpers ---
  const selectedProgramName =
    programs.find((p) => p.id.toString() === formData.program_id)?.program_name ||
    (programs.length > 0 ? "Select Program" : "Default Program");

  const isImageFile = (fileOrUrl) => {
    if (!fileOrUrl) return false;
    if (typeof fileOrUrl === "string") return /\.(jpe?g|png|gif|webp|bmp)$/i.test(fileOrUrl);
    return fileOrUrl.type?.startsWith("image/");
  };

  // Filter logs for sidebar based on tab
  const filteredLogs = reportLogs.filter(log => {
    const status = log.status?.toLowerCase() || "";
    if (activeQueueTab === "Open") {
      return ["new", "under review", "accepted", "triaged"].includes(status);
    } else {
      return ["closed", "resolved", "rejected"].includes(status);
    }
  });
  
  // User Profile Data
  const userName = user ? `${user.firstName} ${user.lastName}` : "Guest Hunter";
  const userInitials = user && user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : "GH";
    
  const creditProfiles = [{ initials: userInitials, name: userName }];

  // --- Components ---

  const PlatformCard = ({ id, label, icon: Icon }) => (
    <button
      type="button"
      onClick={() => handlePlatformChange(id)}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border p-6 transition-all duration-200 ${selectedPlatform === id
          ? "border-[#9FC24D] bg-[#9FC24D]/5 text-[#9FC24D]"
          : "border-[#2A303C] bg-[#0E131D] text-[#7F8698] hover:border-[#3F4555]"
        }`}
    >
      <Icon size={28} strokeWidth={1.5} />
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );

  // Custom Toolbar for React Quill
  const CustomToolbar = () => (
    <div id="toolbar" className="flex items-center gap-4 border-t border-[#2A303C] p-3">
      <span className="ql-formats flex gap-1">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <div className="h-4 w-px bg-[#2A303C]" />
      <span className="ql-formats flex gap-1">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </span>
      <div className="h-4 w-px bg-[#2A303C]" />
      <span className="ql-formats flex gap-1">
        <button className="ql-link" />
        <button type="button" onClick={triggerFileUpload} className="flex items-center justify-center text-[#7F8698] hover:text-white transition-colors">
          <ImageIcon size={18} />
        </button>
      </span>

      {formData.attachment && (
        <div className="ml-auto flex items-center gap-2 rounded-md bg-[#9FC24D]/10 px-3 py-1 text-xs text-[#9FC24D]">
          <Paperclip size={12} />
          <span className="max-w-[100px] truncate">{formData.attachment.name}</span>
          <button
            onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, attachment: null })); }}
            className="ml-1 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070C] text-white">
      <PortalHeader activeLabel="Submit a report" />

      <main className="mx-auto flex w-full text-sm! gap-10 px-4 md:px-12 pb-20 pt-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="hidden md:w-[330px] shrink-0 flex-col rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-6 text-sm text-[#C5CBD8] shadow-[0_25px_70px_rgba(5,8,15,0.55)] lg:flex">
          <div className="flex items-center justify-between text-xs font-semibold tracking-[0.32em] text-[#E4E9F6]">
            <span>Security Research</span>
            <button
              type="button"
              className="rounded-full bg-[#97C94F] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#172007] shadow-[0_10px_25px_rgba(109,155,45,0.45)]"
              onClick={saveNamedDraft}
            >
              Save Draft
            </button>
          </div>

          {/* Search */}
          <div className="mt-5">
            <label className="sr-only" htmlFor="queue-search">
              Search reports
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#5E667B]">🔍</span>
              <input
                id="queue-search"
                type="search"
                placeholder="Search here"
                className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] py-2 pl-9 pr-3 text-xs text-[#E2E8F6] placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
              />
            </div>
          </div>

          {/* Queue Tabs */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex overflow-hidden rounded-full border border-[#202634] bg-[#111722] text-xs font-semibold uppercase tracking-[0.3em] text-[#70788F]">
              {["Open", "Closed"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveQueueTab(label)}
                  className={`px-4 py-2 transition-colors duration-150 ${activeQueueTab === label ? "bg-[#96C74B] text-[#131C09]" : "hover:text-[#E2E8F6]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={resetForm}
              type="button" className="rounded-full border border-[#2A3141] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E4E9F6] hover:bg-[#101622]">
              New Post
            </button>
          </div>

          {/* Report Logs List (Aside Section) */}
          <div className="mt-6 flex-1 overflow-y-auto no-scrollbar space-y-2 text-xs text-[#9097AB]">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5E667B] mb-2">
                {activeQueueTab} Reports ({filteredLogs.length})
            </h3>
            
            {filteredLogs.length === 0 ? (
                <p className="text-center py-4 opacity-50">No reports found.</p>
            ) : (
                filteredLogs.map((log) => (
                    <div key={log.id || log.ref} className="flex flex-col gap-1 rounded-2xl border border-[#232936] bg-[#0E131D] px-4 py-3 hover:border-[#97C94F]/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                            <span className="font-semibold text-white truncate w-3/4">{log.title}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase ${
                                log.severity === 'critical' ? 'bg-red-900 text-red-200' :
                                log.severity === 'high' ? 'bg-orange-900 text-orange-200' :
                                'bg-gray-800 text-gray-300'
                            }`}>
                                {log.severity?.substring(0,1)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-[#5E667B]">#{log.ref}</span>
                            <span className="text-[10px] capitalize text-[#97C94F]">{log.status}</span>
                        </div>
                    </div>
                ))
            )}

            {/* Drafts Section Below Logs */}
            {drafts.length > 0 && (
                <>
                    <div className="border-t border-[#232936] my-4"></div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5E667B] mb-2">
                        Saved Drafts
                    </h3>
                    {drafts.map((d) => (
                    <div key={d.id} onClick={() => loadDraft(d)} className="flex items-center justify-between gap-3 rounded-2xl border border-[#232936] px-4 py-3 bg-[#131B0F]/30 cursor-pointer hover:bg-[#131B0F]">
                        <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{d.name}</div>
                        <div className="text-[9px] text-[#5E667B] mt-0.5">{new Date(d.savedAt).toLocaleDateString()}</div>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => deleteDraft(d.id, e)}
                            className="text-[#7F8698] hover:text-red-400 px-2"
                        >
                            ×
                        </button>
                    </div>
                    ))}
                </>
            )}
          </div>

          {/* Credit Profiles */}
          <div className="mt-auto pt-4 border-t border-[#202634]">
            {creditProfiles.map(({ initials, name }) => (
              <div key={name} className="flex items-center justify-between rounded-2xl bg-[#0E131D] px-3 py-3 text-xs text-[#E2E8F6]">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2334] text-xs font-semibold text-[#DDE4F7]">{initials}</span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <span className="text-[9px] uppercase tracking-[0.32em] text-[#70788F]">Hunter</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 space-y-12">
          <section className="space-y-10 rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-8 shadow-[0_30px_85px_rgba(5,8,15,0.55)]">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-white">Report a Vulnerability</h2>
                  <div className="space-y-4 mt-2 text-[#BFC6D6] leading-relaxed">
                    <p>
                      To report a vulnerability in the bug bounty program, ensure you verify the bug, gather clear evidence, reproduce the issue, document step-by-step instructions, attach evidence (screenshots / PoC / video), provide affected endpoints, explain impact, and include recommended remediation where possible. Keep reports concise, actionable and professional.
                    </p>
                    <a
                      href="/Rules of Engagement.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#A4C94F] font-semibold uppercase tracking-wider text-xs border-b border-[#A4C94F] pb-0.5 hover:text-[#C5E86C] hover:border-[#C5E86C] transition-colors"
                    >
                      Please click here for RULES OF ENGAGEMENT
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:w-72 shrink-0">
                <div className="bg-[#111620] border border-[#232936] rounded-2xl p-5 text-sm text-[#C5CBD8] shadow-lg">
                  <p className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Need reporting help?</p>
                  <p className="text-xs leading-5 text-[#949EB5]">
                    If unsure: keep steps reproducible, include exact endpoints and payloads, and attach PoC material. Use the structured fields provided — they enforce clarity and make triage faster.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">Report Details</h2>
              <div className="h-px w-full bg-[#1D2230]" />
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left column: preview card */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="sticky top-28 rounded-3xl border border-[#232936] bg-[#0B1018] p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#1D2230] pb-4 mb-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">Report Preview</h3>
                    <span className="h-2 w-2 rounded-full bg-[#A3CB4F] animate-pulse" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#687182] mb-1">Title</p>
                      <p className={`text-sm font-medium ${formData.title ? "text-white" : "text-[#363C4A] italic"}`}>
                        {formData.title || "Untitled Report"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#687182] mb-1">Target</p>
                      <p className="text-sm text-[#A3CB4F] font-mono">{selectedProgramName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#687182] mb-2">Category</p>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#151A24] text-[#C5CBD8] border border-[#2A303C]">
                          {formData.category || "Uncategorized"}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#687182] mb-2">Severity</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getSeverityColor(
                            formData.severity
                          )}`}
                        >
                          {formData.severity || "None"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#687182] mb-1">Description Preview</p>
                      <div className="h-40 overflow-hidden text-xs text-[#949EB5] leading-relaxed relative whitespace-pre-wrap">
                        {/* Render raw html for preview purposes */}
                        <div dangerouslySetInnerHTML={{ __html: formData.detail || "No description provided yet..." }} />
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-[#0B1018] to-transparent" />
                      </div>
                    </div>

                    {formData.attachment && (
                      <div className="flex items-center gap-3 text-xs text-[#A3CB4F] bg-[#A3CB4F]/5 p-3 rounded-xl border border-[#A3CB4F]/10">
                        <div className="shrink-0">
                          {attachmentPreview && isImageFile(attachmentPreview) ? (
                            <img src={attachmentPreview} alt="attachment-preview" className="h-14 w-14 rounded-md object-cover border border-[#202634]" />
                          ) : (
                            <span className="text-2xl">📎</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium">{formData.attachment.name}</div>
                          <div className="text-[11px] text-[#9FB98B]">{Math.round((formData.attachment.size || 0) / 1024)} KB</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column: inputs, including structured description */}
              <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">

                {/* 1. Affected Platform */}
                <section className="space-y-4">
                  <label className="text-sm text-[#9CA3AF]">Affected Platform</label>
                  <div className="grid grid-cols-3 gap-4">
                    <PlatformCard id="device" label="Defcomm Device" icon={Smartphone} />
                    <PlatformCard id="software" label="Defcomm Software" icon={Monitor} />
                    <PlatformCard id="web" label="Defcomm Web App" icon={Globe} />
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-4">
                    {/* 2. Affected Area (Dynamic Category) */}
                    <section className="space-y-2">
                    <div className="relative">
                        <select
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
                        required
                        >
                        <option value="">Affected area</option>
                        {PLATFORM_CATEGORIES[selectedPlatform]?.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7F8698]" size={18} />
                    </div>
                    </section>

                    {/* 2b. Severity Selector (ADDED) */}
                    <section className="space-y-2">
                    <div className="relative">
                        <select
                        name="severity"
                        value={formData.severity}
                        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
                        required
                        >
                        <option value="">Select Severity</option>
                        {SEVERITY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7F8698]" size={18} />
                    </div>
                    </section>
                </div>

                {/* 3. Title */}
                <section className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-[#7F8698] focus:border-[#9FC24D] focus:outline-none"
                      required
                    />
                    <HelpCircle className="absolute right-5 top-1/2 -translate-y-1/2 text-[#7F8698] cursor-help" size={18} />
                  </div>
                </section>

                {/* 4. Description Editor (Word Doc Style) */}
                <section className="space-y-2">
                  <label className="text-sm text-[#9CA3AF]">How can this bug be reproduced?</label>

                  <div className="overflow-hidden rounded-xl border border-[#202634] bg-[#0E131D] transition-colors focus-within:border-[#9FC24D]">
                    <ReactQuill
                      theme="snow"
                      value={formData.detail}
                      onChange={handleDetailChange}
                      modules={{
                        toolbar: {
                          container: "#toolbar",
                        }
                      }}
                      formats={[
                        "header", "font", "size",
                        "bold", "italic", "underline", "strike", "blockquote",
                        "list", "bullet", "indent",
                        "link", "image"
                      ]}
                      className="min-h-[300px] text-sm text-[#C5CBD8]"
                    />

                    {/* Custom Toolbar at Bottom */}
                    <CustomToolbar />

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,video/*,.pdf,.txt"
                    />
                  </div>

                  <div className="flex justify-end">
                    <HelpCircle className="text-[#7F8698] cursor-help" size={16} />
                  </div>
                </section>

                {/* 5. Footer Actions */}
                <div className="pt-6 border-t border-[#1B212D]">
                  <div className="flex items-center justify-between">

                    {/* User Credit */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#151A23] border border-[#2A303C]">
                        <span className="text-xs font-bold text-[#C5CBD8]">
                          {userInitials}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#7F8698]">Credit</span>
                        <span className="text-sm font-medium text-white">
                          {userName}
                        </span>
                      </div>
                      <div className="ml-auto text-right text-sm text-[#7F8698] font-mono">200</div>
                    </div>

                    {/* Help Icon */}
                    <HelpCircle className="text-[#7F8698]" size={18} />
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    {/* Identity Toggle */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className={`flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-medium transition-colors ${!isAnonymous ? "bg-[#151A23] text-white border border-[#2A303C]" : "bg-transparent text-[#7F8698]"
                          }`}
                      >
                        {userName}
                      </button>
                    </div>

                    <p className="text-xs text-[#95D549]">
                      I would like my submission to remain anonymous
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#0B0F05] shadow-[0_25px_55px_rgba(61,113,16,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit Report"}
                  </button>

                  <button
                    type="button"
                    onClick={saveNamedDraft}
                    className="mt-2 w-full rounded-full border border-[#2A3141] px-6 py-3 text-sm font-semibold text-[#E4E9F6] hover:bg-[#0F1620]"
                  >
                    Save Draft
                  </button>
                </div>
              </div>

            </form>

          </section>
        </div>
      </main >

      <Footer />

      {/* Styles to override default Quill theme to match Dark Mode */}
      <style>{`
        .quill {
          display: flex;
          flex-direction: column;
        }
        .ql-container {
          flex: 1;
          border: none !important;
          font-family: inherit !important;
        }
        .ql-editor {
          min-height: 300px;
          padding: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        /* Headings inside editor */
        .ql-editor strong {
          color: #FFFFFF;
          font-weight: 600;
        }
        /* Placeholder color */
        .ql-editor.ql-blank::before {
          color: #4B5563;
          font-style: normal;
        }
        /* Toolbar overrides */
        #toolbar {
          border: none !important;
          border-top: 1px solid #202634 !important;
        }
        
        /* Default state for Quill icons */
        #toolbar button svg .ql-stroke {
          stroke: #7F8698 !important;
        }
        #toolbar button svg .ql-fill {
          fill: #7F8698 !important;
        }
        
        /* Hover and Active states */
        #toolbar button:hover svg .ql-stroke,
        #toolbar button.ql-active svg .ql-stroke {
          stroke: #FFFFFF !important;
        }
        #toolbar button:hover svg .ql-fill,
        #toolbar button.ql-active svg .ql-fill {
          fill: #FFFFFF !important;
        }
      `}</style>
    </div >
  );
}
