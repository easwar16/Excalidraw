import { create } from "zustand";
import { Shape } from "../lib/utils";
import { ToolType } from "@/types/shape/shape";

type EditorState = {
  // domain
  shapes: Shape[];
  roomId: number | null;

  // interaction
  currentTool: ToolType;
  selectedShapeId: string | null;

  // actions
  setRoomId: (id: number) => void;
  setShapes: (shapes: Shape[]) => void;
  setTool: (tool: ToolType) => void;

  addShape: (shape: Shape) => void;
  setSelectedShape: (id: string | null) => void;
  updateShape: (id: string, updater: (shape: Shape) => Shape) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  // domain
  shapes: [],
  roomId: null,

  // interaction
  currentTool: "select",
  selectedShapeId: null,

  // actions
  setRoomId: (id) => set({ roomId: id }),

  setShapes: (shapes) => set({ shapes }),

  setTool: (tool) => set({ currentTool: tool }),

  addShape: (shape) =>
    set((state) => ({
      shapes: [...state.shapes, shape],
    })),

  setSelectedShape: (id) => set({ selectedShapeId: id }),

  updateShape: (id, updater) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id ? updater(shape) : shape
      ),
    })),
}));
