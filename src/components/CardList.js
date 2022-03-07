import { Link } from "react-router-dom";
//import AddCard from "../components/AddCard";
//import CardDetailsPage from "../pages/CardDetailsPage";
// We are deconstructing the props object directly in the parentheses of the function
function CardList({ title, description, _id }) {
  return (
    <div className="CollectionCard card" key={_id}>
      <Link to={`/card/${_id}`}>
        <h3>{title}</h3>
        <h3>{description}</h3>
      </Link>
    </div>
  );
}

export default CardList;
