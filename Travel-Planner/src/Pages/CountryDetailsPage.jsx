import React, { useEffect, useState } from "react";
import CountryDetails from "../components/CountryDetails";
import { useParams } from "react-router-dom";

export default function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams();

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

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {country && <CountryDetails country={country} />}
    </div>
  );
}
