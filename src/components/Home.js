import React, { useState, useEffect } from "react";
import CoinCards from "./CoinCards";

function Home() {
  const [getData, setGetData] = useState([]);
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
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data.data.coins;
        setGetData(results);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return (
      <div className="container-fluid p-3">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-3">
      <div className="row row-cols-3 gx-3 gy-3">
        {getData.map((data) => (
          <CoinCards
            key={data.uuid}
            id={data.uuid}
            name={data.name}
            image={data.iconUrl}
            ranking={data.coinrankingUrl}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
