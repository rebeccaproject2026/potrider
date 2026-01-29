import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import ordersIcon from "../../assets/images/orders.svg";
import { Icon } from "@iconify/react";

const Order = () => {
  const [timePeriod, setTimePeriod] = useState("This Month");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
  const instoreOrders = {
    shipping: {
      title: "New Orders",
      orders: 25,
      amount: "$20,235.99",
      change: "-8%",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      icon: ordersIcon,
    },
    delivered: {
      title: "Delivered",
      orders: 5,
      amount: "$899.62",
      change: "+10%",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      icon: ordersIcon,
    },
    cancelled: {
      title: "Cancelled",
      orders: 5,
      amount: "$899.62",
      change: "+10%",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      icon: ordersIcon,
    },
  };

  // Delivery section
  const deliveryOrders = {
    newOrders: {
      title: "New Orders",
      orders: 25,
      amount: "$20,235.99",
      change: "-8%",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      icon: ordersIcon,
    },
    packed: {
      title: "Packed",
      orders: 10,
      amount: "$1,320.15",
      change: "+5%",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      icon: ordersIcon,
    },
    outForDelivery: {
      title: "Out for Delivery",
      orders: 15,
      amount: "$1,320.15",
      change: "+5%",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      icon: ordersIcon,
    },
    delivered: {
      title: "Delivered",
      orders: 5,
      amount: "$899.62",
      change: "+10%",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      icon: ordersIcon,
    },
  };

  // Sample table data
  const tableData = [
    {
      id: "1",
      orderId: "1754305282",
      customer: "Frank Niya",
      phone: "(416) 558-9584",
      price: "$210.00",
      cash: "$0.00",
      coupon: "FREE-PREROLLS",
      eap: "BAT",
      courier: "Sergei Savchenko",
      grand: "$105 Saved $31",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Pending",
      method: "Online",
      type: "Delivery Same Day",
      city: "Oakville, Ontario",
      date: "26 August, 2025 08:41 PM",
      deliveryStatus: "Ordered",
    },
    {
      id: "2",
      orderId: "1754305282",
      customer: "Frank Niya",
      phone: "(416) 558-9584",
      price: "$210.00",
      cash: "$0.00",
      coupon: "FREE-PREROLLS",
      eap: "BAT",
      courier: "Sergei Savchenko",
      grand: "$105 Saved $31",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Pending",
      method: "Online",
      type: "Delivery Same Day",
      city: "Oakville, Ontario",
      date: "26 August, 2025 08:41 PM",
      deliveryStatus: "Ordered",
    },
    {
      id: "3",
      orderId: "1754305282",
      customer: "Frank Niya",
      phone: "(416) 558-9584",
      price: "$210.00",
      cash: "$0.00",
      coupon: "FREE-PREROLLS",
      eap: "$21",
      courier: "Sergei Savchenko",
      grand: "$105",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Pending",
      method: "Online",
      type: "Delivery Same Day",
      city: "Oakville, Ontario",
      date: "26 August, 2025 08:41 PM",
      deliveryStatus: "Ordered",
    },
  ];

  const columns = [
    {
      accessorKey: "orderId",
      header: "Order#",
      cell: (info) => <span className="text-xs">{info.getValue()}</span>,
      size: 80,
    },
    {
      accessorKey: "customer",
      header: "Details",
      cell: (info) => (
        <div>
          <div className="font-medium text-xs">
            {info.row.original.customer}
          </div>
          <div className="text-xs text-gray-500">{info.row.original.phone}</div>
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => <span className="text-xs">{info.getValue()}</span>,
      size: 70,
    },
    {
      accessorKey: "coupon",
      header: "Coupon",
      cell: (info) => (
        <span className="text-xs truncate">{info.getValue()}</span>
      ),
      size: 100,
    },
    {
      accessorKey: "courier",
      header: "Courier",
      cell: (info) => (
        <span className="text-xs truncate">{info.getValue()}</span>
      ),
      size: 100,
    },
    {
      accessorKey: "grand",
      header: "Grand Total",
      cell: (info) => <span className="text-xs">{info.getValue()}</span>,
      size: 90,
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment",
      cell: (info) => (
        <span className="text-xs truncate">{info.getValue()}</span>
      ),
      size: 100,
    },
    {
      accessorKey: "paymentStatus",
      header: "Status",
      cell: (info) => (
        <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap">
          {info.getValue()}
        </span>
      ),
      size: 80,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => (
        <span className="text-xs truncate">{info.getValue()}</span>
      ),
      size: 90,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: (info) => (
        <span className="text-xs truncate">{info.getValue()}</span>
      ),
      size: 100,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => <span className="text-xs">{info.getValue()}</span>,
      size: 120,
    },
    {
      accessorKey: "deliveryStatus",
      header: "Delivery",
      cell: (info) => (
        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap">
          {info.getValue()}
        </span>
      ),
      size: 80,
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: () => (
        <button className="text-blue-500 hover:text-blue-700 text-lg">⋯</button>
      ),
      size: 50,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const OrderCard = ({ item }) => (
    <div
      className={`rounded-md p-2.5 flex items-center gap-2.5 bg-white min-w-0`}
    >
      <div className="shrink-0">
        <Icon
          icon="solar:documents-outline"
          width="22"
          height="22"
          color={item.color}
          style={{
            backgroundColor: item.iconsBg,
            padding: "1px",
            borderRadius: "12px",
          }}
        />
      </div>
      <div className="grow min-w-0">
        <p
          className="text-xs font-semibold mb-0.5 truncate"
          style={{ color: item.color }}
        >
          {item.title} ({item.orders})
        </p>
        <p className="text-base font-bold text-gray-900 truncate">
          {item.amount}
        </p>
      </div>
      <div className="shrink-0 text-right">
        {/* <p className="text-xs text-gray-600 whitespace-nowrap">{item.orders}</p> */}
        <p
          className={`text-xs font-semibold ${
            item.change.startsWith("+") ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.change}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-2 md:p-4 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Orders
        </h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            {timePeriod}
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
            + Create Order
          </button>
        </div>
      </div>

      {/* Shipping Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* Instore Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Instore</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(instoreOrders).map((item, idx) => (
            <OrderCard key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Delivery Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(deliveryOrders).map((item, idx) => (
            <OrderCard key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
          <option>Driver</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
          <option>Order Method</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
          <option>Order Status</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
          <option>Order Type</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
          <option>Payment Method</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
          <option>Payment Status</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-2 py-2 text-left text-xs font-semibold text-gray-700 whitespace-nowrap"
                    >
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="hover:text-gray-900 flex items-center gap-1"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-2 py-2 text-xs text-gray-800 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-2 py-2 text-center text-gray-500 text-xs"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-600">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              tableData.length,
            )}{" "}
            of {tableData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
