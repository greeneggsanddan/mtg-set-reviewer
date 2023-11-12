import { useEffect } from "react";
import { saveData } from "../utils/utils";

export default function RankBar({
  cardData,
  setCardData,
  cardRank,
  setCardRank,
  currentCard,
  setCurrentCard,
  user,
}) {
  const ranks = ["S", "A", "B", "C", "D", "F", "Sideboard"];

  // Updates the rank when currentCard changes
  useEffect(() => {
    if (cardData.length > 0) {
      setCardRank(cardData[currentCard].rank);
    }
  }, [currentCard, cardData]);

  function handleButtonClick(e) {
    const updatedCards = cardData.map((card, index) => {
      if (index === currentCard) {
        return { ...card, rank: e.target.value };
      }
      return card;
    });

    setCardData(updatedCards);
    if (user) saveData(updatedCards, 'lci');
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
  }

  return (
    <div
      className="btn-group bg-white d-flex mb-3"
      role="group"
      aria-label="Rank button group"
    >
      {ranks.map((rank) => (
        <button
          type="button"
          className={`btn btn-outline-dark ${
            cardRank === rank ? "active" : ""
          }`}
          key={rank}
          value={rank}
          onClick={handleButtonClick}
        >
          {rank === "Sideboard" ? "SB" : rank}
        </button>
      ))}
    </div>
  );
}
