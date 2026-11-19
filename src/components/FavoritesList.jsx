import React from "react";

export default function FavoritesList({ favorites, dispatch }) {
  console.log(favorites);

  if (favorites.length === 0) {
    return (
      <div>
        <p>No favorites yet. Add some from the country details!</p>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginBottom: "50px",
      }}
    >
      {favorites &&
        favorites.map((country, index) => (
          <li key={index} className="fevList">
            {country.name.common}
            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_COUNTRY",
                  payload: { name: country.name },
                })
              }
            >
              Remove from favorites
            </button>
          </li>
        ))}
    </div>
  );
}
