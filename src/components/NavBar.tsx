import "./NavBar.css";
import logo from "../assets/logo.png";

function NavBar() {
  /***
   * Main Navigation Bar
   * Always visible on the top of the page.
   *
   * @returns {JSX.Element} - Returns the navigation bar component.
   */

  return (
    <>
      <header className="barContainer">
        <img src={logo} alt="Logo" className="logoNav" />
        <div className="navLinks">
          <a href="/">Login</a>
          <a href="/register">Register</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/chat">Chat Room</a>
        </div>
      </header>
    </>
  );
}

export default NavBar;
