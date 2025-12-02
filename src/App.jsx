import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import { getAuthToken } from "./hooks/useAuthToken";

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
  const hideNavbar = [
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

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? "flex-1" : "flex-1 mt-16"}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterSelection />} />
          <Route path="/register/create" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* Protected Routes */}
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

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}