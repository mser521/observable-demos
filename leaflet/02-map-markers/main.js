// take a look at the tilesets.js file to see the available tilesets:
const toner =
  "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png";

const map = L.map("map");
map.setView([35.5362825, -82.5654144], 14);

const currentTileLayer = L.tileLayer(toner, {
  attribution: "&copy; Open Street Map contributors",
}).addTo(map);

// Fake landmarks around Asheville, NC area
const landmarks = [
  {
    name: "Blue Ridge Parkway Visitor Center",
    lat: 35.54,
    lng: -82.56,
    category: "visitor_center",
  },
  {
    name: "Biltmore Estate",
    lat: 35.53,
    lng: -82.55,
    category: "historic_site",
  },
  {
    name: "Asheville Art Museum",
    lat: 35.545,
    lng: -82.57,
    category: "museum",
  },
  {
    name: "Grove Park Inn",
    lat: 35.535,
    lng: -82.575,
    category: "hotel",
  },
  {
    name: "Pisgah National Forest",
    lat: 35.52,
    lng: -82.54,
    category: "nature",
  },
  {
    name: "River Arts District",
    lat: 35.55,
    lng: -82.58,
    category: "arts",
  },
  {
    name: "Chimney Rock State Park",
    lat: 35.51,
    lng: -82.52,
    category: "park",
  },
  {
    name: "Asheville Brewing Company",
    lat: 35.538,
    lng: -82.565,
    category: "restaurant",
  },
  {
    name: "French Broad River Park",
    lat: 35.555,
    lng: -82.585,
    category: "park",
  },
  {
    name: "Pack Square",
    lat: 35.542,
    lng: -82.568,
    category: "downtown",
  },
];

// Create custom icons for different landmark types
const iconTypes = {
  visitor_center: { color: "#2E86AB", icon: "🏛️" }, // Deep blue
  historic_site: { color: "#A23B72", icon: "🏰" }, // Deep magenta
  museum: { color: "#F18F01", icon: "🎨" }, // Golden orange
  hotel: { color: "#C73E1D", icon: "🏨" }, // Deep red
  nature: { color: "#2D5016", icon: "🌲" }, // Forest green
  arts: { color: "#8B5A2B", icon: "🎭" }, // Warm brown
  park: { color: "#4A7C59", icon: "🌳" }, // Sage green
  restaurant: { color: "#B8860B", icon: "🍺" }, // Dark goldenrod
  downtown: { color: "#4B0082", icon: "🏢" }, // Indigo
};

// Add markers for each landmark
landmarks.forEach((landmark) => {
  const iconType = iconTypes[landmark.category];

  // Create custom icon
  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${iconType.color}"
    class="map-marker">${iconType.icon}</div>`,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  // Create marker with popup
  const marker = L.marker([landmark.lat, landmark.lng], {
    icon: customIcon,
  }).addTo(map).bindPopup(`
      <div style="text-align: center;">
        <div style="font-size:40px;">${iconType.icon}</div>
        <h3 style="margin: 0 0 5px 0;">${landmark.name}</h3>
        <p style="margin: 0; font-size: 12px; color: #666;">
          Type: ${landmark.category.replace("_", " ").toUpperCase()}
        </p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #999;">
          ${landmark.lat.toFixed(4)}, ${landmark.lng.toFixed(4)}
        </p>
      </div>
    `);
});
