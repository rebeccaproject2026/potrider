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
      className={`w-full text-left rounded-sm  bg-white transition-colors hover:bg-gray-50/80 ${
        isActive ? "ring-2 ring-(--color-secondary)/30 bg-blue-50/50" : ""
      }`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <div className="flex gap-3 p-3">
        <div className="shrink-0 w-[55px] h-[55px] rounded-[4px] bg-gray-200 overflow-hidden flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 font-semibold text-sm">
              {name?.charAt(0) || "?"}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <span className="inline-flex px-2 py-0.5 rounded-[3px] text-[10px] font-medium bg-gray-700 text-white shrink-0 w-fit">
            {roleLabel || role}
          </span>

          <div className="flex items-center justify-between gap-2 mt-1">
            <p className="font-bold text-black text-sm truncate min-w-0 flex-1">
              {name}
            </p>
            <span className="text-[11px] text-gray-500 shrink-0">{time}</span>
          </div>

          {unreadCount != null && unreadCount > 0 && (
            <div className="flex justify-end mt-0.5">
              <span
                className="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-green-500 text-white"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </div>
          )}
          <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-2">
            {lastMessage}
          </p>

          {statusText && (
            <span className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-1.5">
              <StatusIcon
                className="w-3.5 h-3.5 shrink-0 text-black"
                strokeWidth={2.5}
              />
              <span className="truncate">{statusText}</span>
            </span>
          )}

          {platformIcons.length > 0 && (
            <div
              className="self-end mt-2 inline-flex items-center justify-end rounded-lg bg-white px-1.5 py-1 border border-gray-100"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
            >
              <PlatformIconsRow platformKeys={platformIcons} max={11} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationEntry;
