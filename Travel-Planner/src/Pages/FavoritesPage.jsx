import React from "react";
import FavoritesList from "../components/FavoritesList";
import { useFavorites } from "../Context/FavoritesContext";
import { text } from "framer-motion/client";

export default function FavoritesPage() {
  const { favorites, dispatch } = useFavorites();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "82.5vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>My favorite Countries</h1>
      <FavoritesList favorites={favorites} dispatch={dispatch} />
    </div>
  );
}
