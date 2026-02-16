import { useState, useCallback } from "react";
import Chart from "react-apexcharts";
import { RECENT_CAMPAIGNS } from "../../data/marketingData";
import {
  campaignStatsChartOptions,
  getCampaignStatsChartSeries,
} from "../../config/marketingChartConfig";
import DatePickerMap from "../DatePickerMap";

const RecentlySentCampaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(RECENT_CAMPAIGNS[0]);
  const [period, setPeriod] = useState({ start: null, end: null });

  // Get campaign stats chart series based on selected campaign
  const campaignStatsChartSeries =
    getCampaignStatsChartSeries(selectedCampaign);

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  return (
    <div className="bg-white rounded-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-black">
          Recently Sent Campaigns
        </h3>
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
          {/* Campaign Selector */}
          <div className="mb-4">
            <select
              className="w-fit px-2 py-2 text-[13px] border border-[#F3F3F3] rounded-sm font-semibold bg-[#F3F3F3] focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedCampaign.id}
              onChange={(e) => {
                const campaign = RECENT_CAMPAIGNS.find(
                  (c) => c.id === parseInt(e.target.value),
                );
                setSelectedCampaign(campaign);
              }}
            >
              {RECENT_CAMPAIGNS.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 mb-6 text-sm">
            <div className="flex">
              <span className="text-black font-medium w-32">Sent to :</span>
              <span className="text-gray-600 font-medium">
                {selectedCampaign.sentTo}
              </span>
            </div>

            <div className="flex">
              <span className="text-black font-medium w-32">From :</span>
              <span className="text-gray-600 font-medium">
                {selectedCampaign.from}
              </span>
            </div>

            <div className="flex">
              <span className="text-black font-medium w-32">Subject :</span>
              <span className="text-gray-600 font-medium">
                {selectedCampaign.subject}
              </span>
            </div>

            <div className="flex">
              <span className="text-black font-medium w-32">
                Scheduled at :
              </span>
              <span className="text-gray-600 font-medium">
                {selectedCampaign.scheduledAt || "-"}
              </span>
            </div>

            <div className="flex">
              <span className="text-black font-medium w-32">Delivery at :</span>
              <span className="text-gray-600 font-medium">
                {selectedCampaign.deliveryAt || "-"}
              </span>
            </div>
          </div>
        </div>

        <div>
          {/* Stats Bars Chart */}
          <Chart
            options={campaignStatsChartOptions}
            series={campaignStatsChartSeries}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentlySentCampaigns;
