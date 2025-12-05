import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Smartphone,
  Monitor,
  Globe,
  HelpCircle,
  ChevronDown,
  Paperclip,
  Image as ImageIcon,
  Cpu,
  Server,
  Shield,
  Terminal,
  Layers,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon
} from "lucide-react";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import { fetchPrograms, fetchCategories, submitReport, updateReport, fetchReportLogs } from "../api";
import { getUser } from "../hooks/useAuthToken";

// --- Constants ---

const DEFAULT_PROGRAM_ID =
  "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

const DRAFT_KEY = "reportDraft";
const DRAFTS_LIST_KEY = "reportDrafts";

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

const SEVERITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" }
];

// Helper to map API category labels to Icons
const getCategoryIcon = (label) => {
  const lower = label?.toLowerCase() || "";
  if (lower.includes("web") || lower.includes("internet")) return Globe;
  if (lower.includes("device") || lower.includes("mobile")) return Smartphone;
  if (lower.includes("software") || lower.includes("app")) return Monitor;
  if (lower.includes("system") || lower.includes("architecture")) return Cpu;
  if (lower.includes("operating") || lower.includes("os")) return Terminal;
  if (lower.includes("server")) return Server;
  if (lower.includes("security")) return Shield;
  return Layers; // Default icon
};

