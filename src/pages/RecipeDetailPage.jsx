import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../hooks/useFavorites";

export default function RecipeDetailPage() {
  const { recipeId } = useParams();

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
  );
  const {addToFavorites, removeFromFavorites, isFavorite} =useFavorites();
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  const recipe = data?.meals?.[0];
  if (!recipe) return <ErrorMessage message="Recipe not found" />;

const ingredients = [];
for (let i = 1; i<=20; i++){ // loop to read all 20 
  const ingredient = recipe[`strIngredient${i}`]; // 20 possible ingredient field
  const measure = recipe [`strMeasure${i}`];
  if (ingredient && ingredient.trim()){
    ingredients.push({ingredient, measure});
  }
}
const favoriteStatus = isFavorite(recipeId);
  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="recipe-info">
          <h1>{recipe.strMeal}</h1>
          <p className="category-tag"> {recipe.strCategory}</p>
          {recipe.strArea && <p className="area-tag">{recipe.strArea}</p>}
      <button className={`favorite-button ${favoriteStatus ? 'favorite' :''}`}
      onClick={() => favoriteStatus ? removeFromFavorites(recipeId) : addToFavorites(recipe)}>
        {favoriteStatus ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
        </div>
      </div>
<div className="recipe-content">
  <div className="ingredient-section">
    <h2>Ingredients</h2>
    <ul className="ingredients-list">
      {ingredients.map((item, index) => ( <li key={index}>
        <span className="measure">{item.measure}</span>
        <span className="ingredient">{item.ingredient}</span>
      </li>))}
    </ul>
  </div>
  <div className="instructions-section">
    <h2>Instructions</h2>
    <p className="instructions">{recipe.strInstructions}</p>
  </div>
</div>


    </div>
  );
}
