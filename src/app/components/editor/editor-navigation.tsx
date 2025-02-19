"use client";
import { upsertPage } from "@/app/actions/page";
import { DeviceTypes, useEditor } from "@/app/providers/editor-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Page } from "@prisma/client";
import {
  ArrowUpRightFromSquare,
  ChevronLeft,
  Eye,
  Laptop,
  Loader2,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FocusEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  pageId: string;
  pageDetails: Page;
};

const EditorNavigation = ({ pageId, pageDetails }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useEditor();
  const [titleLoading, setTitleLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_PAGE_ID", payload: { pageId: pageDetails.id } });
  }, [pageDetails]);

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.value && event.target.value !== pageDetails.title) {
      setTitleLoading(true);
      const res = await upsertPage({
        title: event.target.value,
        id: pageDetails.id,
      });

      if (res.success === false) {
        toast("Error", { description: res.msg });
      } else if (res.page) {
        toast("Success", {
          description: `Name of this page changed to '${res.page.title}'`,
        });
        router.refresh();
      }
      setTitleLoading(false);
    }
  };

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    const res = await upsertPage({ ...pageDetails });
    if (!res.success) {
      toast("Error", { description: res.msg });
    } else {
      toast("Success", { description: "Your changes have been saved." });
    }
  };

  return (
    <TooltipProvider>
      <nav
        className={`border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all w-screen ${state.editor.previewMode ? "!h-0 !p-0 !overflow-hidden" : ""}`}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link href="/">
            <Button variant={"ghost"} size={"icon"}>
              <ChevronLeft />
            </Button>
          </Link>
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <Input
                defaultValue={pageDetails.title}
                className="border-none max-w-[7rem] p-0 h-5 m-0 text-lg"
                onBlur={handleOnBlurTitleChange}
              />
              <Loader2
                className={titleLoading ? "animate-spin h-4 w-4" : "hidden"}
              />
            </div>
            <a
              href={"https://" + pageDetails.subdomain + ".framely.site"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground flex items-center gap-2 w-fit group"
            >
              {pageDetails.subdomain + ".framely.site"}
              <ArrowUpRightFromSquare className="w-4 h-4 hidden group-hover:block" />
            </a>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: "CHANGE_DEVICE",
                payload: { device: value as DeviceTypes },
              });
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip>
                <TabsTrigger
                  value="Desktop"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <Laptop />
                </TabsTrigger>
              </Tooltip>

              <Tooltip>
                <TabsTrigger
                  value="Tablet"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <Tablet />
                </TabsTrigger>
              </Tooltip>

              <Tooltip>
                <TabsTrigger
                  value="Mobile"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <Smartphone />
                </TabsTrigger>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button variant={"ghost"} size={"icon"} onClick={handlePreviewClick}>
            <Eye />
          </Button>
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant="ghost"
            size="icon"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={
              !(state.history.currentIndex < state.history.history.length - 1)
            }
            onClick={handleRedo}
            variant="ghost"
            size="icon"
          >
            <Redo2 />
          </Button>
          <div className="flex flex-row items-center gap-4 mx-4">
            Draft <Switch disabled defaultChecked /> Public
          </div>
          <Button onClick={handleOnSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
};

export default EditorNavigation;
