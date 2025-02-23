import { ElementTypes } from "@/lib/constants";
import { TypeIcon } from "lucide-react";

function TextPlaceholder() {
  const handleDragStart = (e: React.DragEvent, type: ElementTypes) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "text")}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-pointer"
    >
      <TypeIcon size={40} className="text-muted-foreground" />
    </div>
  );
}

export default TextPlaceholder;
