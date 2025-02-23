import { EditorElement } from "@/app/providers/editor-provider";
import TextComponent from "./text";
import Container from "./container";

type Props = {
  element: EditorElement;
};

function Recursive({ element }: Props) {
  switch (element.type) {
    case "__body":
      return <Container element={element} />;
    case "text":
      return <TextComponent element={element} />;
    default:
      return null;
  }
}

export default Recursive;
