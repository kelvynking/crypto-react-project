import React from "react";

function About(props) {
  return (
    <div className="container-fluid p-3">
      <h1>About this app</h1>
      <p>
        This project has been created to allow people to view the most popular
        crypto currencies there are at the moment. Users can view all the
        currencies and then click on any of them to see more information.
      </p>
      <p>
        When users are logged into the app, they can save comments about the
        currencies and reload those comments to view their previous comments.
        Comments can be deleted by the people who have written them but can be
        viewed by all people.
      </p>
    </div>
  );
}

export default About;
