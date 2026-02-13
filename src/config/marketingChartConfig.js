// Campaign Line Chart Configuration
export const campaignChartOptions = {
  chart: {
    type: "line",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    labels: {
      style: {
        fontSize: "10px",
        colors: "#666",
        fontWeight: 400,
      },
    },
    axisBorder: {
      show: true,
      color: "#E5E7EB",
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 16,
    tickAmount: 4,
    labels: {
      style: {
        fontSize: "10px",
        colors: "#666",
        fontWeight: 400,
      },
      formatter: function (val) {
        return val;
      },
    },
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "11px",
    fontWeight: 500,
    markers: {
      width: 8,
      height: 8,
      radius: 12,
    },
    itemMargin: {
      horizontal: 12,
      vertical: 8,
    },
    labels: {
      colors: "#374151",
    },
  },
  colors: ["#4CAF50", "#FF9800"],
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: "#F3F4F6",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 10,
      bottom: 0,
      left: 10,
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 5,
    },
  },
};

export const campaignChartSeries = [
  {
    name: "Emails",
    data: [12, 9, 7.5, 9, 6],
  },
  {
    name: "Sales",
    data: [0, 2, 5, 8, 3],
  },
];

// SMS Campaign Chart Series
export const smsCampaignChartSeries = [
  {
    name: "SMS",
    data: [12, 9, 7.5, 9, 6],
  },
  {
    name: "Sales",
    data: [0, 2, 5, 8, 3],
  },
];

// Coupons Campaign Chart Series
export const couponsCampaignChartSeries = [
  {
    name: "Total Orders",
    data: [12, 9, 7.5, 9, 6],
  },
  {
    name: "Orders with Coupons",
    data: [0, 2, 5, 8, 3],
  },
];

// Featured Ads Campaign Chart Series
export const featuredAdsCampaignChartSeries = [
  {
    name: "Ads",
    data: [12, 9, 7.5, 9, 6],
  },
  {
    name: "Sales",
    data: [0, 2, 5, 8, 3],
  },
];

// Follow Up Bar Chart Configuration
export const followUpBarChartOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "40%",
      borderRadius: 2,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    labels: {
      style: {
        fontSize: "11px",
        colors: "#666",
        fontWeight: 400,
      },
    },
    axisBorder: {
      show: true,
      color: "#E5E7EB",
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 500,
    tickAmount: 5,
    labels: {
      style: {
        fontSize: "10px",
        colors: "#666",
        fontWeight: 400,
      },
      formatter: function (val) {
        return val;
      },
    },
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "11px",
    fontWeight: 500,
    markers: {
      width: 8,
      height: 8,
      radius: 12,
    },
    itemMargin: {
      horizontal: 12,
      vertical: 8,
    },
    labels: {
      colors: "#374151",
    },
  },
  colors: ["#4CAF50", "#FF9800"],
  grid: {
    show: true,
    borderColor: "#F3F4F6",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 10,
      bottom: 0,
      left: 10,
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
};

export const followUpBarChartSeries = [
  {
    name: "Sales",
    data: [200, 300, 310, 100, 310, 250, 270],
  },
  {
    name: "Revenue",
    data: [500, 490, 500, 500, 500, 490, 490],
  },
];

// Recently Added Coupon Bar Chart Configuration
export const couponBarChartOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "50%",
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Orders", "Redeemed on"],
    min: 0,
    max: 600,
    tickAmount: 6,
    labels: {
      style: {
        fontSize: "10px",
        colors: "#9CA3AF",
      },
    },
    axisBorder: {
      show: true,
      color: "#E5E7EB",
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "12px",
        colors: "#4B5563",
        fontWeight: 500,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#F3F4F6",
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  colors: ["#2196F3", "#F44336"],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
};

// Function to generate coupon bar chart series based on selected coupon
export const getCouponBarChartSeries = (selectedCoupon) => [
  {
    name: "Count",
    data: [selectedCoupon.stats.orders, selectedCoupon.stats.redeemed],
  },
];

// Recent Ad Bar Chart Configuration
export const adBarChartOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "50%",
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Impressions", "Clicks", "Orders"],
    min: 0,
    max: 600,
    tickAmount: 6,
    labels: {
      style: {
        fontSize: "10px",
        colors: "#9CA3AF",
      },
    },
    axisBorder: {
      show: true,
      color: "#E5E7EB",
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "12px",
        colors: "#4B5563",
        fontWeight: 500,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#F3F4F6",
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  colors: ["#2196F3", "#4CAF50", "#FF9800"],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
};

// Function to generate ad bar chart series based on selected ad
export const getAdBarChartSeries = (selectedAd) => [
  {
    name: "Count",
    data: [
      selectedAd.stats.impressions,
      selectedAd.stats.clicks,
      selectedAd.stats.orders,
    ],
  },
];

// Campaign Stats Bar Chart Configuration
export const campaignStatsChartOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "60%",
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Sent", "Delivered", "Bounced", "Open", "Clicked", "Unsubscribe"],
    min: 0,
    max: 600,
    tickAmount: 6,
    labels: {
      style: {
        fontSize: "10px",
        colors: "#9CA3AF",
      },
    },
    axisBorder: {
      show: true,
      color: "#E5E7EB",
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "11px",
        colors: "#4B5563",
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#F3F4F6",
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  colors: ["#2196F3", "#4CAF50", "#FF9800", "#FF9800", "#2196F3", "#F44336"],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
};

// Gender Donut Chart Configuration - Radial Bar Style
export const genderDonutOptions = {
  chart: {
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: "30%",
        background: "transparent",
      },
      dataLabels: {
        show: false,
      },
      track: {
        show: true,
        background: "#f0f0f0",
        strokeWidth: "100%",
        opacity: 0.3,
      },
    },
  },
  colors: ["#FF9800", "#4CAF50", "#FFE0B2", "#212121"],
  labels: ["Female", "Male", "Another Identity", "Unknown"],
  legend: {
    show: false,
  },
  stroke: {
    lineCap: "round",
  },
};

export const genderDonutSeries = [70.8, 20.8, 0.81, 0.88];

// Function to generate campaign stats chart series based on selected campaign
export const getCampaignStatsChartSeries = (selectedCampaign) => [
  {
    name: "Count",
    data: [
      selectedCampaign.stats.sent,
      selectedCampaign.stats.delivered,
      selectedCampaign.stats.bounced,
      selectedCampaign.stats.open,
      selectedCampaign.stats.clicked,
      selectedCampaign.stats.unsubscribe,
    ],
  },
];
