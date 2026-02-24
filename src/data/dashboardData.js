// src/data/dashboardData.js
import { 
  LayoutDashboard, CalendarDays, UserCheck, Users, FileCheck, Gift, 
  MessageSquare, BarChart3, CreditCard, Layers, Settings, ShieldAlert,
  HelpCircle, UserCog, LogOut
} from "lucide-react";

import sponsor1 from '../assets/images/sponsor1.png'; // Use your actual image paths
import sponsor2 from '../assets/images/sponsor2.png';

export const sidebarMenu = [
  {
    category: "MAIN",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/admin", active: true },
      { name: "Events", icon: CalendarDays, path: "/admin/events" },
      { name: "Live Attendance", icon: UserCheck, path: "/admin/attendance" },
      { name: "Attendees", icon: Users, path: "/admin/attendees" },
      { name: "Certificates", icon: FileCheck, path: "/admin/certificates" },
      { name: "Souvenirs", icon: Gift, path: "/admin/souvenirs" },
      { name: "Communications", icon: MessageSquare, path: "/admin/comms" },
      { name: "Reports & Exports", icon: BarChart3, path: "/admin/reports" },
    ]
  },
  {
    category: "EVENT MANAGEMENT",
    items: [
      { name: "Payments & Orders", icon: CreditCard, path: "/admin/payments" },
      { name: "Program & Venue", icon: Layers, path: "/admin/program" },
      { name: "Integrations", icon: Settings, path: "/admin/integrations" },
    ]
  },
  {
    category: "ADMINISTRATION (SUPER ADMIN)",
    items: [
      { name: "Audit Logs", icon: ShieldAlert, path: "/admin/logs" },
      { name: "Team & Roles", icon: Users, path: "/admin/team" },
      { name: "Platform Settings", icon: Settings, path: "/admin/settings" },
    ]
  },
  {
    category: "SUPPORT",
    items: [
      { name: "Security & Policies", icon: ShieldAlert, path: "/admin/security" },
      { name: "Help & Guides", icon: HelpCircle, path: "/admin/help" },
      { name: "Account Settings", icon: UserCog, path: "/admin/account" },
    ]
  }
]; 

export const statsData = [
  { label: "Total Events", value: "50", change: "8.5% Up from 2024", icon: CalendarDays, trend: "up" },
  { label: "Active Events", value: "08", change: "Live Now", icon: Layers, trend: "neutral", highlight: true },
  { label: "Attendance", value: "08", change: "25% vs yesterday", icon: UserCheck, trend: "up" },
  { label: "Certificates Issd.", value: "1,508", change: "98% Completion rate", icon: FileCheck, trend: "up" },
  { label: "Souvenirs", value: "1200", change: "Claimed 308 Remaining", icon: Gift, trend: "neutral", highlight: true },
];

export const chartData = [
  { name: 'Mon 8AM', value: 400 },
  { name: 'Mon 10AM', value: 600 },
  { name: 'Mon 12PM', value: 500 },
  { name: 'Mon 2PM', value: 1800 },
  { name: 'Mon 4PM', value: 2800 },
  { name: 'Mon 6PM', value: 3900 },
  { name: 'Mon 8PM', value: 3500 },
];

export const recentActivity = [
  { 
    title: "New Check-in", 
    desc: "Lt. Saheed checked in at a gate", 
    time: "JUST NOW", 
    type: "checkin" 
  },
  { 
    title: "Certificate Issued", 
    desc: "Auto-generated for 12 attendees", 
    time: "12 MINS AGO", 
    type: "certificate" 
  },
  { 
    title: "Souvenir Claimed", 
    desc: "Sandra Doris claimed 'Insulating Mug'", 
    time: "45 MINS AGO", 
    type: "souvenir" 
  },
  { 
    title: "System Check", 
    desc: "Lt. Automated diagnosis completed", 
    time: "5 HRS AGO", 
    type: "system" 
  },
];

export const upcomingEvents = [
  { title: "Cyber Threat Intelligence Bootcamp", date: "03 FEB 2025", image: sponsor1 },
  { title: "Released a new version.", date: "03 FEB 2025", image: sponsor1 }, // Placeholder images
  { title: "Cyber Threat Intelligence Bootcamp", date: "03 FEB 2025", image: sponsor1 },
  { title: "Released a new version.", date: "03 FEB 2025", image: sponsor1 },
];

export const organizers = [
  { name: "Rheinmetall Defence", role: "Defence tech & vehicle systems", img: sponsor1 },
  { name: "CyberSecure Inc", role: "Military electronics & security solutions", img: sponsor2 },
  { name: "Thales Group", role: "Aerospace, defence & security solutions", img: sponsor1 },
  { name: "DroneTech Solutions", role: "UAV demonstrations", img: sponsor2 },
];
