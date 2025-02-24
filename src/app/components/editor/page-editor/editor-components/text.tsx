"use client";

import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import React from "react";
import ElementWrapper from "./element-wrapper";

type Props = {
  element: EditorElement;
};

function TextComponent({ element }: Props) {
  const { state, dispatch } = useEditor();

  return (
    <ElementWrapper element={element}>
      <div
        style={element.styles}
        className="p-[2px] w-full relative text-[16px] transition-all overflow-auto"
      >
        <span
          contentEditable={!state.editor.liveMode}
          suppressContentEditableWarning
          onBlur={(e) => {
            const spanElement = e.target as HTMLElement;
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...element,
                  content: { innerText: spanElement.innerText },
                },
              },
            });
          }}
          className="border-none outline-none"
        >
          {!Array.isArray(element.content) && element.content.innerText}
        </span>
      </div>
    </ElementWrapper>
  );
}

export default TextComponent;
