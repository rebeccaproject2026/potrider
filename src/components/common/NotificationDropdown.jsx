import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, ChevronRight } from 'lucide-react';
import NotificationItem from './NotificationItem';

const NotificationDropdown = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState(0); // 0: General, 1: Messages
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Static Data
    const notifications = [
        {
            _id: '1',
            title: 'Order #12345 Delivered',
            description: 'Your order has been successfully delivered by Driver John.',
            createdAt: '2023-10-25T10:00:00Z',
            icon: 'delivery-icon.png', // Placeholder path
            hasRead: false,
        },
        {
            _id: '2',
            title: 'New Message from Support',
            description: 'You have a new message regarding your inquiry.',
            createdAt: '2023-10-24T14:30:00Z',
            icon: 'support-icon.png',
            hasRead: true,
        },
        {
            _id: '3',
            title: 'System Update',
            description: 'System maintenance scheduled for tonight at 2 AM.',
            createdAt: '2023-10-23T09:15:00Z',
            icon: 'system-icon.png',
            hasRead: true,
        }
    ];

    const messages = [
        {
            chatId: '123456',
            unreadCount: 2,
        }
    ];

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />

            {/* Drawer */}
            <div
                ref={dropdownRef}
                className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out"
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
            >
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2 border-b border-gray-100 pb-2">
                        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-2 bg-gray-100 p-1 rounded-lg">
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 0 ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-gray-600 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab(0)}
                        >
                            General
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 1 ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-gray-600 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab(1)}
                        >
                            Messages
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-0.5">
                        {activeTab === 0 ? (
                            // General Notifications
                            notifications.length > 0 ? (
                                notifications.map(item => (
                                    <NotificationItem
                                        key={item._id}
                                        item={item}
                                        onClick={() => console.log('Clicked notification', item._id)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No notifications
                                </div>
                            )
                        ) : (
                            // Messages Tab
                            messages.length > 0 ? (
                                messages.map(msg => (
                                    <div key={msg.chatId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Mail size={20} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">Chat #{msg.chatId}</p>
                                                <p className="text-xs text-gray-500">{msg.unreadCount} unread message{msg.unreadCount !== 1 ? 's' : ''}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* Badge component could go here */}
                                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{msg.unreadCount}</span>
                                            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">View</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-2">
                                        <Mail size={24} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-500">No unread messages</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationDropdown;
