import { useDroppable } from "@dnd-kit/core";

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div className="col h-100" ref={setNodeRef} />
}

export default function DroppableZone() {
  const ranks = ["S", "A", "B", "C", "D", "F", "SB"];

  return (
    <div className="container position-absolute top-0 h-100" style={{ pointerEvents: 'none' }}>
      <div className="row h-100">
        {ranks.map((value) => (
          <Droppable id={value} key={value} />
        ))}
      </div>
    </div>
  );
}