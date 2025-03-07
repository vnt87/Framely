import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ElementTypes } from "@/lib/constants";
import React from "react";
import ElementPlaceholder from "./element-placeholder";
import {
  Columns2,
  Columns3,
  Container,
  LucideIcon,
  SquareDashed,
  Text,
} from "lucide-react";

function ComponentsTab() {
  const elements: {
    label: string;
    id: ElementTypes;
    group: "layout" | "element";
    icon: LucideIcon;
  }[] = [
    {
      label: "Text",
      id: "text",
      group: "element",
      icon: Text,
    },
    {
      label: "Container",
      id: "container",
      group: "layout",
      icon: SquareDashed,
    },
    {
      label: "2 Columns",
      id: "2Col",
      group: "layout",
      icon: Columns2,
    },
    {
      label: "3 Columns",
      id: "3Col",
      group: "layout",
      icon: Columns3,
    },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="px-2 py-0">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent>
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <ElementPlaceholder
                key={element.id}
                type={element.id}
                Icon={element.icon}
                title={element.label}
              />
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-2 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent>
          {elements
            .filter((element) => element.group === "element")
            .map((element) => (
              <ElementPlaceholder
                key={element.id}
                type={element.id}
                Icon={element.icon}
                title={element.label}
              />
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ComponentsTab;
