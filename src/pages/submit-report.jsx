// src/pages/submit-report.jsx
import { useEffect, useState, useRef } from "react";
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
  Image as ImageIcon
} from "lucide-react";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import { fetchPrograms, submitReport } from "../api";

// --- Configuration & Constants ---

const DEFAULT_PROGRAM_ID =
  "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

const DRAFT_KEY = "reportDraft";

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
  // --- State ---
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedPlatform, setSelectedPlatform] = useState("web");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    category: "",
    severity: "low",
    detail: REPORT_TEMPLATE,
    attachment: null
  });

  const fileInputRef = useRef(null);

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
    
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed, attachment: null })); 
        if(parsed.selectedPlatform) setSelectedPlatform(parsed.selectedPlatform);
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const draftData = {
        ...formData,
        selectedPlatform,
        attachment: null 
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [formData, selectedPlatform]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("program_id", formData.program_id || DEFAULT_PROGRAM_ID);
    payload.append("title", formData.title);
    payload.append("category", formData.category);
    payload.append("severity", formData.severity); 
    payload.append("detail", formData.detail);
    
    if (formData.attachment) {
      payload.append("attachment", formData.attachment);
    }

    try {
      await submitReport(payload);
      toast.success("Report submitted successfully!");
      localStorage.removeItem(DRAFT_KEY);
      
      setFormData({
        program_id: "",
        title: "",
        category: "",
        severity: "low",
        detail: REPORT_TEMPLATE,
        attachment: null
      });
    } catch (error) {
      toast.error(error?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  const PlatformCard = ({ id, label, icon: Icon }) => (
    <button
      type="button"
      onClick={() => handlePlatformChange(id)}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border p-6 transition-all duration-200 ${
        selectedPlatform === id
          ? "border-[#9FC24D] bg-[#9FC24D]/5 text-[#9FC24D]"
          : "border-[#2A303C] bg-[#0E131D] text-[#7F8698] hover:border-[#3F4555]"
      }`}
    >
      <Icon size={28} strokeWidth={1.5} />
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );

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
        <button type="button" onClick={triggerFileUpload} className="flex items-center justify-center text-[#7F8698] hover:text-white">
           <ImageIcon size={18} />
        </button>
      </span>
      
      {formData.attachment && (
        <div className="ml-auto flex items-center gap-2 rounded-md bg-[#9FC24D]/10 px-3 py-1 text-xs text-[#9FC24D]">
          <Paperclip size={12} />
          <span className="max-w-[100px] truncate">{formData.attachment.name}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setFormData(prev => ({...prev, attachment: null})); }}
            className="ml-1 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070C] text-white font-sans">
      <PortalHeader activeLabel="Submit a report" />

      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        {/* CENTERED FORM CONTAINER */}
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Submit a Vulnerability</h1>
            <p className="mt-2 text-[#9CA3AF]">
              Provide details about the vulnerability to help our team verify and resolve it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <section className="space-y-4">
              <label className="text-sm font-medium text-[#9CA3AF]">Affected Platform</label>
              <div className="grid grid-cols-3 gap-4">
                <PlatformCard id="device" label="Defcomm Device" icon={Smartphone} />
                <PlatformCard id="software" label="Defcomm Software" icon={Monitor} />
                <PlatformCard id="web" label="Defcomm Web App" icon={Globe} />
              </div>
            </section>

            <section className="space-y-2">
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
                >
                  <option value="">Select Affected Area</option>
                  {PLATFORM_CATEGORIES[selectedPlatform]?.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7F8698]" size={18} />
              </div>
            </section>

            <section className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Report Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-sm text-white placeholder-[#7F8698] focus:border-[#9FC24D] focus:outline-none"
                />
              </div>
            </section>

            <section className="space-y-2">
              <label className="text-sm text-[#9CA3AF]">Description & Proof of Concept</label>
              
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
                
                <CustomToolbar />
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange} 
                  accept="image/*,video/*,.pdf"
                />
              </div>
            </section>

            <div className="pt-6 border-t border-[#1B212D]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#151A23] border border-[#2A303C]">
                    <span className="text-xs font-bold text-[#C5CBD8]">CS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#7F8698]">Reporter</span>
                    <span className="text-sm font-medium text-white">Chike Samuel</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-medium transition-colors ${
                      !isAnonymous ? "bg-[#151A23] text-white border border-[#2A303C]" : "bg-transparent text-[#7F8698]"
                    }`}
                  >
                    Public Submission
                  </button>
                </div>
                
                <p className="text-xs text-[#95D549]">
                  Submitting as {isAnonymous ? "Anonymous" : "Chike Samuel"}
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#9FC24D] py-4 text-center text-sm font-bold text-[#05070C] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#B2D660] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting Report..." : "Submit Report"}
                </button>
              </div>
            </div>

          </form>
        </div>
      </main>

      <Footer />
      
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
        .ql-editor strong {
          color: #FFFFFF;
          font-weight: 600;
        }
        .ql-editor.ql-blank::before {
          color: #4B5563;
          font-style: normal;
        }
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
    </div>
  );
      }
