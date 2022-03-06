import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
 
const API_URL = "http://localhost:5005";  

function CollectionDetailsPage (props) {
  const [collection, setCollection] = useState(null);

  // Get the URL parameter: collectionId
  const { collectionId } = useParams();    

  // GET collection by id
  const getCollection = () => {  
    axios
      .get(`${API_URL}/api/collections/${collectionId}`)
      .then((response) => {
        //console.log(`From oneCollection:`, response.data)
        const oneCollection = response.data;
        //console.log(`From oneCollection:`, oneCollection)
        setCollection(oneCollection);
      })
      .catch((error) => console.log(error));
  };

  //console.log(`From collection:`, collection)
  
  useEffect(()=> {
    getCollection();
  }, [] );

  
  return (
    <div className="CollectionDetails">
      {collection && (
        <>
          <h1>{collection.title}</h1>
          
        </>
      )}

      {collection &&
        collection.cards.map((card) => (
          <li className="TaskCard card" key={card._id}>
            <h3>{card.title}</h3>
            <h4>Description:</h4>
            <p>{card.description}</p>
          </li>
      ))}

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
