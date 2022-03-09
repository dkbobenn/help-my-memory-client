import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className='Navbar'>
    <div className='Navbar-Left'>
    <img className='Navbar-Image' src="/navbar-image2.jpg" alt="Girl in a jacket" width="110" height="70"></img>
  <h3 className='Navbar-Header'>Help Your Memory</h3>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/collections">
            <button>Collections</button>
          </Link>
</div>

<div className='Navbar-Right'>
      {isLoggedIn && (
        <>
        
          <button onClick={logOutUser}>Logout</button>
          <div className='Navbar-User'>
          <span className='Navbar-User-Text'>{user && user.name}</span>
          </div>
        </>
      )}


      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
      </div>
    </nav>
  );
}

export default Navbar;
