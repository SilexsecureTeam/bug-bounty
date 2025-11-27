// File: src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashIcon from '../../assets/images/dashIcon.png';
import reportIcon from '../../assets/images/reportIcon.png';
import submitIcon from '../../assets/images/submitIcon.png';
import paymentIcon from '../../assets/images/paymentIcon.png';
import { getUser, clearAuthToken } from "../../hooks/useAuthToken";

const navItems = [
    {
        icon: dashIcon,
        item: "My Dashboard",
        path: "/dashboard"
    },
    {
        icon: paymentIcon,
        item: "Payments",
        path: "/payments"
    },
    {
        icon: reportIcon,
        item: "Reports",
        path: "/reports"
    },
    {
        icon: submitIcon,
        item: "Submit Report",
        path: "/submit-report"
    }
];

export default function Sidebar({ open, onClose }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    const handleSignOut = () => {
        clearAuthToken();
        navigate("/signin");
    };

    // Calculate initials
    const initials = user 
        ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() 
        : "CS";

    // Calculate full name
    const fullName = user 
        ? `${user.firstName || ""} ${user.lastName || ""}` 
        : "Chike Samuel";

    return (
        <aside
            className={`fixed inset-y-0 top-20 left-0 z-30 w-64 transform bg-[#0b0f12] border-r border-[#111316] px-4 py-6 transition-transform duration-200 ease-in-out sm:static sm:translate-x-0 ${
                open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-[#101418] flex items-center justify-center text-white font-bold">
                        {initials}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white">{fullName}</div>
                    </div>
                </div>
                <button onClick={onClose} className="sm:hidden text-[#9aa4b0]">✕</button>
            </div>

            <nav className="mt-8 space-y-1">
                {navItems.map((nav, index) => {
                    // Check if current path matches the nav item path
                    const isActive = location.pathname === nav.path;
                    
                    return (
                        <Link
                            key={index}
                            to={nav.path}
                            onClick={onClose} // Close sidebar on mobile when link is clicked
                            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-left transition-colors duration-150 ${
                                isActive
                                    ? "bg-[#172018] text-[#cfe292]"
                                    : "text-[#b9c0cc] hover:bg-[#0f1418]"
                            }`}
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#0f1418] text-xs">
                                <img src={nav.icon} alt={`${nav.item} icon`} className="w-4 h-4" />
                            </span>
                            {nav.item}
                        </Link>
                    );
                })}
            </nav>

            <div className="mb-0! mt-[23vh] border-t border-[#111316] pt-6">
                <div className="flex items-center gap-3 px-4">
                    <div className="h-9 w-9 rounded-full bg-linear-to-br from-[#4b2d9a] to-[#ff6fa0] flex items-center justify-center text-sm font-semibold text-white">
                        {initials}
                    </div>

                    <div className="hidden sm:block text-right">
                        <div className="text-sm font-medium text-white">{fullName}</div>
                        <div className="text-xs text-[#9ba0ad]">Account settings</div>
                    </div>
                </div>

                <button 
                    onClick={handleSignOut}
                    className="mt-3 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-left text-[#b9c0cc] hover:bg-[#0f1418]"
                >
                    <span className="h-8 w-8 flex items-center justify-center rounded-md bg-[#0f1418]">⤓</span>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
