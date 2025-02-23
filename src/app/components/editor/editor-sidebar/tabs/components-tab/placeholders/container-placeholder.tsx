import { ElementTypes } from "@/lib/constants";
import { SquareDashed } from "lucide-react";
import React from "react";

function ContainerPlaceholder() {
  const handleDragStart = (e: React.DragEvent, type: ElementTypes) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "container")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <SquareDashed size={40} className="text-muted-foreground" />
    </div>
  );
}

export default ContainerPlaceholder;
