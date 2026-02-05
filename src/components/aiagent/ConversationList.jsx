import { Search, RefreshCw } from "lucide-react";
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
    <div className="flex flex-col h-full border-r border-gray-200 min-w-0 w-full max-w-[380px] shrink-0">
      
      <div className="shrink-0 px-4 pb-1">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm text-[#212121] placeholder-gray-500 bg-white border-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            />
          </div>
          <button
            type="button"
            className="h-[40px] w-[40px] shrink-0 rounded-sm bg-white flex items-center justify-center text-black hover:bg-gray-50 transition-colors"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0 mt-2 px-3 pb-3 bg-gray-100/60 space-y-2">
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
