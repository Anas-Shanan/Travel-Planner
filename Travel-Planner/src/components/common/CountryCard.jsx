import React from "react";
import { NavLink } from "react-router-dom";
import "./CountryCard.css"; // Optional: for card-specific styles

export default function CountryCard({ name, flag, capital }) {
  return (
    <div className="country-card">
      <div className="country-card__image">
        {flag ? (
          <img src={flag} alt={`${name} flag`} />
        ) : (
          <span className="country-card__placeholder">🌍</span>
        )}
      </div>
      <div className="country-card__info">
        <h3>{name}</h3>
        {capital && <p>Capital: {capital}</p>}
        <NavLink
          to={`/country/${encodeURIComponent(name)}`}
          className="country-card__link"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
}
