import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowUp } from "lucide-react";
import Input from "../../components/Input";
import Select from "../../components/Select";
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
import { getDriversColumns, getDriversData, DriversDataWithDrawer } from "./driversData";

const AddDriver = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

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
  const [driverAddress, setDriverAddress] = useState("");

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
      "bottom-right"
    );

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const hasMapToken =
    typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 bg-gray-100 overflow-y-auto">
      <div className="flex-1 full-width w-full flex flex-col">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-2.5 flex-1 min-h-0 flex flex-col w-full max-w-none">
          {/* Tab Navigation */}
          <div className="flex items-center w-full rounded-sm bg-white border border-[#CFCFCF] h-[42px] p-[2px] mb-2">
            <button
              type="button"
              onClick={() => setActiveTab("portrider")}
              className={`flex-1 h-full text-sm font-semibold transition-all rounded-sm
      ${activeTab === "portrider"
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
      ${activeTab === "own"
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
                  <div className="w-full h-[300px] rounded-sm overflow-hidden bg-[#EEF1F4]">
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
                      className={`px-3 py-2.5 text-sm font-medium rounded-sm transition-colors border ${hireDuration === "day"
                        ? "border-[#969696] bg-white text-gray-900"
                        : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      Day
                    </button>
                    <button
                      type="button"
                      onClick={() => setHireDuration("week")}
                      className={`px-3 py-2.5 text-sm  font-medium rounded-sm transition-colors border ${hireDuration === "week"
                        ? "border-[#969696] bg-white text-gray-900"
                        : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      Week
                    </button>
                    <button
                      type="button"
                      onClick={() => setHireDuration("month")}
                      className={`px-3 py-2.5 text-sm  font-medium rounded-sm transition-colors border ${hireDuration === "month"
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
                      className={`px-3 py-2.5 text-sm  font-medium rounded-sm transition-colors border ${hireDuration === "year"
                        ? "border-[#969696] bg-white text-gray-900"
                        : "border-[#969696] bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      Year
                    </button>
                    <button
                      type="button"
                      onClick={() => setHireDuration("custom-duration")}
                      className={`px-3 py-2.5 text-sm font-semibold rounded-sm transition-colors ${hireDuration === "custom-duration"
                        ? "bg-[#0066FF] text-white shadow-sm"
                        : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      Custom Duration {hireDuration === "custom-duration" && "✓"}
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
                      <div className="absolute -top-[5px] left-[60%] w-4 h-4 bg-[#1FAE3D] rounded-full border-2 border-white shadow" />
                    </div>

                    <div className="flex justify-between text-sm font-semibold text-[#1F1F1F] mt-3">
                      <span>2</span><span>4</span><span>6</span><span>8</span><span>10</span>
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
                      <div className="absolute -top-[5px] left-[60%] w-4 h-4 bg-[#1FAE3D] rounded-full border-2 border-white shadow" />
                    </div>

                    <div className="flex justify-between text-sm font-semibold text-[#1F1F1F] mt-3">
                      <span>4</span><span>8</span><span>12</span><span>16</span><span>20</span>
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

                    <p className="text-sm text-[#000] italic text-right mt-3">
                      If actual delivery is outside of area radius it will be charge at $0.69 per km
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
                      columns={getDriversColumns(onView, onHire, onViewAreaCodes)}
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
            <div className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-[#212121] mb-1">
                Driver Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Driver Name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="Enter driver name"
                  labelClassName="font-medium text-[#212121]"
                  className="border-[#DDDDDD] rounded-sm"
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={driverEmail}
                  onChange={(e) => setDriverEmail(e.target.value)}
                  placeholder="Enter email address"
                  labelClassName="font-medium text-[#212121]"
                  className="border-[#DDDDDD] rounded-sm"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="Enter phone number"
                  labelClassName="font-medium text-[#212121]"
                  className="border-[#DDDDDD] rounded-sm"
                />
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#212121] mb-0.5">
                    Address
                  </label>
                  <textarea
                    value={driverAddress}
                    onChange={(e) => setDriverAddress(e.target.value)}
                    placeholder="Enter driver address"
                    rows={3}
                    className="w-full px-3 py-4.5 text-sm border border-[#DDDDDD] rounded-sm bg-white font-medium placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 mt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-400 text-[#212121] rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-[#212121]" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-(--color-primary) text-white rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              Save Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
