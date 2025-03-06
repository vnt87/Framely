import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ElementTypes } from "@/lib/constants";
import React from "react";
import TextPlaceholder from "./placeholders/text-placeholder";
import ContainerPlaceholder from "./placeholders/container-placeholder";
import TwoColPlaceholder from "./placeholders/two-col-placeholder";
import ThreeColPlaceholder from "./placeholders/three-col-placeholder";

function ComponentsTab() {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: ElementTypes;
    group: "layout" | "element";
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "element",
    },
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      Component: <TwoColPlaceholder />,
      label: "2 Columns",
      id: "2Col",
      group: "layout",
    },
    {
      Component: <ThreeColPlaceholder />,
      label: "3 Columns",
      id: "3Col",
      group: "layout",
    },
  ];

  const handleDragStart = (e: React.DragEvent, type: ElementTypes) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

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
              <div
                key={element.id}
                className="flex items-center gap-2 mb-2 bg-sidebar-accent p-2 rounded-md cursor-pointer"
                draggable
                onDragStart={(e) => {handleDragStart(e, element.id)}}
              >
                {element.Component}
                <span className="text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-2 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent>
          {elements
            .filter((element) => element.group === "element")
            .map((element) => (
              <div
                key={element.id}
                className="flex items-center gap-2 mb-2 bg-sidebar-accent p-2 rounded-md cursor-pointer"
                draggable
                onDragStart={(e) => {handleDragStart(e, element.id)}}
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ComponentsTab;
