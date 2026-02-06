/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useCallback, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, X, Save, Check } from "lucide-react";
import { Icon } from "@iconify/react";

// Delivery process steps (order matters)
const DELIVERY_STEPS = [
  { key: "Ordered", label: "Ordered", description: "Order is in Ordered stage" },
  { key: "Packed", label: "Packed", description: "Order is in Packed stage" },
  { key: "Out For Delivery", label: "Out For Delivery", description: "Order is in Out For Delivery stage" },
  { key: "Delivered", label: "Delivered", description: "Order is in Delivered stage" },
];

// Static order details for display (keyed by orderId; fallback for any order)
const getOrderDetailsByOrderId = (orderId) => {
  const staticDetails = {
    "1769737448": {
      orderId: "1769737448",
      date: "Jan 29, 2026 08:44 PM",
      items: [
        { name: "Fruity Pebbles OG", qty: "1/2 OZ", items: 1, price: "$55.00", total: "$55.00", image: "" },
        { name: "Super Silver Haze", qty: "1/2 OZ", items: 1, price: "$55.00", total: "$55.00", image: "" },
      ],
      subtotalItems: "2 Items",
      subtotalAmount: "$110.00",
      promocode: "NEW15",
      discount: "$16.50",
      cheetahCash: "Did not Redeem",
      deliveryFee: "$10.00",
      total: "$105.00",
      paymentMethod: "e-transfer",
      paymentStatus: "Pending",
      orderType: "Delivery",
      clientName: "Sarah H.",
      clientPhone: "(647) 355-4103",
      clientEmail: "sarrakechh@gmail.com",
      deliveryAddress: "1341 Kaniv St Oakville, Ontario L6M5R3",
      currentStatus: "Ordered",
      completedAt: "January 29, 2026, 8:44 PM",
    },
  };
  return (
    staticDetails[orderId] || {
      orderId: orderId || "—",
      date: "—",
      items: [
        { name: "Sample Product", qty: "1", items: 1, price: "$0.00", total: "$0.00", image: "" },
      ],
      subtotalItems: "1 Item",
      subtotalAmount: "$0.00",
      promocode: "—",
      discount: "$0.00",
      cheetahCash: "Did not Redeem",
      deliveryFee: "$0.00",
      total: "$0.00",
      paymentMethod: "—",
      paymentStatus: "Pending",
      orderType: "Delivery",
      clientName: "—",
      clientPhone: "—",
      clientEmail: "—",
      deliveryAddress: "—",
      currentStatus: "Ordered",
      completedAt: "—",
    }
  );
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = useMemo(
    () => getOrderDetailsByOrderId(orderId),
    [orderId]
  );

  const [trackingOpen, setTrackingOpen] = useState(false);
  const getInitialStepChecked = useCallback((status) => {
    const idx = DELIVERY_STEPS.findIndex((s) => s.key === status);
    const i = idx >= 0 ? idx : 0;
    const initial = {};
    DELIVERY_STEPS.forEach((s, j) => {
      initial[s.key] = j <= i;
    });
    return initial;
  }, []);

  const [stepChecked, setStepChecked] = useState(() => getInitialStepChecked(order.currentStatus));

  useEffect(() => {
    setStepChecked(getInitialStepChecked(order.currentStatus));
  }, [orderId, order.currentStatus, getInitialStepChecked]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleStepChange = useCallback((stepKey, checked) => {
    setStepChecked((prev) => {
      const next = { ...prev };
      const idx = DELIVERY_STEPS.findIndex((s) => s.key === stepKey);
      if (checked) {
        for (let i = 0; i <= idx; i++) next[DELIVERY_STEPS[i].key] = true;
      } else {
        for (let i = idx; i < DELIVERY_STEPS.length; i++) next[DELIVERY_STEPS[i].key] = false;
      }
      return next;
    });
  }, []);

  const handleSaveChanges = useCallback(() => {
    setSaving(true);
    let lastChecked = null;
    for (let i = DELIVERY_STEPS.length - 1; i >= 0; i--) {
      if (stepChecked[DELIVERY_STEPS[i].key]) {
        lastChecked = DELIVERY_STEPS[i].key;
        break;
      }
    }
    // TODO: API call - update_order_status with orderId and lastChecked
    setTimeout(() => {
      setSaving(false);
      // showToast('Order updated successfully');
    }, 500);
  }, [stepChecked]);

  const handleCancelOrder = useCallback(() => {
    // TODO: API call - update_order_status to Cancelled
    navigate("/orders");
  }, [navigate]);

  const handleDeleteOrder = useCallback(() => {
    setShowDeleteModal(false);
    // TODO: API call - delete order
    navigate("/orders");
  }, [navigate]);

  const isStepDisabled = (stepKey) => stepKey === "Ordered";

  return (
    <div className="min-w-0 max-w-full  overflow-x-hidden">
      {/* <h1 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h1> */}

      <div className="order-details-cols flex flex-col xl:flex-row gap-4">
        {/* Left column - Order summary */}
        <div className="order-details-col-left flex-1 min-w-0 bg-white rounded-sm border border-gray-200 p-3 md:p-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
            <div>
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Link to="/orders" className="text-gray-600 hover:text-gray-900">
                  <Icon icon="material-symbols:arrow-left-alt-rounded" className="w-6 h-6 " />
                </Link>

                Order Number: {order.orderId}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Date: {order.date}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-1 px-3 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-sm hover:bg-red-700"
            >
              <Icon icon="mdi:trash-can" className="w-5 h-5" />

              Delete Order
            </button>
          </div>
          <hr className="my-3 border-gray-200" />

          {/* Ordered items */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center gap-2 py-3 border-b border-gray-100 last:border-0"
            >
              <div className="w-14 h-14 rounded-sm bg-gray-100 shrink-0 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    —
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="text-base font-semibold text-[#000] underline">
                  {item.name}
                </a>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <div className="flex gap-12 text-sm">
                <span className="text-gray-600">
                  Items<br />
                  <span className="font-medium flex justify-center text-gray-900">{item.items}</span>
                </span>
                <span className="text-gray-600">
                  Price<br />
                  <span className="font-medium text-sm text-gray-900">{item.price}</span>
                </span>
                <span className="text-gray-600">
                  Total<br />
                  <span className="font-medium text-gray-900">{item.total}</span>
                </span>
              </div>
            </div>
          ))}

          <hr className="my-3 border-gray-200" />
          <div className="space-y-1 text-sm ">
            <div className="flex justify-between items-center mb-2">
              <strong>Subtotal</strong>
              <div className="flex gap-10">
                <span className="font-semibold">{order.subtotalItems}</span>
                <span className="font-semibold">{order.subtotalAmount}</span>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <strong>Promocode</strong>
              <span>{order.promocode}</span>
            </div>
            <div className="flex justify-between mb-2">
              <strong>Discount</strong>
              <span>{order.discount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <strong>Cheetah CA$H</strong>
              <span>{order.cheetahCash}</span>
            </div>
            <div className="flex justify-between mb-2">
              <strong>Delivery Fee</strong>
              <span>{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold ">
              <strong>Total</strong>
              <span>{order.total}</span>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <strong>Payment Method</strong>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <strong>Payment Status</strong>
              <span
                className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${order.paymentStatus === "Pending"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
                  }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <strong>Order Type</strong>
              <span>{order.orderType}</span>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />
          <p className="text-sm font-semibold text-gray-900 mb-1">Delivery Address & Client Info</p>
          <p className="text-sm text-gray-700">
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              {order.clientName} - {order.clientPhone}
            </a>
            <br />
            {order.clientEmail}
            <br />
            {order.deliveryAddress}
          </p>
        </div>

        {/* Right column - Order Tracking (fixed slide-in on mobile when open) */}
        <div
          className={`order-details-col-right shrink-0 w-full xl:max-w-[380px] bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden ${trackingOpen ? "order-details-tracking-open block" : "hidden"
            } xl:block`}
        >
          <div className="bg-[var(--color-secondary)] text-white px-2.5 py-2 flex justify-between items-center shrink-0">
            <h3 className="text-lg font-semibold">Order Tracking</h3>
            <button
              type="button"
              onClick={() => setTrackingOpen(false)}
              className="xl:hidden p-1 hover:bg-white/20 rounded"
              aria-label="Close"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>
          </div>
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">
                Order #{order.orderId}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Customer: {order.clientName?.replace(/\.$/, "")}
              </div>
            </div>
            <span className="inline-flex px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#E3EEFF] text-[#0066FF]">
              {order.currentStatus}
            </span>
          </div>
          <div className="p-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Delivery Process</h4>
            <div className="relative ">
              {/* <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gray-200" /> */}
              {DELIVERY_STEPS.map((step, idx) => (
                <div key={step.key} className="relative flex items-start gap-3 pb-4 last:pb-0">
                  <div className="relative z-10 flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      id={`step-${step.key}`}
                      checked={!!stepChecked[step.key]}
                      disabled={isStepDisabled(step.key)}
                      onChange={(e) => handleStepChange(step.key, e.target.checked)}
                      className="order-details-custom-checkbox"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor={`step-${step.key}`}
                      className="text-sm font-semibold text-gray-900 cursor-pointer block"
                    >
                      {step.label}:
                    </label>
                    <p className="text-sm text-gray-500">{step.description}</p>
                    {stepChecked[step.key] && step.key === "Ordered" && order.completedAt && (
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <Icon icon="mdi:check-circle-outline" className="w-3 h-3" />
                        Completed on {order.completedAt}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 pt-4 flex flex-wrap justify-end gap-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancelOrder}
              className="inline-flex items-center gap-2 px-3 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-sm hover:bg-red-700"
            >
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              Cancel Order
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saving}
              className="inline-flex items-center gap-2 px-3 py-2.5 bg-[var(--color-secondary)] text-white text-sm font-semibold rounded-sm hover:bg-blue-700 disabled:opacity-50"
            >
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: button to open tracking (hidden when panel is open) */}
      {!trackingOpen && (
        <div className="xl:hidden mt-4">
          <button
            type="button"
            onClick={() => setTrackingOpen(true)}
            className="w-full py-2 bg-[#0066FF] text-white font-medium rounded-lg"
          >
            Open Order Tracking
          </button>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-xl shadow-xl p-4">
            <h5 className="text-lg font-semibold text-gray-900">Confirm Delete</h5>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* Backdrop for mobile tracking */}
      {trackingOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 xl:hidden"
          onClick={() => setTrackingOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderDetails;
