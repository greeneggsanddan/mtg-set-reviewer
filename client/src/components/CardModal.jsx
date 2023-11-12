import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalRankBar from './ModalRankBar';
import { saveData } from '../utils/utils';

export default function CardModal({ show, setShow, cardData, setCardData, cardId, user }) {
  const [card, setCard] = useState({ image_1: null, name: null });
  const [cardRank, setCardRank] = useState(null);

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
    if (user) saveData(updatedCards, 'lci')
    setShow(false);
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <img src={card.image_1} alt={card.name} className="w-100 mb-3" style={{ borderRadius: '1.25rem' }} />
        <ModalRankBar
          cardRank={cardRank}
          setCardRank={setCardRank}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}