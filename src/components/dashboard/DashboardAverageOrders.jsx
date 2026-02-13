import Chart from "react-apexcharts";

const DashboardAverageOrders = ({ data, onViewAll, title = "Average Orders", rightContent }) => {
  const chartData = data || {
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    series: [
      {
        name: "Total Orders(432)",
        data: [
          80, 75, 85, 90, 70, 95, 100, 85, 90, 75, 80, 85, 70, 95, 100,
          85, 90, 75, 80, 85, 70, 95, 100, 85, 90, 100, 115, 90, 95, 80,
        ],
      },
      {
        name: "Delivered (324)",
        data: [
          50, 48, 52, 55, 45, 60, 65, 55, 58, 50, 52, 55, 48, 60, 65, 55,
          58, 50, 52, 55, 48, 60, 65, 55, 58, 65, 75, 58, 60, 52,
        ],
      },
      {
        name: "Pending (45)",
        data: [
          20, 18, 22, 25, 18, 28, 30, 25, 26, 20, 22, 25, 18, 28, 30, 25,
          26, 20, 22, 25, 18, 28, 30, 25, 26, 30, 35, 26, 28, 22,
        ],
      },
      {
        name: "Cancelled (42)",
        data: [
          10, 9, 11, 10, 7, 7, 5, 5, 6, 5, 6, 5, 4, 7, 5, 5, 6, 5, 6, 5,
          4, 7, 5, 5, 6, 5, 5, 6, 7, 6,
        ],
      },
    ],
  };

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#00B159", "#0066FF", "#FF9800", "#F44336"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 0,
      },
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: "Days",
        style: {
          fontSize: "13px",
          fontWeight: "600",
          fontFamily: "Montserrat, serif",
          color: "#000000",
        },
      },
    },
    yaxis: {
      show: true,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      theme: "light",
      x: {
        show: true,
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 0,
    },
  };

  return (
    <div className="bg-white rounded-sm shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-semibold text-[#3F4753]">{title}</h2>
        {rightContent != null ? (
          rightContent
        ) : onViewAll ? (
          <button
            onClick={onViewAll}
            className="text-(--color-primary) hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center"
          >
            View All
          </button>
        ) : null}
      </div>

      {/* Legend */}
      <div className="flex justify-end flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-[450] text-[#3F4753]">Total Orders(432)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-[450] text-[#3F4753]">Delivered (324)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm font-[450] text-[#3F4753]">Pending (45)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm font-[450] text-[#3F4753]">Cancelled (42)</span>
        </div>
      </div>

      {/* Chart */}
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={320}
      />
    </div>
  );
};

export default DashboardAverageOrders;
