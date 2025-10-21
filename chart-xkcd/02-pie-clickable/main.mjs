// import chartXkcd from 'chart.xkcd';
// import chartXkcd from '../../dist/chart.xkcd';

const svgPie = document.querySelector(".pie-chart");
const pieChart = new chartXkcd.Pie(svgPie, {
  title: "Favorites Fruits",
  data: {
    labels: ["Apple", "Mango", "Orange", "Watermelon", "Banana"],
    datasets: [
      {
        data: [500, 200, 80, 90, 100],
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#FBBF24",
        ],
      },
    ],
  },
  options: {
    innerRadius: 0.6,
    legendPosition: chartXkcd.config.positionType.upRight
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
  const value = pieChart.data.datasets[0].data[index];
  const total = pieChart.data.datasets[0].data.reduce(
    (sum, val) => sum + val,
    0
  );
  const percentage = ((value / total) * 100).toFixed(1);

  console.log(`Clicked: ${label} = ${value} (${percentage}%)`);

  // Update details panel if it exists
  const detailsElement = document.querySelector("#pie-details");
  detailsElement.innerHTML = `
          <h2>${label}</h2>
          <p><strong>Value:</strong> ${value}</p>
          <p><strong>Percentage:</strong> ${percentage}%</p>
        `;
}
