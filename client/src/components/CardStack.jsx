import Toolbar from "./Toolbar";

export default function CardStack({ cardData, setCardData, currentCard }) {
  // function handleCardDrag() {}

  return (
    <>
      <div className="container">
        {cardData.length > 0 ? (
          <img
            src={cardData[currentCard].image_uris.normal}
            alt={cardData[currentCard].name}
            key={cardData[currentCard].id}
          />
        ) : (
          <p>No cards</p>
        )}
      </div>
      <Toolbar
        cardData={cardData}
        setCardData={setCardData}
        currentCard={currentCard}
      />
    </>
  );
}
