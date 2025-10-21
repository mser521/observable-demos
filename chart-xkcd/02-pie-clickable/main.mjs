// import chartXkcd from 'chart.xkcd';
// import chartXkcd from '../../dist/chart.xkcd';

// Custom color palette for the pie chart
const colors = [
  "#FF6B6B", // Coral red (Apple)
  "#FFB366", // Soft orange (Mango)
  "#45B7D1", // Sky blue (Orange)
  "#96CEB4", // Mint green (Watermelon)
  "#FFEAA7", // Soft yellow (Banana)
];

const svgPie = document.querySelector(".pie-chart");
const pieChart = new chartXkcd.Pie(svgPie, {
  title: "Favorites Fruits",
  data: {
    labels: ["Apple", "Mango", "Blueberries", "Kiwi", "Banana"],
    datasets: [
      {
        data: [500, 200, 80, 90, 100],
      },
    ],
  },
  options: {
    innerRadius: 0.6,
    legendPosition: chartXkcd.config.positionType.upRight,
    dataColors: colors, // Use our custom color palette
  },
});

// Add click events to pie chart
setTimeout(() => {
  const pieSlices = svgPie.querySelectorAll("path");

  pieSlices.forEach((slice, index) => {
    slice.style.cursor = "pointer";
    slice.addEventListener("click", () => {
      showDetails(index);
    });
  });
}, 100);

function showDetails(index) {
  const label = pieChart.data.labels[index];
  const color = colors[index]; // Use the separate colors array
  const value = pieChart.data.datasets[0].data[index];
  const total = pieChart.data.datasets[0].data.reduce(
    (sum, val) => sum + val,
    0
  );
  const percentage = ((value / total) * 100).toFixed(1);

  // Update details panel
  const detailsElement = document.querySelector("#pie-details");
  if (detailsElement) {
    detailsElement.style.backgroundColor = color;
    detailsElement.innerHTML = `
      <h2>${label}</h2>
      <p><strong>Value:</strong> ${value}</p>
      <p><strong>Percentage:</strong> ${percentage}%</p>
    `;
  }
}
