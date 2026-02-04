import Chart from "react-apexcharts";

const DashboardDeliveries = ({ data, onViewAll }) => {
  const chartData = data || {
    series: [31, 44, 25],
    labels: ["Delivered", "Cancelled", "Processing"],
  };

  const chartOptions = {
    chart: {
      type: "pie",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    colors: ["#109F22", "#ef4444", "#f59e0b"],
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex }) {
        const labels = chartData.labels;
        return labels[seriesIndex] + " - " + Math.round(val) + "%";
      },
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        colors: ["#000"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    labels: chartData.labels,
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -30,
          minAngleToShowLabel: 10,
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "light",
    },
  };

  return (
    <div className="bg-white rounded-sm shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Deliveries</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center"
        >
          View All
        </button>
      </div>

      {/* Pie Chart */}
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="pie"
        height={290}
      />
    </div>
  );
};

export default DashboardDeliveries;
