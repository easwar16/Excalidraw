import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Shape =
  | { id: string; type: "rect"; x: number; y: number; w: number; h: number }
  | { id: string; type: "pencil"; points: { x: number; y: number }[] }
  | {
      id: string;
      type: "line";
      startPoint: { x: number; y: number };
      endPoint: { x: number; y: number };
    }
  | {
      id: string;
      type: "arrow";
      startPoint: { x: number; y: number };
      endPoint: { x: number; y: number };
    };

export interface ToolController {
  onPointerDown(e: PointerEvent): void;
  onPointerMove(e: PointerEvent): void;
  onPointerUp(e: PointerEvent): void;
}

type RectanglePayload = {
  roomId: number;
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  fill: string;
};
