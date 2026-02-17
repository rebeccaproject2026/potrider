import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  MessageCircle,
  Trash2,
  Search,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Calendar,
} from "lucide-react";
import DashboardAverageOrders from "../../components/dashboard/DashboardAverageOrders";
import Select from "../../components/Select";
import complaint from "../../assets/images/Button (1).png";
import { Icon } from "@iconify/react";
// Mock customer details by id (in real app would come from API)
const getCustomerById = (id) => {
  const joinDate = "Jun 15, 2025";
  return {
    id,
    fullName: "John Henry",
    joinDate: `Since ${joinDate}`,
    avatar: null,
    totalOrders: "825",
    totalOrdersChange: "+22%",
    totalOrdersPositive: true,
    totalSpending: "$9,825",
    totalSpendingChange: "-22%",
    totalSpendingPositive: false,
    totalQuantity: "85kg",
    totalQuantityChange: "+22%",
    totalQuantityPositive: true,
    itemsInFavourites: "$9,903",
    itemsInFavouritesChange: "+22%",
    itemsInFavouritesPositive: true,
    potCash: "$903",
    potCashChange: "+22%",
    potCashPositive: true,
    cancelledOrders: "13",
    cancelledOrdersChange: "+22%",
    cancelledOrdersPositive: true,
    phone: "+11234567890",
    address: "123 John St, Dummy Road 1, NYC, 10006",
  };
};

// Mock orders for this customer (match image structure)
const CUSTOMER_ORDERS_MOCK = [
  {
    id: "1",
    orderId: "1754305282",
    productPrice: "$210.00",
    coupon: "N/A",
    couponDetail: "15.99%/ $22.99",
    potCash: "$5.00",
    total: "$205.00",
    totalSaved: "(Saved 15.99%/ $22.99)",
    paymentMethod: "Cash On Delivery",
    orderMethod: "Online",
    city: "Newmarket",
    province: "Ontario",
    date: "04 August, 2025",
    time: "07:01 AM",
    deliveryStatus: "Ordered",
  },
  {
    id: "2",
    orderId: "1754305283",
    productPrice: "$150.00",
    coupon: "SAVE10",
    couponDetail: "$15.00",
    potCash: "$3.00",
    total: "$138.00",
    totalSaved: "(Saved $15.00)",
    paymentMethod: "Credit Card",
    orderMethod: "Online",
    city: "Toronto",
    province: "Ontario",
    date: "03 August, 2025",
    time: "02:30 PM",
    deliveryStatus: "Delivered",
  },
];

const SUMMARY_CARDS_CONFIG = [
  {
    key: "totalOrders",
    label: "Total Orders",
    valueKey: "totalOrders",
    changeKey: "totalOrdersChange",
    positiveKey: "totalOrdersPositive",
  },
  {
    key: "totalSpending",
    label: "Total Spending",
    valueKey: "totalSpending",
    changeKey: "totalSpendingChange",
    positiveKey: "totalSpendingPositive",
  },
  {
    key: "totalQuantity",
    label: "Total Quantity",
    valueKey: "totalQuantity",
    changeKey: "totalQuantityChange",
    positiveKey: "totalQuantityPositive",
  },
  {
    key: "itemsInFavourites",
    label: "Items in Favourites",
    valueKey: "itemsInFavourites",
    changeKey: "itemsInFavouritesChange",
    positiveKey: "itemsInFavouritesPositive",
  },
  {
    key: "potCash",
    label: "Pot Cash",
    valueKey: "potCash",
    changeKey: "potCashChange",
    positiveKey: "potCashPositive",
  },
  {
    key: "cancelledOrders",
    label: "Cancelled Orders",
    valueKey: "cancelledOrders",
    changeKey: "cancelledOrdersChange",
    positiveKey: "cancelledOrdersPositive",
  },
];

const FILTER_OPTIONS = {
  orderMethod: [
    { value: "", label: "Order Method" },
    { value: "online", label: "Online" },
    { value: "phone", label: "Phone" },
  ],
  orderStatus: [
    { value: "", label: "Order Status" },
    { value: "ordered", label: "Ordered" },
    { value: "delivered", label: "Delivered" },
    { value: "pending", label: "Pending" },
  ],
  orderType: [
    { value: "", label: "Order Type" },
    { value: "delivery", label: "Delivery" },
    { value: "pickup", label: "Pickup" },
  ],
  paymentMethod: [
    { value: "", label: "Payment Method" },
    { value: "cash", label: "Cash On Delivery" },
    { value: "card", label: "Credit Card" },
  ],
  paymentStatus: [
    { value: "", label: "Payment Status" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
  ],
};

const getDeliveryStatusClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "cancelled") return "bg-[#FEECEB] text-[#F44336]";
  return "bg-[#E3EEFF] text-[#0066FF]";
};

