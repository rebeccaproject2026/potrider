import { BookText, Paperclip, Send } from "lucide-react";
import { useState } from "react";

/**
 * AI Knowledge Base View - Shows AI assistant chat interface
 */
const AIKnowledgeBaseView = () => {
  const [message, setMessage] = useState("");

  // Static AI conversation data
  const aiMessages = [
    {
      type: "ai",
      text: "Hello! I'm your personal AI Assistant ChatMail.",
      time: "10:25"
    },
    {
      type: "user",
      text: "Update your knowledge for all orders and customers info.",
      time: "11:25",
      duration: "02:12"
    },
    {
      type: "ai",
      text: "Certainly, I have updated all my orders and customers related knowledge, feel free to ask anything.",
      time: "10:26"
    },
    {
      type: "user",
      text: "Give me summary of order #123474512",
      time: "10:30"
    },
    {
      type: "ai",
      text: "Here is summary of #123474512",
      time: "10:30",
      orderSummary: {
        customerName: "Jane Doe",
        phone: "+1234567890",
        email: "janedoe@gmail.com",
        items: 12,
        orderAmount: "$1235.21",
        orderMethod: "Delivery",
        paymentMethod: "E-transfer",
        orderedOn: "15th Aug, 2025 at 05:30 PM"
      }
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-2">
      {/* Header */}
      <h2 className="text-lg font-bold text-black mb-4">AI Knowledge Base</h2>


      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2.5">
        {aiMessages.map((msg, index) => (
          <div key={index} className="flex gap-2 items-start">
            {msg.type === 'ai' ? (
              <>
                {/* AI Avatar - Left */}
                <div className="w-10 h-10 rounded-full bg-white border border-black shrink-0 flex items-center justify-center">
                  <BookText size={20} className="text-gray-700"
                  />
                </div>

                {/* AI Message */}
                <div className="flex-1 max-w-[85%]">
                  <div className="bg-white border border-gray-300 rounded-b-sm rounded-tr-sm px-4 py-1.5 shadow-sm">
                    <p className="text-[15px] font-medium text-[#1E293B] leading-relaxed mb-1">
                      {msg.text}
                    </p>

                    {/* Order Summary Card */}
                    {msg.orderSummary && (
                      <>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Customer name:</span> {msg.orderSummary.customerName}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Customer phone:</span> {msg.orderSummary.phone}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Customer email:</span> {msg.orderSummary.email}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Items:</span> {msg.orderSummary.items}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Order Amount:</span> {msg.orderSummary.orderAmount}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Order Method:</span> {msg.orderSummary.orderMethod}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Payment Method:</span> {msg.orderSummary.paymentMethod}
                        </p>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Customer ordered on:</span> {msg.orderSummary.orderedOn}
                        </p>
                      </>
                    )}

                    {/* Time inside message */}
                    <p className="text-sm text-[#1E293B] text-right mt-0.5">{msg.time}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* User Message */}
                <div className="flex-1 flex justify-end">
                  <div className="max-w-[100%]">
                    <div className="bg-black rounded-b-sm rounded-tl-sm px-4 py-1.5 shadow-sm">
                      <p className="text-[15px] text-white leading-relaxed mb-1">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        {msg.duration && (
                          <p className="text-sm text-white">{msg.duration}</p>
                        )}
                        <p className="text-sm text-gray-400 ml-auto">{msg.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Avatar - Right */}
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-400 shrink-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-2.5">
        <div className="flex items-center gap-2 bg-white border border-[#0000004D] shadow-sm rounded-sm px-3 py-1.5">
          <Paperclip className="w-4 h-4" />
          <input
            type="text"
            placeholder="Message to ChatMail..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-[#434343] focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIKnowledgeBaseView;
