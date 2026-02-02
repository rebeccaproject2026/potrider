/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "../../components/Select";
import Input from "../../components/Input";

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
    code: "HASH20",
  },
  {
    id: "4",
    title: "Pre-Roll Bonanza!",
    code: "PREROLL",
  },
  {
    id: "5",
    title: "BUY 3 AURA PRODUCTS AND GET A FREE AURA CARTRIDGE!",
    code: "AURA3",
  },
];

const DELIVERY_METHODS = [
  { id: "local", label: "Local Delivery", icon: "mdi:truck-delivery" },
  { id: "ship", label: "Ship to My Address", icon: "mdi:home" },
  { id: "sameday", label: "Same-Day (2-4 hrs)", icon: "mdi:clock-outline" },
  { id: "express", label: "Express (1 hr)", icon: "mdi:lightning-bolt" },
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
  {
    id: "1",
    name: "Buudabomb Taro Taro 500mg",
    image: "",
    price: "$40.00",
    stockStatus: "In-stock: 0 - Out of Stock",
    meta: "Category: Edible · Genetics: Hybrid · THC: 500MG · CBD: 20MG · CBN: 10MG",
    sizeOptions: ["1 Gram", "1/8 OZ", "1/4 OZ", "1/2 OZ", "1 OZ"],
    selectedSize: "1 Gram",
    quantity: 10,
    itemTotal: "$250.23",
  },
  {
    id: "2",
    name: "Kush Kraft Black Gas",
    image: "",
    price: "$37.00",
    stockStatus: "In-stock: 99",
    meta: "Category: Weed · Genetics: Indica · THC: 20 - 25% · CBD: 0 - 1% · CBN: 0 - 1%",
    sizeOptions: ["1 Gram", "1/8 OZ", "1/4 OZ", "1/2 OZ", "1 OZ"],
    selectedSize: "1/4 OZ",
    quantity: 2,
    itemTotal: "$74.00",
  },
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
  const couponSliderRef = useRef(null);

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

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

  return (
    <div className="flex flex-col lg:flex-row gap-2 flex-1 min-h-0 overflow-hidden">
      {/* Left column – Create Order form (scrollable on its own) */}
      <div className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden space-y-4 pr-1 hide-scrollbar">
        {/* Back arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
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
                  value={customer.deliveryOption}
                  onChange={(e) => handleCustomerChange("deliveryOption", e.target.value)}
                  options={DELIVERY_OPTIONS}
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
                onChange={(e) => handleCustomerChange("deliveryOption", e.target.value)}
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
              searchLabel="Search"
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
            <div className="space-y-4">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon icon="mdi:package-variant" className="w-7 h-7 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {product.price} ({product.stockStatus})
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{product.meta}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.sizeOptions.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`px-2 py-1 text-xs rounded border ${product.selectedSize === size
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{product.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-bold text-sm text-gray-900">{product.itemTotal}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(product.id)}
                      className="mt-2 p-1.5 text-red-600 hover:bg-red-50 rounded"
                      aria-label="Remove"
                    >
                      <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Select Coupon */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Select Coupon</h3>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => scrollCouponSlider("left")}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Icon icon="mdi:chevron-left" className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCouponSlider("right")}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Icon icon="mdi:chevron-right" className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            ref={couponSliderRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {COUPON_OPTIONS.map((coupon) => (
              <div
                key={coupon.id}
                onClick={() => setSelectedCoupon(selectedCoupon === coupon.id ? "" : coupon.id)}
                className={`min-w-[200px] p-4 border rounded-lg bg-white cursor-pointer transition-all ${selectedCoupon === coupon.id
                  ? "border-blue-500 border-2 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <p className="text-sm font-bold text-gray-900 mb-2">{coupon.title}</p>
                <p className="text-xs text-gray-700">
                  Coupon Code: <span className="font-medium">{coupon.code}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use CHEETAH CA$H */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Use CHEETAH CA$H</h3>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => handleCheetahCashChange(-1)}
              className="px-4 py-2.5 border-r border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              −
            </button>
            <div className="flex-1 px-4 py-2.5 text-center text-sm font-medium text-gray-900">
              {cheetahCashAmount.toFixed(2)}
            </div>
            <button
              type="button"
              onClick={() => handleCheetahCashChange(1)}
              className="px-4 py-2.5 border-l border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Owner's Discount */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Owner's Discount in Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium">$</span>
                <Input
                  type="text"
                  value={ownerDiscountAmount}
                  onChange={(e) => setOwnerDiscountAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="pl-7"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Owner's Discount in Percentage
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={ownerDiscountPercentage}
                  onChange={(e) => setOwnerDiscountPercentage(e.target.value)}
                  placeholder="Enter Percentage"
                  className="pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery Method</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {DELIVERY_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedDeliveryMethod(method.id)}
                className={`p-4 border rounded-lg bg-white text-center transition-all ${selectedDeliveryMethod === method.id
                  ? "border-gray-900 border-2"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Icon icon={method.icon} className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                <p className="text-xs font-medium text-gray-900">{method.label}</p>
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              $10 Delivery Fee on orders <span className="font-bold">under $100</span>
            </p>
            <p>
              FREE Delivery on orders <span className="font-bold">over $100</span>
            </p>
          </div>
        </div>
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
