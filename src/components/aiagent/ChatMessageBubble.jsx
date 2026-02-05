/**
 * Reusable chat message bubble - customer (left, grey) or agent (right, blue).
 */
const ChatMessageBubble = ({
  isAgent,
  children,
  timestamp,
  humanResponseButton,
  className = "",
}) => {
  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"} ${className}`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-3 ${
          isAgent
            ? "bg-(--color-secondary) text-white"
            : "bg-gray-200 text-[#212121]"
        }`}
      >
        <div className="text-sm">{children}</div>
        <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
          <span className={`text-[11px] ${isAgent ? "text-blue-100" : "text-gray-500"}`}>
            {timestamp}
          </span>
          {humanResponseButton && (
            <button
              type="button"
              className="text-[11px] font-medium px-2 py-1 rounded bg-white text-(--color-secondary) hover:bg-blue-50"
            >
              Human Response
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
