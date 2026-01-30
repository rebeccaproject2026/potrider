import { useState } from "react";
import DatePickerMap from "../../components/DatePickerMap";
import DashboardChart from "../../components/dashboard/DashboardChart";
import InventoryHealth from "../../components/dashboard/InventoryHealth";
import OrderHealth from "../../components/dashboard/OrderHealth";
import DashboardAverageOrders from "../../components/dashboard/DashboardAverageOrders";
import DashboardDriverStatus from "../../components/dashboard/DashboardDriverStatus";
import DashboardDeliveries from "../../components/dashboard/DashboardDeliveries";
import GeoPerformance from "../../components/dashboard/GeoPerformance";
import MostSellingArea from "../../components/dashboard/MostSellingArea";
import TopSellingProducts from "../../components/dashboard/TopSellingProducts";
import DriverPerformance from "../../components/dashboard/DriverPerformance";
import NewClients from "../../components/dashboard/NewClients";

const Dashboard = () => {
  const user = {
    fullName: "Chillin Cheetah",
  };

  // eslint-disable-next-line no-unused-vars
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  // Top stat cards data
  const topStats = [
    {
      title: "Total Sales",
      value: "$7,825",
      change: "+32%",
      isPositive: true,
      color: "#a78bfa",
      colorOffset0: "#C5ACFF",
      colorOffset100: "#D4C1FF",
      chartData: [30, 32, 35, 40, 35, 40, 50, 60, 45],
    },
    {
      title: "Total Products Listed",
      value: "99",
      change: "+22%",
      isPositive: true,
      color: "#60a5fa",
      colorOffset0: "#7BD6FE",
      colorOffset100: "#ACE5FF",
      chartData: [25, 40, 30, 45, 60, 50, 45, 55, 40],
    },
    {
      title: "Total Orders",
      value: "1,205",
      change: "+22%",
      isPositive: true,
      color: "#34d399",
      colorOffset0: "#7CE8DC",
      colorOffset100: "#ADFCF3",
      chartData: [35, 50, 40, 55, 70, 60, 55, 65, 50],
    },
    {
      title: "Total Customers",
      value: "21,052",
      change: "-22%",
      isPositive: false,
      color: "#fbbf24",
      colorOffset0: "#FDE68A",
      colorOffset100: "#FEF3C7",
      chartData: [20, 35, 25, 40, 55, 45, 40, 50, 35],
    },
  ];

  // Inventory data
  const inventoryData = {
    stockValue: "$124,578",
    addedStock: "523",
    lowStock: "110",
    outOfStock: "10",
  };

  // Orders data
  const ordersData = {
    totalOrderValue: "$4,578",
    totalOrders: 432,
    delivered: 324,
    pending: 45,
    cancelled: 42,
  };

  // Average Orders Chart data
  const averageOrdersData = {
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    series: [
      {
        name: "Total Orders(432)",
        data: [
          80, 75, 85, 90, 70, 95, 100, 85, 90, 75, 80, 85, 70, 95, 100,
          85, 90, 75, 80, 85, 70, 95, 100, 85, 90, 100, 115, 90, 95, 80,
        ],
      },
      {
        name: "Delivered (324)",
        data: [
          50, 48, 52, 55, 45, 60, 65, 55, 58, 50, 52, 55, 48, 60, 65, 55,
          58, 50, 52, 55, 48, 60, 65, 55, 58, 65, 75, 58, 60, 52,
        ],
      },
      {
        name: "Pending (45)",
        data: [
          20, 18, 22, 25, 18, 28, 30, 25, 26, 20, 22, 25, 18, 28, 30, 25,
          26, 20, 22, 25, 18, 28, 30, 25, 26, 30, 35, 26, 28, 22,
        ],
      },
      {
        name: "Cancelled (42)",
        data: [
          10, 9, 11, 10, 7, 7, 5, 5, 6, 5, 6, 5, 4, 7, 5, 5, 6, 5, 6, 5,
          4, 7, 5, 5, 6, 5, 5, 6, 7, 6,
        ],
      },
    ],
  };

  // Driver Status data
  const driverStatusData = {
    categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [
      {
        name: "Online",
        data: [450, 320, 300, 460, 140, 380, 390],
      },
      {
        name: "Offline",
        data: [220, 120, 240, 360, 240, 220, 310],
      },
    ],
    totals: {
      online: 32,
      offline: 23,
    },
  };

  // Deliveries data
  const deliveriesData = {
    series: [31, 44, 25],
    labels: ["Delivered", "Cancelled", "Processing"],
  };

  // Most Selling Area data
  const mostSellingAreaData = [
    {
      areaCode: "M2N 3X0",
      driver: "John Henry",
      totalSales: "201 kg",
      collection: "$821.00",
      unpaidCollection: "$21.00",
      orders: 43,
    },
    {
      areaCode: "M2N 3X1",
      driver: "Noah John",
      totalSales: "152 kg",
      collection: "$590.00",
      unpaidCollection: "$50.00",
      orders: 34,
    },
    {
      areaCode: "M2N 3X2",
      driver: "William Jackson",
      totalSales: "92 kg",
      collection: "$435.00",
      unpaidCollection: "$12.00",
      orders: 30,
    },
    {
      areaCode: "M2N 3X3",
      driver: "Jackson",
      totalSales: "93 kg",
      collection: "$348.00",
      unpaidCollection: "$0",
      orders: 20,
    },
    {
      areaCode: "M2N 3X4",
      driver: "Noah John",
      totalSales: "86 kg",
      collection: "$307.00",
      unpaidCollection: "$61.00",
      orders: 26,
    },
  ];

  // Top Selling Products data
  const topSellingProductsData = [
    { id: 1, name: "Gas Mask", price: "$4,321" },
    { id: 2, name: "Chocolope", price: "$1,025" },
    { id: 3, name: "Kush Kraft Blue Gelato", price: "$565" },
    { id: 4, name: "Willo Grape Ape", price: "$520" },
    { id: 5, name: "White Widow", price: "$499" },
  ];

  // Driver Performance data
  const driverPerformanceData = [
    {
      id: 1,
      name: "Mike Wilson",
      avatar: null,
      onlineHours: "8.5 hrs",
      deliveries: 120,
      collected: "$1,234",
    },
    {
      id: 2,
      name: "John Henry",
      avatar: null,
      onlineHours: "7.2 hrs",
      deliveries: 119,
      collected: "$1,225",
    },
    {
      id: 3,
      name: "Nash John",
      avatar: null,
      onlineHours: "6.8 hrs",
      deliveries: 115,
      collected: "$1,204",
    },
    {
      id: 4,
      name: "Walliam Jackson",
      avatar: null,
      onlineHours: "8.5 hrs",
      deliveries: 115,
      collected: "$1,204",
    },
    {
      id: 5,
      name: "Jackson",
      avatar: null,
      onlineHours: "6.8 hrs",
      deliveries: 115,
      collected: "$1,204",
    },
  ];

  // New Clients data
  const newClientsData = [
    { id: 1, name: "Daniyal Sajid", avatar: null, orders: 3 },
    { id: 2, name: "Michael Hajas", avatar: null, orders: 2 },
    { id: 3, name: "Chris Cilruth", avatar: null, orders: 1 },
    { id: 4, name: "Adam Price", avatar: null, orders: 1 },
    { id: 5, name: "Crystal Soares", avatar: null, orders: 1 },
  ];

  // Handler functions for "View All" buttons
  const handleViewAll = (section) => {
    console.log(`View All clicked for: ${section}`);
    // TODO: Navigate to respective pages when routing is set up
  };

  return (
    <div className="p-4 md:p-4 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#212121] mb-4 md:mb-0">
          👋 Hi, {user.fullName}
        </h1>
        <DatePickerMap
          defaultItem={2}
          onUpdate={(range) => setDateRange({ start: range.start, end: range.end })}
        />
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topStats.map((stat, index) => (
          <DashboardChart
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            color={stat.color}
            colorOffset0={stat.colorOffset0}
            colorOffset100={stat.colorOffset100}
            chartData={stat.chartData}
          />
        ))}
      </div>

      {/* Inventory and Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InventoryHealth
          data={inventoryData}
          onViewAll={() => handleViewAll("Inventory")}
        />
        <OrderHealth
          data={ordersData}
          onViewAll={() => handleViewAll("Orders")}
        />
      </div>

      {/* Average Orders Chart */}
      <div className="mb-4">
        <DashboardAverageOrders
          data={averageOrdersData}
          onViewAll={() => handleViewAll("Average Orders")}
        />
      </div>

      {/* Driver Status and Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <DashboardDriverStatus
            data={driverStatusData}
            onViewAll={() => handleViewAll("Driver Status")}
          />
        </div>
        <DashboardDeliveries
          data={deliveriesData}
          onViewAll={() => handleViewAll("Deliveries")}
        />
      </div>

      {/* GEO Performance and Most Selling Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-start">
        <GeoPerformance />
        <MostSellingArea
          data={mostSellingAreaData}
          onViewAll={() => handleViewAll("Most Selling Area")}
        />
      </div>

      {/* Bottom Row - Product, Driver, and Client Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <TopSellingProducts
          data={topSellingProductsData}
          onViewAll={() => handleViewAll("Top Selling Products")}
        />
        <DriverPerformance
          data={driverPerformanceData}
          onViewAll={() => handleViewAll("Driver Performance")}
        />
        <NewClients
          data={newClientsData}
          onViewAll={() => handleViewAll("New Clients")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
