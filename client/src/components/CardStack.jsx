import { useState } from "react";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import Toolbar from "./Toolbar";
import RankBar from "./RankBar";
import DroppableZone from "./DroppableZone";
import DraggableCard from "./DraggableCard";

export default function CardStack({ cardData, setCardData, currentCard, setCurrentCard }) {
  const [rank, setRank] = useState(cardData[currentCard].rank);

  const card = cardData[currentCard];

  function handleDragEnd() {
    const updatedCards = cardData.map((c, index) => {
      if (index === currentCard) {
        // eslint-disable-next-line object-shorthand
        return { ...c, rank: rank };
      }
      return c;
    });
    setCardData(updatedCards);
    if (currentCard === cardData.length - 1) setCurrentCard(0)
    else setCurrentCard(currentCard + 1)
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
              src={card.image}
              alt={card.name}
              className="w-100"
            />
          </DraggableCard>
          <DragOverlay>
            <img
              src={card.image}
              alt={card.name}
              className="w-100"
            />
          </DragOverlay>
          <DroppableZone />
        </DndContext>
      </div>
      <RankBar
        cardData={cardData}
        setCardData={setCardData}
        rank={rank}
        setRank={setRank}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
      />
    </>
  );
}
