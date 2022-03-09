import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

let oneCard = undefined;
let cardType = undefined;

function CardDetailsPage(props) {
  //console.log(`CardDetails - Props:`, props)
  const [card, setCard] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  // Get the URL parameter: cardId
  const { cardId } = useParams();

  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // GET card by id
  const getCard = () => {
    axios
      .get(`${API_URL}/api/card/${cardId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(`From carddetails - response:`, response);

        oneCard = response.data;
        console.log(`From carddetails - oneCard:`, oneCard);
        cardType = response.data.cardType;
        console.log(`From carddetails - cardType:`, cardType);

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
      .delete(`${API_URL}/api/card/${cardId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        //console.log(`Delete navigate:`, oneCard.theCollection);
        navigate(`/collections/${oneCard.theCollection}`);
      })
      .catch((err) => console.log(err));
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (cardType == "standard") {
    return (
      <div className="CardDetails">
        {card && (
          <>
            <h1>{card.title}</h1>
            <p>{card.description}</p>
            <p>{card.fileUrl}</p>
          </>
        )}

        <Link to={`/card/${cardId}/edit`}>
          <button>Edit Card</button>
        </Link>
        <button onClick={deleteCard}>Delete Card</button>
      </div>
    );
  } else {
    return (
      <div className="CardDetails">
        {card && (
          <>
            <h1>{card.title}</h1>
            <p>{card.description}</p>
            <p>{card.username}</p>
            <label>Password:</label>
            <input
              readOnly
              type={passwordShown ? "text" : "password"}
              name="password"
              value={card.password}
            />
          </>
        )}

        <Link to={`/card/${cardId}/edit`}>
          <button>Edit Card</button>
        </Link>
        <button onClick={deleteCard}>Delete Card</button>
        <button onClick={togglePassword}>Show Password</button>
      </div>
    );
  }
}

export default CardDetailsPage;
