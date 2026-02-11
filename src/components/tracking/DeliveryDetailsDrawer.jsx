import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import DriverDirections from "./DriverDirections";
import Select from "../Select";
import DeliveryChatDrawer from "./DeliveryChatDrawer";
import chatIcon from "../../assets/images/Button.png";
import alertIcon from "../../assets/images/Button (1).png";

const MOCK_DRIVER = {
  _id: "driver-1",
  fullName: "Vijay",
  lastName: "Kumar",
  avatar: "",
  device: "Samsung Galaxy 10",
  lat: 43.6532,
  lng: -79.3832,
  isOnline: true,
  hasAccess: true,
};

const MOCK_CLIENT = {
  _id: "client-1",
  fullName: "Ayfer Sonmez",
  phone: "+1 654-3233-455",
};

const MOCK_ORDER = {
  _id: "order-302012",
  orderId: "302012",
  status: "PROGRESS",
  createdAt: "2024-12-14T18:53:00Z",
  deliveryStarted: "2024-12-14T18:53:00Z",
  expectedDeliveryTime: "2024-12-14T20:12:00Z",
  ETAValue: 3,
  updatedTotalMinutes: 3,
  remainingMinutes: 1,
  ETADelay: 0,
  orderQuantity: 13,
  orderAmount: 1325.26,
  paymentMethod: "Cash on Delivery",
  orderType: "Same Day",
  address: "1725 Pure Springs Blvd., Pickering, ON L1X 0C4",
  receivedAmount: 0,
  unpaidCollection: 0,
  paidCollection: 0,
  updatedAt: "2024-12-14T18:53:00Z",
  isScheduled: false,
  deliveryDate: null,
  client: MOCK_CLIENT,
  driver: {
    fullName: MOCK_DRIVER.fullName,
    lastName: MOCK_DRIVER.lastName,
  },
};

// Mock list of drivers for dropdown
const MOCK_DRIVERS_LIST = [
  MOCK_DRIVER,
  {
    _id: "driver-2",
    fullName: "Sarah",
    lastName: "Connor",
    avatar: "https://i.pravatar.cc/150?u=driver-2",
    device: "iPhone 13 Pro",
    isOnline: true,
    hasAccess: true,
  },
  {
    _id: "driver-3",
    fullName: "John",
    lastName: "Doe",
    avatar: "https://i.pravatar.cc/150?u=driver-3",
    device: "Pixel 6",
    isOnline: false,
    hasAccess: true,
  },
  {
    _id: "driver-4",
    fullName: "Emily",
    lastName: "Blunt",
    avatar: "",
    device: "Samsung S21",
    isOnline: true,
    hasAccess: false,
  },
];

/**
 * Drawer showing rich delivery details. Opens from right to left when Share is clicked.
 */
