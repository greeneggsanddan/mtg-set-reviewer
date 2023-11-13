import { useEffect, useState } from "react";
import CardStack from "./CardStack";
import RankBar from "./RankBar";
import CardNav from "./CardNav";

export default function Ranker({ cardData, setCardData, currentCard, setCurrentCard, hover, user }) {
  const [cardRank, setCardRank] = useState(null);

  useEffect(() => {
    if (cardData.length > 0) {
      setCardRank(cardData[currentCard].rank);
    }
  }, [cardData, currentCard]);
  
  return (
    <div className="sticky-top d-flex flex-column" style={{ top: "1rem" }}>
      <CardStack
        cardData={cardData}
        setCardData={setCardData}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        cardRank={cardRank}
        setCardRank={setCardRank}
        hover={hover}
        user={user}
      />
      <RankBar
        cardData={cardData}
        setCardData={setCardData}
        cardRank={cardRank}
        setCardRank={setCardRank}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        user={user}
      />
      <CardNav
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        cardData={cardData}
        setCardData={setCardData}
      />
    </div>
  );
}
