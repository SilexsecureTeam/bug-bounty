import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
// FIXED: Added missing icon imports (UserCheck, FileCheck, Gift, Settings, MessageSquare)
import { 
  ArrowUpRight, ArrowRight, MoreVertical, QrCode, Plus, Eye, 
  UserCheck, FileCheck, Gift, Settings, MessageSquare 
} from 'lucide-react';
import { 
  statsData, chartData, recentActivity, upcomingEvents, organizers 
} from '../../data/dashboardData'; 

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#060706] p-4 lg:p-8">
      
      {/* 1. TOP STATS ROW */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statsData.map((stat, index) => (
          <div key={index} className="flex flex-col justify-between rounded-3xl border border-[#1F2227] bg-[#0D0F10] p-5">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-[#9CA3AF]">{stat.label}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2227] bg-[#16181A]">
                <stat.icon className="h-5 w-5 text-[#9ECB32]" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className={`mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${stat.highlight ? "text-[#9ECB32]" : "text-[#48C57D]"}`}>
                 {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                 {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* CHART SECTION */}
          <div className="rounded-[32px] border border-[#1F2227] bg-[#0D0F10] p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">Attendance Overview <span className="text-sm text-[#545C68]">December 12</span></h2>
              <div className="flex items-center gap-2 rounded-lg bg-[#16181A] p-1">
                {['Today', 'Week', 'Month', 'Year'].map(tab => (
                  <button key={tab} className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${tab === 'Today' ? 'bg-[#9ECB32] text-black' : 'text-[#8D9197] hover:text-white'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9ECB32" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#9ECB32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#545C68', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#545C68', fontSize: 10}} />
                  <Tooltip contentStyle={{backgroundColor: '#16181A', border: 'none', borderRadius: '8px', color: '#fff'}} />
                  <Area type="monotone" dataKey="value" stroke="#9ECB32" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MIDDLE ROW: DEFCOMM CARD & STATUS */}
          <div className="rounded-[32px] border border-[#1F2227] bg-[#0D0F10] p-6">
             <div className="mb-6 flex items-center justify-between">
                <span className="rounded-md bg-[#E6E8D8] px-2 py-1 text-xs font-bold text-black">Defcomm 2025</span>
                <button className="flex items-center gap-2 text-xs text-[#9ECB32]">View dashboard <ArrowRight className="h-3 w-3" /></button>
             </div>
             
             <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
               <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#545C68]">Current Attendance</p>
                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-2xl font-bold text-white">5,521</span>
                    <span className="mb-1 rounded-sm bg-[#112316] px-1 text-[10px] text-[#48C57D]">+30/hr</span>
                  </div>
                  <div className="mt-2 h-1 w-full rounded-full bg-[#1F2227]"><div className="h-1 w-[70%] rounded-full bg-[#9ECB32]"></div></div>
                  <p className="mt-1 text-[10px] text-[#545C68]">70% capacity</p>
               </div>

               <div>
                 <p className="text-[10px] uppercase tracking-wider text-[#545C68]">Check-In Method</p>
                 <div className="mt-2 flex items-center gap-2">
                   <QrCode className="h-5 w-5 text-[#9ECB32]" />
                   <span className="font-semibold text-white">QR SCAN</span>
                 </div>
                 <p className="mt-1 text-[10px] text-[#545C68]">70% capacity</p>
               </div>

               <div className="border-l border-[#1F2227] pl-4">
                 <p className="text-[10px] uppercase tracking-wider text-[#545C68]">Status</p>
                 <div className="mt-2 space-y-2">
                   <div className="flex justify-between text-xs"><span className="text-white">Active - In</span> <span className="text-[#48C57D]">4000</span></div>
                   <div className="flex justify-between text-xs"><span className="text-white">Checked-Out</span> <span className="text-[#CC4D22]">1521</span></div>
                 </div>
               </div>
             </div>
          </div>

          {/* BOTTOM ROW: ORGANIZERS */}
          <div className="rounded-[32px] border border-[#1F2227] bg-[#0D0F10] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Organiser Activity Overview</h3>
              <span className="text-xs text-[#9ECB32] cursor-pointer">View All</span>
            </div>
            <div className="space-y-4">
              {organizers.map((org, i) => (
                 <div key={i} className={`flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-[#16181A] ${i === 1 ? 'bg-[#12140F] border border-[#242A1A]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <img src={org.img} alt={org.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{org.name}</h4>
                        <p className="text-xs text-[#545C68]">{org.role}</p>
                      </div>
                    </div>
                    {i === 1 && (
                      <div className="flex gap-3 text-[#9CA3AF]">
                        <MessageSquare className="h-4 w-4" />
                        <ArrowUpRight className="h-4 w-4" />
                        <MoreVertical className="h-4 w-4" />
                      </div>
                    )}
                 </div>
              ))}
            </div>

            {/* ACTION BUTTONS STRIP */}
            <div className="mt-6 flex flex-wrap gap-4">
               <button className="flex items-center gap-2 rounded-xl bg-[#3F550F] px-4 py-3 text-xs font-bold text-[#D7E4BB] border border-[#4D6B13]">
                  <Plus className="h-4 w-4" /> Create New Event
                  <span className="ml-2 block text-[9px] font-normal text-[#9ECB32] opacity-70">Create your event in minutes</span>
               </button>
               <button className="flex items-center gap-2 rounded-xl border border-[#1F2227] bg-[#0B0C0E] px-4 py-3 text-xs font-bold text-white hover:bg-[#16181A]">
                  <QrCode className="h-4 w-4" /> Generate QR Code
                  <span className="ml-2 block text-[9px] font-normal text-[#545C68]">Create your event in minutes</span>
               </button>
               <button className="flex items-center gap-2 rounded-xl border border-[#1F2227] bg-[#0B0C0E] px-4 py-3 text-xs font-bold text-white hover:bg-[#16181A]">
                  <Eye className="h-4 w-4" /> View Attendance
                  <span className="ml-2 block text-[9px] font-normal text-[#545C68]">Create your event in minutes</span>
               </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* RECENT ACTIVITY */}
          <div className="flex-1 rounded-[32px] border border-[#1F2227] bg-[#0D0F10] p-6">
             <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <span className="text-xs text-[#9ECB32]">View All</span>
             </div>
             
             <div className="relative space-y-8 pl-2">
                {/* Timeline Line */}
                <div className="absolute left-6 top-2 h-[85%] w-[1px] bg-[#1F2227]"></div>

                {recentActivity.map((item, i) => (
                  <div key={i} className="relative z-10 flex gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1F2227] bg-[#16181A] text-[#9ECB32]">
                       {item.type === 'checkin' && <UserCheck className="h-4 w-4" />}
                       {item.type === 'certificate' && <FileCheck className="h-4 w-4" />}
                       {item.type === 'souvenir' && <Gift className="h-4 w-4" />}
                       {item.type === 'system' && <Settings className="h-4 w-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#545C68]">{item.time}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="flex-1 rounded-[32px] border border-[#1F2227] bg-[#0D0F10] p-6">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                <span className="text-xs text-[#9ECB32]">View All</span>
             </div>
             <div className="space-y-6">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <img src={event.image} alt="Event" className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                       <h4 className="text-sm font-semibold text-white line-clamp-1">{event.title}</h4>
                       <p className="text-[10px] font-bold uppercase tracking-wider text-[#545C68]">DATE: {event.date}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
