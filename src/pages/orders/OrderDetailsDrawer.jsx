import { useEffect, useState, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import Select from "../../components/Select";
import Input from "../../components/Input";
import PastOrderCard from "../../components/order/PastOrderCard";
import StatsCards from "../../components/order/StatsCards";
import ProductsTable from "../../components/order/productsTable";
import PaymentDrawer from "../../components/order/PaymentDrawer";
import QuantityTimelineDrawer from "../../components/common/QuantityTimelineDrawer";
import Drawer from "../../components/common/Drawer";

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

const PAYMENT_OPTIONS = [
  { id: "cash", label: "Cash", icon: "ph:money-wavy-bold" },
  { id: "etransfer", label: "E-transfer", icon: "mdi:cash-sync" },
  { id: "creditcard", label: "Credit Card", icon: "ph:credit-card-bold" },
  { id: "crypto", label: "Crypto", icon: "ph:currency-btc-bold" },
];

// Product options for Select dropdown (with avatar and product info)
const PRODUCT_OPTIONS = [
  {
    value: "1",
    label: "Gorilla Glue",
    image: "",
    priceRange: "$10.00 - $205.00",
    stockStatus: "In-stock: 3 - Low Stock",
    meta: "Category: Weed • Genetics: Hybrid • THC: 22 - 25% • CBD: 0 - 1% • CBN: 0 - 0.5%",
  },
  {
    value: "2",
    label: "Kush Kraft Black Gas",
    image: "",
    priceRange: "$37.00",
    stockStatus: "In-stock: 99",
    meta: "Category: Weed • Genetics: Indica • THC: 20 - 25% • CBD: 0 - 1% • CBN: 0 - 1%",
  },
  {
    value: "3",
    label: "Buudabomb Taro Taro 500mg",
    image: "",
    priceRange: "$40.00",
    stockStatus: "In-stock: 0 - Out of Stock",
    meta: "Category: Edible • Genetics: Hybrid • THC: 500MG • CBD: 20MG • CBN: 10MG",
  },
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

// Timeline data for recent orders by product
const PRODUCT_TIMELINE_DATA = {
  "Pre-rolls": [
    {
      first: "12 Dec 2025",
      second: "$200.00",
      details: [
        { first: "Order #302011", second: "$200.00", third: "12 Items", fourth: "Delivered" },
        { first: "Order #302010", second: "$25.00", third: "5 Items", fourth: "Pending" },
      ],
    },
    {
      first: "11 Dec 2025",
      second: "$150.00",
      details: [
        { first: "Order #302009", second: "$150.00", third: "8 Items", fourth: "Delivered" },
      ],
    },
  ],
  "Fruity Pebbles OG": [
    {
      first: "10 Dec 2025",
      second: "$168.05",
      details: [
        { first: "Order #302008", second: "$168.05", third: "5 Grams", fourth: "Delivered" },
      ],
    },
  ],
  "Chocolope": [
    {
      first: "09 Dec 2025",
      second: "$168.05",
      details: [
        { first: "Order #302007", second: "$168.05", third: "4.9 Grams", fourth: "Delivered" },
      ],
    },
  ],
  "Willo Grape Ape": [
    {
      first: "08 Dec 2025",
      second: "$160.65",
      details: [
        { first: "Order #302006", second: "$160.65", third: "15 Units", fourth: "Delivered" },
      ],
    },
  ],
  "Euphoria Extractions Shatter Chews (3000 MG)": [
    {
      first: "07 Dec 2025",
      second: "$100.16",
      details: [
        { first: "Order #302005", second: "$100.16", third: "10 Units", fourth: "Delivered" },
      ],
    },
  ],
};

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
  const [activeTab, setActiveTab] = useState("Order Tracking");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedHandler, setSelectedHandler] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGenetics, setSelectedGenetics] = useState("All");
  const [selectedCBD, setSelectedCBD] = useState("");
  const [selectedCBN, setSelectedCBN] = useState("");
  const [selectedTHC, setSelectedTHC] = useState("");
  const [selectedProductValue, setSelectedProductValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("");
  const [timelineDrawerOpen, setTimelineDrawerOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    storeCredit: "",
    handlerFee: "",
    availableCash: "",
    customerName: "",
    phone: "",
    email: "",
    address: "",
    subtotal: "",
    coupon: "",
    discount: "",
    cheetahCash: "",
    deliveryFee: "",
    totalSavings: "",
    grandTotal: "",
  });
  const [stepChecked, setStepChecked] = useState({});
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // eslint-disable-next-line no-undef
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
      setIsEditMode(false);
      // Initialize edit form data
      const o = { ...STATIC_ORDER, ...(selectedOrder ?? {}) };
      setEditFormData({
        storeCredit: o.storeCredit ?? "",
        handlerFee: o.handlerFee ?? "",
        availableCash: o.availableCash ?? "",
        customerName: o.customer ?? "",
        phone: o.phone ?? "",
        email: o.email ?? "",
        address: [o.address, o.city, o.province].filter(Boolean).join(", ") || "",
        subtotal: o.price ?? "$59.50",
        coupon: o.couponCode ?? "Did not Redeem",
        discount: "$102.50",
        cheetahCash: o.savedText ?? "Did not Redeem",
        deliveryFee: o.deliveryFee ?? "$0.00",
        totalSavings: o.savedText ?? "$10.5",
        grandTotal: o.grandTotal ?? "$69.50",
      });
      // Map payment method to payment option id
      const pm = o.paymentMethod && o.paymentMethod !== "—" ? o.paymentMethod.toLowerCase() : "cash";
      const paymentId = pm.includes("cash") ? "cash" : pm.includes("transfer") || pm.includes("e-transfer") ? "etransfer" : pm.includes("credit") ? "creditcard" : pm.includes("crypto") ? "crypto" : "cash";
      setPaymentMethod(paymentId);
      setSelectedProducts([]);
      setSelectedCategory("All");
      setSelectedGenetics("All");
      setSelectedCBD("");
      setSelectedCBN("");
      setSelectedTHC("");
      setSelectedProductValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedOrder?.id]);

  // const completedStepIndex = useMemo(() => {
  //   if (!selectedOrder) return -1;
  //   const status = selectedOrder.deliveryStatus ?? selectedOrder.status ?? "";
  //   const idx = STATUS_TO_INDEX[status];
  //   return typeof idx === "number" ? idx : 0;
  // }, [selectedOrder]);
  // Dummy timeline data
  const timelineData = [
    {
      first: "05 November 2025",
      second: "14.00gm",
      details: [
        { first: "#89 - Mango - at 12:40pm", second: "3.20gm" },
        { first: "#88 - Sugar - at 12:36pm", second: "0.40gm" },
        { first: "#87 - Tea, Mango, ginger - at 12:35pm", second: "10.40gm" },
      ],
    },
    {
      first: "26 November 2025",
      second: "7.20gm",
      details: [
        { first: "#144 - yogurt - at 09:15pm", second: "0.50gm" },
        { first: "#143 - new test - at 09:05pm", second: "6.30gm" },
        { first: "#142 - yogurt - at 09:04pm", second: "0.40gm" },
      ],
    },
    {
      first: "29 January 2026",
      second: "57.90gm",
      details: [
        { first: "#144 - yogurt - at 09:15pm", second: "0.50gm" },
        { first: "#143 - new test - at 09:05pm", second: "6.30gm" },
        { first: "#142 - yogurt - at 09:04pm", second: "0.40gm" },
      ],
    },
    {
      first: "01 February 2026",
      second: "55.50gm",
      details: [
        { first: "#144 - yogurt - at 09:15pm", second: "0.50gm" },
        { first: "#143 - new test - at 09:05pm", second: "6.30gm" },
        { first: "#142 - yogurt - at 09:04pm", second: "0.40gm" },
      ],
    },
    {
      first: "03 February 2026",
      second: "82.50gm",
      details: [],
    },
  ];
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
  const orderPaymentMethod = o.paymentMethod ?? "—";
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

  // Update quantities when displayItems change
  useEffect(() => {
    if (isOpen) {
      const initialQuantities = {};
      displayItems.forEach((item, idx) => {
        initialQuantities[idx] = item.items ?? 1;
      });
      setProductQuantities(initialQuantities);
    }
  }, [displayItems, isOpen]);

  const handleQuantityChange = (index, delta) => {
    setProductQuantities((prev) => {
      const newQty = Math.max(1, (prev[index] ?? 1) + delta);
      return { ...prev, [index]: newQty };
    });
  };

  // Handler for adding products from Select Product dropdown
  const handleAddProduct = (e) => {
    const productId = e.target.value;
    if (!productId) return;
    const product = PRODUCT_OPTIONS.find((p) => p.value === productId);
    if (!product) return;
    // Allow duplicates - add same product multiple times
    const newProduct = {
      id: `${productId}-${Date.now()}`, // Unique ID for each addition (allows duplicates)
      name: product.label,
      image: product.image,
      price: product.priceRange.split(" - ")[0] || product.priceRange,
      stockStatus: product.stockStatus,
      meta: product.meta,
      sizeOptions: ["1 Gram", "1/8 OZ", "1/4 OZ", "1/2 OZ", "1 OZ"],
      selectedSize: "1 Gram",
      quantity: 1,
      itemTotal: product.priceRange.split(" - ")[0] || product.priceRange,
    };
    setSelectedProducts((prev) => [...prev, newProduct]);
    setSelectedProductValue(""); // Reset selection
  };

  // Handler for removing products
  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Handler for changing product quantity
  const handleProductQuantityChange = (id, delta) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta), itemTotal: `$${(parseFloat(p.price.replace("$", "")) * Math.max(1, p.quantity + delta)).toFixed(2)}` } : p
      )
    );
  };

  // Handler for selecting product size
  const handleSizeSelect = (id, size) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedSize: size } : p))
    );
  };

  // Handler for payment method selection - opens drawer for E-transfer, Credit Card, and Crypto
  const handlePaymentMethodClick = useCallback((paymentId) => {
    if (paymentId === "etransfer" || paymentId === "creditcard" || paymentId === "crypto") {
      setPaymentMethod(paymentId);
      setActivePaymentMethod(paymentId);
      setPaymentDrawerOpen(true);
    } else {
      // For Cash, just select it without opening drawer
      setPaymentMethod(paymentId);
      setPaymentDrawerOpen(false);
    }
  }, []);

  // Close payment drawer
  const handleClosePaymentDrawer = useCallback(() => {
    setPaymentDrawerOpen(false);
  }, []);

  const handleSubmit = async () => {
    try {
      // Prepare data for API call
      const submitData = {
        orderId: orderId,
        productQuantities: productQuantities,
        editFormData: editFormData,
        selectedProducts: selectedProducts,
        paymentMethod: paymentMethod,
        selectedDriver: selectedDriver,
        selectedCompany: selectedCompany,
        selectedHandler: selectedHandler,
        filters: {
          category: selectedCategory,
          genetics: selectedGenetics,
          cbd: selectedCBD,
          cbn: selectedCBN,
          thc: selectedTHC,
        },
      };

      // TODO: Replace with actual API call
      // Example:
      // const response = await fetch(`/api/orders/${orderId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submitData),
      // });
      // if (!response.ok) throw new Error('Failed to save order');
      // const result = await response.json();

      // For now, just log the data (static implementation)
      console.log("Order update data:", submitData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Exit edit mode after successful save
      setIsEditMode(false);

      // Show success message (you can add toast notification here)
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again.");
    }
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
    // Reset form data to original values
    const o = { ...STATIC_ORDER, ...(selectedOrder ?? {}) };
    setEditFormData({
      storeCredit: o.storeCredit ?? "",
      handlerFee: o.handlerFee ?? "",
      availableCash: o.availableCash ?? "",
      customerName: o.customer ?? "",
      phone: o.phone ?? "",
      email: o.email ?? "",
      address: [o.address, o.city, o.province].filter(Boolean).join(", ") || "",
      subtotal: o.price ?? "$59.50",
      coupon: o.couponCode ?? "Did not Redeem",
      discount: "$102.50",
      cheetahCash: o.savedText ?? "Did not Redeem",
      deliveryFee: o.deliveryFee ?? "$0.00",
      totalSavings: o.savedText ?? "$10.5",
      grandTotal: o.grandTotal ?? "$69.50",
    });
    // Map payment method to payment option id
    const pm = o.paymentMethod && o.paymentMethod !== "—" ? o.paymentMethod.toLowerCase() : "cash";
    const paymentId = pm.includes("cash") ? "cash" : pm.includes("transfer") || pm.includes("e-transfer") ? "etransfer" : pm.includes("credit") ? "creditcard" : pm.includes("crypto") ? "crypto" : "cash";
    setPaymentMethod(paymentId);
    // Reset quantities
    const initialQuantities = {};
    displayItems.forEach((item, idx) => {
      initialQuantities[idx] = item.items ?? 1;
    });
    setProductQuantities(initialQuantities);
    setSelectedProducts([]);
  };
  // Get initial step checked state based on order status
  const getInitialStepChecked = useCallback((status) => {
    const idx = DELIVERY_STEPS.findIndex((s) => s.key === status);
    const i = idx >= 0 ? idx : 0;
    const initial = {};
    DELIVERY_STEPS.forEach((s, j) => {
      initial[s.key] = j <= i;
    });
    return initial;
  }, []);
  useEffect(() => {
    if (selectedOrder) {
      const status = selectedOrder.deliveryStatus || selectedOrder.currentStatus || "Ordered";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStepChecked(getInitialStepChecked(status));
    }
  }, [selectedOrder, getInitialStepChecked]);
  const handleStepChange = useCallback((stepKey, checked) => {
    setStepChecked((prev) => {
      const next = { ...prev };
      const idx = DELIVERY_STEPS.findIndex((s) => s.key === stepKey);
      if (checked) {
        for (let i = 0; i <= idx; i++) next[DELIVERY_STEPS[i].key] = true;
      } else {
        for (let i = idx; i < DELIVERY_STEPS.length; i++) next[DELIVERY_STEPS[i].key] = false;
      }
      return next;
    });
  }, []);

  // Check if a step is disabled (can't skip steps)
  const isStepDisabled = useCallback((stepKey) => {
    const idx = DELIVERY_STEPS.findIndex((s) => s.key === stepKey);
    if (idx === 0) return false;
    return !stepChecked[DELIVERY_STEPS[idx - 1].key];
  }, [stepChecked]);
  if (!isOpen) return null;

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        width="w-[88vw] max-w-[100vw]"
      >
        {/* Unified view - fields become editable when isEditMode is true */}
        <>
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
                <div className="flex flex-wrap gap-1">
                  {!isEditMode ? (
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
                      >
                        <Icon icon="mdi:trash-can-outline" className="w-4 h-4 shrink-0" />
                        Delete Order
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditMode(true)}
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
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleCloseEdit}
                        className="inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-white bg-red-500  rounded-sm transition-colors"
                      >
                        <Icon icon="mdi:close" className="w-4 h-4 shrink-0" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-green-600 rounded-sm transition-colors"
                      >
                        <Icon icon="mdi:content-save-outline" className="w-4 h-4 shrink-0" />
                        Save
                      </button>

                    </>
                  )}
                </div>
              </div>

              <hr className="my-2 border-gray-200" />

              {/* Product / Item list (OrderDetails-style: image, name, qty, Items/Price/Total columns) */}
              {displayItems.map((item, idx) => {
                const qty = productQuantities[idx] ?? item.items ?? 1;
                const pricePerUnit = parseFloat(String(item.price || "0").replace("$", "").replace(",", "")) || 0;
                const totalPrice = (pricePerUnit * qty).toFixed(2);
                return (
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
                    <div className="flex gap-8 sm:gap-12 text-sm items-center">
                      <span className="text-gray-600">
                        Items<br />
                        {isEditMode ? (
                          <div className="flex items-center gap-1 border border-gray-300 bg-gray-50 rounded mt-1">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(idx, -1)}
                              className="px-2 py-1 text-gray-900 font-semibold text-base"
                            >
                              –
                            </button>
                            <span className="px-3 py-1 text-base font-medium text-gray-900 min-w-8 text-center ">{qty}</span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(idx, 1)}
                              className="px-2 py-1 text-gray-900  text-base"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="font-light text-gray-900 text-center flex justify-center">{item.items}</span>
                        )}
                      </span>
                      <span className="text-gray-600">
                        Price<br />
                        <span className="font-light text-gray-900 flex justify-center">{item.price}</span>
                      </span>
                      <span className="text-gray-600">
                        Total<br />
                        <span className="font-light text-gray-900 flex justify-center">{isEditMode ? `$${totalPrice}` : item.total}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
              {!isEditMode ? (
                <hr className="my-2 border-gray-200" />
              ) : null}


              {/* Add Products Section - Only show in edit mode */}
              {isEditMode && (
                <>
                  <div className="mt-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Products</h3>
                    <hr className="my-2 border-gray-200" />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-1">Select Category</label>
                        <Select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          options={[
                            { value: "All", label: "All" },
                            { value: "Category 1", label: "Category 1" },
                            { value: "Category 2", label: "Category 2" },
                          ]}
                          placeholder="Select Category"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-1">Select Genetics</label>
                        <Select
                          value={selectedGenetics}
                          onChange={(e) => setSelectedGenetics(e.target.value)}
                          options={[
                            { value: "All", label: "All" },
                            { value: "Genetics 1", label: "Genetics 1" },
                            { value: "Genetics 2", label: "Genetics 2" },
                          ]}
                          placeholder="Select Genetics"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-1">Select CBD:</label>
                        <Select
                          value={selectedGenetics}
                          onChange={(e) => setSelectedCBD(e.target.value)}
                          options={[
                            { value: "All", label: "All" },
                            { value: "Genetics 1", label: "Genetics 1" },
                            { value: "Genetics 2", label: "Genetics 2" },
                          ]}
                          placeholder="Select Genetics"
                          className="w-full"
                          minWidth={150}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-1">Select CBN:</label>
                        <Select
                          value={selectedGenetics}
                          onChange={(e) => setSelectedCBN(e.target.value)}
                          options={[
                            { value: "All", label: "All" },
                            { value: "Genetics 1", label: "Genetics 1" },
                            { value: "Genetics 2", label: "Genetics 2" },
                          ]}
                          placeholder="Select Genetics"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-1">Select THC:</label>
                        <Select
                          value={selectedGenetics}
                          onChange={(e) => setSelectedTHC(e.target.value)}
                          options={[
                            { value: "All", label: "All" },
                            { value: "Genetics 1", label: "Genetics 1" },
                            { value: "Genetics 2", label: "Genetics 2" },
                          ]}
                          placeholder="Select Genetics"
                          className="w-full"
                        />
                      </div>
                    </div>
                    {/* Select Product - Full Width */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-[#212121] mb-1">Select Product</label>
                      <Select
                        showSearch
                        searchPlaceholder="Select a product"
                        placeholder="Select a product"
                        value={selectedProductValue}
                        onChange={handleAddProduct}
                        options={PRODUCT_OPTIONS}
                        showAvatar
                        showProductInfo
                        className="w-full"
                      />
                    </div>

                    {/* Selected Products - Full Width */}
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Selected Products</h3>
                      {selectedProducts.length === 0 ? (
                        <p className="text-sm text-gray-500">No Products Selected.</p>
                      ) : (
                        <div className="space-y-3">
                          {selectedProducts.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-start gap-3 p-1.5 border border-gray-200 rounded-sm bg-white w-full"
                            >
                              {/* Product Image */}
                              <div className="w-24 h-24 rounded-sm bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Icon
                                    icon="mdi:package-variant"
                                    className="w-8 h-8 text-gray-400"
                                  />
                                )}
                              </div>

                              {/* Product Content */}
                              <div className="flex-1 min-w-0">
                                {/* Name */}
                                <p className="font-semibold text-sm text-gray-900">
                                  {product.name}
                                </p>

                                {/* Price + Stock */}
                                <p className="text-sm font-semibold text-[#212529bf] mt-0.5">
                                  {product.price}
                                  <span className="text-xs font-semibold text-[#212529bf] ml-1">
                                    ({product.stockStatus})
                                  </span>
                                </p>

                                {/* Meta + Quantity + Price + Delete (ONE ROW) */}
                                <div className="flex items-center justify-between gap-4">
                                  {/* Category / Meta */}
                                  <p className="text-[12.3px] font-medium text-[#212529bf] line-clamp-2 flex-1">
                                    {product.meta}
                                  </p>

                                  {/* Right Controls */}
                                  <div className="flex items-center gap-4 shrink-0">
                                    {/* Quantity */}
                                    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-sm h-8 px-1">
                                      <button
                                        type="button"
                                        onClick={() => handleProductQuantityChange(product.id, -1)}
                                        disabled={product.quantity <= 1}
                                        className="w-8 text-lg font-medium text-gray-700 disabled:text-gray-400"
                                      >
                                        −
                                      </button>
                                      <span className="w-8 text-center text-sm font-semibold text-gray-900">
                                        {product.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleProductQuantityChange(product.id, 1)}
                                        className="w-8 text-lg font-medium text-gray-700"
                                      >
                                        +
                                      </button>
                                    </div>

                                    {/* Item Total */}
                                    <p className="font-semibold text-sm text-gray-900 min-w-[60px] text-right">
                                      {product.itemTotal}
                                    </p>

                                    {/* Remove */}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveProduct(product.id)}
                                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                                      aria-label="Remove"
                                    >
                                      <Icon
                                        icon="mdi:trash-can-outline"
                                        className="w-5 h-5"
                                      />
                                    </button>
                                  </div>
                                </div>

                                {/* Size Options */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {product.sizeOptions.map((size) => (
                                    <button
                                      key={size}
                                      type="button"
                                      onClick={() => handleSizeSelect(product.id, size)}
                                      className={`px-3 py-1 text-xs font-medium rounded-xs border transition
                                        ${product.selectedSize === size
                                          ? "bg-[var(--color-primary)] text-white border-green-600"
                                          : "bg-white text-[#000] border-gray-300 hover:bg-gray-100"
                                        }
                                      `}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="my-3 border-gray-200" />
                </>
              )}

              {/* Order Summary */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Subtotal</span>
                  <span>{o.price ?? "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Coupon</span>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={editFormData.coupon}
                      onChange={(e) => setEditFormData({ ...editFormData, coupon: e.target.value })}
                      placeholder="Did not Redeem"
                      width="w-32"
                      className="text-right bg-gray-100 border-gray-400"
                      compact
                    />
                  ) : (
                    <span>{o.couponCode ? `${o.couponCode}${o.couponAmount ? ` / ${o.couponAmount}` : ""}` : "N/A"}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Discount</span>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={editFormData.discount}
                      onChange={(e) => setEditFormData({ ...editFormData, discount: e.target.value })}
                      width="w-32"
                      className="text-right bg-gray-100 border-gray-400"
                      compact
                    />
                  ) : (
                    <span>$0.00</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">CHEETAH CA$H</span>
                  <span>{o.savedText ?? "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Delivery Fee</span>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={editFormData.deliveryFee}
                      onChange={(e) => setEditFormData({ ...editFormData, deliveryFee: e.target.value })}
                      width="w-32"
                      className="text-right bg-gray-100  border-gray-400"
                      compact
                    />
                  ) : (
                    <span>{o.deliveryFee ?? "—"}</span>
                  )}
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
                <div className="flex flex-col gap-2">
                  {isEditMode ? (
                    <>
                      <span className="font-semibold text-gray-900">Payment Method</span>

                      <div className="grid grid-cols-4 gap-3">
                        {PAYMENT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handlePaymentMethodClick(option.id)}
                            className={`
              flex items-center justify-center gap-2
              px-[5px] py-[12px]
              rounded-[5px]
              border border-[#a4a4a4]
              bg-white
              transition-all duration-150
              ${paymentMethod === option.id
                                ? "border-2 border-gray-900"
                                : "hover:border-gray-400"}
            `}
                          >
                            <Icon icon={option.icon} className="w-7 h-7 text-gray-700" />
                            <span className="text-base font-medium text-gray-900">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-gray-900">
                        Payment Method
                      </span>
                      <span className="text-gray-700 font-medium">
                        {orderPaymentMethod}
                      </span>
                    </div>
                  )}
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
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Store Credit</span>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={editFormData.storeCredit}
                      onChange={(e) => setEditFormData({ ...editFormData, storeCredit: e.target.value })}
                      width="w-32"
                      className="text-center bg-gray-100 border-gray-400"
                      compact
                    />
                  ) : (
                    <span>{o.storeCredit ?? "—"}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Handler Fee</span>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={editFormData.handlerFee}
                      onChange={(e) => setEditFormData({ ...editFormData, handlerFee: e.target.value })}
                      width="w-32"
                      className="text-center bg-gray-100 border-gray-400"
                      compact
                    />
                  ) : (
                    <span>{o.handlerFee ?? "—"}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Available CHEETAH CA$H</span>
                  {isEditMode ? (
                    <div className="flex items-center gap-1 border bg-gray-100 border-gray-400 rounded">
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseFloat(editFormData.availableCash) || 0;
                          setEditFormData({ ...editFormData, availableCash: Math.max(0, current - 1).toFixed(2) });
                        }}
                        className="px-2 py-1 text-[#000]  text-lg"
                      >
                        –
                      </button>
                      <Input
                        type="text"
                        value={editFormData.availableCash}
                        onChange={(e) => setEditFormData({ ...editFormData, availableCash: e.target.value })}
                        width="w-16"
                        className="text-center bg-gray-100 border-none"
                        compact
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseFloat(editFormData.availableCash) || 0;
                          setEditFormData({ ...editFormData, availableCash: (current + 1).toFixed(2) });
                        }}
                        className="px-2 py-1 text-[#000]  text-lg"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span>{o.availableCash ?? "—"}</span>
                  )}
                </div>
              </div>

              <hr className="my-3 border-gray-400" />

              {/* Delivery Address Client Info */}
              <p className="text-sm font-semibold text-gray-900 mb-1">Delivery Address Client Info</p>
              {isEditMode ? (
                <div className="space-y-2 mb-6">
                  <Input
                    label=""
                    type="text"
                    value={editFormData.customerName}
                    onChange={(e) => setEditFormData({ ...editFormData, customerName: e.target.value })}
                    placeholder="Customer Name"
                    className=" bg-gray-100 border-gray-400"
                    compact
                  />
                  <Input
                    label=""
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="Phone"
                    className=" bg-gray-100 border-gray-400"
                    compact
                  />
                  <Input
                    label=""
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="Email"
                    className=" bg-gray-100 border-gray-400"
                    compact
                  />
                  <a href="#" className="text-[var(--color-secondary)] hover:underline text-sm block">
                    {editFormData.address || "—"}
                  </a>
                </div>
              ) : (
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
              )}



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
                        <button
                          type="button"
                          onClick={() => {
                            setTimelineDrawerOpen(true);
                          }}
                          className="text-[var(--color-secondary)] hover:underline text-xs font-semibold"
                        >
                          View Recent Order
                        </button>
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
                              className="w-full h-[30px] min-h-[35px] text-sm"
                              compact
                            />
                          </div>
                          <button
                            type="button"
                            disabled={!selectedDriver}
                            className="shrink-0 h-8.5 px-10 mb-0.5 text-sm font-medium text-white rounded-sm bg-[var(--color-secondary)]"
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
                            className="w-full h-[30px] min-h-[35px] text-sm"
                            compact
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <label className="text-sm font-bold text-gray-900 block mb-1.5">Handler:</label>
                          <Select
                            value={selectedHandler}
                            onChange={(e) => setSelectedHandler(e.target.value)}
                            options={HANDLER_OPTIONS}
                            placeholder="Select handler"
                            className="w-full h-[30px] min-h-[35px] text-sm"
                            compact
                          />
                        </div>
                        <button
                          type="button"
                          disabled={!selectedCompany && !selectedHandler}
                          className="shrink-0 h-8.5 px-10 mb-0.5 text-sm font-medium text-white rounded-sm bg-[var(--color-secondary)]"
                        >
                          Assign
                        </button>
                      </div>
                    </div>

                  )}
                  {activeTab === "Order Tracking" && !isCancelled && (
                    <>
                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                          Delivery Process
                        </h4>
                        <div className="relative">
                          {DELIVERY_STEPS.map((step) => {
                            const isCompleted = stepChecked[step.key];
                            const isDisabled = isStepDisabled(step.key);

                            return (
                              <div
                                key={step.key}
                                className="relative flex items-start gap-3 pb-6 last:pb-0"
                              >
                                {/* Circle */}
                                <div className="relative z-10 mt-0.5">
                                  <button
                                    disabled={isDisabled}
                                    onClick={() => handleStepChange(step.key, !isCompleted)}
                                    className={`w-4 h-4 rounded-full flex items-center justify-center border
                                     ${isCompleted
                                        ? "bg-[var(--color-primary)] border-green-600"
                                        : "bg-white border-gray-300"
                                      }
                                     ${!isDisabled ? "cursor-pointer" : "cursor-not-allowed"}
                                   `}
                                  >
                                    {isCompleted && (
                                      <Icon
                                        icon="mdi:check"
                                        className="text-white w-4 h-4"
                                      />
                                    )}
                                  </button>
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                  <div className="text-[13px] mb-0.5 font-semibold text-gray-900">
                                    {step.label}
                                  </div>

                                  <div className="text-[11.5px]  text-gray-500">
                                    {step.description}
                                  </div>

                                  {/* Completed time (only for completed Ordered in screenshot) */}
                                  {isCompleted &&
                                    step.key === "Ordered" &&
                                    selectedOrder?.date && (
                                      <div className="text-xs text-[var(--color-primary)] flex items-center gap-1 mt-1">
                                        <Icon
                                          icon="mdi:check-circle"
                                          className="w-3 h-3"
                                        />
                                        Completed on {selectedOrder.date}
                                      </div>
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
        </>
      </Drawer>

      {/* Payment Drawer - Reusable Component */}
      <PaymentDrawer
        isOpen={paymentDrawerOpen}
        onClose={handleClosePaymentDrawer}
        paymentMethod={activePaymentMethod}
        onPaymentSent={() => {
          // Handle payment sent action
          console.log("Payment sent via E-transfer");
        }}
        onCryptoSelect={(cryptoType) => {
          // Handle crypto selection
          console.log(`Selected crypto: ${cryptoType}`);
        }}
        recipientEmail="ccmail647@gmail.com"
      />

      <QuantityTimelineDrawer
        isOpen={timelineDrawerOpen}
        onClose={() => setTimelineDrawerOpen(false)}
        title="Quantity"
        items={timelineData}
      />
    </>
  );
};

export default OrderDetailsDrawer;
