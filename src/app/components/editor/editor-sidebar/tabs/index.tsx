import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImageIcon,
  PlusIcon,
  SettingsIcon,
  SquareStackIcon,
} from "lucide-react";

function TabList() {
  return (
    <TabsList className="flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4">
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
        <SquareStackIcon />
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
