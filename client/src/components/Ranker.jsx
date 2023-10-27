import CardStack from "./CardStack";
import CardNav from "./CardNav";

export default function Ranker({ cardData, setCardData, currentCard, setCurrentCard }) {
  
  return (
    <div className="sticky-top" style={{ top: '1.5rem'}}>
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
    </div>
  );
}
