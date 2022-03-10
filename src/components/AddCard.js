import { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddCards(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cardType, setCardType] = useState("standard");
  const [fileInput, setFileInput] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const fileInputRef = useRef();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    

    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

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
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const { collectionId } = props;

    // Create an object representing the body of the POST request
    const requestBody = {
      title,
      description,
      fileUrl,
      username,
      password,
      cardType,
      collectionId,
    };

    

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    //POST for adding cards
    axios
      .post(`${API_URL}/api/cards`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
        setUsername("");
        setPassword("");
        setCardType("standard");
        setFileUrl("");
        fileInputRef.current.value = "";
        setFileInput(null);

        props.refreshCollection();
      })
      .catch((error) => console.log(error));
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (cardType === "standard") {
    return (
      <div className="AddCards">
        <h3 className="AddCardHeader">Add a New Memory Card</h3>

        <form className="AddCards-Form" onSubmit={handleSubmit}>
          <select
            class="SelectCard"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="password">Password</option>
          </select>

          <input
            className="Input-Text"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="Input-Text"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="InputFile"
            id="file"
            name="file"
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e)}
          />
          <label for="file">Choose a File</label>

          <button className="Button-Submit" type="submit">
            Add Card
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="AddCards">
        <h3 className="AddCardHeader">Add a New Memory Card</h3>

        <form className="AddCards-Form" onSubmit={handleSubmit}>
          <select
            class="SelectCard"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="password">Password</option>
          </select>

          <input
            className="Input-Text"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="Input-Text"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="Input-Text"
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <textarea
            className="Input-Text"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="Button-Submit" type="submit">
            Add Card
          </button>
        </form>

        <button className="Show-Password-Button" onClick={togglePassword}>
          Show Password
        </button>
      </div>
    );
  }
}
export default AddCards;
