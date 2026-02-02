import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ordersIcon from "../../assets/images/orders.svg";
import { Icon } from "@iconify/react";
import DatePickerMap from "../../components/DatePickerMap";
import OrdersTable from "../../components/order/OrdersTable";
import OrderAnalytics from "../../components/order/OrderAnalytics";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import { getOrdersColumns, getOrdersData } from "./ordersData";

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

  // Handlers - defined first
  const handleView = useCallback((row) => {
    setSelectedOrder(row ?? null);
    setIsOrderDrawerOpen(true);
  }, []);

  const handleCloseOrderDrawer = useCallback(() => {
    setIsOrderDrawerOpen(false);
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

  // Get columns and data - after handlers are defined
  const columns = useMemo(
    () => getOrdersColumns(handleView, handleDelete),
    [handleView, handleDelete]
  );
  const tableData = useMemo(() => getOrdersData(), []);

  // Orders summary data
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

  const OrderCard = ({ item }) => (
    <div className="bg-white rounded-md border border-gray-200 p-3 flex items-center justify-between gap-3 min-w-0">
      {/* Left */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <p
            className="text-[13px] font-semibold truncate mb-2"
            style={{ color: item.color }}
          >
            {item.title} ({item.orders})
          </p>
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg shrink-0"
            style={{ backgroundColor: item.iconsBg }}
          >
            <Icon
              icon="solar:documents-outline"
              width="18"
              height="18"
              color={item.color}
            />
          </div>
          <button className="text-[12px] text-[#3F4753] font-bold underline hover:underline mt-2">
            View Orders
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="min-w-0 flex-shrink-0">
        <p className="text-base font-bold text-gray-900 mb-0.5">
          {item.amount}
        </p>
        <span
          className={`text-xs font-semibold flex justify-end ${item.change.startsWith("+")
            ? "text-green-600"
            : "text-red-600"
            }`}
        >
          {item.change}
        </span>
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenAnalytics(item)}
            className="text-[10px] text-[#3F4753] font-bold underline hover:underline mt-6"
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-w-0 max-w-full  overflow-x-hidden">
      {/* Header - fixed */}
      <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <DatePickerMap
          defaultItem={2}
          onUpdate={handleDateUpdate}
        />

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/orders/create")}
            className="flex items-center gap-2 px-2 py-2.5 bg-[var(--color-primary)] text-white rounded-sm hover:bg-green-600 transition-colors font-semibold text-sm"
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
            <OrderCard key={idx} item={item} />
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
            <OrderCard key={idx} item={item} />
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

      {/* Order Details Drawer – opens on Eye icon click */}
      <OrderDetailsDrawer
        isOpen={isOrderDrawerOpen}
        onClose={handleCloseOrderDrawer}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default Order;
