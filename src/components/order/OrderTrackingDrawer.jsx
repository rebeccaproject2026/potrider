import { useState, useEffect, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";

// Delivery process steps (order matters)
const DELIVERY_STEPS = [
  { key: "Ordered", label: "Ordered", description: "Order is in Ordered stage" },
  { key: "Packed", label: "Packed", description: "Order is in Packed stage" },
  { key: "Out For Delivery", label: "Out For Delivery", description: "Order is in Out For Delivery stage" },
  { key: "Delivered", label: "Delivered", description: "Order is in Delivered stage" },
];
const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Ordered: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-600",
};

const OrderTrackingDrawer = ({ isOpen, onClose, selectedOrder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stepChecked, setStepChecked] = useState({});
  const [saving, setSaving] = useState(false);

  // Get initial step checked state based on order status
  const getInitialStepChecked = useCallback((status) => {
    const idx = DELIVERY_STEPS.findIndex((s) => s.key === status);
    const i = idx >= 0 ? idx : 0;
    const initial = {};
    DELIVERY_STEPS.forEach((s, j) => {
      initial[s.key] = j <= i;
    });
    return initial;
  }, []);

  // Initialize step checked state when order changes
  useEffect(() => {
    if (selectedOrder) {
      const status = selectedOrder.deliveryStatus || selectedOrder.currentStatus || "Ordered";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStepChecked(getInitialStepChecked(status));
    }
  }, [selectedOrder, getInitialStepChecked]);

  // Handle drawer visibility animation
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Handle step change
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

  // Check if a step is disabled (can't skip steps)
  const isStepDisabled = useCallback((stepKey) => {
    const idx = DELIVERY_STEPS.findIndex((s) => s.key === stepKey);
    if (idx === 0) return false;
    return !stepChecked[DELIVERY_STEPS[idx - 1].key];
  }, [stepChecked]);

  // Handle save changes
  const handleSaveChanges = useCallback(() => {
    setSaving(true);
    // let lastChecked = null;
    for (let i = DELIVERY_STEPS.length - 1; i >= 0; i--) {
      if (stepChecked[DELIVERY_STEPS[i].key]) {

        // lastChecked = DELIVERY_STEPS[i].key;
        break;
      }
    }
    // TODO: API call - update_order_status with orderId and lastChecked
    setTimeout(() => {
      setSaving(false);
      // showToast('Order updated successfully');
      onClose();
    }, 500);
  }, [stepChecked, onClose]);

  // Handle cancel order
  const handleCancelOrder = useCallback(() => {
    // TODO: API call - update_order_status to Cancelled
    onClose();
  }, [onClose]);

  // Get order data
  const order = useMemo(() => {
    if (!selectedOrder) return null;
    return {
      orderId: selectedOrder.orderId || "—",
      clientName: selectedOrder.customer || selectedOrder.clientName || "—",
      currentStatus: selectedOrder.deliveryStatus || selectedOrder.currentStatus || "Ordered",
      completedAt: selectedOrder.completedAt || null,
    };
  }, [selectedOrder]);

  if (!isOpen || !order) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[35%] max-w-[400px] min-w-[350px] bg-white z-50 shadow-xl transition-transform duration-300 ease-out flex flex-col ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-tracking-title"
      >
        {/* Header */}
        <div className="bg-[var(--color-secondary)] text-white px-2.5 py-2 flex justify-between items-center shrink-0">
          <h3 id="order-tracking-title" className="text-base font-semibold">
            Order Tracking
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">
                Order #{order.orderId}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Customer: {order.clientName?.replace(/\.$/, "")}
              </div>
            </div>
            <span
              className={`inline-flex px-1.5 py-0.5 rounded-full text-xs font-medium
    ${STATUS_STYLES[order.currentStatus] || "bg-gray-100 text-gray-600"}
  `}
            >
              {order.currentStatus}
            </span>
          </div>
          {/* Delivery Process Section */}
          <div className="p-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Delivery Process
            </h4>
            <div className="relative">
              {DELIVERY_STEPS.map((step) => {
                const isCompleted = stepChecked[step.key];
                const isDisabled = isStepDisabled(step.key);

                return (
                  <div
                    key={step.key}
                    className="relative flex items-start gap-3 pb-6 last:pb-0"
                  >
                    {/* Circle */}
                    <div className="relative z-10 mt-0.5">
                      <button
                        disabled={isDisabled}
                        onClick={() => handleStepChange(step.key, !isCompleted)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center border
                ${isCompleted
                            ? "bg-[var(--color-primary)] border-green-600"
                            : "bg-white border-gray-300"
                          }
                ${!isDisabled ? "cursor-pointer" : "cursor-not-allowed"}
              `}
                      >
                        {isCompleted && (
                          <Icon
                            icon="mdi:check"
                            className="text-white w-4 h-4"
                          />
                        )}
                      </button>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="text-[13px] mb-0.5 font-semibold text-gray-900">
                        {step.label}
                      </div>

                      <div className="text-[11.5px]  text-gray-500">
                        {step.description}
                      </div>

                      {/* Completed time (only for completed Ordered in screenshot) */}
                      {isCompleted &&
                        step.key === "Ordered" &&
                        selectedOrder?.date && (
                          <div className="text-xs text-[var(--color-primary)] flex items-center gap-1 mt-1">
                            <Icon
                              icon="mdi:check-circle"
                              className="w-3 h-3"
                            />
                            Completed on {selectedOrder.date}
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-3 pt-4 flex flex-wrap justify-end gap-2 border-t border-gray-200 shrink-0">
            <button
              type="button"
              onClick={handleCancelOrder}
              className="inline-flex items-center gap-2 px-3 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-sm hover:bg-red-700 transition-colors"
            >
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              Cancel Order
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saving}
              className="inline-flex items-center gap-2 px-3 py-2.5 bg-[var(--color-secondary)] text-white text-sm font-semibold rounded-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrackingDrawer;
