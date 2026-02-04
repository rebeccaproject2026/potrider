import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "../../components/Select";
import Input from "../../components/Input";

const THC_CBD_UNIT_OPTIONS = [
  { value: "MG", label: "MG" },
  { value: "G", label: "G" },
];

const PRICE_UNIT_OPTIONS = [
  { value: "Grams", label: "Grams" },
  { value: "Units", label: "Units" },
  { value: "OZ", label: "OZ" },
];

const PRODUCT_OPTIONS = [
  { value: "buddabomb", label: "Buddabomb Taro Taro 500mg" },
  { value: "other", label: "Other Product" },
];

const GENETIC_OPTIONS = [
  { value: "Hybrid", label: "Hybrid" },
  { value: "Indica", label: "Indica" },
  { value: "Sativa", label: "Sativa" },
];

const CATEGORY_OPTIONS = [
  { value: "Weed", label: "Weed" },
  { value: "Edible", label: "Edible" },
  { value: "Gummies", label: "Gummies" },
];

const STOCK_OPTIONS = [
  { value: "In-Stock", label: "In-Stock" },
  { value: "Low-Stock", label: "Low-Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const BEST_SELLING_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const AddInventory = () => {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");
  const [productName, setProductName] = useState("Buddabomb Taro Taro 500mg");
  const [productOrder, setProductOrder] = useState("298");
  const [thcCbdUnit, setThcCbdUnit] = useState("MG");
  const [thcMg, setThcMg] = useState("100");
  const [cbdMg, setCbdMg] = useState("200");
  const [cbnMg, setCbnMg] = useState("500");
  const [priceUnit, setPriceUnit] = useState("Grams");
  const [description, setDescription] = useState("");
  const [purchaseQty, setPurchaseQty] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [selectProduct, setSelectProduct] = useState("buddabomb");
  const [genetic, setGenetic] = useState("Hybrid");
  const [category, setCategory] = useState("Weed");
  const [stock, setStock] = useState("In-Stock");
  const [status, setStatus] = useState("Active");
  const [isBestSelling, setIsBestSelling] = useState("yes");

  const handleClose = () => navigate("/inventory");
  const handleSave = () => {
    navigate("/inventory");
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 bg-white shadow-sm overflow-hidden">
      {/* Header - fixed: title left, Close (red) + Save (blue) right */}
      <div className="px-5">
        <div className="flex flex-wrap items-center justify-between gap-2  py-3 border-b border-[#000000] shrink-0">
          <h1 className="text-lg font-bold text-gray-900">Add Product</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 font-medium text-sm"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-3 py-2 bg-(--color-secondary) text-white rounded-sm hover:opacity-90 font-medium text-sm"
            >
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {/* Search - full width, reusable Input */}
        <div className="px-4 pt-4 pb-2">
          <Input
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Search Product..."
            compact
            className="max-w-full border-gray-300 bg-[#DDDDDD]!"
          />
        </div>

        {/* Two columns: left wider (~65%), right narrower (~35%) */}
        <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5">
          {/* Left column - main product details */}
          <div className="space-y-4">
            {/* General Information - two-column internal grid */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2">
                General Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    compact
                  />
                </div>
                <div>
                  <Input
                    label="Product Order"
                    value={productOrder}
                    onChange={(e) => setProductOrder(e.target.value)}
                    placeholder="Product Order"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    THC/CBD/CBN Unit
                  </label>
                  <Select
                    value={thcCbdUnit}
                    onChange={(e) => setThcCbdUnit(e.target.value)}
                    options={THC_CBD_UNIT_OPTIONS}
                    placeholder="Unit"
                    compact
                  />
                </div>
                <div>
                  <Input
                    label="THC MG"
                    value={thcMg}
                    onChange={(e) => setThcMg(e.target.value)}
                    placeholder="THC"
                    compact
                  />
                </div>
                <div>
                  <Input
                    label="CBD MG"
                    value={cbdMg}
                    onChange={(e) => setCbdMg(e.target.value)}
                    placeholder="CBD"
                    compact
                  />
                </div>
                <div>
                  <Input
                    label="CBN MG"
                    value={cbnMg}
                    onChange={(e) => setCbnMg(e.target.value)}
                    placeholder="CBN"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Price Unit
                  </label>
                  <Select
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                    options={PRICE_UNIT_OPTIONS}
                    placeholder="Unit"
                    compact
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-[#DDDDDD] rounded-sm bg-white font-medium placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-y min-h-[56px]"
                />
              </div>
            </div>

            {/* Inventory Evaluation - combined input with gray prefix */}
            <div>
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-[#000000]">
                Inventory Evaluation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                {/* Purchase Qty: [Unit | Enter Qty] */}
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Purchase Qty
                  </label>
                  <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                    <div className="flex items-center justify-center px-3 py-2 bg-gray-100 border-r border-[#DDDDDD] font-semibold text-gray-700 text-sm shrink-0">
                      Unit
                    </div>
                    <input
                      type="text"
                      value={purchaseQty}
                      onChange={(e) => setPurchaseQty(e.target.value)}
                      placeholder="Enter Qty"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border-0 font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 italic">
                    Available: 100 Units
                  </p>
                </div>
                {/* Purchase Cost: [$ | Enter Price] */}
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Purchase Cost
                  </label>
                  <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                    <div className="flex items-center justify-center px-3 py-2 bg-gray-100 border-r border-[#DDDDDD] font-semibold text-gray-700 text-sm shrink-0">
                      $
                    </div>
                    <input
                      type="text"
                      value={purchaseCost}
                      onChange={(e) => setPurchaseCost(e.target.value)}
                      placeholder="Enter Price"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border-0 font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Avg. Cost: $19.56
                  </p>
                </div>
                {/* Sale Price: [$ | Enter Price] */}
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Sale Price
                  </label>
                  <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                    <div className="flex items-center justify-center px-3 py-2 bg-gray-100 border-r border-[#DDDDDD] font-semibold text-gray-700 text-sm shrink-0">
                      $
                    </div>
                    <input
                      type="text"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Enter Price"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border-0 font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white"
                    />
                  </div>
                </div>
                {/* Discounted Price: [$ | Enter Price] */}
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Discounted Price
                  </label>
                  <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                    <div className="flex items-center justify-center px-3 py-2 bg-gray-100 border-r border-[#DDDDDD] font-semibold text-gray-700 text-sm shrink-0">
                      $
                    </div>
                    <input
                      type="text"
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      placeholder="Enter Price"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border-0 font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Set Low Stock Alert - title with underline, combined [Unit | Enter Qty] input */}
            <div>
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-[#000000]">
                Set Low Stock Alert
              </h2>
              <div className="mt-3 max-w-xs">
                <label className="block text-sm font-medium text-[#212121] mb-0.5">
                  Low Stock Alert
                </label>
                <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                  <div className="flex items-center justify-center px-3 py-2 bg-gray-100 border-r border-[#DDDDDD] font-semibold text-gray-700 text-sm shrink-0">
                    Unit
                  </div>
                  <input
                    type="text"
                    value={lowStockAlert}
                    onChange={(e) => setLowStockAlert(e.target.value)}
                    placeholder="Enter Qty"
                    className="flex-1 min-w-0 px-3 py-2 text-sm border-0 font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Available: 100 Units
                </p>
              </div>
            </div>

            {/* Available Stock - title with underline, two side-by-side display cards */}
            <div>
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-[#000000]">
                Available Stock
              </h2>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-gray-100 rounded-md p-4 border border-gray-200">
                  <p className="text-sm font-medium text-[#212121] mb-1">
                    Available Quantity
                  </p>
                  <p className="text-xl font-bold text-gray-900">568 Units</p>
                </div>
                <div className="bg-gray-100 rounded-md p-4 border border-gray-200">
                  <p className="text-sm font-medium text-[#212121] mb-1">
                    Available Stock Valuation
                  </p>
                  <p className="text-xl font-bold text-gray-900">$1952.36</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right column - Others: all dropdowns use reusable Select */}
          <div className="border border-[#D8D8D8] rounded-md self-start mt-2 py-3.5">
            <h2 className="text-base font-bold px-4 text-gray-900 mb-2">
              Others
            </h2>
            <a
              href="#add-product"
              className="text-(--color-secondary) font-medium text-sm hover:underline mb-3 inline-block px-4"
            >
              + Add Product
            </a>
            <div className="space-y-3 px-4">
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Select Product
                </label>
                <Select
                  value={selectProduct}
                  onChange={(e) => setSelectProduct(e.target.value)}
                  options={PRODUCT_OPTIONS}
                  placeholder="Select Product"
                  compact
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Genetic
                </label>
                <Select
                  value={genetic}
                  onChange={(e) => setGenetic(e.target.value)}
                  options={GENETIC_OPTIONS}
                  placeholder="Genetic"
                  compact
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={CATEGORY_OPTIONS}
                  placeholder="Category"
                  compact
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Stock
                </label>
                <Select
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  options={STOCK_OPTIONS}
                  placeholder="Stock"
                  compact
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Status
                </label>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  options={STATUS_OPTIONS}
                  placeholder="Status"
                  compact
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Is Best Selling?
                </label>
                <Select
                  value={isBestSelling}
                  onChange={(e) => setIsBestSelling(e.target.value)}
                  options={BEST_SELLING_OPTIONS}
                  placeholder="Yes/No"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
