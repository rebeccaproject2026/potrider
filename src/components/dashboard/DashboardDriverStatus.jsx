import Chart from "react-apexcharts";

const DashboardDriverStatus = ({ data, onViewAll }) => {
  const chartData = data || {
    categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [
      {
        name: "Online",
        data: [450, 320, 300, 460, 140, 380, 390],
      },
      {
        name: "Offline",
        data: [220, 120, 240, 360, 240, 220, 310],
      },
    ],
    totals: {
      online: 32,
      offline: 23,
    },
  };

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#00B159", "#F44336"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 8,
      },
    },
    stroke: {
      show: true,
      width: 12,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      show: true,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "light",
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 0,
    },
  };

  return (
    <div className="bg-white rounded-sm shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Driver Status</h2>
        <button
          onClick={onViewAll}
          className="text-[var(--color-primary)] hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 justify-end">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-[450] text-[#3F4753]">
            Online({chartData.totals.online})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-[#3F4753] font-[450]">
            Offline({chartData.totals.offline})
          </span>
        </div>
      </div>

      {/* Chart */}
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default DashboardDriverStatus;
