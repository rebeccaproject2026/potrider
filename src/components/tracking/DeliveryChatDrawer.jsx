import { Icon } from "@iconify/react";

// Assuming MOCK_ORDER needs to be passed or available.
// For now, mirroring how it was used inside the component or defining defaults.
// The component implementation inside DeliveryCard used MOCK_ORDER as a fallback.

const MOCK_CHAT_MESSAGES = [
    {
        id: "1",
        from: "user",
        text: "Hi, can you confirm if my order is in progress?",
        time: "10:21 pm",
    },
    {
        id: "2",
        from: "driver",
        text: "Hello! Your package is on its way and will reach you soon. Estimated delivery time: 30 minutes.",
        time: "10:22 pm",
    },
    {
        id: "3",
        from: "user",
        text: "Thank you for the update. Looking forward to receiving my package.",
        time: "09:46 AM",
    },
];

/**
 * Chat popup – opens when user clicks Chat on a delivery card.
 * Full-height sidebar layout.
 */
const DeliveryChatDrawer = ({
    open,
    onClose,
    driverName,
    avatar,
    isOnline,
    eta,
    status,
    address,
    // Props for order details, with defaults if not provided
    orderQuantity = 13,
    orderAmount = 1325.26,
    paymentMethod = "Cash on Delivery",
    orderType = "Same Day",
    style = {}, // Allow style overrides (e.g., for positioning)
    hideBackdrop = false, // Allow hiding backdrop
}) => {
    // if (!open) return null; // Remove conditional return to allow animation

    // Status-based styles
    const getStatusColor = (s) => {
        if (s === "Delivered") return "text-[#109F22]";
        if (s === "Cancelled") return "text-[#F44336]";
        if (s === "In-progress") return "text-[#FF9800]";
        return "text-[#0066FF]";
    };

    const getProgressBarWidth = (s) => {
        if (s === "Delivered") return "w-full bg-[#109F22]";
        if (s === "Cancelled") return "w-full bg-[#F44336]";
        if (s === "In-progress") return "w-2/3 bg-[#FF9800]";
        return "w-1/3 bg-[#0066FF]";
    };

    const statusColor = getStatusColor(status);
    const progressBarClass = getProgressBarWidth(status);

    return (
        <>
            {!hideBackdrop && (
                <div
                    className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    onClick={onClose}
                    aria-hidden
                />
            )}
            <div
                className={`fixed right-0 top-0 h-full w-[400px] bg-[#F5F5F5] shadow-2xl flex flex-col z-50 border-l border-gray-200 font-sans transition-transform duration-300 transform ${open ? "translate-x-0" : "translate-x-full"}`}
                style={style} // Apply style overrides here
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Fixed */}
                <div className="bg-[#0066FF] text-white px-5 py-4 shrink-0 flex items-center justify-between shadow-md z-20">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt={driverName}
                                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                            ) : (
                                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shadow-sm">
                                    {driverName ? driverName.charAt(0) : "D"}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">
                                {driverName || "Driver Name"}
                            </h3>
                            <p className="text-sm text-blue-100 font-medium">
                                {isOnline ? "Online" : "Offline"}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                        title="Close"
                    >
                        <Icon icon="mdi:arrow-right" className="w-7 h-7 text-white" />
                    </button>
                </div>

                {/* Fixed Status & Order Details Wrapper */}
                <div className="shrink-0 z-10 border-b border-gray-300">
                    {/* Status Bar */}
                    <div className="px-5 py-3 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1.5">
                            <p className="text-sm font-semibold text-gray-700">
                                ETA: <span className="text-gray-900">{eta}</span>
                            </p>
                            <span className={`text-sm font-bold ${statusColor}`}>
                                {status}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
                            <div className={`h-full rounded-full ${progressBarClass}`} />
                        </div>
                        <p className="text-xs text-gray-500 truncate">{address}</p>
                    </div>

                    {/* Order Details Grid */}
                    <div className="px-5 py-2">
                        <div className="grid grid-cols-2 gap-2.5">
                            <div className="bg-white p-2.5 rounded-sm  border border-gray-100">
                                <p className="text-[14px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">
                                    Order Quantity
                                </p>
                                <p className="text-sm font-bold text-[#1e1e1e] mt-1 truncate">
                                    {orderQuantity} Items
                                </p>
                            </div>
                            <div className="bg-white p-2.5 rounded-sm  border border-gray-100">
                                <p className="text-[14px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">
                                    Order Amount
                                </p>
                                <p className="text-sm font-bold text-[#1e1e1e] mt-1 truncate">
                                    ${Number(orderAmount).toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-white p-2.5 rounded-sm  border border-gray-100">
                                <p className="text-[14px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">
                                    Payment Method
                                </p>
                                <p className="text-sm font-bold text-[#1e1e1e] mt-1 truncate">
                                    {paymentMethod}
                                </p>
                            </div>
                            <div className="bg-white p-2.5 rounded-sm  border border-gray-100">
                                <p className="text-[14px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">
                                    Order Type
                                </p>
                                <p className="text-sm font-bold text-[#1e1e1e] mt-1 truncate">
                                    {orderType}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Chat Content - Only this part scrolls */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 ">
                    {MOCK_CHAT_MESSAGES.map((msg) => {
                        const isUser = msg.from === "user";
                        return (
                            <div
                                key={msg.id}
                                className={`flex w-full ${isUser ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 shadow-sm text-sm leading-relaxed ${isUser
                                        ? "bg-[#0066FF] text-white rounded-2xl rounded-br-sm"
                                        : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100"
                                        }`}
                                >
                                    <p>{msg.text}</p>
                                    <p
                                        className={`text-[10px] mt-1 text-right font-medium ${isUser ? "text-blue-100" : "text-gray-400"
                                            }`}
                                    >
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input Footer - Fixed */}
                <div className="bg-white px-4 py-3 border-t border-gray-200 shrink-0 z-20">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 transition p-1.5 hover:bg-gray-100 rounded-full"
                        >
                            <Icon icon="mdi:emoticon-happy-outline" className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 transition p-1.5 hover:bg-gray-100 rounded-full"
                        >
                            <Icon icon="mdi:paperclip" className="w-6 h-6" />
                        </button>

                        <div className="flex-1 text-right">
                            <input
                                type="text"
                                placeholder="Message"
                                className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>

                        <button
                            type="button"
                            className="text-[#0066FF] hover:text-blue-700 transition p-1.5 hover:bg-blue-50 rounded-full"
                        >
                            <Icon icon="mdi:send" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeliveryChatDrawer;
