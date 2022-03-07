import { useState, useRef } from "react";
//import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
//import CollectionDetailsPage from "../pages/CollectionDetailsPage";
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
  const fileInputRef = useRef();


  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    //console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    //console.log("uploadData: ", uploadData);

    axios
      .post(`${API_URL}/api/fileupload`, uploadData)
      .then((response) => {
        //console.log("response is: ", response.data.path);
        // response carries "fileUrl" which we can use to update the state
        setFileUrl(response.data.path);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  //console.log("fileUrl is: ", fileUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Addcards - Props:`, props);

    // We need the collection id when creating the new card
    const { collectionId } = props;
    console.log(`Addcards - CollectionId:`, collectionId);
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

    console.log(`Addcards reqbody:`, requestBody);

    //POST for adding cards
    axios
      .post(`${API_URL}/api/cards`, requestBody)
      .then((response) => {
        console.log(`Addcards response:`, response);
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
        setFileUrl("");
        fileInputRef.current.value = "";
        setFileInput(null);
        setUsername("");
        setPassword("");
        setCardType("standard");

        props.refreshCollection();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddCards">
      <h3>Add New Card</h3>

      <form onSubmit={handleSubmit}>
        <h3>Select Memory Card Type</h3>
        <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="password">Password</option>
        </select>

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Username:</label>
        <textarea
          type="text"
          name="description"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <textarea
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="file"
         ref={fileInputRef}
         onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default AddCards;
