const MostSellingArea = ({ data, onViewAll }) => {
  const tableData = data || [
    {
      areaCode: "M2N 3X0",
      driver: "John Henry",
      totalSales: "201 kg",
      collection: "$821.00",
      unpaidCollection: "$21.00",
      orders: 43,
    },
    {
      areaCode: "M2N 3X1",
      driver: "Noah John",
      totalSales: "152 kg",
      collection: "$590.00",
      unpaidCollection: "$50.00",
      orders: 34,
    },
    {
      areaCode: "M2N 3X2",
      driver: "William Jackson",
      totalSales: "92 kg",
      collection: "$435.00",
      unpaidCollection: "$12.00",
      orders: 30,
    },
    {
      areaCode: "M2N 3X3",
      driver: "Jackson",
      totalSales: "93 kg",
      collection: "$348.00",
      unpaidCollection: "$0",
      orders: 20,
    },
    {
      areaCode: "M2N 3X4",
      driver: "Noah John",
      totalSales: "86 kg",
      collection: "$307.00",
      unpaidCollection: "$61.00",
      orders: 26,
    },
  ];

  return (
    <div className="bg-white rounded-sm shadow p-4 h-full">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Most Selling Area</h2>
        <button
          onClick={onViewAll}
          className="text-[var(--color-primary)] hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-1 text-xs font-semibold text-[#3E3834]">Area Code</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#3E3834]">Drivers</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#3E3834]">Total Sales</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#3E3834]">Collection</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#3E3834]">Unpaid Collection</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#3E3834]">Orders</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2 text-sm font-medium text-[#969696]">{item.areaCode}</td>
                <td className="py-3 px-2 text-sm ">
                  <a href="#" className="text-[#0066FF] hover:text-blue-800 hover:underline">
                    {item.driver}
                  </a>
                </td>
                <td className="py-3 px-2 text-sm text-[#969696]">{item.totalSales}</td>
                <td className="py-3 px-2 text-sm text-[#969696]">{item.collection}</td>
                <td
                  className={`py-3 px-2 text-sm font-medium ${parseFloat(item.unpaidCollection.replace("$", "")) > 0
                    ? "text-[#FF9800]"
                    : "text-green-600"
                    }`}
                >
                  {item.unpaidCollection}
                </td>
                <td className="py-3 px-2 text-sm text-gray-700">{item.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MostSellingArea;
