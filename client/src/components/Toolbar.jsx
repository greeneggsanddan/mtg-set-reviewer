import { useState, useEffect } from "react";

export default function Toolbar({
  cardData,
  setCardData,
  rank,
  setRank,
  currentCard
}) {

  // Updates the card properties when currentCard changes
  useEffect(() => {
    setRank(cardData[currentCard].rank);
  }, [currentCard, cardData]);

  //
  function handleRadioChange(e) {
    const updatedCards = cardData.map((card, index) => {
      if (index === currentCard) {
        return { ...card, rank: e.target.value };
      }
      return card;
    });
    setCardData(updatedCards);
  }

  return (
    <>
      <div className="btn-group" role="group" aria-label="Rank radio">
        <input
          type="radio"
          className="btn-check"
          name="s-rank-radio"
          id="s-rank-radio"
          value="S"
          autoComplete="off"
          checked={rank === "S"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="s-rank-radio">
          S
        </label>
        <input
          type="radio"
          className="btn-check"
          name="a-rank-radio"
          id="a-rank-radio"
          value="A"
          autoComplete="off"
          checked={rank === "A"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="a-rank-radio">
          A
        </label>
        <input
          type="radio"
          className="btn-check"
          name="b-rank-radio"
          id="b-rank-radio"
          value="B"
          autoComplete="off"
          checked={rank === "B"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="b-rank-radio">
          B
        </label>
        <input
          type="radio"
          className="btn-check"
          name="c-rank-radio"
          id="c-rank-radio"
          value="C"
          autoComplete="off"
          checked={rank === "C"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="c-rank-radio">
          C
        </label>
        <input
          type="radio"
          className="btn-check"
          name="d-rank-radio"
          id="d-rank-radio"
          value="D"
          autoComplete="off"
          checked={rank === "D"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="d-rank-radio">
          D
        </label>
        <input
          type="radio"
          className="btn-check"
          name="f-rank-radio"
          id="f-rank-radio"
          value="F"
          autoComplete="off"
          checked={rank === "F"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="f-rank-radio">
          F
        </label>
        <input
          type="radio"
          className="btn-check"
          name="sb-rank-radio"
          id="sb-rank-radio"
          value="SB"
          autoComplete="off"
          checked={rank === "SB"}
          onChange={handleRadioChange}
        />
        <label className="btn btn-outline-primary" htmlFor="sb-rank-radio">
          SB
        </label>
      </div>
      {/* <div
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
      </div> */}
    </>
  );
}
