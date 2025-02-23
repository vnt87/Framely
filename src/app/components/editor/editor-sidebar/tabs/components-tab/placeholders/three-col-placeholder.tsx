import { ElementTypes } from "@/lib/constants";
import { Columns3 } from "lucide-react";
import React from "react";

function ThreeColPlaceholder() {
  const handleDragStart = (e: React.DragEvent, type: ElementTypes) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "3Col")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <Columns3 size={40} className="text-muted-foreground" />
    </div>
  );
}

export default ThreeColPlaceholder;
