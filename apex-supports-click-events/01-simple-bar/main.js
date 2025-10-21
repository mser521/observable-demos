// chart options:
const options = {
  chart: {
    type: "bar",
    events: {
      dataPointSelection: getDetails,
    },
  },
  series: [{ name: "Count", data: [4, 7, 3, 5] }],
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
};

// function that gets the details of the clicked point:
function getDetails(event, chartContext, config) {
  // I know this is convoluted, but we're constrained by the Library:
  const dataValue = config.w.config.series[0].data[config.dataPointIndex];
  const category = config.w.config.xaxis.categories[config.dataPointIndex];

  // target the details panel:
  const detailsElement = document.querySelector("#details");
  // update the details panel:
  detailsElement.innerHTML = `
        <h2>Details for ${category}</h2>
        <p>Category: ${category}</p>
        <p>Value: ${dataValue}</p>
    `;
}

// code that actually creates the chart:
const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
