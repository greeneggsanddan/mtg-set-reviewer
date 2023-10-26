import ManaCost from "./ManaCost";
import "./TierListLarge.css";

export default function TierListLarge({ cardData, setCardData }) {
  const ranks = ["S", "A", "B", "C", "D", "F", "Sideboard", "Unranked"];
  const colors = ["W", "U", "B", "R", "G", "MC", "C"];
  const bgColors = {
    W: "bg-warning-subtle",
    U: "bg-primary-subtle",
    B: "bg-dark-subtle",
    R: "bg-danger-subtle",
    G: "bg-success-subtle",
    MC: "bg-warning",
    C: "bg-body-secondary"
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

    const sorted = rank === 'Unranked' ? cards: cards.sort((a, b) => a.cmc - b.cmc);

    return (
      sorted.length > 0 && (
        <>
          <div className="card-header text-center">
            {rank}
          </div>
          <ul className="list-group list-group-flush">
            {cards.map((card) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={card.id}
              >
                {trimName(card.name)}
                <ManaCost manaCost={card.mana_cost} />
              </li>
            ))}
          </ul>
        </>
      )
    );
  }

  return (
    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 g-3">
      {colors.map((color) => (
        <div className="col" key={color}>
          <div className="card">
            <div className={`card-header text-center ${bgColors[color]}`}>{colorString[color]}</div>
            {ranks.map((rank) => displayCards(color, rank))}
          </div>
        </div>
      ))}
    </div>
  );
}
