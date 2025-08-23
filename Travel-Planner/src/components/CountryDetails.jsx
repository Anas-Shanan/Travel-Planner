import React from "react";
import { NavLink } from "react-router-dom";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function CountryDetails({
  country,
  favorites,
  dispatch,
  travelSuggestions,
  onFetchTravelSuggestions,
  isAiLoading,
}) {
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

  const latlng = country.latlng;

  if (!country) return <div>No country data available.</div>;
  return (
    <div>
      <h2>{country.name?.common || "No name available"}</h2>
      {country.flags?.png && (
        <img
          src={country.flags.png}
          alt={`${country.name?.common || "flag"}`}
          style={{ width: "100px" }}
        />
      )}
      <p>
        Official Name: {country.name?.official || "No official name available"}
      </p>
      <p>Capital: {country.capital?.[0] || "No capital data available"}</p>
      <p>Region: {country.region || "No region data available"}</p>
      <p>Subregion: {country.subregion || "No subregion data available"}</p>
      <p>
        Population:{" "}
        {country.population
          ? country.population.toLocaleString()
          : "No population data available"}
      </p>
      <p>
        Languages:{" "}
        {country.languages
          ? Array.isArray(country.languages)
            ? country.languages.join(", ")
            : typeof country.languages === "object"
            ? Object.values(country.languages).join(", ")
            : String(country.languages)
          : "No language data available"}
      </p>
      <p>
        Currencies:{" "}
        {country.currencies
          ? typeof country.currencies === "object"
            ? Object.values(country.currencies)
                .map((cur) => cur?.name || cur?.code || "Unknown")
                .filter(Boolean)
                .join(", ")
            : String(country.currencies)
          : "No currency data available"}
      </p>
      <div>
        <button
          onClick={handleFavoriteToggle}
          className={isFavorite ? "remove-btn" : "add-btn"}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      ////////////////////////
      <button
        onClick={onFetchTravelSuggestions}
        className="travel-btn"
        disabled={isAiLoading}
      >
        {isAiLoading ? "Loading..." : "Get Travel Plan for 3 days"}
      </button>
      {travelSuggestions && (
        <div className="travel-suggestions">
          <h3>Travel Plan for {country.name.common}</h3>
          <p>{travelSuggestions}</p>
        </div>
      )}
      ////////////////////////
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
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          >
            <Marker longitude={latlng[1]} latitude={latlng[0]} />
          </Map>
        )}
      </div>
    </div>
  );
}
