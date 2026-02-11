import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, CircleQuestionMark, Handshake, Image } from "lucide-react";
import Drawer from "../../../components/common/Drawer";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./AddDriver.css";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";
import ComplaintsDrawer from "./ComplaintsDrawer";
import CardImage from "../../../assets/images/card.png"

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined") {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const DETAILS_1 = [
  {
    title: "Driver Name",
    value: "David Doe",
  },
  {
    title: "Home Address",
    value: "156 Stewart St, Pickering, ON A1A 1A1",
  },
  {
    title: "Vehicle Make",
    value: "Brightdrop",
  },
  {
    title: "Country",
    value: "Canada",
  },
];

const DETAILS_2 = [
  {
    title: "Date of Birth",
    value: "01 Nov, 1985",
  },
  {
    title: "Vehicle Insurance Number",
    value: "VEH123456789INS1542",
  },
  {
    title: "Vehicle Model",
    value: "Zevo 600",
  },
  {
    title: "Province",
    value: "Ontario",
  },
];

const DETAILS_3 = [
  {
    title: "Phone Number",
    value: "+1 123 456 7890",
  },
  {
    title: "Vehicle Type",
    value: "Delivery Van",
  },
  {
    title: "City",
    value: "Pickering",
  },
  {
    title: "Criminal Record",
    value: "No",
  },
];

const DETAILS_4 = [
  {
    title: "Email Address",
    value: "daviddoe1985@gmail.com",
  },
  {
    title: "Vehicle Make Year",
    value: "2020",
  },
  {
    title: "Postal Code",
    value: "A1A 1A1",
  },
  {
    title: "Cannsell Certificate",
    value: "kjfdhjrdaghj",
  },
];

const H_CARD = [
  {
    title: "Delivery Pending",
    value: "1,000",
  },
  {
    title: "Delivery In-progress",
    value: "55",
  },
  {
    title: "Delivered",
    value: "9,825",
  },
  {
    title: "Delivery Cancelled",
    value: "20",
  },
  {
    title: "Rescheduled",
    value: "10",
  },
];

const CARD_DATA = [
  {
    title: "Total Deliveries",
    value: "2245",
  },
  {
    title: "Rate Per Delivery",
    value: "$10.00",
  },
  { title: "Hired By", value: "10 Stores" },
  {
    title: "Rating",
    value: "4.8",
  },
  {
    title: "Vehicle",
    value: "BrightDrop Zevo 600",
  },
];

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

const DriverDetailsDrawer = ({ isOpen, onClose, driver }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [period, setPeriod] = useState({ start: null, end: null });
  const [isHired, setIsHired] = useState(false);
  const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current || mapRef.current) return;
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
  }, [isOpen]);

  const hasMapToken =
    typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="w-[88vw] max-w-[100vw]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-gray-50">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="text-[#969696] h-5 w-5 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={onClose}
          />
          <div className="relative">
            <Image className="rounded-full border p-1 h-8 w-8" />
            <div className="bg-[#00B159] h-3 w-3 rounded-full absolute right-0 top-6"></div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-md  text-black">
              <span className="font-semibold">
                {driver?.driverName || "N/A"}
              </span>{" "}
              - Driver by Potrider
            </h2>
            <p className="text-md text-[#424143]">
              Delivery Areas - M2X 3X0, M2X 3X1, A1A 1A1
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2.5 text-sm ">
          <button
            type="button"
            onClick={() => setIsComplaintsOpen(true)}
            className="flex items-center cursor-pointer justify-center gap-1 bg-[#FF9800] font-semibold p-2.5 rounded-sm text-white h-10"
          >
            <CircleQuestionMark className="h-4 w-4" /> Complaints
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

      <div className="px-4 flex flex-col gap-2 overflow-y-auto flex-1 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ">
          {CARD_DATA.map((card) => (
            <FinanceSummaryCard
              key={card.title}
              title={card.title}
              value={card.value}
              change={card.change}
              isPositive={card.isPositive}
              className="border! border-[#F4F7FE]! bg-white! shadow-none! py-3! px-2.5! rounded-[5px]!"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {H_CARD.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border border-[#F4F7FE] p-4 rounded-[5px]"
            >
              <p className="text-[13px] font-semibold text-[#3F4753]">
                {card.title}
              </p>
              <span className="text-base font-semibold text-black">
                {card.value}
              </span>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-start pb-2.5 mb-2.5 border-b border-[#C5C5C5]">
            <h2 className="text-[#212121] text-lg font-semibold">
              Driver Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
            <img
              src={CardImage}
              alt="image-card"
              className="w-104.75 h-56 border border-[#C5C5C5] rounded-[10px]"
            />
            <img
              src={CardImage}
              alt="image-card"
              className="w-104.75 h-56 border border-[#C5C5C5] rounded-[10px]"
            />
            <img
              src={CardImage}
              alt="image-card"
              className="w-104.75 h-56 border border-[#C5C5C5] rounded-[10px]"
            />
            <img
              src={CardImage}
              alt="image-card"
              className="w-104.75 h-56 border border-[#C5C5C5] rounded-[10px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              {DETAILS_1.map((card, index) => (
                <div key={index} className="flex flex-col gap-1 text-[#212121]">
                  <p className="text-sm font-medium">{card.title}</p>
                  <h3 className="text-sm font-semibold">{card.value}</h3>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {DETAILS_2.map((card, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{card.title}</p>
                  <h3 className="text-sm font-semibold">{card.value}</h3>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {DETAILS_3.map((card, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{card.title}</p>
                  <h3 className="text-sm font-semibold">{card.value}</h3>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {DETAILS_4.map((card, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{card.title}</p>
                  <h3 className="text-sm font-semibold">{card.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-start pb-2.5 mb-2.5 border-b border-[#C5C5C5]">
            <h2 className="text-[#212121] text-lg font-semibold">
              Areas of Delivery
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-1.5 bg-[#0066FF] text-white text-sm font-medium rounded-full">
              M2N 3X1
            </span>
            <span className="px-4 py-1.5 bg-[#E8F1FF] text-[#5A5A5A] text-sm font-medium rounded-full">
              M2N 3X2
            </span>
            <span className="px-4 py-1.5 bg-[#E8F1FF] text-[#5A5A5A] text-sm font-medium rounded-full">
              M3N 3X0
            </span>
            <span className="px-4 py-1.5 bg-[#E8F1FF] text-[#5A5A5A] text-sm font-medium rounded-full">
              Z2N 4X0
            </span>
            <span className="px-4 py-1.5 bg-[#E8F1FF] text-[#5A5A5A] text-sm font-medium rounded-full">
              M2N 3X2
            </span>
            <span className="px-4 py-1.5 bg-[#E8F1FF] text-[#5A5A5A] text-sm font-medium rounded-full">
              Z2N 4X0
            </span>
            <span className="px-4 py-1.5 bg-[#E8F1FF] text-[#5A5A5A] text-sm font-medium rounded-full">
              M2N 3X2
            </span>
          </div>
          {/* Map */}
          <div className="w-full h-75 rounded-sm overflow-hidden bg-[#EEF1F4] mt-2.5">
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

      {/* Complaints Drawer */}
      <ComplaintsDrawer
        isOpen={isComplaintsOpen}
        onClose={() => setIsComplaintsOpen(false)}
        driverName={driver?.driverName}
      />
    </Drawer>
  );
};

export default DriverDetailsDrawer;
