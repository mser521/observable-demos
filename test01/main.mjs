import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

async function generateChart() {
  // Load the CSV data using fetch
  const response = await fetch("./penguins.csv");
  const csvText = await response.text();
  const penguins = d3.csvParse(csvText, d3.autoType);

  // creates a plot
  const plot = Plot.plot({
    grid: true,
    inset: 10,
    height: 500, // height of the plot in pixels
    color: {
      legend: true,
      legendWidth: 100,
      legendHeight: 100,
    },
    marks: [
      Plot.frame(),
      Plot.dot(penguins, {
        x: "culmen_length_mm",
        y: "culmen_depth_mm",
        stroke: "species",
        r: 8,
      }),
    ],
  });

  document.getElementById("chart").innerHTML = plot.outerHTML;
}

generateChart();
