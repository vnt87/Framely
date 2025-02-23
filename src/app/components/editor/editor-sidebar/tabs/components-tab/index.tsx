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
    label: String;
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

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3">
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center"
              >
                {element.Component}
                <span className="text-center text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3">
          {elements
            .filter((element) => element.group === "element")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center"
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
