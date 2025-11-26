// /src/pages/submit-report.jsx
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import { fetchPrograms, submitReport } from "../api";

/**
 * Professional, production-ready Submit Report page
 * - Option A: replaces single textarea with structured multi-block description editor
 * - Autosave drafts to localStorage (autosave + explicit save)
 * - Drafts shown in sidebar; can restore / delete drafts
 * - Attachment preview for images; non-image fallback
 * - Preserves original submit behavior (FormData + detail field)
 *
 * Notes:
 * - localStorage cannot persist File objects. saved drafts will reference attachment metadata
 *   but not the actual file. Users will need to re-attach files when restoring a draft.
 */

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

export default function SubmitReport() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPrograms, setFetchingPrograms] = useState(false);

  // main form values (meta)
  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    category: "",
    severity: "",
    // description field will be composed from descriptionBlocks on submit
    description: "",
    steps: "",
    attachment: null // File object only in-memory; not stored to localStorage
  });

  // structured multi-block description (Option A)
  const [descriptionBlocks, setDescriptionBlocks] = useState({
    summary: "",
    detailed: "",
    endpoints: "",
    impact: "",
    severity_analysis: "",
    remediation: ""
  });

  // UI state
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [drafts, setDrafts] = useState([]); // array of saved drafts (metadata)
  const [lastAutosave, setLastAutosave] = useState(null);
  const autosaveRef = useRef(null);

  // Fetch programs
  useEffect(() => {
    const loadPrograms = async () => {
      setFetchingPrograms(true);
      try {
        const data = await fetchPrograms();
        if (Array.isArray(data.programs) && data.programs.length) {
          setPrograms(data.programs);
        } else {
          setPrograms([]);
          toast("No programs available — report will be submitted to the default program.", { icon: "ℹ️" });
        }
      } catch (error) {
        setPrograms([]);
        toast.error(error.message || "Failed to fetch programs");
      } finally {
        setFetchingPrograms(false);
      }
    };

    loadPrograms();
  }, []);

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
    if (blocks.detailed?.trim()) parts.push(`# Detailed description\n${blocks.detailed.trim()}`);
    if (blocks.endpoints?.trim()) parts.push(`# Affected endpoints\n${blocks.endpoints.trim()}`);
    if (blocks.impact?.trim()) parts.push(`# Impact & potential risk\n${blocks.impact.trim()}`);
    if (blocks.severity_analysis?.trim()) parts.push(`# Severity analysis\n${blocks.severity_analysis.trim()}`);
    if (blocks.remediation?.trim()) parts.push(`# Recommended remediation\n${blocks.remediation.trim()}`);
    return parts.join("\n\n");
  };

  // Submit handler — builds FormData and submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure description is built from blocks (single source of truth)
    const description = buildCombinedDescription(descriptionBlocks);

    const payload = new FormData();
    const programIdToSend = formData.program_id || DEFAULT_PROGRAM_ID;
    payload.append("program_id", programIdToSend);
    payload.append("title", formData.title || "");
    // Combine with steps (previous behavior)
    const detail = `${description || ""}` + (formData.steps ? `\n\nSteps to reproduce:\n${formData.steps}` : "");
    payload.append("detail", detail);
    payload.append("category", formData.category || "");
    payload.append("severity", (formData.severity || "low").toLowerCase());
    if (formData.attachment instanceof File) {
      payload.append("attachment", formData.attachment);
    }

    try {
      await submitReport(payload);
      toast.success("Report submitted successfully!");
      // on success, clear form and remove autosave
      clearForm();
      // optionally remove last autosave as it is now submitted
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
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
      detailed: "",
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
    detailed: "",
    endpoints: "",
    impact: "",
    severity_analysis: "",
  });

  setAttachments([]);
  setAttachmentPreview(null);

  setSubmitting(false);
};



  // Render
  return (
    <div className="min-h-screen bg-[#05070C] text-white">
      <PortalHeader activeLabel="Submit a report" />

      <main className="mx-auto flex w-full text-sm! gap-10 px-4 md:px-12 pb-20 pt-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="hidden w-[380px] shrink-0 flex-col rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-6 text-sm text-[#C5CBD8] shadow-[0_25px_70px_rgba(5,8,15,0.55)] lg:flex">
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
              <div className="lg:col-span-7">
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
              <div className="lg:col-span-5 flex flex-col gap-6">
                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Report Title"
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-5 py-4 text-base text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none transition-colors"
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                  <label className="space-y-2 text-sm text-[#C5CBD8]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7F8698]">Program</span>
                    <select
                      name="program_id"
                      value={formData.program_id}
                      onChange={handleChange}
                      disabled={fetchingPrograms || programs.length === 0}
                      className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white focus:border-[#A3CB4F] focus:outline-none cursor-pointer"
                    >
                      <option value="">{programs.length === 0 ? "No programs available" : "Select Program"}</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.program_name || program.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2 text-sm text-[#C5CBD8]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7F8698]">Category</span>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white focus:border-[#A3CB4F] focus:outline-none cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      <option>Authentication</option>
                      <option>XSS</option>
                      <option>API Vuln</option>
                      <option>Auth Bypass</option>
                      <option>Sensitive Data exposure</option>
                      <option>Broken Access Control</option>
                      <option>Security Misconfiguration</option>
                      <option>Cryptographic Failures</option>
                      <option>Others</option>
                    </select>
                  </label>
                </div>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7F8698]">Severity</span>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white focus:border-[#A3CB4F] focus:outline-none cursor-pointer"
                  >
                    <option value="">Select Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </label>

                {/* Structured Description Editor (Option A) */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#7F8698]">Description</div>

                  <div className="space-y-3">
                    {/* Summary */}
                    <div>
                      <label className="text-xs font-medium text-[#BFC6D6]">Summary</label>
                      <textarea
                        rows={2}
                        value={descriptionBlocks.summary}
                        onChange={(e) => handleDescriptionBlockChange("summary", e.target.value)}
                        placeholder="Short, one-paragraph overview for triage teams (what and where)."
                        className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-2 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                      />
                    </div>

                    {/* Detailed description */}
                    <div>
                      <label className="text-xs font-medium text-[#BFC6D6]">Detailed description</label>
                      <textarea
                        rows={4}
                        value={descriptionBlocks.detailed}
                        onChange={(e) => handleDescriptionBlockChange("detailed", e.target.value)}
                        placeholder="Detailed technical explanation, reproduction notes and conditions."
                        className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-2 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                      />
                    </div>

                    {/* Affected endpoints */}
                    <div>
                      <label className="text-xs font-medium text-[#BFC6D6]">Affected endpoints</label>
                      <textarea
                        rows={2}
                        value={descriptionBlocks.endpoints}
                        onChange={(e) => handleDescriptionBlockChange("endpoints", e.target.value)}
                        placeholder="List the endpoints, URLs or functions affected (one per line)."
                        className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-2 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                      />
                    </div>

                    {/* Impact & potential risk */}
                    <div>
                      <label className="text-xs font-medium text-[#BFC6D6]">Impact & potential risk</label>
                      <textarea
                        rows={3}
                        value={descriptionBlocks.impact}
                        onChange={(e) => handleDescriptionBlockChange("impact", e.target.value)}
                        placeholder="Describe the potential business or technical impact if exploited."
                        className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-2 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                      />
                    </div>

                    {/* Severity analysis */}
                    <div>
                      <label className="text-xs font-medium text-[#BFC6D6]">Severity analysis (optional)</label>
                      <textarea
                        rows={2}
                        value={descriptionBlocks.severity_analysis}
                        onChange={(e) => handleDescriptionBlockChange("severity_analysis", e.target.value)}
                        placeholder="Explain why you think the severity is low/medium/high — helpful for reviewers."
                        className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-2 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                      />
                    </div>

                    {/* Recommended remediation */}
                    <div>
                      <label className="text-xs font-medium text-[#BFC6D6]">Recommended remediation</label>
                      <textarea
                        rows={2}
                        value={descriptionBlocks.remediation}
                        onChange={(e) => handleDescriptionBlockChange("remediation", e.target.value)}
                        placeholder="Suggested mitigation or remediation steps for the engineering team."
                        className="w-full rounded-xl border border-[#202634] bg-[#0E131D] px-4 py-2 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7F8698]">Steps to Reproduce</span>
                  <textarea
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Step-by-step guide to reproduce the vulnerability..."
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-5 py-3 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>

                {/* Attachments */}
                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7F8698]">Attachments</span>
                  <div className="relative">
                    <input
                      type="file"
                      name="attachment"
                      accept="image/*,video/*,application/pdf"
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-dashed border-[#2F3648] bg-[#101622] px-4 py-8 text-sm text-center text-[#70788F] hover:bg-[#151B26] transition-colors cursor-pointer file:hidden"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-[#70788F] bg-[#101622] px-3 pointer-events-none">
                      {attachmentPreview && isImageFile(attachmentPreview) ? (
                        <img src={attachmentPreview} alt="preview" className="max-h-36 rounded-md object-cover border border-[#202634]" />
                      ) : formData.attachment ? (
                        <div className="flex items-center gap-2">
                          <span>📎</span>
                          <span className="text-[#A3CB4F]">{formData.attachment.name}</span>
                        </div>
                      ) : (
                        "Drag and drop or click to upload evidence (Images, Videos, PDFs)"
                      )}
                    </div>

                    {/* Remove button */}
                    {formData.attachment && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, attachment: null }));
                          if (attachmentPreview) {
                            try {
                              URL.revokeObjectURL(attachmentPreview);
                            } catch { }
                            setAttachmentPreview(null);
                          }
                        }}
                        className="absolute right-3 top-3 z-10 rounded-md bg-[#0B1018]/60 px-2 py-1 text-[12px] text-[#A3CB4F]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="text-[11px] text-[#7F8698] mt-2">
                    Note: attachments are not saved in drafts, please re-attach when resuming a draft.
                  </div>
                </label>

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

                {lastAutosave && <div className="text-[11px] text-[#7F8698] mt-2">Last autosaved: {niceDate(lastAutosave)}</div>}
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
