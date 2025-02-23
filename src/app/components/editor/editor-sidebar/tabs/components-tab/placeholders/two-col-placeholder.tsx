import { ElementTypes } from "@/lib/constants";
import { Columns2 } from "lucide-react";
import React from "react";

function TwoColPlaceholder() {
  const handleDragStart = (e: React.DragEvent, type: ElementTypes) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "2Col")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <Columns2 size={40} className="text-muted-foreground" />
    </div>
  );
}

export default TwoColPlaceholder;
