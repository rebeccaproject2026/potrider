import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

/**
 * Orders table columns definition
 * Returns columns array - should be wrapped in useMemo in the component
 */
export const getOrdersColumns = (onView, onDelete, onStatusClick, onCustomerClick, onCourierClick, onPaymentStatusClick) => [
  {
    accessorKey: "orderId",
    header: "Order#",
    cell: (info) => (
      <Link
        to={`/orders/${info.getValue()}`}
        className="text-[12px] text-blue-600 hover:underline font-medium"
      >
        {info.getValue()}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Details",
    cell: (info) => (
      <div className="leading-tight">
        <button
          type="button"
          onClick={() => onCustomerClick?.(info.row.original)}
          className="text-[12px] text-blue-600 hover:underline font-medium block text-left"
        >
          {info.row.original.customer}
        </button>
        <span className="text-[11px] text-gray-500">
          {info.row.original.phone}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "cash",
    header: "CA$H",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "couponCode",
    header: "Coupon",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] block">
          {info.getValue()}
        </span>
        {info.row.original.couponAmount && (
          <span className="text-[11px] text-gray-500">
            {info.row.original.couponAmount}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "courier",
    header: "Courier",
    cell: (info) => (
      <div className="leading-tight">
        <button
          onClick={() => onCourierClick?.(info.row.original)}
          className="text-[12px] text-blue-600 hover:underline font-medium block text-left"
        >
          {info.getValue()}
        </button>
        <span className="text-[11px] text-gray-500">
          {info.row.original.courierTips}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "grandTotal",
    header: "Grand Total",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] font-medium block">
          {info.getValue()}
        </span>
        <span className="text-[11px] text-gray-500">
          {info.row.original.savedText}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: (info) => {
      const value = info.getValue();
      const isLink =
        value === "Credit Card" || value === "Paypal" || value === "PayPal";
      return isLink ? (
        <a
          href="#"
          className="text-[12px] text-blue-600 hover:underline font-medium"
        >
          {value}
        </a>
      ) : (
        <span className="text-[12px] text-[#3F4753]">{value}</span>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: (info) => {
      const status = info.getValue();
      const isPaid = status === "Paid";
      return (
        <button
          onClick={() => onPaymentStatusClick?.(info.row.original)}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity ${isPaid ? "bg-[#D4FFDA] text-[#109F22]"
            : "bg-[#FFF5E5] text-[#FF9800]"
            }`}
        >
          {status}
        </button>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (info) => {
      const typeStr = info.getValue();
      const parts = typeStr ? String(typeStr).split(/\s+/) : [];
      const line1 = parts[0] || "";
      const line2 = parts.slice(1).join(" ") || "";
      return (
        <div className="leading-tight">
          {line1 && (
            <span className="text-[12px] text-[#3F4753] block">{line1}</span>
          )}
          {line2 && <span className="text-[12px] text-[#3F4753]">{line2}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: "City/Province",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] block">
          {info.getValue()},
        </span>
        <span className="text-[12px] text-[#3F4753]">
          {info.row.original.province}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => (
      <div className="leading-tight">
        <span className="text-[12px] text-[#3F4753] block">
          {info.getValue()}
        </span>
        <span className="text-[12px] text-[#3F4753]">
          {info.row.original.time}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: (info) => {
      const status = info.getValue();
      const isCancelled = status === "Cancelled";
      const rowData = info.row.original;

      return (
        <button
          onClick={() => onStatusClick?.(rowData)}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity ${isCancelled ? "bg-[#FEECEB] text-[#F44336]" : "bg-[#E3EEFF] text-[#0066FF]"
            }`}
          type="button"
        >
          {status}
        </button>
      );
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell: (info) => (
      <div className="flex items-center gap-1 justify-end">
        <button
          onClick={() => onView?.(info.row.original)}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(info.row.original)}
          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

/**
 * Sample orders data matching the image
 * Returns data array - should be wrapped in useMemo in the component
 */
export const getOrdersData = () => [
  {
    id: "1",
    orderId: "1769737448",
    customer: "Sarah H",
    phone: "(647) 355-4103",
    price: "$110",
    cash: "$0",
    couponCode: "NEW15",
    couponAmount: "$16.5",
    courier: "Abou Zidan Houssin",
    courierTips: "$1.5 Tips",
    grandTotal: "$105",
    savedText: "Saved $16.5",
    paymentMethod: "e-transfer",
    paymentStatus: "Pending",
    method: "Online",
    type: "Delivery Same Day",
    city: "Oakville",
    province: "Ontario",
    date: "29 January, 2026",
    time: "08:44 PM",
    deliveryStatus: "Ordered",
  },
  {
    id: "2",
    orderId: "1769737449",
    customer: "Christian Mason",
    phone: "(416) 555-1234",
    price: "$79",
    cash: "$19.35",
    couponCode: "HALFFREE",
    couponAmount: "$85",
    courier: "John Doe",
    courierTips: "$0 Tips",
    grandTotal: "$105",
    savedText: "Saved $0",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    method: "Online",
    type: "Delivery Express",
    city: "Mississauga",
    province: "Ontario",
    date: "29 January, 2026",
    time: "09:15 AM",
    deliveryStatus: "Ordered",
  },
  {
    id: "3",
    orderId: "1754305282",
    customer: "Frank Niya",
    phone: "(416) 558-9584",
    price: "$210.00",
    cash: "$0.00",
    couponCode: "FREE-PREROLLS",
    couponAmount: "$21",
    courier: "Sergei Savchenko",
    courierTips: "$0 Tips",
    grandTotal: "$105",
    savedText: "Saved $31",
    paymentMethod: "Cash On Delivery",
    paymentStatus: "Pending",
    method: "Online",
    type: "Delivery Same Day",
    city: "Oakville",
    province: "Ontario",
    date: "26 August, 2025",
    time: "08:41 PM",
    deliveryStatus: "Ordered",
  },
  {
    id: "4",
    orderId: "1769737450",
    customer: "Emma Wilson",
    phone: "(647) 123-4567",
    price: "$150",
    cash: "$0",
    couponCode: "N/A",
    couponAmount: null,
    courier: "Mike Johnson",
    courierTips: "$2 Tips",
    grandTotal: "$150",
    savedText: "Saved $0",
    paymentMethod: "Paypal",
    paymentStatus: "Paid",
    method: "Online",
    type: "Delivery Same Day",
    city: "Toronto",
    province: "Ontario",
    date: "29 January, 2026",
    time: "10:30 AM",
    deliveryStatus: "Cancelled",
  },
  {
    id: "5",
    orderId: "1769737451",
    customer: "David Lee",
    phone: "(416) 789-0123",
    price: "$95",
    cash: "$0",
    couponCode: "SAVE10",
    couponAmount: "$9.5",
    courier: "Alex Brown",
    courierTips: "$1 Tips",
    grandTotal: "$85.5",
    savedText: "Saved $9.5",
    paymentMethod: "e-transfer",
    paymentStatus: "Pending",
    method: "Online",
    type: "Delivery Express",
    city: "Brampton",
    province: "Ontario",
    date: "28 January, 2026",
    time: "03:20 PM",
    deliveryStatus: "Ordered",
  },
  {
    id: "6",
    orderId: "1769737452",
    customer: "Lisa Chen",
    phone: "(647) 456-7890",
    price: "$200",
    cash: "$0",
    couponCode: "N/A",
    couponAmount: null,
    courier: "Tom Smith",
    courierTips: "$0 Tips",
    grandTotal: "$200",
    savedText: "Saved $0",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    method: "Online",
    type: "Delivery Same Day",
    city: "Hamilton",
    province: "Ontario",
    date: "28 January, 2026",
    time: "05:45 PM",
    deliveryStatus: "Ordered",
  },
  {
    id: "7",
    orderId: "1769737453",
    customer: "Michael Park",
    phone: "(416) 234-5678",
    price: "$120",
    cash: "$0",
    couponCode: "WELCOME20",
    couponAmount: "$24",
    courier: "Sarah Johnson",
    courierTips: "$1.5 Tips",
    grandTotal: "$96",
    savedText: "Saved $24",
    paymentMethod: "Cash On Delivery",
    paymentStatus: "Pending",
    method: "Online",
    type: "Delivery Same Day",
    city: "Oakville",
    province: "Ontario",
    date: "27 January, 2026",
    time: "11:15 AM",
    deliveryStatus: "Ordered",
  },
  {
    id: "8",
    orderId: "1769737454",
    customer: "Jennifer Kim",
    phone: "(647) 890-1234",
    price: "$180",
    cash: "$0",
    couponCode: "N/A",
    couponAmount: null,
    courier: "Robert Taylor",
    courierTips: "$0 Tips",
    grandTotal: "$180",
    savedText: "Saved $0",
    paymentMethod: "Paypal",
    paymentStatus: "Paid",
    method: "Online",
    type: "Delivery Express",
    city: "Mississauga",
    province: "Ontario",
    date: "27 January, 2026",
    time: "02:30 PM",
    deliveryStatus: "Cancelled",
  },
  {
    id: "9",
    orderId: "1769737455",
    customer: "Robert Anderson",
    phone: "(416) 567-8901",
    price: "$140",
    cash: "$0",
    couponCode: "SUMMER15",
    couponAmount: "$21",
    courier: "Emily Davis",
    courierTips: "$2 Tips",
    grandTotal: "$119",
    savedText: "Saved $21",
    paymentMethod: "e-transfer",
    paymentStatus: "Pending",
    method: "Online",
    type: "Delivery Same Day",
    city: "Toronto",
    province: "Ontario",
    date: "26 January, 2026",
    time: "07:00 PM",
    deliveryStatus: "Ordered",
  },
  {
    id: "10",
    orderId: "1769737456",
    customer: "Amanda White",
    phone: "(647) 345-6789",
    price: "$165",
    cash: "$0",
    couponCode: "N/A",
    couponAmount: null,
    courier: "James Wilson",
    courierTips: "$0 Tips",
    grandTotal: "$165",
    savedText: "Saved $0",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    method: "Online",
    type: "Delivery Express",
    city: "Brampton",
    province: "Ontario",
    date: "26 January, 2026",
    time: "09:45 AM",
    deliveryStatus: "Ordered",
  },
  {
    id: "11",
    orderId: "1769737457",
    customer: "Daniel Martinez",
    phone: "(416) 678-9012",
    price: "$90",
    cash: "$0",
    couponCode: "FIRST10",
    couponAmount: "$9",
    courier: "Patricia Garcia",
    courierTips: "$1 Tips",
    grandTotal: "$81",
    savedText: "Saved $9",
    paymentMethod: "Cash On Delivery",
    paymentStatus: "Pending",
    method: "Online",
    type: "Delivery Same Day",
    city: "Hamilton",
    province: "Ontario",
    date: "25 January, 2026",
    time: "04:20 PM",
    deliveryStatus: "Ordered",
  },
  {
    id: "12",
    orderId: "1769737458",
    customer: "Sophia Thompson",
    phone: "(647) 012-3456",
    price: "$220",
    cash: "$0",
    couponCode: "N/A",
    couponAmount: null,
    courier: "Christopher Lee",
    courierTips: "$0 Tips",
    grandTotal: "$220",
    savedText: "Saved $0",
    paymentMethod: "Paypal",
    paymentStatus: "Paid",
    method: "Online",
    type: "Delivery Express",
    city: "Oakville",
    province: "Ontario",
    date: "25 January, 2026",
    time: "01:10 PM",
    deliveryStatus: "Ordered",
  },
];
