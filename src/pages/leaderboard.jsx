import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PortalHeader from "../components/PortalHeader";
import { fetchLeaderboard } from "../api";
import { toast } from "react-hot-toast";

const rankColors = {
  1: "bg-gradient-to-tr from-[#FFD88C] via-[#F9B938] to-[#E3A73C]",
  2: "bg-gradient-to-tr from-[#E6EAEE] via-[#C8CFD8] to-[#9BA2AE]",
  3: "bg-gradient-to-tr from-[#F2C89C] via-[#E3A46C] to-[#C87B43]"
};

const baseCardGradient = "bg-[radial-gradient(circle_at_top,_#101629,_#05080F)]";
const cellBase = "py-5 px-6 text-sm text-[#E4E9F2]";

function RankBadge({ rank }) {
  const className = rankColors[rank] ?? "bg-[#131A2B] border border-[#222C41]";
  const textColor = rank <= 3 ? "text-[#1B1609]" : "text-[#D8DCE8]";
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-[0_12px_24px_rgba(0,0,0,0.35)] ${className}`}
    >
      <span className={textColor}>{rank}</span>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.333 11.334H4.667V4.667H8V3H4.667C3.933 3 3.333 3.6 3.333 4.333V11.667C3.333 12.4 3.933 13 4.667 13H11.333C12.067 13 12.667 12.4 12.667 11.667V8.333H11V11.334ZM9.333 3V4.667H11.72L6.16 10.227L7.273 11.34L12.833 5.78V8.167H14.5V3H9.333Z"
        fill="#717893"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.8335 7.5L10.0002 11.6667L14.1668 7.5" stroke="#10131C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.1667 6.33341H25.6667V5.00008C25.6667 4.26675 25.0667 3.66675 24.3333 3.66675H13.6667C12.9333 3.66675 12.3333 4.26675 12.3333 5.00008V6.33341H9.83334C9.10001 6.33341 8.5 6.93341 8.5 7.66675V10.3334C8.5 13.4534 10.94 16.0667 13.8733 16.3867C14.6533 18.2 16.2733 19.6 18.1667 20.0667V24.3334H13.3333C12.2333 24.3334 11.3333 25.2334 11.3333 26.3334V27.6667C11.3333 28.4 11.9333 29 12.6667 29H25.3333C26.0667 29 26.6667 28.4 26.6667 27.6667V26.3334C26.6667 25.2334 25.7667 24.3334 24.6667 24.3334H19.8333V20.0667C21.7267 19.6 23.3467 18.2067 24.1267 16.3867C27.06 16.0667 29.5 13.4534 29.5 10.3334V7.66675C29.5 6.93341 28.9 6.33341 28.1667 6.33341ZM10.6667 10.3334V9.00008H12.3333V13.6667C11 13.1134 10.0533 11.9 10.6667 10.3334ZM27 10.3334C27.6133 11.9 26.6667 13.1134 25.3333 13.6667V9.00008H27V10.3334Z"
        fill="#EEC660"
      />
    </svg>
  );
}

function HackerAvatar({ initial }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#7E30E1] via-[#A95DFC] to-[#C56CFF] shadow-[0_12px_30px_rgba(124,57,230,0.45)]">
      <span className="text-lg font-semibold text-white">{initial}</span>
      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#2A3347] bg-[#0B1120]">
        <span className="text-[10px] text-[#9AA2BD]">#</span>
      </span>
    </div>
  );
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchLeaderboard();
        
        // Handle different response structures gracefully
        const records = Array.isArray(response) ? response : (response.data || []);

        const formattedData = records
          .map((item) => ({
            rank: item.no,
            handle: `@${item.username || 'user'}`,
            name: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Anonymous',
            points: item.total_points || 0,
            bugsFound: item.total_reports || 0,
            reward: item.total_amount ? `₦${Number(item.total_amount).toLocaleString()}` : "₦0"
          }))
          // ✅ Explicitly sort by rank ascending (1, 2, 3...)
          .sort((a, b) => a.rank - b.rank);

        setLeaderboardData(formattedData);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        toast.error("Unable to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-[#04070F] text-white">
      <PortalHeader activeLabel="Leaderboard" />
      
      <div className="py-20 px-4 lg:px-0">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className={`flex flex-col gap-6 rounded-3xl border border-[#1C2538]/80 ${baseCardGradient} p-8 shadow-[0_30px_90px_rgba(4,7,15,0.55)] backdrop-blur-md`}
            style={{ boxShadow: "0 30px 90px rgba(5, 9, 20, 0.55)", borderImage: "linear-gradient(145deg, rgba(41,55,84,0.7), rgba(23,31,52,0.3)) 1" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#26314A] bg-linear-to-br from-[#121A2B] to-[#0C1221] shadow-[0_14px_35px_rgba(17,24,43,0.45)]">
                  <TrophyIcon />
                </div>
                <div>
                  <h1 className="text-[34px] font-semibold text-white tracking-tight">Defcomm Scoreboard</h1>
                  <p className="mt-2 text-sm text-[#8E97B2]">Top Hackers of the year</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => navigate('/submit-report')}
                  className="inline-flex items-center justify-center rounded-full bg-[#95D549] px-6 py-3 text-sm font-semibold text-[#0A1205] shadow-[0_18px_36px_rgba(149,213,73,0.38)] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Submit a report
                </button>
                <button className="inline-flex items-center gap-3 rounded-full border border-[#26314A] bg-[#11172A] px-5 py-3 text-sm font-semibold text-[#E4E9F2]">
                  Year 2025
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </header>

          <section className={`rounded-3xl border border-[#1C2538]/80 ${baseCardGradient} shadow-[0_28px_85px_rgba(5,9,20,0.45)] backdrop-blur`}
            style={{ boxShadow: "0 28px 85px rgba(5, 9, 20, 0.45)", borderImage: "linear-gradient(150deg, rgba(37,51,77,0.75), rgba(15,21,36,0.25)) 1" }}>
            <div className="grid grid-cols-12 border-b border-[#141C2F] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#697394]">
              <div className="col-span-2">Rank</div>
              <div className="col-span-4">Hacker</div>
              <div className="col-span-2">Points</div>
              <div className="col-span-2">Bugs Found</div>
              <div className="col-span-2 text-right">Rewards</div>
            </div>

            <div className="divide-y divide-[#141C2F]/80">
              {loading ? (
                <div className="py-20 text-center text-[#8E97B2]">Loading leaderboard...</div>
              ) : leaderboardData.length === 0 ? (
                <div className="py-20 text-center text-[#8E97B2]">No records found.</div>
              ) : (
                leaderboardData.map((row) => (
                  <article
                    key={row.rank}
                    className="grid grid-cols-12 items-center px-6 py-6 transition-colors duration-150 hover:bg-[#111A2C]/60"
                  >
                    <div className="col-span-2">
                      <div className="flex items-center gap-3">
                        <RankBadge rank={row.rank} />
                        {row.rank <= 3 && (
                          <span className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#EBCD87]">
                            Top {row.rank}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <HackerAvatar initial={row.handle.charAt(1).toUpperCase()} />
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-white tracking-tight">{row.handle}</p>
                          <p className="text-xs text-[#8590B1]">{row.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${cellBase} col-span-2 font-semibold tracking-[0.05em] text-[#F3F6FF]`}>{row.points}</div>
                    <div className={`${cellBase} col-span-2 text-[#CAD2EA]`}>{row.bugsFound}</div>
                    <div className="col-span-2 flex items-center justify-end gap-3">
                      <span className="text-sm font-semibold text-[#F5DFAE] tracking-wide">{row.reward}</span>
                      <ExternalIcon />
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}