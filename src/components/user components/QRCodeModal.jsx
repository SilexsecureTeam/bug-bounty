// File: src/components/user components/QRCodeModal.jsx
import React, { useRef } from "react";
import { X, Download } from "lucide-react";
import QRCode from "react-qr-code"; 

export default function QRCodeModal({ isOpen, onClose, userId, encryptId, formId, userName }) {
  const svgRef = useRef(null);

  if (!isOpen) return null;

  // Use encryptId if available, otherwise fallback to userId (safe fallback)
  const qrUserId = encryptId || userId;

  // Function to download the QR Code
  const downloadQRCode = () => {
    const svg = document.getElementById("user-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Add margin and white background for better scanability when downloaded
    const size = 256;
    const padding = 20;
    
    img.onload = () => {
      canvas.width = size + (padding * 2);
      canvas.height = size + (padding * 2);
      
      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw image centered
      ctx.drawImage(img, padding, padding, size, size);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${userName.replace(/\s+/g, '_')}_EventPass.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    // Convert SVG to base64 for image source
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl border border-[#1B1F2A] bg-[#0E131D] p-8 shadow-[0_0_50px_rgba(149,213,73,0.1)] scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full bg-[#1A2334] text-gray-400 hover:text-white hover:bg-[#232D42] transition-all"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-white tracking-tight">Event Pass</h3>
            <p className="text-xs text-[#7F8698]">Scan this code at the venue entrance</p>
          </div>

          {/* QR Container - White background is crucial for QR contrast */}
          <div className="p-5 bg-white rounded-2xl shadow-inner">
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
              <QRCode
                id="user-qr-code"
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify({
                  userId: qrUserId,
                  id: formId,
                  name: userName
                })}
                viewBox={`0 0 256 256`}
                level="H" 
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </div>
          </div>

          <div className="text-center space-y-1">
             <p className="text-lg font-semibold text-white">{userName}</p>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2334] border border-[#2A303C]">
                <span className="w-2 h-2 rounded-full bg-[#9FC24D] animate-pulse"></span>
                <p className="text-[10px] font-mono text-[#9BA2B0] uppercase tracking-wider">
                    ID: {userId} {/* Keeping visual ID short/readable from user object */}
                </p>
             </div>
          </div>

          <button
            onClick={downloadQRCode}
            className="flex items-center gap-2 rounded-full bg-[#9FC24D] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#0B0F05] hover:bg-[#B2D660] transition-colors w-full justify-center shadow-[0_10px_20px_rgba(159,194,77,0.2)]"
          >
            <Download size={16} />
            Download Pass
          </button>
        </div>
      </div>
    </div>
  );
}