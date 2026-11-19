import HeroBanner from "../components/Home/HeroBanner";
import ContinentFilter from "../components/Home/ContinentFilter";
import SearchBar from "../components/Home/SearchBar";
import CountryCard from "../components/common/CountryCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.conventus.de/v3.1/all?fields=name,capital,region,subregion,population,languages,currencies,flags,latlng"
        );
        if (!response.ok) {
          throw new Error(`Country request failed (${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.some((country) => !country.name?.common)) {
          throw new Error("The country API returned invalid data.");
        }

        localStorage.setItem("countries", JSON.stringify(data));
        if (!isCancelled) setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        if (!isCancelled) setError(error.message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchCountries();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredCountries(
        countries.filter((country) => {
          const matchesSearch = country.name.common
            .toLowerCase()
            .startsWith(search.toLowerCase());
          const matchesContinent =
            continent === "All" || country.region === continent;
          return matchesSearch && matchesContinent;
        })
      );
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [search, continent, countries]);

  const featuredCountryNames = [
    "France",
    "Spain",
    "United Kingdom",
    "Turkey",
    "China",
    "Egypt",
    "Brazil",
    "Ecuador",
    "Canada",
    "Australia",
  ];

  //  shown when continent is all and no search)
  const featuredCountries = featuredCountryNames
    .map((targetName) =>
      countries.find(
        (c) => c.name?.common?.toLowerCase() === targetName.toLowerCase()
      )
    )
    .filter(Boolean);

  //  when no search is active
  const continentCountries =
    continent !== "All"
      ? countries.filter((c) => c.region === continent).slice(0, 10)
      : [];

  const handleReset = () => {
    setContinent("All");
    setSearch("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <HeroBanner />
      <div style={{ padding: "20px" }}>
        <h2>Country Explorer</h2>

        <div style={{ display: "flex", gap: "16px" }}>
          <ContinentFilter value={continent} onChange={setContinent} />
          <SearchBar value={search} onSearch={setSearch} />
          <button
            onClick={handleReset}
            style={{ opacity: search ? "1" : "0.5" }}
          >
            reset
          </button>
        </div>

        <p className="continent-filter2">
          | 🌍 Continent: <strong>{continent}</strong>{" "}
          <span className={search ? "span" : "none"}>|🔎 Search: </span>
          <strong style={{ color: "#db504a", fontSize: "20px" }}>
            {search}
          </strong>{" "}
          |
        </p>
      </div>
      <h2>Featured Countries</h2>

      <div className="country-grid">
        {isLoading && <p>Loading countries...</p>}
        {error && <p role="alert">Could not load countries: {error}</p>}
        {!isLoading && countries.length > 0 && (
          <>
            {search === "" && continent === "All" ? (
              // Featured countries
              featuredCountries.map((country) => (
                <CountryCard
                  key={country.name.official}
                  name={country.name.common}
                  flag={country.flags?.png}
                  capital={country.capital?.[0]}
                />
              ))
            ) : search === "" && continent !== "All" ? (
              // Continent countries
              continentCountries.map((country) => (
                <CountryCard
                  key={country.name.official}
                  name={country.name.common}
                  flag={country.flags?.png}
                  capital={country.capital?.[0]}
                />
              ))
            ) : search !== "" && filteredCountries.length === 0 ? (
              <div
                style={{
                  minHeight: "200px",
                  color: "#db504a",
                  fontWeight: "800",
                  fontSize: "24px",
                }}
              >
                Country not found.
              </div>
            ) : (
              // Filtered countries
              filteredCountries.map((country) => (
                <CountryCard
                  key={country.name.official}
                  name={country.name.common}
                  flag={country.flags?.png}
                  capital={country.capital?.[0]}
                />
              ))
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
