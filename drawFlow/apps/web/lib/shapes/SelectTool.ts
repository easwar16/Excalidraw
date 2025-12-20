import { Shape, ToolController } from "../utils";
import { useEditorStore } from "@/store/editor";
import CanvasManager from "../canvas/CanvasManager";
import { Point } from "@/types/shape/shape";
import { hitTest } from "../utils/hitTest";

export class SelectTool implements ToolController {
  private dragging = false;
  private dragStart!: Point;
  private originalShape: any = null;
  private moveShape(shape: Shape, dx: number, dy: number): Shape {
    switch (shape.type) {
      case "rect":
        return {
          ...shape,
          x: shape.x + dx,
          y: shape.y + dy,
        };

      case "line":
      case "arrow":
        return {
          ...shape,
          startPoint: {
            x: shape.startPoint.x + dx,
            y: shape.startPoint.y + dy,
          },
          endPoint: {
            x: shape.endPoint.x + dx,
            y: shape.endPoint.y + dy,
          },
        };

      case "pencil":
        return {
          ...shape,
          points: shape.points.map((p) => ({
            x: p.x + dx,
            y: p.y + dy,
          })),
        };
    }
  }
  onPointerDown(e: PointerEvent) {
    const cm = CanvasManager.getInstance();
    const p = cm.toCanvasPoint(e);

    const { shapes, setSelectedShape } = useEditorStore.getState();

    for (const shape of [...shapes].reverse()) {
      if (hitTest(p, shape)) {
        setSelectedShape(shape.id);

        this.dragging = true;
        this.dragStart = p;
        this.originalShape = structuredClone(shape);
        return;
      }
    }
    console.log("I am here");

    setSelectedShape(null);
    cm.render(shapes);
  }
  onPointerMove(e: PointerEvent) {
    if (!this.dragging) return;

    const cm = CanvasManager.getInstance();
    const p = cm.toCanvasPoint(e);

    const dx = p.x - this.dragStart.x;
    const dy = p.y - this.dragStart.y;

    const { selectedShapeId, updateShape } = useEditorStore.getState();
    if (!selectedShapeId) return;

    updateShape(selectedShapeId, () =>
      this.moveShape(this.originalShape, dx, dy)
    );
  }
  onPointerUp() {
    this.dragging = false;
    this.originalShape = null;
  }
}
