import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function CountryDetails({ country }) {
  console.log(country);
  if (!country) return <div>No country data available.</div>;
  const latlng = country.latlng;
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
        <button onClick={""}>Add to ferorites</button>
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
