// const bindings = require("build/Release/geocomb.node");
const bindings = require("bindings")("geocomb");

// console.log("creating icosahedron");
// const ico = new bindings.IcosahedronWrapper();
// console.log("creating point from coords");
// const p = ico.pointFromCoords(71, 27);
// console.log("generating hash");
// console.log(JSON.stringify(ico.hash(p, 10), null, 2));

/**
 * map orientation, changes how hexagons are placed
 * - ECEF (default): standard way of doing stuff, still pretty good
 * - dymaxion: good for icosahedron, there are no vertices on land, which means no pentagons
 * - NOTE: only ECEF is supported for hash generation
 */
export type MapOrientation = "dymaxion" | "ECEF";
/**
 * rotation method, changes how point coordinates are generated
 * - gnomonic (default): phex areas are smaller towards vertices, but phexes are more symmetrical
 * - quaternion: phex areas are more uniform, but phexes get distorted a bit more
 * - NOTE: only gnomonic is supported for hash generation
 */
export type RotationMethod = "gnomonic" | "quaternion";
// /**
//  * hash type, modifies returned hash properties
//  * - rowCol (defualt): returns point row, col, and res
//  * - number: returns point number for res, and res
//  * - NOTE: only rowCol is supported
//  */
// export type HashType = "rowCol" | "number";
/**
 * hash properties, stores point row & col for res on geocomb grid
 */
export class HashProperties {
  res!: number;
  row!: number;
  col!: number;
  rm!: RotationMethod;
  mo!: MapOrientation;
}

/**
 * Icosahedron class, used for hash generation
 */
export class Icosahedron {
  ico; // IcosahedronWrapper instance
  mo: MapOrientation;
  rm: RotationMethod;

  /**
   * Icosahedron constructor
   * @param mapOrientation Icosahedron orientation on globe map
   * @param rotationMethod technique to use to rotate points
   */
  constructor(
    mapOrientation: MapOrientation = "ECEF",
    rotationMethod: RotationMethod = "gnomonic"
  ) {
    this.mo = mapOrientation;
    this.rm = rotationMethod;
    this.ico = new bindings.Icosahedron(mapOrientation, rotationMethod);
  }

  /**
   * generates point on globe, for use with Icosahedron#hash()
   * @param lat point latitude
   * @param lon point longitude
   * @retunrs Point3
   */
  pointFromCoords(lat: number, lon: number): Point3 {
    return this.ico.pointFromCoords(lat, lon);
  }
  /**
   * generates hash for point
   * @param point point to hash
   * @param res geocomb grid resolution
   * @returns HashProperties for point on geocomb grid
   */
  hash(point: Point3, res: number): HashProperties {
    return this.ico.hash(point, res);
  }
}

/**
 * Point class, used for storing locations
 */
export class Point3 {
  x: number;
  y: number;
  z: number;
  triNum: number;
  isPC: boolean;

  /**
   * Point3 constructor
   * @param x point's x coordinate
   * @param y point's y coordinate
   * @param z point's z coordinate
   */
  constructor(x: number, y: number, z: number, triNum = -1, isPC = false) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.triNum = triNum;
    this.isPC = isPC;
  }
}

/**
 * GPoint3 class, generated by Icosahedron, additionally stores row and col on geocomb grid for res
 */
export class GPoint3 extends Point3 {
  row!: number;
  col!: number;
  res!: number;
}
