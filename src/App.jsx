import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "./hooks/useAuthToken";
import Navbar from "./components/Navbar";
import { AlertTriangle, Shirt, X } from "lucide-react"; // Import Icons

// Public & User Pages
import Landing from "./pages/landing";
import RegisterSelection from "./pages/register-selection";
import Register from "./pages/register";
import SignIn from "./pages/signin";
import OtpVerification from "./pages/otp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SubmitReport from "./pages/submit-report";
import Leaderboard from "./pages/leaderboard";
import UserDashboard from "./pages/User/userDashboard";
import InviteMembers from "./pages/User/InviteMembers";
import MembersList from "./pages/User/MembersList";
import TShirtSimulator from "./pages/User/TShirtSimulator";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import About from "./pages/about";
import Highlights from "./pages/highlights";
import Program from "./pages/program";
import Contact from "./pages/contact";

// Admin Imports
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminEvents from "./pages/Admin/Events";
import LiveAttendance from "./pages/Admin/LiveAttendance";
import EventAttendanceDetails from "./pages/Admin/EventAttendanceDetails";
import Certificates from "./pages/Admin/Certificates";
import SouvenirManagement from "./pages/Admin/SouvenirManagement";
import Communication from "./pages/Admin/Communication";
import PaymentManagement from "./pages/Admin/Payment";
import ReportsManagement from "./pages/Admin/Reports";
import ProgramVenue from "./pages/Admin/ProgramVenue";
import Venue from "./pages/Admin/Venue";
import Integration from "./pages/Admin/Integration";
import Audit from "./pages/Admin/Audit";
import Teams from "./pages/Admin/Teams";
import Settings from "./pages/Admin/Settings";
import Security from "./pages/Admin/Security";
import Help from "./pages/Admin/Help";
import AccountSettings from "./pages/Admin/AccountSettings";

import AdminSignIn from "./pages/AdminSignIn";
import AdminOtp from "./pages/AdminOtp";

// subadmin imports
import SubadminLayout from "./components/subadmin/SubadminLayout";
import SubadminHome from "./pages/subadmin/SubadminHome";

import DebugOverlay from "./components/DebugOverlay";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// Global Notification Component
const TShirtNotificationBanner = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only check if user is logged in
    const token = getAuthToken();
    if (!token) {
      setVisible(false);
      return;
    }

    // Check if on the T-Shirt page itself (don't show banner there)
    if (location.pathname === "/shirt") {
      setVisible(false);
      return;
    }

    // Check local storage status
    const hasOrdered = localStorage.getItem("tshirt_ordered");
    setVisible(hasOrdered !== "true");
  }, [location]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-full max-w-sm animate-in slide-in-from-bottom-5 duration-500 sm:bottom-8 sm:right-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#0E1218] border border-[#9FC24D] p-5 shadow-[0_0_40px_rgba(159,194,77,0.15)]">
        {/* Background Accent */}
        <div className="absolute -right-6 -top-6 text-[#9FC24D]/10">
          <Shirt size={120} />
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-[#9FC24D]">
              <AlertTriangle size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Action Required
              </span>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-[#5E667B] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <h4 className="font-bold text-white">Claim Your Event Kit</h4>
            <p className="mt-1 text-xs text-[#9CA3AF] leading-relaxed">
              Your official Defcomm gear is pending customization. Secure your
              size before inventory locks.
            </p>
          </div>

          <Link
            to="/shirt"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9FC24D] py-3 text-xs font-bold uppercase tracking-widest text-[#0B0F05] shadow-lg shadow-[#9FC24D]/20 transition-transform hover:scale-[1.02] hover:bg-[#B2D660]"
          >
            Customize Now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const location = useLocation();

  // Updated logic: Check for exact paths OR if path starts with /admin
  const isExactHiddenRoute = [
    "/register",
    "/register/create",
    "/signin",
    "/otp",
    "/bounty/broken-authentication",
    "/submit-report",
    "/dashboard",
    "/reports",
    "/leaderboard",
    "/shirt", // Added shirt page to hidden navbar list
    "/admin/signin",
    "/admin/otp",
    "/group/invite-members",
    "/group/members-list",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);

  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/signin";

  const isSubadminRoute = location.pathname.startsWith("/subadmin");

  const shouldHideNavbar =
    isExactHiddenRoute || isAdminRoute || isSubadminRoute;

  return (
    <div className="min-h-screen flex flex-col">
      <DebugOverlay />

      {/* Global Notification */}
      <TShirtNotificationBanner />

      {/* Conditionally render the Public Navbar */}
      {!shouldHideNavbar && <Navbar />}

      {/* Adjust margin-top based on whether Navbar is visible */}
      <main className={shouldHideNavbar ? "flex-1" : "flex-1 mt-16"}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/program" element={<Program />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterSelection />} />
          <Route path="/register/create" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* --- User Protected Routes --- */}
          <Route
            path="/submit-report"
            element={
              <ProtectedRoute>
                <SubmitReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shirt"
            element={
              <ProtectedRoute>
                <TShirtSimulator />
              </ProtectedRoute>
            }
          />

          <Route
            path="/group/invite-members"
            element={
              <ProtectedRoute>
                <InviteMembers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/group/members-list"
            element={
              <ProtectedRoute>
                <MembersList />
              </ProtectedRoute>
            }
          />

          {/* --- Admin Routes --- */}
          {/* This renders the AdminLayout (Sidebar + Header) */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Index maps to /admin and renders the Dashboard */}
            <Route index element={<AdminDashboard />} />

            {/* Map other admin sidebar links to the same dashboard 
              (or create specific pages for them later) 
            */}
            <Route path="events" element={<AdminEvents />} />
            <Route path="attendance" element={<LiveAttendance />} />
            <Route path="attendees" element={<EventAttendanceDetails />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="souvenirs" element={<SouvenirManagement />} />
            <Route path="comms" element={<Communication />} />
            <Route path="reports" element={<ReportsManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="program" element={<ProgramVenue />} />
            <Route path="venue/:id" element={<Venue />} />
            <Route path="integrations" element={<Integration />} />
            <Route path="logs" element={<Audit />} />
            <Route path="team" element={<Teams />} />
            <Route path="settings" element={<Settings />} />
            <Route path="security" element={<Security />} />
            <Route path="help" element={<Help />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
          {/* --- SubAdmin Routes --- */}

          <Route path="/subadmin" element={<SubadminLayout />}>
            <Route index element={<SubadminHome />} /> {/* /subadmin */}
            {/* <Route path="account" element={<Account />} />
  <Route path="notifications" element={<Notifications />} />
  <Route path="groups" element={<Groups />} />
  <Route path="forms" element={<Forms />} />
  <Route path="files" element={<Files />} />
  <Route path="profile" element={<Profile />} /> */}
          </Route>

          {/* --- Catch-all --- */}
          <Route path="*" element={<NotFound />} />
          <Route path="admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/otp" element={<AdminOtp />} />
        </Routes>
      </main>
    </div>
  );
}
