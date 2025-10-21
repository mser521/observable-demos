// chart options for simple donut chart:
const options = {
  chart: {
    type: "donut",
    height: 400,
    events: {
      dataPointSelection: getDetails,
    },
  },
  tooltip: {
    enabled: false,
    shared: false,
    followCursor: false,
    intersect: false,
    hideEmptySeries: true,
    fixed: {
      enabled: false,
    },
  },
  series: [44, 55, 13, 33],
  labels: ["Apple", "Mango", "Orange", "Watermelon"],
  colors: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      colors: ["#fff"],
    },
    dropShadow: {
      enabled: false,
    },
  },
};

// function that gets the details of the clicked point:
function getDetails(event, chartContext, config) {
  // Get the clicked fruit data
  const fruit = config.w.config.labels[config.dataPointIndex];
  const value = config.w.config.series[config.dataPointIndex];
  const total = config.w.config.series.reduce((sum, val) => sum + val, 0);
  const percentage = ((value / total) * 100).toFixed(1);

  // target the details panel:
  const detailsElement = document.querySelector("#details");
  // update the details panel:
  detailsElement.innerHTML = `
        <h2>${fruit}</h2>
        <p><strong>Value:</strong> ${value}</p>
        <p><strong>Percentage:</strong> ${percentage}%</p>
    `;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

// code that actually creates the chart:
const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
