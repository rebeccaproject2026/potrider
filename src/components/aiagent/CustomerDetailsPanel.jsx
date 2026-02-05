import { useState } from "react";
import { Info, RefreshCw, List, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";

/**
 * Right sidebar: customer header, action icons, location, map, Orders History (collapsible), Additional Info (collapsible), View Full Profile.
 */
const CustomerDetailsPanel = ({ customer, onViewFullProfile }) => {
  const [ordersOpen, setOrdersOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(true);

  const profile = customer || {
    name: "Jan Doe",
    phone: "+1 123 456 7890",
    lastActive: "20m",
    avatar: null,
    location: "Las Vegas, Nevada, United States",
    localTime: "06:16 pm local time",
    ordersHistory: {
      totalOrders: "136",
      totalSpending: "$1099.99",
      lastOrderOn: "31 July, 2025 - 05:46 PM",
      lastOrderQty: "12 Items",
      lastOrderAmount: "$199.99",
    },
    additionalInfo: {
      chatDuration: "15m 37s",
      email: "janedoe2020@gmail.com",
      lastSeen: "Today",
    },
  };

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51552.0788!2d-115.1767!3d36.1146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8d3e57b38f81d%3A0x1!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1234567890";

  return (
    <div className="flex h-full bg-white border-l border-gray-200 min-w-0 w-full max-w-[380px] overflow-hidden">
      {/* Narrow left column: icon buttons stacked */}
      <div className="flex flex-col gap-2 p-2 border-r border-gray-200 shrink-0 bg-white">
        <button
          type="button"
          className="w-10 h-10 rounded-lg bg-(--color-primary) text-white flex items-center justify-center hover:opacity-90"
          title="Information"
        >
          <Info className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
          title="List"
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Customer header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0 overflow-hidden flex items-center justify-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 font-semibold">{profile.name?.charAt(0)}</span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[#212121] text-base truncate">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.phone}</p>
              <p className="text-xs text-gray-500">Last Active {profile.lastActive}</p>
            </div>
          </div>
          <p className="font-semibold text-[#212121] text-sm">{profile.location}</p>
          <p className="text-xs text-gray-500">{profile.localTime}</p>
        </div>

        {/* Map */}
        <div className="relative border-b border-gray-200">
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
            className="absolute inset-0"
          />
        </div>
        <div className="absolute bottom-2 left-2 right-2 bg-white rounded shadow-md p-2 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[#212121] text-sm">Arizona Charlies Decatur</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-secondary) text-xs flex items-center gap-1 hover:underline"
            >
              View larger map
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex flex-col gap-0.5">
            <button type="button" className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 text-lg leading-none">+</button>
            <button type="button" className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 text-lg leading-none">−</button>
          </div>
        </div>
        </div>

        {/* Orders History (collapsible) */}
        <div className="border-b border-gray-200">
        <button
          type="button"
          onClick={() => setOrdersOpen(!ordersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-left"
        >
          <span className="font-bold text-[#212121] text-sm">Orders History</span>
          {ordersOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {ordersOpen && profile.ordersHistory && (
          <div className="px-4 pb-4 pt-0 space-y-1.5 text-sm text-[#212121]">
            <p>Total Orders: <strong className="underline">{profile.ordersHistory.totalOrders}</strong></p>
            <p>Total Spending on Order: <strong>{profile.ordersHistory.totalSpending}</strong></p>
            <p>Last Order on: <strong className="underline">{profile.ordersHistory.lastOrderOn}</strong></p>
            <p>Last Order Qty: <strong>{profile.ordersHistory.lastOrderQty}</strong></p>
            <p>Last Order Amount: <strong>{profile.ordersHistory.lastOrderAmount}</strong></p>
          </div>
        )}
        </div>

        {/* Additional Info (collapsible) */}
        <div className="border-b border-gray-200">
        <button
          type="button"
          onClick={() => setAdditionalOpen(!additionalOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-left"
        >
          <span className="font-bold text-[#212121] text-sm">Additional Info</span>
          {additionalOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {additionalOpen && profile.additionalInfo && (
          <div className="px-4 pb-4 pt-0 space-y-1.5 text-sm text-[#212121]">
            <p>Chat duration: <strong>{profile.additionalInfo.chatDuration}</strong></p>
            <p>Email: <strong className="underline">{profile.additionalInfo.email}</strong></p>
            <p>Last seen: <strong>{profile.additionalInfo.lastSeen}</strong></p>
          </div>
        )}
        </div>

        {/* View Full Profile */}
        <div className="p-4 mt-auto">
          <button
            type="button"
            onClick={() => onViewFullProfile?.(customer)}
            className="w-full py-3 rounded-lg bg-(--color-primary) text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPanel;
