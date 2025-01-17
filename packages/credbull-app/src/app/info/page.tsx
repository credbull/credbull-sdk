"use client";

import React from "react";

function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

export default function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];
  const [likes, setLikes] = React.useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button className="btn btn-lg" onClick={handleClick}>
        Likes ({likes})
      </button>
    </div>
  );
}
