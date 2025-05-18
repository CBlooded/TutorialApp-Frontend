import "./NavBar.css";
import logo from "../assets/logo.png";

import React from "react";
// import type { ReactNode } from "react";

type NavBarProps = {
  children?: React.ReactNode;
};

function NavBar({ children }: NavBarProps) {
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
      {children}
      {/* TO DO - current page location - breadcrumbs */}
      {/* <div className="breadCrumbs">
        <p>Home / Dashboard</p>
    </div> */}
    </>
  );
}

export default NavBar;
