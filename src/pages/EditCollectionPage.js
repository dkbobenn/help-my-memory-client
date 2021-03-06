import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://help-my-memory.herokuapp.com";

function EditCollectionPage(props) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  // Get the URL parameter :collectionId
  const { collectionId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/collections/${collectionId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneCollection = response.data;
        setTitle(oneCollection.title);
        setImageUrl(oneCollection.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [collectionId]);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    const storedToken = localStorage.getItem("authToken");

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, imageUrl };

    // Make a PUT request to update the collection
    axios
      .put(`${API_URL}/api/collections/${collectionId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //navigate back to collections page after update
        navigate("/collections/" + collectionId);
      });
  };

  // Make a DELETE request to delete the Collection
  const deleteCollection = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/api/collections/${collectionId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/collections");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditCollectionPage">
      <h3 className="EditCollectionHeader">Edit the Collection</h3>

      <form className="EditCollection-Form" onSubmit={handleFormSubmit}>
        <input
          className="Input-Text"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="EditCardFile"
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />
        <label for="file">Choose a Image</label>

        <input className="Button-Submit" type="submit" value="Submit" />
      </form>

      <button className="Button-Submit-Delete" onClick={deleteCollection}>
        Delete Collection
      </button>
    </div>
  );
}

export default EditCollectionPage;
