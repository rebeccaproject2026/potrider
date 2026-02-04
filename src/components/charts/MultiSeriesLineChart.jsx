import { useMemo } from "react";
import Chart from "react-apexcharts";

/**
 * Reusable multi-series line chart (ApexCharts).
 * Pointed/straight lines with circular event markers.
 *
 * @param {Array} series - [{ name: string, data: number[] }, ...]
 * @param {Array} colors - Optional hex colors per series
 * @param {number} height - Chart height in px
 * @param {Array} xCategories - Optional x-axis labels (default 1..30)
 * @param {object} yaxis - Optional { min, max, tickAmount }
 * @param {object} optionsOverride - Optional ApexCharts options to merge
 */
const DEFAULT_COLORS = [
  "#3B82F6",
  "#F97316",
  "#15803D",
  "#166534",
  "#EAB308",
  "#EC4899",
  "#06B6D4",
  "#14B8A6",
];

const MultiSeriesLineChart = ({
  series = [],
  colors = DEFAULT_COLORS,
  height = 380,
  xCategories,
  yaxis = {},
  optionsOverride = {},
}) => {
  const categories = xCategories ?? Array.from({ length: 30 }, (_, i) => i + 1);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: true },
        fontFamily: "inherit",
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      colors: colors.slice(0, series.length),
      legend: {
        position: "top",
        horizontalAlign: "center",
        fontSize: "10px",
        fontWeight: 500,
        itemMargin: { horizontal: 12 },
        markers: {
          size: 10,
          shape: "square",
          radius: 0,
        },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        categories,
        labels: {
          style: { colors: "#6B7280", fontSize: "11px" },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: yaxis.min ?? 0,
        max: yaxis.max ?? 1000,
        tickAmount: yaxis.tickAmount ?? 4,
        labels: {
          style: { colors: "#6B7280", fontSize: "11px" },
        },
        axisBorder: { show: false },
      },
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 2,
        strokeColors: "#fff",
        hover: { size: 7 },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      ...optionsOverride,
    }),
    [
      series.length,
      categories,
      colors,
      yaxis.min,
      yaxis.max,
      yaxis.tickAmount,
      optionsOverride,
    ]
  );

  if (!series?.length) return null;

  return (
    <Chart options={chartOptions} series={series} type="line" height={height} />
  );
};

export default MultiSeriesLineChart;
