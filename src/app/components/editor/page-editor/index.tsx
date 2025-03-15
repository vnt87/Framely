"use client";

import { getPageDetails } from "@/lib/actions/page";
import { useEditor } from "@/app/providers/editor-provider";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ArrowLeft, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import Recursive from "./editor-components/recursive";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { getLink } from "@/lib/getLink";

type Props = { pageId: string; liveMode?: boolean };

function PageEditor({ pageId, liveMode }: Props) {
  const { state, dispatch } = useEditor();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPageDetails(pageId);
      if (response.success === false) {
        toast.error("Error", { description: response.msg as string });
        return;
      }

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response.content ? JSON.parse(response?.content) : "",
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [pageId, dispatch, liveMode]);

  if (isMobile && !liveMode && !state.editor.previewMode) {
    return (
      <div className="flex flex-col gap-4 px-4 absolute z-[101] top-0 w-screen h-screen items-center justify-center">
        <h1 className="text-2xl text-center">
          Whoops! The Framely page editor is only available on larger device.
        </h1>
        <Button asChild variant="link" className="group">
          <Link href={getLink({})}>
            <ArrowLeft /> Go Back
          </Link>
        </Button>
      </div>
    );
  }
  const handleClick = () => {
    dispatch({ type: "CHANGE_SELECTED_ELEMENT", payload: {} });
  };

  const handleUnPreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  return (
    <div className="max-h-[calc(100vh-65px)] h-full overflow-y-scroll bg-muted">
      <div
        className={clsx(
          "use-animation-zoom-in h-full bg-muted transition-all rounded-none py-12 px-20 w-full flex justify-center relative",
          {
            "!p-0 !m-0 min-w-screen min-h-screen":
              state.editor.previewMode === true ||
              state.editor.liveMode === true,
          },
        )}
        onClick={handleClick}
      >
        {state.editor.previewMode && state.editor.liveMode && (
          <Button
            variant="default"
            size="icon"
            onClick={handleUnPreview}
            className={`absolute top-5 right-5 transition-opacity w-12 h-12 rounded-lg z-[500] shadow-lg flex items-center justify-center ${!state.editor.previewMode ? "opacity-0" : "opacity-100"}`}
          >
            <EyeOff />
          </Button>
        )}
        {Array.isArray(state.editor.elements) &&
          state.editor.elements.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>
    </div>
  );
}

export default PageEditor;
