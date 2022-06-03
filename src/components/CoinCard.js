import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";

function CoinCard() {
  let { id } = useParams();

  const [getCoinData, setGetCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const coin = getCoinData;

  if (isLoading) {
    return (
      <div className="container-fluid p-3">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-3">
      <h1 className="mb-3">{coin.name}</h1>
      <img className="mb-3" src={coin.iconUrl} alt={coin.name} width="100" />
      <h3>Coin Symbol: {coin.symbol}</h3>
      {parse(coin.description)}
      <Link className="btn btn-outline-primary btn-sm my-3" to="/">
        Return to home page
      </Link>
    </div>
  );
}

export default CoinCard;
