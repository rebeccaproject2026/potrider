import { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import { X, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { getDateRange } from "../../utils/dateUtils";

/**
 * Reusable Order Analytics Component
 * Opens as a slider from the right side
 * @param {Object} props
 * @param {string} props.title - Title for the analytics (e.g., "Delivered", "In-Progress")
 * @param {Array} props.data - Array of order data objects
 * @param {Array} props.headers - Table headers array (e.g., ['Order Id', 'Order Created', 'Amount'])
 * @param {Object} props.keys - Key mapping object { idKey, firstKey, secondKey, thirdKey }
 * @param {boolean} props.isOpen - Whether the analytics panel is open
 * @param {Function} props.onClose - Function to call when closing
 * @param {React.ReactNode} props.trigger - Optional trigger element (button/link) to open analytics
 */
// Static data matching the reference image (Today: 1100, Yesterday: 800)
const STATIC_BAR_DATA = [1100, 800];
const STATIC_BAR_SERIES = [{ name: "Delivery", data: STATIC_BAR_DATA }];
const STATIC_DIFFERENCE = { text: "↑ 300 (22%) more than yesterday", positive: true };
// Top 5 static data: Order Id, Order Created, Amount
const STATIC_TOP_5 = [
  { firstValue: "302025", secondValue: "16 Jan 2025 at 10:23pm", thirdValue: "25", thirdUnit: "$" },
  { firstValue: "302025", secondValue: "16 Jan 2025 at 10:23pm", thirdValue: "31", thirdUnit: "$" },
  { firstValue: "302026", secondValue: "16 Jan 2025 at 10:23pm", thirdValue: "13", thirdUnit: "$" },
  { firstValue: "302027", secondValue: "16 Jan 2025 at 10:23pm", thirdValue: "21", thirdUnit: "$" },
  { firstValue: "302028", secondValue: "16 Jan 2025 at 10:23pm", thirdValue: "43", thirdUnit: "$" },
];
const STATIC_DONUT_SERIES = [25, 31, 13, 21, 43];
const STATIC_DONUT_LABELS = ["302025", "302025", "302026", "302027", "302028"];

const OrderAnalytics = ({
  title = "Delivered",
  data = [],
  headers = [],
  keys = {},
  isOpen = false,
  onClose,
  trigger,
  useStaticData = true,
}) => {
  const [activeTab, setActiveTab] = useState("today");

  const tabMap = {
    today: "Today",
    thisMonth: "This Month",
    lastMonth: "Last Month",
  };

  // Filter data by date range
  const filterDataByDateRange = (dataArray, startDate, endDate) => {
    return dataArray.filter((item) => {
      // Try multiple date fields
      let dateKey = item.updatedAt || item.createdAt || item.date;

      // If date is in format "29 January, 2026", parse it
      if (dateKey && typeof dateKey === "string" && dateKey.includes(",")) {
        dateKey = new Date(dateKey);
      }

      if (!dateKey) return false;
      const itemDate = new Date(dateKey);
      if (isNaN(itemDate.getTime())) return false;

      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // Calculate total (count of items)
  const calculateTotal = (dataArray) => {
    return dataArray.length;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if value is a valid date
  const isValidDate = (value) => {
    if (!value) return false;
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  };

  // Get unit for a key
  const getUnit = (key) => {
    if (!key) return "";
    const keyLower = key.toLowerCase();
    if (keyLower.includes("amount") || keyLower.includes("price") || keyLower.includes("total")) {
      return "$";
    }
    return "";
  };

  // Derived chart/table data: static when useStaticData, else computed from data
  const { displayBarSeries, displayDonutSeries, displayDonutLabels, displayTopProducts, displayDifferenceText, displayDifferenceIcon } = useMemo(() => {
    if (useStaticData) {
      return {
        displayBarSeries: STATIC_BAR_SERIES,
        displayDonutSeries: STATIC_DONUT_SERIES,
        displayDonutLabels: STATIC_DONUT_LABELS,
        displayTopProducts: STATIC_TOP_5,
        displayDifferenceText: STATIC_DIFFERENCE.text,
        displayDifferenceIcon: <ArrowUp className="w-3 h-3 text-green-600" />,
      };
    }
    if (!data?.length) {
      return {
        displayBarSeries: [{ name: title, data: [0, 0] }],
        displayDonutSeries: [],
        displayDonutLabels: [],
        displayTopProducts: [],
        displayDifferenceText: "",
        displayDifferenceIcon: null,
      };
    }
    const { startDate, endDate, compareStartDate, compareEndDate } = getDateRange(activeTab);
    const currentData = filterDataByDateRange(data, startDate, endDate);
    const compareData = filterDataByDateRange(data, compareStartDate, compareEndDate);
    const currentTotal = calculateTotal(currentData);
    const compareTotal = calculateTotal(compareData);
    const difference = currentTotal - compareTotal;
    const percentage = compareTotal > 0 ? Math.abs((difference / compareTotal) * 100) : 0;
    const getComparisonLabel = () => {
      switch (activeTab) {
        case "today": return "yesterday";
        case "thisMonth": return "last month";
        case "lastMonth": return "previous month";
        default: return "previous period";
      }
    };
    // Inline top products computation
    let top = [];
    if (currentData?.length && keys?.idKey && keys?.firstKey && keys?.secondKey && keys?.thirdKey) {
      const productMap = {};
      const secondUnit = getUnit(keys.secondKey);
      const thirdUnit = getUnit(keys.thirdKey);
      currentData.forEach((item) => {
        const productId = item[keys.idKey];
        const firstValue = item[keys.firstKey];
        const secondValue = item[keys.secondKey] || 0;
        const thirdValue = item[keys.thirdKey];
        const isSecondKeyDate = isValidDate(secondValue);
        if (!productMap[productId]) {
          productMap[productId] = {
            firstValue: firstValue || "",
            secondValue: isSecondKeyDate ? formatDate(secondValue) : secondValue,
            thirdValue: thirdValue || "",
            secondUnit,
            thirdUnit,
            isSecondKeyDate,
            numericValue: isSecondKeyDate ? parseFloat(thirdValue) || 0 : parseFloat(secondValue) || 0,
          };
        } else if (isSecondKeyDate && isValidDate(secondValue)) {
          const newDate = new Date(secondValue);
          if (newDate > new Date(productMap[productId].secondValue)) {
            productMap[productId].secondValue = formatDate(secondValue);
            productMap[productId].thirdValue = thirdValue || "";
            productMap[productId].numericValue = parseFloat(thirdValue) || 0;
          }
        }
      });
      top = Object.values(productMap)
        .sort((a, b) => b.numericValue - a.numericValue)
        .slice(0, 5);
    }
    let diffIcon = null;
    let diffText = "";
    if (difference > 0) {
      diffIcon = <ArrowUp className="w-3 h-3 text-green-600" />;
      diffText = `↑ ${difference} (${percentage.toFixed(0)}%) more than ${getComparisonLabel()}`;
    } else if (difference < 0) {
      diffIcon = <ArrowDown className="w-3 h-3 text-red-600" />;
      diffText = `↓ ${Math.abs(difference)} (${percentage.toFixed(0)}%) less than ${getComparisonLabel()}`;
    } else {
      diffIcon = <Minus className="w-3 h-3 text-gray-500" />;
      diffText = `No change from ${getComparisonLabel()}`;
    }
    return {
      displayBarSeries: [{ name: title, data: [currentTotal, compareTotal] }],
      displayDonutSeries: top.map((p) => p.numericValue),
      displayDonutLabels: top.map((p) => p.firstValue),
      displayTopProducts: top,
      displayDifferenceText: diffText,
      displayDifferenceIcon: diffIcon,
    };
  }, [useStaticData, data, activeTab, title, keys]);

  // Bar chart options (stable id + no dynamic animation to prevent flicker on tab change)
  const barChartOptions = useMemo(() => {
    const categories =
      activeTab === "today"
        ? ["Today", "Yesterday"]
        : activeTab === "thisMonth"
          ? ["This Month", "Last Month"]
          : ["Last Month", "Previous Month"];
    return {
      chart: {
        id: "order-analytics-bar",
        type: "bar",
        height: 300,
        toolbar: { show: false },
        animations: {
          enabled: true,
          dynamicAnimation: {
            enabled: false,
          },
        },
      },
      colors: ["#0066FF", "#FF9800"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
          distributed: true,
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val > 0 ? val : "";
        },
        style: {
          colors: ["#0066FF", "#FF9800"],
          fontWeight: "bold",
          fontSize: "12px",
        },
        offsetY: -20,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        min: 0,
        max: 1200,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          title: {
            formatter: () => title + ":",
          },
          formatter: function (val) {
            return `${val}`;
          },
        },
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: "#C2C6CE",
        strokeDashArray: 2,
      },
    };
  }, [activeTab, title]);

  // Donut chart options
  const donutChartOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
        height: 350,
        toolbar: { show: false },
      },
      labels: displayDonutLabels,
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#0066FF", "#FF9800", "#84e39c", "#9C27B0", "#46c1f1"],
      stroke: {
        width: 1,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: false,
            },
            background: "transparent",
          },
        },
      },
      tooltip: {
        custom: function ({ seriesIndex }) {
          const product = displayTopProducts[seriesIndex];
          if (!product) return "";
          return `
            <div style="padding: 8px; font-size: 15px; line-height: 1.5; color:#969696; background: #F0F1F3; font-weight:600; border-radius: 4px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
              ${product.firstValue}<br>
              ${product.secondValue} ${product.secondUnit || ""}<br>
              ${product.thirdUnit || "$"}${product.thirdValue || ""}
            </div>
          `;
        },
      },
    }),
    [displayDonutLabels, displayTopProducts]
  );

  return (
    <>
      {/* Trigger button/link */}
      {trigger && trigger}

      {/* Analytics Panel - slides in from right (light grey panel per image) */}
      <div
        className={`charts-slider-1 fixed top-0 right-0 h-full w-full max-w-[550px] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto hide-scrollbar ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ height: "100vh", backgroundColor: "#FFFFFF" }}
      >
        {/* Header */}
        <div className="charts-header mb-1 p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10" style={{ backgroundColor: "#FFFFFF" }}>
          <p className="charts-title-1 mb-0 text-[18px] font-semibold text-gray-800">
            {tabMap[activeTab]} {title}
          </p>
          <button
            onClick={onClose}
            className="charts-closer text-gray-600 hover:text-gray-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Statistics Card */}
          <div className="first-card p-3 shadow-sm rounded-xl border border-gray-200 mb-4" style={{ backgroundColor: "#E8E9EB" }}>
            <div className="flex justify-between items-center mb-3">
              <h5 className="mb-0 font-semibold text-gray-800">Statistics</h5>
              <div className="flex gap-3">
                {["today", "thisMonth", "lastMonth"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[13px] cursor-pointer transition-colors ${activeTab === tab
                      ? "font-bold text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                      }`}
                  >
                    {tabMap[tab]}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart - fixed height wrapper prevents layout shift/flicker on tab change */}
            <div className="min-h-[260px] w-full" style={{ minHeight: 260 }}>
              <Chart
                key="order-analytics-bar-chart"
                options={barChartOptions}
                series={displayBarSeries}
                type="bar"
                height={260}
              />
            </div>

            {/* Difference Text */}
            <div className="mt-2 flex items-center gap-1">
              {displayDifferenceIcon}
              <span className="text-[13px] text-gray-600">{displayDifferenceText}</span>
            </div>
          </div>

          {/* Top 5 Card - always show with static data */}
          {(displayTopProducts.length > 0 || useStaticData) && (
            <div className="second-card p-3 shadow-sm rounded-xl border border-gray-200" style={{ backgroundColor: "#FFFF" }}>
              <h5 className="mb-3 font-semibold text-gray-800">
                Top {(displayTopProducts.length || STATIC_TOP_5.length)} {title}
              </h5>

              {/* Donut Chart */}
              <Chart
                options={donutChartOptions}
                series={displayDonutSeries}
                type="donut"
                height={350}
              />

              {/* Table */}
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {(headers.length ? headers : ["Order Id", "Order Created", "Amount"]).map((header, index) => (
                        <th
                          key={index}
                          className="text-start text-[13px] font-semibold text-[#000] pb-2 border-b border-gray-200 "
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(displayTopProducts.length ? displayTopProducts : STATIC_TOP_5).map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 ">
                        <td className="text-start text-[13px] text-[#000] py-2">
                          {item.firstValue}
                        </td>
                        <td className="text-start text-[13px] text-[#000] py-2">
                          {item.secondValue} {item.secondUnit || ""}
                        </td>
                        <td className="text-start text-[13px] text-[#000] py-2">
                          {item.isSecondKeyDate
                            ? item.thirdValue
                            : `${item.thirdUnit || "$"}${item.thirdValue || ""}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop - dimmed overlay (not full black), content behind still visible */}
      {isOpen && (
        <div
          className="analytics-backdrop fixed inset-0 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default OrderAnalytics;