const getOrdersColumns = (onViewOrder, onDeleteOrder) => [
  {
    accessorKey: "orderId",
    header: "Order#",
    cell: (info) => (
      <button
        type="button"
        onClick={() => onViewOrder?.(info.row.original)}
        className="text-[12px] text-blue-600 hover:underline font-medium text-left"
      >
        {info.getValue()}
      </button>
    ),
  },
  {
    accessorKey: "productPrice",
    header: "Product Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "coupon",
    header: "Coupon",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] block">
          {info.getValue()}
        </span>
        {info.row.original.couponDetail && (
          <span className="text-[11px] text-gray-500">
            {info.row.original.couponDetail}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "potCash",
    header: "Pot Cash",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] font-medium block">
          {info.getValue()}
        </span>
        {info.row.original.totalSaved && (
          <span className="text-[11px] text-gray-500">
            {info.row.original.totalSaved}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "orderMethod",
    header: "Order Method",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "city",
    header: "City/Province",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">
        {info.getValue()}/{info.row.original.province}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] block">
          {info.getValue()}
        </span>
        <span className="text-[12px] text-[#3F4753]">
          {info.row.original.time}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${getDeliveryStatusClass(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell: (info) => (
      <div className="flex items-center gap-1 justify-end">
        <button
          type="button"
          onClick={() => onViewOrder?.(info.row.original)}
          className="p-1.5 text-(--color-secondary) hover:bg-blue-50 rounded"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDeleteOrder?.(info.row.original)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

// Same chart data shape as dashboard (reusable)
const averageOrdersChartData = {
  categories: Array.from({ length: 30 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  ),
  series: [
    {
      name: "Total Orders(432)",
      data: [
        80, 75, 85, 90, 70, 95, 100, 85, 90, 75, 80, 85, 70, 95, 100, 85, 90,
        75, 80, 85, 70, 95, 100, 85, 90, 100, 115, 90, 95, 80,
      ],
    },
    {
      name: "Delivered (324)",
      data: [
        50, 48, 52, 55, 45, 60, 65, 55, 58, 50, 52, 55, 48, 60, 65, 55, 58, 50,
        52, 55, 48, 60, 65, 55, 58, 65, 75, 58, 60, 52,
      ],
    },
    {
      name: "Pending (45)",
      data: [
        20, 18, 22, 25, 18, 28, 30, 25, 26, 20, 22, 25, 18, 28, 30, 25, 26, 20,
        22, 25, 18, 28, 30, 25, 26, 30, 35, 26, 28, 22,
      ],
    },
    {
      name: "Cancelled (42)",
      data: [
        10, 9, 11, 10, 7, 7, 5, 5, 6, 5, 6, 5, 4, 7, 5, 5, 6, 5, 6, 5, 4, 7, 5,
        5, 6, 5, 5, 6, 7, 6,
      ],
    },
  ],
};

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customer = useMemo(() => getCustomerById(customerId), [customerId]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    orderMethod: "",
    orderStatus: "",
    orderType: "",
    paymentMethod: "",
    paymentStatus: "",
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const [chartDateRangeLabel, setChartDateRangeLabel] = useState(
    "Aug 1, 2025 - Aug 11, 2025"
  );

  const columns = useMemo(
    () =>
      getOrdersColumns(
        (row) => navigate(`/orders/${row.orderId}`),
        (row) => { }
      ),
    [navigate]
  );

  const filteredOrders = useMemo(() => {
    let list = [...CUSTOMER_ORDERS_MOCK];
    const searchLower = search.trim().toLowerCase();
    if (searchLower) {
      list = list.filter(
        (row) =>
          row.orderId?.toLowerCase().includes(searchLower) ||
          row.paymentMethod?.toLowerCase().includes(searchLower) ||
          row.city?.toLowerCase().includes(searchLower)
      );
    }
    if (filters.orderMethod)
      list = list.filter(
        (r) =>
          r.orderMethod?.toLowerCase() === filters.orderMethod.toLowerCase()
      );
    if (filters.orderStatus)
      list = list.filter(
        (r) =>
          r.deliveryStatus?.toLowerCase() === filters.orderStatus.toLowerCase()
      );
    if (filters.paymentMethod) {
      const match = filters.paymentMethod.toLowerCase();
      list = list.filter((r) => r.paymentMethod?.toLowerCase().includes(match));
    }
    return list;
  }, [search, filters]);

  const table = useReactTable({
    data: filteredOrders,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleBack = () => navigate("/customers");
  const handleAllComplains = () => { };
  const handleDeleteClient = () => { };
  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col gap-4 min-w-0 pb-4">
      {/* Header: Back, Customer, avatar, name, join date | All Complains, Delete Client */}
      <div className="flex flex-wrap items-center justify-between gap-3 ">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 rounded hover:bg-gray-100 text-[#3F4753] shrink-0 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
            {customer.avatar ? (
              <img
                src={customer.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-lg font-semibold">
                {customer.fullName.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-xs font-medium text-[#3F4753] shrink-0">
              Customer
            </h1>
            <h1 className="text-lg font-bold text-[#212121] truncate">
              {customer.fullName}
            </h1>
            <p className="text-xs text-gray-500">{customer.joinDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAllComplains}
            className="inline-flex items-center gap-2 px-3 py-2.5 bg-[#FF9800] text-white rounded-sm font-medium text-sm "
          >
            <Icon icon="akar-icons:chat-question" className="w-5 h-5" />
            All Complains
          </button>
          <button
            type="button"
            onClick={handleDeleteClient}
            className="inline-flex items-center gap-2 px-3 py-2.5 bg-[#F44336] text-white rounded-sm font-medium text-sm "
          >
            <Trash2 className="w-4 h-4" />
            Delete Client
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {SUMMARY_CARDS_CONFIG.map((config) => {
          const value = customer[config.valueKey];
          const change = customer[config.changeKey];
          const isPositive = customer[config.positiveKey];
          return (
            <div
              key={config.key}
              className="bg-white rounded-sm border border-gray-200 shadow-sm p-4"
            >
              <p className="text-sm font-semibold text-[#3F4753] mb-1">
                {config.label}
              </p>
              <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-bold text-[#000]">{value}</p>
                <p
                  className={`text-xs font-semibold mt-1 ${isPositive ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-semibold text-[#212121] mb-0.5">
              Full Name
            </p>
            <p className="text-sm font-medium text-[#3F4753]">
              {customer.fullName}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#212121] mb-0.5">
              Phone Number
            </p>
            <p className="text-sm font-medium text-[#3F4753]">
              {customer.phone}
            </p>
          </div>
          <div className="md:col-span-2 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#212121] mb-0.5">
                Address
              </p>
              <p className="text-sm font-medium text-[#3F4753]">
                {customer.address}
              </p>
            </div>
            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded shrink-0"
              title="Edit address"
            >
              <Pencil className="w-4 h-4 text-[#0066FF]" />
            </button>
          </div>
        </div>
      </div>

      {/* Average Orders chart (reusable component) */}
      <DashboardAverageOrders
        data={averageOrdersChartData}
        title="Average Orders"
        rightContent={
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-sm text-sm text-[#3F4753] hover:bg-gray-50"
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{chartDateRangeLabel}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        }
      />

      {/* Orders table - search + filters design from reference */}
      <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-[#3F4753] placeholder-gray-400 bg-white border border-[#D9D9D9] rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          {/* Five filter dropdowns in a horizontal row, consistent spacing */}
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={filters.orderMethod}
              onChange={(e) =>
                handleFilterChange("orderMethod", e.target.value)
              }
              options={FILTER_OPTIONS.orderMethod}
              placeholder="Order Method"
              customStyle="flex-1"
              compact
            />
            <Select
              value={filters.orderStatus}
              onChange={(e) =>
                handleFilterChange("orderStatus", e.target.value)
              }
              options={FILTER_OPTIONS.orderStatus}
              placeholder="Order Status"
              customStyle="flex-1"
              compact
            />
            <Select
              value={filters.orderType}
              onChange={(e) => handleFilterChange("orderType", e.target.value)}
              options={FILTER_OPTIONS.orderType}
              placeholder="Order Type"
              customStyle="flex-1"
              compact
            />
            <Select
              value={filters.paymentMethod}
              onChange={(e) =>
                handleFilterChange("paymentMethod", e.target.value)
              }
              options={FILTER_OPTIONS.paymentMethod}
              placeholder="Payment Method"
              customStyle="flex-1 "
              compact
            />
            <Select
              value={filters.paymentStatus}
              onChange={(e) =>
                handleFilterChange("paymentStatus", e.target.value)
              }
              options={FILTER_OPTIONS.paymentStatus}
              placeholder="Payment Status"
              customStyle="flex-1"
              compact
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead className="bg-white border-b border-gray-200 sticky top-0 z-10 text-[3px]!important">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const colId = header.column.id ?? header.column.accessorKey;
                    const isRight = colId === "action";
                    return (
                      <th
                        key={header.id}
                        className={`px-2 py-2 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap ${isRight ? "text-right" : "text-left"
                          }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => {
                      const colId = cell.column.id ?? cell.column.accessorKey;
                      const isRight = colId === "action";
                      return (
                        <td
                          key={cell.id}
                          className={`px-2 py-2 text-[12px] text-[#3F4753] align-middle ${isRight ? "text-right" : "text-left"
                            }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-gray-500 text-sm"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50">
          <span className="text-xs text-gray-600">
            Showing{" "}
            {filteredOrders.length === 0
              ? 0
              : table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
              filteredOrders.length
            )}{" "}
            of {filteredOrders.length} results
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
