import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import EditCardPage from "./pages/EditCardPage";

const API_URL = "http://localhost:5005";

let oneCard = undefined;

function CardDetailsPage(props) {
  //console.log(`CardDetails - Props:`, props)
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  // Get the URL parameter: cardId
  const { cardId } = useParams();

  // GET card by id
  const getCard = () => {
    axios
      .get(`${API_URL}/api/card/${cardId}`)
      .then((response) => {
        //console.log(`From carddetails - response:`, response)
        oneCard = response.data;
        console.log(`From carddetails - oneCard:`, oneCard);
        setCard(oneCard);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCard();
  }, []);
  // console.log(` From CardDetails - card:`, card)

  // Make a DELETE request to delete the Card
  const deleteCard = () => {
    axios
      .delete(`${API_URL}/api/card/${cardId}/delete`)
      .then(() => {
        //console.log(`Delete navigate:`, oneCard.theCollection);
        navigate(`/collections/${oneCard.theCollection}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="CardDetails">
      {card && (
        <>
          <h1>{card.title}</h1>
          <p>{card.description}</p>
          <p>{card.username}</p>
          <p>{card.password}</p>
          <p>{card.fileUrl}</p>
        </>
      )}

      <Link to={`/card/${cardId}/edit`}>
        <button>Edit Card</button>
      </Link>
      <button onClick={deleteCard}>Delete Card</button>
    </div>
  );
}

export default CardDetailsPage;
