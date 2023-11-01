import Modal from 'react-bootstrap/Modal';

export default function CardModal({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Image goes here</Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClose}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}