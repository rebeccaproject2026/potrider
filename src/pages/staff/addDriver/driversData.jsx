import { useState } from "react";
import { Eye, EyeIcon, Handshake } from "lucide-react";
import DriverDetailsDrawer from "./DriverDetailsDrawer";
import AreaCodesDrawer from "./AreaCodesDrawer";

/**
 * Drivers table columns definition matching the screenshot but using OrdersTable typography
 */
export const getDriversColumns = (onView, onHire, onViewAreaCodes) => [
    {
        accessorKey: "driverName",
        header: "Name",
        cell: (info) => (
            <div className="leading-tight">
                <span className="text-[12px] font-bold text-[#3F4753] block">
                    {info.getValue()}
                </span>
                <span className="text-[11px] text-gray-500">
                    {info.row.original.phone}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "areaCodes",
        header: "Area Codes",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
                <button
                    onClick={() => onViewAreaCodes?.(info.row.original)}
                    className="flex items-center justify-center p-0 text-[#0066FF] hover:opacity-80 cursor-pointer"
                >
                    <Eye className="w-4 h-4" />
                </button>
            </div>
        ),
    },
    {
        accessorKey: "joinDate",
        header: "Will Join From",
        cell: (info) => (
            <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
        ),
    },
    {
        accessorKey: "delivered",
        header: "Delivered",
        cell: (info) => (
            <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
        ),
    },
    {
        accessorKey: "rate",
        header: "Rate/Delivery",
        cell: (info) => (
            <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
        ),
    },
    {
        accessorKey: "hiredBy",
        header: "Hired by",
        cell: (info) => (
            <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
        ),
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: (info) => (
            <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
        ),
    },
    {
        accessorKey: "vehicle",
        header: "Vehicle",
        cell: (info) => (
            <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
            const status = info.getValue();
            let bgClass = "bg-gray-100 text-gray-600";
            if (status === "Online") bgClass = "bg-[#D4FFDA] text-[#109F22]";
            if (status === "Offline") bgClass = "bg-[#FEECEB] text-[#F44336]";
            if (status === "Suspended") bgClass = "bg-[#FFF5E5] text-[#FF9800]";

            return (
                <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${bgClass}`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        cell: (info) => (
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onView?.(info.row.original)}
                    className="flex items-center gap-1 cursor-pointer text-[12px] font-bold text-[#0066FF] hover:text-blue-700 transition-colors"
                >
                    <EyeIcon className="w-4 h-4" />
                    <span className="border-b">
                        View
                    </span>
                </button>
                <button
                    onClick={() => onHire?.(info.row.original)}
                    className="flex items-center gap-1 text-[12px] cursor-pointer font-bold text-[#109F22] hover:text-green-700 transition-colors"
                >
                    <Handshake className="w-3.5 h-3.5" />
                    <span className="border-b">
                        Hire
                    </span>
                </button>
            </div>
        ),
    },
];

/**
 * Dummy drivers data matching the screenshot
 */
export const getDriversData = () => [
    {
        id: "1",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "110 Orders",
        rate: "$10.00",
        hiredBy: "10 Stores",
        rating: "4.5",
        vehicle: "2023 Hyundai Kona",
        status: "Online",
    },
    {
        id: "2",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "90 Orders",
        rate: "$11.00",
        hiredBy: "3 Stores",
        rating: "5",
        vehicle: "2020 Mazda3",
        status: "Offline",
    },
    {
        id: "3",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "90 Orders",
        rate: "$12.50",
        hiredBy: "5 Stores",
        rating: "1.5",
        vehicle: "BrightDrop Zevo 600",
        status: "Suspended",
    },
    {
        id: "4",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "70 Orders",
        rate: "$10.00",
        hiredBy: "16 Stores",
        rating: "4",
        vehicle: "Ford E-Transit",
        status: "Online",
    },
    {
        id: "5",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "110 Orders",
        rate: "$10.00",
        hiredBy: "21 Stores",
        rating: "3",
        vehicle: "Motiv EPIC4",
        status: "Online",
    },
    {
        id: "6",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "70 Orders",
        rate: "$10.00",
        hiredBy: "10 Stores",
        rating: "4.8",
        vehicle: "BrightDrop Zevo 600",
        status: "Online",
    },
    {
        id: "7",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "110 Orders",
        rate: "$10.00",
        hiredBy: "10 Stores",
        rating: "4.9",
        vehicle: "BrightDrop Zevo 600",
        status: "Online",
    },
    {
        id: "8",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "90 Orders",
        rate: "$10.00",
        hiredBy: "10 Stores",
        rating: "4.5",
        vehicle: "BrightDrop Zevo 600",
        status: "Online",
    },
    {
        id: "9",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "110 Orders",
        rate: "$10.00",
        hiredBy: "10 Stores",
        rating: "4.5",
        vehicle: "BrightDrop Zevo 600",
        status: "Online",
    },
    {
        id: "10",
        driverName: "David Doe",
        phone: "+1 123456 7890",
        areaCodes: "5+",
        joinDate: "12 Dec 2023",
        delivered: "90 Orders",
        rate: "$10.00",
        hiredBy: "10 Stores",
        rating: "4.5",
        vehicle: "BrightDrop Zevo 600",
        status: "Online",
    },
];

/**
 * DriversDataWithDrawer - Wrapper component that manages drawer state
 * Use this component instead of directly using getDriversColumns
 */
export const DriversDataWithDrawer = ({ children }) => {
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAreaCodesDrawerOpen, setIsAreaCodesDrawerOpen] = useState(false);

    const handleView = (driver) => {
        setSelectedDriver(driver);
        setIsDrawerOpen(true);
    };

    const handleHire = (driver) => {
        console.log("Hire driver:", driver);
        // Add hire logic here
    };

    const handleViewAreaCodes = (driver) => {
        setSelectedDriver(driver);
        setIsAreaCodesDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedDriver(null), 300);
    };

    const handleCloseAreaCodesDrawer = () => {
        setIsAreaCodesDrawerOpen(false);
        setTimeout(() => setSelectedDriver(null), 300);
    };

    return (
        <>
            {children({ onView: handleView, onHire: handleHire, onViewAreaCodes: handleViewAreaCodes })}
            <DriverDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                driver={selectedDriver}
            />
            <AreaCodesDrawer
                isOpen={isAreaCodesDrawerOpen}
                onClose={handleCloseAreaCodesDrawer}
                driver={selectedDriver}
                onViewMoreDetails={handleView}
                onHire={handleHire}
            />
        </>
    );
};
