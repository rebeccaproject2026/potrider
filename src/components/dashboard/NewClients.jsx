const NewClients = ({ data, onViewAll }) => {
  const clients = data || [
    { id: 1, name: "Daniyal Sajid", avatar: null, orders: 3 },
    { id: 2, name: "Michael Hajas", avatar: null, orders: 2 },
    { id: 3, name: "Chris Cilruth", avatar: null, orders: 1 },
    { id: 4, name: "Adam Price", avatar: null, orders: 1 },
    { id: 5, name: "Crystal Soares", avatar: null, orders: 1 },
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
        <h2 className="text-base font-semibold text-gray-800">New Clients</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="space-y-1">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
              {client.avatar ? (
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-[#333333]">
                  {getInitials(client.name)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{client.name}</p>
              <p className="text-xs font-[450] text-[#6B7280]">{client.orders} Orders</p>
            </div>
            <div className="text-right shrink-0">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewClients;
