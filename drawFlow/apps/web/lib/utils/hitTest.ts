import { Shape } from "../utils";
import { Point } from "@/types/shape/shape";

const HIT_TOLERANCE = 6; // pixels

export function hitTest(point: Point, shape: Shape): boolean {
  switch (shape.type) {
    case "rect":
      return hitRect(point, shape);

    case "line":
    case "arrow":
      return hitLine(point, shape.startPoint, shape.endPoint);

    case "pencil":
      return hitPencil(point, shape.points);
    default:
      return false;
  }
}
function hitRect(p: Point, r: { x: number; y: number; w: number; h: number }) {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}
function hitPencil(p: Point, points: Point[]): boolean {
  for (let i = 0; i < points.length - 1; i++) {
    if (hitLine(p, points[i]!, points[i + 1]!)) {
      return true;
    }
  }
  return false;
}
function hitLine(p: Point, a: Point, b: Point): boolean {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return false;

  // projection factor
  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq;

  if (t < 0 || t > 1) return false;

  const projX = a.x + t * dx;
  const projY = a.y + t * dy;

  const distance = Math.hypot(p.x - projX, p.y - projY);

  return distance <= HIT_TOLERANCE;
}
