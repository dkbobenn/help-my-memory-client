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
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    setImageInput(e.target.files[0]);
    uploadData.append("imageUrl", e.target.files[0]);

    console.log("uploadData: ", uploadData);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("response is: ", response.data.path);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.path);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  console.log("imageUrl is: ", imageUrl);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, imageUrl };
    console.log(requestBody);
    axios
      .post(`${API_URL}/api/collections`, requestBody)
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
      <h3>Add Collection</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => handleFileUpload(e)}
          ref={imageInputRef}
        />

        <button type="submit">Save New Collection</button>
      </form>
    </div>
  );
}

export default AddCollection;
