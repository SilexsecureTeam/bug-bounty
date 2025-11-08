import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";

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
  return (
    <div className="min-h-screen bg-[#05070C] text-white">
      <PortalHeader activeLabel="Submit a report" />

      <main className="mx-auto flex w-full max-w-[1200px] gap-10 px-6 pb-20 pt-20 lg:gap-14">
        <aside className="hidden w-[280px] shrink-0 flex-col rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-6 text-sm text-[#C5CBD8] shadow-[0_25px_70px_rgba(5,8,15,0.55)] lg:flex">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.32em] text-[#E4E9F6]">
            <span>Security Research</span>
            <button
              type="button"
              className="rounded-full bg-[#97C94F] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#172007] shadow-[0_10px_25px_rgba(109,155,45,0.45)]"
            >
              New Post
            </button>
          </div>
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

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex overflow-hidden rounded-full border border-[#202634] bg-[#111722] text-xs font-semibold uppercase tracking-[0.3em] text-[#70788F]">
              {queueTabs.map(({ label, active }) => (
                <button
                  key={label}
                  type="button"
                  className={`px-4 py-2 transition-colors duration-150 ${
                    active ? "bg-[#96C74B] text-[#131C09]" : "hover:text-[#E2E8F6]"
                  }`}
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

          <div className="mt-6 space-y-2 text-xs text-[#9097AB]">
            {draftTickets.map(({ title, reference, status, active }) => (
              <button
                key={reference}
                type="button"
                className={`flex w-full flex-col gap-1 rounded-2xl border px-4 py-4 text-left transition-colors duration-150 ${
                  active
                    ? "border-[#96C74B] bg-[#131B0F] text-[#DDE8C4]"
                    : "border-transparent bg-[#0E131D] hover:border-[#1F2535]"
                }`}
              >
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="truncate text-[10px] uppercase tracking-[0.3em] text-[#8991A6]">{reference}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#96C74B]">{status}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8">
            {creditProfiles.map(({ initials, name }) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-4 text-xs text-[#E2E8F6]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2334] text-sm font-semibold text-[#DDE4F7]">
                    {initials}
                  </span>
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

        <div className="flex-1 space-y-12">
          <section className="rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-8 shadow-[0_25px_70px_rgba(5,8,15,0.55)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,1fr)]">
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-white">Report a vulnerability</h1>
                <p className="text-sm leading-relaxed text-[#C5CBD8]">
                  Lorem ipsum dolor sit amet consectetur. Egestas tellus tempor tristique massa nibh. Leo tellus sodales tortor et morbi nisl quis. Et fermentum imperdiet sit aliquet eu nunc euismod neque malesuada. Aliquet laoreet nec dolor donec elementum non velit pellentesque massa. Nunc ultricies imperdiet venenatis risus <span className="text-[#8FC472]">convallis in vulputate</span>.
                </p>
                <p className="text-sm leading-relaxed text-[#C5CBD8]">
                  Lorem ipsum dolor sit amet consectetur. Egestas tellus tempor tristique massa nibh. Leo tellus sodales tortor et morbi nisl quis. Et fermentum imperdiet sit aliquet eu nunc euismod neque malesuada. Aliquet laoreet nec dolor donec elementum non velit pellentesque massa. Nunc ultricies imperdiet venenatis risus <span className="text-[#8FC472]">convallis in vulputate</span>.
                </p>
              </div>
              <aside className="flex flex-col gap-4 rounded-3xl border border-[#262B39] bg-[#111722] p-6 text-sm text-[#C5CBD8] shadow-[0_20px_55px_rgba(4,6,12,0.45)]">
                <h3 className="text-base font-semibold text-white">Need reporting help?</h3>
                <p className="text-sm leading-relaxed text-[#A7ADBD]">
                  View detailed guidelines and best practices to make sure your submission meets all requirements.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0B0F05] shadow-[0_18px_40px_rgba(70,114,26,0.45)]"
                >
                  View Bounty Guidelines
                </button>
              </aside>
            </div>
          </section>

          <section className="space-y-10 rounded-3xl border border-[#1B1F2A] bg-[#080C14] p-8 shadow-[0_30px_85px_rgba(5,8,15,0.55)]">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">Report Details</h2>
              <div className="h-px w-full bg-[#1D2230]" />
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
              <div className="space-y-6">
                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Title</span>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">How can this bug be reproduced?</span>
                  <textarea
                    rows={3}
                    placeholder="Provide clear reproduction steps"
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white placeholder:text-[#5E667B] focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Submission Outline</span>
                  <textarea
                    rows={10}
                    defaultValue={"#Summary\n\n#Steps to reproduce\n1.\n2.\n3.\n\n#Expected result\n\n#Actual result"}
                    className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white focus:border-[#A3CB4F] focus:outline-none"
                  />
                </label>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 rounded-2xl border border-[#262B39] bg-[#111722] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#7F8698]">Affected Platform</p>
                  <div className="grid gap-3">
                    {platformOptions.map(({ label, icon }, index) => (
                      <button
                        key={label}
                        type="button"
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors duration-150 ${
                          index === 0
                            ? "border-[#97C94F] bg-[#131B0F] text-[#DCE8C4]"
                            : "border-[#202634] bg-[#0E131D] text-[#C5CBD8] hover:border-[#2F3648]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-lg">{icon}</span>
                          {label}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#70788F]">Select</span>
                      </button>
                    ))}
                  </div>
                </div>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Affected area</span>
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white focus:border-[#A3CB4F] focus:outline-none"
                    >
                      <option value="">Select area</option>
                      <option>Authentication</option>
                      <option>Infrastructure</option>
                      <option>Mobile</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#5E667B]">⌄</span>
                  </div>
                </label>

                <label className="space-y-2 text-sm text-[#C5CBD8]">
                  <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Attachments</span>
                  <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-[#2F3648] bg-[#101622] text-xs text-[#70788F]">
                    Drag &amp; drop files or <span className="ml-1 text-[#96C74B]">browse</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
              <div className="space-y-6">
                <div className="flex flex-col gap-3 text-sm text-[#C5CBD8]">
                  <p>
                    Your report will be linked to your Defcomm Account, which will allow you to track the status of your
                    submission and add comments. All submissions are considered for the Defcomm Bug Bounty Program and are
                    subject to our <span className="text-[#8FC472]">Terms and Conditions</span>.
                  </p>
                  <p>
                    Reports may be used or stored by Defcomm to evaluate the issue and to strengthen the security of
                    Defcomm systems and services (for example, to compile proof-of-concept files or for regression testing).
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="space-y-2 text-sm text-[#C5CBD8]">
                    <span className="font-semibold uppercase tracking-[0.3em] text-[#7F8698]">Credit</span>
                    <input
                      type="text"
                      value="Chike Samuel"
                      readOnly
                      className="w-full rounded-2xl border border-[#202634] bg-[#0E131D] px-4 py-3 text-sm text-white"
                    />
                  </label>
                  <button
                    type="button"
                    className="w-full rounded-full border border-[#2A3141] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#E2E8F6] hover:bg-[#101622]"
                  >
                    I would like my submission to remain anonymous
                  </button>
                </div>

                <div className="flex flex-col gap-3 text-sm text-[#C5CBD8]">
                  <button
                    type="button"
                    className="w-full rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#0B0F05] shadow-[0_25px_55px_rgba(61,113,16,0.45)]"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-full border border-[#7E1417] px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#ED6A6D] hover:bg-[#20090B]"
                  >
                    Delete Draft
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
