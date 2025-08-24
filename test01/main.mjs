import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { JSDOM } from "jsdom";

// Get the directory where this script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// reads the file: penguins.csv
const penguins = d3.csvParse(
  await readFile(join(__dirname, "penguins.csv"), "utf-8"),
  d3.autoType
);

// creates a plot
const plot = Plot.plot({
  document: new JSDOM("").window.document,
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
      r: 4,
    }),
  ],
});

// Create a complete HTML document
const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Penguin Data Visualization</title>
      <link rel="stylesheet" href="styles.css">
  </head>
  <body>
      <div class="container">
          <h1>Penguin Culmen Measurements</h1>
          <div class="plot-container">
              <div id="penguin-chart" class="chart-wrapper">
                  ${plot.outerHTML}
              </div>
          </div>
      </div>
  </body>
  </html>
`;

// Write the HTML file
await writeFile(join(__dirname, "index.html"), htmlContent);
