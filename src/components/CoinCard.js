import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CoinCard() {
  let { id } = useParams();

  const [getCoinData, setGetCoinData] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": "1de65fd4dcmsh1d9c530d04ab73bp127509jsn52b43fc85331",
      },
    };

    fetch(
      `https://coinranking1.p.rapidapi.com/coin/${id}?referenceCurrencyUuid=${id}&timePeriod=24h`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const results = data.data.coin;
        setGetCoinData(results);
      })
      .catch((err) => console.error(err));
  }, []);
  //   console.log(results);

  const coin = getCoinData;

  return (
    <div>
      <div>
        <h1>{coin.name}</h1>
        <img src={coin.iconUrl} alt={coin.name} width="100" />
        <h3>{coin.symbol}</h3>
        <p>{coin.description}</p>;
      </div>
    </div>
  );
}

export default CoinCard;
