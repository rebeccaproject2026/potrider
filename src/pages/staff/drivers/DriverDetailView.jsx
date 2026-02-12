import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  User,
  Eye,
  KeyRound,
  MessageCircleMore,
  CircleQuestionMark,
  Handshake,
  Coins,
  MapPin,
  History,
  ReceiptText,
  BanknoteArrowDown,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Chart from "react-apexcharts";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";
import DriverDetailsDrawer from "../../staff/addDriver/DriverDetailsDrawer";
import OrderPage from "../../../components/order/OrderPage";
import OrderStatusCard from "../../../components/order/OrderStatusCard";

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined") {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const STATS_DATA = [
  {
    label: "Total Deliveries",
    value: "245",
    change: "+ 22%",
    isPositive: true,
  },
  { label: "Delivered", value: "200", change: "+ 22%", isPositive: true },
  { label: "Cancelled", value: "10", change: "+ 22%", isPositive: false },
  { label: "Rescheduled", value: "30", change: "+ 22%", isPositive: true },
  { label: "In progress", value: "5", change: "+ 22%", isPositive: true },
  {
    label: "Average Deliveries/Day",
    value: "8",
    change: "+ 22%",
    isPositive: true,
  },
];

const DETAIL_STATS = [
  { label: "Complaints", value: "53" },
  { label: "Salary Paid", value: "$5205.23" },
  { label: "Salary Overdue", value: "$1500.25" },
  { label: "Rate Per Delivery", value: "$15.25" },
  { label: "Rating", value: "4.8" },
];

const PAYROLL_HISTORY = [
  {
    id: 1,
    description: "50 hrs Payment - Paid by Master - 12 Dec 2024 at 9:30 pm",
    amount: "$340",
  },
  {
    id: 2,
    description: "55 hrs Payment - Paid by Master - 12 Dec 2024 at 9:30 pm",
    amount: "$440",
  },
  {
    id: 3,
    description: "45 hrs Payment - Paid by Master - 01 Jan 2025 at 9:30 pm",
    amount: "$240",
  },
  {
    id: 4,
    description: "52 hrs Payment - Paid by Master - 15 Feb 2025 at 9:30 pm",
    amount: "$360",
  },
  {
    id: 5,
    description: "65 hrs Payment - Paid by Master - 11 Mar 2025 at 9:30 pm",
    amount: "$440",
  },
  {
    id: 6,
    description: "23 hrs Payment - Paid by Master - 12 Mar 2025 at 9:30 pm",
    amount: "$140",
  },
  {
    id: 7,
    description: "47 hrs Payment - Paid by Master - 12 Apr 2025 at 9:30 pm",
    amount: "$320",
  },
];

const LOG_ACTIVITY = [
  {
    id: 1,
    date: "12 Dec 2025",
    activities: [
      { time: "Online 2:00 pm", type: "online" },
      { time: "Offline 4:00 pm", type: "offline" },
      { time: "Online 6:00 pm", type: "online" },
    ],
    totalHours: "5 hrs",
    activities_hr: [{ hour: "2 hrs" }, { hour: ".5 hrs" }, { hour: "2 hrs" }],
  },
  {
    id: 2,
    date: "11 Dec 2024",
    activities: [],
    activities_hr: [],
    totalHours: "6 hrs",
  },
  {
    id: 3,
    date: "10 Dec 2024",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 4,
    date: "09 Dec 2024",
    activities: [],
    activities_hr: [],
    totalHours: "10 hrs",
  },
  {
    id: 5,
    date: "07 Jan 2025",
    activities: [],
    activities_hr: [],
    totalHours: "4 hrs",
  },
  {
    id: 6,
    date: "29 Jan 2025",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 7,
    date: "26 Feb 2025",
    activities: [],
    activities_hr: [],
    totalHours: "3 hrs",
  },
  {
    id: 8,
    date: "20 March 2025",
    activities: [],
    activities_hr: [],
    totalHours: "4 hrs",
  },
  {
    id: 9,
    date: "18 Apr 2025",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 10,
    date: "17 May 2025",
    activities: [],
    activities_hr: [],
    totalHours: "8 hrs",
  },
  {
    id: 11,
    date: "16 Jun 2025",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 12,
    date: "11 Jul 2025",
    activities: [],
    activities_hr: [],
    totalHours: "2 hrs",
  },
  {
    id: 13,
    date: "30 Jul 2025",
    activities: [],
    activities_hr: [],
    totalHours: "2 hrs",
  },
  {
    id: 14,
    date: "11 Aug 2025",
    activities: [],
    activities_hr: [],
    totalHours: "2 hrs",
  },
];

