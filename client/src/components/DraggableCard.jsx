import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableCard(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "card",
  });
  
  // const style = transform
  //   ? {
  //       transform: CSS.Translate.toString(transform),
  //     }
  //   : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
