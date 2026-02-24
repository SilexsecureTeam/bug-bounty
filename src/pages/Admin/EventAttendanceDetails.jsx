import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, Download, ChevronLeft, ChevronRight, 
  ChevronDown, RefreshCw, FileText, Users, LogOut, 
  Hourglass, QrCode, Radio, ArrowUpRight, ArrowRight, CheckCircle, Loader, Eye, X
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchEventApplicants, 
  fetchEventAttendance, 
  approveAttendance,
  fetchEvents 
} from '../../adminApi';

// --- COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, subContent }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32]">
        <Icon size={20} />
      </div>
    </div>
    
    <div className="mt-auto z-10">
      {subContent ? (
        subContent
      ) : (
        <div className="flex items-center gap-2">
          {trend && (
            <span className="flex items-center gap-1 text-[#22C55E] text-xs font-bold">
              {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
              {trend}%
            </span>
          )}
          {trendLabel && <span className="text-xs text-[#6B7280]">{trendLabel}</span>}
        </div>
      )}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  if (status === "Present") styles = "bg-[#1F3513] text-[#4ADE80] border border-[#2F4523]";
  if (status === "Registered") styles = "bg-[#2A2E2A] text-[#9CA3AF] border border-[#3F423F]";
  if (status === "Checked Out") styles = "bg-[#2A2E2A] text-[#9CA3AF] border border-[#3F423F]";
  if (status === "Flagged") styles = "bg-[#351313] text-[#EF4444] border border-[#452323]";

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Present' ? 'bg-[#4ADE80]' : status === 'Flagged' ? 'bg-[#EF4444]' : 'bg-[#9CA3AF]'}`}></span>
      {status}
    </span>
  );
};