const DriverDetailView = ({ data }) => {
  const chartData = data || {
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    series: [
      {
        name: "Delivered",
        data: [
          120, 90, 130, 100, 140, 110, 80, 150, 100, 70, 50, 120, 100, 120, 70,
          100, 120, 80, 110, 80, 100, 70, 120, 100, 120, 100, 80, 110, 90, 140,
        ],
      },
      {
        name: "Rescheduled",
        data: [
          100, 80, 90, 80, 100, 90, 70, 100, 90, 80, 60, 100, 90, 100, 70, 90,
          100, 80, 90, 80, 90, 80, 100, 90, 100, 90, 80, 90, 80, 100,
        ],
      },
      {
        name: "Cancelled",
        data: [
          120, 90, 100, 90, 120, 100, 80, 120, 100, 90, 70, 120, 100, 120, 80,
          100, 120, 90, 100, 90, 100, 90, 120, 100, 120, 100, 90, 100, 90, 120,
        ],
      },
    ],
  };

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
    },
    xaxis: {
      categories: Array.from({ length: 30 }, (_, i) =>
        String(i + 1).padStart(2, "0"),
      ),
      labels: {
        style: {
          fontSize: "11px",
          colors: "#666",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 500,
      tickAmount: 5,
      labels: {
        style: {
          fontSize: "11px",
          colors: "#666",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      markers: {
        width: 10,
        height: 10,
        radius: 10,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    colors: ["#00B159", "#0066FF", "#F44336"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " items";
        },
      },
    },
  };

  const navigate = useNavigate();
  const [isHired, setIsHired] = useState(true);
  const [period, setPeriod] = useState({ start: null, end: null });
  const [activeTab, setActiveTab] = useState("live-status");
  const [expandedLogIds, setExpandedLogIds] = useState([]);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);

  const toggleLogExpand = (logId) => {
    setExpandedLogIds((prev) =>
      prev.includes(logId)
        ? prev.filter((id) => id !== logId)
        : [...prev, logId]
    );
  };

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/staff/drivers")}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h1 className="text-base font-medium text-[#424143] flex items-center gap-6">
                David Doe (M2X 3X0) - Driver by Potrider
                <MessageCircleMore className="h-4 w-4 stroke-2" />
              </h1>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsContactDrawerOpen(true)}
                  className="text-sm border-b text-black font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-4 h-4 stroke-2" />
                  Contact Info
                </button>
                <button className="text-sm text-[#0066FF] font-semibold border-b flex items-center gap-1">
                  <Download className="w-4 h-4 stroke-2" />
                  Download APK
                </button>
                <button className="text-sm border-b text-black font-semibold flex items-center gap-1">
                  <KeyRound className="w-4 h-4 stroke-2" /> Generate Password
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2.5 text-sm ">
          <button
            type="button"
            className="flex items-center cursor-pointer justify-center gap-1 bg-[#FF9800] font-semibold p-2.5 rounded-sm text-white h-10"
          >
            <CircleQuestionMark className="h-4 w-4" /> Complaints
          </button>
          <button
            type="button"
            className="flex items-center cursor-pointer justify-center gap-1 bg-[#0066FF] font-semibold p-2.5 rounded-sm text-white h-10"
          >
            <Coins className="h-4 w-4" /> Pay Salary
          </button>
          {!isHired ? (
            <button
              type="button"
              onClick={() => setIsHired(true)}
              className="flex items-center cursor-pointer justify-center gap-1 bg-[#109F22] font-semibold p-2.5 rounded-sm h-10 text-white"
            >
              <Handshake className="h-4 w-4" /> Hire Now
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsHired(false)}
              className="flex items-center cursor-pointer justify-center gap-1 bg-[#F44336] font-semibold p-2.5 rounded-sm h-10 text-white"
            >
              <Handshake className="h-4 w-4" /> Relieve Now
            </button>
          )}
          <DatePickerMap
            defaultItem={2}
            onUpdate={onDateUpdate}
            className="h-10 sm:*:w-44"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
        {STATS_DATA.map((card) => (
          <FinanceSummaryCard
            key={card.label}
            title={card.label}
            value={card.value}
            change={card.change}
            isPositive={card.isPositive}
          />
        ))}
      </div>

      {/* Detail Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {DETAIL_STATS.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-sm border border-[#F4F7FE] flex items-center justify-between"
          >
            <p className="text-[13px] font-semibold text-[#3F4753]">
              {stat.label}
            </p>
            <span className="text-base font-semibold text-black">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-black">
            Track Deliveries
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-2 border border-[#969696] bg-white rounded-sm p-0.5">
            <button
              onClick={() => setActiveTab("live-status")}
              className={`flex items-center gap-2 w-37.5 justify-center py-2 rounded-sm text-sm font-medium cursor-pointer transition-colors ${activeTab === "live-status"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <MapPin className="w-4 h-4" />
              Live Status
            </button>
            <button
              onClick={() => setActiveTab("order-history")}
              className={`flex items-center gap-2 w-37.5 justify-center py-2 rounded-sm text-sm font-medium cursor-pointer transition-colors ${activeTab === "order-history"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <History className="h-4 w-4" />
              Order History
            </button>
            <button
              onClick={() => setActiveTab("log-activity")}
              className={`flex items-center gap-2 w-37.5 justify-center py-2 rounded-sm text-sm font-medium cursor-pointer transition-colors ${activeTab === "log-activity"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <ReceiptText className="w-4 h-4" />
              Log Activity
            </button>
            <button
              onClick={() => setActiveTab("payroll-history")}
              className={`flex items-center gap-2 w-37.5 justify-center py-2 rounded-sm text-sm font-medium cursor-pointer transition-colors ${activeTab === "payroll-history"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <BanknoteArrowDown className="h-4 w-4" />
              Payroll History
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`flex items-center gap-2 w-37.5 justify-center py-2 rounded-sm text-sm font-medium cursor-pointer transition-colors ${activeTab === "performance"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <ChartNoAxesColumnIncreasing className="h-4 w-4 stroke-4" />
              Performance
            </button>
          </div>
        </div>
      </div>

      {/* Track Deliveries Section */}



      {/* Tab Content */}
      <div className="">
        {activeTab === "live-status" && (
          <div>
            {/* Live Status - Single Card with Map */}
            <OrderStatusCard
              orderData={{
                address: '123 Main Street, Toronto, ON M5J 2N8',
                orderId: '302011',
                driver: 'Jack Benson',
                orderAmount: '1325.26',
                orderQuantity: '10 Items',
                orderCreated: '5 Mar 2024',
                orderCreatedTime: '10:30 pm',
                deliveryDate: '15 Jan 2025 Today',
                eta: '11:30 pm',
                soldQuantity: '2.36g',
                receivedAmount: '1025.35',
                unpaidCollection: '1025.35',
                paidCollection: '25.35',
                deliveryStarted: '12/14/2024 at 06:53 pm',
                approximateArrival: '12/14/2024, 08:12 PM',
              }}
              showMap={true}
              showActions={true}
              showPaymentSummary={false}
              type="inprogress"
            />
          </div>
        )}
        {activeTab === "order-history" && (
          <OrderPage
            showFilters={true}
            showMap={false}
            pageType="all"
          />
        )}
        {(activeTab === "log-activity" || activeTab === "payroll-history" || activeTab === "performance") && (
          <div className="bg-white rounded-sm border border-gray-200 p-4">
            {activeTab === "log-activity" && (
            <div className="">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-[#CEF1E0] p-2 rounded-sm text-center">
                  <p className="text-sm font-semibold text-[#00B159]">
                    Online Time
                  </p>
                  <p className="text-lg font-bold text-[#00B159]">112.5 hrs</p>
                </div>
                <div className="bg-[#FFF5E5] p-2 rounded-sm text-center">
                  <p className="text-sm font-semibold text-[#FF9800]">
                    Offline Time
                  </p>
                  <p className="text-lg font-bold text-[#FF9800]">30 hrs</p>
                </div>
              </div>

              {/* Activity Log */}
              <div className="">
                {LOG_ACTIVITY.map((log, index) => {
                  const isExpanded = expandedLogIds.includes(log.id);
                  return (
                    <div key={index} className="relative flex  gap-4">
                      {/* Left side: Vertical line and dot */}
                      <div className="relative flex flex-col items-center">
                        {/* Dot */}
                        <div className="relative z-10 w-3 h-3 bg-[#E3EEFF] rounded-full ring-2 ring-white shrink-0"></div>
                        {/* Vertical line extending down */}
                        {index < LOG_ACTIVITY.length - 1 && (
                          <div className="w-[1.6px] bg-[#E3EEFF] grow h-6"></div>
                        )}
                      </div>

                      {/* Right side: Content */}
                      <div className="flex-1 -mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[15px] font-medium text-gray-900">
                              {log.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {log.totalHours}
                            </span>
                            <button
                              onClick={() => toggleLogExpand(log.id)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <ChevronDown
                                className={`w-5 h-5 text-[#C2C6CE] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                  }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && log.activities.length > 0 && (
                          <div className="mt-3 pb-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                {log.activities.map((activity, idx) => (
                                  <p key={idx} className="text-xs text-gray-600">
                                    {activity.time}
                                  </p>
                                ))}
                              </div>
                              <div className="space-y-1 text-right">
                                {log.activities_hr.map((activity, idx) => (
                                  <p key={idx} className="text-xs text-gray-600">
                                    {activity.hour}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "payroll-history" && (
            <div className="space-y-4">
              {PAYROLL_HISTORY.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between bg-white border-b border-[#F0F1F3] pb-4"
                >
                  <p className="text-sm text-black font-medium">
                    {payment.description}
                  </p>
                  <span className="text-sm font-bold text-black">
                    {payment.amount}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "performance" && (
            <div className="py-4">
              <Chart
                options={chartOptions}
                series={chartData.series}
                type="bar"
                height={350}
              />
            </div>
          )}
          </div>
        )}
      </div>

      {/* Driver Details Drawer */}
      <DriverDetailsDrawer
        isOpen={isContactDrawerOpen}
        onClose={() => setIsContactDrawerOpen(false)}
        driver={{ driverName: "David Doe" }}
      />
    </div>
  );
};

export default DriverDetailView;
