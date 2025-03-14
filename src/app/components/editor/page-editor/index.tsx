"use client";

import { getPageDetails } from "@/lib/actions/page";
import { useEditor } from "@/app/providers/editor-provider";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
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

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 absolute z-[101] top-0 w-screen h-screen items-center justify-center">
        <h1 className="text-2xl text-center">
          Whoops! The Framely page editor is only available on larger devices.
        </h1>
        <Button asChild variant="default">
          <Link href={getLink({})}>Dashboard</Link>
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
    <div
      className={clsx(
        "use-animation-zoom-in h-full overflow-scroll bg-muted transition-all rounded-none py-12 px-20 w-full flex justify-center relative max-h-[calc(100vh-65px)]",
        {
          "!p-0 !m-0 min-w-screen min-h-screen":
            state.editor.previewMode === true || state.editor.liveMode === true,
        },
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button variant="ghost" size="icon" onClick={handleUnPreview}>
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
}

export default PageEditor;
