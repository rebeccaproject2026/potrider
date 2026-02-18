import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import NotificationDropdown from "./common/NotificationDropdown";
import avtar from "../assets/images/self-portrait-beautiful-chinese-girl2.png";

const routeTitleMap = {
  "/": "Dashboard",
  "/orders": "Orders",
  "/tracking": "Tracking",
  "/inventory": "Inventory",
  "/finances": "Finances",
  "/customers": "Customers",
  "/ai-agent": "AI Agent",
  "/marketing": "Marketing",
  "/staff": "Staff",
  "/support": "Support",
  "/setting": "Setting",
};

const specificPathTitles = {
  "/orders/create": "Create Order",
  "/inventory/add": "Add Inventory",
  "/customers/add": "Add Customer",
  "/staff/ai-admin": "AI Administrator",
  "/staff/add-driver": "Add Driver",
  "/staff/drivers": "Drivers",
};

const getDisplayTitle = (pathname) => {
  if (specificPathTitles[pathname]) return specificPathTitles[pathname];
  if (/^\/orders\/[^/]+$/.test(pathname)) return "Order Details";
  if (/^\/customers\/[^/]+$/.test(pathname)) return "Customer Details";
  if (/^\/staff\/drivers\/\d+$/.test(pathname)) return "Driver Details";
  const matchedPath = Object.keys(routeTitleMap).find(
    (path) => pathname === path
  );
  return routeTitleMap[matchedPath];
};

const DashboardHeader = ({ sidebar, setSidebar, user = {
  fullName: "Akash Sharma",
  role: "Admin",
  avatar: avtar,
}, }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const displayTitle = getDisplayTitle(pathname);
  // const navigate = useNavigate();
  useEffect(() => {
    const pageTitle =
      displayTitle || (pathname.startsWith("/staff") ? "Staff" : "Potrider");
    document.title = pageTitle ? `${pageTitle} | Potrider` : "Potrider";
  }, [displayTitle, pathname]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function (Vue equivalent)
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // adjust if using context/auth
  //   navigate("/");
  //   alert("Logout successfully");
  // };
  return (
    <>
      <nav className="w-full px-4 sm:px-6 h-16 flex items-center justify-between bg-white relative z-30">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="sm:hidden text-gray-700 text-xl font-bold hover:bg-gray-100 p-2 rounded transition-colors"
          >
            ☰
          </button>

          <h1 className="text-base sm:text-lg font-semibold text-[#212121]">
            {displayTitle}
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-4">
          <button
            className="relative hover:bg-gray-100 rounded transition-colors mt-1"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell className="w-6 h-6 text-[#212121]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {/* 
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-medium">
              {userName.charAt(0)}

            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {userName}
            </span>
          </div> */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded transition"
            >
              <img
                src={user.avatar}
                alt="user"
                className="w-9 h-9 rounded-full object-cover"
              />

              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-[#212121]">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {user.role}
                </p>
              </div>

              <ChevronDown className="w-4.5 h-4.5 text-[#212121]" />
            </button>

            {/* Dropdown Menu */}
            {/* {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg py-2 z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                >
                  Log Out
                </button>
              </div>
            )} */}
          </div>
        </div>
      </nav>

      <NotificationDropdown
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default DashboardHeader;
