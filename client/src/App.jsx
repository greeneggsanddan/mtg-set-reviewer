import { useEffect, useState } from "react";
import SetSelector from "./components/SetSelector";
import TabToggle from "./components/TabToggle";
import TierList from "./components/TierList";
import Ranker from "./components/Ranker";
import "./App.css";

export default function App() {
  const [isTierList, setIsTierList] = useState(true);

  const [cardData, setCardData] = useState([]);
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
          ...card,
          rank: null,
        }));

        setCardData(rankedCards);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container d-flex flex-column gap-2">
      <SetSelector />
      <TabToggle isTierList={isTierList} setIsTierList={setIsTierList} />
      {isTierList ? (
        <TierList cardData={cardData} setCardData={setCardData} />
      ) : (
        <Ranker cardData={cardData} setCardData={setCardData} />
      )}
    </div>
  );
}
