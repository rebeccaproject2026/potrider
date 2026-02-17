import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import portriderLogo from "../assets/images/potrider-logo.svg";
import { Icon } from "@iconify/react";

const navItems = [
  { to: "/", label: "Dashboard", Icon: <Icon icon="solar:widget-2-outline" width="24" height="24" /> },
  { to: "/orders", label: "Orders", Icon: <Icon icon="solar:documents-linear" width="24" height="24" /> },
  { to: "/tracking", label: "Tracking", Icon: <Icon icon="hugeicons:shipment-tracking" width="24" height="24" /> },
  { to: "/inventory", label: "Inventory", Icon: <Icon icon="streamline-ultimate:drugs-cannabis" width="24" height="24" /> },
  { to: "/finances", label: "Finances", Icon: <Icon icon="fluent:wallet-credit-card-16-regular" width="24" height="24" /> },
  { to: "/customers", label: "Customers", Icon: <Icon icon="mynaui:users-group" width="24" height="24" /> },
  { to: "/ai-agent", label: "AI Agent", Icon: <Icon icon="tabler:messages" width="24" height="24" /> },
  { to: "/marketing", label: "Marketing", Icon: <Icon icon="tabler:speakerphone" width="24" height="24" /> },
];

const Sidebar = ({ setSidebar }) => {
  const [staffOpen, setStaffOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleStaffClick = () => {
    setStaffOpen(!staffOpen);
    setActiveMenu("staff");
  };

  const handleNavClick = () => {
    setStaffOpen(false);
    setActiveMenu(null);
    setSidebar(false);
  };

  return (
    <div
      className={`w-45 h-screen bg-white flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="my-2 w-full h-full flex flex-col">
        {/* Logo */}
        <div className="flex justify-center my-2">
          <img
            src={portriderLogo}
            alt="Portrider"
            className="h-12 w-auto cursor-pointer"
          />
        </div>

        {/* Main nav */}
        <div className="px-2 space-y-1 text-[#212121]  flex-1 overflow-y-auto">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `px-3 py-2 flex items-center gap-3 rounded-sm transition-colors ${isActive && activeMenu === null
                  ? "bg-(--color-primary) text-white"
                  : "text-[#212121] font-medium tracking-wide hover:bg-(--color-primary-soft)"

                }`
              }
            >
              {Icon}
              {label}
            </NavLink>
          ))}

          {/* staff manu */}
          <button
            onClick={handleStaffClick}
            className={`w-full px-3 py-2 flex items-center justify-between rounded-sm transition-colors ${activeMenu === "staff"
              ? "bg-(--color-primary) text-white"
              : "text-[#212121] hover:bg-green-100"
              }`}
          >
            <div className="flex items-center gap-3">
              <Icon icon="fluent:people-team-20-regular" width="24" height="24" />
              Staff
            </div>
            {staffOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {staffOpen && (
            <div className="ml-8 mt-1 space-y-1 text-sm">
              <NavLink
                to="/staff/ai-admin"
                className={({ isActive }) =>
                  `block px-3 py-1.5 rounded ${isActive
                    ? "bg-green-100 text-green-700"
                    : "text-[#212121] font-medium hover:bg-green-100"
                  }`
                }
              >
                AI Administrator
              </NavLink>

              <NavLink
                to="/staff/add-driver"
                className={({ isActive }) =>
                  `block px-3 py-1.5 rounded ${isActive
                    ? "bg-green-100 text-green-700"
                    : "text-[#212121] font-medium hover:bg-green-100"
                  }`
                }
              >
                Add Driver
              </NavLink>

              <NavLink
                to="/staff/drivers"
                className={({ isActive }) =>
                  `block px-3 py-1.5 rounded ${isActive
                    ? "bg-green-100 text-green-700"
                    : "text-[#212121] font-medium hover:bg-green-100"
                  }`
                }
              >
                Drivers
              </NavLink>
            </div>
          )}
        </div>

        {/* Bottom Menu Items */}
        <div className="px-2 text-[#212121] font-medium space-y-1 pt-2 pb-2">
          {/* support menu */}
          <NavLink
            to="/support"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `px-3 py-1.5 flex items-center gap-3 rounded transition-colors ${isActive && activeMenu === null
                ? "bg-green-500 text-white"
                : "text-[#212121] hover:bg-green-100"
              }`
            }
          >
           <Icon icon="hugeicons:customer-support" width="24" height="24" />
            Support
          </NavLink>

          {/* setting menu */}
          <NavLink
            to="/setting"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `px-3 py-1.5 flex items-center gap-3 rounded transition-colors ${isActive && activeMenu === null
                ? "bg-green-500 text-white"
                : "text-[#212121] hover:bg-green-100"
              }`
            }
          >
           <Icon icon="lucide:settings" width="24" height="24" />
            Setting
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
