import { useState } from "react";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import Toolbar from "./Toolbar";
import DroppableZone from "./DroppableZone";
import DraggableCard from "./DraggableCard";

export default function CardStack({ cardData, setCardData, currentCard }) {
  const [rank, setRank] = useState(cardData[currentCard].rank);

  const card = cardData[currentCard];

  function handleDragEnd() {
    const updatedCards = cardData.map((c, index) => {
      if (index === currentCard) {
        return { ...c, rank: rank };
      }
      return c;
    });
    setCardData(updatedCards);
  }

  function handleDragOver(e) {
    if (e.over) setRank(e.over.id);
  }

  return (
    <>
      <div className="position-relative">
        <DndContext
          collisionDetection={pointerWithin}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <DraggableCard>
            <img
              src={card.image_uris.large}
              alt={card.name}
              className="img-fluid w-100"
            />
          </DraggableCard>
          <DragOverlay>
            <img
              src={card.image_uris.large}
              alt={card.name}
              className="img-fluid w-100"
            />
          </DragOverlay>
          <DroppableZone />
        </DndContext>
      </div>
      <Toolbar
        cardData={cardData}
        setCardData={setCardData}
        rank={rank}
        setRank={setRank}
        currentCard={currentCard}
      />
    </>
  );
}
