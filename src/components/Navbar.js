// src/components/Navbar.js

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/collections">
        <button>Collections</button>
      </Link>
    </nav>
  );
}

export default Navbar;
