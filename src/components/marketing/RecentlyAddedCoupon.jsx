import { useState, useCallback } from "react";
import Chart from "react-apexcharts";
import { RECENTLY_ADDED_COUPONS } from "../../data/marketingData";
import {
  couponBarChartOptions,
  getCouponBarChartSeries,
} from "../../config/marketingChartConfig";
import DatePickerMap from "../DatePickerMap";

const RecentlyAddedCoupon = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(
    RECENTLY_ADDED_COUPONS[0],
  );
  const [period, setPeriod] = useState({ start: null, end: null });

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  // Get chart series based on selected coupon
  const couponBarChartSeries = getCouponBarChartSeries(selectedCoupon);

  return (
    <div className="bg-white rounded-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-black">
          Recently Added Coupon
        </h3>
        <div>
          <DatePickerMap
            defaultItem={2}
            onUpdate={onDateUpdate}
            className="h-10 sm:*:min-w-48! *:px-4! *:py-2! "
          />
        </div>
      </div>

      <div>
        {/* Coupon Selector */}
        <div className="mb-4">
          <select
            className="w-fit px-3 py-2 text-sm rounded-sm bg-[#F3F3F3] focus:outline-none  font-semibold"
            value={selectedCoupon.id}
            onChange={(e) => {
              const coupon = RECENTLY_ADDED_COUPONS.find(
                (c) => c.id === parseInt(e.target.value),
              );
              setSelectedCoupon(coupon);
            }}
          >
            {RECENTLY_ADDED_COUPONS.map((coupon) => (
              <option key={coupon.id} value={coupon.id}>
                {coupon.name}
              </option>
            ))}
          </select>
        </div>

        {/* Coupon Details */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-black font-medium text-[15px]">Detail :</span>
            <span className="text-[#464646] font-medium">
              {selectedCoupon.detail}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-black font-medium text-[15px]">
              Added on :
            </span>
            <span className="text-[#464646] font-medium">
              {selectedCoupon.addedOn}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-black font-medium text-[15px]">
              Expired on :
            </span>
            <span className="text-[#464646] font-medium">
              {selectedCoupon.expiredOn}
            </span>
          </div>
        </div>

        {/* Stats Bars Chart */}
        <div>
          <Chart
            options={couponBarChartOptions}
            series={couponBarChartSeries}
            type="bar"
            height={140}
            className="min-h-32!"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentlyAddedCoupon;
