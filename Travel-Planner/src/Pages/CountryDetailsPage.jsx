import React, { useEffect, useState } from "react";
import CountryDetails from "../components/CountryDetails";
import { useParams } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";
///////////
import {
  fetchChatResponse,
  fetchChatBotResponse,
} from "../components/services/AiApi";

export default function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams();
  const { favorites, dispatch } = useFavorites();

  ////////  AI state
  const [travelSuggestions, setTravelSuggestions] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  ////////

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

        // welcome message for the country
        setChatMessages([
          {
            sender: "ai",
            text: `Hello! I'm your travel assistant for ${foundCountry.name.common}. Ask me anything about traveling to ${foundCountry.name.common} - from attractions and food to culture and practical tips!`,
          },
        ]);
      } catch (error) {
        setError(error.message);
        setCountry(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountry();
  }, [name]);
  /////////////////////// Ai Fetches

  const handleFetchTravelSuggestions = async () => {
    try {
      setIsAiLoading(true);
      setError(null);
      const result = await fetchChatResponse(name);
      setTravelSuggestions(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSendMessages = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;
    const currentInput = userInput;
    setChatMessages([...chatMessages, { sender: "user", text: currentInput }]);
    setUserInput("");
    try {
      setIsChatLoading(true);
      setError(null);
      const res = await fetchChatBotResponse(
        currentInput,
        country?.name?.common,
        chatMessages
      );
      setChatMessages((prev) => [...prev, { sender: "ai", text: res }]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsChatLoading(false);
    }
  };

  //////////////

  return (
    <div>
      {isLoading && <div>Loading country details...</div>}
      {error && <div>{error}</div>}
      {country && (
        <CountryDetails
          country={country}
          favorites={favorites}
          dispatch={dispatch}
          /////////
          travelSuggestions={travelSuggestions}
          onFetchTravelSuggestions={handleFetchTravelSuggestions}
          isAiLoading={isAiLoading}
        />
      )}
      <div className="chat-container">
        <h3>Travel Chatbot</h3>
        <div className="chat-window">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "user-message" : "ai-message"}
            >
              {msg.text}
            </div>
          ))}
          {isChatLoading && <div className="ai-message">Typing...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
        <form onSubmit={handleSendMessages}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
