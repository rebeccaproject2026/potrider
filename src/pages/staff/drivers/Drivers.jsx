import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState, useMemo } from "react";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";
import Select from "../../../components/Select";
import { Search, Eye, Download } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AreaCodesDrawer from "../addDriver/AreaCodesDrawer";
import DriverDetailsDrawer from "../addDriver/DriverDetailsDrawer";

const CARD_DATA = [
  {
    title: "Total Orders",
    value: "10,650",
    change: "+ 22%",
    isPositive: true,
  },
  {
    title: "Orders Delivered",
    value: "9825",
    change: "- 22%",
    isPositive: false,
  },
  { title: "Orders Canceled", value: "102", change: "+ 22%", isPositive: true },
  {
    title: "Orders Rescheduled",
    value: "135",
    change: "+ 22%",
    isPositive: true,
  },
];

const STATUS_TABS = [
  { key: "all", label: "All", count: 152 },
  { key: "online", label: "Online", count: 20 },
  { key: "offline", label: "Offline", count: 100 },
  { key: "suspended", label: "Suspended", count: 32 },
];

const DRIVERS_DATA = [
  {
    id: 1,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "12 Dec 2023",
    startingDateISO: "2023-12-12T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "Potrider",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "Online",
  },
  {
    id: 2,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "12 Dec 2023",
    startingDateISO: "2023-12-12T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "Potrider",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "New",
  },
  {
    id: 3,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "12 Dec 2023",
    startingDateISO: "2023-12-12T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "You",
    pendingDeliveries: 5,
    paidSalary: "$5,020.00",
    status: "Suspended",
  },
  {
    id: 4,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "15 Jan 2024",
    startingDateISO: "2024-01-15T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "You",
    pendingDeliveries: 10,
    paidSalary: "$5,020.00",
    status: "Offline",
  },
  {
    id: 5,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "20 Feb 2024",
    startingDateISO: "2024-02-20T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "Potrider",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "Online",
  },
  {
    id: 6,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "05 Jan 2025",
    startingDateISO: "2025-01-05T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "Potrider",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "Online",
  },
  {
    id: 7,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "10 Feb 2026",
    startingDateISO: "2026-02-10T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "You",
    pendingDeliveries: 25,
    paidSalary: "$5,020.00",
    status: "Offline",
  },
  {
    id: 8,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "09 Feb 2026",
    startingDateISO: "2026-02-09T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "Potrider",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "Online",
  },
  {
    id: 9,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "08 Feb 2026",
    startingDateISO: "2026-02-08T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "You",
    pendingDeliveries: 32,
    paidSalary: "$5,020.00",
    status: "Suspended",
  },
  {
    id: 10,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "01 Feb 2026",
    startingDateISO: "2026-02-01T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "Potrider",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "Online",
  },
  {
    id: 11,
    name: "David Doe",
    phone: "+1 123456 7890",
    areaCodes: "5+",
    startingDate: "15 Jan 2026",
    startingDateISO: "2026-01-15T00:00:00.000Z",
    delivered: "110 Orders",
    driverBy: "You",
    pendingDeliveries: 50,
    paidSalary: "$5,020.00",
    status: "Offline",
  },
];

