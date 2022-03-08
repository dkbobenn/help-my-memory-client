import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

let cardType = undefined;

function EditCardPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(`EditCard props:`, props);

  // Get the URL parameter :cardId
  const { cardId } = useParams();
  //console.log(`cardId:`, cardId)

  let oneCard = undefined;

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    
    axios
      .get(`${API_URL}/api/card/${cardId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        oneCard = response.data;
        //console.log(`From oneCard:`, oneCard);

        setTitle(oneCard.title);
        setDescription(oneCard.description);
        setFileUrl(oneCard.fileUrl);
        setUsername(oneCard.username);
        setPassword(oneCard.password);
      })
      .catch((error) => console.log(error));
  }, [cardId]);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    //console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    //console.log("uploadData: ", uploadData);

    axios
      .post(`${API_URL}/api/fileupload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //console.log("response is: ", response.data.path);
        // response carries "fileUrl" which we can use to update the state
        setFileUrl(response.data.path);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  //console.log("fileUrl is: ", fileUrl);

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

  if (cardType == "standard") {
    console.log("standard", cardType);
    return (
      <div className="EditCardPage">
        <h3>Edit the Card</h3>

        <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>File:</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  } else {
    console.log("password", cardType);
    return (
      <div className="EditCardPage">
        <h3>Edit the Card</h3>

        <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password:</label>
          <input
            readOnly
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditCardPage;
