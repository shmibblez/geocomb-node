/* eslint-disable no-undef */
/* eslint-disable no-console */
const geocomb = require("geocomb-node");
// import { HashProperties, Icosahedron, Point3 } from "../lib/index.js";
const Icosahedron = geocomb.Icosahedron;

const ico = new Icosahedron("ECEF", "gnomonic");

const lat = 71;
const lon = 27;
const point = ico.pointFromCoords(lat, lon);
const res = 777;
const props = ico.hash(point, res);
const parsedPoint = ico.parseHash(props);

console.log(
  `hash properties for coords lat: ${lat}, lon: ${lon}, res: ${res}: ` +
    JSON.stringify(props, null, 2)
);

console.log(
  "parsed point for hash properties: " + JSON.stringify(parsedPoint, null, 2)
);
