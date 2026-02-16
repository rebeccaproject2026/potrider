import { useState, useCallback } from "react";
import MarketingStatsCard from "../../components/marketing/MarketingStatsCard";
import AudienceOverview from "../../components/marketing/AudienceOverview";
import RecentlySentCampaigns from "../../components/marketing/RecentlySentCampaigns";
import RecentlyAddedCoupon from "../../components/marketing/RecentlyAddedCoupon";
import RecentAd from "../../components/marketing/RecentAd";
import Chart from "react-apexcharts";
import {
  EMAIL_STATS_1,
  EMAIL_STATS_2,
  EMAIL_STATS_3,
  EMAIL_STATS_4,
  EMAIL_STATS_5,
  CAMPAIGN_STATS_TABS,
  CAMPAIGN_DETAIL_STATS,
  SMS_CAMPAIGN_DETAIL_STATS,
  COUPONS_CAMPAIGN_DETAIL_STATS,
  FEATURED_ADS_CAMPAIGN_DETAIL_STATS,
  FOLLOW_UP_CAMPAIGN_DETAIL_STATS,
} from "../../data/marketingData";
import {
  campaignChartOptions,
  campaignChartSeries,
  smsCampaignChartSeries,
  couponsCampaignChartSeries,
  featuredAdsCampaignChartSeries,
  followUpBarChartOptions,
  followUpBarChartSeries,
} from "../../config/marketingChartConfig";
import DatePickerMap from "../../components/DatePickerMap";

