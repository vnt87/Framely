"use client";
import { upsertPage } from "@/lib/actions/page";
import { DeviceTypes, useEditor } from "@/app/providers/editor-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  pageDetails: Page;
};

const EditorNavigation = ({ pageDetails }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useEditor();
  const [titleLoading, setTitleLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_PAGE_ID", payload: { pageId: pageDetails.id } });
  }, [pageDetails, dispatch]);

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
    dispatch({ type: "TOGGLE_LIVE_MODE", payload: { value: true } });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    setIsSaving(true);
    const res = await upsertPage({
      id: pageDetails.id,
      content: JSON.stringify(state.editor.elements),
    });
    if (!res.success) {
      toast("Error", { description: res.msg });
    } else {
      toast("Success", { description: "Your changes have been saved." });
    }
    setIsSaving(false);
  };

  return (
    <nav
      className={`border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all w-screen ${state.editor.previewMode ? "!h-0 !p-0 !overflow-hidden" : ""}`}
    >
      <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
        <Link href={`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}>
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
              type="text"
            ></Input>
            <Loader2
              className={titleLoading ? "animate-spin h-4 w-4" : "hidden"}
            />
          </div>
          <Link
            href={`https://editor.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${pageDetails.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground w-fit group"
          >
            {pageDetails.subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            <ArrowUpRightFromSquare className="hidden w-4 h-4 group-hover:block" />
          </Link>
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
            <TabsTrigger
              value="Desktop"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Laptop />
            </TabsTrigger>

            <TabsTrigger
              value="Tablet"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Tablet />
            </TabsTrigger>

            <TabsTrigger
              value="Mobile"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Smartphone />
            </TabsTrigger>
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
        <Button onClick={handleOnSave} disabled={isSaving} className="w-[67px]">
          {isSaving ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </aside>
    </nav>
  );
};

export default EditorNavigation;
