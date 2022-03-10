import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddCard from "../components/AddCard";
import CardList from "../components/CardList";
import axios from "axios";

const API_URL = "http://localhost:5005";

function CollectionDetailsPage(props) {
  console.log(`Props:`, props);
  const [collection, setCollection] = useState(null);

  // Get the URL parameter: collectionId
  const { collectionId } = useParams();

  // GET collection by id
  const getCollection = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/collections/${collectionId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(`From collectiondetails - response:`, response);
        const oneCollection = response.data;
        console.log(`From collectiondetails - oneCollection:`, oneCollection);
        setCollection(oneCollection);
      })
      .catch((error) => console.log(error));
  };

  console.log(`From collection:`, collection);

  useEffect(() => {
    getCollection();
  }, []);
  console.log(` From collectiondetails - collection:`, collection);

  return (
    <div className="CollectionDetails">
      <div className="CollectionDetails-Buttons">
        <Link to="/collections">
          <button className="NavButtons">Back to collections</button>
        </Link>

        <Link to={`/collections/${collectionId}/edit`}>
          <button className="NavButtons">Edit Collection</button>
        </Link>
      </div>
      {collection && (
        <>
          <h1 className="CollectionDetails-Header">
            You are in Collection: <br></br> {collection.title}
          </h1>
        </>
      )}

      <AddCard refreshCollection={getCollection} collectionId={collectionId} />

      <div className="Cards-Container">
        {collection &&
          collection.cards.map((card) => <CardList key={card._id} {...card} />)}
      </div>
    </div>
  );
}

export default CollectionDetailsPage;
