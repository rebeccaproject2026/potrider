import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowUp } from "lucide-react";
import Input from "../../components/Input";
import Select from "../../components/Select";

const COUNTRY_CODE_OPTIONS = [
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
  { value: "+91", label: "+91" },
  { value: "+61", label: "+61" },
  { value: "+81", label: "+81" },
  { value: "+49", label: "+49" },
  { value: "+33", label: "+33" },
  { value: "+86", label: "+86" },
];

const COUNTRY_OPTIONS = [
  { value: "CA", label: "Canada" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
];

const PROVINCE_OPTIONS = [
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "QC", label: "Quebec" },
  { value: "MB", label: "Manitoba" },
  { value: "SK", label: "Saskatchewan" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NB", label: "New Brunswick" },
];

const AddCustomer = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");

  const handleCancel = () => navigate("/customers");
  const handleSave = () => {
    // TODO: persist customer (e.g. API call)
    navigate("/customers");
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 bg-gray-100 overflow-y-auto">
      {/* Layout matches Add Inventory: px-4 pt-4 pb-4 for content area */}
      <div className="flex-1 full-width w-full flex flex-col">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 flex-1 min-h-0 flex flex-col w-full max-w-none">
          <h1 className="text-lg mt-2 font-semibold text-[#3E3834] mb-3">
            Customer Details
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full Name | Last Name */}
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              // compact
              labelClassName="font-medium text-[#212121]"
              className="border-[#DDDDDD] rounded-sm"
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              // compact
              labelClassName="font-medium text-[#212121]"
              className="border-[#DDDDDD] rounded-sm"
            />

            {/* Phone Number (code + input) | Email Address */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#212121] mb-0.5">
                Phone Number
              </label>
              <div className="flex border border-[#DDDDDD] rounded-sm bg-white overflow-hidden min-h-[38px]">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="px-2.5 py-3 text-sm border-0 border-r border-[#DDDDDD] bg-white text-gray-700 font-medium focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-size-[12px] bg-position-[right_6px_center] pr-7"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                  }}
                >
                  {COUNTRY_CODE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="1234567890"
                  className="flex-1 min-w-0 px-3 py-2 text-sm border-0 rounded-r-sm focus:outline-none focus:ring-0 font-medium placeholder-gray-600"
                />
              </div>
            </div>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              // compact
              labelClassName="font-medium text-[#212121]"
              className="border-[#DDDDDD] rounded-sm"
            />

            {/* Home Address - full width */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#212121] mb-0.5">
                Home Address
              </label>
              <textarea
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                placeholder="Enter your address"
                rows={3}
                className="w-full px-3 py-4.5 text-sm border border-[#DDDDDD] rounded-sm bg-white font-medium placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px]"
              />
            </div>

            {/* City | Postal Code */}
            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city name"
              // compact
              labelClassName="font-medium text-[#212121]"
              className="border-[#DDDDDD] rounded-sm"
            />
            <Input
              label="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal code"
              // compact
              labelClassName="font-medium text-[#212121]"
              className="border-[#DDDDDD] rounded-sm"
            />

            {/* Country | Province */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#212121] mb-0.5">
                Country
              </label>
              <Select
                options={COUNTRY_OPTIONS}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Select your country"
              // compact
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-[#212121] mb-0.5">
                Province
              </label>
              <Select
                options={PROVINCE_OPTIONS}
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Select province"
              // compact
              />
            </div>
          </div>

          {/* Buttons at bottom right */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 mt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-2 py-2.5 bg-white border border-gray-400 text-[#212121] rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-[#212121]" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-2.5 py-2.5 bg-(--color-primary) text-white rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
