import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link className="link" to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
