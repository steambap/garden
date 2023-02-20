/**
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
import { hexSize, qMax } from "./constants";

export interface IPoint {
  x: number;
  y: number;
}

export interface IHex {
  q: number;
  r: number;
  s: number;
}

function from(q: number, r: number, s: number): IHex {
  if (q + r + s !== 0) {
    throw new Error("not a hex");
  }

  return { q, r, s };
}

function add(a: IHex, b: IHex): IHex {
  return {
    q: a.q + b.q,
    r: a.r + b.r,
    s: a.s + b.s,
  };
}

function sub(a: IHex, b: IHex): IHex {
  return {
    q: a.q - b.q,
    r: a.r - b.r,
    s: a.s - b.s,
  };
}

function distance(a: IHex, b: IHex): number {
  const hex = sub(a, b);

  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
}

function toPixel(h: IHex): IPoint {
  const x: number =
    (Math.sqrt(3.0) * h.q + (Math.sqrt(3.0) / 2.0) * h.r) * hexSize;
  const y: number = (3.0 / 2.0) * h.r * hexSize;

  return { x, y };
}

function polygonCorners(h: IHex): IPoint[] {
  const corners: IPoint[] = [];
  const center = toPixel(h);
  for (let i = 0; i < 6; i++) {
    const angle = (2.0 * Math.PI * (i + 0.5)) / 6.0;
    const x = Math.cos(angle) * hexSize + center.x;
    const y = Math.sin(angle) * hexSize + center.y;

    corners.push({ x, y });
  }

  return corners;
}

export const hexDirections = [
  from(1, 0, -1), // E
  from(1, -1, 0), // NE
  from(0, -1, 1), // NW
  from(-1, 0, 1), // W
  from(-1, 1, 0), // SW
  from(0, 1, -1), // SE
];

export const hexOrigin = from(0, 0, 0);

export const hexList = hexDirections.concat(hexOrigin);

/**
 * Get rotated hex list element
 */
function at(idx: number, rotation: number): IHex {
  if (idx === 6) {
    return hexOrigin;
  }

  const index = (idx + rotation) % 6;

  return hexDirections.at(index)!;
}

function toStr(h: IHex): string {
  return `${h.q},${h.r},${h.s}`;
}

export const hexMap: IHex[] = [];
for (let q = -qMax; q <= qMax; q++) {
  let r1 = Math.max(-qMax, -q - qMax);
  let r2 = Math.min(qMax, -q + qMax);
  for (let r = r1; r <= r2; r++) {
    hexMap.push(from(q, r, -q - r));
  }
}

export const Hex = {
  from,
  add,
  sub,
  distance,
  toPixel,
  polygonCorners,
  at,
  toStr,
};
