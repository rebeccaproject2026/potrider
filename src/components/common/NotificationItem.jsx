import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationItem = ({ item, onClick }) => {
    const { title, description, createdAt, icon, hasRead } = item;

    // Format date
    const dateStr = new Date(createdAt).toDateString();

    return (
        <div
            className={`flex items-center p-2 cursor-pointer transition-colors border-b border-gray-100 last:border-0 ${hasRead ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                }`}
            onClick={onClick}
        >
            <div className="mr-3 w-[42px] h-[42px] shrink-0">
                {/* Using a placeholder if image fails, or generic icon */}
                <img
                    src={`/images/${icon}`}
                    alt="icon"
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/42x42?text=N"; // Fallback
                    }}
                />
            </div>

            <div className="flex-1 min-w-0 mr-2">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate pr-2">{title}</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">{dateStr}</p>
                </div>

                <div className="text-sm text-gray-600 truncate" title={description}>
                    {description}
                </div>
            </div>

            <div className="text-gray-400">
                <ChevronRight size={16} />
            </div>
        </div>
    );
};

export default NotificationItem;
