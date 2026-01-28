import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import DashboardHeader from "../../components/DashboardHeader.jsx";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  let user = true;

  return (
    <div className="flex h-screen w-full">
      <div className="hidden sm:block">
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

      <div className="flex flex-col flex-1">
        <DashboardHeader
          sidebar={sidebar}
          setSidebar={setSidebar}
          userName="Akash"
        />

        {/* Page content */}
        <div className="flex-1 p-2 bg-[#F4F7FB] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
