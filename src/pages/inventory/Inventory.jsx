import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  Trash2,
  Filter,
  Download,
} from "lucide-react";
import DatePickerMap from "../../components/DatePickerMap";
import InventorySummaryCard from "../../components/inventory/InventorySummaryCard";

const SUMMARY = [
  {
    label: "In Stock",
    count: 210,
    bgLight: "bg-[#D4FFDA]",
    textColor: "text-[#109F22]",
  },
  {
    label: "Low Stock",
    count: 10,
    bgLight: "bg-[#FFF5E5]",
    textColor: "text-[#FF9800]",
  },
  {
    label: "Out of Stock",
    count: 25,
    bgLight: "bg-[#FEECEB]",
    textColor: "text-[#F44336]",
  },
];

const STATUS_TABS = [
  { key: "all", label: "All", count: 245 },
  { key: "in_stock", label: "In Stock", count: 210 },
  { key: "low_stock", label: "Low Stock", count: 10 },
  { key: "out_of_stock", label: "Out of Stock", count: 25 },
];

const getInventoryColumns = (onView, onDelete) => [
  {
    accessorKey: "product",
    header: "Product",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "totalStock",
    header: "Total Stock",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="text-[12px] text-[#3F4753] text-right">
          <span className="block">{row.soldAmount}</span>
          <span className="block text-gray-500">{row.soldQty}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "reorder",
    header: "Reorder",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
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

const INVENTORY_DATA = [
  {
    id: "1",
    product: "Willo Wonderful Watermelon",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "200 Grams In-Stock",
    soldAmount: "$1925.52",
    soldQty: "150 Grams",
    reorder: "20",
  },
  {
    id: "2",
    product: "Willo Wonderful Watermelon",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "200 Grams In-Stock",
    soldAmount: "$1925.52",
    soldQty: "150 Grams",
    reorder: "20",
  },
  {
    id: "3",
    product: "Willo Wonderful Watermelon",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "200 Grams In-Stock",
    soldAmount: "$1925.52",
    soldQty: "150 Grams",
    reorder: "20",
  },
  {
    id: "4",
    product: "Willo Wonderful Watermelon",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "50 Grams Low-Stock",
    soldAmount: "$850.00",
    soldQty: "50 Grams",
    reorder: "20",
  },
  {
    id: "5",
    product: "Willo Wonderful Watermelon",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "20",
  },
];

const Inventory = () => {
  const [period, setPeriod] = useState({ start: null, end: null });
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    []
  );

  const filteredData = useMemo(() => {
    let result = [...INVENTORY_DATA];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (row) =>
          row.product?.toLowerCase().includes(q) ||
          row.category?.toLowerCase().includes(q) ||
          row.subcategory?.toLowerCase().includes(q)
      );
    }
    if (statusTab === "in_stock")
      result = result.filter(
        (r) =>
          (r.totalStock || "").includes("In-Stock") &&
          !(r.totalStock || "").includes("Low")
      );
    if (statusTab === "low_stock")
      result = result.filter((r) => (r.totalStock || "").includes("Low-Stock"));
    if (statusTab === "out_of_stock")
      result = result.filter((r) =>
        (r.totalStock || "").includes("Out of Stock")
      );
    return result;
  }, [search, statusTab]);

  const columns = useMemo(
    () =>
      getInventoryColumns(
        (row) => console.log("View", row),
        (row) => console.log("Delete", row)
      ),
    []
  );

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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DatePickerMap defaultItem={2} onUpdate={onDateUpdate} />
        <Link
          to="/inventory/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-(--color-primary) text-white rounded-sm hover:opacity-90 font-semibold text-sm"
        >
          <span className="text-lg leading-none">+</span>
          Add Inventory
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SUMMARY.map((item) => (
          <InventorySummaryCard
            key={item.label}
            label={item.label}
            count={item.count}
            textColor={item.textColor}
            bgLight={item.bgLight}
          />
        ))}
      </div>

      <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-full">
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
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusTab(tab.key)}
                  className={`px-2 py-1.5 w-full text-sm m-1 rounded ronded-2xl font-medium whitespace-nowrap ${
                    statusTab === tab.key
                      ? "bg-(--color-secondary) text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <button
              type="button"
              className="p-2.5 rounded-md bg-gray-700 text-white hover:bg-gray-800"
              title="Filter"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2.5 rounded-md bg-(--color-primary) text-white hover:opacity-90"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead className="bg-gray-100 border-b border-gray-200">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const colId = header.column.id ?? header.column.accessorKey;
                    const isRight =
                      colId === "action" ||
                      colId === "cost" ||
                      colId === "salePrice" ||
                      colId === "sold" ||
                      colId === "reorder";
                    return (
                      <th
                        key={header.id}
                        className={`px-3 py-2.5 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap ${
                          isRight ? "text-right" : "text-left"
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
                        colId === "cost" ||
                        colId === "salePrice" ||
                        colId === "sold" ||
                        colId === "reorder";
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-2 text-[12px] text-[#3F4753] align-middle ${
                            isRight ? "text-right" : "text-left"
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
                    No inventory found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50">
          <span className="text-xs text-gray-600">
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

export default Inventory;
