import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/landing";
import RegisterSelection from "./pages/register-selection";
import Register from "./pages/register";
import SignIn from "./pages/signin";
import OtpVerification from "./pages/otp";
// import BountyDetails from "./pages/bounty-details";
import SubmitReport from "./pages/submit-report";
// import Leaderboard from "./pages/leaderboard";
import UserDashboard from "./pages/User/userDashboard";
// import Reports from "./pages/Reports";

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
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? "flex-1" : "flex-1 mt-16"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterSelection />} />
          <Route path="/register/create" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp" element={<OtpVerification />} />
          {/* <Route path="/bounty/broken-authentication" element={<BountyDetails />} /> */}
          <Route path="/submit-report" element={<SubmitReport />} />
          {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
        </Routes>
      </main>
    </div>
  );
}
