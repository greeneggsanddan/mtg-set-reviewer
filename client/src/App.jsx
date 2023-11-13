/* eslint-disable no-await-in-loop */
import { useEffect, useState } from "react";
import TabToggle from "./components/TabToggle";
import TierList from "./components/TierList";
import Ranker from "./components/Ranker";
import NavBar from "./components/NavBar";

export default function App() {
  const [user, setUser] = useState(null);
  const [isTierList, setIsTierList] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [hover, setHover] = useState(null);

  async function fetchCardData() {
    let mounted = true;

    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/search?order=set&q=set%3Alci+is%3Abooster`,
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

      // Maps scryfall api data to necessary properties
      const mappedCards = cards.map((card) => {
        const isDFC =
          card.layout === "transform" || card.layout === "modal-dfc";
        const imageOne = isDFC
          ? card.card_faces[0].image_uris.normal
          : card.image_uris.normal;
        const imageTwo = isDFC ? card.card_faces[1].image_uris.normal : null;
        const manaCost = isDFC ? card.card_faces[0].mana_cost : card.mana_cost;
        const colors = isDFC ? card.card_faces[0].colors : card.colors;

        return {
          name: card.name,
          id: card.id,
          dfc: isDFC,
          image_1: imageOne,
          image_2: imageTwo,
          mana_cost: manaCost,
          cmc: card.cmc,
          colors,
          rank: null,
        };
      });

      if (mounted === true) setCardData(mappedCards);
    } catch (error) {
      console.log(error);
    }

    return () => {
      mounted = false;
    };
  }

  useEffect(() => {
    if (!user) fetchCardData();
  }, [user]);

  return (
    <>
      <NavBar
        user={user}
        setUser={setUser}
        cardData={cardData}
        setCardData={setCardData}
      />
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
              user={user}
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
              user={user}
            />
          </div>
        </div>
      </div>
    </>
  );
}
