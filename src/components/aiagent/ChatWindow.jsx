import { useState, useRef, useEffect } from "react";
import { MoreVertical, Send, Mic, Download, VolumeX, Trash2, Ban, Flag } from "lucide-react";
import ChatMessageBubble from "./ChatMessageBubble";
import OrderSummaryCard from "./OrderSummaryCard";

/**
 * Center panel: chat header (avatar, name, Last Active, pill, menu), messages, order summary card, input.
 */
const ChatWindow = ({ customer, messages = [], orderSummary, onSendMessage, inputValue, onInputChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuElement = menuRef.current;
      const buttonElement = buttonRef.current;

      if (menuElement && !menuElement.contains(event.target) &&
        buttonElement && !buttonElement.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showMenu]);

  const handleMenuAction = (action) => {
    console.log(`Action: ${action}`);
    setShowMenu(false);
    // Add your action handlers here
  };

  const handleToggleMenu = () => {
    if (!showMenu) {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - 150, // 320px is the menu width
        });
      }
    }
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Backdrop */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Dropdown Menu - Rendered outside to avoid overflow clipping */}
      {showMenu && (
        <div
          ref={menuRef}
          className="fixed bg-white rounded-sm shadow-xl border border-gray-300 py-3 z-[60] w-[150px]"
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          <button
            onClick={() => handleMenuAction('export')}
            className="w-full flex items-center gap-2 px-2.5 py-1 text-base  font-semibold text-black hover:bg-gray-50 transition-colors border-b border-gray-300"
          >
            <Download className="w-5 h-5 shrink-0" strokeWidth={2} />
            <span>Export Chat</span>
          </button>

          <button
            onClick={() => handleMenuAction('mute')}
            className="w-full flex items-center gap-2 px-2.5 py-1 text-base font-semibold text-black hover:bg-gray-50 transition-colors border-b border-gray-300"
          >
            <VolumeX className="w-5 h-5  shrink-0" strokeWidth={2} />
            <span>Mute</span>
          </button>

          <button
            onClick={() => handleMenuAction('delete')}
            className="w-full flex items-center gap-2 px-2.5 py-1 text-base font-semibold text-black hover:bg-gray-50 transition-colors border-b border-gray-300"
          >
            <Trash2 className="w-5 h-5 shrink-0" strokeWidth={2} />
            <span>Delete Chat</span>
          </button>

          <button
            onClick={() => handleMenuAction('block')}
            className="w-full flex items-center gap-2 px-2.5 py-1 text-base font-semibold text-red-600 hover:bg-red-50 transition-colors border-b border-gray-300"
          >
            <Ban className="w-5 h-5  shrink-0" strokeWidth={2} />
            <span>Block</span>
          </button>

          <button
            onClick={() => handleMenuAction('report')}
            className="w-full flex items-center gap-2 px-2.5 py-1 text-base font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <Flag className="w-5 h-5 shrink-0" strokeWidth={2} />
            <span>Report</span>
          </button>
        </div>
      )}

      <div className="flex flex-col rounded-sm overflow-hidden bg-white min-w-0 flex-1 shadow-sm relative z-0">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-gray-200 z-50 relative">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-sm bg-gray-200 shrink-0 overflow-hidden flex items-center justify-center">
              {customer?.avatar ? (
                <img src={customer.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 font-semibold text-sm">{customer?.name?.charAt(0) || "?"}</span>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold text-[17px] mt-0.5 text-black truncate">{customer?.name || "Customer"}</h2>
                <span className="inline-flex px-1 py-1 rounded-full text-[11px] font-semibold bg-[#555] text-white w-fit">
                  {customer?.roleLabel || "Existing Customer"}
                </span>
              </div>
              <p className="text-xs font-medium mt-0.5 text-[#696969]">Last Active {customer?.lastActive || "20m"}</p>
            </div>
          </div>

          {/* Three-dot menu */}
          <div className="relative z-50">
            <button type="button" ref={buttonRef} onClick={handleToggleMenu} className="p-2 text-gray-500 bg-gray-100 rounded-sm cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => {
            // Show date separator after 2nd message (index 1)
            const showDateSeparator = i === 2;

            return (
              <div key={i}>
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      25 Jul, 2025
                    </span>
                  </div>
                )}
                <ChatMessageBubble
                  isAgent={msg.isAgent}
                  timestamp={msg.timestamp}
                  humanResponseButton={msg.humanResponseButton}
                  responseType={msg.responseType}
                >
                  {msg.text}
                </ChatMessageBubble>
              </div>
            );
          })}
          {orderSummary && (
            <div className="flex justify-end mt-2 ">
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
        <div className="shrink-0 p-2 bg-white ">
          <div className="flex items-center gap-2 rounded-sm border bg-[#F2F2F2] border-[#E8E8E8] px-2 py-1">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendMessage?.()}
              className="flex-1 min-w-0 py-2  text-sm text-[#212121] placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => onSendMessage?.()}
              className="p-1 text-(--color-secondary) hover:bg-blue-50 rounded"
              title="Send"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-1 text-gray-500 hover:bg-gray-100 rounded"
              title="Send voice"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
