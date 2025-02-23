"use client";

import { useEditor } from "@/app/providers/editor-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs } from "@/components/ui/tabs";
import clsx from "clsx";
import TabList from "./tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import SettingsTab from "./tabs/settings-tab";
import ComponentsTab from "./tabs/components-tab";

type Props = {
  userId: string;
};

const EditorSidebar = ({ userId }: Props) => {
  const { state, dispatch } = useEditor();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="settings">
        <SheetContent
          className={clsx(
            "mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
          hideX
        >
          <TabList />
        </SheetContent>
        <SheetContent
          className={clsx(
            "mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transiotion-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
          hideX
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="components">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Components</SheetTitle>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default EditorSidebar;
