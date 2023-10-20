export default function CardNav({ currentCard, setCurrentCard, cardData, setCardData }) {
  function decrementCard() {
    if (currentCard === 0) setCurrentCard(cardData.length - 1);
    else setCurrentCard(currentCard - 1);
  }

  function incrementCard() {
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
  }

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Card navigation"
    >
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={decrementCard}
      >
        Left
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={incrementCard}
      >
        Right
      </button>
    </div>
  );
}