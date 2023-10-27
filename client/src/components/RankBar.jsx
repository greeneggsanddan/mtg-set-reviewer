import { useEffect } from "react";

export default function RankBar({
  cardData,
  setCardData,
  rank,
  setRank,
  currentCard,
  setCurrentCard,
}) {
  const ranks = ["S", "A", "B", "C", "D", "F", "Sideboard"];

  // Updates the card properties when currentCard changes
  useEffect(() => {
    setRank(cardData[currentCard].rank);
  }, [currentCard, cardData]);

  function handleButtonClick(e) {
    const updatedCards = cardData.map((card, index) => {
      if (index === currentCard) {
        return { ...card, rank: e.target.value };
      }
      return card;
    });

    setCardData(updatedCards);
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
  }

  return (
    <div
      className="btn-group d-flex"
      role="group"
      aria-label="Rank button group"
    >
      {ranks.map((rankName) => (
        <button
          type="button"
          className={`btn btn-outline-primary ${
            rank === rankName ? "active" : ""
          }`}
          key={rankName}
          value={rankName}
          onClick={handleButtonClick}
        >
          {rankName === "Sideboard" ? "SB" : rankName}
        </button>
      ))}
    </div>
  );
}
