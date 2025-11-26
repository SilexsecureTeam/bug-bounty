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
  Image as ImageIcon
} from "lucide-react";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import { fetchPrograms, submitReport } from "../api";

const DEFAULT_PROGRAM_ID =
  "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

const DRAFT_KEY = "reportDraft"; // autosave / last draft
const DRAFTS_LIST_KEY = "reportDrafts"; // saved named drafts list

const queueTabs = [
  { label: "Open", active: true },
  { label: "Closed" }
];

const creditProfiles = [{ initials: "CS", name: "Chike Samuel" }];

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

  // Selection States
  const [selectedPlatform, setSelectedPlatform] = useState("web"); // 'device', 'software', 'web'
  const [isAnonymous, setIsAnonymous] = useState(false);


  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    category: "",
    severity: "low",
    description: REPORT_TEMPLATE,
    steps: "",
    attachment: null
  });

  const [descriptionBlocks, setDescriptionBlocks] = useState({
    summary: "",
    descriptioned: "",
    endpoints: "",
    impact: "",
    severity_analysis: "",
    remediation: ""
  });


  // --- Effects ---

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        if (Array.isArray(data.programs) && data.programs.length) {
          setPrograms(data.programs);
        }
      } catch (error) {
        console.error("Failed to fetch programs", error);
      }
    };
    loadPrograms();

    // Load Autosave
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Attachments can't be restored from LS, so we exclude it
        setFormData(prev => ({ ...prev, ...parsed, attachment: null }));
        if (parsed.selectedPlatform) setSelectedPlatform(parsed.selectedPlatform);
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  // Autosave Logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      const draftData = {
        ...formData,
        selectedPlatform,
        attachment: null // Don't save file object
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [formData, selectedPlatform]);

  // --- Handlers ---

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    // Reset category when platform changes to ensure consistency
    setFormData(prev => ({ ...prev, category: "" }));
  };

  const handledescriptionChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("program_id", formData.program_id || DEFAULT_PROGRAM_ID);
    payload.append("title", formData.title);
    payload.append("category", formData.category);
    payload.append("severity", formData.severity);
    payload.append("description", formData.description); // Sending HTML content as the description

    if (formData.attachment) {
      payload.append("attachment", formData.attachment);
    }

    try {
      await submitReport(payload);
      toast.success("Report submitted successfully!");
      localStorage.removeItem(DRAFT_KEY);

      // Reset form
      setFormData({
        program_id: "",
        title: "",
        category: "",
        severity: "low",
        description: REPORT_TEMPLATE,
        attachment: null
      });
    } catch (error) {
      toast.error(error?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

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

  // Custom Toolbar for React Quill to match screenshot
  const CustomToolbar = () => (
    <div id="toolbar" className="flex items-center gap-4 border-t border-[#2A303C] p-3">
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <div className="h-4 w-px bg-[#2A303C]" />
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </span>
      <div className="h-4 w-px bg-[#2A303C]" />
      <span className="ql-formats">
        <button className="ql-link" />
        {/* We repurpose the image button to trigger our file upload for the main attachment to match UI behavior */}
        <button type="button" onClick={triggerFileUpload} className="flex items-center justify-center text-[#7F8698] hover:text-white">
          <ImageIcon size={18} />
        </button>
      </span>

      {/* Attachment Indicator */}
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

  const [fetchingPrograms, setFetchingPrograms] = useState(false);

  // UI state
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [drafts, setDrafts] = useState([]); // array of saved drafts (metadata)
  const [lastAutosave, setLastAutosave] = useState(null);
  const autosaveRef = useRef(null);

  // Load saved drafts list and last autosave on mount
  useEffect(() => {
    try {
      const savedDrafts = JSON.parse(localStorage.getItem(DRAFTS_LIST_KEY) || "[]");
      setDrafts(Array.isArray(savedDrafts) ? savedDrafts : []);
    } catch {
      setDrafts([]);
    }

    // Load last autosave (if any) and restore automatically (preferred behavior)
    try {
      const last = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (last) {
        // We auto-restore the autosave to improve UX (professional client expectation).
        // Attachments cannot be restored automatically because File cannot be persisted to localStorage.
        setFormData((prev) => ({
          ...prev,
          ...last.formData,
          attachment: null // user must re-attach
        }));
        setDescriptionBlocks(last.descriptionBlocks || {});
        setLastAutosave(last.savedAt || null);
        toast("Draft restored from your last autosave.", { icon: "📄" });
      }
    } catch {
      // ignore malformed data
    }
  }, []);

  // create attachment preview when file selected; revoke previous url on change
  useEffect(() => {
    if (formData.attachment instanceof File) {
      if (attachmentPreview) {
        URL.revokeObjectURL(attachmentPreview);
      }
      try {
        const url = URL.createObjectURL(formData.attachment);
        setAttachmentPreview(url);
      } catch {
        setAttachmentPreview(null);
      }
    } else {
      // no file selected
      if (attachmentPreview) {
        URL.revokeObjectURL(attachmentPreview);
        setAttachmentPreview(null);
      }
    }
    // cleanup on unmount
    return () => {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.attachment]);

  // helper to set form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // structured description block updates -> also update combined description in memory
  const handleDescriptionBlockChange = (field, value) => {
    setDescriptionBlocks((prev) => {
      const next = { ...prev, [field]: value };
      // update combined description text in the main formData (keeps preview in sync)
      setFormData((f) => ({ ...f, description: buildCombinedDescription(next) }));
      return next;
    });
  };

  // combine structured blocks into a single string (professional layout)
  const buildCombinedDescription = (blocks = descriptionBlocks) => {
    // Only include sections that have content to keep final output tidy.
    const parts = [];
    if (blocks.summary?.trim()) parts.push(`# Summary\n${blocks.summary.trim()}`);
    if (blocks.descriptioned?.trim()) parts.push(`# descriptioned description\n${blocks.descriptioned.trim()}`);
    if (blocks.endpoints?.trim()) parts.push(`# Affected endpoints\n${blocks.endpoints.trim()}`);
    if (blocks.impact?.trim()) parts.push(`# Impact & potential risk\n${blocks.impact.trim()}`);
    if (blocks.severity_analysis?.trim()) parts.push(`# Severity analysis\n${blocks.severity_analysis.trim()}`);
    if (blocks.remediation?.trim()) parts.push(`# Recommended remediation\n${blocks.remediation.trim()}`);
    return parts.join("\n\n");
  };

  // clear form state
  const clearForm = () => {
    setFormData({
      program_id: "",
      title: "",
      category: "",
      severity: "",
      description: "",
      steps: "",
      attachment: null
    });
    setDescriptionBlocks({
      summary: "",
      descriptioned: "",
      endpoints: "",
      impact: "",
      severity_analysis: "",
      remediation: ""
    });
    if (attachmentPreview) {
      try {
        URL.revokeObjectURL(attachmentPreview);
      } catch { }
      setAttachmentPreview(null);
    }
  };

  // AUTOSAVE: persist a draft snapshot to localStorage every X ms after changes
  useEffect(() => {
    // Debounced autosave (3s after last change)
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    autosaveRef.current = setTimeout(() => {
      try {
        const snapshot = {
          formData: {
            // store textual fields only; File objects cannot be stored
            program_id: formData.program_id,
            title: formData.title,
            category: formData.category,
            severity: formData.severity,
            description: formData.description,
            steps: formData.steps,
            // store attachment metadata only
            attachmentMeta: formData.attachment
              ? { name: formData.attachment.name, size: formData.attachment.size, type: formData.attachment.type }
              : null
          },
          descriptionBlocks,
          savedAt: new Date().toISOString()
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot));
        setLastAutosave(snapshot.savedAt);
      } catch (err) {
        console.warn("Autosave failed", err);
      }
    }, 10000);

    return () => {
      if (autosaveRef.current) clearTimeout(autosaveRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.title, formData.category, formData.severity, formData.program_id, formData.steps, descriptionBlocks]);

  // Save a named draft (explicit)
  const saveNamedDraft = (name) => {
    try {
      const existing = JSON.parse(localStorage.getItem(DRAFTS_LIST_KEY) || "[]");
      const draft = {
        id: `draft_${Date.now()}`,
        name: name || formData.title || `Draft ${new Date().toLocaleString()}`,
        formData: {
          program_id: formData.program_id,
          title: formData.title,
          category: formData.category,
          severity: formData.severity,
          description: formData.description,
          steps: formData.steps,
          attachmentMeta: formData.attachment
            ? { name: formData.attachment.name, size: formData.attachment.size, type: formData.attachment.type }
            : null
        },
        descriptionBlocks,
        savedAt: new Date().toISOString()
      };
      const updated = [draft, ...(Array.isArray(existing) ? existing : [])].slice(0, 25); // keep up to 25 drafts
      localStorage.setItem(DRAFTS_LIST_KEY, JSON.stringify(updated));
      setDrafts(updated);
      toast.success("Draft saved");
    } catch (err) {
      toast.error("Failed to save draft");
    }
  };

  // Load a saved draft (named or autosave)
  const loadDraft = (source) => {
    try {
      if (source === "autosave") {
        const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
        if (!saved) {
          toast("No autosave found", { icon: "ℹ️" });
          return;
        }
        const s = saved;
        setFormData((prev) => ({
          ...prev,
          ...s.formData,
          attachment: null // cannot restore actual file
        }));
        setDescriptionBlocks(s.descriptionBlocks || {});
        toast("Autosave restored", { icon: "📄" });
        return;
      }

      // named draft
      const existing = JSON.parse(localStorage.getItem(DRAFTS_LIST_KEY) || "[]");
      const found = (existing || []).find((d) => d.id === source);
      if (!found) {
        toast("Draft not found", { icon: "⚠️" });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        ...found.formData,
        attachment: null
      }));
      setDescriptionBlocks(found.descriptionBlocks || {});
      toast("Draft loaded", { icon: "📄" });
    } catch (err) {
      toast.error("Failed to load draft");
    }
  };

  // Delete a named draft
  const deleteDraft = (id) => {
    try {
      const existing = JSON.parse(localStorage.getItem(DRAFTS_LIST_KEY) || "[]");
      const updated = (existing || []).filter((d) => d.id !== id);
      localStorage.setItem(DRAFTS_LIST_KEY, JSON.stringify(updated));
      setDrafts(updated);
      toast.success("Draft deleted");
    } catch {
      toast.error("Could not delete draft");
    }
  };

  // Small helper: human friendly date
  const niceDate = (iso) => {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  // helper to detect image mime types; also accepts object URLs if string
  const isImageFile = (fileOrUrl) => {
    if (!fileOrUrl) return false;
    if (typeof fileOrUrl === "string") {
      return /\.(jpe?g|png|gif|webp|bmp)$/i.test(fileOrUrl);
    }
    return fileOrUrl.type?.startsWith("image/");
  };

  // Derived: selected program name for preview
  const selectedProgramName =
    programs.find((p) => p.id.toString() === formData.program_id)?.program_name ||
    (programs.length > 0 ? "Select Program" : "Default Program");

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      severity: "",
      program_id: "",
      attachment: null,
      description: "",
    });

    setDescriptionBlocks({
      summary: "",
      descriptioned: "",
      endpoints: "",
      impact: "",
      severity_analysis: "",
    });

    setAttachments([]);
    setAttachmentPreview(null);

    setSubmitting(false);
  };

  const quillModules = {
    toolbar: {
      container: "#toolbar"
    }
  };




  // Render
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
              onClick={() => {
                // quick save named draft with title
                saveNamedDraft();
              }}
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
              {queueTabs.map(({ label, active }) => (
                <button
                  key={label}
                  type="button"
                  className={`px-4 py-2 transition-colors duration-150 ${active ? "bg-[#96C74B] text-[#131C09]" : "hover:text-[#E2E8F6]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                resetForm();
              }}
              type="button" className="rounded-full border border-[#2A3141] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E4E9F6] hover:bg-[#101622]">
              New Post
            </button>
          </div>

          {/* Draft Tickets */}
          <div className="mt-6 space-y-2 text-xs text-[#9097AB]">
            {/* Autosave quick item */}
            {localStorage.getItem(DRAFT_KEY) && (
              <div
                className="flex w-full flex-col gap-1 rounded-2xl border px-4 py-4 text-left transition-colors duration-150 border-[#96C74B] bg-[#131B0F] text-[#DDE8C4]"
                role="button"
                onClick={() => loadDraft("autosave")}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-sm font-semibold text-white">Last autosave</span>
                    <div className="truncate text-[10px] uppercase tracking-[0.12em] text-[#8991A6]">{niceDate(JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}")?.savedAt)}</div>
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#96C74B]">Restore</div>
                </div>
              </div>
            )}

            {drafts.length === 0 && !localStorage.getItem(DRAFT_KEY) ? (
              <div className="text-[12px] text-[#7F8698]">No drafts yet — your work autosaves while you type.</div>
            ) : null}

            {drafts.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 bg-[#0E131D]">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{d.name}</div>
                  <div className="text-[10px] text-[#8991A6] mt-1">{niceDate(d.savedAt)}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => loadDraft(d.id)}
                    className="text-[11px] px-2 py-1 rounded-md bg-[#A3CB4F]/10 border border-[#A3CB4F]/20 text-[#A3CB4F]"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDraft(d.id)}
                    className="text-[11px] px-2 py-1 rounded-md bg-transparent border border-[#2A3141] text-[#C5CBD8]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Credit Profiles */}
          <div className="mt-auto pt-8">
            {creditProfiles.map(({ initials, name }) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-4 text-xs text-[#E2E8F6]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2334] text-sm font-semibold text-[#DDE4F7]">{initials}</span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-[#70788F]">Draft owner</span>
                  </div>
                </div>
                <button type="button" className="text-[#5E667B]">···</button>
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
              <div className="lg:col-span-6">
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
                        {formData.description ? formData.description : "No description provided yet..."}
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
              <div className="lg:col-span-6 space-y-8">

                {/* 1. Affected Platform */}
                <section className="space-y-4">
                  <label className="text-sm text-[#9CA3AF]">Affected Platform</label>
                  <div className="grid grid-cols-3 gap-4">
                    <PlatformCard id="device" label="Defcomm Device" icon={Smartphone} />
                    <PlatformCard id="software" label="Defcomm Software" icon={Monitor} />
                    <PlatformCard id="web" label="Defcomm Web App" icon={Globe} />
                  </div>
                </section>

                {/* 2. Affected Area (Dynamic Category) */}
                <section className="space-y-2">
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
                    >
                      <option value="">Affected area</option>
                      {PLATFORM_CATEGORIES[selectedPlatform]?.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7F8698]" size={18} />
                  </div>
                </section>

                {/* 3. Title */}
                <section className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-[#7F8698] focus:border-[#9FC24D] focus:outline-none"
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
                      value={formData.description}
                      onChange={handledescriptionChange}
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
                      accept="image/*,video/*,.pdf"
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
                        <span className="text-xs font-bold text-[#C5CBD8]">CS</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#7F8698]">Credit</span>
                        <span className="text-sm font-medium text-white">Chike Samuel</span>
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
                        Chike Samuel
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
                    onClick={() => saveNamedDraft()}
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
        .ql-toolbar {
          border: none !important;
          border-top: 1px solid #202634 !important;
        }
        .ql-toolbar button {
          color: #7F8698 !important;
        }
        .ql-toolbar button:hover, .ql-toolbar button.ql-active {
          color: #9FC24D !important;
        }
        .ql-toolbar .ql-stroke {
          stroke: #7F8698 !important;
        }
        .ql-toolbar button:hover .ql-stroke, .ql-toolbar button.ql-active .ql-stroke {
          stroke: #9FC24D !important;
        }
      `}</style>
    </div >
  );
}
