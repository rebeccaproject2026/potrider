import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable Drawer Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Callback on close
 * @param {string} [props.width] - Optional width override (default: "w-[88vw]")
 * @param {string} [props.title] - Optional title for the header
 * @param {React.ReactNode} props.children - Drawer content
 * @param {boolean} [props.showCloseButton=true] - Whether to show the standard close button in header (if title is provided, specific header implementations inside children might skip this)
 */
const Drawer = ({
    isOpen,
    onClose,
    width = "w-[88vw]",
    children
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Slight delay to allow DOM render before transitioning transform
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full ${width} max-w-[100vw] bg-white z-50 shadow-xl transition-transform duration-300 ease-out flex flex-col`}
                style={{ transform: isVisible ? "translateX(0)" : "translateX(100%)" }}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </>
    );
};

export default Drawer;
