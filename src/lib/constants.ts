export type ElementTypes =
  | "text"
  | "container"
  | "section"
  | "link"
  | "2Col"
  | "3Col"
  | "video"
  | "image"
  | "__body"
  | null;

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};
