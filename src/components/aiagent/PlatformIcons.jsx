import { Icon } from "@iconify/react";

/**
 * Social / communication platform icons - exact match to reference:
 * White circular backgrounds, flat branded logos (Outlook, Gmail, RSS, Chat, WhatsApp,
 * Messenger, TikTok, LinkedIn, Telegram, Slack, Instagram).
 */
export const PLATFORM_ICONS = {
  outlook: { icon: "simple-icons:microsoftoutlook", color: "#0078D4" },
  gmail: { icon: "simple-icons:gmail", color: "#EA4335" },
  rss: { icon: "mdi:rss", color: "#000000" },
  chat: { icon: "mdi:message-text-outline", color: "#f97316" },
  whatsapp: { icon: "simple-icons:whatsapp", color: "#25D366" },
  messenger: { icon: "simple-icons:messenger", color: "#8B5CF6" },
  tiktok: { icon: "simple-icons:tiktok", color: "#000000" },
  linkedin: { icon: "simple-icons:linkedin", color: "#0A66C2" },
  telegram: { icon: "simple-icons:telegram", color: "#26A5E4" },
  slack: { icon: "simple-icons:slack", color: "#4A154B" },
  instagram: { icon: "simple-icons:instagram", color: "#E4405F" },
  voice: { icon: "mdi:rss", color: "#000000" },
};

const PlatformIconsRow = ({ platformKeys = [], max = 11, className = "" }) => {
  const list = (platformKeys || []).slice(0, max).filter(Boolean);
  if (list.length === 0) return null;

  return (
    <div className={`flex items-center justify-end flex-wrap ${className}`}>
      {list.map((key, i) => {
        const config = PLATFORM_ICONS[key] || PLATFORM_ICONS.chat;
        const isLast = i === list.length - 1;
        return (
          <span
            key={`${key}-${i}`}
            className={`w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm relative shrink-0 ${
              !isLast ? "-mr-2" : ""
            }`}
            style={{ zIndex: i }}
            title={key}
          >
            <Icon
              icon={config.icon}
              className="w-3.5 h-3.5"
              style={{ color: config.color }}
            />
          </span>
        );
      })}
    </div>
  );
};

export default PlatformIconsRow;
