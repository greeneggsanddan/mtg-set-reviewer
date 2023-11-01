import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function CardModal({ show, setShow, cardData, setCardData, cardId }) {
  const [card, setCard] = useState({ image: null, name: null });

  useEffect(() => {
    if (cardData.length > 0 && cardId !== null) {
      setCard(cardData.find((c) => c.id === cardId));
    }
  }, [cardData, cardId]);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={card.image} alt={card.name} className="img-fluid"/>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleClose}
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}