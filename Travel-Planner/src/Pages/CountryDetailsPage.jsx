import React, { useEffect, useState } from "react";
import CountryDetails from "../components/CountryDetails";
import { useParams } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";
///////////
import { fetchChatResponse } from "../components/services/AiApi";

export default function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams();
  const { favorites, dispatch } = useFavorites();

  ////////

  const [travelSuggestions, setTravelSuggestions] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      setIsLoading(true);
      try {
        const countriesData = localStorage.getItem("countries");
        if (!countriesData) throw new Error("No countries data found");
        const countriesArray = JSON.parse(countriesData);
        const foundCountry = countriesArray.find(
          (c) => c.name?.common?.toLowerCase() === name.toLowerCase()
        );
        if (!foundCountry) throw new Error("Country not found");
        setCountry(foundCountry);
      } catch (error) {
        setError(error.message);

        setCountry(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountry();
  }, [name]);
  ///////////////////////

  const handleFetchTravelSuggestions = async () => {
    try {
      setIsLoading(true);
      const result = await fetchChatResponse(name);
      setTravelSuggestions(result);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  //////////////

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {country && (
        <CountryDetails
          country={country}
          favorites={favorites}
          dispatch={dispatch}
          /////////
          travelSuggestions={travelSuggestions}
          onFetchTravelSuggestions={handleFetchTravelSuggestions}
        />
      )}
    </div>
  );
}
