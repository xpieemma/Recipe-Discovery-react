import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
  );
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  const recipes = data?.meals || [];

  return (
    <div className="category-page">
      <h1>{categoryName} Recipes</h1>
      {recipes.length === 0 ? (
        <p className="no-results">No Recipes found in this category.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