export default function EventAttendanceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Data State
  const [eventName, setEventName] = useState("Loading Event...");
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [processing, setProcessing] = useState(null); 

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // --- 1. HANDLE DEFAULT EVENT REDIRECTION & EVENT NAME ---
  useEffect(() => {
    const initPage = async () => {
      setInitializing(true);
      try {
        const eventsRes = await fetchEvents();
        const eventsList = eventsRes.data || [];

        if (!id) {
          if (eventsList.length > 0) {
            const latestEvent = eventsList[0]; 
            navigate(`/admin/attendees/${latestEvent.id}`, { replace: true });
            return; 
          } else {
            setEventName("No Events Found");
            setLoading(false);
          }
        } else {
          const currentEvent = eventsList.find(e => String(e.id) === String(id));
          if (currentEvent) {
            setEventName(currentEvent.name);
          } else {
            setEventName("Unknown Event");
          }
          loadAttendeeData(id);
        }
      } catch (error) {
        console.error("Initialization failed:", error);
        setEventName("Error Loading Event");
        setLoading(false);
      } finally {
        setInitializing(false);
      }
    };

    initPage();
  }, [id, navigate]);

  // --- 2. LOAD ATTENDEES (Applicants + Approved) ---
  const loadAttendeeData = async (eventId) => {
    setLoading(true);
    try {
      const [applicantsRes, attendanceRes] = await Promise.all([
        fetchEventApplicants(eventId),
        fetchEventAttendance(eventId)
      ]);

      const applicants = applicantsRes.data || [];
      const attendance = attendanceRes.data || [];

      // Match Logic
      const attendanceMap = new Map();
      attendance.forEach(record => {
        const email = record.user?.email || record.email;
        if(email) {
            attendanceMap.set(email.toLowerCase().trim(), record);
        }
      });

      const mergedList = applicants.map(app => {
        const appEmail = app.user?.email || app.email;
        const normalizedEmail = appEmail ? appEmail.toLowerCase().trim() : null;
        
        const attendRecord = normalizedEmail ? attendanceMap.get(normalizedEmail) : null;

        // Parse JSON data for submission details
        let parsedData = {};
        try {
            parsedData = app.data ? JSON.parse(app.data) : {};
        } catch (e) {
            // handle error
        }

        let status = "Registered";
        let checkInTime = "---";
        
        if (attendRecord) {
            status = "Present";
            if (attendRecord.created_at) {
                const date = new Date(attendRecord.created_at);
                checkInTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        }

        return {
            id: app.id, 
            userId: app.user?.id, 
            name: app.user?.name || app.name || "Unknown",
            email: appEmail || "No Email",
            phone: app.user?.phone || app.phone,
            checkIn: checkInTime,
            status: status,
            verification: attendRecord ? "Verified" : "Pending",
            submissionData: parsedData, // Store parsed data
            rawSubmission: app.data // Store raw string just in case
        };
      });

      setAttendees(mergedList);

    } catch (error) {
      console.error("Error loading details:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. HANDLE APPROVAL (CHECK IN) ---
  const handleApprove = async (userId) => {
    if (!userId || !id) return;
    setProcessing(userId);
    try {
        await approveAttendance(id, userId);
        await loadAttendeeData(id);
    } catch (error) {
        console.error("Approval failed:", error);
        alert("Failed to check in user.");
    } finally {
        setProcessing(null);
    }
  };

  const handleViewSubmission = (user) => {
      setSelectedSubmission(user);
      setIsModalOpen(true);
  };

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return attendees.filter(user => {
        if (activeTab === "Present" && user.status !== "Present") return false;
        if (activeTab === "Registered" && user.status !== "Registered") return false; 
        
        const search = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
    });
  }, [attendees, activeTab, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Stats
  const totalRegistered = attendees.length;
  const presentCount = attendees.filter(a => a.status === "Present").length;
  const completionRate = totalRegistered > 0 ? Math.round((presentCount / totalRegistered) * 100) : 0;

  if (initializing) {
    return (
        <div className="min-h-screen bg-[#060706] flex items-center justify-center text-white">
            <Loader className="animate-spin text-[#9ECB32]" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans relative">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h1 className="text-2xl font-bold text-white">{eventName}</h1>
             <span className="bg-[#1F221F] text-[#9ECB32] text-[10px] px-2 py-0.5 rounded border border-[#2A2E2A]">
                LIVE
             </span>
          </div>
          <p className="text-[#6B7280] text-sm">Managing attendance and applications for Event ID: <span className="font-mono text-[#9CA3AF]">{id ? id.substring(0, 8) + '...' : ''}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-medium text-gray-300 hover:bg-[#1F221F]">
             <FileText size={14} /> Generate Report
          </button>
          <button 
            onClick={() => loadAttendeeData(id)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#9ECB32] text-black hover:bg-[#8AB32A] transition-colors shadow-[0_0_10px_rgba(158,203,50,0.4)]"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Applicants" 
          value={totalRegistered.toString()} 
          icon={FileText} 
          trend={0} 
          trendLabel="Registered Users"
        />
        <StatCard 
          title="Total Attendees" 
          value={presentCount.toString()} 
          icon={Users} 
          trend={0} 
          trendLabel="Actually Present"
        />
        <StatCard 
          title="Attendance Rate" 
          value={`${completionRate}%`} 
          icon={LogOut} 
          trendLabel="Conversion"
          subContent={
            <div className="flex items-center gap-2 text-white text-xs">
              <ArrowRight size={14} /> {completionRate >= 50 ? "Good Turnout" : "Normal Turnout"}
            </div>
          }
        />
        <StatCard 
          title="Completion Rate" 
          value={`${completionRate}%`} 
          icon={Hourglass} 
          subContent={
            <div className="w-full h-1.5 bg-[#2A2E2A] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#9ECB32]" style={{ width: `${completionRate}%` }}></div>
            </div>
          }
        />
      </div>

      {/* 3. TOOLBAR */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {["All", "Present", "Registered"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab 
                    ? "bg-[#9ECB32] text-black shadow-[0_0_15px_rgba(158,203,50,0.3)]" 
                    : "border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613]"
                }`}
              >
                {tab}
              </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input 
              type="text" 
              placeholder="Search user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border border-[#2A2E2A] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#9ECB32]"
            />
          </div>
          <button className="p-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613]">
            <Filter size={18} />
          </button>
          <button className="p-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613]">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* 4. DATA TABLE */}
      <div className="bg-[#141613]/50 border border-[#2A2E2A] rounded-xl overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1F221F] border-b border-[#2A2E2A]">
              <tr>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12">#</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">User Details</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Check-In</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Submission</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {loading ? (
                <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-500 text-sm">
                        <div className="flex flex-col items-center gap-2">
                            <Loader className="animate-spin text-[#9ECB32]" size={24} />
                            <span>Fetching list...</span>
                        </div>
                    </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((user, index) => {
                  const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                  return (
                    <tr key={user.id} className="hover:bg-[#1A1D1A] transition-colors group">
                      <td className="py-4 px-6 text-xs text-gray-500">{displayIndex}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1F2227] flex items-center justify-center text-xs text-white font-bold border border-[#2A2E2A]">
                             {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                            <p className="text-[10px] text-gray-500 mt-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs font-medium text-white">{user.checkIn}</td>
                      <td className="py-4 px-6">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-4 px-6">
                         <button 
                            onClick={() => handleViewSubmission(user)}
                            className="flex items-center gap-2 text-[10px] font-bold text-[#9ECB32] hover:underline"
                         >
                            <Eye size={14} /> View Data
                         </button>
                      </td>
                      <td className="py-4 px-6">
                        {user.status === "Present" ? (
                             <span className="inline-flex items-center gap-1.5 text-xs text-[#22C55E] font-bold bg-[#111C10] px-3 py-1.5 rounded border border-[#1F3513]">
                                <CheckCircle size={14} /> Admitted
                             </span>
                        ) : (
                            <button 
                                onClick={() => handleApprove(user.userId)}
                                disabled={processing === user.userId || !user.userId}
                                className="flex items-center gap-2 text-[10px] font-bold bg-[#9ECB32] text-black border border-[#8AB32A] px-4 py-1.5 rounded hover:bg-[#B1D658] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {processing === user.userId ? (
                                    <Loader size={12} className="animate-spin" />
                                ) : (
                                    <CheckCircle size={12} />
                                )}
                                {processing === user.userId ? "..." : "Admit"}
                            </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                 <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-500 text-sm">
                        No attendees found matching your criteria.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#141613]">
          <div className="text-xs text-gray-400">
             {paginatedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} - {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
          </div>
          <div className="flex items-center gap-4">
             <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white transition-colors disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SUBMISSION DATA MODAL */}
      {isModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0D0F10] border-l border-[#1F2227] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
                <div className="p-6 border-b border-[#1F2227] flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Applicant Submission</h2>
                        <p className="text-xs text-gray-400 mt-1">{selectedSubmission.name}</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {/* Iterate over parsed submission data */}
                    {Object.keys(selectedSubmission.submissionData).length > 0 ? (
                        Object.entries(selectedSubmission.submissionData).map(([section, data], idx) => (
                            <div key={idx} className="bg-[#141613] rounded-xl p-4 border border-[#2A2E2A]">
                                <h3 className="text-sm font-bold text-[#9ECB32] uppercase tracking-wider mb-3 pb-2 border-b border-[#2A2E2A]">
                                    {section.replace(/_/g, ' ')}
                                </h3>
                                <div className="space-y-3">
                                    {typeof data === 'object' && data !== null ? (
                                        Object.entries(data).map(([key, value], i) => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-[#545C68] uppercase">{key.replace(/_/g, ' ')}</span>
                                                <span className="text-sm text-white">
                                                    {Array.isArray(value) ? value.join(", ") : String(value || "N/A")}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-white">{String(data)}</div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <FileText size={48} className="text-[#2A2E2A] mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">No structured submission data found.</p>
                            <p className="text-xs text-gray-600 mt-2 font-mono break-all">{JSON.stringify(selectedSubmission.rawSubmission)}</p>
                        </div>
                    )}
                </div>
                
                <div className="p-6 border-t border-[#1F2227] bg-[#141613]">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-3 bg-[#1F2227] hover:bg-[#2A2E2A] text-white rounded-xl font-bold text-sm transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
