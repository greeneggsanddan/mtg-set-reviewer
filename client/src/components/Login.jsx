import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function Login({
  showLogin,
  setShowLogin,
  setUser,
  cardData,
  setCardData,
  setCurrentCard,
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    set: "lci",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  function handleCloseLogin() {
    setPasswordVisible(false);
    setFormData({ username: "", password: "", set: "lci" });
    setError(null);
    setShowLogin(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://mtg-set-reviewer.fly.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        const authenticated = await response.json();
        setUser(authenticated.username);

        if (authenticated.data) {
          setCardData(authenticated.data);
          setCurrentCard(0);
        } else {
          await fetch("https://mtg-set-reviewer.fly.dev/sets/lci", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardData),
            credentials: "include",
            mode: "cors",
          });
        }

        handleCloseLogin();
      } else {
        setError("That information doesn't match our records.");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    }
  }

  return (
    <Modal show={showLogin} onHide={handleCloseLogin} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in to your account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleLogin}>
          <div className="form-signin">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                maxLength="20"
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                maxLength="32"
                required
              />
              <label htmlFor="password">Password</label>
              {error && <div className="text-danger form-label">{error}</div>}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="passwordCheck"
                checked={passwordVisible}
                onChange={togglePasswordVisibility}
              />
              <label className="form-check-label" htmlFor="passwordCheck">
                Show password
              </label>
            </div>
          </div>
          <div className="d-grid p-3">
            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
