import { useState, useRef } from "react";
import axios from "axios";
import CollectionListPage from "../pages/CollectionListPage";

const API_URL = "http://localhost:5005";

function AddCollection(props) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const imageInputRef = useRef();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
   

    const uploadData = new FormData();
    setImageInput(e.target.files[0]);
    uploadData.append("imageUrl", e.target.files[0]);

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
       
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.path);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, imageUrl };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/collections`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setImageUrl("");
        imageInputRef.current.value = "";
        setImageInput(null);
        props.refreshCollections();
      })
      .catch((error) =>
        console.log("Error while adding the new collection: ", error)
      );
  };

  return (
    <div className="AddCollection">
      <h3 className="AddCollectionHeader">Add New Collection</h3>

      <form className="AddCollectionForm" onSubmit={handleSubmit}>
        <input
          className="Input-Text"
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="InputFile"
          type="file"
          onChange={(e) => handleFileUpload(e)}
          ref={imageInputRef}
          name="file"
          id="file"
        />
        <label for="file">Choose a Image</label>

        <button className="Button-Submit" type="submit">
          Save New Collection
        </button>
      </form>
    </div>
  );
}

export default AddCollection;
