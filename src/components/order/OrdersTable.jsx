import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, Download, Eye, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import Select from "../Select";

/**
 * Reusable Orders Table Component
 * @param {Object} props
 * @param {Array} props.data - Table data
 * @param {Array} props.columns - Table columns definition (if not provided, will use default)
 * @param {Function} props.onSearch - Search handler (optional)
 * @param {Object} props.filters - Filter values object
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Function} props.onView - View action handler (receives row data)
 * @param {Function} props.onDelete - Delete action handler (receives row data)
 */
const OrdersTable = ({
  data = [],
  columns = [],
  onSearch,
  filters = {},
  onFilterChange,
  onStatusClick,
  onCustomerClick,
  onCourierClick,
  onPaymentStatusClick,
  // onView,
  // onDelete,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  // Filter data based on filters prop
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply filters
    if (filters.driver && filters.driver !== "") {
      result = result.filter((row) =>
        row.courier?.toLowerCase().includes(filters.driver.toLowerCase())
      );
    }

    if (filters.orderMethod && filters.orderMethod !== "") {
      result = result.filter((row) =>
        row.method?.toLowerCase() === filters.orderMethod.toLowerCase()
      );
    }

    if (filters.orderStatus && filters.orderStatus !== "") {
      result = result.filter((row) =>
        row.deliveryStatus?.toLowerCase() === filters.orderStatus.toLowerCase()
      );
    }

    if (filters.orderType && filters.orderType !== "") {
      result = result.filter((row) => {
        const type = row.type?.toLowerCase() || "";
        return type.includes(filters.orderType.toLowerCase());
      });
    }

    if (filters.paymentMethod && filters.paymentMethod !== "") {
      result = result.filter((row) =>
        row.paymentMethod?.toLowerCase() === filters.paymentMethod.toLowerCase()
      );
    }

    if (filters.paymentStatus && filters.paymentStatus !== "") {
      result = result.filter((row) =>
        row.paymentStatus?.toLowerCase() === filters.paymentStatus.toLowerCase()
      );
    }

    // Apply global search filter
    if (globalFilter && globalFilter.trim() !== "") {
      const searchLower = globalFilter.toLowerCase();
      result = result.filter((row) => {
        return (
          row.orderId?.toLowerCase().includes(searchLower) ||
          row.customer?.toLowerCase().includes(searchLower) ||
          row.phone?.toLowerCase().includes(searchLower) ||
          row.courier?.toLowerCase().includes(searchLower) ||
          row.paymentMethod?.toLowerCase().includes(searchLower) ||
          row.city?.toLowerCase().includes(searchLower) ||
          row.province?.toLowerCase().includes(searchLower)
        );
      });
    }

    return result;
  }, [data, filters, globalFilter]);

  // Use provided columns or empty array (columns should be passed from parent)
  const tableColumns = columns.length > 0 ? columns : [];

  const table = useReactTable({
    data: filteredData,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter: "", // We handle filtering manually, so set to empty
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    meta: {
      onStatusClick,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setGlobalFilter(value);
    if (onSearch) onSearch(value);
  };

  const handleExportToExcel = () => {
    // Get ALL filtered rows (not just current page) - use filteredData directly
    // filteredData already respects all filters and search from useMemo
    const rowsToExport = filteredData;

    // Check if there's data to export
    if (rowsToExport.length === 0) {
      alert("No data to export. Please adjust your filters.");
      return;
    }

    const excelData = rowsToExport.map((row) => {
      return {
        "Order#": String(row.orderId || ""),
        "Customer": String(row.customer || ""),
        "Phone": String(row.phone || ""),
        "Price": String(row.price || ""),
        "CA$H": String(row.cash || ""),
        "Coupon Code": String(row.couponCode || ""),
        "Coupon Amount": String(row.couponAmount || ""),
        "Courier": String(row.courier || ""),
        "Courier Tips": String(row.courierTips || ""),
        "Grand Total": String(row.grandTotal || ""),
        "Saved": String(row.savedText || ""),
        "Payment Method": String(row.paymentMethod || ""),
        "Payment Status": String(row.paymentStatus || ""),
        "Method": String(row.method || ""),
        "Type": String(row.type || ""),
        "City": String(row.city || ""),
        "Province": String(row.province || ""),
        "Date": String(row.date || ""),
        "Time": String(row.time || ""),
        "Delivery Status": String(row.deliveryStatus || ""),
      };
    });

    // Verify data structure (for debugging - can be removed in production)
    if (excelData.length > 0) {
      console.log("Exporting data:", {
        rowCount: excelData.length,
        headers: Object.keys(excelData[0]),
        firstRow: excelData[0],
      });
    }

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet from the data
    // json_to_sheet automatically creates headers in row 1 from object keys
    // and data rows starting from row 2
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths for better readability
    const colWidths = [
      { wch: 12 }, // Order#
      { wch: 15 }, // Customer
      { wch: 15 }, // Phone
      { wch: 10 }, // Price
      { wch: 10 }, // CA$H
      { wch: 12 }, // Coupon Code
      { wch: 12 }, // Coupon Amount
      { wch: 20 }, // Courier
      { wch: 12 }, // Courier Tips
      { wch: 12 }, // Grand Total
      { wch: 12 }, // Saved
      { wch: 15 }, // Payment Method
      { wch: 15 }, // Payment Status
      { wch: 10 }, // Method
      { wch: 18 }, // Type
      { wch: 12 }, // City
      { wch: 12 }, // Province
      { wch: 18 }, // Date
      { wch: 10 }, // Time
      { wch: 15 }, // Delivery Status
    ];
    ws["!cols"] = colWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Generate filename with current date
    const date = new Date();
    const dateStr = date.toISOString().split("T")[0];
    const filename = `Orders_${dateStr}.xlsx`;

    // Write the file and trigger download
    XLSX.writeFile(wb, filename);
  };

  const filterOptions = {
    driver: [
      { value: "", label: "Driver" },
      { value: "driver1", label: "Driver 1" },
      { value: "driver2", label: "Driver 2" },
    ],
    orderMethod: [
      { value: "", label: "Order Method" },
      { value: "online", label: "Online" },
      { value: "phone", label: "Phone" },
    ],
    orderStatus: [
      { value: "", label: "Order Status" },
      { value: "pending", label: "Pending" },
      { value: "processing", label: "Processing" },
    ],
    orderType: [
      { value: "", label: "Order Type" },
      { value: "delivery", label: "Delivery" },
      { value: "pickup", label: "Pickup" },
    ],
    paymentMethod: [
      { value: "", label: "Payment Method" },
      { value: "cash", label: "Cash" },
      { value: "card", label: "Card" },
    ],
    paymentStatus: [
      { value: "", label: "Payment Status" },
      { value: "pending", label: "Pending" },
      { value: "paid", label: "Paid" },
    ],
  };

  return (
    <div className="min-w-0 max-w-full bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
      {/* Search and filters section */}
      <div className="shrink-0 p-3 min-w-0">
        {/* Top row: Full width search bar */}
        <div className="mb-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={handleSearch}
              className="search-input w-full pl-9 pr-4 py-2.5 text-[15px] border border-gray-300 rounded-sm bg-white focus:outline-none shadow-none h-full"
            />
          </div>
        </div>

        {/* Bottom row: Filter dropdowns starting with Driver */}
        <div className="flex items-center gap-2 col-span-2">
          <Select
            value={filters.driver || ""}
            onChange={(e) => onFilterChange?.("driver", e.target.value)}
            options={filterOptions.driver}
            placeholder="Drivers"
            className="w-10"
            minWidth="10%"
          />
          <Select
            value={filters.orderMethod || ""}
            onChange={(e) => onFilterChange?.("orderMethod", e.target.value)}
            options={filterOptions.orderMethod}
            placeholder="Order Method"
            className="w-full"
            minWidth="10%"
          />
          <Select
            value={filters.orderStatus || ""}
            onChange={(e) => onFilterChange?.("orderStatus", e.target.value)}
            options={filterOptions.orderStatus}
            placeholder="Order Status"
            className="w-full"
            minWidth="10%"
          />
          <Select
            value={filters.orderType || ""}
            onChange={(e) => onFilterChange?.("orderType", e.target.value)}
            options={filterOptions.orderType}
            placeholder="Order Type"
            className="w-full"
            minWidth="10%"
          />
          <Select
            value={filters.paymentMethod || ""}
            onChange={(e) => onFilterChange?.("paymentMethod", e.target.value)}
            options={filterOptions.paymentMethod}
            placeholder="Payment Method"
            className="w-full"
            minWidth="10%"
          />
          <div className="flex items-center gap-2">
            <Select
              value={filters.paymentStatus || ""}
              onChange={(e) => onFilterChange?.("paymentStatus", e.target.value)}
              options={filterOptions.paymentStatus}
              placeholder="Payment Status"
              minWidth="10%"
            />
            <button
              onClick={handleExportToExcel}
              className="p-2 bg-(--color-primary) text-white rounded-sm hover:opacity-90 transition-colors shrink-0 h-[32px] flex items-center justify-center"
              title="Export to Excel"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table: scrolls horizontally inside, page scrolls vertically */}
      <div className="order-list-table-table-container overflow-x-auto">
        <table className="order-list-table table w-full min-w-275 border-collapse">
          <thead className="bg-[#ffffff] border-b border-gray-200 sticky top-0 z-10 text-[3px]!important">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-2 py-2 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap ${header.column.id === "action" ? "text-center" : "text-left"
                      }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-2 py-2 text-[12px] text-[#3F4753] align-middle ${cell.column.id === "action" ? "text-right whitespace-nowrap" : ""
                        }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-8 text-center text-gray-500 text-[12px]"
                >
                  No orders found
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
            data.length
          )}{" "}
          of {data.length} results
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
  );
};

export default OrdersTable;
