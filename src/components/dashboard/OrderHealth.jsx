const OrderHealth = ({ data, onViewAll }) => {
  const ordersData = data || {
    totalOrderValue: "$4,578",
    totalOrders: 432,
    delivered: 324,
    pending: 45,
    cancelled: 42,
  };

  return (
    <div className="bg-white rounded-sm shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Orders</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="text-center">
          <p className="text-xs font-[450] text-[#3F4753] mb-2">Total Orders of</p>
          <p className="text-xl font-bold text-gray-900">{ordersData.totalOrderValue}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-[450] text-[#3F4753] mb-2">Total Orders</p>
          <p className="text-xl font-bold text-gray-900">{ordersData.totalOrders}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-[450] text-[#3F4753] mb-2">Delivered</p>
          <p className="text-xl font-bold text-green-600">{ordersData.delivered}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-[450] text-[#3F4753] mb-2">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{ordersData.pending}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-[450] text-[#3F4753] mb-2">Cancelled</p>
          <p className="text-xl font-bold text-red-600">{ordersData.cancelled}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderHealth;
