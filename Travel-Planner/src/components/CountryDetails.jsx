import React from "react";
import { NavLink } from "react-router-dom";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function CountryDetails({ country, favorites, dispatch }) {
  const isFavorite =
    Array.isArray(favorites) &&
    favorites.some((fav) => fav.name?.common === country.name?.common);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_COUNTRY", payload: { name: country.name } });
    } else {
      dispatch({ type: "ADD_COUNTRY", payload: country });
    }
  };
  console.log(isFavorite);
  const latlng = country.latlng;

  if (!country) return <div>No country data available.</div>;
  return (
    <div>
      <h2>{country.name?.common || "No name available"}</h2>
      {country.flags && (
        <img
          src={country.flags.png}
          alt={`${country.name?.common || "flag"}`}
          style={{ width: "100px" }}
        />
      )}
      <p>Official Name: {country.name?.official}</p>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Population: {country.population}</p>
      <p>
        Languages:{" "}
        {Array.isArray(country.languages)
          ? country.languages.join(", ")
          : typeof country.languages === "object"
          ? Object.values(country.languages).join(", ")
          : country.languages}
      </p>
      <p>
        Currencies:{" "}
        {country.currencies && typeof country.currencies === "object"
          ? Object.values(country.currencies)
              .map((cur) => cur.name)
              .join(", ")
          : country.currencies}
      </p>
      <div>
        <button
          onClick={handleFavoriteToggle}
          className={isFavorite ? "remove-btn" : "add-btn"}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      <div>
        {latlng && latlng.length === 2 && (
          <Map
            initialViewState={{
              longitude: latlng[1],
              latitude: latlng[0],
              zoom: 4,
            }}
            style={{ width: "100%", height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="pk.eyJ1IjoiYW5hc21hcDc3IiwiYSI6ImNtZWp6ZTZoZzAwcHMyaXMyaXNraHI1aTQifQ.Xlu3Yw1iJoWya1QPtaexHQ"
          >
            <Marker longitude={latlng[1]} latitude={latlng[0]} />
          </Map>
        )}
      </div>
    </div>
  );
}
