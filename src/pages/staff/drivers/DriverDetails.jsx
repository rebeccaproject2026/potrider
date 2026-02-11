import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, AlertTriangle, DollarSign, Ban, ShieldCheck, MapPin, ChevronRight, Clock, Box, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";

// Mock Data
const MOCK_DRIVER = {
    id: "1",
    fullName: "Mike",
    lastName: "Wilson",
    avatar: null, // use placeholder
    isOnline: true,
    workingArea: ["M2N 3X0", "M2N 2X1"],
    email: "mike.wilson@example.com",
    phone: "+1 234 567 8900",
    hasAccess: true,
    locationPermission: false,
};

const ANALYTICS_DATA = [
    { title: "Total Deliveries", value: "1,205", change: "+ 22%", isPositive: true },
    { title: "Total Received", value: "$45,678", change: "+ 15%", isPositive: true },
    { title: "Unpaid Collection", value: "$2,345", change: "- 5%", isPositive: false },
    { title: "Paid Collection", value: "$43,333", change: "+ 18%", isPositive: true },
    { title: "Average Deliveries/Day", value: "45", change: "+ 10%", isPositive: true },
    { title: "Product Sold", value: "890", change: "+ 12%", isPositive: true },
];

const TIMELINE_DATA = [
    { title: "Delivery Pending", value: "12", status: "Pending" },
    { title: "Delivery In-progress", value: "5", status: "In-progress" },
    { title: "Delivered", value: "1150", status: "Delivered" },
    { title: "Delivery Cancelled", value: "38", status: "Cancelled" },
    { title: "Roll-Over", value: "$120", status: "Reschedule" },
];

const DriverDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("live");
    const [dateRange, setDateRange] = useState(2); // Default to 'Today' or similar

    return (
        <div className="flex flex-col gap-4 min-w-0">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src="/images/user-placeholder.webp"
                                alt={MOCK_DRIVER.fullName}
                                className="w-14 h-14 rounded-full object-cover border border-gray-200"
                            />
                            {MOCK_DRIVER.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                {MOCK_DRIVER.fullName} {MOCK_DRIVER.lastName}
                                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
                                    {MOCK_DRIVER.workingArea.join(", ")}
                                </span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 mt-1">
                                <p className="text-sm text-gray-500">{MOCK_DRIVER.phone}</p>
                                <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                                    <Download className="w-3.5 h-3.5" /> Download APK
                                </button>
                                <button className="text-blue-600 text-sm font-medium hover:underline">
                                    Generate Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-sm hover:bg-red-100 text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Complaint
                    </button>
                    <button className="px-4 py-2 bg-green-50 text-green-600 rounded-sm hover:bg-green-100 text-sm font-medium flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> Pay Salary
                    </button>
                    {MOCK_DRIVER.hasAccess ? (
                        <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-sm hover:bg-orange-100 text-sm font-medium flex items-center gap-2">
                            <Ban className="w-4 h-4" /> Suspend
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-sm hover:bg-blue-100 text-sm font-medium flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Unsuspend
                        </button>
                    )}
                    <DatePickerMap defaultItem={dateRange} onUpdate={setDateRange} className="h-10" />
                </div>
            </div>

            {/* Permission Warning */}
            {!MOCK_DRIVER.locationPermission && (
                <div className="flex items-center justify-between bg-red-50 border border-red-100 p-3 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">
                        {MOCK_DRIVER.fullName} Driver has not enabled 'Allow all the time' location permission.
                        Please notify the driver to update their settings.
                    </p>
                    <button className="text-red-700 hover:text-red-800 text-sm font-bold underline">
                        Notify Driver
                    </button>
                </div>
            )}

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {ANALYTICS_DATA.map((card, index) => (
                    <FinanceSummaryCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        change={card.change}
                        isPositive={card.isPositive}
                    />
                ))}
            </div>

            {/* Timeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {TIMELINE_DATA.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 underline decoration-gray-300 underline-offset-4">
                                {item.status}
                            </span>
                            <span className="text-lg font-bold text-gray-800">{item.value}</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.title}</p>
                    </div>
                ))}
            </div>

            {/* Tabs & Content */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-4">
                <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-4 overflow-x-auto pb-2" aria-label="Tabs">
                        {[
                            { id: "live", label: "Live Status", icon: MapPin },
                            { id: "history", label: "Order History", icon: RotateCcw },
                            { id: "activity", label: "Log Activity", icon: Clock },
                            { id: "payroll", label: "Payroll History", icon: DollarSign },
                            { id: "performance", label: "Performance", icon: CheckCircle },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="min-h-[300px]">
                    {activeTab === "live" && (
                        <div className="text-center text-gray-500 py-10">
                            <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>Live driver tracking map will appear here.</p>
                        </div>
                    )}
                    {activeTab === "history" && (
                        <div className="text-center text-gray-500 py-10">
                            <RotateCcw className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>Order history table will appear here.</p>
                        </div>
                    )}
                    {activeTab === "activity" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <p className="text-sm font-semibold text-green-700">Online Time</p>
                                <p className="text-2xl font-bold text-green-800">142 hrs</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                <p className="text-sm font-semibold text-orange-700">Offline Time</p>
                                <p className="text-2xl font-bold text-orange-800">28 hrs</p>
                            </div>
                        </div>
                    )}
                    {/* Add other tab placeholders as needed */}
                </div>
            </div>
        </div>
    );
};

export default DriverDetails;
