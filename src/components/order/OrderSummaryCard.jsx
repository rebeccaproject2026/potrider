import React from 'react';
import { Icon } from "@iconify/react";

const OrderSummaryCard = ({ item, onOpenTimeline, onOpenAnalytics }) => {
    return (
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
                        className="w-9 h-9 flex items-center justify-center rounded-full shrink-0"
                        style={{ backgroundColor: item.iconsBg }}
                    >
                        {item.iconClass ? (
                            <i className={item.iconClass} style={{ color: item.color, fontSize: "18px" }} aria-hidden="true" />
                        ) : (
                            <Icon icon="solar:documents-outline" width="18" height="18" color={item.color} />
                        )}
                    </div>
                    <button
                        onClick={() => onOpenTimeline?.(item)}
                        className="text-[12px] text-[#3F4753] font-bold underline hover:underline mt-2"
                    >
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
                        onClick={() => onOpenAnalytics?.(item)}
                        className="text-[10px] text-[#3F4753] font-bold underline hover:underline mt-6"
                    >
                        Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryCard;
