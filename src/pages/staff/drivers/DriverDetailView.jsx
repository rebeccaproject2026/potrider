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
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";
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

const DriverDetailView = () => {
  const navigate = useNavigate();
  const [isHired, setIsHired] = useState(true);
  const [period, setPeriod] = useState({ start: null, end: null });
  const [activeTab, setActiveTab] = useState("live-status");

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
                <button className="text-sm border-b text-black font-semibold flex items-center gap-1">
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
      {activeTab === "log-activity" && (
        <div className="text-center py-8 text-gray-500">
          Log Activity content coming soon...
        </div>
      )}
      {activeTab === "payroll-history" && (
        <div className="text-center py-8 text-gray-500">
          Payroll History content coming soon...
        </div>
      )}
      {activeTab === "performance" && (
        <div className="text-center py-8 text-gray-500">
          Performance content coming soon...
        </div>
      )}

    </div>
  );
};

export default DriverDetailView;
