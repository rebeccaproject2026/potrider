import React, { useState, useEffect } from "react";
import "./QuantityTimelineDrawer.css";

const QuantityTimelineDrawer = ({
    isOpen,
    onClose,
    title = "Quantity",
    items = []
}) => {
    const [isVisible, setIsVisible] = useState(false);
    // Track expanded items by index
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    const toggleItem = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (!isVisible && !isOpen) return null;
    return (
        <>
            <div className={`timeline-drawer-slider ${isOpen ? "active" : ""}`} id="nc-timeline">
                <div className="timeline-drawer-header mb-1">
                    <p className="timeline-drawer-title">{title}</p>
                    <button onClick={onClose} className="timeline-drawer-closer" title="Close">
                        {/* Using a simple X if FontAwesome is not guaranteed, or could use the Icon component if preferred. 
                 The CSS handles the sizing. */}
                        <span style={{ fontSize: '29px', lineHeight: '0' }}>×</span>
                    </button>
                </div>

                <div className="accordion cust-acc-1">
                    <div className="timeline-wrapper">
                        {/* Timeline Line */}
                        <div className="timeline-line"></div>

                        {items?.map((item, index) => {
                            const isExpanded = !!expandedItems[index];
                            return (
                                <div key={index} className="accordion-item">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className={`accordion-button shadow-none ${!isExpanded ? 'collapsed' : ''}`}
                                        type="button"
                                    >
                                        <div className="pq-header-row">
                                            {/* Dot */}
                                            <div className="timeline-dot"></div>

                                            <div className="pq-title-1">
                                                {item.first}
                                            </div>

                                            <div className="right-content">
                                                <div className="pq-text-2">
                                                    {item.second}
                                                </div>
                                                <span className="accordion-arrow">
                                                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    <div className={`timeline-accordion-collapse ${isExpanded ? "show" : ""}`}>
                                        <div className="accordion-body">
                                            {item.details && item.details.map((detail, dIndex) => (
                                                <div key={dIndex} className="mb-2">
                                                    <div className="pq-detail-row">
                                                        <div className="pq-title-2 text-start flex-1">
                                                            {detail.first}
                                                        </div>
                                                        <div className="pq-title-2 fw-semibold text-end ps-3 shrink-0 pr-5">
                                                            {detail.second || ""}
                                                        </div>
                                                    </div>
                                                    {detail.third && (
                                                        <div className="d-flex justify-space-between align-lg-center py-0 my-0">
                                                            <p className="pq-title-2 py-0 my-0">
                                                                {detail.third}
                                                            </p>
                                                            <p className="pq-title-2 fw-semibold py-0 my-0 pr-5">
                                                                {detail.fourth}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {detail.fifth && (
                                                        <div className="d-flex justify-space-between align-lg-center py-0 my-0">
                                                            <p className="pq-title-2 py-0 my-0">
                                                                {detail.fifth}
                                                            </p>
                                                            <p className="pq-title-2 fw-semibold py-0 my-0 pr-5">
                                                                {detail.sixth}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Backdrop */}
            <div
                className={`timeline-backdrop ${isOpen ? "open" : ""}`}
                onClick={onClose}
            ></div>
        </>
    );
};

export default QuantityTimelineDrawer;
