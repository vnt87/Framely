"use client";
import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { Badge } from "@/components/ui/badge";
import { defaultStyles, ElementTypes } from "@/lib/constants";
import { createId } from "@paralleldrive/cuid2";
import clsx from "clsx";
import Recursive from "./recursive";
import { Trash } from "lucide-react";
import { useState } from "react";

type Props = { element: EditorElement };

function Container({ element }: Props) {
  const { id, content, name, styles, type } = element;
  const { state, dispatch } = useEditor();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const isSelected = state.editor.selectedElement.id === id;

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDraggingOver(false);
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
        break;
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
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: createId(),
              name: "Two Columns",
              styles: {
                ...defaultStyles,
                display: "flex",
              },
              type: "2Col",
            },
          },
        });
        break;
      case "3Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: createId(),
              name: "Three Columns",
              styles: {
                ...defaultStyles,
                display: "flex",
              },
              type: "3Col",
            },
          },
        });
        break;
      default:
    }
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
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
      className={clsx("relative group my-1", {
        "max-w-full w-full":
          (type === "container" || type === "2Col") && !styles?.width,
        "h-fit": type === "container" && !styles?.height,
        "h-full overflow-scroll": type === "__body",
        "!h-screen !m-0 !rounded-none":
          type === "__body" && state.editor.liveMode,
        "flex flex-col md:!flex-row": type === "2Col",
        "!outline-blue-500 !outline-2":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body" &&
          !isDraggingOver,
        "!outline-yellow-400 !outline-4":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!outline-yellow-400 !outline-solid !outline-2": isDraggingOver,
        "!outline-4": isDraggingOver && type === "__body",
        "!outline-solid": isSelected && !state.editor.liveMode,
        "outline-dashed outline-[1px] outline-slate-300":
          !state.editor.liveMode,
      })}
      style={{ width: styles?.width, height: styles?.height }}
      onDrop={(e) => {
        handleOnDrop(e);
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
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

      <div
        style={{ ...styles, width: undefined, height: undefined }}
        className="p-4 h-full w-full"
      >
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>

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
