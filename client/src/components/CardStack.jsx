import { useEffect, useState } from "react";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import DroppableZone from "./DroppableZone";
import DraggableCard from "./DraggableCard";

export default function CardStack({
  cardData,
  setCardData,
  currentCard,
  setCurrentCard,
  rank,
  setRank
}) {
  const [card, setCard] = useState({image: null, name: null});

  useEffect(() => {
    if (cardData.length > 0) {
      setCard(cardData[currentCard]);
    }
  }, [cardData, currentCard]);

  function handleDragEnd() {
    const updatedCards = cardData.map((c, index) => {
      if (index === currentCard) {
        // eslint-disable-next-line object-shorthand
        return { ...c, rank: rank };
      }
      return c;
    });
    setCardData(updatedCards);
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
  }

  function handleDragOver(e) {
    if (e.over) setRank(e.over.id);
  }

  return (
    <div className="position-relative mb-3">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <DraggableCard>
          <img src={card.image} alt={card.name} className="w-100" style={{ borderRadius: '.75rem' }} />
        </DraggableCard>
        <DragOverlay>
          <img src={card.image} alt={card.name} className="w-100" />
        </DragOverlay>
        <DroppableZone />
      </DndContext>
    </div>
  );
}
