import { useState } from "react";
import "./NavBar.css";
import Signup from "./Signup";
import Login from "./Login";

export default function NavBar({ user, setUser, cardData, setCardData}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);


  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenSignup = () => setShowSignup(true);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      if (response.ok) {
        console.log("Logged out");
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkUser() {
    const response = await fetch("http://localhost:3000/api", { credentials: 'include'});
    const data = await response.json();
    console.log(data.message);
  }

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
              onClick={checkUser}
            >
              Check
            </button>
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
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
        </div>
      </nav>
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setUser={setUser}
        cardData={cardData}
        setCardData={setCardData}
      />
      <Signup showSignup={showSignup} setShowSignup={setShowSignup} setUser={setUser} cardData={cardData} />
    </>
  );
}
