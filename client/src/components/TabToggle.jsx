export default function TabToggle({ isTierList, setIsTierList }) {
  function handleRadioChange() {
    setIsTierList(!isTierList);
  }

  return (
    <div className="btn-group container" role="group">
      <input type="radio" className="btn-check" name="tier-list-radio" id="tier-list-radio" autoComplete="off" checked={isTierList} onChange={handleRadioChange}/>
      <label className="btn btn-outline-primary" htmlFor="tier-list-radio">Tier List</label>
      <input type="radio" className="btn-check" name="ranking-radio" id="ranking-radio" autoComplete="off" checked={!isTierList} onChange={handleRadioChange}/>
      <label className="btn btn-outline-primary" htmlFor="ranking-radio">Ranking</label>
    </div>
  );
}