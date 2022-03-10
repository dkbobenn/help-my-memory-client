import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://help-my-memory.herokuapp.com";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1 className="Signup-Header">Sign Up</h1>

      <form className="SignupPage-Form" onSubmit={handleSignupSubmit}>
        <label className="Signup-Labels">Email:</label>
        <input
          className="Input-Text"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="Signup-Labels">Password:</label>
        <input
          className="Input-Text"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label className="Signup-Labels">Name:</label>
        <input
          className="Input-Text"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <button className="Button-Submit" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="Login-Text">Already have account?</p>
      <Link className="Login-Text" to={"/login"}>
        {" "}
        Login
      </Link>
    </div>
  );
}

export default SignupPage;
