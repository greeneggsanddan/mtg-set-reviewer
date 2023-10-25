import ManaCost from "./ManaCost";
import "./TierList.css"

export default function TierList({ cardData, setCardData }) {
  function trimName(str) {
    const index = str.indexOf('/');

    if (index === -1) return str;
    return str.slice(0, index - 1);
  }

  function displayTier(tier) {
    const cards = cardData.filter((card) => card.rank === tier);

    return (
      <>
        {cards.map((card) => (
          <li className="list-group-item d-flex justify-content-between" key={card.id}>
            {trimName(card.name)}
            <ManaCost manaCost={card.mana_cost}/>
          </li>
        ))}
      </>
    );
  }

  return (
    <div className="d-flex flex-column gap-2">
      <div className="rated card">
        <div className="card-header">S</div>
        <ul className="list-group list-group-flush">{displayTier("S")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">A</div>
        <ul className="list-group list-group-flush">{displayTier("A")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">B</div>
        <ul className="list-group list-group-flush">{displayTier("B")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">C</div>
        <ul className="list-group list-group-flush">{displayTier("C")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">D</div>
        <ul className="list-group list-group-flush">{displayTier("D")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">F</div>
        <ul className="list-group list-group-flush">{displayTier("F")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">Sideboard</div>
        <ul className="list-group list-group-flush">{displayTier("Sideboard")}</ul>
      </div>
      <div className="rated card">
        <div className="card-header">Unranked</div>
        <ul className="list-group list-group-flush">{displayTier(null)}</ul>
      </div>
    </div>
  );
}
