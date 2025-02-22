"use client";

import { useEditor } from "@/app/providers/editor-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import TypographySettings from "./typography-settings";

const SettingsTab = () => {
  const { state, dispatch } = useEditor();

  const handleCustomValuesChange = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = { [settingProperty]: value };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleOnChange = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleSelectChange = (value: string, property: string) => {
    const styleObject = {
      [property]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Transform", "Appearance", "Typography", "Stroke"]}
    >
      <AccordionItem value="Custom" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === "link" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https:www.framely.site/editor"
                  onChange={handleCustomValuesChange}
                  value={state.editor.selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <TypographySettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
    </Accordion>
  );
};

export default SettingsTab;
