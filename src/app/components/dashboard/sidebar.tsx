"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Github,
  Globe,
  LayoutDashboard,
  LogOut,
  MoveUpRight,
  Settings,
} from "lucide-react";

const items = [
  { title: "Overview", url: "#", icon: LayoutDashboard },
  { title: "Pages", url: "#", icon: Globe },
  { title: "Settings", url: "#", icon: Settings },
];

const externalLinks = [
  {
    title: "Star on Github",
    href: "https://github.com/belastrittmatter/framely",
    icon: Github,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="px-2 justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {externalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full justify-between"
                    >
                      <div className="flex space-x-3 items-center">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <MoveUpRight />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4">
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <ClerkLoading>
              <div className="flex items-center gap-2 p-2">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </ClerkLoading>
            <SignedIn>
              <div className="flex items-center w-full justify-between">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonBox:
                        "flex-row-reverse hover:bg-muted rounded-lg p-2",
                    },
                  }}
                  showName
                />
                <SignOutButton>
                  <Button variant={"ghost"} className="px-2 py-6">
                    <LogOut />
                  </Button>
                </SignOutButton>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full">Sign in</Button>
              </SignInButton>
            </SignedOut>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
