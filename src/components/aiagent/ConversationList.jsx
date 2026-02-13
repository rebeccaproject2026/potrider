import { RefreshCw } from "lucide-react";
import ConversationEntry from "./ConversationEntry";

/**
 * Left panel: search bar + refresh button (white, rounded, subtle shadow), then conversation entries.
 */
const ConversationList = ({
  search,
  onSearchChange,
  conversations,
  activeId,
  onSelect,
}) => {
  return (
    <div className="flex flex-col rounded-sm overflow-hidden min-w-0 w-full max-w-[320px] shrink-0 ">
      {/* Search Bar */}
      <div className="shrink-0 mb-2">
        <div className="flex items-center gap-1">
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-3 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            className="h-[48px] w-[48px] shrink-0 rounded-sm bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0 bg-white">
        {conversations.map((conv) => (
          <ConversationEntry
            key={conv.id}
            avatar={conv.avatar}
            name={conv.name}
            role={conv.role}
            roleLabel={conv.roleLabel}
            lastMessage={conv.lastMessage}
            time={conv.time}
            unreadCount={conv.unreadCount}
            status={conv.status}
            statusLabel={conv.statusLabel}
            platformIcons={conv.platformIcons}
            isActive={activeId === conv.id}
            onClick={() => onSelect(conv)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
