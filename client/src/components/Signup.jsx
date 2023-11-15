import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

export default function Signup({
  showSignup,
  setShowSignup,
  setUser,
  cardData,
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    set: "lci",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  function handleCloseSignup() {
    setPasswordVisible(false);
    setFormData({ username: "", password: "", set: "lci" });
    setUserExists(false);
    setShowSignup(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://set-review-server.fly.dev/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      
      if (data.exists) {
        setUserExists(true);
      } else {
        // Create cardData for new user
        await fetch("https://set-review-server.fly.dev/sets/lci", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
          credentials: "include",
          mode: "cors",
        });
        
        setUser(data.username);
        handleCloseSignup();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setFormData({ username: "", password: "", set: "lci" });
  }, []);

  return (
    <Modal show={showSignup} onHide={handleCloseSignup} centered>
      <Modal.Header closeButton>
        <Modal.Title centered>Sign-up for an account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSignup}>
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
              {userExists && (
                <div className="text-danger form-label">
                  User already exists
                </div>
              )}
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
              Sign-up
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
