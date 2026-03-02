import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage () {

  const {favorites} = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page empty">

        <h1>Your Favorites</h1>
        <p>You have not added any favorites yet.</p>
        <Link to="/" className="browse-link"> Browse Recipes</Link>
      </div>
    );
  }

  return (
  <div className="favorites-page">
    <h1>Your Favorite Recipes</h1>
    <div className="favorite-grid">
      {favorites.map(recipe => <RecipeCard key={recipe.idMeal} recipe={recipe}/>)}
    </div>
  </div>
  )
}