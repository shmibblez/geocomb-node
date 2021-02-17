// eslint-disable-next-line no-undef
const geocomb = require("../lib/index.js");
// import { HashProperties, Icosahedron, Point3 } from "../lib/index.js";
const Icosahedron = geocomb.Icosahedron;

const ico = new Icosahedron("ECEF", "gnomonic");

const lat = 71;
const lon = 27;
const point = ico.pointFromCoords(lat, lon);
const res = 77;
const props = ico.hash(point, res);

// eslint-disable-next-line no-console, no-undef
console.log(
  `hash properties for coords lat: ${lat}, lon: ${lon}: ` +
    JSON.stringify(props, null, 2)
);
