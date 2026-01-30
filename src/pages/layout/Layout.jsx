import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import DashboardHeader from "../../components/DashboardHeader.jsx";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  // let user = true;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden sm:block flex-shrink-0">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      {sidebar && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div
            className="absolute inset-0 bg-[#D9D9D9]"
            onClick={() => setSidebar(false)}
          />
          <div className="absolute left-0 top-0 h-screen">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden overflow-y-auto hide-scrollbar">
        <DashboardHeader
          sidebar={sidebar}
          setSidebar={setSidebar}
          userName="Akash"
        />

        {/* Page content: prevent horizontal overflow, allow vertical scroll */}
        <div className="flex-1 min-w-0 min-h-0 p-2 bg-[#F2F2F2] overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
