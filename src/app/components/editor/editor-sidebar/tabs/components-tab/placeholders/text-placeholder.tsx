import { TypeIcon } from "lucide-react";

function TextPlaceholder() {
  return (
    <div
      className="h-6 w-6 bg-muted rounded-sm flex items-center justify-center cursor-pointer"
    >
      <TypeIcon size={15} className="text-muted-foreground" />
    </div>
  );
}

export default TextPlaceholder;
