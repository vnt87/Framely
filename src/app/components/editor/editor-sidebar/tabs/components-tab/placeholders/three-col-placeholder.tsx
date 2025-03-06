import { Columns3 } from "lucide-react";
import React from "react";

function ThreeColPlaceholder() {
  return (
    <div
      className="flex items-center justify-center rounded-sm cursor-pointer h-6 w-6 bg-muted"
    >
      <Columns3 size={15} className="text-muted-foreground" />
    </div>
  );
}

export default ThreeColPlaceholder;
