const bindings = require("../build/Release/geocomb.node");

console.log("creating icosahedron");
const ico = new bindings.IcosahedronWrapper();
console.log("creating point from coords");
const p = ico.pointFromCoords(71, 27);
console.log("generating hash");
console.log(JSON.stringify(ico.hash(p, 10), null, 2));
