import {
    Tabulator,
    SortModule,
    ResizeColumnsModule,
} from "https://unpkg.com/tabulator-tables@6.3.1/dist/js/tabulator_esm.min.mjs";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Register the SortModule
Tabulator.registerModule([SortModule]);
Tabulator.registerModule([ResizeColumnsModule]);

async function generateChart() {
    // Load the CSV data using fetch
    const response = await fetch("penguins.csv");
    const csvText = await response.text();
    const penguins = d3.csvParse(csvText, d3.autoType);

    const table = new Tabulator("#chart", {
        data: penguins,
        height: "311px",
        layout: "fitColumns",
        movableRows: true,
        groupBy: "species",
        columns: [
            { title: "Species", field: "species" },
            { title: "Island", field: "island" },
            { title: "Culmen Length", field: "culmen_length_mm" },
            { title: "Culmen Depth", field: "culmen_depth_mm" },
            { title: "Flipper Length", field: "flipper_length_mm" },
            { title: "Body Mass", field: "body_mass_g" },
            { title: "Sex", field: "sex" },
        ],
        pagination: true,
        paginationSize: 10,
        layout: "fitColumns",
    });
}

generateChart();
