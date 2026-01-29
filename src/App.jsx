import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./pages/layout/Layout";
import Inventory from "./pages/inventory/Inventory";
import Finances from "./pages/finances/Finances";
import Customers from "./pages/customers/Customers";
import Marketing from "./pages/marketing/Marketing";
import Staff from "./pages/staff/Staff";
import Order from "./pages/orders/Order";
import Tracking from "./pages/tracking/Tracking";
import AIAgents from "./pages/aiagents/AIAgents";
import Support from "./pages/support/Support";
import Setting from "./pages/setting/Setting";
import PageNotFound from "./pages/pnf/PageNotFound";
import AIAdministrator from "./pages/staff/AIAdministrator";
import AddDriver from "./pages/staff/AddDriver";
import Drivers from "./pages/staff/Drivers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Order />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="finances" element={<Finances />} />
          <Route path="customers" element={<Customers />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="ai-agent" element={<AIAgents />} />

          <Route path="staff" element={<Staff />}>
            <Route path="ai-admin" element={<AIAdministrator />} />
            <Route path="add-driver" element={<AddDriver />} />
            <Route path="drivers" element={<Drivers />} />
          </Route>

          <Route path="support" element={<Support />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
