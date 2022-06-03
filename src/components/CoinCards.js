import React from "react";
import { useHistory } from "react-router-dom";

function CoinCards(props) {
  const history = useHistory();

  function handleClick() {
    history.push(`/coincard/${props.id}`);
  }

  return (
    <div className="card">
      <img src={props.image} className="card-img-top" alt={props.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle">
          <a href={props.ranking} target="_blank" rel="noreferrer">
            View ranking
          </a>
        </h6>
        <button className="btn btn-success my-3" onClick={handleClick}>
          View more information about {props.name}
        </button>
      </div>
    </div>
  );
}

export default CoinCards;
