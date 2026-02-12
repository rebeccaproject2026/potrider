import React, { useState } from 'react';
import OrderStatusCard from './OrderStatusCard';
import { Search, ChevronDown } from 'lucide-react';

const OrderPage = ({
  showFilters = true,
  showMap = false,
  pageType = 'pending', // 'pending' | 'delivered' | 'cancelled' | 'inprogress' | 'all'
  orders = [],
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample order data for demonstration
  const sampleOrders = [
    {
      id: 1,
      type: 'pending',
      address: '123 Main Street, Toronto, ON M5J 2N8',
      orderId: '302011',
      driver: 'Bob Johnson',
      orderAmount: '1325.26',
      orderQuantity: '10 Items',
      orderCreated: '5 Mar 2024',
      orderCreatedTime: '10:30 pm',
      eta: '11:30pm, Today',
      soldQuantity: '2.36g',
      receivedAmount: '1025.35',
      unpaidCollection: '1025.35',
      paidCollection: '25.35',
      deliveryStarted: '12/14/2024 at 06:53 pm',
      approximateArrival: '12/14/2024, 08:12 PM',
    },
    {
      id: 2,
      type: 'delivered',
      address: '123 Main Street, Toronto, ON M5J 2N8',
      orderId: '302011',
      driver: 'Bob Johnson',
      orderAmount: '1325.26',
      orderQuantity: '5 Items',
      orderCreated: '5 Mar 2024',
      orderCreatedTime: '10:30 pm',
      deliveredAt: '11:30pm, 12 Dec 2024',
      soldQuantity: '2.36g',
      receivedAmount: '1025.35',
      unpaidCollection: '1025.35',
      paidCollection: '25.35',
      deliveryStarted: '12/14/2024 at 06:53 pm',
      deliveredTime: '12/14/2024, 08:12 PM',
    },
    {
      id: 3,
      type: 'cancelled',
      address: '123 Main Street, Toronto, ON M5J 2N8',
      orderId: '302011',
      driver: 'Bob Johnson',
      orderAmount: '1325.26',
      orderQuantity: '2 Items',
      orderCreated: '5 Mar 2024',
      orderCreatedTime: '10:30 pm',
      cancelledAt: '11:30pm, 14 Jan 2025',
      cancelReason: 'the requested item is out of stock',
      soldQuantity: '2.36g',
      receivedAmount: '1025.35',
      unpaidCollection: '1025.35',
      paidCollection: '25.35',
      deliveryStarted: '12/14/2024 at 06:53 pm',
      cancelledTime: '12/14/2024, 08:12 PM',
    },
    {
      id: 4,
      type: 'inprogress',
      address: '123 Main Street, Toronto, ON M5J 2N8',
      orderId: '302011',
      driver: 'Jack Benson',
      orderAmount: '1325.26',
      orderQuantity: '10 Items',
      orderCreated: '5 Mar 2024',
      orderCreatedTime: '10:30 pm',
      deliveryDate: '15 Jan 2025 Today',
      eta: '11:30 pm',
      soldQuantity: '2.36g',
      receivedAmount: '1025.35',
      unpaidCollection: '1025.35',
      paidCollection: '25.35',
      deliveryStarted: '12/14/2024 at 06:53 pm',
      approximateArrival: '12/14/2024, 08:12 PM',
    },
  ];

  const ordersToDisplay = orders.length > 0 ? orders : sampleOrders;

  // Filter orders based on pageType or statusFilter
  const filteredOrders = ordersToDisplay.filter((order) => {
    const matchesType = pageType === 'all' || order.type === pageType;
    const matchesFilter = statusFilter === 'all' || order.type === statusFilter;
    const matchesSearch =
      searchValue === '' ||
      order.orderId.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.driver.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.address.toLowerCase().includes(searchValue.toLowerCase());

    return matchesType && matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Header Controls - Inline */}
      {showFilters && (
        <div className="mb-4 flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for order ID, customer, order status or something..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-sm pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Order Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Order Cards */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderStatusCard
            key={order.id}
            orderData={order}
            showMap={showMap}
            showActions={true}
            type={order.type}
          />
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 text-sm">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
