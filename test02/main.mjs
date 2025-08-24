import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

async function generateChart() {
  // Load the CSV data using fetch
  const response = await fetch("./alphabet.csv");
  const csvText = await response.text();
  const alphabet = d3.csvParse(csvText, d3.autoType);

  // creates a plot
  const plot = Plot.plot({
    x: {
      axis: "top",
      grid: true,
      percent: true,
    },
    marks: [
      Plot.ruleX([0]),
      Plot.barX(alphabet, {
        x: "frequency",
        y: "letter",
        sort: { y: "x", reverse: true },
      }),
    ],
  });

  document.getElementById("chart").innerHTML = plot.outerHTML;
}

generateChart();
