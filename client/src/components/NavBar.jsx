import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseSignup = () => setShowSignup(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenSignup = () => setShowSignup(true);

  return (
    <>
      <nav className="navbar bg-purple">
        <div className="container">
          <a className="navbar-brand text-white h1 mb-0" href="#">
            MTG Set Reviewer
          </a>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={handleOpenLogin}
            >
              Login
            </button>
            <button
              className="btn btn-dark"
              type="button"
              onClick={handleOpenSignup}
            >
              Sign-up
            </button>
          </div>
        </div>
      </nav>
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login Form</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleCloseLogin}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCloseLogin}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
