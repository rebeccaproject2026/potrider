import { Send, Reply, Clock } from "lucide-react";
import PlatformIconsRow from "./PlatformIcons";

const ConversationEntry = ({
  avatar,
  name,
  role,
  roleLabel,
  lastMessage,
  time,
  unreadCount,
  status,
  statusLabel,
  platformIcons = [],
  isActive,
  onClick,
}) => {
  const StatusIcon =
    status === "scheduled" ? Clock : status === "new" ? Reply : Send;
  const statusText =
    status === "human_sent"
      ? "Human Sent"
      : status === "new"
        ? "New"
        : status === "ai_sent"
          ? "AI Sent"
          : status === "scheduled"
            ? "Scheduled"
            : statusLabel || "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left transition-colors hover:bg-gray-50 ${isActive ? "bg-gray-50" : ""
        }`}
    >
      <div className="flex gap-3 px-1.5 py-1.5 border-b border-gray-100">
        {/* Avatar - 56x56px rounded */}
        <div className="shrink-0 w-[60px] h-[60px] rounded-sm bg-gray-200 overflow-hidden flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 font-semibold text-lg">
              {name?.charAt(0) || "?"}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">

          {/* Row 1: Role */}
          <span className="inline-flex px-1 py-1 rounded-sm text-[11px] font-semibold bg-[#555] text-white w-fit">
            {roleLabel || role}
          </span>

          {/* Row 2: Name + Time */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[17px] mt-0.5 text-black truncate">
              {name}
            </p>

            <span className="text-[14px] text-[#525252] font-semibold shrink-0">
              {time}
            </span>
          </div>

          {/* Row 3: Message + Unread */}
          <div className="flex justify-between items-center">
            <p className="text-[13px] font-[450] text-[#696969]  truncate">
              {lastMessage}
            </p>

            {unreadCount != null && unreadCount > 0 && (
              <span className="inline-flex items-center justify-center
        min-w-[30px] h-[24px] px-1.5
        rounded-sm text-[13px] font-semibold
        bg-[var(--color-primary)] text-white shrink-0">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          {/* Row 4: Status + Icons */}
          <div className="flex items-center justify-between gap-3">

            {/* Left: Status */}
            {statusText && (
              <div className="flex items-center gap-1 whitespace-nowrap shrink-0">
                <StatusIcon
                  className="w-3 h-3 text-[#000000CC] shrink-0"
                  strokeWidth={2}
                />
                <span className="text-[12.5px] font-semibold text-[#000000CC] font-medium">
                  {statusText}
                </span>
              </div>
            )}

            {/* Right: Platform Icons */}
            {platformIcons.length > 0 && (
              <div className="flex items-center shrink-0">
                <PlatformIconsRow platformKeys={platformIcons} max={11} />
              </div>
            )}

          </div>


        </div>

      </div>
    </button>
  );
};

export default ConversationEntry;
