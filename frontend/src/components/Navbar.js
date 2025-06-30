import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}>
      <h3 style={{ display: "inline-block", marginRight: "2rem" }}>
        URL Shortener
      </h3>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Dashboard
      </Link>
      <Link to="/register" style={{ marginRight: "1rem" }}>
        Register
      </Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