const Marketing = () => {
  const [activeTab, setActiveTab] = useState("email-campaign");
  const [period, setPeriod] = useState({ start: null, end: null });
  const [campaignStatsTab, setCampaignStatsTab] = useState("this-week");

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Tabs */}
      <div className="flex items-center justify-between bg-white">
        <button
          onClick={() => setActiveTab("email-campaign")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative cursor-pointer w-full ${
            activeTab === "email-campaign"
              ? "text-[#109F22]"
              : "text-[#464646] hover:text-gray-900"
          }`}
        >
          Email Campaign
          {activeTab === "email-campaign" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("sms-campaign")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative cursor-pointer w-full ${
            activeTab === "sms-campaign"
              ? "text-[#109F22]"
              : "text-[#464646] hover:text-gray-900"
          }`}
        >
          SMS Campaign
          {activeTab === "sms-campaign" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("follow-up")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative cursor-pointer w-full ${
            activeTab === "follow-up"
              ? "text-[#109F22]"
              : "text-[#464646] hover:text-gray-900"
          }`}
        >
          Follow Up
          {activeTab === "follow-up" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("coupons")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative cursor-pointer w-full ${
            activeTab === "coupons"
              ? "text-[#109F22]"
              : "text-[#464646] hover:text-gray-900"
          }`}
        >
          Coupons
          {activeTab === "coupons" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("featured-ads")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative cursor-pointer w-full ${
            activeTab === "featured-ads"
              ? "text-[#109F22]"
              : "text-[#464646] hover:text-gray-900"
          }`}
        >
          Featured Ads
          {activeTab === "featured-ads" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === "email-campaign" && (
          <div className="flex flex-col gap-2">
            <div>
              <DatePickerMap
                defaultItem={2}
                onUpdate={onDateUpdate}
                className="h-10 sm:*:w-76"
              />
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {EMAIL_STATS_1.map((stat) => (
                <MarketingStatsCard
                  key={stat.id}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  changeColor={stat.changeColor}
                />
              ))}
            </div>

            {/* Campaign Statistics Section */}
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Chart */}
                <div className="bg-white p-1.5 rounded-sm shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">
                      Campaign Statistics
                    </h3>
                    <div>
                      <DatePickerMap
                        defaultItem={2}
                        onUpdate={onDateUpdate}
                        className="h-10 sm:*:min-w-44! *:px-4! *:py-2!"
                      />
                    </div>
                  </div>
                  <Chart
                    options={campaignChartOptions}
                    series={campaignChartSeries}
                    type="line"
                    height={196}
                    className="min-h-49!"
                  />
                </div>

                {/* Stats Tabs and Details */}
                <div className="flex flex-col bg-white py-1.5 rounded-sm shadow">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 border-b border-gray-200 mb-3 ">
                    {CAMPAIGN_STATS_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCampaignStatsTab(tab.id)}
                        className={`px-4 py-2 text-xs font-medium transition-colors relative ${
                          campaignStatsTab === tab.id
                            ? "text-[#109F22]"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.label}
                        {campaignStatsTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 px-2">
                    {CAMPAIGN_DETAIL_STATS.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-sm py-5 px-2"
                      >
                        <p className="text-xs text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Overview Section */}
            <AudienceOverview />

            {/* Recently Sent Campaigns Section */}
            <RecentlySentCampaigns />
          </div>
        )}
        {activeTab === "sms-campaign" && (
          <div className="flex flex-col gap-2">
            <div>
              <DatePickerMap
                defaultItem={2}
                onUpdate={onDateUpdate}
                className="h-10 sm:*:w-76"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {EMAIL_STATS_2.map((stat) => (
                <MarketingStatsCard
                  key={stat.id}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  changeColor={stat.changeColor}
                />
              ))}
            </div>

            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Chart */}
                <div className="bg-white p-1.5 rounded-sm shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">
                      Campaign Statistics
                    </h3>
                    <div>
                      <DatePickerMap
                        defaultItem={2}
                        onUpdate={onDateUpdate}
                        className="h-10 sm:*:min-w-44! *:px-4! *:py-2! "
                      />
                    </div>
                  </div>
                  <Chart
                    options={campaignChartOptions}
                    series={smsCampaignChartSeries}
                    type="line"
                    height={196}
                    className="min-h-49!"
                  />
                </div>

                {/* Stats Tabs and Details */}
                <div className="flex flex-col bg-white py-1.5 rounded-sm shadow">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 border-b border-gray-200 mb-3 ">
                    {CAMPAIGN_STATS_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCampaignStatsTab(tab.id)}
                        className={`px-4 py-2 text-xs font-medium transition-colors relative ${
                          campaignStatsTab === tab.id
                            ? "text-[#109F22]"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.label}
                        {campaignStatsTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 px-2">
                    {SMS_CAMPAIGN_DETAIL_STATS.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-sm py-5 px-2"
                      >
                        <p className="text-xs text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Audience Overview Section */}
            <AudienceOverview />

            {/* Recently Sent Campaigns Section */}
            <RecentlySentCampaigns />
          </div>
        )}
        {activeTab === "follow-up" && (
          <div className="flex flex-col gap-2">
            <div>
              <DatePickerMap
                defaultItem={2}
                onUpdate={onDateUpdate}
                className="h-10 sm:*:w-76"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {EMAIL_STATS_3.map((stat) => (
                <MarketingStatsCard
                  key={stat.id}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  changeColor={stat.changeColor}
                />
              ))}
            </div>

            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Chart */}
                <div className="bg-white pt-1.5 px-1.5 rounded-sm shadow">
                  <div className="flex items-center justify-between ">
                    <h3 className="text-base font-semibold text-gray-900">
                      Campaign Statistics
                    </h3>
                     <div>
                      <DatePickerMap
                        defaultItem={2}
                        onUpdate={onDateUpdate}
                        className="h-10 sm:*:min-w-44! *:px-4! *:py-2! "
                      />
                    </div>
                  </div>
                  <Chart
                    options={followUpBarChartOptions}
                    series={followUpBarChartSeries}
                    type="bar"
                    height={200}
                    className="min-h-50!"
                  />
                </div>

                {/* Stats Tabs and Details */}
                <div className="flex flex-col bg-white py-1.5 rounded-sm shadow">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 border-b border-gray-200 mb-3 ">
                    {CAMPAIGN_STATS_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCampaignStatsTab(tab.id)}
                        className={`px-4 py-2 text-xs font-medium transition-colors relative ${
                          campaignStatsTab === tab.id
                            ? "text-[#109F22]"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.label}
                        {campaignStatsTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 px-2">
                    {FOLLOW_UP_CAMPAIGN_DETAIL_STATS.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-sm py-5 px-2"
                      >
                        <p className="text-xs text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Audience Overview Section */}
            <AudienceOverview
              showLabels={false}
              title="Orders Audience Overview"
            />
          </div>
        )}
        {activeTab === "coupons" && (
          <div className="flex flex-col gap-2">
            <div>
              <DatePickerMap
                defaultItem={2}
                onUpdate={onDateUpdate}
                className="h-10 sm:*:w-76"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {EMAIL_STATS_4.map((stat) => (
                <MarketingStatsCard
                  key={stat.id}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  changeColor={stat.changeColor}
                />
              ))}
            </div>

            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Chart */}
                <div className="bg-white p-1.5 rounded-sm shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">
                      Campaign Statistics
                    </h3>
                     <div>
                      <DatePickerMap
                        defaultItem={2}
                        onUpdate={onDateUpdate}
                        className="h-10 sm:*:min-w-44! *:px-4! *:py-2! "
                      />
                    </div>
                  </div>
                  <Chart
                    options={campaignChartOptions}
                    series={couponsCampaignChartSeries}
                    type="line"
                    height={196}
                    className="min-h-49!"
                  />
                </div>

                {/* Stats Tabs and Details */}
                <div className="flex flex-col bg-white py-1.5 rounded-sm shadow">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 border-b border-gray-200 mb-3 ">
                    {CAMPAIGN_STATS_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCampaignStatsTab(tab.id)}
                        className={`px-4 py-2 text-xs font-medium transition-colors relative ${
                          campaignStatsTab === tab.id
                            ? "text-[#109F22]"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.label}
                        {campaignStatsTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 px-2">
                    {COUPONS_CAMPAIGN_DETAIL_STATS.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-sm py-5 px-2"
                      >
                        <p className="text-xs text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Overview Section */}
            <AudienceOverview showLabels={false} />

            {/* Recently Added Coupon Section */}
            <RecentlyAddedCoupon />
          </div>
        )}
        {activeTab === "featured-ads" && (
          <div className="flex flex-col gap-2">
            <div>
              <DatePickerMap
                defaultItem={2}
                onUpdate={onDateUpdate}
                className="h-10 sm:*:w-76"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {EMAIL_STATS_5.map((stat) => (
                <MarketingStatsCard
                  key={stat.id}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  changeColor={stat.changeColor}
                />
              ))}
            </div>

            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Chart */}
                <div className="bg-white p-1.5 rounded-sm shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">
                      Campaign Statistics
                    </h3>
                     <div>
                      <DatePickerMap
                        defaultItem={2}
                        onUpdate={onDateUpdate}
                        className="h-10 sm:*:min-w-44! *:px-4! *:py-2! "
                      />
                    </div>
                  </div>
                  <Chart
                    options={campaignChartOptions}
                    series={featuredAdsCampaignChartSeries}
                    type="line"
                    height={196}
                    className="min-h-49!"
                  />
                </div>

                {/* Stats Tabs and Details */}
                <div className="flex flex-col bg-white py-1.5 rounded-sm shadow">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 border-b border-gray-200 mb-3 ">
                    {CAMPAIGN_STATS_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCampaignStatsTab(tab.id)}
                        className={`px-4 py-2 text-xs font-medium transition-colors relative ${
                          campaignStatsTab === tab.id
                            ? "text-[#109F22]"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.label}
                        {campaignStatsTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#109F22]"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 px-2">
                    {FEATURED_ADS_CAMPAIGN_DETAIL_STATS.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-sm py-5 px-2"
                      >
                        <p className="text-xs text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Audience Overview Section */}
            <AudienceOverview customLabels={["Impressions", "Clicks"]} />

            {/* Recent Ad Section */}
            <RecentAd />
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketing;
