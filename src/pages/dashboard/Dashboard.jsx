import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const user = {
    fullName: "Chillin Cheetah",
  };

  const [timePeriod, setTimePeriod] = useState("This Month");

  // Top stat cards
  const topStats = [
    {
      title: "Total Sales",
      value: "$7,825",
      change: "+22%",
      isPositive: true,
      color: "#a78bfa",
    },
    {
      title: "Total Products Listed",
      value: "99",
      change: "+22%",
      isPositive: true,
      color: "#60a5fa",
    },
    {
      title: "Total Orders",
      value: "1,205",
      change: "+22%",
      isPositive: true,
      color: "#34d399",
    },
    {
      title: "Total Customers",
      value: "21,052",
      change: "-22%",
      isPositive: false,
      color: "#fbbf24",
    },
  ];

  // Chart data for top stats
  const getChartOptions = (color) => ({
    chart: {
      type: "area",
      height: 50,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [color],
    fill: {
      type: "fill",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
    grid: {
      show: false,
    },
  });

  const getChartSeries = (color) => [
    {
      name: color,
      data: [30, 45, 35, 50, 69, 55, 50, 60, 45],
    },
  ];

  // Inventory data
  const inventoryData = {
    title: "Inventory",
    mainValue: "428 × 59",
    items: [
      { label: "Total Stock Value", value: "$124,578" },
      { label: "Total Stock Items", value: "523" },
      { label: "Low Stock Items", value: "110" },
      { label: "Out of Stock Items", value: "10" },
    ],
  };

  // Orders data
  const ordersData = {
    totalOrderValue: "$4,578",
    totalOrders: 432,
    delivered: 324,
    pending: 45,
    cancelled: 42,
  };

  return (
    <div className="p-4 md:p-4 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          👋 Hi, {user.fullName}
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          {timePeriod}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 flex flex-col">
            {/* Header with title and percentage */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <span
                className={`text-sm font-semibold ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>

            {/* Chart - takes remaining space */}
            <div className="flex-1 -mx-4 -mb-4 rounded-b-lg overflow-hidden">
              <Chart
                options={getChartOptions(stat.color)}
                series={getChartSeries(stat.color)}
                type="area"
                height={70}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inventory and Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inventory */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {inventoryData.title}
            </h2>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {inventoryData.mainValue}
            </span>
            <button className="text-green-500 hover:text-green-600 text-sm font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {inventoryData.items.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs text-gray-600 mb-2">{item.label}</p>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
            <button className="text-green-500 hover:text-green-600 text-sm font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Total Orders of</p>
              <p className="text-xl font-bold text-gray-900">
                {ordersData.totalOrderValue}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">
                {ordersData.totalOrders}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Delivered</p>
              <p className="text-xl font-bold text-green-600">
                {ordersData.delivered}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Pending</p>
              <p className="text-xl font-bold text-yellow-600">
                {ordersData.pending}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Cancelled</p>
              <p className="text-xl font-bold text-red-600">
                {ordersData.cancelled}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Average Orders Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Average Orders
          </h2>
          <button className="text-green-500 hover:text-green-600 text-sm font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center">
            View All
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Total Orders(432)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Delivered (324)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Pending (45)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Cancelled (42)</span>
          </div>
        </div>

        {/* Chart Placeholder - Replace with actual chart library */}
        <Chart
          key="average-orders-chart"
          options={{
            chart: {
              type: "bar",
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            colors: ["#00B159", "#0066FF", "#FF9800", "#F44336"],
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "60%",
                borderRadius: 0,
              },
            },
            xaxis: {
              categories: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
              ],
            },
            yaxis: {
              show: true,
            },
            legend: {
              show: false,
            },
            tooltip: {
              enabled: true,
              shared: true,
              intersect: false,
              theme: "light",
              x: {
                show: true,
              },
            },
            grid: {
              borderColor: "#e5e7eb",
              strokeDashArray: 0,
            },
          }}
          series={[
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
          ]}
          type="bar"
          height={320}
        />
      </div>

      {/* Driver Status and Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Status */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Driver Status
            </h2>
            <button className="text-green-500 hover:text-green-600 text-sm bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center font-semibold">
              View All
            </button>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online(32)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Offline(23)</span>
            </div>
          </div>

          {/* Driver Status Chart */}
          <Chart
            options={{
              chart: {
                type: "bar",
                toolbar: {
                  show: false,
                },
              },
              colors: ["#00B159", "#F44336"],
              dataLabels: {
                enabled: false,
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "60%",
                  borderRadius: 8,
                },
              },
              stroke: {
                show: true,
                width: 12,
                colors: ["transparent"],
              },
              xaxis: {
                categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
              },
              yaxis: {
                show: true,
              },
              legend: {
                show: false,
              },
              tooltip: {
                enabled: true,
                theme: "light",
              },
              grid: {
                borderColor: "#e5e7eb",
                strokeDashArray: 0,
              },
            }}
            series={[
              {
                name: "Online",
                data: [450, 320, 300, 460, 140, 380, 390],
              },
              {
                name: "Offline",
                data: [220, 120, 240, 360, 240, 220, 310],
              },
            ]}
            type="bar"
            height={250}
          />
        </div>

        {/* Deliveries Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Deliveries</h2>
            <button className="text-green-500 hover:text-green-600 text-sm font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center">
              View All
            </button>
          </div>

          {/* Deliveries Pie Chart */}
          <Chart
            options={{
              chart: {
                type: "pie",
                width: "100%",
                toolbar: {
                  show: false,
                },
              },
              colors: ["#10b981", "#ef4444", "#f59e0b"],
              dataLabels: {
                enabled: true,
                formatter: function (val, { seriesIndex }) {
                  const labels = ["Delivered", "Cancelled", "Processing"];
                  return labels[seriesIndex] + " - " + Math.round(val) + "%";
                },
                style: {
                  fontSize: "12px",
                  fontWeight: "normal",
                  colors: ["#000"],
                },
                dropShadow: {
                  enabled: false,
                },
              },
              labels: ["Delivered", "Cancelled", "Processing"],
              plotOptions: {
                pie: {
                  dataLabels: {
                    offset: -25,
                  },
                },
              },
              legend: {
                show: false,
              },
              tooltip: {
                enabled: true,
                theme: "light",
              },
            }}
            series={[31, 44, 25]}
            type="pie"
            height={290}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
