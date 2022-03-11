import { Link } from "react-router-dom";
//import AddCard from "../components/AddCard";
//import CardDetailsPage from "../pages/CardDetailsPage";
// We are deconstructing the props object directly in the parentheses of the function
function CardList({ title, description, _id }) {
  return (
    <div className="Cards" key={_id}>
      <Link className="Cards-Link" to={`/card/${_id}`}>
        <h3 className='Cards-header'>{title}</h3>
        <p className='Cards-Text'>{description}</p>
      </Link>
    </div>
  );
}

export default CardList;
