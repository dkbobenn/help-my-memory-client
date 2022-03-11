import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://help-my-memory.herokuapp.com";

let cardType = undefined;

function EditCardPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cardType, setCardType] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  // Get the URL parameter :cardId
  const { cardId } = useParams();

  let oneCard = undefined;

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/card/${cardId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        oneCard = response.data;

        setTitle(oneCard.title);
        setDescription(oneCard.description);
        setFileUrl(oneCard.fileUrl);
        setUsername(oneCard.username);
        setPassword(oneCard.password);
        setCardType(oneCard.cardType);
      })
      .catch((error) => console.log(error));
  }, [cardId]);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    axios
      .post(`${API_URL}/api/fileupload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // response carries "fileUrl" which we can use to update the state
        setFileUrl(response.data.path);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description, fileUrl, username, password };

    // Make a PUT request to update the card
    axios
      .put(`${API_URL}/api/card/${cardId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //navigate back to to the collection after update
        navigate(`/collections/${response.data.theCollection}`);
      });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (cardType === "standard") {
    return (
      <div className="EditCardPage">
        <h3 className="EditCardHeader">Edit the Card</h3>

        <form className="EditCard-Form" onSubmit={handleFormSubmit}>
          <input
            className="Input-Text"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="Input-Text"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="EditCardFile"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
          <label for="file">Choose a File</label>

          <input
            className="Button-Submit"
            placeholder=""
            Title
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  } else {
    return (
      <div className="EditCardPage">
        <h3 className="EditCardHeader">Edit the Card</h3>

        <form className="EditCard-Form" onSubmit={handleFormSubmit}>
          <input
            className="Input-Text"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="Input-Text"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="Input-Text"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="Input-Text"
            type={passwordShown ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="Button-Submit" type="submit" value="Submit" />
        </form>
        <button className="EditCard-Password-Button" onClick={togglePassword}>
          Show Password
        </button>
      </div>
    );
  }
}

export default EditCardPage;
