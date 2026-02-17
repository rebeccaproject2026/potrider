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
    max: 12.5,
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
    data: [12.5, 9, 7.5, 8, 5.5],
  },
  {
    name: "Sales",
    data: [2.3, 1, 4.5, 7, 3],
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

// Gender Donut Chart Configuration - Outer Circle Female (Orange)
export const genderFemaleDonutOptions = {
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "90%",
        labels: {
          show: false,
        },
      },
      expandOnClick: false,
      borderRadius: 100,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#FF9800", "transparent"],
  labels: ["Female", "Other"],
  legend: {
    show: false,
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["#ffffff"],
    lineCap: "round",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

export const genderFemaleDonutSeries = [80, 20];

// Gender Donut Chart Configuration - Outer Circle Unknown (Black) - Thinner
export const genderUnknownDonutOptions = {
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "96%",
        labels: {
          show: false,
        },
      },
      expandOnClick: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["transparent", "#212121"],
  labels: ["Other", "Unknown"],
  legend: {
    show: false,
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["#ffffff"],
    lineCap: "round",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

export const genderUnknownDonutSeries = [80, 20];

// Gender Donut Chart Configuration - Inner Circle Male (Green)
export const genderMaleDonutOptions = {
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "88%",
        labels: {
          show: false,
        },
      },
      expandOnClick: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#4CAF50", "transparent"],
  labels: ["Male", "Other"],
  legend: {
    show: false,
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["#ffffff"],
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

export const genderMaleDonutSeries = [55, 45];

// Gender Donut Chart Configuration - Inner Circle Another Identity (Light Peach)
export const genderAnotherIdentityDonutOptions = {
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "95%",
        labels: {
          show: false,
        },
      },
      expandOnClick: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["transparent", "#FFE0B2"],
  labels: ["Other", "Another Identity"],
  legend: {
    show: false,
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["#ffffff"],
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

export const genderAnotherIdentityDonutSeries = [55, 45];

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
