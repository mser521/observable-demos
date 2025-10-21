// take a look at the tilesets.js file to see the available tilesets:

const map = L.map("map");
map.setView([35.5362825, -82.5654144], 10);

const currentTileLayer = L.tileLayer(esriWorldTopoMap, {
  attribution: "&copy; Open Street Map contributors",
}).addTo(map);
