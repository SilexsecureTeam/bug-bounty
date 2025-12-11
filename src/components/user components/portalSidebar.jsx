// File: src/components/user components/portalSidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashIcon from '../../assets/images/dashIcon.png';
import reportIcon from '../../assets/images/reportIcon.png';
import submitIcon from '../../assets/images/submitIcon.png';
import paymentIcon from '../../assets/images/paymentIcon.png';
import { getUser, clearAuthToken } from "../../hooks/useAuthToken";
import { fetchUserProfileEvent } from "../../api"; 
import QRCodeModal from "./QRCodeModal"; // Import the new modal

// The fixed form ID for the QR code
const FIXED_FORM_ID = "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

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
    const [encryptId, setEncryptId] = useState(null); // State for encrypt_id
    const [showQR, setShowQR] = useState(false); // State for QR Modal
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadUserData = async () => {
            // Load local user first for immediate UI
            const localUser = getUser();
            setUser(localUser);

            try {
                // Fetch fresh profile data to get encrypt_id
                const response = await fetchUserProfileEvent();
                if (response && response.data) {
                    setUser(response.data);
                    setEncryptId(response.data.encrypt_id);
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };

        loadUserData();
    }, []);

    const handleSignOut = () => {
        clearAuthToken();
        navigate("/signin");
    };

    const initials = user 
        ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() 
        : "CS";

    const fullName = user 
        ? `${user.firstName || ""} ${user.lastName || ""}` 
        : "Chike Samuel";

    return (
        <>
            <aside
                className={`fixed! inset-y-0 top-20 left-0 z-30 w-64 transform bg-[#0b0f12] border-r border-[#111316] px-4 py-6 transition-transform duration-200 ease-in-out sm:static sm:translate-x-0 ${
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
                        const isActive = location.pathname === nav.path;
                        return (
                            <Link
                                key={index}
                                to={nav.path}
                                onClick={onClose}
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

                <div className="mb-0 mt-[23vh] border-t border-[#111316] pt-6">
                    {/* Account Settings / User Profile Area - Clickable for QR */}
                    <div 
                        className="flex items-center gap-3 px-4 cursor-pointer hover:bg-[#101418] p-2 rounded-lg transition-colors group"
                        onClick={() => setShowQR(true)}
                        title="Click to show Event Pass"
                    >
                        <div className="h-9 w-9 rounded-full bg-linear-to-br from-[#4b2d9a] to-[#ff6fa0] flex items-center justify-center text-sm font-semibold text-white group-hover:scale-105 transition-transform">
                            {initials}
                        </div>

                        <div className="hidden sm:block text-right">
                            <div className="text-sm font-medium text-white">{fullName}</div>
                            <div className="text-xs text-[#9ba0ad] group-hover:text-[#9fc24d] transition-colors">Account settings</div>
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

            {/* QR Code Modal */}
            <QRCodeModal 
                isOpen={showQR} 
                onClose={() => setShowQR(false)} 
                userId={user?.id || "guest"} 
                encryptId={encryptId} // Pass the fetched encrypt_id
                formId={FIXED_FORM_ID} // Pass the fixed form_id
                userName={fullName}
            />
        </>
    );
}