const Drivers = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState({ start: null, end: null });
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [selectedDriverFilter, setSelectedDriverFilter] = useState("all");
  const [isAreaCodesDrawerOpen, setIsAreaCodesDrawerOpen] = useState(false);
  const [isDriverDetailsDrawerOpen, setIsDriverDetailsDrawerOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  const filteredData = useMemo(() => {
    let result = [...DRIVERS_DATA];

    // Filter by date range
    if (period.start && period.end) {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);

      result = result.filter((r) => {
        const driverDate = new Date(r.startingDateISO);
        return driverDate >= startDate && driverDate <= endDate;
      });
    }

    // Filter by driver type (All Drivers / Potrider / You)
    if (selectedDriverFilter === "potrider") {
      result = result.filter((r) => r.driverBy === "Potrider");
    } else if (selectedDriverFilter === "you") {
      result = result.filter((r) => r.driverBy === "You");
    }
    // "all" shows everything, no filter needed

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (row) =>
          row.name?.toLowerCase().includes(q) ||
          row.phone?.toLowerCase().includes(q) ||
          row.driverBy?.toLowerCase().includes(q)
      );
    }

    // Filter by status tab
    if (statusTab === "online") {
      result = result.filter((r) => r.status === "Online");
    } else if (statusTab === "offline") {
      result = result.filter((r) => r.status === "Offline");
    } else if (statusTab === "suspended") {
      result = result.filter((r) => r.status === "Suspended");
    }
    // "all" shows everything, no filter needed

    return result;
  }, [search, statusTab, selectedDriverFilter, period]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[13px] text-[#3F4753]">
              {row.original.name}
            </span>
            <span className="text-[11px] text-[#8B8B8B] font-normal">
              {row.original.phone}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "areaCodes",
        header: "Area Codes",
        cell: ({ getValue, row }) => (
          <div className="flex items-center gap-2">
            <span className="text-[#3F4753] text-[12px] font-normal">{getValue()}</span>
            <Eye 
              className="w-3.5 h-3.5 text-[#0066FF] cursor-pointer" 
              onClick={() => {
                setSelectedDriver(row.original);
                setIsAreaCodesDrawerOpen(true);
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "startingDate",
        header: "Starting Date",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] font-normal text-[12px]">{getValue()}</span>
        ),
      },
      {
        accessorKey: "delivered",
        header: "Delivered",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px] font-normal">{getValue()}</span>
        ),
      },
      {
        accessorKey: "driverBy",
        header: "Driver By",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px] font-light">{getValue()}</span>
        ),
      },
      {
        accessorKey: "pendingDeliveries",
        header: "Pending Deliveries",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] font-light text-[12px]">{getValue()}</span>
        ),
      },
      {
        accessorKey: "paidSalary",
        header: "Paid Salary",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px] font-normal">{getValue()}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          const statusColors = {
            Online: "bg-[#D4FFDA] text-[#109F22]",
            New: "bg-[#FEECEB] text-[#F44336]",
            Suspended: "bg-[#FFF5E5] text-[#FF9800]",
            Offline: "bg-gray-100 text-gray-600",
          };
          return (
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${statusColors[status] || "bg-gray-100 text-gray-700"}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => navigate(`/staff/drivers/${row.original.id}`)}
            className="inline-flex items-center justify-center gap-1 text-[#0066FF] hover:text-blue-700 text-[12px] font-semibold cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 stroke-2" />
            View
          </button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DatePickerMap defaultItem={2} onUpdate={onDateUpdate} className="h-10 sm:*:w-76" />
        <div className="flex items-center gap-2">
          <Select
            value={selectedDriverFilter}
            onChange={(e) => setSelectedDriverFilter(e.target.value)}
            placeholder="All Drivers"
            className="h-10"
            options={[
              { value: "all", label: "All Drivers" },
              { value: "potrider", label: "Potrider Drivers" },
              { value: "you", label: "Your Drivers" },
            ]}
            customStyle="sm:w-[220px]"
          />
          <Link
            to="/staff/add-driver"
            className="inline-flex items-center gap-2 px-4 w-auto max-w-50 py-2.5 bg-(--color-primary) text-white rounded-sm hover:opacity-90 font-semibold text-sm"
          >
            <span className="text-lg leading-none">+</span>
            Add Driver
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CARD_DATA.map((card) => (
          <FinanceSummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            isPositive={card.isPositive}
          />
        ))}
      </div>

      <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden p-4">
        <div className="flex items-center gap-2">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#DDDDDD] rounded-sm bg-white focus:outline-none"
            />
          </div>
          <div className="flex w-full rounded-sm overflow-hidden border border-[#969696] bg-white">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusTab(tab.key)}
                className={`px-2 py-1.5 w-full text-xs m-1 rounded ronded-2xl font-medium whitespace-nowrap ${statusTab === tab.key
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
            className="p-2.5 rounded-[5px] bg-(--color-primary) text-white hover:opacity-90"
            title="Export"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-[#CDCDCD] sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isCenter = header.id === "status" || header.id === "action";
                    return (
                      <th
                        key={header.id}
                        className={`py-2.5 text-[11px] font-semibold text-[#3F4753] tracking-wider whitespace-nowrap ${isCenter ? "text-center" : "text-left"}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => {
                    const isCenter = cell.column.id === "status" || cell.column.id === "action";
                    return (
                      <td key={cell.id} className={`px-1.5 py-2 text-[12px] text-[#3F4753] align-middle ${isCenter ? "text-center" : "text-left"}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
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
                  className={`min-w-7 px-1.5 py-1 text-[12px] rounded ${table.getState().pagination.pageIndex + 1 === pageNum
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
      
      {/* Area Codes Drawer */}
      <AreaCodesDrawer
        isOpen={isAreaCodesDrawerOpen}
        onClose={() => {
          setIsAreaCodesDrawerOpen(false);
          setTimeout(() => setSelectedDriver(null), 300);
        }}
        driver={selectedDriver}
        onViewMoreDetails={(driver) => {
          setIsAreaCodesDrawerOpen(false);
          setIsDriverDetailsDrawerOpen(true);
        }}
        onHire={(driver) => {
          console.log('Hire driver:', driver);
          // Add hire logic here
        }}
      />
      
      {/* Driver Details Drawer */}
      <DriverDetailsDrawer
        isOpen={isDriverDetailsDrawerOpen}
        onClose={() => {
          setIsDriverDetailsDrawerOpen(false);
          setTimeout(() => setSelectedDriver(null), 300);
        }}
        driver={selectedDriver}
      />
    </div>
  );
};

export default Drivers;
