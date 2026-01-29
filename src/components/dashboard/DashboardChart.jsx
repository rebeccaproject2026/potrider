import Chart from "react-apexcharts";

const DashboardChart = ({
  title,
  value,
  change,
  isPositive,
  color,
  colorOffset0,
  colorOffset100,
  chartData = [],
}) => {
  const chartOptions = {
    chart: {
      type: "area",
      height: 50,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [color],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: [color],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: colorOffset0 || color, opacity: 1 },
          { offset: 100, color: colorOffset100 || color, opacity: 1 },
        ],
      },
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
    grid: {
      show: false,
    },
    labels: [],
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: {
        enabled: false,
      },
    },
  };

  const chartSeries = [
    {
      name: title,
      data: chartData.length > 0 ? chartData : [30, 45, 35, 50, 69, 55, 50, 60, 45],
    },
  ];

  return (
    <div className="bg-white rounded-sm p-4 flex flex-col">
      {/* Header with title and percentage */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-[#3F4753] font-semibold mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <span
          className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {change}
        </span>
      </div>

      {/* Chart - takes remaining space */}
      <div className="flex-1 -mx-4 -mb-4 rounded-b-sm overflow-hidden">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={70}
        />
      </div>
    </div>
  );
};

export default DashboardChart;
