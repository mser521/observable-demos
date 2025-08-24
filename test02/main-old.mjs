import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { JSDOM } from "jsdom";

// Get the directory where this script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load alphabet dataset from CSV file
const alphabet = d3.csvParse(
  await readFile(join(__dirname, "alphabet.csv"), "utf-8"),
  d3.autoType
);

// creates a plot
const plot = Plot.plot({
  document: new JSDOM("").window.document,

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

// Create a complete HTML document
const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Alphabet Chart</title>
      <link rel="stylesheet" href="styles.css">
  </head>
  <body>
      <div class="container">
          <h1>Alphabet Chart Sup!</h1>
          <div class="plot-container">
              <div id="penguin-chart" class="chart-wrapper">
                  ${plot.outerHTML}
              </div>
          </div>
      </div>
  </body>
  </html>
`;

// Write the HTML file to build directory if BUILD_DIR is set, otherwise to local directory
const outputPath = process.env.BUILD_DIR
  ? join(process.env.BUILD_DIR, `${process.env.PROJECT_NAME}.html`)
  : join(__dirname, "index.html");
await writeFile(outputPath, htmlContent);
