import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

/**
 * AvailableDriversTable
 * Uses the exact same structure as OrdersTable but with different data.
 * Relies on .order-list-table class for styling (imported from Tracking.css)
 */
const AvailableDriversTable = ({
    data = [],
    columns = [],
}) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [activeTab, setActiveTab] = useState("All"); // "All", "Online", "Offline", "Suspended"
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // Calculate counts for tabs
    const counts = useMemo(() => {
        return {
            All: data.length,
            Online: data.filter(d => d.status === "Online").length,
            Offline: data.filter(d => d.status === "Offline").length,
            Suspended: data.filter(d => d.status === "Suspended").length,
        };
    }, [data]);

    // Filter data based on Tab and Search
    const filteredData = useMemo(() => {
        let result = [...data];

        // Filter by Tab
        if (activeTab !== "All") {
            result = result.filter((row) => row.status === activeTab);
        }

        // Filter by Search
        if (globalFilter && globalFilter.trim() !== "") {
            const searchLower = globalFilter.toLowerCase();
            result = result.filter((row) =>
                row.driverName?.toLowerCase().includes(searchLower) ||
                row.phone?.toLowerCase().includes(searchLower) ||
                row.vehicle?.toLowerCase().includes(searchLower)
            );
        }

        return result;
    }, [data, activeTab, globalFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="min-w-0 max-w-full bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="p-3 border-b border-gray-200">
                <h2 className="text-[15px] font-bold text-[#212121] mb-3">
                    Available Drivers From Potrider
                </h2>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Search Bar - Full Width match Search in OrdersTable */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="search-input w-full pl-9 pr-4 py-2.5 text-[15px] border border-gray-300 rounded-sm bg-white focus:outline-none shadow-none"
                        />
                    </div>

                    {/* Tabs - Styled exactly like Tracking.jsx */}
                    <div className="flex-1 flex items-center rounded-sm border border-[#969696] bg-white p-1 min-w-0 h-[38px]">
                        {["All", "Online", "Offline", "Suspended"].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 px-4 h-full text-sm font-medium rounded-sm cursor-pointer transition-colors whitespace-nowrap
                            ${activeTab === tab
                                        ? "bg-[#0066FF] text-white shadow-sm"
                                        : "text-[#969696] hover:bg-gray-50 bg-transparent"
                                    }`}
                            >
                                {tab} ({counts[tab]})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table: scrolls horizontally inside, page scrolls vertically */}
            <div className="order-list-table-table-container overflow-x-auto">
                <table className="order-list-table table w-full min-w-[1100px] border-collapse">
                    <thead className="bg-[#ffffff] border-b border-gray-200 sticky top-0 z-10 text-[3px]!important">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`px-2 py-2 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap text-left`}
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
                                            className={`px-2 py-2 text-[12px] text-[#3F4753] align-middle`}
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
                                    colSpan={columns.length}
                                    className="px-4 py-8 text-center text-gray-500 text-[12px]"
                                >
                                    No drivers found
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

export default AvailableDriversTable;
