import { MoreVertical, Send, Mic } from "lucide-react";
import ChatMessageBubble from "./ChatMessageBubble";
import OrderSummaryCard from "./OrderSummaryCard";

/**
 * Center panel: chat header (avatar, name, Last Active, pill, menu), messages, order summary card, input.
 */
const ChatWindow = ({ customer, messages = [], orderSummary, onSendMessage, inputValue, onInputChange }) => {
  return (
    <div className="flex flex-col h-full bg-[#F2F2F2] min-w-0 flex-1">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden flex items-center justify-center">
            {customer?.avatar ? (
              <img src={customer.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 font-semibold text-sm">{customer?.name?.charAt(0) || "?"}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-[#212121] text-base truncate">{customer?.name || "Customer"}</h2>
              <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-200 text-gray-700">
                {customer?.roleLabel || "Existing Customer"}
              </span>
            </div>
            <p className="text-xs text-gray-500">Last Active {customer?.lastActive || "20m"}</p>
          </div>
        </div>
        <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessageBubble
            key={i}
            isAgent={msg.isAgent}
            timestamp={msg.timestamp}
            humanResponseButton={msg.humanResponseButton}
          >
            {msg.text}
          </ChatMessageBubble>
        ))}
        {orderSummary && (
          <div className="flex justify-end mt-2">
            <OrderSummaryCard
              products={orderSummary.products}
              subtotal={orderSummary.subtotal}
              promocode={orderSummary.promocode}
              discount={orderSummary.discount}
              potCash={orderSummary.potCash}
              storeDiscount={orderSummary.storeDiscount}
              total={orderSummary.total}
              timestamp={orderSummary.timestamp}
              showHumanResponse={orderSummary.showHumanResponse}
            />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendMessage?.()}
            className="flex-1 min-w-0 py-2 text-sm text-[#212121] placeholder-gray-400 focus:outline-none bg-transparent"
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            title="Send voice"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onSendMessage?.()}
            className="p-2 text-(--color-secondary) hover:bg-blue-50 rounded"
            title="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
