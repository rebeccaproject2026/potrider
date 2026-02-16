import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ordersIcon from "../../assets/images/orders.svg";
import DatePickerMap from "../../components/DatePickerMap";
import OrdersTable from "../../components/order/OrdersTable";
import OrderAnalytics from "../../components/order/OrderAnalytics";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import OrderTrackingDrawer from "../../components/order/OrderTrackingDrawer";
import QuantityTimelineDrawer from "../../components/common/QuantityTimelineDrawer";
import OrderSummaryCard from "../../components/order/OrderSummaryCard";
import CustomerDetailsDrawer from "./CustomerDetailsDrawer";
import ActionModal from "../../components/common/ActionModal";
import Select from "../../components/Select";
import { getOrdersColumns, getOrdersData } from "./ordersData";

const DRIVERS_LIST = [
  { value: "Abou Zidan Houssin", label: "Abou Zidan Houssin" },
  { value: "John Doe", label: "John Doe" },
  { value: "Mike Johnson", label: "Mike Johnson" },
  { value: "Sarah Johnson", label: "Sarah Johnson" },
];

const PAYMENT_STATUS_list = [
  { value: "Pending", label: "Pending" },
  { value: "Paid", label: "Paid" },
  { value: "Refunded", label: "Refunded" },
  { value: "Dispute", label: "Dispute" },
  { value: "Cancelled", label: "Cancelled" },
];

