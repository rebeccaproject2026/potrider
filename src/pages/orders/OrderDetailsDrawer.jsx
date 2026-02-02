import { useEffect, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import Select from "../../components/Select";
import PastOrderCard from "../../components/order/PastOrderCard";
import StatsCards from "../../components/order/StatsCards";
import ProductsTable from "../../components/order/productsTable";

const DELIVERY_STEPS = [
  { key: "Ordered", label: "Ordered", description: "Order is in Ordered stage" },
  { key: "Packed", label: "Packed", description: "Order is in Packed stage" },
  { key: "Out For Delivery", label: "Out For Delivery", description: "Order is in Out For Delivery stage" },
  { key: "Delivered", label: "Delivered", description: "Order is in Delivered stage" },
];

const STATUS_TO_INDEX = {
  Ordered: 0,
  Packed: 1,
  "Out For Delivery": 2,
  OutForDelivery: 2,
  Delivered: 3,
};

const DRIVER_OPTIONS = [
  { value: "Abou Zidan Houssin", label: "Abou Zidan Houssin" },
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Smith", label: "Jane Smith" },
];
const COMPANY_OPTIONS = [
  { value: "Company A", label: "Company A" },
  { value: "Company B", label: "Company B" },
  { value: "Company C", label: "Company C" },
];
const HANDLER_OPTIONS = [
  { value: "Handler 1", label: "Handler 1" },
  { value: "Handler 2", label: "Handler 2" },
  { value: "Handler 3", label: "Handler 3" },
];

// Static display data (matches reference image) – used as fallback for now
const STATIC_ORDER = {
  orderId: "1769828433",
  customer: "Khaled Dardar",
  date: "January 30, 2026",
  time: "10:00 PM",
  productName: "Willo Gelato Mintz",
  price: "$75.00",
  grandTotal: "$83.25",
  couponCode: "N/A",
  couponAmount: null,
  savedText: "$6.75 - Redeemed",
  deliveryFee: "$15.00",
  paymentMethod: "Credit Card",
  transactionId: "pi_3SvUPqGu3NMzvKQU1yM4x1Ff_secret_t08Ylt5lAEwhdw1Bk8 MWIGsGa",
  paymentStatus: "Paid",
  type: "Delivery Express",
  deliveryStatus: "Ordered",
  storeCredit: "$10.99",
  handlerFee: "$10.99",
  availableCash: "$0",
  phone: "(647) 564-2400",
  email: "allushkhalid898@gmail.com",
  address: "51 Sixteen Mile Dr",
  city: "Oakville",
  province: "Ontario L6M 0W3",
};

// Static data for "below address" section (customer stats + most bought products)
const STATIC_CUSTOMER_STATS = [
  { label: "Total Orders", value: "4" },
  { label: "Delivered Orders", value: "3" },
  { label: "Cancelled Orders", value: "0" },
  { label: "Processing Orders", value: "1" },
  { label: "Total Spending", value: "$258.75" },
  { label: "Total Quantity", value: "85kg" },
  { label: "Used CHEETAH CA$H", value: "$95.65" },
  { label: "Coupons Used So Far", value: "165" },
  { label: "Same Day Deliveries", value: "69" },
  { label: "Express Deliveries", value: "35" },
  { label: "Amount Due", value: "$83.25" },
  { label: "Collection", value: "$9025.35" },
  { label: "Order Frequency", value: "5 Days" },
];

const STATIC_MOST_BOUGHT = [
  { no: 1, productName: "Pre-rolls", totalQty: "20 Units", amountSpent: "$200.00" },
  { no: 2, productName: "Fruity Pebbles OG", totalQty: "5 Grams", amountSpent: "$168.05" },
  { no: 3, productName: "Chocolope", totalQty: "4.9 Grams", amountSpent: "$168.05" },
  { no: 4, productName: "Willo Grape Ape", totalQty: "15 Units", amountSpent: "$160.65" },
  { no: 5, productName: "Euphoria Extractions Shatter Chews (3000 MG)", totalQty: "10 Units", amountSpent: "$100.16" },
];

const STATIC_LAST_ORDERED = "23 Aug, 2025 - 01:46 PM";

// Static data for Past Orders cards (3 cards – reusable card design)
const STATIC_PAST_ORDERS = [
  {
    orderId: "1769222658",
    orderDate: "January 23, 2026, 9:44 PM",
    status: "Delivered",
    statusVariant: "delivered", // delivered | ordered | packed | cancelled
    totalProducts: "1",
    productPrice: "$75.00",
    coupon: "N/A",
    cheetahCashRedeemed: "Did not Redeem",
    deliveryFee: "$15.00",
    totalPrice: "$90.00",
    orderType: "Online",
    orderMethod: "Delivery",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    transactionId: "pi_3SswpQGu3NMzvKQUOgs183zj_secret_SxEaNA4wbH8BWEFOFjU3YEpIf",
  },
  {
    orderId: "1769222657",
    orderDate: "January 20, 2026, 2:30 PM",
    status: "Ordered",
    statusVariant: "ordered",
    totalProducts: "2",
    productPrice: "$110.00",
    coupon: "NEW15",
    cheetahCashRedeemed: "$16.50",
    deliveryFee: "$10.00",
    totalPrice: "$105.00",
    orderType: "Online",
    orderMethod: "Delivery",
    paymentMethod: "e-transfer",
    paymentStatus: "Pending",
    transactionId: "pi_3SswpQGu3NMzvKQU1yM4x1Ff_secret_t08Ylt5lAEwh",
  },
  {
    orderId: "1769222656",
    orderDate: "January 15, 2026, 6:00 PM",
    status: "Packed",
    statusVariant: "packed",
    totalProducts: "1",
    productPrice: "$55.00",
    coupon: "N/A",
    cheetahCashRedeemed: "Did not Redeem",
    deliveryFee: "$12.00",
    totalPrice: "$67.00",
    orderType: "Online",
    orderMethod: "Same Day",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    transactionId: "pi_3SswpQGu3NMzvKQUOgs183zj_secret_AbCdEfGh",
  },
];

// Static data for Invoice Preview tab (matches reference image)
const STATIC_INVOICE = {
  deliveryAddress: {
    name: "Keri Deacon",
    phone: "(416) 558-9584",
    address: "617 Bloor St W, Toronto Ontario, M6G 1K8",
    email: "demo7486@gmail.com",
  },
  products: [
    { name: "Chocolope", qtyUnit: "1/4 OZ", quantity: "2", price: "$55.00", total: "$110.00", image: "" },
    { name: "Kush Kraft Panama Red", qtyUnit: "1 Unit", quantity: "2", price: "$37.00", total: "$74.00", image: "" },
    { name: "Euphoria Milk Chocolate 250mg", qtyUnit: "1 Unit", quantity: "1", price: "$22.00", total: "$22.00", image: "" },
  ],
  summary: {
    subtotal: "$115.96",
    promoCode: "Did not Redeem",
    discount: "$102.50",
    cheetahCash: "$5.00",
    deliveryFee: "$0.00",
    totalSavings: "$107.50",
    grandTotal: "$98.45",
  },
  paymentMethod: "Cash on Delivery",
  brandName: "CHILLIN CHEETAH",
};

const OrderDetailsDrawer = ({ isOpen, onClose, selectedOrder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Order Tracking");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedHandler, setSelectedHandler] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedOrder) {
      setSelectedDriver("");
      setSelectedCompany("");
      setSelectedHandler("");
    }
  }, [isOpen, selectedOrder?.id]);

  const completedStepIndex = useMemo(() => {
    if (!selectedOrder) return -1;
    const status = selectedOrder.deliveryStatus ?? selectedOrder.status ?? "";
    const idx = STATUS_TO_INDEX[status];
    return typeof idx === "number" ? idx : 0;
  }, [selectedOrder]);

  const completedAt = useMemo(() => {
    if (!selectedOrder) return null;
    const d = selectedOrder.date ?? "";
    const t = selectedOrder.time ?? "";
    if (!d && !t) return null;
    return t ? `${d}, ${t}` : d;
  }, [selectedOrder]);

  // Use static data as default; selectedOrder overrides when present
  const o = { ...STATIC_ORDER, ...(selectedOrder ?? {}) };
  const orderId = o.orderId ?? "—";
  const customerName = o.customer ?? "—";
  const dateTime = completedAt ?? (o.date && o.time ? `${o.date}, ${o.time}` : o.date ?? o.time ?? "—");
  const date = completedAt ?? (o.date ? `${o.date}` : "—");
  const paymentStatus = o.paymentStatus ?? "—";
  const paymentMethod = o.paymentMethod ?? "—";
  const type = o.type ?? "—";
  const deliveryStatus = o.deliveryStatus ?? o.status ?? "—";
  const isPaid = String(paymentStatus).toLowerCase() === "paid";
  const isCancelled = String(deliveryStatus).toLowerCase() === "cancelled";

  // Display items: use o.items if present, else single row from order
  const displayItems = useMemo(() => {
    if (Array.isArray(o.items) && o.items.length > 0) {
      return o.items.map((it) => ({
        name: it.name ?? "Order",
        qty: it.qty ?? "Price Per Unit",
        items: it.items ?? 1,
        price: it.price ?? o.price ?? "—",
        total: it.total ?? it.price ?? o.price ?? "—",
        image: it.image ?? "",
      }));
    }
    return [
      {
        name: o.productName ?? "Order",
        qty: "Price Per Unit",
        items: 1,
        price: o.price ?? "—",
        total: o.price ?? o.grandTotal ?? "—",
        image: o.productImage ?? "",
      },
    ];
  }, [o.items, o.productName, o.productImage, o.price, o.grandTotal]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 right-0 h-full w-[88vw] max-w-[100vw] bg-white z-50 shadow-xl transition-transform duration-300 ease-out flex flex-col"
        style={{ transform: isVisible ? "translateX(0)" : "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Order details"
      >
        {/* Blue header bar: Order # left, X right */}
        <div className="shrink-0 bg-[var(--color-secondary)] text-white flex items-center justify-between px-4 py-2">
          <span className="text-lg font-semibold truncate min-w-0">Order #{orderId}</span>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 text-white hover:bg-white/20 rounded transition-colors"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Two columns: left 70% scrollable, right 30% sticky */}
        <div className="flex-1 flex min-h-0 p-2.5">
          {/* LEFT column 70%: order details, product, pricing, payment, address, stats */}
          <div className="overflow-y-auto min-h-0  w-[65%] shrink-0 hide-scrollbar pl-2">
            {/* Items + Date + Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">1 Items</p>
                <p className="text-sm text-gray-600">Date: {dateTime}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
                >
                  <Icon icon="mdi:trash-can-outline" className="w-4 h-4 shrink-0" />
                  Delete Order
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded transition-colors"
                >
                  <Icon icon="mdi:pencil-outline" className="w-4 h-4 shrink-0" />
                  Edit Order
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#0066FF] hover:bg-[#0052CC] rounded transition-colors"
                >
                  <Icon icon="mdi:refresh" className="w-4 h-4 shrink-0" />
                  Reorder
                </button>
              </div>
            </div>

            <hr className="my-2 border-gray-200" />

            {/* Product / Item list (OrderDetails-style: image, name, qty, Items/Price/Total columns) */}
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-wrap items-center gap-2 py-2"
              >
                <div className="w-14 h-14 rounded-sm bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="text-sm font-semibold text-gray-900 hover:text-[#0066FF] underline">
                    {item.name}
                  </a>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <div className="flex gap-8 sm:gap-12 text-sm">
                  <span className="text-gray-600">
                    Items<br />
                    <span className="font-light text-gray-900 text-center flex justify-center">{item.items}</span>
                  </span>
                  <span className="text-gray-600">
                    Price<br />
                    <span className="font-light text-gray-900 flex justify-center">{item.price}</span>
                  </span>
                  <span className="text-gray-600">
                    Total<br />
                    <span className="font-light text-gray-900 flex justify-center">{item.total}</span>
                  </span>
                </div>
              </div>
            ))}

            <hr className="my-2 border-gray-200" />

            {/* Order Summary */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Subtotal</span>
                <span>{o.price ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Coupon</span>
                <span>{o.couponCode ? `${o.couponCode}${o.couponAmount ? ` / ${o.couponAmount}` : ""}` : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Discount</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">CHEETAH CA$H redeemed</span>
                <span>{o.savedText ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Delivery Fee</span>
                <span>{o.deliveryFee ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total Savings</span>
                <span>{o.savedText ?? "—"}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-1 text-base">
                <span>Grand Total</span>
                <span>{o.grandTotal ?? "—"}</span>
              </div>
            </div>

            <hr className="my-3 border-gray-200" />

            {/* Payment Information */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Payment Method</span>
                <span>{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Transaction ID</span>
                <span className="truncate max-w-[200px]" title={o.transactionId}>{o.transactionId ?? "—"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Payment Status</span>
                <span
                  className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}
                >
                  {paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Order Type</span>
                <span>{type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Order Status</span>
                <span
                  className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${isCancelled ? "bg-red-100 text-red-700" : "bg-[#E3EEFF] text-[#0066FF]"}`}
                >
                  {deliveryStatus}
                </span>
              </div>
            </div>

            <hr className="my-3 border-gray-400" />

            {/* Additional charges / credits */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Store Credit</span>
                <span>{o.storeCredit ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Handler Fee</span>
                <span>{o.handlerFee ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Available CHEETAH CA$H</span>
                <span>{o.availableCash ?? "—"}</span>
              </div>
            </div>

            <hr className="my-3 border-gray-400" />

            {/* Delivery Address Client Info */}
            <p className="text-sm font-semibold text-gray-900 mb-1">Delivery Address Client Info</p>
            <div className="text-sm text-gray-700 space-y-0.5 mb-6">
              <p>
                <a href="#" className="text-[var(--color-secondary)] font-semibold hover:underline">{customerName}</a>
              </p>
              <p>
                <a href={`tel:${o.phone ?? ""}`} className="text-[#000] hover:underline">{o.phone ?? "—"}</a>
              </p>
              <p>
                <a href={`mailto:${o.email ?? ""}`} className="text-[#000] hover:underline">{o.email ?? "—"}</a>
              </p>
              <p>
                <a href="#" className="text-[var(--color-secondary)] hover:underline">
                  {[o.address, o.city, o.province].filter(Boolean).join(", ") || "—"}
                </a>
              </p>
            </div>



            {/* Below address: Stats (title built in) + Most Bought (title built in) + Past Orders */}
            <StatsCards
              title={`${customerName}'s Stats`}
              subtitle={`Last ordered on ${STATIC_LAST_ORDERED}`}
              showDivider
              stats={STATIC_CUSTOMER_STATS}
              className="mb-1"
            />

            <div className="mt-5">
              <ProductsTable
                title={`${customerName}'s 5 Most Bought Products`}
                showDivider
                columns={[
                  { key: "no", header: "No.", align: "left" },
                  {
                    key: "productName",
                    header: "Product Name",
                    align: "left",
                    render: (row) => (
                      <a href="#" className="text-[var(--color-secondary)] text-[12px] underline font-extralight">
                        {row.productName}
                      </a>
                    ),
                  },
                  { key: "totalQty", header: "Total Qty", align: "right" },
                  { key: "amountSpent", header: "Amount Spent", align: "right" },
                  {
                    key: "action",
                    header: "Action",
                    align: "left",
                    render: () => (
                      <a href="#" className="text-[var(--color-secondary)] hover:underline text-xs font-semibold">
                        View Recent Order
                      </a>
                    ),
                  },
                ]}
                data={STATIC_MOST_BOUGHT}
                className="mb-4"
              />
            </div>

            <p className="text-lg font-semibold text-black mb-1">{customerName}&apos;s Past Orders</p>
            <hr className="border-gray-400 mb-3" />
            {STATIC_PAST_ORDERS.map((pastOrder) => (
              <PastOrderCard key={pastOrder.orderId} order={pastOrder} />
            ))}
          </div>

          {/* RIGHT column: tabs separate at top, then details panel below */}
          <div className="w-[35%] shrink-0 flex flex-col bg-white min-w-0">
            <div className="flex flex-col h-full overflow-hidden pl-3">
              <div className="shrink-0 flex gap-3 mb-2 ">
                <button
                  type="button"
                  onClick={() => setActiveTab("Order Tracking")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors rounded-sm ${activeTab === "Order Tracking"
                    ? "bg-[#212529] text-white border-none"
                    : "bg-white text-gray-600 border border-gray-800 hover:bg-gray-50"
                    }`}
                >
                  Order Tracking
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Invoice Preview")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors rounded-sm ${activeTab === "Invoice Preview"
                    ? "bg-[#212529] text-white border-none"
                    : "bg-white text-gray-600 border border-gray-800 hover:bg-gray-50"
                    }`}
                >
                  Invoice Preview
                </button>
              </div>
              {/* Details panel: Order header, assignment, Delivery Process – separate block below */}
              <div className="flex-1 overflow-y-auto min-h-0 rounded-sm border border-gray-200 bg-white  hide-scrollbar">
                {activeTab === "Order Tracking" && (
                  <div className="p-3 pb-4">
                    {/* Order # and Customer - same row */}
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <h2 className="text-lg font-medium text-[##212529] truncate min-w-0">Order #{orderId}</h2>
                      <p className="text-sm font-normal text-gray-700 truncate text-right shrink-0 mr-2.5">
                        Customer: {customerName}
                      </p>
                    </div>
                    {/* Drivers */}
                    <div className="mb-2">
                      <label className="text-sm font-bold text-gray-900 block mb-1.5">Drivers:</label>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 min-w-0">
                          <Select
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                            options={DRIVER_OPTIONS}
                            placeholder="Select driver"
                            className="w-full h-9 text-sm focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                          />
                        </div>
                        <button
                          type="button"
                          disabled={!selectedDriver}
                          className="shrink-0 h-8.5 px-10 text-sm font-medium text-white rounded-sm bg-[var(--color-secondary)]"
                        >
                          Assign
                        </button>
                      </div>
                    </div>

                    {/* Company and Handler - side by side with one Assign button */}
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 min-w-0">
                        <label className="text-sm font-bold text-gray-900 block mb-1.5">Company:</label>
                        <Select
                          value={selectedCompany}
                          onChange={(e) => setSelectedCompany(e.target.value)}
                          options={COMPANY_OPTIONS}
                          placeholder="Select company"
                          className="w-full h-9 text-sm focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-sm font-bold text-gray-900 block mb-1.5">Handler:</label>
                        <Select
                          value={selectedHandler}
                          onChange={(e) => setSelectedHandler(e.target.value)}
                          options={HANDLER_OPTIONS}
                          placeholder="Select handler"
                          className="w-full h-9 text-sm focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={!selectedCompany && !selectedHandler}
                        className="shrink-0 h-8.5 px-10 text-sm font-medium text-white rounded-sm bg-[var(--color-secondary)]"
                      >
                        Assign
                      </button>
                    </div>
                  </div>

                )}
                {activeTab === "Order Tracking" && !isCancelled && (
                  <>
                    <hr className=" border-gray-200 w-full" />
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-4">Delivery Process</h3>
                      <div className="relative  space-y-5">
                        <div className="absolute left-[11px] top-0 bottom-0 w-px " />
                        {DELIVERY_STEPS.map((step, idx) => {
                          const isCompleted = idx <= completedStepIndex;
                          const isOrderedStep = step.key === "Ordered";
                          return (
                            <div key={step.key} className="relative flex items-start gap-3">
                              <div className="relative z-10 flex items-center justify-center mt-0.5 shrink-0">
                                {isCompleted ? (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                                    <Icon icon="mdi:check" className="h-3.5 w-3.5" />
                                  </span>
                                ) : (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white" aria-hidden />
                                )}
                              </div>
                              <div className="flex-1 min-w-0 pt-0.5">
                                <p className="text-sm font-semibold text-gray-800">
                                  {step.label}:
                                </p>
                                <p className="text-sm font-normal text-gray-500 mt-0.5">{step.description}</p>
                                {isOrderedStep && completedAt && (
                                  <p className="text-xs font-normal text-green-600 flex items-center gap-1.5 mt-2 pl-0">
                                    <Icon icon="mdi:check" className="h-3.5 w-3.5 shrink-0" />
                                    Completed on {completedAt}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "Order Tracking" && !isCancelled && (
                  <div className="shrink-0 border-t border-gray-200 bg-white p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-sm transition-colors"
                      >
                        <Icon icon="mdi:trash-can-outline" className="w-4 h-4 shrink-0" />
                        Cancel Order
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-[var(--color-secondary)] hover:bg-[#0052CC] rounded-sm transition-colors"
                      >
                        <Icon icon="mdi:content-save-outline" className="w-4 h-4 shrink-0" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "Invoice Preview" && (
                  <div className="p-2">
                    {/* Action buttons – white bg, thin light grey border, rounded corners, icons left of text */}
                    <div className="flex gap-2 mb-6">
                      <button
                        type="button"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-[#000] bg-[#f8f9fa] hover:bg-[#d3d4d5] rounded-sm transition-colors border border-[#bfc4c8]"
                      >
                        <Icon icon="mdi:share-variant-outline" className="w-4 h-4 shrink-0 text-[#000]" />
                        Share Invoice
                      </button>
                      <button
                        type="button"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-[#000] bg-[#f8f9fa] hover:bg-[#d3d4d5] rounded-sm transition-colors border border-[#bfc4c8]"
                      >
                        <Icon icon="mdi:download-outline" className="w-4 h-4 shrink-0 text-[#000]" />
                        Download Invoice
                      </button>
                    </div>

                    {/* Branding (left) + Invoice details (right) – balanced header with space between */}
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <div className="flex flex-col items-start gap-1">
                        <div
                          className="w-12 h-12 rounded-full shrink-0 overflow-hidden flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #d97706 0%, #b45309 30%, #fef3c7 60%, #fef3c7 100%)",
                            boxShadow: "inset 0 0 0 1px rgba(120,53,15,0.2)",
                          }}
                        >
                          <Icon icon="mdi:cat" className="w-7 h-7 text-amber-900" />
                        </div>
                        <span
                          className="text-sm font-bold uppercase tracking-wide italic"
                          style={{
                            background: "linear-gradient(90deg, #16a34a 0%, #ca8a04 50%, #eab308 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            WebkitTextStroke: "0.5px #1e293b",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {STATIC_INVOICE.brandName}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-base font-bold text-black leading-snug">Invoice</p>
                        <p className="text-sm font-semibold text-black mt-1 leading-snug">Order #{orderId}</p>
                        <p className="text-sm font-semibold text-black mt-1 leading-snug">Date: <spam className="font-normal text-xs">
                          {date} </spam> </p>
                      </div>
                    </div>

                    {/* Delivery Address – bold heading; card with light grey bg, rounded corners, faint shadow */}
                    <p className="text-sm font-semibold text-gray-900 mb-1">Delivery Address</p>
                    <div className="rounded-sm bg-gray-100 p-2.5 shadow-sm mb-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {STATIC_INVOICE.deliveryAddress.name} - {STATIC_INVOICE.deliveryAddress.phone}
                      </p>
                      <p className="text-xs font-medium text-gray-600 mt-1">
                        {STATIC_INVOICE.deliveryAddress.address}
                      </p>
                      <p className="text-xs font-medium text-gray-600">
                        {STATIC_INVOICE.deliveryAddress.email}
                      </p>
                    </div>

                    {/* Product list – header semi-bold; thin separator below header; rows with image, name, Qty unit, qty centered, price/total right; total bold */}
                    <div className="mb-4 border-t border-gray-300">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300 ">
                            <th className="py-2.5 px-0 text-left font-medium text-gray-900">Product</th>
                            <th className="py-2.5 px-2 text-center font-medium text-gray-900">Quantity</th>
                            <th className="py-2.5 px-2 text-right font-medium text-gray-900">Price</th>
                            <th className="py-2.5 px-0 text-right font-medium text-gray-900">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {STATIC_INVOICE.products.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-200">
                              <td className="py-3 px-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-10 h-10 rounded bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
                                    {row.image ? (
                                      <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <Icon icon="mdi:package-variant" className="w-5 h-5 text-gray-400" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900">{row.name}</p>
                                    <p className="text-xs font-medium text-gray-600 mt-0.5">Qty: {row.qtyUnit}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center font-normal text-gray-800 text-[13px]">{row.quantity}</td>
                              <td className="py-3 px-2 text-right font-normal text-gray-800 text-[13px]">{row.price}</td>
                              <td className="py-3 px-0 text-right font-bold text-gray-900 text-[13px]">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Financial summary – light grey panel, rounded; Grand Total label bold; Subtotal & Grand Total values bold; thin row separators */}
                    <div className="rounded-sm bg-gray-100 p-2 shadow-sm">
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-800">Subtotal</span>
                        <span className="text-sm font-semibold text-gray-900">{STATIC_INVOICE.summary.subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-800">Promo Code</span>
                        <span className="text-sm font-semibold text-gray-500">{STATIC_INVOICE.summary.promoCode}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-800">Discount</span>
                        <span className="text-sm font-semibold text-gray-900">{STATIC_INVOICE.summary.discount}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-800">CHEETAH CA$H</span>
                        <span className="text-sm font-normal text-gray-900">{STATIC_INVOICE.summary.cheetahCash}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-800">Delivery Fee</span>
                        <span className="text-sm font-normal text-gray-900">{STATIC_INVOICE.summary.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-800">Total Savings</span>
                        <span className="text-sm font-normal text-gray-900">{STATIC_INVOICE.summary.totalSavings}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-900">Grand Total</span>
                        <span className="text-sm font-bold text-gray-900">{STATIC_INVOICE.summary.grandTotal}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 mt-0.5 ">
                        <span className="text-xs font-medium text-gray-800">Payment Method</span>
                        <span className="text-sm font-normal text-gray-900">{STATIC_INVOICE.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom action buttons: thin divider above, centered */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsDrawer;
