import React from "react";
import FavoritesList from "../components/FavoritesList";
import { useFavorites } from "../Context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, dispatch } = useFavorites();

  return (
    <div>
      <h1>my favorite Countries</h1>
      <FavoritesList favorites={favorites} dispatch={dispatch} />
    </div>
  );
}
