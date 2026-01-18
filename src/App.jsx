import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { getAuthToken } from "./hooks/useAuthToken";
import Navbar from "./components/Navbar";

// Public & User Pages
import Landing from "./pages/landing";
import RegisterSelection from "./pages/register-selection";
import Register from "./pages/register";
import SignIn from "./pages/signin";
import OtpVerification from "./pages/otp";
import SubmitReport from "./pages/submit-report";
import Leaderboard from "./pages/leaderboard";
import UserDashboard from "./pages/User/userDashboard";
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

import DebugOverlay from "./components/DebugOverlay";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
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
  ].includes(location.pathname);

  const isAdminRoute = location.pathname.startsWith("/admin");

  const shouldHideNavbar = isExactHiddenRoute || isAdminRoute;

  return (
    <div className="min-h-screen flex flex-col">
      <DebugOverlay />
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
            <Route path="attendees" element={<AdminDashboard />} />
            <Route path="certificates" element={<AdminDashboard />} />
            <Route path="souvenirs" element={<AdminDashboard />} />
            <Route path="comms" element={<AdminDashboard />} />
            <Route path="reports" element={<AdminDashboard />} />
            <Route path="payments" element={<AdminDashboard />} />
            <Route path="program" element={<AdminDashboard />} />
            <Route path="integrations" element={<AdminDashboard />} />
            <Route path="logs" element={<AdminDashboard />} />
            <Route path="team" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
            <Route path="help" element={<AdminDashboard />} />
            <Route path="account" element={<AdminDashboard />} />
          </Route>

          {/* --- Catch-all --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
