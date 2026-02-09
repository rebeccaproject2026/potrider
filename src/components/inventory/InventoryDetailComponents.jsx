import React from 'react';
import { Icon } from '@iconify/react';

export const StatCard = ({ label, value, subtext, subtextClass = "text-gray-500", className = "" }) => (
    <div className={`bg-[#FFFFFF] p-2 rounded-sm  flex flex-col justify-center min-h-[80px] ${className}`}>
        <p className="text-[#212121] text-xs font-medium mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-semibold text-[#212121]">{value}</h3>
            {subtext && <span className={`text-sm ${subtextClass}`}>{subtext}</span>}
        </div>
    </div>
);

export const InfoCard = ({ label, value, subtext, className = "" }) => (
    <div
        className={`bg-white p-2 rounded-sm border border-[#D8D8D8] ${className} flex flex-col min-h-[80px]`}
    >
        <p className="text-gray-900 font-bold underline text-sm">
            {label}
        </p>
        <div
            className={`flex flex-col ${subtext ? "justify-end" : "justify-center"
                }`}
        >
            <p className="text-[#212121] text-sm">{value}</p>
            {subtext && (
                <p className="text-[#212121] text-xs mt-1.5 italic">
                    {subtext}
                </p>
            )}
        </div>
    </div>


);

export const SectionCard = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden ${className}`}>
        {title && (
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-gray-800 font-bold text-sm">{title}</h3>
            </div>
        )}
        <div className="p-4">
            {children}
        </div>
    </div>
);

export const InputGroup = ({ label, value, unit, className = "" }) => (
    <div className={`flex flex-col h-full bg-white border border-gray-200 rounded-sm p-3 ${className}`}>
        <label className="text-xs font-bold text-gray-900 underline mb-1">{label}</label>
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{value}</span>
            {unit && <span className="text-xs text-gray-500">{unit}</span>}
        </div>
    </div>
);
