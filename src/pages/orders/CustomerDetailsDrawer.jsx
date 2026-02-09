import React from "react";
import { Icon } from "@iconify/react";
import PastOrderCard from "../../components/order/PastOrderCard";
import StatsCards from "../../components/order/StatsCards";
import Drawer from "../../components/common/Drawer";
import ConfirmationModal from "../../components/common/ConfirmationModal";

// Static Data matching the screenshot/user request for the Customer View
const PAST_ORDERS = [
    {
        orderId: "1770366897",
        orderDate: "February 6, 2026 at 03:34 AM",
        status: "Ordered",
        statusVariant: "ordered",
        totalProducts: "15",
        productPrice: "$56.00",
        coupon: "N/A",
        cheetahCashRedeemed: "$2.56",
        deliveryFee: "$2.56",
        totalPrice: "$66.00",
        orderType: "Online",
        orderMethod: "Delivery",
        paymentMethod: "e-transfer",
        paymentStatus: "Pending",
        transactionId: "N/A",
    },
    {
        orderId: "1770366248",
        orderDate: "February 6, 2026 at 03:24 AM",
        status: "Ordered",
        statusVariant: "ordered",
        totalProducts: "15",
        productPrice: "$51.00",
        coupon: "N/A",
        cheetahCashRedeemed: "$2.56",
        deliveryFee: "$2.56",
        totalPrice: "$61.00",
        orderType: "Online",
        orderMethod: "Delivery",
        paymentMethod: "e-transfer",
        paymentStatus: "Pending",
        transactionId: "N/A",
    }
];

const CUSTOMER_STATS = [
    { label: "Total Orders", value: "825" },
    { label: "Delivered Orders", value: "1000" },
    { label: "Cancelled Orders", value: "89" },
    { label: "Processing Orders", value: "10" },
    { label: "Total Spending", value: "$9,825" },
    { label: "Total Quantity", value: "85kg" },
    { label: "Available CHEETAH CA$H", value: "$9,903" },
    { label: "Amount Due", value: "$1000.95" },
];

const CustomerDetailsDrawer = ({ isOpen, onClose, customerName = "Hitesh Prajapati" }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        console.log("Deleting client:", customerName);
        setShowDeleteConfirm(false);
        onClose(); // Close drawer after delete
        // In real app, trigger actual delete API here
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                width="w-[88vw] max-w-[100vw]"
            >
                {/* Header - Blue Bar */}
                <div className="bg-[#0066FF] text-white px-6 py-2 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">{customerName}</h1>
                    </div>
                    <button onClick={onClose} className="text-white hover:opacity-80">
                        <Icon icon="mdi:close" width="24" height="24" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Side - Past Orders */}
                    <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {PAST_ORDERS.map((order, idx) => (
                            <PastOrderCard key={idx} order={order} />
                        ))}
                    </div>

                    {/* Right Side - Customer Profile & Stats */}
                    <div className="w-[450px] shrink-0 bg-white  overflow-y-auto p-3 flex flex-col gap-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                        {/* Customer Profile Section */}
                        <div className="flex flex-col gap-3">
                            {/* Header: Avatar, Name, Delete Button */}
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-gray-200">
                                        <img src="https://i.pravatar.cc/150?u=hitesh" alt={customerName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-xs font-light text-[#3f4753] ">Customer</p>
                                        <h3 className="text-xl font-semibold text-[#424143] leading-tight">{customerName}</h3>
                                        <p className="text-[12.5px] font-medium text-[#3f4753] ">Since March 22, 2024</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDeleteClick}
                                    className="bg-[#F44336] text-white text-sm font-semibold px-1 py-2 rounded-sm flex items-center gap-1.5 hover:bg-red-600 transition-colors shadow-sm mt-3"
                                >
                                    <Icon icon="mdi:trash-can-outline" width="16" />
                                    Delete Client
                                </button>
                            </div>

                            {/* Details Card (Separate Box) */}
                            <div className="border border-gray-200 rounded-sm p-2 bg-white">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">Full Name</span>
                                        <span className="text-[14px] font-medium text-[#000]">John Henry</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">Phone Number</span>
                                        <span className="text-[14px] font-medium text-[#000]">+1 7685674653</span>
                                    </div>
                                    <div className="col-span-2 flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">Address</span>
                                        <span className="text-[14px] font-medium text-[#000] text-wrap">1833 Bel Meadow Drive, Bentley, Toronto 92335</span>
                                    </div>
                                </div>

                                <button className="w-full bg-[#000] text-white text-base font-medium py-1.5 rounded-sm flex items-center justify-center gap-2 hover:bg-[#424649] transition-colors cursor-pointer">
                                    <Icon icon="mdi:pencil" width="18" />
                                    Edit Customer Info
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <StatsCards stats={CUSTOMER_STATS} gridCols="grid-cols-2 gap-2" />

                        {/* View More Info Button */}
                        <button className="w-full bg-[#0066FF] text-white text-sm font-medium py-2 rounded-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors ">
                            <Icon icon="mdi:eye" width="18" />
                            View More Info
                        </button>

                    </div>
                </div>
            </Drawer >

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Client"
                message={`Are you sure you want to delete ${customerName}? This action cannot be undone.`}
                confirmText="Delete Client"
                confirmVariant="danger"
            />
        </>
    );
};

export default CustomerDetailsDrawer;
