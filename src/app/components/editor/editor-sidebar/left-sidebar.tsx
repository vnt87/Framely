"use client";

import { useEditor } from "@/app/providers/editor-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import ComponentsTab from "./tabs/components-tab";
import {
  Layers,
  PlusIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import TabList from "./tabs/index";
import { useState } from "react";
import LayersTab from "./tabs/layers-tab";

const LeftSidebar = () => {
  const { state } = useEditor();
  const [open, setOpen] = useState(true);

  if (state.editor.previewMode) return null;

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar side="left" className="mt-[65px] w-[300px] ">
        <SidebarContent>
          <Tabs defaultValue="components" className="flex w-full">
            <SidebarGroup className="flex-shrink-0 w-16">
              <TabList
                tabs={[
                  {
                    value: "components",
                    icon: <PlusIcon className="w-4 h-4" />,
                  },
                  {
                    value: "layers",
                    icon: <Layers className="w-4 h-4" />,
                  },
                ]}
              />
            </SidebarGroup>
            <SidebarSeparator className="w-[1px] h-screen" />
            <SidebarGroup
              className={`w-full transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <TabsContent value="components">
                <SidebarGroupLabel>Components</SidebarGroupLabel>
                <SidebarGroupAction>
                  <SidebarCloseIcon
                    className="text-muted-foreground"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  />
                </SidebarGroupAction>
                {/* max height is (screen height - navbar and sidebar header height) */}
                <SidebarGroupContent className="p-0 max-h-[calc(100vh-95px)] overflow-y-auto">
                  <ComponentsTab />
                </SidebarGroupContent>
              </TabsContent>
              <TabsContent value="layers">
                <SidebarGroupLabel>Layers</SidebarGroupLabel>
                <SidebarGroupContent className="p-0 max-h-[calc(100vh-95px)] overflow-y-auto">
                  <LayersTab />
                </SidebarGroupContent>
              </TabsContent>
            </SidebarGroup>
            {!open && (
              <SidebarGroupAction>
                <SidebarOpenIcon
                  className="text-muted-foreground"
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              </SidebarGroupAction>
            )}
          </Tabs>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default LeftSidebar;
