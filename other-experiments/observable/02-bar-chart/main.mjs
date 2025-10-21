import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.17/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

async function generateChart() {
    // Get the root directory by going up from current file location
    const response = await fetch("alphabet.csv");
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
