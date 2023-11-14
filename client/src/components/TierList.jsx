import { useState } from "react";
import ManaCost from "./ManaCost";
import CardModal from "./CardModal";

export default function TierList({
  cardData,
  setCardData,
  setHover,
  user,
  setCurrentCard,
}) {
  const ranks = ["S", "A", "B", "C", "D", "F", "Sideboard", "Unranked"];
  const colors = ["W", "U", "B", "R", "G", "MC", "C"];
  const bgColors = {
    W: "bg-warning-subtle",
    U: "bg-primary-subtle",
    B: "bg-dark-subtle",
    R: "bg-danger-subtle",
    G: "bg-success-subtle",
    MC: "bg-yellow-300",
    C: "bg-body-secondary",
  };
  const colorString = {
    W: "White",
    U: "Blue",
    B: "Black",
    R: "Red",
    G: "Green",
    MC: "Multicolor",
    C: "Colorless",
  };

  const [show, setShow] = useState(false);
  const [cardId, setCardId] = useState(null);

  function handleShow(id, index) {
    setShow(true);
    setCardId(id);
    setCurrentCard(index);
  }

  function handleHover(id) {
    setHover(id);
  }

  const handleMouseLeave = () => setHover(null);

  function trimName(str) {
    const index = str.indexOf("/");
    return index === -1 ? str : str.slice(0, index - 1);
  }

  // Displays cards of a specified color and rank
  function displayCards(color, rank) {
    let cards;
    const data =
      rank === "Unranked"
        ? cardData.filter((card) => card.rank === null)
        : cardData.filter((card) => card.rank === rank);

    if (color === "MC") {
      cards = data.filter((card) => card.colors.length > 1);
    } else if (color === "C") {
      cards = data.filter((card) => card.colors.length === 0);
    } else {
      cards = data.filter(
        (card) => card.colors.length === 1 && card.colors[0] === color,
      );
    }

    const sorted =
      rank === "Unranked" ? cards : cards.sort((a, b) => a.cmc - b.cmc);

    return (
      sorted.length > 0 && (
        <>
          <div className="list-group-item bg-body-tertiary text-center">
            {rank}
          </div>
          {cards.map((card) => (
            <button
              type="button"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              key={card.id}
              onClick={() => handleShow(card.id, card.index)}
              onMouseEnter={() => handleHover(card.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="me-1">{trimName(card.name)}</div>
              <ManaCost manaCost={card.mana_cost} />
            </button>
          ))}
        </>
      )
    );
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-5 g-3">
        {colors.map((color) => (
          <div className="col" key={color}>
            <div className="card">
              <div
                className={`card-header text-center fw-medium ${bgColors[color]}`}
              >
                {colorString[color]}
              </div>
              <div className="list-group list-group-flush">
                {ranks.map((rank) => displayCards(color, rank))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <CardModal
        show={show}
        setShow={setShow}
        cardData={cardData}
        setCardData={setCardData}
        cardId={cardId}
        user={user}
        setCurrentCard={setCurrentCard}
      />
    </>
  );
}
