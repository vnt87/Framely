"use client";
import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { Badge } from "@/components/ui/badge";
import { defaultStyles, ElementTypes } from "@/lib/constants";
import { createId } from "@paralleldrive/cuid2";
import clsx from "clsx";
import Recursive from "./recursive";
import { Trash } from "lucide-react";

type Props = { element: EditorElement };

function Container({ element }: Props) {
  const { id, content, name, styles, type } = element;

  const { state, dispatch } = useEditor();
  const isSelected = state.editor.selectedElement.id === id;

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData(
      "componentType"
    ) as ElementTypes;
    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Text Element" },
              id: createId(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "text",
            },
          },
        });
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: createId(),
              name: "Container",
              styles: {
                ...defaultStyles,
              },
              type: "container",
            },
          },
        });
      default:
    }
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_SELECTED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({ type: "DELETE_ELEMENT", payload: { elementDetails: element } });
  };

  return (
    <div
      style={styles}
      className={clsx("relative p-4 transition-all group", {
        "max-w-full w-full": type === "container" || type === "2Col",
        "h-fit": type === "container",
        "h-full": type === "__body",
        "flex flex-col md:!flex-row": type === "2Col",
        "!border-blue-500":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid": isSelected && !state.editor.liveMode,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => {
        handleOnDrop(e, id);
      }}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={handleOnClickBody}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden cursor-default",
          {
            block: isSelected && !state.editor.liveMode,
          }
        )}
      >
        {name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

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

export default Container;
