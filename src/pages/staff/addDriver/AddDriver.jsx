import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowUp, Plus, ChevronDown } from "lucide-react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./AddDriver.css";

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined") {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const CITY_OPTIONS = [
  { value: "toronto", label: "Toronto" },
  { value: "oakville", label: "Oakville" },
  { value: "mississauga", label: "Mississauga" },
  { value: "brampton", label: "Brampton" },
];

const AREA_CODE_OPTIONS = [
  { value: "M2N 3X1", label: "M2N 3X1" },
  { value: "L6M 5R3", label: "L6M 5R3" },
  { value: "M6G 1K8", label: "M6G 1K8" },
];

const RADIUS_OPTIONS = [
  { value: "100m", label: "100m" },
  { value: "500m", label: "500m" },
  { value: "1km", label: "1km" },
];

import AvailableDriversTable from "./AvailableDriversTable";
import {
  getDriversColumns,
  getDriversData,
  DriversDataWithDrawer,
} from "./driversData";

const AddDriver = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const ownDriverMapContainerRef = useRef(null);
  const ownDriverMapRef = useRef(null);
  const secondAreaMapContainerRef = useRef(null);
  const secondAreaMapRef = useRef(null);

  const [activeTab, setActiveTab] = useState("portrider");
  const [city, setCity] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [radius, setRadius] = useState("");
  const [hireDuration, setHireDuration] = useState("custom-duration");
  const [fromDate, setFromDate] = useState("15 Aug, 2025 - 09:30 AM");
  const [toDate, setToDate] = useState("31 Aug, 2025 - 05:00 PM");
  const [deliveryType, setDeliveryType] = useState("sameday");
  const [tipsEnabled, setTipsEnabled] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("monthly");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");

  // Table Data
  const driversData = getDriversData();

  const handleCancel = () => navigate("/staff/drivers");
  const handleSave = () => {
    console.log("Saving driver...");
    navigate("/staff/drivers");
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-79.3832, 43.6532],
      zoom: 12,
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (
      activeTab !== "own" ||
      !ownDriverMapContainerRef.current ||
      ownDriverMapRef.current
    )
      return;
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    ownDriverMapRef.current = new mapboxgl.Map({
      container: ownDriverMapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-79.3832, 43.6532],
      zoom: 14,
    });

    ownDriverMapRef.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    return () => {
      ownDriverMapRef.current?.remove();
      ownDriverMapRef.current = null;
    };
  }, [activeTab]);

  useEffect(() => {
    if (
      activeTab !== "own" ||
      !secondAreaMapContainerRef.current ||
      secondAreaMapRef.current
    )
      return;
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    secondAreaMapRef.current = new mapboxgl.Map({
      container: secondAreaMapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-79.3832, 43.6532],
      zoom: 14,
    });

    secondAreaMapRef.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    return () => {
      secondAreaMapRef.current?.remove();
      secondAreaMapRef.current = null;
    };
  }, [activeTab]);

  const hasMapToken =
    typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 bg-gray-100 overflow-y-auto">
      <div className="flex-1 full-width w-full flex flex-col">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-2.5 flex-1 min-h-0 flex flex-col w-full max-w-none">
          {/* Tab Navigation */}
          <div className="flex items-center w-full rounded-sm bg-white border border-[#CFCFCF] h-10.5 p-0.5 mb-2">
            <button
              type="button"
              onClick={() => setActiveTab("portrider")}
              className={`flex-1 h-full text-sm font-semibold transition-all rounded-sm
      ${
        activeTab === "portrider"
          ? "bg-[#1FAE3D] text-white"
          : "bg-transparent text-gray-600"
      }`}
            >
              Add Driver From Potrider
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("own")}
              className={`flex-1 h-full text-sm font-semibold transition-all rounded-sm
      ${
        activeTab === "own"
          ? "bg-[#1FAE3D] text-white"
          : "bg-transparent text-gray-600"
      }`}
            >
              Add Your Own Driver
            </button>
          </div>

          {/* Add Driver From Portrider Tab */}
          {activeTab === "portrider" && (
            <div className="flex flex-col gap-4">
              {/* Search Available Driver In Area */}
              <div>
                <h2 className="text-base font-semibold text-[#212121] mb-3">
                  Search Available Driver In Area
                </h2>

                {/* Main Card */}
                <div className="border border-[#D6D6D6] rounded-sm bg-white p-4">
                  {/* Top Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-[#212121] mb-1">
                        City
                      </label>
                      <Select
                        options={CITY_OPTIONS}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Toronto"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#212121] mb-1">
                        Area Code
                      </label>
                      <Select
                        options={AREA_CODE_OPTIONS}
                        value={areaCode}
                        onChange={(e) => setAreaCode(e.target.value)}
                        placeholder="M2N 3X1"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#212121] mb-1">
                        Radius
                      </label>
                      <Select
                        options={RADIUS_OPTIONS}
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        placeholder="100m"
                      />
                    </div>
                  </div>

                  {/* Map */}
                  <div className="w-full h-75 rounded-sm overflow-hidden bg-[#EEF1F4]">
                    {hasMapToken ? (
                      <div ref={mapContainerRef} className="w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        Map preview
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Left (Hire Duration) | Right (Pricing, Hours, Tips) */}
              <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-2">
                {/* Left Column: Hire Duration - Fixed width */}
                <div className="border rounded-sm border-[#E5E5E5] p-2.5">
                  <h2 className="text-base font-semibold text-[#212121] mb-3">
                    Hire Driver For A
                  </h2>

                  {/* Duration Buttons Grid - 3 columns */}
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setHireDuration("day")}
                      className={`px-3 py-2.5 text-sm font-medium rounded-sm transition-colors border ${
                        hireDuration === "day"
                          ? "border-[#969696] bg-white text-gray-900"
                          : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Day
                    </button>
                    <button
                      type="button"
                      onClick={() => setHireDuration("week")}
                      className={`px-3 py-2.5 text-sm  font-medium rounded-sm transition-colors border ${
                        hireDuration === "week"
                          ? "border-[#969696] bg-white text-gray-900"
                          : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Week
                    </button>
                    <button
                      type="button"
                      onClick={() => setHireDuration("month")}
                      className={`px-3 py-2.5 text-sm  font-medium rounded-sm transition-colors border ${
                        hireDuration === "month"
                          ? "border-[#969696] bg-white text-gray-900"
                          : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Month
                    </button>
                  </div>

                  {/* Year and Custom Duration - 2 columns */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setHireDuration("year")}
                      className={`px-3 py-2.5 text-sm  font-medium rounded-sm transition-colors border ${
                        hireDuration === "year"
                          ? "border-[#969696] bg-white text-gray-900"
                          : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Year
                    </button>
                    <button
                      type="button"
                      onClick={() => setHireDuration("custom-duration")}
                      className={`px-3 py-2.5 text-sm font-semibold rounded-sm transition-colors ${
                        hireDuration === "custom-duration"
                          ? "bg-[#0066FF] text-white shadow-sm"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Custom Duration{" "}
                      {hireDuration === "custom-duration" && "✓"}
                    </button>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-3 grid grid-cols-2 gap-2 mb-3">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-[#212121] mb-1">
                        From
                      </label>
                      <input
                        type="text"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full px-3 py-2.5 text-[12.5px] border border-[#D9D9D9] rounded-sm bg-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-[#212121] mb-1">
                        To
                      </label>
                      <input
                        type="text"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full px-3 py-2.5 text-[12.5px] border border-[#D9D9D9] rounded-sm bg-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="border border-[#E5E5E5] rounded-sm bg-white p-2.5 space-y-4">
                  {/* Delivery Pricing */}
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 px-2 py-2 border border-[#DADADA] rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={deliveryType === "express"}
                        onChange={() => setDeliveryType("express")}
                        className="w-4.5 h-4.5 accent-blue-600"
                      />
                      <span className="text-sm font-medium text-[#1F1F1F]">
                        We're charging $15 express delivery
                      </span>
                    </label>

                    <label className="flex items-center gap-2 px-2 py-2 border border-[#DADADA] rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={deliveryType === "sameday"}
                        onChange={() => setDeliveryType("sameday")}
                        className="w-4.5 h-4.5 accent-blue-600"
                      />
                      <span className="text-sm font-medium text-[#1F1F1F]">
                        We're charging $10 same day delivery
                      </span>
                    </label>
                  </div>

                  {/* Daily Working Hours */}
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#1F1F1F] mb-3">
                      Select Daily Driver’s Working Hours
                    </h3>

                    <div className="relative h-2 bg-[#E5E5E5] rounded-full">
                      <div
                        className="absolute h-full bg-[#1FAE3D] rounded-full"
                        style={{ width: "60%" }}
                      />
                      <div className="absolute -top-1.25 left-[60%] w-4 h-4 bg-[#1FAE3D] rounded-full border-2 border-white shadow" />
                    </div>

                    <div className="flex justify-between text-sm font-semibold text-[#1F1F1F] mt-3">
                      <span>2</span>
                      <span>4</span>
                      <span>6</span>
                      <span>8</span>
                      <span>10</span>
                    </div>
                  </div>

                  {/* Average Delivery */}
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#1F1F1F] mb-3">
                      Average Delivery Per Day
                    </h3>

                    <div className="relative h-2 bg-[#E5E5E5] rounded-full">
                      <div
                        className="absolute h-full bg-[#1FAE3D] rounded-full"
                        style={{ width: "60%" }}
                      />
                      <div className="absolute -top-1.25 left-[60%] w-4 h-4 bg-[#1FAE3D] rounded-full border-2 border-white shadow" />
                    </div>

                    <div className="flex justify-between text-sm font-semibold text-[#1F1F1F] mt-3">
                      <span>4</span>
                      <span>8</span>
                      <span>12</span>
                      <span>16</span>
                      <span>20</span>
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#1F1F1F] mb-3">
                      Does Tips will be apply to driver ?
                    </h3>

                    <div className="flex gap-2">
                      <label className="flex items-center gap-2 px-1 p-2 w-35  border border-[#DADADA] rounded-sm cursor-pointer">
                        <input
                          type="radio"
                          checked={tipsEnabled === true}
                          onChange={() => setTipsEnabled(true)}
                          className="w-4.5 h-4.5 accent-blue-600"
                        />
                        <span className="text-sm font-medium">Yes</span>
                      </label>

                      <label className="flex items-center gap-2 px-1 p-2 w-35  border border-[#DADADA] rounded-sm cursor-pointer">
                        <input
                          type="radio"
                          checked={tipsEnabled === false}
                          onChange={() => setTipsEnabled(false)}
                          className="w-4.5 h-4.5 accent-blue-600"
                        />
                        <span className="text-sm font-medium">No</span>
                      </label>
                    </div>

                    <p className="text-sm text-black italic text-right mt-3">
                      If actual delivery is outside of area radius it will be
                      charge at $0.69 per km
                    </p>
                  </div>
                </div>
              </div>

              {/* Available Drivers Table */}
              <div className="mt-4">
                <DriversDataWithDrawer>
                  {({ onView, onHire, onViewAreaCodes }) => (
                    <AvailableDriversTable
                      data={driversData}
                      columns={getDriversColumns(
                        onView,
                        onHire,
                        onViewAreaCodes,
                      )}
                      onView={onView}
                      onHire={onHire}
                    />
                  )}
                </DriversDataWithDrawer>
              </div>
            </div>
          )}

          {/* Add Your Own Driver Tab */}
          {activeTab === "own" && (
            <>
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-[#212121]">
                    Driver Details
                  </h2>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-400 text-[#212121] rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FAE3D] text-white rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <ArrowUp className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>

                {/* Form Grid - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Row 1 */}
                  <Input
                    label="Driver Name"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Enter full name"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Date of Birth"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="Enter your number"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                    placeholder="Enter your email address"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />

                  {/* Row 2 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#212121]">
                      Salary
                    </label>
                    <div className="flex items-stretch border border-[#DDDDDD] rounded-sm bg-white">
                      <input
                        type="text"
                        placeholder="Enter Salary"
                        className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none"
                        style={{ border: 'none', outline: 'none' }}
                      />
                      <div className="border-l border-[#DDDDDD] flex items-center relative">
                        <select
                          value={salaryPeriod}
                          onChange={(e) => setSalaryPeriod(e.target.value)}
                          className="px-3 py-2 text-sm text-gray-900 bg-transparent focus:outline-none cursor-pointer appearance-none pr-8"
                          style={{ border: 'none', outline: 'none', minWidth: '120px' }}
                        >
                          <option value="monthly">Monthly</option>
                          <option value="weekly">Weekly</option>
                          <option value="daily">Daily</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <Input
                    label="Home Address"
                    type="text"
                    placeholder="Enter your address"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Vehicle Insurance Number"
                    type="text"
                    placeholder="Enter vehicle insurance number"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Vehicle Type"
                    type="text"
                    placeholder="Select vehicle type"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />

                  {/* Row 3 */}
                  <Input
                    label="Vehicle Make Year"
                    type="text"
                    placeholder="2015"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Vehicle Make"
                    type="text"
                    placeholder="Hyundai"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="Vehicle Model"
                    type="text"
                    placeholder="Kona"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <Input
                    label="City"
                    type="text"
                    placeholder="Enter your city name"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />

                  {/* Row 4 */}
                  <Input
                    label="Postal Code"
                    type="text"
                    placeholder="Enter your zip code"
                    labelClassName="text-sm font-medium text-[#212121]"
                    className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#212121]">
                      Country
                    </label>
                    <Select
                      options={[
                        { value: "canada", label: "Canada" },
                        { value: "usa", label: "USA" },
                      ]}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Select your country"
                      className="border-[#DDDDDD] text-gray-900! rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#212121]">
                      Province
                    </label>
                    <Select
                      options={[
                        { value: "ontario", label: "Ontario" },
                        { value: "quebec", label: "Quebec" },
                      ]}
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Select province"
                      className="border-[#DDDDDD] text-gray-900! rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#212121]">
                      Criminal Record
                    </label>
                    <div className="flex gap-2 items-center ">
                      <label className="flex items-center gap-2 cursor-pointer border py-2! px-2 w-full rounded-sm border-[#DDDDDD]">
                        <input
                          type="radio"
                          name="criminalRecord"
                          value="yes"
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm font-medium text-[#212121]">
                          Yes
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer border py-2 px-2 w-full rounded-sm border-[#DDDDDD]">
                        <input
                          type="radio"
                          name="criminalRecord"
                          value="no"
                          defaultChecked
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm font-medium text-[#212121]">
                          No
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Working Area Section */}
                <div className="flex flex-col gap-2.5 mt-4">
                  <h2 className="text-base font-semibold text-[#212121]">
                    Working Area
                  </h2>

                  <div className="border border-[#C5C5C5] rounded-md p-3 flex flex-col gap-2.5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#212121]">
                        Area Code
                      </label>
                      <input
                        type="text"
                        placeholder="M2N 3X1"
                        className="w-full px-3 py-2 text-sm border border-[#D9D9D9] rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Map */}
                    <div className="w-full h-62.5 rounded-sm overflow-hidden bg-[#EEF1F4] border border-[#DDDDDD]">
                      {hasMapToken ? (
                        <div
                          ref={ownDriverMapContainerRef}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                          Map preview
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Area Code Section */}
                <div className="flex flex-col gap-2 p-3 rounded-md border border-[#C5C5C5]">
                  <div className="relative">
                    <label className="text-sm font-medium text-[#212121]">
                      Area Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Postal code"
                      className="w-full px-3 py-2 text-sm border border-[#D9D9D9] rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-0 text-white bg-red-500 rounded-full p-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Map */}
                  <div className="w-full h-62.5 rounded-sm overflow-hidden bg-[#EEF1F4] border border-[#DDDDDD]">
                    {hasMapToken ? (
                      <div
                        ref={secondAreaMapContainerRef}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        Map preview
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="text-start text-[13px] text-[#0066FF] font-semibold cursor-pointer flex gap-1 items-center"
                >
                  <Plus className="stroke-2 w-5 h-5" /> Add more...
                </button>

                {/* Personal Identification Section */}
                <div className="flex flex-col gap-3 mt-4">
                  <h2 className="text-base font-semibold text-[#212121]">
                    Personal Identification
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#212121]">
                      Upload Driver License (Front and back side)
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Front Side Upload */}
                    <div className="flex flex-col items-center justify-center border border-[#D9D9D9] rounded-sm px-8 py-12 bg-white hover:border-gray-400 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-[#D9D9D9]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              Select your file or drag and drop it here
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            Front side
                          </p>
                        </div>
                      </div>

                      {/* Back Side Upload */}
                      <div className="flex flex-col items-center justify-center border border-[#D9D9D9] rounded-sm px-8 py-12 bg-white hover:border-gray-400 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-[#D9D9D9]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              Select your file or drag and drop it here
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            Back side
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
