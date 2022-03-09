import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddCard from "../components/AddCard";
import CardList from "../components/CardList";
import axios from "axios";

const API_URL = "https://help-my-memory.herokuapp.com";

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
      {collection && (
        <>
          <h1>{collection.title}</h1>
        </>
      )}

      <AddCard refreshCollection={getCollection} collectionId={collectionId} />

      {collection &&
        collection.cards.map((card) => <CardList key={card._id} {...card} />)}

      <Link to="/collections">
        <button>Back to collections</button>
      </Link>

      <Link to={`/collections/${collectionId}/edit`}>
        <button>Edit Collection</button>
      </Link>
    </div>
  );
}

export default CollectionDetailsPage;
