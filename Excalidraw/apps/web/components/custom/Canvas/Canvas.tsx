"use client";
import { useRef } from "react";

export default function CanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div>
      <canvas ref={canvasRef} width={1080} height={1080} />
    </div>
  );
}
