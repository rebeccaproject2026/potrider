import { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  Eye,
  Trash2,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import DatePickerMap from "../../components/DatePickerMap";
import CustomerSummaryCard from "../../components/customers/CustomerSummaryCard";
import QuantityTimelineDrawer from "../../components/common/QuantityTimelineDrawer";

const FILTER_TABS = [
  { key: "all", label: "All", count: 18 },
  { key: "new", label: "New", count: 5 },
  { key: "active", label: "Active", count: 10 },
  { key: "inactive", label: "Inactive", count: 3 },
];

const getStatusPillClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "active") return "bg-green-100 text-green-700";
  if (s === "new") return "bg-blue-100 text-blue-700";
  if (s === "inactive") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-700";
};

const getCustomerColumns = (onView, onDelete) => [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] font-medium">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "totalSpending",
    header: "Total Spending",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "totalQty",
    header: "Total Qty",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "lastOrderSpending",
    header: "Last Order Spending",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "lastOrderQty",
    header: "Last Order Qty",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-[11px] font-medium ${getStatusPillClass(
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
          onClick={() => onView?.(info.row.original)}
          className="p-1.5 text-(--color-secondary) hover:bg-blue-50 rounded"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(info.row.original)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const CUSTOMERS_DATA = [
  {
    id: "1",
    customer: "Paul Boncatto",
    address: "GH 4 Circle, Sector 16, Gandhinagar, Gujarat 382016, India",
    createdOn: "2025-07-08 06:55:03",
    totalOrders: "165",
    totalSpending: "$909.25",
    totalQty: "123 Items",
    lastOrderSpending: "$56.36",
    lastOrderQty: "12 Items",
    status: "Active",
  },
  {
    id: "2",
    customer: "Paul Boncatto",
    address: "GH 4 Circle, Sector 16, Gandhinagar, Gujarat 382016, India",
    createdOn: "2025-07-08 06:55:03",
    totalOrders: "165",
    totalSpending: "$909.25",
    totalQty: "123 Items",
    lastOrderSpending: "$56.36",
    lastOrderQty: "12 Items",
    status: "New",
  },
  {
    id: "3",
    customer: "Paul Boncatto",
    address: "GH 4 Circle, Sector 16, Gandhinagar, Gujarat 382016, India",
    createdOn: "2025-07-08 06:55:03",
    totalOrders: "165",
    totalSpending: "$909.25",
    totalQty: "123 Items",
    lastOrderSpending: "$56.36",
    lastOrderQty: "12 Items",
    status: "Inactive",
  },
  {
    id: "4",
    customer: "Paul Boncatto",
    address: "GH 4 Circle, Sector 16, Gandhinagar, Gujarat 382016, India",
    createdOn: "2025-07-08 06:55:03",
    totalOrders: "165",
    totalSpending: "$909.25",
    totalQty: "123 Items",
    lastOrderSpending: "$56.36",
    lastOrderQty: "12 Items",
    status: "Active",
  },
  {
    id: "5",
    customer: "Paul Boncatto",
    address: "GH 4 Circle, Sector 16, Gandhinagar, Gujarat 382016, India",
    createdOn: "2025-07-08 06:55:03",
    totalOrders: "165",
    totalSpending: "$909.25",
    totalQty: "123 Items",
    lastOrderSpending: "$56.36",
    lastOrderQty: "12 Items",
    status: "Active",
  },
];

const SUMMARY_CARDS = [
  {
    title: "New Customers",
    count: "503",
    change: "+ 22%",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-600",
  },
  {
    title: "Active Customers",
    count: "9,825",
    change: "+ 22%",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-600",
  },
  {
    title: "Inactive Customers",
    count: "7,825",
    change: "+ 22%",
    iconBgColor: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-600",
  },
];

const Customers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Timeline drawer state
  const [timelineConfig, setTimelineConfig] = useState({
    isOpen: false,
    title: "",
    items: [],
  });

  const onDateUpdate = useCallback(() => { }, []);

  // Handle opening timeline drawer
  const handleOpenTimeline = useCallback((card) => {
    let timelineItems = [];

    // Different data based on card type
    if (card.title === "New Customers") {
      timelineItems = [
        {
          first: "12 Dec 2023",
          second: "25",
          details: [
            { first: "John Doe - onboard - At 9:30pm by Dispatcher name" },
            { first: "Noah John - onboard - At 8:30pm by Dispatcher name" }
          ]
        },
        {
          first: "11 Dec 2023",
          second: "60",
          details: [
            { first: "John Doe - onboard - At 9:30pm by Dispatcher name" },
            { first: "Noah John - onboard - At 8:30pm by Dispatcher name" }
          ]
        },
        {
          first: "10 Dec 2023",
          second: "100",
          details: []
        },
        {
          first: "09 Dec 2023",
          second: "703",
          details: []
        }
      ];
    } else if (card.title === "Active Customers") {
      timelineItems = [
        {
          first: "12 Dec 2023",
          second: "25",
          details: [
            { first: "Client name is active at 9:30 pm" },
            { first: "Client name is active at 9:30 am" }
          ]
        },
        {
          first: "11 Dec 2023",
          second: "60",
          details: [
            { first: "Client name is active at 9:30 pm" },
            { first: "Client name is active at 9:30 am" }
          ]
        },
        {
          first: "10 Dec 2023",
          second: "100",
          details: [
            { first: "Client name is active at 9:30 pm" },
            { first: "Client name is active at 9:30 am" }
          ]
        },
        {
          first: "09 Dec 2023",
          second: "703",
          details: [
            { first: "Client name is active at 9:30 pm" },
            { first: "Client name is active at 9:30 am" }
          ]
        }
      ];
    } else if (card.title === "Inactive Customers") {
      timelineItems = [
        {
          first: "12 Dec 2023",
          second: "25",
          details: [
            { first: "Client name is inactive from 9:30 pm" },
            { first: "Client name is inactive from 9:30 am" }
          ]
        },
        {
          first: "11 Dec 2023",
          second: "60",
          details: [
            { first: "Client name is inactive from 9:30 pm" },
            { first: "Client name is inactive from 9:30 am" }
          ]
        },
        {
          first: "10 Dec 2023",
          second: "100",
          details: []
        },
        {
          first: "09 Dec 2023",
          second: "703",
          details: []
        }
      ];
    }

    setTimelineConfig({
      isOpen: true,
      title: card.title,
      items: timelineItems,
    });
  }, []);

  const handleCloseTimeline = useCallback(() => {
    setTimelineConfig({
      isOpen: false,
      title: "",
      items: [],
    });
  }, []);

  const columns = useMemo(
    () =>
      getCustomerColumns(
        (row) => navigate(`/customers/${row.id}`),
        (row) => { }
      ),
    [navigate]
  );

  const filteredData = useMemo(() => {
    let list = [...CUSTOMERS_DATA];
    const searchLower = search.trim().toLowerCase();
    if (searchLower) {
      list = list.filter(
        (row) =>
          row.customer?.toLowerCase().includes(searchLower) ||
          row.address?.toLowerCase().includes(searchLower) ||
          row.status?.toLowerCase().includes(searchLower)
      );
    }
    if (filterTab !== "all") {
      list = list.filter(
        (row) => row.status?.toLowerCase() === filterTab.toLowerCase()
      );
    }
    return list;
  }, [search, filterTab]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col gap-3 min-w-0">
      {/* Header: This Month (left) + Add Customer (right) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DatePickerMap defaultItem={2} onUpdate={onDateUpdate} />
        <Link
          to="/customers/add"
          className="inline-flex items-center gap-2 px-3 py-2.5 bg-(--color-primary) text-white rounded-sm shadow-sm hover:opacity-90 font-semibold text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SUMMARY_CARDS.map((card) => (
          <CustomerSummaryCard
            key={card.title}
            title={card.title}
            count={card.count}
            change={card.change}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
            titleColor={card.titleColor}
            onView={() => handleOpenTimeline(card)}
          />
        ))}
      </div>

      {/* Same layout as Inventory: single white card with search bar, tabs, filter, download, then table */}
      <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-sm bg-white focus:outline-none"
              />
            </div>
            <div className="flex w-full rounded-sm overflow-hidden border border-gray-200 bg-white">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilterTab(tab.key)}
                  className={`px-2 py-1.5 w-full text-sm m-1 rounded font-medium whitespace-nowrap ${filterTab === tab.key
                    ? "bg-(--color-secondary) text-white"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="p-2.5 rounded-sm bg-gray-700 text-white hover:bg-gray-800"
              title="Filter"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2.5 rounded-sm bg-(--color-primary) text-white hover:opacity-90"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead className="bg-[#ffffff] border-b border-gray-200 sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const colId = header.column.id ?? header.column.accessorKey;
                    const isRight =
                      colId === "action" ||
                      colId === "totalOrders" ||
                      colId === "totalSpending" ||
                      colId === "totalQty" ||
                      colId === "lastOrderSpending" ||
                      colId === "lastOrderQty";
                    return (
                      <th
                        key={header.id}
                        className={`px-3 py-2.5 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap ${isRight ? "text-right" : "text-left"
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
                      const isRight =
                        colId === "action" ||
                        colId === "totalOrders" ||
                        colId === "totalSpending" ||
                        colId === "totalQty" ||
                        colId === "lastOrderSpending" ||
                        colId === "lastOrderQty";
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-2 text-[12px] text-[#3F4753] align-middle ${isRight ? "text-right" : "text-left"
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
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div id="pagination" className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50" style={{ margin: "0 auto" }}>
          <div className="text-[12px] text-gray-600 order-2 sm:order-1">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
              filteredData.length
            )}{" "}
            of {filteredData.length} results
          </div>
          <div className="flex items-center gap-1 order-1 sm:order-2">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 text-[12px] border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
              .filter((p) => {
                const current = table.getState().pagination.pageIndex + 1;
                return (
                  p === 1 ||
                  p === table.getPageCount() ||
                  (p >= current - 2 && p <= current + 2)
                );
              })
              .map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => table.setPageIndex(pageNum - 1)}
                  className={`min-w-[28px] px-1.5 py-1 text-[12px] rounded ${table.getState().pagination.pageIndex + 1 === pageNum
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 text-[12px] border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Quantity Timeline Drawer */}
      <QuantityTimelineDrawer
        isOpen={timelineConfig.isOpen}
        onClose={handleCloseTimeline}
        title={timelineConfig.title}
        items={timelineConfig.items}
      />
    </div>
  );
};

export default Customers;
