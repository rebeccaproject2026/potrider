import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, Eye, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Select from "../../components/Select";
import DeliveryCard from "../../components/tracking/DeliveryCard";
import { Icon } from "@iconify/react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined") {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const PERIOD_OPTIONS = [
  { value: "this-month", label: "This Month" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last-week", label: "Last Week" },
  { value: "last-30", label: "Last 30 Days" },
];

const CITY_OPTIONS = [
  { value: "toronto", label: "Toronto" },
  { value: "oakville", label: "Oakville" },
  { value: "mississauga", label: "Mississauga" },
  { value: "brampton", label: "Brampton" },
];

const POSTAL_OPTIONS = [
  { value: "M5J 2N8", label: "M5J 2N8" },
  { value: "L6M 5R3", label: "L6M 5R3" },
  { value: "M6G 1K8", label: "M6G 1K8" },
];

const DRIVERS_OPTIONS = [
  { value: "all", label: "All Drivers" },
  { value: "olivia", label: "Olivia Smith" },
  { value: "james", label: "James Wilson" },
  { value: "emma", label: "Emma Brown" },
];

const CLIENTS_OPTIONS = [
  { value: "all", label: "All Clients" },
  { value: "c1", label: "Sarah H." },
  { value: "c2", label: "Khaled Dardar" },
  { value: "c3", label: "Keri Deacon" },
];

const ORDER_ID_OPTIONS = [
  { value: "", label: "Order Id" },
  { value: "1769737448", label: "1769737448" },
  { value: "1769828433", label: "1769828433" },
  { value: "1769222658", label: "1769222658" },
];

const SUMMARY_CARDS = [
  {
    key: "new",
    title: "New Orders",
    count: 25,
    value: "$20,235.99",
    trend: "+5%",
    trendUp: true,
    colorHex: "#109F22",
    bgLight: "bg-[#D4FFDA]",
    icon: "mdi:file-document-check-outline",
    iconClass: "fi-rr-clipboard-list",
  },
  {
    key: "delivered",
    title: "Delivered",
    count: 35,
    value: "$2,352.30",
    trend: "-8%",
    trendUp: false,
    colorHex: "#0066FF",
    bgLight: "bg-[#E3EEFF]",
    icon: "mdi:package-variant-closed-check",
    iconClass: "fi fi-rr-home",
  },
  {
    key: "processing",
    title: "Processing",
    count: 15,
    value: "$1,320.15",
    trend: "-10%",
    trendUp: false,
    colorHex: "#FF9800",
    bgLight: "bg-[#FFF5E5]",
    icon: "mdi:clock-outline",
    iconClass: "fi fi-rr-process",
  },
  {
    key: "cancelled",
    title: "Cancelled",
    count: 5,
    value: "$899.62",
    trend: "+10%",
    trendUp: true,
    colorHex: "#F44336",
    bgLight: "bg-[#FEECEB]",
    icon: "mdi:close-circle-outline",
  },
];

const STATUS_FILTERS = [
  { key: "pending", label: "Pending", color: "text-[#0066FF]", count: 9999 },
  {
    key: "in-progress",
    label: "In-progress",
    color: "text-[#FF9800]",
    count: 9999,
  },
  {
    key: "delivered",
    label: "Delivered",
    color: "text-[#109F22]",
    count: 9999,
  },
  {
    key: "cancelled",
    label: "Cancelled",
    color: "text-[#F44336]",
    count: 9999,
  },
];

const MOCK_DELIVERY_CARDS = [
  {
    id: "1",
    driverName: "Olivia Smith",
    isOnline: true,
    eta: "20 Jan 2025 at 11:00pm",
    status: "In-progress",
    address: "123 Main Street, Toronto, ON M5J 2N8",
    totalOrders: 19,
    breakdown: { pending: 10, inProgress: 4, delivered: 2, cancelled: 3 },
    position: { top: "12%", left: "18%" },
  },
  {
    id: "2",
    driverName: "James Wilson",
    isOnline: true,
    eta: "20 Jan 2025 at 10:30pm",
    status: "Pending",
    address: "456 Bayview Ave, Toronto, ON M4B 2N8",
    totalOrders: 8,
    breakdown: { pending: 5, inProgress: 2, delivered: 1, cancelled: 0 },
    position: { top: "35%", right: "22%", left: "auto" },
  },
  {
    id: "3",
    driverName: "Emma Brown",
    isOnline: false,
    eta: "20 Jan 2025 at 9:45pm",
    status: "Delivered",
    address: "789 Yonge St, Toronto, ON M4Y 2B6",
    totalOrders: 12,
    breakdown: { pending: 0, inProgress: 0, delivered: 11, cancelled: 1 },
    position: { bottom: "25%", left: "25%" },
  },
];

const MOCK_SHIPPING_DATA = {
  origin: [-79.3962, 43.6285], // Billy Bishop Toronto City Airport
  destination: [-75.6692, 45.3192], // Ottawa International Airport
  currentLocation: [-79.3962, 43.6285], // At Origin (Billy Bishop)
  route: [
    [-79.3962, 43.6285],
    [-75.6692, 45.3192]
  ],
  stats: {
    time: "55 min",
    cost: "₹19,701"
  }
};

/** Tracking table: Driver, Device, Order (multi-line), Quantity, Price, Order Status, Driver Status, ETA, Action */
const getTrackingTableColumns = (onView, onDelete) => [
  {
    accessorKey: "driver",
    header: "Driver",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "device",
    header: "Device",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "orderId",
    header: "Order",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="leading-tight text-[12px] text-[#3F4753]">
          <span className="block mb-0.5 font-medium text-[#3F4753] underline">
            #{row.orderId}
          </span>
          <Link
            to={`/customers/${row.customerId}`}
            className="block font-bold text-[#000] hover:text-blue-600 underline hover:no-underline"
          >
            {row.customer}
          </Link>
          <span className="block text-gray-500 text-[11px] mt-0.5">{row.address}</span>
          <span className="block text-gray-400 text-[11px] mt-0.5">{row.date} • {row.timeAgo}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: (info) => {
      const v = info.getValue();
      const pillClass =
        v === "Delivered"
          ? "bg-[#D4FFDA] text-[#109F22]"
          : v === "Pending"
            ? "bg-[#E3EEFF] text-[#0066FF]"
            : v === "In-progress" || v === "Processing"
              ? "bg-[#FFF5E5] text-[#FF9800]"
              : "bg-[#FEECEB] text-[#F44336]";
      return (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded text-[11px] font-semibold ${pillClass}`}
        >
          {v}
        </span>
      );
    },
  },
  {
    accessorKey: "driverStatus",
    header: "Driver Status",
    cell: (info) => {
      const v = String(info.getValue() || "").toLowerCase();
      const isOnline = v === "online";
      return (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded text-[11px] font-semibold ${isOnline
            ? "bg-[#D4FFDA] text-[#109F22]"
            : "bg-[#FEECEB] text-[#F44336]"
            }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      );
    },
  },
  {
    accessorKey: "eta",
    header: "ETA",
    cell: (info) => (
      <div className="text-[12px] text-[#3F4753]">
        <span className="block text-gray-500 text-[11px]">Approximate Arrival</span>
        <span className="block font-medium">{info.getValue()}</span>
      </div>
    ),
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell: (info) => (
      <div className="flex items-center gap-1 justify-end">
        <button
          type="button"
          onClick={() => onView?.(info.row.original)}
          className="p-1.5 text-[#0066FF] hover:bg-blue-50 rounded transition-colors"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(info.row.original)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const TRACKING_TABLE_DATA = [
  {
    id: "t1",
    orderId: "1235265412",
    customerId: "c1",
    driver: "John Doe",
    device: "23076RN4BI",
    customer: "Frank Nava",
    address: "5JRG+2QW, Gandhinagar, Gujarat, India",
    date: "Mon Aug 04 2025",
    timeAgo: "3 hours ago",
    quantity: "10 Units",
    price: "$100.00",
    orderStatus: "Pending",
    driverStatus: "online",
    eta: "07:23:57 PM",
  },
  {
    id: "t2",
    orderId: "1235265413",
    customerId: "c2",
    driver: "Jane Smith",
    device: "23076RN4BJ",
    customer: "Sarah H.",
    address: "1341 Kaniv St, Oakville, Ontario L6M5R3",
    date: "Tue Aug 05 2025",
    timeAgo: "1 hour ago",
    quantity: "5 Units",
    price: "$75.00",
    orderStatus: "Delivered",
    driverStatus: "online",
    eta: "06:15:00 PM",
  },
  {
    id: "t3",
    orderId: "1235265414",
    customerId: "c3",
    driver: "Mike Wilson",
    device: "23076RN4BK",
    customer: "Khaled Dardar",
    address: "51 Sixteen Mile Dr, Oakville L6M 0W3",
    date: "Tue Aug 05 2025",
    timeAgo: "2 hours ago",
    quantity: "2 Units",
    price: "$55.00",
    orderStatus: "In-progress",
    driverStatus: "offline",
    eta: "08:00:00 PM",
  },
];

const TRACKING_ORDER_STATUS_OPTIONS = [
  { value: "", label: "All Order Status" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In-Progress" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const Tracking = () => {
  const [period, setPeriod] = useState("this-month");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [drivers, setDrivers] = useState("");
  const [clients, setClients] = useState("");
  const [orderId, setOrderId] = useState("");
  const [mapView, setMapView] = useState("map");
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [tableSearch, setTableSearch] = useState("");
  const [tableOrderStatus, setTableOrderStatus] = useState("");
  const [tableDriverStatus, setTableDriverStatus] = useState("all");
  const [tablePagination, setTablePagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const handleTableView = useCallback(
    (row) => navigate(`/orders/${row.orderId}`),
    [navigate]
  );
  const handleTableDelete = useCallback((row) => {
    console.log("Delete tracking row:", row);
  }, []);
  const trackingColumns = useMemo(
    () => getTrackingTableColumns(handleTableView, handleTableDelete),
    [handleTableView, handleTableDelete]
  );

  const filteredTableData = useMemo(() => {
    let result = [...TRACKING_TABLE_DATA];
    if (tableOrderStatus) {
      result = result.filter(
        (row) =>
          String(row.orderStatus || "").toLowerCase() ===
          tableOrderStatus.toLowerCase()
      );
    }
    if (tableDriverStatus && tableDriverStatus !== "all") {
      result = result.filter(
        (row) =>
          String(row.driverStatus || "").toLowerCase() ===
          tableDriverStatus.toLowerCase()
      );
    }
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      result = result.filter(
        (row) =>
          String(row.orderId || "")
            .toLowerCase()
            .includes(q) ||
          String(row.driver || "")
            .toLowerCase()
            .includes(q) ||
          String(row.customer || "")
            .toLowerCase()
            .includes(q) ||
          String(row.address || "")
            .toLowerCase()
            .includes(q) ||
          String(row.device || "")
            .toLowerCase()
            .includes(q)
      );
    }
    return result;
  }, [tableSearch, tableOrderStatus, tableDriverStatus]);

  const trackingTable = useReactTable({
    data: filteredTableData,
    columns: trackingColumns,
    state: { pagination: tablePagination },
    onPaginationChange: setTablePagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 12,
      center: [-79.3832, 43.6532],
      style:
        mapView === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : "mapbox://styles/mapbox/light-v11",
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

  useEffect(() => {
    if (!mapRef.current) return;
    const style =
      mapView === "satellite"
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/light-v11";
    mapRef.current.setStyle(style);

    // Wait for style to load before re-adding layers
    mapRef.current.once('style.load', () => {
      // Trigger mode update to re-draw layers on new style
      const currentMode = deliveryMode;
      setDeliveryMode(null); // Force refresh
      setTimeout(() => setDeliveryMode(currentMode), 10);
    });
  }, [mapView]);

  // Handle Delivery vs Shipping Mode
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const drawShippingRoute = () => {
      // 1. Add Source
      if (!map.getSource('shipping-route')) {
        map.addSource('shipping-route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: MOCK_SHIPPING_DATA.route
            }
          }
        });
      }

      // 2. Add Line Layer
      if (!map.getLayer('shipping-line')) {
        map.addLayer({
          id: 'shipping-line',
          type: 'line',
          source: 'shipping-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#0066FF',
            'line-width': 4
          }
        });
      }

      // 3. Add Airplane Marker (Orange in White Circle)
      const el = document.createElement('div');
      el.className = 'shipping-marker-airplane';
      // Orange airplane icon
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9800" width="20" height="20"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" /></svg>';
      el.style.width = '36px';
      el.style.height = '36px';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.background = 'white';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      el.style.transform = 'rotate(45deg)'; // Tilt for effect
      el.style.zIndex = '10'; // On top of line

      new mapboxgl.Marker(el)
        .setLngLat(MOCK_SHIPPING_DATA.currentLocation)
        .addTo(map);

      // 4. Add Label Marker
      const labelEl = document.createElement('div');
      labelEl.className = 'shipping-marker-label';
      labelEl.innerHTML = `
        <div style="background: white; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.15); font-size: 11px; font-weight: 600; white-space: nowrap; display: flex; flex-direction: column; align-items: center;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span>✈ ${MOCK_SHIPPING_DATA.stats.time}</span>
          </div>
          <div style="font-size: 10px; color: #666; font-weight: 400;">
            from ${MOCK_SHIPPING_DATA.stats.cost}
          </div>
          <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid white;"></div>
        </div>
      `;
      new mapboxgl.Marker({ element: labelEl, anchor: 'bottom', offset: [0, -10] })
        .setLngLat(MOCK_SHIPPING_DATA.currentLocation)
        .addTo(map);

      // 5. Add Destination Marker (Blue Dot)
      const destEl = document.createElement('div');
      destEl.style.width = '12px';
      destEl.style.height = '12px';
      destEl.style.background = '#0066FF';
      destEl.style.borderRadius = '50%';
      destEl.style.border = '2px solid white';
      destEl.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.1)';

      new mapboxgl.Marker(destEl)
        .setLngLat(MOCK_SHIPPING_DATA.destination)
        .addTo(map);

      // Fit bounds
      const bounds = new mapboxgl.LngLatBounds();
      MOCK_SHIPPING_DATA.route.forEach(coord => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 50 });

      // 6. Add Origin Marker (Blue Dot)
      const originEl = document.createElement('div');
      originEl.style.width = '12px';
      originEl.style.height = '12px';
      originEl.style.background = '#0066FF';
      originEl.style.borderRadius = '50%';
      originEl.style.border = '2px solid white';
      originEl.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.1)';

      new mapboxgl.Marker(originEl)
        .setLngLat(MOCK_SHIPPING_DATA.origin)
        .addTo(map);
    };

    const clearShippingLayers = () => {
      if (map.getLayer('shipping-line')) map.removeLayer('shipping-line');
      if (map.getSource('shipping-route')) map.removeSource('shipping-route');
      // Remove markers by checking DOM elements (simple way for now since we didn't store refs)
      document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
    };

    if (deliveryMode === 'shipping') {
      clearShippingLayers(); // Clear anything existing first
      drawShippingRoute();
    } else {
      clearShippingLayers();
      // Restore default center if needed, or let user browse
      // Re-add delivery markers logic (if we had specific markers for delivery mode)
    }

  }, [deliveryMode]);

  const hasMapToken =
    typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  return (
    <div className="flex flex-col gap-2 min-h-0">
      <h1 className="text-lg font-semibold text-gray-900 sr-only">Tracking</h1>

      {/* Global filters – 6 dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          options={PERIOD_OPTIONS}
          placeholder="This Month"
          minWidth="120px"
        />
        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={CITY_OPTIONS}
          placeholder="City"
          minWidth="120px"
        />
        <Select
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          options={POSTAL_OPTIONS}
          placeholder="Postal Code"
          minWidth="120px"
        />
        <Select
          value={drivers}
          onChange={(e) => setDrivers(e.target.value)}
          options={DRIVERS_OPTIONS}
          placeholder="Drivers"
          minWidth="120px"
        />
        <Select
          value={clients}
          onChange={(e) => setClients(e.target.value)}
          options={CLIENTS_OPTIONS}
          placeholder="Clients"
          minWidth="120px"
        />
        <Select
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          options={ORDER_ID_OPTIONS}
          placeholder="Order Id"
          minWidth="120px"
        />
      </div>

      {/* Summary cards – same size and design as order page delivery card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 min-w-0">
        {SUMMARY_CARDS.map((card) => (
          <div
            key={card.key}
            className="bg-white rounded-sm border border-gray-200 p-3 flex items-center justify-between gap-3 min-w-0"
          >
            {/* Left – title, icon, View Products */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <p
                  className="text-[13px] font-semibold truncate mb-2"
                  style={{ color: card.colorHex }}
                >
                  {card.title} ({card.count})
                </p>
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${card.bgLight}`}
                >
                  {card.iconClass ? (
                    <i className={card.iconClass} style={{ color: card.colorHex, fontSize: "18px" }} aria-hidden="true" />
                  ) : (
                    <Icon icon="solar:documents-outline" width="18" height="18" color={card.colorHex} />
                  )}
                </div>
                <a
                  href="#"
                  className="text-[12px] text-[#3F4753] font-bold underline hover:underline mt-2 inline-block"
                >
                  View Products
                </a>
              </div>
            </div>
            {/* Right – amount, trend */}
            <div className="min-w-0 shrink-0">
              <p className="text-base font-bold text-gray-900 mb-0.5">
                {card.value}
              </p>
              <span
                className={`text-xs font-semibold flex justify-end ${card.trendUp ? "text-green-600" : "text-red-600"
                  }`}
              >
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Map section */}
      <div className="flex-1 min-h-[560px] flex flex-col bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        {/* Map container with overlays */}
        <div className="relative flex-1 min-h-[520px]">
          {/* Top Control Bar: Map Toggle | Status Cards | Delivery Toggle */}
          <div className="absolute top-1 left-4 right-4 z-10 flex items-start justify-between pointer-events-none">

            {/* Left: Map/Satellite */}
            <div className="flex items-center rounded bg-white shadow-sm border border-gray-200 pointer-events-auto h-9 overflow-hidden">
              <button
                type="button"
                onClick={() => setMapView("map")}
                className={`px-4 h-full text-sm font-bold transition-colors ${mapView === "map" ? "text-gray-900 bg-gray-50" : "text-gray-500 hover:bg-gray-50 font-medium"
                  }`}
              >
                Map
              </button>
              <div className="w-[1px] h-5 bg-gray-200"></div>
              <button
                type="button"
                onClick={() => setMapView("satellite")}
                className={`px-4 h-full text-sm font-medium transition-colors ${mapView === "satellite" ? "text-gray-900 bg-gray-50" : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                Satellite
              </button>
            </div>

            {/* Right Group: Status Counts + Delivery/Shipping */}
            <div className="flex items-center gap-0 min-w-0 justify-end">
              {/* Status Counts */}
              <div className="flex items-center gap-1 pointer-events-auto overflow-x-auto hide-scrollbar px-2 py-1">
                {STATUS_FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() =>
                      setActiveStatusFilter(
                        activeStatusFilter === filter.key ? null : filter.key
                      )
                    }
                    className={`flex items-center justify-between gap-4 px-2 py-1 bg-white rounded-sm shadow-sm border transition-all min-w-[160px] h-11 ${activeStatusFilter === filter.key
                      ? "ring-1 ring-gray-300 border-gray-300"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <span className={`text-[13px] font-semibold ${filter.color}`}>
                      {filter.label}
                    </span>
                    <span className="text-xl font-bold text-gray-900 leading-none">
                      {filter.count.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Delivery/Shipping */}
              <div className="flex items-center rounded-sm bg-white shadow-sm border-2 border-[#969696] pointer-events-auto h-10.5 overflow-hidden p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setDeliveryMode("delivery")}
                  className={`px-4 h-full text-sm font-semibold cursor-pointer rounded-[5px] transition-colors flex items-center ${deliveryMode === "delivery"
                    ? "bg-[#0066FF] text-white shadow-sm"
                    : "text-[#969696] hover:bg-gray-50 bg-transparent"
                    }`}
                >
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMode("shipping")}
                  className={`px-4 h-full text-sm font-medium cursor-pointer rounded-[5px] transition-colors flex items-center ${deliveryMode === "shipping"
                    ? "bg-[#0066FF] text-white shadow-sm"
                    : "text-[#969696] hover:bg-gray-50 bg-transparent"
                    }`}
                >
                  Shipping
                </button>
              </div>
            </div>
          </div>

          {/* Map or placeholder */}
          {hasMapToken ? (
            <div
              ref={mapContainerRef}
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              <span className="text-sm">
                Map (set VITE_MAPBOX_ACCESS_TOKEN to enable)
              </span>
            </div>
          )}

          {/* Delivery cards overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {MOCK_DELIVERY_CARDS.filter(card =>
                deliveryMode === 'delivery' ? true : card.driverName === 'Olivia Smith'
              ).map((card) => (
                <div
                  key={card.id}
                  className="absolute pointer-events-auto"
                  style={{
                    top: deliveryMode === 'shipping' ? 'auto' : card.position.top,
                    left: deliveryMode === 'shipping' ? '12%' : card.position.left,
                    right: deliveryMode === 'shipping' ? 'auto' : card.position.right,
                    bottom: deliveryMode === 'shipping' ? '15%' : card.position.bottom,
                  }}
                >
                  <DeliveryCard
                    driverName={card.driverName}
                    isOnline={card.isOnline}
                    eta={card.eta}
                    status={card.status}
                    address={card.address}
                    totalOrders={card.totalOrders}
                    breakdown={card.breakdown}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Left bottom: stacked buttons + speech-bubble label (matches reference) */}
          <div className="absolute bottom-4 left-3 z-10 flex items-start gap-3">
            {/* Left stack */}
            <div className="flex flex-col gap-3">
              {/* Online drivers icon button */}
              <button
                type="button"
                className="w-10 h-10 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center"
                aria-label="Online drivers"
              >
                <span className="w-10 h-10 rounded-full bg-[#D4FFDA] flex items-center justify-center">
                  <Icon icon="mdi:radar" className="w-5 h-5 text-gray-900" />
                </span>
              </button>

              {/* Secondary icon button */}
              <button
                type="button"
                className="w-10 h-10 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center"
                aria-label="Secondary"
              >
                <span className="w-10 h-10 rounded-full bg-[#FEECEB] flex items-center justify-center">
                  <Icon icon="mdi:radar" className="w-5 h-5 text-gray-900" />
                </span>
              </button>

              {/* Layers thumbnail button */}
              <button
                type="button"
                className="relative w-10 h-10 rounded-2xl overflow-hidden border border-gray-200 shadow-md"
                aria-label="Layers"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(6, 95, 70, 0.95) 0%, rgba(34, 197, 94, 0.35) 40%, rgba(180, 83, 9, 0.9) 100%)",
                  }}
                />
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.6),transparent_45%)]" />
                <div className="absolute left-2 bottom-2 flex items-center gap-1 text-white">
                  <Icon icon="mdi:layers-outline" className="w-4 h-4" />
                  <span className="text-[11px] font-medium">Layers</span>
                </div>
              </button>
            </div>

            {/* Speech bubble label aligned with first button */}
            <div className="relative mt-2 bg-white rounded-xl border border-gray-200 shadow-md px-4 py-2">
              <span
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white drop-shadow-[0_0_1px_rgba(0,0,0,0.2)]"
                aria-hidden
              />
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium text-gray-900">
                  Online Drivers
                </span>
                <span className="text-sm font-bold text-gray-900">925</span>
              </div>
            </div>
          </div>

          {/* Zoom controls – bottom right (only when map is active, mapbox adds its own; we add custom for placeholder) */}
          {!hasMapToken && (
            <div className="absolute bottom-4 right-3 z-10 flex flex-col rounded-md overflow-hidden border border-gray-200 bg-white shadow-sm">
              <button
                type="button"
                className="p-2 border-b border-gray-100 hover:bg-gray-50 text-gray-600"
                aria-label="Zoom in"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-50 text-gray-600"
                aria-label="Zoom out"
              >
                <Icon icon="mdi:minus" className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tracking table – below map: single row (search | Order Status | All/Online/Offline) + table */}
      <div className="min-w-0 shrink-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        {/* Single row: Search | All Order Status | All/Online/Offline tabs */}
        <div className="shrink-0 p-3 min-w-0">
          <div className="grid grid-cols-3 gap-2">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="search-input w-full pl-9 pr-4 py-2.5 text-[15px] border border-gray-300 rounded-sm bg-white focus:outline-none shadow-none h-full"
              />
            </div>
            <div className="min-w-0">
              <Select
                value={tableOrderStatus}
                onChange={(e) => setTableOrderStatus(e.target.value)}
                options={TRACKING_ORDER_STATUS_OPTIONS}
                placeholder="All Order Status"
                minWidth="100%"
              />
            </div>
            <div className="flex items-center rounded-sm border border-[#969696] bg-white p-1 min-w-0 h-[45.5px]">
              {["all", "online", "offline"].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTableDriverStatus(key)}
                  className={`flex-1 px-4 h-full text-sm font-semibold rounded-sm cursor-pointer transition-colors ${tableDriverStatus === key
                    ? "bg-[#0066FF] text-white shadow-sm"
                    : "text-[#969696] hover:bg-gray-50 bg-transparent"
                    }`}
                >
                  {key === "all"
                    ? "All"
                    : key === "online"
                      ? "Online"
                      : "Offline"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="order-list-table-table-container overflow-x-auto">
          <table className="order-list-table table w-full min-w-[1100px] border-collapse">
            <thead className="bg-[#ffffff] border-b border-gray-200 sticky top-0 z-10">
              {trackingTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-2 py-2 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap ${header.column.id === "action"
                        ? "text-center"
                        : "text-left"
                        }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {trackingTable.getRowModel().rows.length > 0 ? (
                trackingTable.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-2 py-2 text-[12px] text-[#3F4753] align-middle ${cell.column.id === "action"
                          ? "text-right whitespace-nowrap"
                          : ""
                          }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={trackingTable.getAllColumns().length}
                    className="px-4 py-8 text-center text-gray-500 text-[12px]"
                  >
                    No tracking records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50">
          <div className="text-[12px] text-gray-600 order-2 sm:order-1">
            Showing{" "}
            {trackingTable.getState().pagination.pageIndex *
              trackingTable.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (trackingTable.getState().pagination.pageIndex + 1) *
              trackingTable.getState().pagination.pageSize,
              filteredTableData.length
            )}{" "}
            of {filteredTableData.length} results
          </div>
          <div className="flex items-center gap-1 order-1 sm:order-2">
            <button
              type="button"
              onClick={() => trackingTable.firstPage()}
              disabled={!trackingTable.getCanPreviousPage()}
              className="px-2 py-1 text-[12px] border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              type="button"
              onClick={() => trackingTable.previousPage()}
              disabled={!trackingTable.getCanPreviousPage()}
              className="p-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from(
              { length: trackingTable.getPageCount() },
              (_, i) => i + 1
            )
              .filter((p) => {
                const current =
                  trackingTable.getState().pagination.pageIndex + 1;
                return (
                  p === 1 ||
                  p === trackingTable.getPageCount() ||
                  (p >= current - 2 && p <= current + 2)
                );
              })
              .map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => trackingTable.setPageIndex(pageNum - 1)}
                  className={`min-w-[28px] px-1.5 py-1 text-[12px] rounded ${trackingTable.getState().pagination.pageIndex + 1 ===
                    pageNum
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            <button
              onClick={() => trackingTable.nextPage()}
              disabled={!trackingTable.getCanNextPage()}
              className="p-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => trackingTable.lastPage()}
              disabled={!trackingTable.getCanNextPage()}
              className="px-2 py-1 text-[12px] border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
