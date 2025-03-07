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
    case "container":
      return <Container element={element} />;
    case "2Col":
      return <Container element={element} />;
    case "3Col":
      return <Container element={element} />;
  }

  switch (element.category) {
    case "Text":
      return <TextComponent element={element} />;
    default:
      return null;
  }
}

export default Recursive;
