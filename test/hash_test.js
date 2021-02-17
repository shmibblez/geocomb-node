const geocomb = require("../lib/index.js");
// import { HashProperties, Icosahedron, Point3 } from "../lib/index.js";

const ico = new Icosahedron("ECEF", "gnomonic");

const lat = 71;
const lon = 27;
const point = ico.pointFromCoords(lat, lon);
const res = 77;
const props = ico.hash(point, res);

console.log(
  `hash properties for coords lat: ${lat}, lon: ${lon}: ` +
    JSON.stringify(props, null, 2)
);
