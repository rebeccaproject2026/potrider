import { RotateCcw } from "lucide-react";

/**
 * Order History View - Shows list of customer orders
 */
const OrderHistoryView = ({ orders = [] }) => {
  // Sample orders data if none provided
  const ordersList = orders.length > 0 ? orders : [
    {
      id: "#123548541",
      date: "01 Aug, 2025 - 05:55 PM",
      customerName: "Jane Doe",
      phone: "+1 123 456 7890",
      email: "janedoe2020@gmail.com",
      items: 12,
      amount: "$259.99",
      orderMethod: "Delivery",
      paymentMethod: "Credit Card"
    },
    {
      id: "#123540052",
      date: "01 Aug, 2025 - 05:55 PM",
      customerName: "Jane Doe",
      phone: "+1 123 456 7890",
      email: "janedoe2020@gmail.com",
      items: 5,
      amount: "$159.99",
      orderMethod: "Shipping",
      paymentMethod: "e-transfer"
    },
    {
      id: "#123540052",
      date: "01 Aug, 2025 - 05:55 PM",
      customerName: "Jane Doe",
      phone: "+1 123 456 7890",
      email: "janedoe2020@gmail.com",
      items: 5,
      amount: "$159.99",
      orderMethod: "Shipping",
      paymentMethod: "e-transfer"
    },
    {
      id: "#123540052",
      date: "01 Aug, 2025 - 05:55 PM",
      customerName: "Jane Doe",
      phone: "+1 123 456 7890",
      email: "janedoe2020@gmail.com",
      items: 5,
      amount: "$159.99",
      orderMethod: "Shipping",
      paymentMethod: "e-transfer"
    }
  ];

  const handleReorder = (orderId) => {
    console.log('Reorder:', orderId);
    // Add reorder logic here
  };

  return (
    <div className="p-2 bg-white">
      <h2 className="text-lg font-bold text-black mb-2">Order History</h2>
      <div className="space-y-2">
        {ordersList.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-sm p-2 bg-white shadow-sm relative"
          >
            {/* Reorder Button */}


            {/* Order Details */}
            <div className="space-y-0.5">
              <div className="flex">
                <p className="text-base font-bold text-black">
                  Order Id: <span className="underline">{order.id}</span>
                </p>
                <>
                  <button
                    onClick={() => handleReorder(order.id)}
                    className="absolute top-2 right-1 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-sm font-semibold text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reorder
                  </button>
                </>
              </div>

              <p className="text-sm font-semibold text-black">{order.date}</p>
              <p className="text-base font-bold text-black">{order.customerName}</p>
              <p className="text-base font-medium text-[#434343]">{order.phone}</p>
              <p className="text-base font-normal text-[#434343]">{order.email}</p>
              <p className="text-base font-semibold text-[#434343]">
                <span className="font-bold text-[#434343]">Items:</span> {order.items}
              </p>
              <p className="text-base font-semibold text-[#434343]">
                <span className="font-bold text-[#434343]">Order Amount:</span> {order.amount}
              </p>
              <p className="text-base font-semibold text-gray-700">
                <span className="font-bold text-[#434343]">Order Method:</span> {order.orderMethod}
              </p>
              <p className="text-base font-semibold text-gray-700">
                <span className="font-bold text-[#434343]">Payment Method:</span> {order.paymentMethod}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default OrderHistoryView;
