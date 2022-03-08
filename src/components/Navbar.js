import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>


        <>
          <Link to="/collections">
            <button>Collections</button>
          </Link>
          <button>Logout</button>
      
        </>
  
        <>
          <Link to="/signup">
        
            <button>Signup</button>
          </Link>
          <Link to="/login">
          
            <button>Login</button>
          </Link>
        </>
    </nav>
  );
}

export default Navbar;
