"use client";

import { useEditor } from "@/app/providers/editor-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from "@/components/ui/sidebar";
import SettingsTab from "./tabs/settings-tab";
import { useState } from "react";

const RightSidebar = () => {
  const { state } = useEditor();

  if (state.editor.previewMode) return null;

  return (
    <SidebarProvider open={state.editor.selectedElement.type !== null}>
      <Sidebar
        side="right"
        className={`mt-[65px] w-[300px] transition-transform ${
          state.editor.selectedElement.type === null ? "translate-x-full" : ""
        }`}
      >
        <SidebarContent>
          <SidebarGroup className="w-full">
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SettingsTab />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default RightSidebar;
