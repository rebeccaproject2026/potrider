/**
 * Reusable Past Order card – displays a single past order with header, status, details grid, and actions.
 * @param {Object} props
 * @param {Object} props.order - Past order object with orderId, orderDate, status, statusVariant, and detail fields
 */
const PastOrderCard = ({ order }) => {
  const statusClass =
    order.statusVariant === "delivered"
      ? "bg-[#D4FFDA] text-[#109F22]"
      : order.statusVariant === "cancelled"
        ? "bg-[#FEECEB] text-[#F44336]"
        : order.statusVariant === "ordered" || order.statusVariant === "packed"
          ? "bg-[#FFF5E5] text-[#FF9800]"
          : "bg-[#E3EEFF] text-[#0066FF]"; // Default or other statuses

  return (
    <div className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm mb-4">
      <div className="bg-[#212529] text-white px-3 py-2.5 rounded-t-sm">
        <span className="font-medium text-sm">Order #{order.orderId}</span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-xs text-gray-500">Order Date: {order.orderDate}</p>
          <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold shrink-0 ${statusClass}`}>
            {order.status}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-sm mb-4">
          {/* Row 1: four sets in one line */}
          <div className="block">
            <span className="font-semibold text-gray-900 block">Total Products</span>
            <span className="text-gray-700 block mt-0.5">{order.totalProducts}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">Product Price</span>
            <span className="text-gray-700 block mt-0.5">{order.productPrice}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">Coupon</span>
            <span className="text-gray-700 block mt-0.5">{order.coupon}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">CHEETAH CA$H Redeemed</span>
            <span className="text-gray-700 block mt-0.5">{order.cheetahCashRedeemed}</span>
          </div>
          {/* Row 2: four sets in one line */}
          <div className="block">
            <span className="font-semibold text-gray-900 block">Delivery Fee</span>
            <span className="text-gray-700 block mt-0.5">{order.deliveryFee}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">Total Price</span>
            <span className="text-gray-700 block mt-0.5">{order.totalPrice}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">Order Type</span>
            <span className="text-gray-700 block mt-0.5">{order.orderType}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">Order Method</span>
            <span className="text-gray-700 block mt-0.5">{order.orderMethod}</span>
          </div>
          {/* Row 3: three sets (Payment Method, Payment Status, Transaction Id) */}
          <div className="block">
            <span className="font-semibold text-gray-900 block">Payment Method</span>
            <span className="text-gray-700 block mt-0.5">{order.paymentMethod}</span>
          </div>
          <div className="block">
            <span className="font-semibold text-gray-900 block">Payment Status</span>
            <span className="text-gray-700 block mt-0.5">{order.paymentStatus}</span>
          </div>
          <div className="block sm:col-span-2">
            <span className="font-semibold text-gray-900 block">Transaction Id</span>
            <span className="text-gray-700 block mt-0.5 break-all" title={order.transactionId}>
              {order.transactionId}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#343a40] hover:bg-[#23272b] rounded-sm transition-colors"
          >
            View Details
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-900 bg-[#ffc107] hover:bg-[#e0a800] rounded-sm transition-colors"
          >
            Download Invoice
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#0066FF] hover:bg-[#0052CC] rounded-sm transition-colors"
          >
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastOrderCard;
