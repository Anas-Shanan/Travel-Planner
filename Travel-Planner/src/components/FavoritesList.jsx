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
    <div>
      {favorites &&
        favorites.map((country, index) => (
          <li key={index}>
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
