/* eslint-disable react/self-closing-comp */
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
  cardFace,
  setCardFace,
}) {
  const [card, setCard] = useState({
    dfc: null,
    image_1: null,
    image_2: null,
    name: null,
  });

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
    if (user) saveData(updatedCards, "lci");
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
    setCardFace(true);
  }

  function handleDragOver(e) {
    if (e.over) setCardRank(e.over.id);
  }

  const hoverCard = cardData.find((c) => c.id === hover);

  return (
    <div className="position-relative">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        {hover &&
          (hoverCard.dfc ? (
            <>
              <img
                src={hoverCard.image_1}
                alt={hoverCard.name}
                className="w-100 position-absolute top-0 end-100 ranker-image"
                style={{ pointerEvents: "none" }}
              />
              <img
                src={hoverCard.image_2}
                alt={hoverCard.name}
                className="w-100 position-absolute top-0 ranker-image"
              />
            </>
          ) : (
            <img
              src={hoverCard.image_1}
              alt={hoverCard.name}
              className="w-100 position-absolute top-0 ranker-image"
            />
          ))}
        <DraggableCard>
          <img
            src={cardFace ? card.image_1 : card.image_2}
            alt={card.name}
            className="w-100 ranker-image"
          />
        </DraggableCard>
        <DragOverlay>
          <img
            src={cardFace ? card.image_1 : card.image_2}
            alt={card.name}
            className="w-100 ranker-image"
          />
        </DragOverlay>
        <DroppableZone />
      </DndContext>
    </div>
  );
}
