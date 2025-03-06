import { Columns2 } from "lucide-react";
import React from "react";

function TwoColPlaceholder() {
  return (
    <div
      className="flex items-center justify-center rounded-sm cursor-pointer h-6 w-6 bg-muted"
    >
      <Columns2 size={15} className="text-muted-foreground" />
    </div>
  );
}

export default TwoColPlaceholder;
