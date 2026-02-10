import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import DriverDirections from "./DriverDirections";
import Select from "../Select";

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

/**
 * Drawer showing rich delivery details. Opens from right to left when Share is clicked.
 */
const DeliveryDetailsDrawer = ({ open, onClose }) => {
  const driver = MOCK_DRIVER;
  const data = MOCK_ORDER;
  const [slideIn, setSlideIn] = useState(false);

  const formatTime = (value) => {
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
      setSlideIn(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setSlideIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer panel – slides in from right to left */}
      <div
        className="fixed right-0 top-0 w-full max-w-[480px] z-50 h-full flex justify-end pointer-events-none"
        aria-modal="true"
        role="dialog"
        aria-label="Delivery details"
      >
        <div
          className={`w-full h-full bg-white shadow-xl overflow-hidden border border-gray-200 flex flex-col pointer-events-auto transition-transform duration-300 ease-out ${
            slideIn ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
            <h2 className="text-lg font-bold text-gray-900">
              Order No: <span className="text-black">#{data.orderId}</span>
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
          <div className="flex-1 p-3 space-y-2.5 bg-[#f5f5f5] overflow-y-auto">
            {data && (
              <>
                {/* Top driver + actions card */}
                <div className="bg-white border border-gray-200 rounded-md p-3 space-y-2.5 shadow-sm">
                  <div className="items-center">
                    <div className="flex justify-between items-center gap-2">
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
                            compact
                            className="text-xs font-semibold text-gray-900 w-full truncate"
                          >
                            <option value={driver.fullName}>
                              {driver.fullName} {driver.lastName}
                            </option>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-sm bg-[#0066FF] flex items-center justify-center text-white shadow-sm"
                          >
                            <Icon
                              icon="mdi:message-outline"
                              className="w-5 h-5"
                            />
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-sm bg-[#FFB300] flex items-center justify-center text-white shadow-sm"
                          >
                            <Icon
                              icon="mdi:alert-circle-outline"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-700">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#D4FFDA] text-[#109F22] font-semibold text-[10px]">
                        Online
                      </span>
                      <Link
                        to={`/staffs/drivers/details/${driver._id}`}
                        className="inline-flex items-center gap-1 underline text-gray-800 font-medium"
                      >
                        <Icon icon="mdi:eye-outline" className="w-4 h-4" />
                        View Profile
                      </Link>
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        <Icon icon="mdi:cellphone" className="w-3 h-3" />
                        {driver.device}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="flex-1 min-w-[110px] rounded-sm bg-[#0066FF] text-white text-xs font-semibold py-2 shadow-sm"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      className="flex-1 min-w-[110px] rounded-sm bg-[#FF9800] text-white text-xs font-semibold py-2 shadow-sm"
                    >
                      Edit Order
                    </button>
                    <button
                      type="button"
                      className="flex-1 min-w-[130px] rounded-sm bg-[#F44336] text-white text-xs font-semibold py-2 shadow-sm"
                    >
                      Suspend Driver
                    </button>
                  </div>
                </div>

                {/* Client + order stats card */}
                <div className="bg-white border border-gray-200 rounded-md p-3 space-y-2 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <Link
                      to={`/clients/details/${data.client._id}`}
                      className="text-sm font-semibold text-[#0066FF] underline"
                    >
                      {data.client.fullName}
                    </Link>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs text-[#0066FF] font-semibold"
                    >
                      <Icon icon="mdi:phone" className="w-4 h-4" />
                      <span>{data.client.phone}</span>
                    </button>
                  </div>

                  <p className="text-xs text-gray-800">{data.address}</p>

                  <div className="grid grid-cols-2 gap-2 mt-1 text-left">
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[10px] text-gray-500">
                        Order Quantity
                      </p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">
                        {data.orderQuantity} Items
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[10px] text-gray-500">Order Amount</p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">
                        ${data.orderAmount.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[10px] text-gray-500">
                        Payment Method
                      </p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">
                        {data.paymentMethod}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-sm px-2.5 py-2">
                      <p className="text-[10px] text-gray-500">Order Type</p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">
                        {data.orderType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline card */}
                <div className="bg-white border border-gray-200 rounded-md p-4 text-left shadow-sm">
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
                      <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                        <Icon icon="mdi:check" className="w-5 h-5" />
                      </div>
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
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#F44336] rounded-sm hover:bg-red-600 shadow-sm"
                      onClick={() =>
                        console.log("Cancel order clicked (static demo)")
                      }
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>

                {/* Directions map */}
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
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
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-[#0066FF] text-white text-xs font-semibold shadow-sm"
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