export default function SubmitReport() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we are editing
  const reportToEdit = location.state?.reportToEdit;
  const [editingReportId, setEditingReportId] = useState(null);

  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  // Data for sidebar logs
  const [reportLogs, setReportLogs] = useState([]);
  const [activeQueueTab, setActiveQueueTab] = useState("Open");

  // Selection States
  const [isAnonymous, setIsAnonymous] = useState(false);

  const fileInputRef = useRef(null);
  const autosaveRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    main_category_id: "", 
    sub_category_id: "",  
    severity: "low",
    detail: REPORT_TEMPLATE,
    attachments: [], // Array of File objects (new uploads)
    existingAttachments: [] // Array of URLs (for edit mode)
  });

  // UI State
  const [drafts, setDrafts] = useState([]);
  const [lastAutosave, setLastAutosave] = useState(null);

  // --- Effects ---

  useEffect(() => {
    const initData = async () => {
      // Get User
      const userData = getUser();
      if (userData) {
        setUser(userData);
      }

      try {
        const progData = await fetchPrograms();
        if (Array.isArray(progData.programs)) {
          setPrograms(progData.programs);
        }
      } catch (error) {
        console.error("Failed to fetch programs", error);
      }

      let cats = [];
      try {
        const catData = await fetchCategories();
        if (catData.status === "200" && Array.isArray(catData.data)) {
          setCategories(catData.data);
          cats = catData.data;
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }

      try {
        const logData = await fetchReportLogs();
        if (logData?.data) {
          setReportLogs(logData.data);
        }
      } catch (error) {
        console.error("Failed to fetch report logs", error);
      }

      // If Editing, Pre-fill form
      if (reportToEdit) {
          setEditingReportId(reportToEdit.id);
          
          const foundMain = cats.find(c => c.label.toLowerCase() === reportToEdit.category?.toLowerCase());
          
          let foundSubId = "";
          if (foundMain && reportToEdit.category_sub) {
              const foundSub = foundMain.sub?.find(s => s.label.toLowerCase() === reportToEdit.category_sub?.toLowerCase());
              if (foundSub) foundSubId = foundSub.id;
          }

          setFormData(prev => ({
              ...prev,
              program_id: reportToEdit.program || "", 
              title: reportToEdit.title,
              main_category_id: foundMain ? foundMain.id : "",
              sub_category_id: foundSubId,
              severity: reportToEdit.severity?.toLowerCase() || "low",
              detail: reportToEdit.detail || REPORT_TEMPLATE,
              existingAttachments: reportToEdit.attachment || []
          }));
          toast("Editing Report #" + (reportToEdit.ref || ""), { icon: "✏️" });
      } else {
         // Set default main category only if creating new
         if (cats.length > 0 && !formData.main_category_id) {
             setFormData(prev => ({
                 ...prev,
                 main_category_id: cats[0].id
             }));
         }
      }

    };

    initData();

    // Load Named Drafts List (Only if not editing)
    if (!reportToEdit) {
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
                attachments: [] // Attachments cannot be restored
            }));
            setLastAutosave(new Date().toISOString());
            toast("Restored unsaved draft", { icon: "📝", duration: 2000 });
            }
        } catch (e) {
            console.error("Failed to load draft", e);
        }
        }
    }
  }, [reportToEdit]); 

  // Autosave Logic (Disable in Edit Mode)
  useEffect(() => {
    if (editingReportId) return; 

    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    
    autosaveRef.current = setTimeout(() => {
      if (formData.title === "" && formData.detail === REPORT_TEMPLATE) return;

      const draftData = {
        program_id: formData.program_id,
        title: formData.title,
        main_category_id: formData.main_category_id,
        sub_category_id: formData.sub_category_id,
        severity: formData.severity,
        detail: formData.detail
      };
      
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
      setLastAutosave(new Date().toISOString());
    }, 3000);

    return () => clearTimeout(autosaveRef.current);
  }, [formData, editingReportId]);


  // --- Handlers ---

  const handleMainCategorySelect = (catId) => {
    setFormData(prev => ({
      ...prev,
      main_category_id: catId,
      sub_category_id: "" // Reset sub-category when main changes
    }));
  };

  const handleDetailChange = (content) => {
    setFormData(prev => ({ ...prev, detail: content }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
      toast.success(`${newFiles.length} file(s) added`);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 1. Define function first
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      program_id: "",
      title: "",
      main_category_id: categories.length > 0 ? categories[0].id : "",
      sub_category_id: "",
      severity: "low",
      detail: REPORT_TEMPLATE,
      attachments: [],
      existingAttachments: []
    });
    
    if (editingReportId) {
        setEditingReportId(null);
        navigate("/submit-report", { replace: true, state: {} });
        toast.success("Exited edit mode");
    } else {
        localStorage.removeItem(DRAFT_KEY);
        toast.success("Form reset for new post");
    }
  };

  const saveNamedDraft = () => {
    if (editingReportId) {
        toast.error("Cannot save drafts while editing an existing report.");
        return;
    }
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
        attachments: [] 
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
      attachments: []
    });
    setEditingReportId(null);
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
    
    const selectedMain = categories.find(c => c.id === formData.main_category_id);
    const hasSubCategories = selectedMain?.sub && selectedMain.sub.length > 0;
    
    if (hasSubCategories && !formData.sub_category_id) {
      toast.error("Please select a specific Affected Area (Sub-category)");
      return;
    }

    if (!editingReportId && formData.attachments.length < 1) {
      toast.error("Please attach at least one proof of concept or evidence file.");
      return;
    }

    setLoading(true);

    const payload = new FormData();
    const progId = formData.program_id || (programs[0]?.id || DEFAULT_PROGRAM_ID);
    
    payload.append("program_id", progId);
    payload.append("title", formData.title);
    
    payload.append("category", formData.main_category_id);
    if (formData.sub_category_id) {
        payload.append("category_sub", formData.sub_category_id);
    }
    
    payload.append("severity", formData.severity);
    payload.append("detail", formData.detail);

    formData.attachments.forEach((file, index) => {
      payload.append(`attachment[${index}]`, file);
    });
    
    if (editingReportId) {
        payload.append("id", editingReportId);
    }

    try {
      if (editingReportId) {
          await updateReport(payload);
          toast.success("Report updated successfully!");
          navigate("/reports");
      } else {
          await submitReport(payload);
          toast.success("Report submitted successfully!");
          
          const logData = await fetchReportLogs();
          if(logData?.data) setReportLogs(logData.data);

          resetForm();
      }
      
    } catch (error) {
      toast.error(error?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  // --- Helpers ---
  
  const filteredLogs = reportLogs.filter(log => {
    const status = log.status?.toLowerCase() || "";
    if (activeQueueTab === "Open") {
      return ["new", "under review", "accepted", "triaged", "fix", "review"].includes(status);
    } else {
      return ["closed", "resolved", "rejected"].includes(status);
    }
  });
  
  const userName = user ? `${user.firstName} ${user.lastName}` : "Guest Hunter";
  const userInitials = user && user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : "GH";
    
  const creditProfiles = [{ initials: userInitials, name: userName }];

  const selectedMainCategory = categories.find(c => c.id === formData.main_category_id);
  const subCategories = selectedMainCategory?.sub || [];

  // --- Components ---

  const PlatformCard = ({ category }) => {
    const Icon = getCategoryIcon(category.label);
    const isSelected = formData.main_category_id === category.id;

    return (
      <button
        type="button"
        onClick={() => handleMainCategorySelect(category.id)}
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border p-6 transition-all duration-200 ${
          isSelected
            ? "border-[#9FC24D] bg-[#9FC24D]/5 text-[#9FC24D]"
            : "border-[#2A303C] bg-[#0E131D] text-[#7F8698] hover:border-[#3F4555]"
        }`}
      >
        <Icon size={28} strokeWidth={1.5} />
        <span className="text-xs font-semibold uppercase tracking-wider text-center">
            {category.label}
        </span>
      </button>
    );
  };

  // 2. Use explicit icons inside buttons to force visibility
  const CustomToolbar = () => (
    <div id="toolbar" className="flex items-center gap-4 border-t border-[#2A303C] p-3">
      <span className="ql-formats flex gap-1">
        <button className="ql-bold" type="button">
            <Bold size={16} strokeWidth={2.5} />
        </button>
        <button className="ql-italic" type="button">
            <Italic size={16} strokeWidth={2.5} />
        </button>
        <button className="ql-underline" type="button">
            <Underline size={16} strokeWidth={2.5} />
        </button>
        <button className="ql-strike" type="button">
            <Strikethrough size={16} strokeWidth={2.5} />
        </button>
      </span>
      <div className="h-4 w-px bg-[#2A303C]" />
      <span className="ql-formats flex gap-1">
        <button className="ql-list" value="ordered" type="button">
            <ListOrdered size={16} strokeWidth={2.5} />
        </button>
        <button className="ql-list" value="bullet" type="button">
            <List size={16} strokeWidth={2.5} />
        </button>
      </span>
      <div className="h-4 w-px bg-[#2A303C]" />
      <span className="ql-formats flex gap-1">
        <button className="ql-link" type="button">
            <LinkIcon size={16} strokeWidth={2.5} />
        </button>
        {/* Custom Image Upload Trigger */}
        <button 
          type="button" 
          onClick={triggerFileUpload} 
          className="flex items-center justify-center text-[#7F8698] hover:text-white transition-colors"
          title="Attach Files"
        >
          <ImageIcon size={16} strokeWidth={2.5} />
        </button>
      </span>
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
            {!editingReportId && (
                <button
                type="button"
                className="rounded-full bg-[#97C94F] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#172007] shadow-[0_10px_25px_rgba(109,155,45,0.45)]"
                onClick={saveNamedDraft}
                >
                Save Draft
                </button>
            )}
          </div>

          <div className="mt-5">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#5E667B]">🔍</span>
              <input
                type="search"
                placeholder="Search here"
                className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] py-2 pl-9 pr-3 text-xs text-[#E2E8F6] placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
              />
            </div>
          </div>

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

          {/* Report Logs List */}
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
                            <span className="text-[10px] text-[#5E667B]">#{log.ref || 'N/A'}</span>
                            <span className="text-[10px] capitalize text-[#97C94F]">{log.status}</span>
                        </div>
                    </div>
                ))
            )}

            {/* Saved Drafts List */}
            {!editingReportId && drafts.length > 0 && (
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
                  <h2 className="text-2xl font-semibold text-white">
                    {editingReportId ? "Edit Report" : "Report a Vulnerability"}
                  </h2>
                  <div className="space-y-4 mt-2 text-[#BFC6D6] leading-relaxed">
                    {editingReportId ? (
                         <p>You are currently editing an existing report. Please review your changes carefully before submitting.</p>
                    ) : (
                        <p>
                        To report a vulnerability in the bug bounty program, ensure you verify the bug, gather clear evidence, reproduce the issue, document step-by-step instructions, attach evidence (screenshots / PoC / video), provide affected endpoints, explain impact, and include recommended remediation where possible.
                        </p>
                    )}
                    {!editingReportId && (
                        <a href="/Rules of Engagement.pdf" target="_blank" rel="noopener noreferrer" className="inline-block text-[#A4C94F] font-semibold uppercase tracking-wider text-xs border-b border-[#A4C94F] pb-0.5 hover:text-[#C5E86C] transition-colors">
                        Please click here for RULES OF ENGAGEMENT
                        </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-72 shrink-0">
                <div className="bg-[#111620] border border-[#232936] rounded-2xl p-5 text-sm text-[#C5CBD8] shadow-lg">
                  <p className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Need reporting help?</p>
                  <p className="text-xs leading-5 text-[#949EB5]">
                    If unsure: keep steps reproducible, include exact endpoints and payloads, and attach PoC material.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">Report Details</h2>
              <div className="h-px w-full bg-[#1D2230]" />
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              <div className="lg:col-span-12 space-y-8 order-1">

                {/* 1. Affected Platform (Main Category) */}
                <section className="space-y-4">
                  <label className="text-sm text-[#9CA3AF]">Affected Platform</label>
                  
                  {categories.length === 0 ? (
                     <div className="text-sm text-gray-500 text-center py-6 border border-dashed border-[#2A303C] rounded-xl animate-pulse">
                        Loading categories...
                     </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map(cat => (
                            <PlatformCard key={cat.id} category={cat} />
                        ))}
                    </div>
                  )}
                </section>

                <div className="grid grid-cols-2 gap-4">
                    {/* 2. Affected Area (Sub-Category) */}
                    <section className="space-y-2">
                    <div className="relative">
                        <select
                        name="category"
                        value={formData.sub_category_id}
                        onChange={(e) => setFormData({ ...formData, sub_category_id: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none disabled:opacity-50"
                        disabled={!formData.main_category_id || subCategories.length === 0}
                        required={subCategories.length > 0}
                        >
                        <option value="">Select Affected Area</option>
                        {subCategories.length > 0 ? (
                            subCategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>{sub.label}</option>
                            ))
                        ) : (
                            <option disabled>No specific areas available</option>
                        )}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7F8698]" size={18} />
                    </div>
                    </section>

                    {/* 2b. Severity */}
                    <section className="space-y-2">
                    <div className="relative">
                        <select
                        name="severity"
                        value={formData.severity}
                        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
                        required
                        >
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

                {/* 4. Description Editor */}
                <section className="space-y-2">
                  <label className="text-sm text-[#9CA3AF]">How can this bug be reproduced?</label>

                  <div className="overflow-hidden rounded-xl border border-[#202634] bg-[#0E131D] transition-colors focus-within:border-[#9FC24D]">
                    <ReactQuill
                      theme="snow"
                      value={formData.detail}
                      onChange={handleDetailChange}
                      modules={{
                        toolbar: { container: "#toolbar" }
                      }}
                      formats={[
                        "header", "font", "size",
                        "bold", "italic", "underline", "strike", "blockquote",
                        "list", "bullet", "indent",
                        "link", "image"
                      ]}
                      className="min-h-[300px] text-sm text-[#C5CBD8]"
                    />

                    <CustomToolbar />

                    {/* Hidden Multi-File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*,video/*,.pdf,.txt"
                    />
                  </div>

                  {/* Existing Attachments (Edit Mode Only) */}
                  {editingReportId && formData.existingAttachments && formData.existingAttachments.length > 0 && (
                      <div className="mt-3 mb-2">
                          <p className="text-xs text-[#7F8698] mb-2 uppercase tracking-wider">Existing Attachments</p>
                          <div className="grid gap-2">
                              {formData.existingAttachments.map((url, idx) => (
                                  <div key={idx} className="flex items-center justify-between rounded-lg border border-[#2A303C] bg-[#151A23] px-4 py-2 text-sm opacity-75">
                                      <div className="flex items-center gap-3">
                                          <Paperclip size={16} className="text-[#7F8698]" />
                                          <a href={url} target="_blank" rel="noreferrer" className="text-white hover:underline truncate max-w-[250px]">
                                            {url.split('/').pop()}
                                          </a>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* New Attachment List Display */}
                  {formData.attachments.length > 0 && (
                      <div className="mt-3 grid gap-2">
                          <p className="text-xs text-[#9FC24D] mb-1 uppercase tracking-wider">New Uploads</p>
                          {formData.attachments.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between rounded-lg border border-[#2A303C] bg-[#151A23] px-4 py-2 text-sm">
                                  <div className="flex items-center gap-3">
                                      <Paperclip size={16} className="text-[#9FC24D]" />
                                      <span className="text-white truncate max-w-[200px]">{file.name}</span>
                                      <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeAttachment(idx)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                  >
                                    ×
                                  </button>
                              </div>
                          ))}
                      </div>
                  )}
                </section>

                {/* 5. Footer Actions */}
                <div className="pt-6 border-t border-[#1B212D]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#151A23] border border-[#2A303C]">
                        <span className="text-xs font-bold text-[#C5CBD8]">{userInitials}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#7F8698]">Credit</span>
                        <span className="text-sm font-medium text-white">{userName}</span>
                      </div>
                      <div className="ml-auto text-right text-sm text-[#7F8698] font-mono">200</div>
                    </div>
                    <HelpCircle className="text-[#7F8698]" size={18} />
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className={`flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-medium transition-colors ${!isAnonymous ? "bg-[#151A23] text-white border border-[#2A303C]" : "bg-transparent text-[#7F8698]"}`}
                      >
                        {isAnonymous ? "Anonymous Submission" : userName}
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
                    {loading ? (editingReportId ? "Updating..." : "Submitting...") : (editingReportId ? "Update Report" : "Submit Report")}
                  </button>

                  {!editingReportId && (
                    <button
                        type="button"
                        onClick={saveNamedDraft}
                        className="mt-2 w-full rounded-full border border-[#2A3141] px-6 py-3 text-sm font-semibold text-[#E4E9F6] hover:bg-[#0F1620]"
                    >
                        Save Draft
                    </button>
                  )}
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />

      <style>{`
        .quill { display: flex; flex-direction: column; }
        .ql-container { flex: 1; border: none !important; font-family: inherit !important; }
        .ql-editor { min-height: 300px; padding: 1.5rem; font-size: 0.95rem; line-height: 1.6; }
        .ql-editor strong { color: #FFFFFF; font-weight: 600; }
        .ql-editor.ql-blank::before { color: #4B5563; font-style: normal; }
        #toolbar { border: none !important; border-top: 1px solid #202634 !important; }
        #toolbar button svg .ql-stroke { stroke: #7F8698 !important; }
        #toolbar button svg .ql-fill { fill: #7F8698 !important; }
        #toolbar button:hover svg .ql-stroke, #toolbar button.ql-active svg .ql-stroke { stroke: #FFFFFF !important; }
        #toolbar button:hover svg .ql-fill, #toolbar button.ql-active svg .ql-fill { fill: #FFFFFF !important; }
      `}</style>
    </div>
  );
}