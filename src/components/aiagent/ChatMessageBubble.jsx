/**
 * Reusable chat message bubble - customer (left, grey) or agent (right, blue).
 */
const ChatMessageBubble = ({
  isAgent,
  children,
  timestamp,
  humanResponseButton,
  responseType,
  className = "",
}) => {
  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"} ${className}`}>
      <div
        className={`${isAgent ? "max-w-[75%]" : "max-w-[60%]"} rounded-md px-4 py-2.5 ${isAgent
          ? "bg-(--color-secondary) text-white"
          : "bg-gray-200 text-[#000000] font-medium"
          }`}
      >
        <div className="text-[14px] leading-relaxed">{children}</div>
        <div className="flex items-center justify-between gap-2 mt-1.5 flex-wrap">
          <span className={`text-[12px] font-medium ${isAgent ? "text-blue-100" : "text-[#525252]"}`}>
            {timestamp}
          </span>
          {humanResponseButton && (
            <button
              type="button"
              className="text-[11px] font-semibold px-3 py-1 rounded bg-white text-(--color-secondary) hover:bg-blue-50"
            >
              Human Response
            </button>
          )}
          {responseType && (
            <span className="text-[11px] font-semibold px-3 py-1 rounded bg-white text-(--color-secondary)">
              {responseType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
