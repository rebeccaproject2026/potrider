const DriverPerformance = ({ data, onViewAll }) => {
  const drivers = data || [
    {
      id: 1,
      name: "Mike Wilson",
      avatar: null,
      onlineHours: "8.5 hrs",
      deliveries: 120,
      collected: "$1,234",
    },
    {
      id: 2,
      name: "John Henry",
      avatar: null,
      onlineHours: "7.2 hrs",
      deliveries: 119,
      collected: "$1,225",
    },
    {
      id: 3,
      name: "Nash John",
      avatar: null,
      onlineHours: "6.8 hrs",
      deliveries: 115,
      collected: "$1,204",
    },
    {
      id: 4,
      name: "Walliam Jackson",
      avatar: null,
      onlineHours: "8.5 hrs",
      deliveries: 115,
      collected: "$1,204",
    },
    {
      id: 5,
      name: "Jackson",
      avatar: null,
      onlineHours: "6.8 hrs",
      deliveries: 115,
      collected: "$1,204",
    },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-sm shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800 ">Driver Performance</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="space-y-1">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
              {driver.avatar ? (
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-600">
                  {getInitials(driver.name)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#333333]">{driver.name}</p>
              <p className="text-xs text-[#6B7280]">{driver.onlineHours} online</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-[#333333]">{driver.deliveries} deliveries</p>
              <p className="text-xs text-[#3F4753]">{driver.collected} collected</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverPerformance;
