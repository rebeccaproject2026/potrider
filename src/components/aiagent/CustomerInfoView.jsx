import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * Customer Information View - Shows customer details, map, orders summary, and additional info
 */
const CustomerInfoView = ({ profile, mapEmbedUrl, onViewFullProfile, openOrderHisorty }) => {
  const [ordersOpen, setOrdersOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(true);

  return (
    <div className="p-2 bg-white">
      <div className="flex gap-3 mb-1">
        <div className="w-16 h-16 rounded-sm bg-gray-200 border border-[#ACACAC] shrink-0 overflow-hidden flex items-center justify-center">
          {profile.avatar ? (
            <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 font-semibold text-xl">{profile.name?.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-[17px] text-black truncate mt-1.5">{profile?.name || "profile"}</h2>
          <p className="text-[13px] text-gray-700 font-semibold mt-1">{profile.phone}</p>
          <p className="text-[13px] font-medium text-[#434343] mt-0.5">Last Active {profile.lastActive}</p>
        </div>
      </div>
      <p className="font-semibold text-[#212121] text-base mb-1">{profile.location}</p>
      <p className="text-sm mb-1.5 text-[#434343]">{profile.localTime}</p>

      {/* Map */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <iframe
          title="Customer location"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 rounded-sm"
        />
      </div>

      {/* Orders History (collapsible) */}
      <div className="border border-gray-200 mt-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-sm">
        <button
          type="button"
          onClick={() => setOrdersOpen(!ordersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left border-b border-[#D3D3D3]"
        >
          <span className="font-semibold text-[#212121] text-lg">Orders History</span>
          {ordersOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
        </button>
        {ordersOpen && profile.ordersHistory && (
          <div className="px-4 pb-2 pt-1 space-y-1 text-[15px] text-[#4a4a4a]">
            <p className="leading-relaxed"><span className="font-semibold">Total Orders:</span> <strong className="font-bold text-[#000]">{profile.ordersHistory.totalOrders}</strong></p>
            <p className="leading-relaxed"><span className="font-semibold">Total Spending on Order:</span> <strong className="font-bold text-[#000]">{profile.ordersHistory.totalSpending}</strong></p>
            <p className="leading-relaxed cursor-pointer" onClick={openOrderHisorty}><span className="font-semibold">Last Order on:</span> <strong className="font-bold text-sm underline text-[#000]">{profile.ordersHistory.lastOrderOn}</strong></p>
            <p className="leading-relaxed"><span className="font-semibold">Last Order Qty:</span> <strong className="font-bold text-[#000]">{profile.ordersHistory.lastOrderQty}</strong></p>
            <p className="leading-relaxed"><span className="font-semibold">Last Order Amount:</span> <strong className="font-bold text-[#000]">{profile.ordersHistory.lastOrderAmount}</strong></p>
          </div>
        )}
      </div>

      {/* Additional Info (collapsible) */}
      <div className="border border-gray-200 mt-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-sm">
        <button
          type="button"
          onClick={() => setAdditionalOpen(!additionalOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left border-b border-[#D3D3D3]"
        >
          <span className="font-bold text-[#212121] text-base">Additional Info</span>
          {additionalOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
        </button>
        {additionalOpen && profile.additionalInfo && (
          <div className="px-4 pb-4 pt-1 space-y-2 text-[15px] text-[#4a4a4a]">
            <p className="leading-relaxed"><span className="font-semibold">Chat duration:</span> <strong className="font-bold text-[#000]">{profile.additionalInfo.chatDuration}</strong></p>
            <p className="leading-relaxed"><span className="font-semibold">Email:</span> <strong className="font-bold text-[#000]">{profile.additionalInfo.email}</strong></p>
            <p className="leading-relaxed"><span className="font-semibold">Last seen:</span> <strong className="font-bold text-[#000]">{profile.additionalInfo.lastSeen}</strong></p>
          </div>
        )}
      </div>

      {/* View Full Profile */}
      <button
        type="button"
        onClick={() => onViewFullProfile?.()}
        className="w-full py-2.5 mt-1.5 rounded-sm bg-[var(--color-primary)] text-white font-semibold text-base hover:bg-green-700 transition-colors shadow-sm"
      >
        View Full Profile
      </button>
    </div>
  );
};

export default CustomerInfoView;
