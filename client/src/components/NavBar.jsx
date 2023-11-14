import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import "./NavBar.css";

export default function NavBar({
  user,
  setUser,
  cardData,
  setCardData,
  setCurrentCard,
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenSignup = () => setShowSignup(true);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        setCurrentCard(0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="navbar bg-purple">
        <div className="container">
          <div className="navbar-brand text-white h1 mb-0">
            MTG Set Reviewer
          </div>
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div
                className="bg-white fw-semibold fs-5 text-purple rounded d-flex align-items-center justify-content-center"
                style={{ height: "2.25rem", width: "2.25rem" }}
              >
                {user[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleOpenLogin}
              >
                Login
              </button>
              <button
                className="btn btn-light"
                type="button"
                onClick={handleOpenSignup}
              >
                Sign-up
              </button>
            </div>
          )}
        </div>
      </nav>
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setUser={setUser}
        cardData={cardData}
        setCardData={setCardData}
        setCurrentCard={setCurrentCard}
      />
      <Signup
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        setUser={setUser}
        cardData={cardData}
      />
    </>
  );
}
