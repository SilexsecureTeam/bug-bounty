// File: silexsecureteam/bug-bounty/bug-bounty-bb57d079c471742ea46b7bae3d1271853610cc72/src/pages/submit-report.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import { fetchPrograms, submitReport } from "../api";

const DEFAULT_PROGRAM_ID = "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

const queueTabs = [
  { label: "Open", active: true },
  { label: "Closed" }
];

const draftTickets = [
  {
    title: "New report",
    reference: "defcommxxxxxxxx",
    status: "Draft",
    active: true
  },
  {
    title: "New report",
    reference: "#Summary#steps1,2,3,4…",
    status: "Draft"
  }
];

const platformOptions = [
  { label: "Defcomm Device", icon: "📱" },
  { label: "Defcomm Software", icon: "💻" },
  { label: "Defcomm Web App", icon: "🌐" }
];

const creditProfiles = [
  { initials: "CS", name: "Chike Samuel" }
];

export default function SubmitReport() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPrograms, setFetchingPrograms] = useState(false);
  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    category: "", // maps to backend 'category'
    severity: "",
    description: "",
    steps: "",
    attachment: null // file => backend 'attachment'
  });

  // Fetch available programs
  useEffect(() => {
    const loadPrograms = async () => {
      setFetchingPrograms(true);
      try {
        const data = await fetchPrograms();
        if (Array.isArray(data.programs) && data.programs.length) {
          setPrograms(data.programs);
        } else {
          // no programs found -> keep programs empty; program_id will be ""
          setPrograms([]);
          toast("No programs available — report will be submitted to the default program.", { icon: "ℹ️" });
        }
      } catch (error) {
        setPrograms([]); // explicitly keep empty so program_id will be ""
        // only show an error toast if it's a true failure
        toast.error(error.message || "Failed to fetch programs");
      } finally {
        setFetchingPrograms(false);
      }
    };

    loadPrograms();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload according to backend expectation:
    // program_id, title, detail, category, severity, attachment (file)
    const payload = new FormData();

    // Use the user's selected program, or the default constant if none selected
    const programIdToSend = formData.program_id || DEFAULT_PROGRAM_ID;
    payload.append("program_id", programIdToSend);

    payload.append("title", formData.title || "");
    
    // compose 'detail' from description + steps to preserve all content
    const detail = `${formData.description || ""}` + (formData.steps ? `\n\nSteps to reproduce:\n${formData.steps}` : "");
    payload.append("detail", detail);
    
    // category should be one of the expected values (Authentication, XSS, API Vulv, Auth Bypass)
    payload.append("category", formData.category || "");
    
    // Fix: Ensure severity is lowercase to match Postman success (low, medium, high)
    // Default to 'low' if empty to prevent validation error.
    payload.append("severity", (formData.severity || "low").toLowerCase());

    // Fix: Only append attachment if it is a valid File object
    if (formData.attachment instanceof File) {
      payload.append("attachment", formData.attachment);
    }

    setLoading(true);
    try {
      await submitReport(payload);
      toast.success("Report submitted successfully!");
      setFormData({
        program_id: "",
        title: "",
        category: "",
        severity: "",
        description: "",
        steps: "",
        attachment: null
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070C] text-white">
      <PortalHeader activeLabel="Submit a report" />

      <main className="mx-auto flex w-full text-sm! gap-10 px-4 md:px-12 pb-20 pt-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="hidden w-[380px] shrink-0 flex-col rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-6 text-sm text-[#C5CBD8] shadow-[0_25px_70px_rgba(5,8,15,0.55)] lg:flex">
          {/* Queue Tabs */}
          <div className="flex items-center justify-between text-xs font-semibold tracking-[0.32em] text-[#E4E9F6]">
            <span>Security Research</span>
            <button
              type="button"
              className="rounded-full bg-[#97C94F] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#172007] shadow-[0_10px_25px_rgba(109,155,45,0.45)]"
            >
              New Post
            </button>
          </div>

          {/* Search */}
          <div className="mt-5">
            <label className="sr-only" htmlFor="queue-search">Search reports</label>
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
              type="button"
              className="rounded-full border border-[#2A3141] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E4E9F6] hover:bg-[#101622]"
            >
              New Post
            </button>
          </div>

          {/* Draft Tickets */}
          <div className="mt-6 space-y-2 text-xs text-[#9097AB]">
            {draftTickets.map(({ title, reference, status, active }) => (
              <button
                key={reference}
                type="button"
                className={`flex w-full flex-col gap-1 rounded-2xl border px-4 py-4 text-left transition-colors duration-150 ${active ? "border-[#96C74B] bg-[#131B0F] text-[#DDE8C4]" : "border-transparent bg-[#0E131D] hover:border-[#1F2535]"
                  }`}
              >
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="truncate text-[10px] uppercase tracking-[0.3em] text-[#8991A6]">{reference}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#96C74B]">{status}</span>
              </button>
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

        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {/* Report Details Form */}

          <section className="space-y-10 rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-8 shadow-[0_30px_85px_rgba(5,8,15,0.55)]">
            <div className="flex gap-5 flex-col md:flex-row">

              <div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-white">Report a Vulnerability</h2>
                  {/* <div className="h-px w-full bg-[#1D2230]" /> */}
                  <div className="space-y-5 mt-4">
                    <p>Lorem ipsum dolor sit amet consectetur. Egestas tellus tempor tristique massa nibh. Leo tellus sodales tortor et morbi nisi quis. Et fermentum imperdiet sit aliquet eu nunc euismod neque maecenas. Aliquet laoreet nec dolor donec elementum non velit pellentesque massa. Nunc ultricies imperdiet venenatis risus <span className="text-[#8BAF2B]">convallis in vulputate.</span></p>
                    <p>Lorem ipsum dolor sit amet consectetur. Egestas tellus tempor tristique massa nibh. Leo tellus sodales tortor et morbi nisi quis. Et fermentum imperdiet sit aliquet eu nunc euismod neque maecenas. Aliquet laoreet nec dolor donec elementum non velit pellentesque massa. Nunc ultricies imperdiet venenatis risus <span className="text-[#8BAF2B]">convallis in vulputate.</span></p>
                  </div>
                </div>
              </div>
              <div className="bg-[#333333] h-fit w-fit p-4 md:text-nowrap text-sm">
                <p>Need reporting help?</p>
                <p className="text-[#8BAF2B] capitalize">View bounty guideines</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">Report Details</h2>
              <div className="h-px w-full bg-[#1D2230]" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-row-reverse">
              {/* right Column */}
              <div className="flex flex-col gap-3">
                <label className="space-y-2! text-sm text-[#C5CBD8]">
                  {/* <span className="font-semibold tracking-[0.3em] text-[#7F8698]">Title</span> */}
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  {/* <span className="font-semibold tracking-[0.3em] text-[#7F8698]">Program</span> */}
                  <select
                    name="program_id"
                    value={formData.program_id}
                    onChange={handleChange}
                    disabled={fetchingPrograms || programs.length === 0}
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white-50 focus:border-[#A3CB4F] focus:outline-none"
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
                  {/* <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Steps to Reproduce</span> */}
                  <textarea
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                    rows={3}
                    placeholder="How can this bug be reproduced?"
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  {/* <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Description</span> */}
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Provide a detailed description (summary, steps to reproduce, expected result, actual result)"
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>
              
                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  {/* <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Category</span> */}
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white-50 focus:border-[#A3CB4F] focus:outline-none"
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

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  {/* <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Severity</span> */}
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white-50 focus:border-[#A3CB4F] focus:outline-none"
                  >
                    <option value="">Select Severity</option>
                    {/* Updated values to lowercase to match backend expectation */}
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  {/* <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Attachments</span> */}
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    className="block w-full rounded-2xl border border-dashed border-[#2F3648] bg-[#101622] px-3 py-2 text-sm text-white-50"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#0B0F05] shadow-[0_25px_55px_rgba(61,113,16,0.45)] disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
