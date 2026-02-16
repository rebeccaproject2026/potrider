import { useState, useCallback } from "react";
import Chart from "react-apexcharts";
import { RECENT_ADS } from "../../data/marketingData";
import {
  adBarChartOptions,
  getAdBarChartSeries,
} from "../../config/marketingChartConfig";
import DatePickerMap from "../DatePickerMap";

const RecentAd = () => {
  const [selectedAd, setSelectedAd] = useState(RECENT_ADS[0]);
  const [period, setPeriod] = useState({ start: null, end: null });

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  // Get chart series based on selected ad
  const adBarChartSeries = getAdBarChartSeries(selectedAd);

  return (
    <div className="bg-white rounded-sm px-4 pt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-black">Recent Ad</h3>
        <div>
          <DatePickerMap
            defaultItem={2}
            onUpdate={onDateUpdate}
            className="h-10 sm:*:min-w-48! *:px-4! *:py-2! "
          />
        </div>
      </div>

      <div className="grid grid-cols-[30%_70%] gap-2">
        <div>
          {/* Ad Selector */}
          <div className="mb-2">
            <select
              className="w-fit px-3 py-2 text-xs rounded-sm bg-[#F3F3F3] focus:outline-none  font-semibold"
              value={selectedAd.id}
              onChange={(e) => {
                const ad = RECENT_ADS.find(
                  (a) => a.id === parseInt(e.target.value),
                );
                setSelectedAd(ad);
              }}
            >
              {RECENT_ADS.map((ad) => (
                <option key={ad.id} value={ad.id}>
                  {ad.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ad Details */}
          <div className="text-sm flex flex-col gap-4">
            <div className="flex items-center">
              <span className="text-black font-medium text-[15px]">
                Impressions :
              </span>
              <span className="text-[#464646] font-medium">
                {selectedAd.impressions}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-black font-medium text-[15px]">
                Started at :
              </span>
              <span className="text-[#464646] font-medium">
                {selectedAd.startedAt}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-black font-medium text-[15px]">
                Ended at :
              </span>
              <span className="text-[#464646] font-medium">
                {selectedAd.endedAt}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Bars Chart */}
        <div>
          <Chart
            options={adBarChartOptions}
            series={adBarChartSeries}
            type="bar"
            height={160}
            className="min-h-32!"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentAd;
