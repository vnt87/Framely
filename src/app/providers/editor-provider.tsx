"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { ElementTypes } from "../../lib/constants";
import { EditorAction } from "./editor-actions";
import { Page } from "@prisma/client";

export type DeviceTypes = "Desktop" | "Tablet" | "Mobile";

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: ElementTypes;
  content: EditorElement[] | { href?: string; innerText?: string };
};

export type Editor = {
  pageId: string;
  liveMode: boolean;
  previewMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
  },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  pageId: "",
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT") {
    throw Error(
      "Wrong action type received to add an element to the editor state."
    );
  }

  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addElement(item.content, action),
      };
    }
    return item;
  });
};

const updateElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("Wrong action type received to update an elements state.");
  }

  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return {
        ...item,
        ...action.payload.elementDetails,
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT") {
    throw Error("Wrong action type received to delete an element.");
  }

  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteElement(item.content, action);
    }
    return true;
  });
};

const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...state.editor,
        elements: addElement(state.editor.elements, action),
      };

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ];

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;

    case "UPDATE_ELEMENT":
      const updatedElements = updateElement(state.editor.elements, action);
      const updatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: updatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ];

      const newEditorStateWithUpdate = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };

      return newEditorStateWithUpdate;

    case "DELETE_ELEMENT":
      const updatedElementsAfterDelete = deleteElement(
        state.editor.elements,
        action
      );

      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      };

      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ];

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedElementsAfterDelete.length - 1,
        },
      };

      return deletedState;

    case "CHANGE_SELECTED_ELEMENT":
      const clickedState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: "",
            content: [],
            name: "",
            styles: {},
            type: null,
          },
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor },
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      };

      return clickedState;

    case "CHANGE_DEVICE":
      const changedDeviceState = {
        ...state,
        editor: { ...state.editor, device: action.payload.device },
      };

      return changedDeviceState;

    case "TOGGLE_PREVIEW_MODE":
      const togglePreviewMode = {
        ...state,
        editor: { ...state.editor, previewMode: !state.editor.previewMode },
      };

      return togglePreviewMode;

    case "TOGGLE_LIVE_MODE":
      const toggleLiveMode = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload?.value || !state.editor.liveMode,
        },
      };

      return toggleLiveMode;

    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;

    case "LOAD_DATA":
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      };

    case "SET_PAGE_ID":
      const { pageId } = action.payload;
      const updatedEditorStateWithPageId = {
        ...state.editor,
        pageId,
      };

      const updatedHistoryWithPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithPageId },
      ];

      const pageIdState = {
        ...state,
        editor: updatedEditorStateWithPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithPageId,
          currentIndex: updatedHistoryWithPageId.length - 1,
        },
      };

      return pageIdState;

    default:
      return initialState;
  }
};

export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  pageId: string;
  pageDetails: Page | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  pageId: "",
  pageDetails: null,
});

type EditorProps = {
  children: React.ReactNode;
  pageId: string;
  pageDetails: Page;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        pageId: props.pageId,
        pageDetails: props.pageDetails,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the EditorProvider.");
  }

  return context;
};

export default EditorProvider;
