import { useState } from "react";
import { Info, RefreshCw, List, BookText } from "lucide-react";
import avtar from "../../assets/images/self-portrait-beautiful-chinese-girl2.png";
import CustomerInfoView from "./CustomerInfoView";
import OrderHistoryView from "./OrderHistoryView";
import AIKnowledgeBaseView from "./AIKnowledgeBaseView";

/**
 * Right sidebar: customer header, action icons, location, map, Orders History (collapsible), Additional Info (collapsible), View Full Profile.
 */
const CustomerDetailsPanel = ({ customer, onViewFullProfile }) => {
  const [viewMode, setViewMode] = useState('info'); // 'info', 'orders', or 'ai'

  const profile = customer || {
    name: "Jan Doe",
    phone: "+1 123 456 7890",
    lastActive: "20m",
    avatar: avtar,
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
    <div className="flex rounded-sm overflow-hidden bg-white min-w-0 w-full max-w-[400px] shrink-0 shadow-sm">
      {/* Narrow left column: icon buttons stacked */}
      <div className="flex flex-col gap-2 p-2 border-r border-gray-200 shrink-0 bg-white">
        <button
          type="button"
          className={`w-10 h-10 rounded-sm ${viewMode === 'info' ? 'bg-[var(--color-primary)]' : 'bg-white border border-gray-300'} cursor-pointer text-white flex items-center justify-center  transition-colors`}
          title="Information"
          onClick={() => setViewMode('info')}
        >
          <i
            className={`fi fi-rr-info ${viewMode === "info" ? "text-white" : "text-gray-700"
              }`}
          ></i>

        </button>
        <button
          type="button"
          className={`w-10 h-10 rounded-sm ${viewMode === 'orders' ? 'bg-[var(--color-primary)]' : 'bg-white border border-gray-300'} flex items-center cursor-pointer justify-center transition-colors`}
          title="Order History"
          onClick={() => setViewMode('orders')}
        >
          <i
            className={`fi fi-rr-time-past ${viewMode === "orders" ? "text-white" : "text-black"
              }`}
          ></i>

        </button>
        <button
          type="button"
          className={`w-10 h-10 rounded-sm ${viewMode === 'ai' ? 'bg-[var(--color-primary)]' : 'bg-white border border-gray-300'} flex items-center cursor-pointer justify-center transition-colors`}
          title="AI Knowledge Base"
          onClick={() => setViewMode('ai')}
        >
          <BookText size={20} className={`${viewMode === "ai" ? "text-white" : "text-gray-700"
            }`} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {viewMode === 'info' ? (
          <CustomerInfoView
            profile={profile}
            mapEmbedUrl={mapEmbedUrl}
            onViewFullProfile={() => onViewFullProfile?.(customer)}
            openOrderHisorty={() => setViewMode('orders')}
          />
        ) : viewMode === 'orders' ? (
          <OrderHistoryView />
        ) : (
          <AIKnowledgeBaseView />
        )}
      </div>
    </div >
  );
};

export default CustomerDetailsPanel;
