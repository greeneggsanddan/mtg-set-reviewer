import { useEffect, useState } from "react";
import CardStack from "./CardStack";
import CardNav from "./CardNav";

export default function Ranker({ cardData, setCardData }) {
  const [currentCard, setCurrentCard] = useState(0);
  
  return (
    <>
      <CardStack
        cardData={cardData}
        setCardData={setCardData}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
      />
      <CardNav
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        cardData={cardData}
        setCardData={setCardData}
      />
    </>
  );
}
