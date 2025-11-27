// File: src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import dashIcon from '../../assets/images/dashIcon.png';
import reportIcon from '../../assets/images/reportIcon.png';
import submitIcon from '../../assets/images/submitIcon.png';
import paymentIcon from '../../assets/images/paymentIcon.png';
import { getUser, clearAuthToken } from "../../hooks/useAuthToken";
import { useNavigate } from "react-router-dom"; // Assuming react-router is used

const navItems = [
    {
        icon: dashIcon,
        item: "My Dashboard",
    },
    {
        icon: paymentIcon,
        item: "Payments",
    },
    {
        icon: reportIcon,
        item: "Reports",
    },
    {
        icon: submitIcon,
        item: "Submit Report",
    }
];

export default function Sidebar({ open, onClose, active, setActive }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    const handleSignOut = () => {
        clearAuthToken();
        // Redirect to login or home page after sign out
        navigate("/signin"); 
    };

    // Calculate initials or fallback
    const initials = user 
        ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() 
        : "CS";

    const fullName = user 
        ? `${user.firstName || ""} ${user.lastName || ""}` 
        : "Chike Samuel"; // Fallback/Placeholder if data loads slowly

    return (
        <aside
            className={`fixed! inset-y-0 top-20 left-0 z-30 w-64 transform bg-[#0b0f12] border-r border-[#111316] px-4 py-6 transition-transform duration-200 ease-in-out sm:static sm:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-[#101418] flex items-center justify-center text-white font-bold">
                        {initials}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white">{fullName}</div>
                        {/* <div className="text-xs text-[#8f97a3]">@{user?.username || 'user'}</div> */}
                    </div>
                </div>
                <button onClick={onClose} className="sm:hidden text-[#9aa4b0]">✕</button>
            </div>

            <nav className="mt-8 space-y-0">
                {navItems.map((nav, index) => (
                    <button
                        key={index}
                        onClick={() => setActive(nav.item)}
                        className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-left transition-colors duration-150 ${active === nav.item
                                ? "bg-[#172018] text-[#cfe292]"
                                : "text-[#b9c0cc] hover:bg-[#0f1418]"
                            }`}
                    >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#0f1418] text-xs">
                            <img src={nav.icon} alt={`${nav.item} icon`} className="w-4 h-4" />
                        </span>
                        {nav.item}
                    </button>
                ))}
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
