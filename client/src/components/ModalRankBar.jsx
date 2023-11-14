export default function ModalRankBar({ cardRank, setCardRank }) {
  const ranks = ["S", "A", "B", "C", "D", "F", "Sideboard"];

  function handleButtonClick(e) {
    setCardRank(e.target.value);
  }

  return (
    <div
      className="btn-group d-flex"
      role="group"
      aria-label="Modal rank button group"
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
