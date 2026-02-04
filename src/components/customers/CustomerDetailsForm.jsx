import { useState } from "react";
import { X, ArrowUp } from "lucide-react";
import Input from "../Input";
import Select from "../Select";

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

/**
 * Customer Details form – matches design: two-column layout, phone with country code,
 * address textarea, country/province selects, Cancel (X) and Save (green) buttons.
 */
const CustomerDetailsForm = ({ onClose, onSave, initialValues }) => {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [lastName, setLastName] = useState(initialValues?.lastName ?? "");
  const [phoneCode, setPhoneCode] = useState(initialValues?.phoneCode ?? "+1");
  const [phoneNumber, setPhoneNumber] = useState(
    initialValues?.phoneNumber ?? ""
  );
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [homeAddress, setHomeAddress] = useState(
    initialValues?.homeAddress ?? ""
  );
  const [city, setCity] = useState(initialValues?.city ?? "");
  const [postalCode, setPostalCode] = useState(initialValues?.postalCode ?? "");
  const [country, setCountry] = useState(initialValues?.country ?? "");
  const [province, setProvince] = useState(initialValues?.province ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      fullName,
      lastName,
      phoneCode,
      phoneNumber,
      email,
      homeAddress,
      city,
      postalCode,
      country,
      province,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-2xl w-full">
      <h2 className="text-lg font-bold text-[#3F4753] mb-5">
        Customer Details
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row 1: Full Name | Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            compact
            className="border-[#DDDDDD]"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            compact
            className="border-[#DDDDDD]"
          />
        </div>

        {/* Row 2: Phone Number (code + input) | Email Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-[#212121] mb-0.5">
              Phone Number
            </label>
            <div className="flex border border-[#DDDDDD] rounded-sm bg-white overflow-hidden min-h-[38px]">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="px-2.5 py-2 text-sm border-0 border-r border-[#DDDDDD] bg-white text-gray-700 font-medium focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-size-[12px] bg-position-[right_6px_center] pr-7"
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
            compact
            className="border-[#DDDDDD]"
          />
        </div>

        {/* Row 3: Home Address (full width) */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-[#212121] mb-0.5">
            Home Address
          </label>
          <textarea
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            placeholder="Enter your address"
            rows={3}
            className="w-full px-3 py-2.5 text-sm border border-[#DDDDDD] rounded-sm bg-white font-medium placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px]"
          />
        </div>

        {/* Row 4: City | Postal Code | Country | Province */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city name"
            compact
            className="border-[#DDDDDD]"
          />
          <Input
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Postal code"
            compact
            className="border-[#DDDDDD]"
          />
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                Country
              </label>
              <Select
                options={COUNTRY_OPTIONS}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Select your country"
                compact
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                Province
              </label>
              <Select
                options={PROVINCE_OPTIONS}
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Select province"
                compact
              />
            </div>
          </div>
        </div>

        {/* Actions: Cancel | Save */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-800 text-gray-900 rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-(--color-primary) text-white rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            <ArrowUp className="w-4 h-4" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
