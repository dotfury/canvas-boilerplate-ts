const normalize = (value: number, min: number, max: number): number => (value - min) / (max - min);

const lerp = (norm: number, min: number, max: number): number => (max - min) * norm + min;

const map = (value: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number => {
  return lerp(normalize(value, sourceMin, sourceMax), destMin, destMax);
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));

const particleDistance = (particleA: { x: number; y: number }, particleB: { x: number; y: number }): number => {
  const dx = particleA.x - particleB.x;
  const dy = particleA.y - particleB.y;

  return Math.sqrt(dx * dx + dy * dy);
};

const distanceXY = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x1 - x2;
  const dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);
};

const circleCollision = (circleA: Circle, circleB: Circle): boolean =>
  particleDistance(circleA, circleB) <= circleA.radius + circleB.radius;

const circlePointCollision = (x: number, y: number, circle: Circle): boolean =>
  distanceXY(x, y, circle.x, circle.y) < circle.radius;

const pointInRectangle = (x: number, y: number, rectangle: Rectangle): boolean =>
  inRange(x, rectangle.x, rectangle.x + rectangle.width) && inRange(y, rectangle.y, rectangle.y + rectangle.height);

const inRange = (value: number, min: number, max: number): boolean =>
  value >= Math.min(min, max) && value <= Math.max(min, max);

const rangeIntersect = (minA: number, maxA: number, minB: number, maxB: number): boolean =>
  Math.max(minA, maxA) >= Math.min(minB, maxB) && Math.min(minA, maxA) <= Math.max(minB, maxB);

const rectanlgeIntersect = (rectanlgeA: Rectangle, rectangleB: Rectangle): boolean =>
  rangeIntersect(rectanlgeA.x, rectanlgeA.x + rectanlgeA.width, rectangleB.x, rectangleB.x + rectangleB.width) &&
  rangeIntersect(rectanlgeA.y, rectanlgeA.y + rectanlgeA.height, rectangleB.y, rectangleB.y + rectangleB.height);

const randomRange = (min: number, max: number): number => min + Math.random() * (max - min);

const randomInt = (min: number, max: number): number => Math.floor(min + Math.random() * (max - min + 1));

const degreesToRadians = (degrees: number): number => (degrees / 180) * Math.PI;

const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

const roundToPlaces = (value: number, places: number): number => {
  const multiple = Math.pow(10, places);

  return Math.round(value * multiple) / multiple;
};

const roundNearest = (value: number, nearest: number): number => Math.round(value / nearest) * nearest;

const getParticleAngle = (particle: { x: number; y: number }): number => Math.atan2(particle.y, particle.x);

const getMagnitude = (x: number, y: number): number => Math.sqrt(x * x + y * y);

const randomDistribution = (min: number, max: number, iterations: number) => {
  let total = 0;

  for (let i = 0; i < iterations; i++) {
    total += randomRange(min, max);
  }

  return total / iterations;
};

const quadraticBezier = (
  point0: Point,
  point1: Point,
  point2: Point,
  t: number,
  pointFinal: Point = { x: 0, y: 0 }
) => {
  pointFinal.x = Math.pow(1 - t, 2) * point0.x + (1 - t) * 2 * t * point1.x + t * t * point2.x;
  pointFinal.y = Math.pow(1 - t, 2) * point0.y + (1 - t) * 2 * t * point1.y + t * t * point2.y;

  return pointFinal;
};

const cubicBezier = (
  point0: Point,
  point1: Point,
  point2: Point,
  point3: Point,
  t: number,
  pointFinal: Point = { x: 0, y: 0 }
) => {
  pointFinal.x =
    Math.pow(1 - t, 3) * point0.x +
    Math.pow(1 - t, 2) * 3 * t * point1.x +
    (1 - t) * 3 * t * t * point2.x +
    t * t * t * point3.x;
  pointFinal.y =
    Math.pow(1 - t, 3) * point0.y +
    Math.pow(1 - t, 2) * 3 * t * point1.y +
    (1 - t) * 3 * t * t * point2.y +
    t * t * t * point3.y;

  return pointFinal;
};

const multipleCurves = (points: Point[], context: CanvasRenderingContext2D) => {
  let point0, point1, middleX, middleY;

  context.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 2; i++) {
    point0 = points[i];
    point1 = points[i + 1];
    middleX = (point0.x + point1.x) / 2;
    middleY = (point0.y + point1.y) / 2;
    context.quadraticCurveTo(point0.x, point0.y, middleX, middleY);
  }

  point0 = points[points.length - 2];
  point1 = points[points.length - 1];
  context.quadraticCurveTo(point0.x, point0.y, point1.x, point1.y);
};

const zSort = (objectA: Object3D, objectB: Object3D) => objectB.z - objectA.z;

export default {
  normalize,
  lerp,
  map,
  clamp,
  particleDistance,
  distanceXY,
  circleCollision,
  circlePointCollision,
  pointInRectangle,
  inRange,
  rangeIntersect,
  rectanlgeIntersect,
  randomRange,
  randomInt,
  degreesToRadians,
  radiansToDegrees,
  roundToPlaces,
  roundNearest,
  getParticleAngle,
  getMagnitude,
  randomDistribution,
  quadraticBezier,
  cubicBezier,
  multipleCurves,
  zSort
};
