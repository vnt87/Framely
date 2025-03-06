import { SquareDashed } from "lucide-react";
import React from "react";

function ContainerPlaceholder() {
  return (
    <div
      className="flex items-center justify-center rounded-sm cursor-pointer h-6 w-6 bg-muted"
    >
      <SquareDashed size={15} className="text-muted-foreground" />
    </div>
  );
}

export default ContainerPlaceholder;
