// chart options:
const options = {
  chart: {
    type: "bar",
    // stacked: true, // TODO: try this
    animations: {
      enabled: false,
    },
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
  colors: [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Green
    "#F59E0B", // Amber
    "#8B5CF6", // Purple
    "#EC4899", // Pink
  ],
  fill: {
    type: "solid",
    opacity: 0.8,
  },
  series: [
    {
      name: "Product A",
      data: [
        {
          x: "Jan",
          y: 4,
          image: "https://picsum.photos/300/300?random=1",
        },
        {
          x: "Feb",
          y: 7,
          image: "https://picsum.photos/300/300?random=2",
        },
        {
          x: "Mar",
          y: 3,
          image: "https://picsum.photos/300/300?random=3",
        },
        {
          x: "Apr",
          y: 5,
          image: "https://picsum.photos/300/300?random=4",
        },
      ],
    },
    {
      name: "Product B",
      data: [
        {
          x: "Jan",
          y: 2,
          image: "https://picsum.photos/300/300?random=5",
        },
        {
          x: "Feb",
          y: 3,
          image: "https://picsum.photos/300/300?random=6",
        },
        {
          x: "Mar",
          y: 4,
          image: "https://picsum.photos/300/300?random=7",
        },
        {
          x: "Apr",
          y: 2,
          image: "https://picsum.photos/300/300?random=8",
        },
      ],
    },
    {
      name: "Product C",
      data: [
        {
          x: "Jan",
          y: 1,
          image: "https://picsum.photos/300/300?random=9",
        },
        {
          x: "Feb",
          y: 2,
          image: "https://picsum.photos/300/300?random=10",
        },
        {
          x: "Mar",
          y: 1,
          image: "https://picsum.photos/300/300?random=11",
        },
        {
          x: "Apr",
          y: 3,
          image: "https://picsum.photos/300/300?random=12",
        },
      ],
    },
  ],
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
};

// function that gets the details of the clicked point:
function getDetails(event, chartContext, config) {
  // I know this is convoluted, but we're constrained by the Library:
  const dataPoint =
    config.w.config.series[config.seriesIndex].data[config.dataPointIndex];
  const dataValue = dataPoint.y;
  const seriesName = config.w.config.series[config.seriesIndex].name;
  const category = dataPoint.x;
  const imageUrl = dataPoint.image;

  // target the details panel:
  const detailsElement = document.querySelector("#details");
  // update the details panel:
  detailsElement.innerHTML = `
        <h2>Details for ${category}</h2>
        <p>Category: ${category}</p>
        <p>Series: ${seriesName}</p>
        <p>Value: ${dataValue}</p>
        <img src="${imageUrl}" alt="${seriesName} icon">
    `;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

// code that actually creates the chart:
const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
