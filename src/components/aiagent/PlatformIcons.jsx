import { Icon } from "@iconify/react";

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
};

const PlatformIconsRow = ({ platformKeys = [], max = 11 }) => {
  const list = (platformKeys || []).slice(0, max).filter(Boolean);
  if (!list.length) return null;

  return (
    <div className="flex items-center justify-end whitespace-nowrap">
      {list.map((key, i) => {
        const config = PLATFORM_ICONS[key] || PLATFORM_ICONS.chat;

        return (
          <div
            key={`${key}-${i}`}
            className="w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center border border-gray-100 relative"
            style={{
              marginLeft: i === 0 ? 0 : -12,
              zIndex: list.length - i,
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            }}
          >
            <Icon
              icon={config.icon}
              className="w-4 h-4"
              style={{ color: config.color }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlatformIconsRow;
