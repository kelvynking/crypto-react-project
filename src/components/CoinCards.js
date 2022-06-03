import React from "react";
import { useHistory } from "react-router-dom";
import CoinCard from "./CoinCard";

function CoinCards(props) {
  //   const handleClick = () => {
  //     alert("Hello");
  //       <CoinCard />;
  //   };

  const history = useHistory();

  function handleClick() {
    history.push(`/coincard/${props.id}`);
  }

  return (
    <div onClick={handleClick}>
      <img src={props.image} alt={props.name} width="100" />
      <h3>Crypto: {props.name}</h3>
      <a href={props.ranking}>{props.name} Ranking</a>
    </div>
  );
}

export default CoinCards;