const DeliveryDetailsDrawer = ({ open, onClose, defaultChatOpen = false }) => {
  const [driver, setDriver] = useState(MOCK_DRIVER);
  const data = MOCK_ORDER;
  const [slideIn, setSlideIn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Update local driver state if initial props change (optional/mock scenario)
  useEffect(() => {
    // In a real app, you might sync this with props or API data
  }, []);

  const handleDriverChange = (e) => {
    const selectedDriverId = e.target.value;
    const selectedDriver = MOCK_DRIVERS_LIST.find((d) => d._id === selectedDriverId);
    if (selectedDriver) {
      setDriver(selectedDriver);
    }
  };

  const formatTime = (value) => {
    // ... existing formatTime logic
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlideIn(false);
      // Initialize chat state based on defaultChatOpen prop
      setIsChatOpen(defaultChatOpen);

      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setSlideIn(true));
      });
      return () => cancelAnimationFrame(id);
    } else {
      // Reset chat state when main drawer closes
      setIsChatOpen(false);
    }
  }, [open, defaultChatOpen]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Nested Chat Drawer */}
      <DeliveryChatDrawer
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        driverName={`${driver.fullName} ${driver.lastName}`}
        avatar={driver.avatar}
        isOnline={driver.isOnline}
        eta={`${data.ETAValue} Min`}
        status="In-progress" // Mock status
        address={data.address}
        orderQuantity={data.orderQuantity}
        orderAmount={data.orderAmount}
        paymentMethod={data.paymentMethod}
        orderType={data.orderType}
        style={{
          right: '480px',
          borderRight: '1px solid #e5e7eb',
          zIndex: isChatOpen ? 50 : -1 // Ensure it sits behind when closed/closing
        }}
        hideBackdrop={true}
      />

      {/* Drawer panel – slides in from right to left */}
      <div
        className="fixed right-0 top-0 w-full max-w-[480px] z-50 h-full flex justify-end pointer-events-none"
        aria-modal="true"
        role="dialog"
        aria-label="Delivery details"
      >
        <div
          className={`w-full h-full bg-white shadow-xl overflow-hidden border border-gray-200 flex flex-col pointer-events-auto transition-transform duration-300 ease-out ${slideIn ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3  bg-white shrink-0">
            <h2 className="text-lg font-bold text-[#000] border-b border-[#000]">
              Order No: <span className="text-black ">#{data.orderId}</span>
            </h2>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-3 pt-0 space-y-2.5 bg-white overflow-y-auto">
            {data && (
              <>
                {/* Top driver + actions card */}
                <div className="bg-white border border-[#CECECE] rounded-md p-3 space-y-2.5 shadow-sm">
                  <div className="items-center">
                    <div className="flex justify-between items-center gap-2">
                      {/* ... driver avatar/select logic ... */}
                      <div className="flex justify-between items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-700">
                          {driver?.avatar ? (
                            <img
                              src={driver.avatar}
                              alt={driver.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>
                              {driver.fullName.charAt(0)}
                              {driver.lastName.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="">
                          <Select
                            options={MOCK_DRIVERS_LIST}
                            value={driver._id}
                            onChange={handleDriverChange}
                            getOptionValue={(opt) => opt._id}
                            getOptionLabel={(opt) => `${opt.fullName} ${opt.lastName}`}
                            getOptionMeta={(opt) => `${opt.isOnline ? "Online" : "Offline"} - ${opt.device}`}
                            getOptionImage={(opt) => opt.avatar}
                            compact
                            minWidth="200px"
                            className="text-xs font-semibold text-gray-900 w-[200px]"
                            placeholder="Select Driver"
                            searchPlaceholder="Search Driver..."
                            showSearch={true}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsChatOpen(prev => !prev)}
                            className="w-8 h-8 rounded-sm flex items-center justify-center transition-opacity hover:opacity-90"
                          >
                            <img src={chatIcon} alt="Chat" className="w-full h-full object-contain" />
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-sm flex items-center justify-center transition-opacity hover:opacity-90"
                          >
                            <img src={alertIcon} alt="Alert" className="w-full h-full object-contain" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* ... rest of component ... */}
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-700">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#D4FFDA] text-[#109F22] font-semibold text-[10px]">
                        Online
                      </span>
                      <Link
                        to={`/staffs/drivers/details/${driver._id}`}
                        className="inline-flex text-[13px] items-center gap-1 hover:underline text-[#000] font-semibold"
                      >
                        <Icon icon="mdi:eye-outline" className="w-4 h-4" />
                        View Profile
                      </Link>
                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#000]">
                        <Icon icon="mdi:cellphone" className="w-3 h-3" />
                        {driver.device}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* ... action buttons ... */}
                    <button
                      type="button"
                      className="flex-1 min-w-[110px] rounded-sm bg-[#0066FF] text-white text-sm font-medium py-2 shadow-sm"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      className="flex-1 min-w-[110px] rounded-sm bg-[#FF9800] text-white text-sm font-medium py-2 shadow-sm"
                    >
                      Edit Order
                    </button>
                    <button
                      type="button"
                      className="flex-1 min-w-[130px] rounded-sm bg-[#F44336] text-white text-sm font-medium py-2 shadow-sm"
                    >
                      Suspend Driver
                    </button>
                  </div>
                </div>

                {/* Client + order stats card */}
                {/* ... existing code ... */}
                <div className="bg-white border border-[#CECECE] rounded-md p-3 space-y-2 shadow-sm">
                  {/* ... contents ... */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <Link
                      to={`/clients/details/${data.client._id}`}
                      className="text-sm font-semibold text-[var(--color-secondary)] underline"
                    >
                      {data.client.fullName}
                    </Link>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs text-[var(--color-secondary)] font-semibold"
                    >
                      <Icon icon="mdi:phone" className="w-4 h-4" />
                      <span>{data.client.phone}</span>
                    </button>
                  </div>

                  <p className="text-xs font-medium text-[#3F4753]">{data.address}</p>

                  <div className="grid grid-cols-2 gap-2 mt-1 text-left">
                    {/* ... stats grid ... */}
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[13px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">
                        Order Quantity
                      </p>
                      <p className="text-sm font-semibold text-[#1e1e1e] mt-1 truncate">
                        {data.orderQuantity} Items
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[13px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">Order Amount</p>
                      <p className="text-sm font-semibold text-[#1e1e1e] mt-1 truncate">
                        ${data.orderAmount.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[13px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">
                        Payment Method
                      </p>
                      <p className="text-sm font-semibold text-[#1e1e1e] mt-1 truncate">
                        {data.paymentMethod}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[13px] font-medium text-[#1e1e1e] opacity-70 leading-[16px]">Order Type</p>
                      <p className="text-sm font-semibold text-[#1e1e1e] mt-1 truncate">
                        {data.orderType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline card */}
                {/* ... existing code ... */}
                <div className="bg-white border border-[#CECECE] rounded-md p-4 text-left shadow-sm">
                  {/* ... timeline contents ... */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center shrink-0 w-10">
                      <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                        <Icon
                          icon="mdi:package-variant-closed-check"
                          className="w-5 h-5"
                        />
                      </div>
                      <div
                        className="shrink-0"
                        style={{
                          width: 2,
                          height: 24,
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, #d1d5db 0, #d1d5db 4px, transparent 4px, transparent 8px)",
                        }}
                      />
                      <div className="w-3 h-3 rounded-full bg-[#FF9800] shrink-0" />
                      <div
                        className="shrink-0"
                        style={{
                          width: 2,
                          height: 24,
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, #d1d5db 0, #d1d5db 4px, transparent 4px, transparent 8px)",
                        }}
                      />
                      <button
                        type="button"
                        className="w-10 h-10 rounded-sm flex items-center justify-center transition-opacity hover:opacity-90"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                          <Icon icon="mdi:check" className="w-5 h-5" />
                        </div>
                      </button>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Delivery Started
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {formatTime(data.deliveryStarted)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          ETA{" "}
                          {data.ETAValue ??
                            data.updatedTotalMinutes ??
                            data.remainingMinutes ??
                            0}{" "}
                          Min
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Approximate Arrival
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {formatTime(data.expectedDeliveryTime)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-[#F44336] rounded-sm hover:bg-red-600 shadow-sm cursor-pointer"
                      onClick={() =>
                        console.log("Cancel order clicked (static demo)")
                      }
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>

                {/* Directions map */}
                <div className="bg-white border border-[#CECECE] rounded-md overflow-hidden shadow-sm">
                  <div className="pb-0">
                    <div className="relative w-full h-60 rounded-sm overflow-hidden">
                      <DriverDirections
                        mapId={`order-map-${data._id}`}
                        driver={{
                          lat: MOCK_DRIVER.lat ?? 43.6532,
                          lng: MOCK_DRIVER.lng ?? -79.3832,
                          fullName: driver.fullName,
                          lastName: driver.lastName,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-2 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2.5 py-2 rounded-sm bg-[#0066FF] text-white text-sm font-semibold shadow-sm"
                  >
                    <Icon icon="mdi:plus" className="w-4 h-4" />
                    <span>Create New Order</span>
                  </button>
                </div>
              </>
            )}

            {!data && (
              <div className="text-sm text-gray-500">
                No data available for this order.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryDetailsDrawer;
