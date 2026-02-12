import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

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
  if (/^\/staff\/drivers\/\d+$/.test(pathname)) return "Driver Details";
  const matchedPath = Object.keys(routeTitleMap).find(
    (path) => pathname === path
  );
  return routeTitleMap[matchedPath];
};

const DashboardHeader = ({ sidebar, setSidebar, userName = "Akash" }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const displayTitle = getDisplayTitle(pathname);

  useEffect(() => {
    const pageTitle =
      displayTitle || (pathname.startsWith("/staff") ? "Staff" : "Potrider");
    document.title = pageTitle ? `${pageTitle} | Potrider` : "Potrider";
  }, [displayTitle, pathname]);

  return (
    <nav className="w-full px-4 sm:px-6 h-16 flex items-center justify-between bg-white">
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

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="relative hover:bg-gray-100 p-2 rounded transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-medium">
            {userName.charAt(0)}
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {userName}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
