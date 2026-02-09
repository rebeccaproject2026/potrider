import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ActionModal = ({
    isOpen,
    onClose,
    title,
    children,
    onAction,
    actionLabel = "Assign",
    maxWidth = "max-w-md",
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-10">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Panel */}
            <div
                className={`relative bg-white rounded-sm shadow-xl w-full ${maxWidth} transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} flex flex-col`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="px-4 py-2.5 border-b border-gray-200 flex items-center justify-between shrink-0">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-800 cursor-pointer transition-colors p-1"
                    >
                        <Icon icon="mdi:close" width="27" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {children}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2 border-t border-gray-200 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 text-sm font-medium text-white bg-[#6c757d] rounded hover:bg-[#5a6268] transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onAction}
                        className="px-3 py-2 text-sm font-medium text-white bg-[var(--color-primary)] border rounded-sm  transition-colors flex items-center justify-center min-w-[80px]"

                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;
