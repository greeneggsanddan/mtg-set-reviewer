/* eslint-disable react/self-closing-comp */
import { useState, useEffect } from "react";

export default function CardNav({
  currentCard,
  setCurrentCard,
  cardData,
  cardFace,
  setCardFace,
}) {
  const [card, setCard] = useState({ dfc: null });

  useEffect(() => {
    if (cardData.length > 0) {
      setCard(cardData[currentCard]);
    }
  }, [cardData, currentCard]);

  function decrementCard() {
    if (currentCard === 0) setCurrentCard(cardData.length - 1);
    else setCurrentCard(currentCard - 1);
    setCardFace(true);
  }

  function incrementCard() {
    if (currentCard === cardData.length - 1) setCurrentCard(0);
    else setCurrentCard(currentCard + 1);
    setCardFace(true);
  }

  const handleTransform = () => setCardFace(!cardFace);

  return (
    <div
      className="btn-group bg-white d-flex"
      role="group"
      aria-label="Card navigation"
    >
      <button
        type="button"
        className="btn btn-dark"
        onClick={decrementCard}
      >
        <i className="bi bi-chevron-left"></i>
        <span> Prev</span>
      </button>
        <button
          className="btn btn-outline-dark"
          type="button"
        onClick={handleTransform}
        disabled={!card.dfc}
        >
          <i className="bi bi-arrow-repeat"></i>
          <span> Transform</span>
        </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={incrementCard}
      >
        <span>Next </span>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}
