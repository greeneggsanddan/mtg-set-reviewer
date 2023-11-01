export default function TabToggle({ isTierList, setIsTierList }) {
  function handleRadioChange() {
    setIsTierList(!isTierList);
  }

  return (
    <div className="btn-group bg-white d-flex mb-3 d-xs-block d-md-none" role="group">
      <input
        type="radio"
        className="btn-check"
        name="tier-list-radio"
        id="tier-list-radio"
        autoComplete="off"
        checked={isTierList}
        onChange={handleRadioChange}
      />
      <label className="btn btn-outline-dark" htmlFor="tier-list-radio">
        Tier List
      </label>
      <input
        type="radio"
        className="btn-check"
        name="ranking-radio"
        id="ranking-radio"
        autoComplete="off"
        checked={!isTierList}
        onChange={handleRadioChange}
      />
      <label className="btn btn-outline-dark" htmlFor="ranking-radio">
        Ranker
      </label>
    </div>
  );
}
