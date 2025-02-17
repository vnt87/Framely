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
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import {
  ArrowBigUpDash,
  Github,
  Globe,
  LayoutDashboard,
  LogOut,
  MoveUpRight,
  Settings,
} from "lucide-react";

const items = [
  { title: "Overview", url: "#", icon: LayoutDashboard },
  { title: "Sites", url: "#", icon: Globe },
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
