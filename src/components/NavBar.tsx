import "./NavBar.css";
import logo from "../assets/logo.png";
// import axiosConfig from "../api/axiosConfig";
import axios from "axios";

function NavBar() {
  /***
   * Main Navigation Bar
   * Always visible on the top of the page.
   *
   * @returns {JSX.Element} - Returns the navigation bar component.
   */

  const logout = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const encodedToken = encodeURIComponent(token);
    console.log(encodedToken);

    await axios
      .post(
        `http://localhost:8080/api/v1/session/endSession?token=${encodedToken}`,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer `+encodedToken,
          }
        }
      )
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <header className="barContainer">
        <img src={logo} alt="Logo" className="logoNav" />
        <div className="navLinks">
          <a href="/">Login</a>
          <a href="/register">Register</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/chat">Chat Room</a>
          <h2 onClick={logout} style={{ cursor: "pointer" }}>
            logout
          </h2>
        </div>
      </header>
    </>
  );
}

export default NavBar;
