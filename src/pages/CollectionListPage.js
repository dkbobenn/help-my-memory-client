

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCollection from "./../components/AddCollection"; 

const API_URL = "http://localhost:5005";


function CollectionListPage() {
  const [collections, setCollections] = useState([]);

  const getAllCollections = () => {
    axios
      .get(`${API_URL}/api/collections`)
      .then((response) => setCollections(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllCollections();
  }, [] );

  
  return (
    <div className="CollectionListPage">

<AddCollection refreshCollections={getAllCollections} />
      
        {collections.map((collection) => {
          return (
            <div className="CollectionCard card" key={collection._id} >
              <Link to={`/collections/${collection._id}`}>
                <h3>{collection.title}</h3>
              </Link>
            </div>
          );
        })}     
       
    </div>
  );
}

export default CollectionListPage;
