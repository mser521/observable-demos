// Stadia tilesets
const stadia = "https://tiles.stadiamaps.com/tiles/";
const toner = stadia + "stamen_toner/{z}/{x}/{y}{r}.png";
const terrain = stadia + "stamen_terrain/{z}/{x}/{y}{r}.png";
const watercolor = stadia + "stamen_watercolor/{z}/{x}/{y}.jpg";
const outdoors = stadia + "outdoors/{z}/{x}/{y}{r}.png";

// OpenStreetMap tilesets
const osm = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osmHumanitarian = "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
const osmLandscape =
  "http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png";

// ESRI tilesets
const esri = "http://services.arcgisonline.com/arcgis/rest/services";
const esriDarkGrayBase =
  esri + "/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const esriLightGrayBase =
  esri + "/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const esriWorldHillshade =
  esri + "/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}";
const esriWorldOceanBase =
  esri + "/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}";
const esriDeLormeWorldBaseMap =
  esri + "/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}";
const esriWorldStreetMap =
  esri + "/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
const esriWorldNavigationCharts =
  esri + "/Specialty/World_Navigation_Charts/MapServer/tile/{z}/{y}/{x}";
const esriNationalGeographic =
  esri + "/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}";
const esriWorldImagery = esri + "/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const esriWorldPhysicalMap =
  esri + "/World_Physical_Map/MapServer/tile/{z}/{y}/{x}";
const esriWorldShadedRelief =
  esri + "/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}";
const esriWorldTerrain =
  esri + "/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}";
const esriWorldTopoMap = esri + "/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
const esriDarkGrayReference =
  esri + "/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}";

// CartoDB tilesets
const cartodb = "https://cartodb.com/basemaps/";
const cartodbPositron = cartodb + "/light_all/{z}/{x}/{y}.png";
const cartodbDarkMatter = cartodb + "/dark_all/{z}/{x}/{y}.png";
const cartodbPositronNoLabels = cartodb + "/light_nolabels/{z}/{x}/{y}.png";
const cartodbDarkMatterNoLabels = cartodb + "/dark_nolabels/{z}/{x}/{y}.png";
const cartodbPositronLabels = cartodb + "/light_only_labels/{z}/{x}/{y}.png";
const cartodbDarkMatterLabels = cartodb + "/dark_only_labels/{z}/{x}/{y}.png";
