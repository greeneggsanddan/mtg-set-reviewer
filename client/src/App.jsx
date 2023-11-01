import { useEffect, useState } from "react";
import TabToggle from "./components/TabToggle";
import TierList from "./components/TierList";
import Ranker from "./components/Ranker";
import "./App.css";

export default function App() {
  const [isTierList, setIsTierList] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [hover, setHover] = useState(null);
  
  useEffect(() => {
    let mounted = true;
    
    (async () => {
      try {
        const response = await fetch(
          `https://api.scryfall.com/cards/search?order=set&q=set%3Awoe+is%3Abooster`,
          { mode: "cors" },
          );
          let apiData = await response.json();
          let cards = apiData.data;
          
          while (apiData.has_more) {
            const nextResponse = await fetch(apiData.next_page, { mode: "cors" });
            const nextPageData = await nextResponse.json();
            cards = cards.concat(nextPageData.data);
            apiData = nextPageData;
          }
          
          // Adds the 'rank' property to each card and assigns it a value of null
          const rankedCards = cards.map((card) => ({
            name: card.name,
            id: card.id,
            image: card.image_uris.normal,
            mana_cost: card.mana_cost,
            cmc: card.cmc,
            colors: card.colors,
            rank: null,
          }));
          
          if (mounted === true) setCardData(rankedCards);
      } catch (error) {
        console.log(error);
      }
    })();
    
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <>
      <nav className="navbar bg-purple border-bottom">
        <div className="container">
          <a className="navbar-brand text-white h1 mb-0" href="#">
            MTG Set Reviewer
          </a>
        </div>
      </nav>
      <div className="container py-3">
        <div className="row">
          <TabToggle isTierList={isTierList} setIsTierList={setIsTierList} />
        </div>
        <div className="row">
          <div
            className={`col ${isTierList ? "d-block" : "d-none d-md-block"}`}
          >
            <TierList
              cardData={cardData}
              setCardData={setCardData}
              setHover={setHover}
            />
          </div>
          <div
            className={`col col-lg-3 col-xl-2 ${
              isTierList ? "d-none d-md-block" : "d-block"
            }`}
          >
            <Ranker
              cardData={cardData}
              setCardData={setCardData}
              hover={hover}
            />
          </div>
        </div>
      </div>
    </>
  );
}