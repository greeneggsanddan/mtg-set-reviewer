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
    <div className="btn-group" role="group" aria-label="Card navigation">
      <button
        type="button"
        className="btn btn-primary active"
        onClick={decrementCard}
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <div
        className="btn-group"
        role="group"
        aria-label="Card properties toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check"
          id="btncheck1"
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btncheck1">
          Checkbox 1
        </label>

        <input
          type="checkbox"
          className="btn-check"
          id="btncheck2"
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btncheck2">
          Checkbox 2
        </label>

        <input
          type="checkbox"
          className="btn-check"
          id="btncheck3"
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btncheck3">
          Checkbox 3
        </label>
      </div>
      <button
        type="button"
        className="btn btn-primary active"
        onClick={incrementCard}
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}