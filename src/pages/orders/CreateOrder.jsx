/* eslint-disable no-unused-vars */
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "../../components/Select";
import Input from "../../components/Input";
import PastOrderCard from "../../components/order/PastOrderCard";
import StatsCards from "../../components/order/StatsCards";
import ProductsTable from "../../components/order/productsTable";
import PaymentDrawer from "../../components/order/PaymentDrawer";

// Static data for Create Order page (API implementation pending)
const STATIC_CUSTOMER = {
  customerName: "",
  phone: "",
  email: "",
  address: "",
  unitSuite: "",
  city: "",
  province: "",
  postalCode: "",
  deliveryOption: "",
};

const STATIC_SUMMARY = {
  availableCheetahCash: "$0",
  couponDiscountsUsed: "$500.00",
  ownerDiscountsReceived: "$129.99",
  totalOrders: "0",
};

const PROVINCE_OPTIONS = [
  { value: "Ontario", label: "Ontario" },
  { value: "Quebec", label: "Quebec" },
  { value: "BC", label: "British Columbia" },
  { value: "Alberta", label: "Alberta" },
];

const CUSTOMER_OPTIONS = [
  { value: "Jack Benson", label: "Jack Benson" },
  { value: "Khaled Dardar", label: "Khaled Dardar" },
  { value: "Sarah Johnson", label: "Sarah Johnson" },
  { value: "Michael Chen", label: "Michael Chen" },
  { value: "Emily Rodriguez", label: "Emily Rodriguez" },
  { value: "David Thompson", label: "David Thompson" },
  { value: "Lisa Anderson", label: "Lisa Anderson" },
  { value: "Robert Williams", label: "Robert Williams" },
];

const DELIVERY_OPTIONS = [
  { value: "Pickup", label: "Pickup" },
  { value: "Delivery", label: "Delivery" },
  { value: "Shipping", label: "Shipping" },
];

const FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "category1", label: "Category 1" },
];

const COUPON_OPTIONS = [
  {
    id: "1",
    title: "New Clients 15% OFF",
    code: "NEW15",
  },
  {
    id: "2",
    title: "Flower Power Deal Buy 1 Get 1/2 Free!",
    code: "HALFFREE",
  },
  {
    id: "3",
    title: "Exclusive Hash Offer!",
    code: "FREE-HASH",
  },
  {
    id: "4",
    title: "Pre-Roll Bonanza!",
    code: "FREE-PREROLLS",
  },
  {
    id: "5",
    title: "BUY 3 AURA PRODUCTS AND GET A FREE AURA CARTRIDGE!",
    code: "FREE-AURA",
  },
  {
    id: "6",
    title: "Pre-Roll Bonanza!",
    code: "FREE-PREROLLS",
  },
  {
    id: "7",
    title: "Exclusive Hash Offer!",
    code: "FREE-HASH",
  },
];

const DELIVERY_METHODS = [
  { id: "local", label: "Local Delivery", icon: "mdi:truck-delivery" },
  { id: "ship", label: "Ship to My Address", icon: "mdi:truck-fast" },
  { id: "sameday", label: "Same-Day (2-4 hrs)", icon: "mdi:clock-outline" },
  { id: "express", label: "Express (1 hr)", icon: "mdi:lightning-bolt" },
];

const PAYMENT_OPTIONS = [
  { id: "cash", label: "Cash", icon: "ph:money-wavy-bold" },
  { id: "etransfer", label: "E-transfer", icon: "mdi:cash-sync" },
  {
    id: "creditcard", label: "Credit Card", icon: "ph:credit-card-bold"
  },
  {
    id: "crypto", label: "Crypto", icon: "ph:currency-btc-bold"
  },
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

// Static selected products (matches image – API pending)
const STATIC_SELECTED_PRODUCTS = [
  // {
  //   id: "1",
  //   name: "Buudabomb Taro Taro 500mg",
  //   image: "",
  //   price: "$40.00",
  //   stockStatus: "In-stock: 0 - Out of Stock",
  //   meta: "Category: Edible · Genetics: Hybrid · THC: 500MG · CBD: 20MG · CBN: 10MG",
  //   sizeOptions: ["1 Gram", "1/8 OZ", "1/4 OZ", "1/2 OZ", "1 OZ"],
  //   selectedSize: "1 Gram",
  //   quantity: 10,
  //   itemTotal: "$250.23",
  // },
  // {
  //   id: "2",
  //   name: "Kush Kraft Black Gas",
  //   image: "",
  //   price: "$37.00",
  //   stockStatus: "In-stock: 99",
  //   meta: "Category: Weed · Genetics: Indica · THC: 20 - 25% · CBD: 0 - 1% · CBN: 0 - 1%",
  //   sizeOptions: ["1 Gram", "1/8 OZ", "1/4 OZ", "1/2 OZ", "1 OZ"],
  //   selectedSize: "1/4 OZ",
  //   quantity: 2,
  //   itemTotal: "$74.00",
  // },
];

// Invoice preview static data
const STATIC_INVOICE = {
  orderId: "17523235",
  date: "Jul 25, 2025",
  brandName: "DRUM GREEN",
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
    potCash: "$5.00",
    deliveryFee: "$0.00",
    totalSavings: "$107.50",
    grandTotal: "$98.45",
  },
  paymentMethod: "Cash on Delivery",
};