const Order = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [filters, setFilters] = useState({
    driver: "",
    orderMethod: "",
    orderStatus: "",
    orderType: "",
    paymentMethod: "",
    paymentStatus: "",
  });

  // Analytics state
  const [analyticsState, setAnalyticsState] = useState({
    isOpen: false,
    title: "",
    data: [],
    headers: [],
    keys: {},
  });

  // Order details drawer state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  // Order tracking drawer state
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [isTrackingDrawerOpen, setIsTrackingDrawerOpen] = useState(false);

  // Customer drawer state
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);

  // Quantity Timeline Drawer state
  const [timelineConfig, setTimelineConfig] = useState({
    isOpen: false,
    title: "Quantity",
    items: []
  });

  // Action Modal State (Assign Driver / Update Payment)
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    type: null, // "courier" | "payment"
    title: "",
    data: null,
    actionLabel: "Assign"
  });
  const [assignValue, setAssignValue] = useState(""); // Selected value in modal

  // Dummy timeline data
  const timelineData = [
    {
      first: "05 November 2025",
      second: "14.00gm",
      details: [
        { first: "#89 - Mango - at 12:40pm", second: "3.20gm" },
        { first: "#88 - Sugar - at 12:36pm", second: "0.40gm" },
        { first: "#87 - Tea, Mango, ginger - at 12:35pm", second: "10.40gm" },
      ],
    },
    {
      first: "26 November 2025",
      second: "7.20gm",
      details: [
        { first: "#144 - yogurt - at 09:15pm", second: "0.50gm" },
        { first: "#143 - new test - at 09:05pm", second: "6.30gm" },
        { first: "#142 - yogurt - at 09:04pm", second: "0.40gm" },
      ],
    },
    {
      first: "29 January 2026",
      second: "57.90gm",
      details: [
        { first: "#144 - yogurt - at 09:15pm", second: "0.50gm" },
        { first: "#143 - new test - at 09:05pm", second: "6.30gm" },
        { first: "#142 - yogurt - at 09:04pm", second: "0.40gm" },
      ],
    },
    {
      first: "01 February 2026",
      second: "55.50gm",
      details: [
        { first: "#144 - yogurt - at 09:15pm", second: "0.50gm" },
        { first: "#143 - new test - at 09:05pm", second: "6.30gm" },
        { first: "#142 - yogurt - at 09:04pm", second: "0.40gm" },
      ],
    },
    {
      first: "03 February 2026",
      second: "82.50gm",
      details: [],
    },
  ];

  const handleOpenTimeline = useCallback((item) => {
    setTimelineConfig({
      isOpen: true,
      title: item.title || "Quantity",
      items: timelineData // User requested this specific static data
    });
  }, []);

  const handleCloseTimeline = useCallback(() => {
    setTimelineConfig(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Handlers - defined first
  const handleView = useCallback((row) => {
    setSelectedOrder(row ?? null);
    setIsOrderDrawerOpen(true);
  }, []);

  const handleCloseOrderDrawer = useCallback(() => {
    setIsOrderDrawerOpen(false);
  }, []);

  // Handle status click to open tracking drawer
  const handleStatusClick = useCallback((row) => {
    console.log("Status click:", row);
    setSelectedTrackingOrder(row ?? null);
    setIsTrackingDrawerOpen(true);
  }, []);

  const handleCloseTrackingDrawer = useCallback(() => {
    setIsTrackingDrawerOpen(false);
    setSelectedTrackingOrder(null);
  }, []);

  const handleDelete = useCallback((row) => {
    console.log("Delete order:", row);
    // Add your delete logic here
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  const handleSearch = useCallback((value) => {
    console.log("Search:", value);
    // Search is handled internally by OrdersTable
  }, []);

  const handleCustomerClick = useCallback((row) => {
    setSelectedCustomer(row ?? null);
    setIsCustomerDrawerOpen(true);
  }, []);

  const handleCloseCustomerDrawer = useCallback(() => {
    setIsCustomerDrawerOpen(false);
    setSelectedCustomer(null);
  }, []);

  const handleCourierClick = useCallback((row) => {
    setActionModal({
      isOpen: true,
      type: "courier",
      title: "Assign Driver",
      data: row,
      actionLabel: "Assign"
    });
    setAssignValue(row.courier || ""); // Pre-fill current value if any
  }, []);

  const handlePaymentStatusClick = useCallback((row) => {
    setActionModal({
      isOpen: true,
      type: "payment",
      title: "Update Payment Status",
      data: row,
      actionLabel: "Update"
    });
    setAssignValue(row.paymentStatus || "Pending");
  }, []);

  const handleActionConfirm = useCallback(() => {
    console.log(`Action Confirm: Type=${actionModal.type}, Value=${assignValue}, Order=${actionModal.data?.orderId}`);
    // Here you would call API to update order
    setActionModal(prev => ({ ...prev, isOpen: false }));
  }, [actionModal, assignValue]);

  const handleCloseActionModal = useCallback(() => {
    setActionModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Get columns and data - after handlers are defined
  const columns = useMemo(
    () => getOrdersColumns(handleView, handleDelete, handleStatusClick, handleCustomerClick, handleCourierClick, handlePaymentStatusClick),
    [handleView, handleDelete, handleStatusClick, handleCustomerClick, handleCourierClick, handlePaymentStatusClick]
  );
  const tableData = useMemo(() => getOrdersData(), []);

  // Orders summary data (icon classes from tracking steps: fi = Flaticon-style icon font)
  const ordersSummary = {
    shipping: {
      title: "New Orders",
      orders: +25,
      color: "#0066FF",
      iconsBg: "#E3EEFF",
      amount: "$20,235.99",
      change: "-8%",
      borderColor: "border-orange-500",
      icon: ordersIcon,
      iconClass: "fi-rr-clipboard-list",
    },
    processing: {
      title: "Processing",
      orders: 15,
      color: "#FF9800",
      iconsBg: "#FFF5E5",
      amount: "$1,320.15",
      change: "+5%",
      borderColor: "border-yellow-500",
      icon: ordersIcon,
      iconClass: "fi fi-rr-process",
    },
    shipped: {
      title: "Shipped",
      orders: 15,
      color: "#9C27B0",
      iconsBg: "#F9DFFE",
      amount: "$1,320.15",
      change: "+5%",
      borderColor: "border-purple-500",
      icon: ordersIcon,
      iconClass: "fi fi-rr-dolly-flatbed",
    },
    inTransit: {
      title: "In-Transit",
      orders: 35,
      amount: "$2,352.30",
      color: "#8B4513",
      iconsBg: "#F4E6DA",
      change: "-10%",
      borderColor: "border-blue-500",
      icon: ordersIcon,
      iconClass: "fi fi-rs-shipping-fast",
    },
    delivered: {
      title: "Delivered",
      orders: 5,
      amount: "$899.62",
      color: "#109F22",
      iconsBg: "#D4FFDA",
      change: "+10%",
      borderColor: "border-green-500",
      icon: ordersIcon,
      iconClass: "fi fi-rr-home",
    },
  };

  // Instore section
  // const instoreOrders = {
  //   shipping: {
  //     title: "New Orders",
  //     color: "#0066FF",
  //     iconsBg: "#E3EEFF",
  //     orders: 25,
  //     amount: "$20,235.99",
  //     change: "-8%",
  //     bgColor: "bg-blue-50",
  //     borderColor: "border-blue-500",
  //     icon: ordersIcon,
  //   },
  //   delivered: {
  //     title: "Delivered",
  //     orders: 5,
  //     amount: "$899.62",
  //     change: "+10%",
  //     color: "#109F22",
  //     iconsBg: "#D4FFDA",
  //     bgColor: "bg-green-50",
  //     borderColor: "border-green-500",
  //     icon: ordersIcon,
  //   },
  //   cancelled: {
  //     title: "Cancelled",
  //     orders: 5,
  //     amount: "$899.62",
  //     change: "+10%",
  //     color: "#F44336",
  //     iconsBg: "#FEECEB",
  //     bgColor: "bg-red-50",
  //     borderColor: "border-red-500",
  //     icon: ordersIcon,
  //   },
  // };

  // Delivery section
  const deliveryOrders = {
    newOrders: {
      title: "New Orders",
      orders: 25,
      amount: "$20,235.99",
      change: "-8%",
      color: "#0066FF",
      iconsBg: "#E3EEFF",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      icon: ordersIcon,
      iconClass: "fi-rr-clipboard-list",
    },
    packed: {
      title: "Packed",
      orders: 10,
      amount: "$1,320.15",
      change: "+5%",
      color: "#FF9800",
      iconsBg: "#FFF5E5",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      icon: ordersIcon,
      iconClass: "fi fi-rr-dolly-flatbed",
    },
    outForDelivery: {
      title: "Out for Delivery",
      orders: 15,
      amount: "$1,320.15",
      change: "+5%",
      color: "#9C27B0",
      iconsBg: "#F9DFFE",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      icon: ordersIcon,
      iconClass: "fi fi-rs-shipping-fast",
    },
    delivered: {
      title: "Delivered",
      orders: 5,
      amount: "$899.62",
      change: "+10%",
      color: "#109F22",
      iconsBg: "#D4FFDA",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      icon: ordersIcon,
      iconClass: "fi fi-rr-home",
    },
  };

  const handleDateUpdate = useCallback((range) => {
    setDateRange((prev) => {
      if (
        prev.start === range.start &&
        prev.end === range.end
      ) {
        return prev; // prevent re-render
      }
      return {
        start: range.start,
        end: range.end,
      };
    });
  }, []);

  const handleOpenAnalytics = useCallback((item) => {
    // Prepare analytics data based on item title
    // Map item title to delivery status
    const statusMap = {
      "New Orders": "Ordered",
      "Processing": "Processing",
      "Shipped": "Shipped",
      "In-Transit": "In-Transit",
      "Delivered": "Delivered",
      "Packed": "Packed",
      "Out for Delivery": "Out For Delivery",
    };

    // Filter data by status and add date fields for analytics
    const filteredData = tableData
      .filter((order) => {
        return order.deliveryStatus === statusMap[item.title];
      })
      .map((order) => {
        // Parse date string to Date object for filtering
        let orderDate = new Date();
        if (order.date) {
          // Parse "29 January, 2026" format
          const parsedDate = new Date(order.date);
          if (!isNaN(parsedDate.getTime())) {
            orderDate = parsedDate;
          }
        }

        return {
          ...order,
          createdAt: orderDate.toISOString(),
          updatedAt: orderDate.toISOString(),
        };
      });

    setAnalyticsState({
      isOpen: true,
      title: item.title,
      data: filteredData,
      headers: ["Order Id", "Order Created", "Amount"],
      keys: {
        idKey: "id",
        firstKey: "orderId",
        secondKey: "date",
        thirdKey: "grandTotal",
      },
    });
  }, [tableData]);

  const handleCloseAnalytics = useCallback(() => {
    setAnalyticsState((prev) => ({ ...prev, isOpen: false }));
  }, []);




  return (
    <div className="min-w-0 max-w-full  overflow-x-hidden pr-2">
      {/* Header - fixed */}
      <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <DatePickerMap
          defaultItem={2}
          onUpdate={handleDateUpdate}
        />

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/orders/create")}
            className="flex items-center gap-2 px-2 py-2.5 cursor-pointer bg-[var(--color-primary)] text-white rounded-sm hover:bg-green-600 transition-colors font-semibold text-sm"
          >
            + Create Order
          </button>
        </div>
      </div>



      {/* Instore Section */}
      {/* <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-2 ml-1">Instore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 min-w-0">
          {Object.values(instoreOrders).map((item, idx) => (
            <OrderCard key={idx} item={item} />
          ))}
        </div>
      </div> */}

      {/* Delivery Section - fixed */}
      <div className="flex-shrink-0 mb-4 min-w-0">
        <h2 className="text-sm font-semibold text-gray-800 mb-2 ml-1">Delivery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 min-w-0">
          {Object.values(deliveryOrders).map((item, idx) => (
            <OrderSummaryCard
              key={idx}
              item={item}
              onOpenTimeline={handleOpenTimeline}
              onOpenAnalytics={handleOpenAnalytics}
            />
          ))}
        </div>
      </div>
      {/* Shipping Section - fixed */}
      <div className="flex-shrink-0 mb-4 min-w-0">
        <h2 className="text-sm font-semibold text-[#000000] mb-2 ml-1">
          Shipping
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 min-w-0">
          {Object.values({
            0: ordersSummary.shipping,
            1: ordersSummary.processing,
            2: ordersSummary.shipped,
            3: ordersSummary.inTransit,
            4: ordersSummary.delivered,
          }).map((item, idx) => (
            <OrderSummaryCard
              key={idx}
              item={item}
              onOpenTimeline={handleOpenTimeline}
              onOpenAnalytics={handleOpenAnalytics}
            />
          ))}
        </div>
      </div>
      {/* Orders Table Component */}
      <OrdersTable
        data={tableData}
        columns={columns}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onView={handleView}
        onDelete={handleDelete}
        onStatusClick={handleStatusClick}
        onCustomerClick={handleCustomerClick}
      />

      {/* Order Analytics Component */}
      <OrderAnalytics
        title={analyticsState.title}
        data={analyticsState.data}
        headers={analyticsState.headers}
        keys={analyticsState.keys}
        isOpen={analyticsState.isOpen}
        onClose={handleCloseAnalytics}
      />

      <ActionModal
        isOpen={actionModal.isOpen}
        onClose={handleCloseActionModal}
        title={actionModal.title}
        onAction={handleActionConfirm}
        actionLabel={actionModal.actionLabel}
      >
        <div className="flex flex-col gap-2">
          {actionModal.type === "courier" && (
            <div>
              <label className="block text-sm font-semibold text-[#000] mb-2">Drivers:</label>
              <Select
                options={DRIVERS_LIST}
                value={assignValue}
                onChange={(e) => setAssignValue(e.target.value)}
                placeholder="Select Driver"
                className="w-full h-5 min-h-5"
              />
            </div>
          )}
          {actionModal.type === "payment" && (
            <div>
              <label className="block text-sm font-semibold text-[#000] mb-2">Payment Status:</label>
              <Select
                options={PAYMENT_STATUS_list}
                value={assignValue}
                onChange={(e) => setAssignValue(e.target.value)}
                placeholder="Select Status"
                className="w-full h-5 min-h-5"
              />
            </div>
          )}
        </div>
      </ActionModal>

      {/* Order Details Drawer – opens on Eye icon click */}
      <OrderDetailsDrawer
        isOpen={isOrderDrawerOpen}
        onClose={handleCloseOrderDrawer}
        selectedOrder={selectedOrder}
      />

      {/* Order Tracking Drawer – opens on Delivery Status click */}
      <OrderTrackingDrawer
        isOpen={isTrackingDrawerOpen}
        onClose={handleCloseTrackingDrawer}
        selectedOrder={selectedTrackingOrder}
      />

      {/* Quantity Timeline Drawer */}
      <QuantityTimelineDrawer
        isOpen={timelineConfig.isOpen}
        onClose={handleCloseTimeline}
        title={timelineConfig.title}
        items={timelineConfig.items}
      />

      {/* Customer Details Drawer - triggered by clicking Customer Name */}
      <CustomerDetailsDrawer
        isOpen={isCustomerDrawerOpen}
        onClose={handleCloseCustomerDrawer}
        customerName={selectedCustomer?.customer}
      />
    </div>
  );
};

export default Order;
