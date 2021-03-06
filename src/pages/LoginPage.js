import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://help-my-memory.herokuapp.com";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1 className="Login-Header">Login</h1>

      <form className="LoginPage-Form" onSubmit={handleLoginSubmit}>
        <label className="Login-Labels">Email:</label>
        <input
          className="Input-Text"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="Login-Labels">Password:</label>
        <input
          className="Input-Text"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button className="Button-Submit" type="submit">
          Login
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="Login-Text">Don't have an account yet?</p>
      <Link className="Login-Text" to={"/signup"}>
        {" "}
        Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;