// Static data for customer stats and past orders section
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

const STATIC_PAST_ORDERS = [
  {
    orderId: "1769222658",
    orderDate: "January 23, 2026, 9:44 PM",
    status: "Delivered",
    statusVariant: "delivered",
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
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    transactionId: "pi_3SswpQGu3NMzvKQU1yM4x1Ff_secret_t08Ylt5lAEwh",
  },
];

const CreateOrder = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(STATIC_CUSTOMER);
  const [selectedProducts, setSelectedProducts] = useState(STATIC_SELECTED_PRODUCTS);
  const [selectedProductValue, setSelectedProductValue] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterGenetics, setFilterGenetics] = useState("");
  const [filterCBD, setFilterCBD] = useState("");
  const [filterCBN, setFilterCBN] = useState("");
  const [filterTHC, setFilterTHC] = useState("");
  const [cheetahCashAmount, setCheetahCashAmount] = useState(5.00);
  const [ownerDiscountAmount, setOwnerDiscountAmount] = useState("");
  const [ownerDiscountPercentage, setOwnerDiscountPercentage] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("local");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("");
  const couponSliderRef = useRef(null);

  const handleCustomerChange = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Memoized handler for delivery option to prevent flickering
  const handleDeliveryOptionChange = useCallback((e) => {
    handleCustomerChange("deliveryOption", e.target.value);
  }, [handleCustomerChange]);

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

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  const handleSizeSelect = (id, size) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedSize: size } : p))
    );
  };

  const scrollCouponSlider = (direction) => {
    if (couponSliderRef.current) {
      const scrollAmount = 300; // Scroll by 300px
      const currentScroll = couponSliderRef.current.scrollLeft;
      const newScroll = direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
      couponSliderRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const handleCheetahCashChange = (delta) => {
    setCheetahCashAmount((prev) => Math.max(0, prev + delta));
  };

  // Get delivery fee information based on selected method
  const getDeliveryFeeInfo = () => {
    switch (selectedDeliveryMethod) {
      case "express":
        return {
          lines: [
            { text: "$15 Delivery Fee", highlight: "$15", suffix: " (orders under $100)" },
            { text: "ONLY $5 for Express if order is", highlight: "$5", suffix: " $100+" },
          ],
        };
      case "sameday":
        return {
          lines: [
            { text: "$12 Delivery Fee", highlight: "$12", suffix: " (orders under $100)" },
            { text: "FREE Delivery on orders", highlight: "FREE", suffix: " over $100" },
          ],
        };
      case "ship":
        return {
          lines: [
            { text: "$10 Delivery Fee", highlight: "$10", suffix: " (orders under $100)" },
            { text: "FREE Delivery on orders", highlight: "FREE", suffix: " over $100" },
          ],
        };
      case "":
      default:
        return {
          lines: [
            { text: "$10 Delivery Fee on orders", highlight: "$10", suffix: " under $100" },
            { text: "FREE Delivery on orders", highlight: "FREE", suffix: " over $100" },
          ],
        };
    }
  };

  // Memoized handler for delivery method selection to prevent flickering
  const handleDeliveryMethodChange = useCallback((methodId) => {
    // When Same-Day or Express is selected, keep Local Delivery selected as well
    // because they are sub-options of Local Delivery
    if (methodId === "sameday" || methodId === "express") {
      // Keep local selected when selecting sub-options
      setSelectedDeliveryMethod(methodId);
    } else {
      setSelectedDeliveryMethod(methodId);
    }
  }, []);

  // Handler for payment method selection - opens drawer for E-transfer, Credit Card, and Crypto
  const handlePaymentMethodClick = useCallback((paymentId) => {
    if (paymentId === "etransfer" || paymentId === "creditcard" || paymentId === "crypto") {
      setSelectedPayment(paymentId);
      setActivePaymentMethod(paymentId);
      setPaymentDrawerOpen(true);
    } else {
      // For Cash, just select it without opening drawer
      setSelectedPayment(paymentId);
      setPaymentDrawerOpen(false);
    }
  }, []);

  // Close payment drawer
  const handleClosePaymentDrawer = useCallback(() => {
    setPaymentDrawerOpen(false);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-2 flex-1 min-h-0 overflow-hidden">
      {/* Left column – Create Order form (scrollable on its own) */}
      <div className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden space-y-2 pr-1 hide-scrollbar">
        {/* Back arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Go back"
        >
          <Icon icon="mdi:arrow-left" className="w-6 h-6" />
        </button>

        {/* Customer and contact information – three-column grid */}
        <div className="p-1 mb-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-1">Customer Name </label>
                <Select
                  label="Customer Name"
                  value={customer.customerName}
                  onChange={(e) => handleCustomerChange("customerName", e.target.value)}
                  options={CUSTOMER_OPTIONS}
                  placeholder="Type or select customer"
                  className="w-full"
                  minWidth="100%"
                  showSearch
                />
              </div>
            </div>
            <div>
              <Input
                label="Phone Number"
                type="text"
                placeholder="Enter Phone Number"
                value={customer.phone}
                onChange={(e) => handleCustomerChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Email"
                value={customer.email}
                onChange={(e) => handleCustomerChange("email", e.target.value)}
              />
            </div>
            <div >
              <Input
                label="Address"
                type="text"
                placeholder="Enter Address"
                value={customer.address}
                onChange={(e) => handleCustomerChange("address", e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Unit/Suite Number"
                type="text"
                placeholder="Include unit/suite number, if applicable"
                value={customer.unitSuite}
                onChange={(e) => handleCustomerChange("unitSuite", e.target.value)}
              />
            </div>
            <div>
              <Input
                label="City"
                type="text"
                placeholder="Enter City"
                value={customer.city}
                onChange={(e) => handleCustomerChange("city", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#212121] mb-1">Province</label>
              <Select
                value={customer.province}
                onChange={(e) => handleCustomerChange("province", e.target.value)}
                options={PROVINCE_OPTIONS}
                placeholder="Province"
                className="w-full"
                minWidth="100%"
              />
            </div>
            <div>
              <Input
                label="Postal Code"
                type="text"
                placeholder="Enter Postal Code"
                value={customer.postalCode}
                onChange={(e) => handleCustomerChange("postalCode", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#212121] mb-1">Delivery Option</label>
              <Select
                value={customer.deliveryOption}
                onChange={handleDeliveryOptionChange}
                options={DELIVERY_OPTIONS}
                placeholder="Delivery Option"
                className="w-full"
                minWidth="100%"
                showSearch
              />
            </div>
          </div>
        </div>

        {/* Summary cards – white boxes, rounded corners, shadow */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Available CHEETAH CA$H", value: STATIC_SUMMARY.availableCheetahCash },
            { label: "Coupon Discounts Used", value: STATIC_SUMMARY.couponDiscountsUsed },
            { label: "Owner Discounts Received", value: STATIC_SUMMARY.ownerDiscountsReceived },
            { label: "Total Orders", value: STATIC_SUMMARY.totalOrders, underline: true },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-sm border border-gray-200 p-2 shadow-sm"
            >
              <p
                className={`text-sm font-medium text-gray-600 ${item.underline ? "underline cursor-pointer hover:text-gray-900" : ""}`}
                onClick={item.underline ? () => navigate("/orders") : undefined}
                onKeyDown={item.underline ? (e) => e.key === "Enter" && navigate("/orders") : undefined}
                role={item.underline ? "button" : undefined}
                tabIndex={item.underline ? 0 : undefined}
              >
                {item.label}
              </p>
              <p className="text-base font-bold text-gray-900 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="p-1 mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Products</h3>
          <hr className=" border-gray-400" />
          {/* Add Product */}
          {/* <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Product</h3> */}
          <div className="flex items-center gap-2 col-span-2 mt-5">
            <div className="w-[50%]">
              <label className="block text-sm font-semibold text-[#212121] mb-1">Select Category</label>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                options={FILTER_OPTIONS}
                placeholder="Select Category"
                minWidth="50%"
              />
            </div>
            <div className="w-[50%]">
              <label className="block text-sm font-semibold text-[#212121] mb-1">
                Select Genetics</label>
              <Select
                value={filterGenetics}
                onChange={(e) => setFilterGenetics(e.target.value)}
                options={FILTER_OPTIONS}
                placeholder="Select Genetics"
                minWidth="50%"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2 mb-2 mt-2">
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#212121] mb-1">
                Select CBD </label>
              <Select
                value={filterCBD}
                onChange={(e) => setFilterCBD(e.target.value)}
                options={FILTER_OPTIONS}
                placeholder="Select CBD"
                minWidth="100px"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#212121] mb-1">
                Select CBN  </label>

              <Select
                value={filterCBN}
                onChange={(e) => setFilterCBN(e.target.value)}
                options={FILTER_OPTIONS}
                placeholder="Select CBN"
                minWidth="100px"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#212121] mb-1">
                Select THC </label>
              <Select
                value={filterTHC}
                onChange={(e) => setFilterTHC(e.target.value)}
                options={FILTER_OPTIONS}
                placeholder="Select THC"
                minWidth="100px"
              />
            </div>
          </div>
          <div>
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
        </div>
        {/* Selected Products */}
        <div className="p-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Selected Products</h3>
          {selectedProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No Products Selected</p>
          ) : (
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start gap-3 p-1.5 border border-gray-200 rounded-sm bg-white"
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
                    <p className="text-sm font-semibold  text-[#212529bf] mt-0.5">
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
                            onClick={() =>
                              handleQuantityChange(product.id, -1)
                            }
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
                            onClick={() =>
                              handleQuantityChange(product.id, 1)
                            }
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
                          onClick={() =>
                            handleRemoveProduct(product.id)
                          }
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
                    <div className="flex flex-wrap gap-2 ">
                      {product.sizeOptions.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() =>
                            handleSizeSelect(product.id, size)
                          }
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

        {/* Select Coupon */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900  pl-1">Select Coupon</h3>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => scrollCouponSlider("left")}
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded bg-white text-[#000] hover:bg-gray-200 transition-colors"
            >
              <Icon icon="mdi:chevron-left" className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollCouponSlider("right")}
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded bg-white text-[#000] hover:bg-gray-200 transition-colors"
            >
              <Icon icon="mdi:chevron-right" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={couponSliderRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {COUPON_OPTIONS.map((coupon) => {
            const isApplied = selectedCoupon === coupon.id;
            return (
              <div
                key={coupon.id}
                onClick={() => setSelectedCoupon(isApplied ? "" : coupon.id)}
                className={`relative min-w-[180px] max-w-[220px] rounded-sm border border-gray-200 bg-white shadow-sm cursor-pointer transition-all hover:border-gray-300 flex flex-col`}
              >
                {isApplied && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center z-10">
                    <Icon icon="mdi:check" className="w-4 h-4 text-white" />
                  </span>
                )}
                {/* Top row: placeholder + blue offer text */}
                <div className="p-3 flex gap-2 items-start flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-400">
                    <Icon icon="mdi:tag-outline" className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-blue-600 leading-snug flex-1 min-w-0 pr-6">
                    {coupon.title}
                  </p>
                </div>
                {/* Bottom: title, code, applied text */}
                <div className="px-3 pb-3 pt-0 space-y-1">
                  <p className="text-sm font-bold text-gray-900 leading-snug">
                    {coupon.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    Coupon Code:{" "}
                    <span className="font-semibold text-gray-900">{coupon.code}</span>
                  </p>
                  {isApplied && (
                    <p className="text-xs font-semibold text-green-600">
                      $999.99 Discount Applied!
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Discount section: Use CHEETAH CA$H + Owner's Discount */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end mb-6">
          {/* CHEETAH CASH */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5 pl-1">
              Use CHEETAH CA$H
            </label>

            <div className="flex  border border-[#DDDDDD] overflow-hidden bg-white rounded-sm">
              <button
                type="button"
                onClick={() => handleCheetahCashChange(-1)}
                className="w-10 flex items-center justify-center  font-bold cursor-pointer"
              >
                −
              </button>

              <Input
                type="text"
                readOnly
                value={cheetahCashAmount.toFixed(2)}
                className="text-center border-0 focus:ring-0 rounded-none"
              />

              <button
                type="button"
                onClick={() => handleCheetahCashChange(1)}
                className="w-10 flex items-center justify-center font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* OWNER DISCOUNT AMOUNT */}
          <div>
            <Input
              label="Owner's Discount in Amount"
              type="text"
              value={ownerDiscountAmount}
              onChange={(e) => setOwnerDiscountAmount(e.target.value)}
              placeholder="Enter Amount"
              prefix="$"
            />
          </div>

          {/* OWNER DISCOUNT PERCENTAGE */}
          <div>
            <Input
              label="Owner's Discount in Percentage"
              type="text"
              value={ownerDiscountPercentage}
              onChange={(e) => setOwnerDiscountPercentage(e.target.value)}
              placeholder="Enter Percentage"
              suffix="%"
            />
          </div>
        </div>

        {/* Delivery Method */}
        <h1 className="text-[18.5px] font-semibold text-gray-900 mb-2">Delivery Method</h1>
        <hr className=" border-gray-300 mb-6" />
        <div className="grid grid-cols-2 gap-3 mb-2">
          {DELIVERY_METHODS.filter((method) => {
            // If "ship" is selected, show "local" and "ship" (hide "sameday" and "express")
            if (selectedDeliveryMethod === "ship") {
              return method.id === "local" || method.id === "ship";
            }
            // When "local" is clicked or any other option is selected, show all 4 methods
            // This includes: Local Delivery, Ship to My Address, Same-Day, and Express
            return true;
          }).map((method) => {
            // Check if this method should be highlighted
            // Local Delivery should be highlighted when local, sameday, or express is selected
            // Same-Day and Express should be highlighted when they are selected
            const isSelected =
              method.id === selectedDeliveryMethod ||
              (method.id === "local" && (selectedDeliveryMethod === "sameday" || selectedDeliveryMethod === "express"));

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => handleDeliveryMethodChange(method.id)}
                className={`flex items-center gap-2 p-3 border rounded-sm bg-white shadow-sm transition-all text-left ${isSelected
                  ? "border-2 border-gray-900"
                  : "border border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Icon icon={method.icon} className="w-5 h-5 shrink-0 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">{method.label}</span>
              </button>
            );
          })}
        </div>
        {/* Only show delivery fee info when "local" is NOT selected */}
        {selectedDeliveryMethod !== "local" && (
          <div className="border border-gray-200 rounded-xs bg-white p-2">
            <div className="border-2 border-gray-900 rounded-sm bg-white p-2 space-y-1">
              {getDeliveryFeeInfo().lines.map((line, index) => {
                const parts = line.text.split(line.highlight);
                return (
                  <p key={index} className="text-sm text-gray-900">
                    {parts[0]}
                    <span className="font-bold">{line.highlight}</span>
                    {parts[1] && <>{parts[1]}</>}
                    {line.suffix && <span className="font-bold">{line.suffix}</span>}
                  </p>
                );
              })}
            </div>
          </div>
        )}
        {/* Payment */}
        <div className="mt-8">
          <h1 className="text-[18.5px] font-semibold text-gray-900 mb-2">Payment</h1>
          <hr className=" border-gray-300 mb-6" />
          <div className="grid grid-cols-4 gap-3">
            {PAYMENT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handlePaymentMethodClick(option.id)}
                className={`
    relative z-[1]
    flex items-center justify-center gap-2
    px-[5px] py-[12px]
    rounded-[5px]
    border border-[#a4a4a4]
    bg-white
    cursor-pointer
    opacity-90
    transition-all duration-150
    shadow-[0_0_0_1px_rgba(0,0,0,0)]
    ${selectedPayment === option.id
                    ? "border-2 border-gray-900 "
                    : "hover:border-gray-400"
                  }
  `}
              >
                <Icon icon={option.icon} className="w-7 h-7 shrink-0 text-gray-700" />
                <span className="text-base font-medium text-gray-900">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Drawer - Reusable Component */}
        <PaymentDrawer
          isOpen={paymentDrawerOpen}
          onClose={handleClosePaymentDrawer}
          paymentMethod={activePaymentMethod}
          onPaymentSent={() => {
            // Handle payment sent action
            console.log("Payment sent via E-transfer");
          }}
          onProceedPayment={() => {
            // Handle proceed to payment action
            console.log("Proceeding to credit card payment");
          }}
          onCryptoSelect={(cryptoType) => {
            // Handle crypto selection
            console.log(`Selected crypto: ${cryptoType}`);
          }}
          recipientEmail="ccmail647@gmail.com"
        />

        {/* Create & Save Order */}
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-2 py-2.5 bg-[var(--color-secondary)] text-white text-sm font-semibold rounded-sm hover:bg-blue-700 disabled:opacity-50"
          >
            <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
            Create & Save Order
          </button>
        </div>

        {/* Customer Stats and Past Orders Section */}
        {/* {customer.customerName && ( */}
        <>
          <StatsCards
            title={`${customer.customerName || "Jack Benson"}'s Stats`}
            subtitle={`Last ordered on ${STATIC_LAST_ORDERED}`}
            showDivider
            stats={STATIC_CUSTOMER_STATS}
            className="mb-1"
          />

          <div className="mt-5">
            <ProductsTable
              title={`${customer.customerName || "Jack Benson"}'s 5 Most Bought Products`}
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

          <p className="text-lg font-semibold text-black mb-1">{customer.customerName || "Jack Benson"}&apos;s Past Orders</p>
          <hr className="border-gray-400 mb-3" />
          {STATIC_PAST_ORDERS.map((pastOrder) => (
            <PastOrderCard key={pastOrder.orderId} order={pastOrder} />
          ))}
        </>
        {/* // )} */}
      </div>

      {/* Right column – Invoice Preview (fixed height, scroll inside panel only) */}
      <div className="w-full lg:w-[400px] shrink-0 flex flex-col min-h-0 lg:min-h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <h3 className="text-base font-semibold">Invoice Preview</h3>
          <div className="flex gap-2">
            <button type="button" className="p-1.5 hover:bg-blue-500 rounded transition-colors">
              <Icon icon="mdi:share-variant-outline" className="w-5 h-5" />
            </button>
            <button type="button" className="p-1.5 hover:bg-blue-500 rounded transition-colors">
              <Icon icon="mdi:download-outline" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 space-y-4 hide-scrollbar">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                <Icon icon="mdi:bear" className="w-6 h-6 text-amber-800" />
              </div>
              <span className="text-sm font-bold text-gray-900">{STATIC_INVOICE.brandName}</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">Invoice</p>
              <p className="text-xs text-gray-700">Order #{STATIC_INVOICE.orderId}</p>
              <p className="text-xs text-gray-600">Date: {STATIC_INVOICE.date}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900 mb-1">Delivery Address</p>
            <p className="text-xs text-gray-900">
              {STATIC_INVOICE.deliveryAddress.name} - {STATIC_INVOICE.deliveryAddress.phone}
            </p>
            <p className="text-xs text-gray-800 mt-0.5">{STATIC_INVOICE.deliveryAddress.address}</p>
            <p className="text-xs text-gray-800">{STATIC_INVOICE.deliveryAddress.email}</p>
          </div>

          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-left font-semibold text-gray-900">Product</th>
                  <th className="py-2 text-center font-semibold text-gray-900">Quantity</th>
                  <th className="py-2 text-right font-semibold text-gray-900">Price</th>
                  <th className="py-2 text-right font-semibold text-gray-900">Total</th>
                </tr>
              </thead>
              <tbody>
                {STATIC_INVOICE.products.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
                          {row.image ? (
                            <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
                          ) : (
                            <Icon icon="mdi:package-variant" className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-500">Qty: {row.qtyUnit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center text-gray-800">{row.quantity}</td>
                    <td className="py-2 text-right text-gray-800">{row.price}</td>
                    <td className="py-2 text-right font-bold text-gray-900">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-gray-100 p-3 space-y-2">
            {[
              { label: "Subtotal", value: STATIC_INVOICE.summary.subtotal, bold: true },
              { label: "Promo Code", value: STATIC_INVOICE.summary.promoCode, bold: false },
              { label: "Discount", value: STATIC_INVOICE.summary.discount, bold: false },
              { label: "POT CA$H", value: STATIC_INVOICE.summary.potCash, bold: false },
              { label: "Delivery Fee", value: STATIC_INVOICE.summary.deliveryFee, bold: false },
              { label: "Total Savings", value: STATIC_INVOICE.summary.totalSavings, bold: false },
              { label: "Grand Total", value: STATIC_INVOICE.summary.grandTotal, bold: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className={row.bold ? "font-bold text-gray-900" : "text-gray-800"}>{row.label}</span>
                <span className={row.bold ? "font-bold text-gray-900" : "text-gray-800"}>{row.value}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-sm text-gray-800">
              <span>Payment Method</span>
              <span>{STATIC_INVOICE.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CreateOrder;
