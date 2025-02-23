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
import AppearanceSettings from "./appearance-settings";
import { Textarea } from "@/components/ui/textarea";
import { componentsWithCustomSettings } from "@/lib/constants";

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
      defaultValue={[
        "Custom",
        "Transform",
        "Appearance",
        "Typography",
        "Stroke",
      ]}
    >
      {state.editor.selectedElement.type !== null ? (
        <>
          <AccordionItem
            value="Custom"
            className="px-6 py-0"
            hidden={
              !componentsWithCustomSettings.includes(
                state.editor.selectedElement.type
              )
            }
          >
            <AccordionTrigger className="!no-underline">
              Custom
            </AccordionTrigger>
            <AccordionContent>
              {(() => {
                if (Array.isArray(state.editor.selectedElement.content))
                  return null;

                switch (state.editor.selectedElement.type) {
                  case "link":
                    return (
                      <div className="flex flex-col gap-2">
                        <p className="text-muted-foreground">Link Path</p>
                        <Input
                          id="href"
                          placeholder="https:www.framely.site/editor"
                          onChange={handleCustomValuesChange}
                          value={state.editor.selectedElement.content.href}
                        />
                      </div>
                    );
                  case "text":
                    return (
                      <div className="flex flex-col gap-2 p-1">
                        <p className="text-muted-foreground">Content</p>
                        <Textarea
                          id="innerText"
                          placeholder="Enter text..."
                          onChange={handleCustomValuesChange}
                          value={state.editor.selectedElement.content.innerText}
                        />
                      </div>
                    );
                }
              })()}
            </AccordionContent>
          </AccordionItem>
          <AppearanceSettings
            handleOnChange={handleOnChange}
            handleSelectChange={handleSelectChange}
          />
          <TypographySettings
            handleOnChange={handleOnChange}
            handleSelectChange={handleSelectChange}
          />
        </>
      ) : (
        <p className="px-6 py-0 text-muted-foreground">
          Select a component to start customizing it
        </p>
      )}
    </Accordion>
  );
};

export default SettingsTab;
