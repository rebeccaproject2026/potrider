const InventoryHealth = ({ data, onViewAll }) => {
  const inventoryData = data || {
    stockValue: "$124,578",
    addedStock: "523",
    lowStock: "110",
    outOfStock: "10",
  };

  const items = [
    { label: "Total Stock Value", value: inventoryData.stockValue },
    { label: "Total Stock Items", value: inventoryData.addedStock },
    { label: "Low Stock Items", value: inventoryData.lowStock },
    { label: "Out of Stock Items", value: inventoryData.outOfStock },
  ];

  return (
    <div className="bg-white rounded-sm shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[#000000]">Inventory</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="text-center">
            <p className="text-xs font-[450] text-[#3F4753] mb-2">{item.label}</p>
            <p className="text-lg font-bold text-[#333333]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryHealth;
