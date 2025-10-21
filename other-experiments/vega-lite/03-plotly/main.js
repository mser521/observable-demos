var myPlot = document.getElementById("myDiv"),
  d3 = Plotly.d3,
  N = 16,
  x = d3.range(N),
  y = d3.range(N).map(d3.random.normal()),
  data = [
    { x: x, y: y, type: "scatter", mode: "markers", marker: { size: 16 } },
  ],
  layout = {
    hovermode: "closest",
    title: "Click on Points",
  };

Plotly.newPlot("myDiv", data, layout, { showSendToCloud: true });

myPlot.on("plotly_click", function (eventData) {
  console.log("Event data:", eventData);

  // The DOM element that was clicked (the plot container)
  console.log("Clicked element:", myPlot);

  // Information about the clicked points
  if (eventData.points && eventData.points.length > 0) {
    var clickedPoint = eventData.points[0]; // First clicked point
    console.log("Clicked point coordinates:", {
      x: clickedPoint.x,
      y: clickedPoint.y,
      pointIndex: clickedPoint.pointIndex,
      curveNumber: clickedPoint.curveNumber,
    });

    // You can also get the full data for the clicked point
    console.log("Full point data:", clickedPoint);

    // Show an alert with the point info
    alert(
      `Clicked point:\nX: ${clickedPoint.x}\nY: ${clickedPoint.y.toPrecision(
        4
      )}`
    );
  }
});
