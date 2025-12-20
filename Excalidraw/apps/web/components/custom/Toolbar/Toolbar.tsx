"use client";

import { useEditorStore } from "@/store/editor";
import { PiCursorFill } from "react-icons/pi";
import { FaRegSquare } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { LuDiamond } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Toolbar() {
  const currentTool = useEditorStore((s) => s.currentTool);
  const setTool = useEditorStore((s) => s.setTool);

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2
    flex gap-2 items-center
    bg-white/90 backdrop-blur-md
    rounded-xl px-3 py-2
    shadow-lg shadow-black/10
    ring-1 ring-black/5
    z-50"
    >
      <ToolButton
        label="Select"
        active={currentTool === "select"}
        onClick={() => setTool("select")}
      >
        <PiCursorFill />
      </ToolButton>
      <ToolButton
        label="Rectangle"
        active={currentTool === "rect"}
        onClick={() => setTool("rect")}
      >
        <FaRegSquare />
      </ToolButton>
      <ToolButton
        label="pencil"
        active={currentTool === "pencil"}
        onClick={() => setTool("pencil")}
      >
        <GoPencil />
      </ToolButton>
      <ToolButton
        label="line"
        active={currentTool === "line"}
        onClick={() => setTool("line")}
      >
        <MdOutlineHorizontalRule />
      </ToolButton>
      <ToolButton
        label="arrow"
        active={currentTool === "arrow"}
        onClick={() => setTool("arrow")}
      >
        <FaArrowRightLong />
      </ToolButton>
      <ToolButton
        label="diamond"
        active={currentTool === "diamond"}
        onClick={() => setTool("diamond")}
      >
        <LuDiamond />
      </ToolButton>
    </div>
  );
}

function ToolButton({
  label,
  children,
  active,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-2 rounded ${
        active ? "bg-[#b8f0d9] text-black" : "bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
