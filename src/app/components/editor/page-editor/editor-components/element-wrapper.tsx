import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { Badge } from "@/components/ui/badge";
import { defaultStyles } from "@/lib/constants";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
  children: React.ReactNode;
};

function ElementWrapper({ element, children }: Props) {
  const { state, dispatch } = useEditor();
  const isSelected = state.editor.selectedElement.id === element.id;

  const handleDeleteElement = () => {
    dispatch({ type: "DELETE_ELEMENT", payload: { elementDetails: element } });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_SELECTED_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      style={{
        width: element.styles.width || "auto",
        height: element.styles.height || "auto",
      }}
      className={clsx("relative p-0", {
        "!border-blue-500 !border-2":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid": isSelected && !state.editor.liveMode,
        "border-solid border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
    >
      {isSelected && !state.editor.liveMode && (
        <Badge
          className={clsx(
            "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg"
          )}
          style={defaultStyles}
        >
          {element.name}
        </Badge>
      )}

      <div className="overflow-hidden">{children}</div>

      {isSelected &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
}

export default ElementWrapper;
