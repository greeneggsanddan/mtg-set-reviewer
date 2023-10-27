import { useState } from "react";
import CardStack from "./CardStack";
import RankBar from "./RankBar";
import CardNav from "./CardNav";

export default function Ranker({ cardData, setCardData, currentCard, setCurrentCard }) {
  const [rank, setRank] = useState(cardData[currentCard].rank);
  
  return (
    <div className="sticky-top d-flex flex-column" style={{ top: "1rem" }}>
      <CardStack
        cardData={cardData}
        setCardData={setCardData}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        rank={rank}
        setRank={setRank}
      />
      <RankBar
        cardData={cardData}
        setCardData={setCardData}
        rank={rank}
        setRank={setRank}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
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
