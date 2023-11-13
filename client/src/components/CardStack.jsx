import { useEffect, useState } from "react";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import DroppableZone from "./DroppableZone";
import DraggableCard from "./DraggableCard";
import { saveData } from "../utils/utils";

export default function CardStack({
  cardData,
  setCardData,
  currentCard,
  setCurrentCard,
  cardRank,
  setCardRank,
  hover,
  user,
}) {
  const [card, setCard] = useState({image_1: null, name: null});

  useEffect(() => {
    if (cardData.length > 0) {
      setCard(cardData[currentCard]);
    }
  }, [cardData, currentCard]);

  function handleDragEnd() {
    const updatedCards = cardData.map((c, index) => {
      if (index === currentCard) {
        return { ...c, rank: cardRank };
      }
      return c;
    });
    setCardData(updatedCards);
    if (user) saveData(updatedCards, 'lci');
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
  }

  function handleDragOver(e) {
    if (e.over) setCardRank(e.over.id);
  }

  const hoverCard = cardData.find((c) => c.id === hover);

  return (
    <div className="position-relative mb-3" style={{ zIndex: "-2" }}>
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        {hover && (
          <img
            src={hoverCard.image_1}
            alt={hoverCard.name}
            className="w-100 position-absolute top-0 ranker-image"
          />
        )}
        <DraggableCard>
          <img
            src={card.image_1}
            alt={card.name}
            className="w-100 ranker-image"
          />
        </DraggableCard>
        <DragOverlay>
          <img
            src={card.image_1}
            alt={card.name}
            className="w-100 ranker-image"
          />
        </DragOverlay>
        <DroppableZone />
      </DndContext>
    </div>
  );
}
