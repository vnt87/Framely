import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImageIcon,
  Layers,
  PlusIcon,
  SettingsIcon,
  SquareStackIcon,
} from "lucide-react";

function TabList() {
  return (
    <TabsList className="flex flex-col items-center w-full gap-4 bg-transparent justify-evenly h-fit">
      <TabsTrigger
        value="settings"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="components"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <PlusIcon />
      </TabsTrigger>
      <TabsTrigger
        value="layers"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <Layers />
      </TabsTrigger>
      {/* TODO: Add media tab */}
      <TabsTrigger
        value="media"
        disabled
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <ImageIcon />
      </TabsTrigger>
    </TabsList>
  );
}

export default TabList;
