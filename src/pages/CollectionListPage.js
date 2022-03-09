

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCollection from "./../components/AddCollection"; 

const API_URL = "https://help-my-memory.herokuapp.com";


function CollectionListPage() {
  const [collections, setCollections] = useState([]);

  const getAllCollections = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/collections`,  { headers: { Authorization: `Bearer ${storedToken}` } })
      
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
