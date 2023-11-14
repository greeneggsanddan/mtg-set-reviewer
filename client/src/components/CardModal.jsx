/* eslint-disable react/self-closing-comp */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalRankBar from "./ModalRankBar";
import { saveData } from "../utils/utils";

export default function CardModal({
  show,
  setShow,
  cardData,
  setCardData,
  cardId,
  user,
}) {
  const [card, setCard] = useState({ dfc: null, image_1: null, name: null });
  const [cardRank, setCardRank] = useState(null);
  const [cardFace, setCardFace] = useState(true);

  useEffect(() => {
    if (cardData.length > 0 && cardId !== null) {
      const modalCard = cardData.find((c) => c.id === cardId);
      setCard(modalCard);
      setCardRank(modalCard.rank);
    }
  }, [cardData, cardId]);

  const handleClose = () => setShow(false);

  function handleSave() {
    const updatedCards = cardData.map((c) => {
      if (c.id === cardId) {
        return { ...c, rank: cardRank };
      }
      return c;
    });

    setCardData(updatedCards);
    if (user) saveData(updatedCards, "lci");
    setShow(false);
  }

  const handleTransform = () => setCardFace(!cardFace);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="d-grid gap-3">
        <img
          src={cardFace ? card.image_1 : card.image_2}
          alt={card.name}
          className="w-100"
          style={{ borderRadius: "1.25rem" }}
        />
        <ModalRankBar cardRank={cardRank} setCardRank={setCardRank} />
        {card.dfc && (
          <button
            className="btn btn-dark"
            type="button"
            onClick={handleTransform}
          >
            <i className="bi bi-arrow-repeat"></i>
            <span> Transform</span>
          </button>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-dark" onClick={handleSave}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}
