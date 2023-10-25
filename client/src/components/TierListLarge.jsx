import ManaCost from "./ManaCost";
import "./TierListLarge.css";

export default function TierListLarge({ cardData, setCardData }) {
  function trimName(str) {
    const index = str.indexOf("/");

    if (index === -1) return str;
    return str.slice(0, index - 1);
  }

  function displayCards(color) {
    let cards;

    if (color === "MC") {
      cards = cardData.filter((card) => card.colors.length > 1);
    } else if (color === "C") {
      cards = cardData.filter((card) => card.colors.length === 0);
    } else {
      cards = cardData.filter(
        (card) => card.colors.length === 1 && card.colors[0] === color,
      );
    }

    const sCards = cards.filter((card) => card.rank === "S");
    const aCards = cards.filter((card) => card.rank === "A");
    const bCards = cards.filter((card) => card.rank === "B");
    const cCards = cards.filter((card) => card.rank === "C");
    const dCards = cards.filter((card) => card.rank === "D");
    const fCards = cards.filter((card) => card.rank === "F");
    const sbCards = cards.filter((card) => card.rank === "SB");
    const unrankedCards = cards.filter((card) => card.rank === null);

    function listCards(array) {
      return array.map((card) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={card.id}
        >
          {trimName(card.name)}
          <ManaCost manaCost={card.mana_cost} />
        </li>
      ));
    }

    return (
      <>
        {sCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-info-subtle">S</div>
            <ul className="list-group list-group-flush">{listCards(sCards)}</ul>
          </>
        )}
        {aCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-primary-subtle">A</div>
            <ul className="list-group list-group-flush">{listCards(aCards)}</ul>
          </>
        )}
        {bCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-success-subtle">B</div>
            <ul className="list-group list-group-flush">{listCards(bCards)}</ul>
          </>
        )}
        {cCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-warning-subtle">C</div>
            <ul className="list-group list-group-flush">{listCards(cCards)}</ul>
          </>
        )}
        {dCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-danger-subtle">D</div>
            <ul className="list-group list-group-flush">{listCards(dCards)}</ul>
          </>
        )}
        {fCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-dark-subtle">F</div>
            <ul className="list-group list-group-flush">{listCards(fCards)}</ul>
          </>
        )}
        {sbCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-light">Sideboard</div>
            <ul className="list-group list-group-flush">
              {listCards(sbCards)}
            </ul>
          </>
        )}
        {unrankedCards.length !== 0 && (
          <>
            <div className="card-header text-center bg-white">Unranked</div>
            <ul className="list-group list-group-flush">
              {listCards(unrankedCards)}
            </ul>
          </>
        )}
      </>
    );
  }

  return (
    <div className="row row-cols-5 g-4">
      <div className="col">
        <div className="rated card">
          <div className="card-header text-center">White</div>
          {displayCards("W")}
        </div>
      </div>
      <div className="col">
        <div className="rated card">
          <div className="card-header text-center">Blue</div>
          {displayCards("U")}
        </div>
      </div>
      <div className="col">
        <div className="rated card">
          <div className="card-header">Black</div>
          {displayCards("B")}
        </div>
      </div>
      <div className="col">
        <div className="rated card">
          <div className="card-header">Red</div>
          {displayCards("R")}
        </div>
      </div>
      <div className="col">
        <div className="rated card">
          <div className="card-header">Green</div>
          {displayCards("G")}
        </div>
      </div>
      <div className="col">
        <div className="rated card">
          <div className="card-header">Multicolor</div>
          {displayCards("MC")}
        </div>
      </div>
      <div className="col">
        <div className="rated card">
          <div className="card-header">Colorless</div>
          {displayCards("C")}
        </div>
      </div>
    </div>
  );
}
