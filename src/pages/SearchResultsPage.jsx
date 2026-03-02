import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import RecipeCard from "../components/RecipeCard";



export default function SearchResultsPage() {
const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);

  if (loading) return <Spinner/>;
  if (error) return <ErrorMessage message={error} />;

  const recipes = data?.meals || [];
  return (
<div className="search-results">
      <h1>Search Results for "{query}"</h1>
      {recipes.length === 0 ? (
        <p className="no-results">No recipes found matching your search.</p>
      ) : (
        <>
          <p className="results-count">Found {recipes.length} recipe(s)</p>
          <div className="results-grid">
            {recipes.map(recipe => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
          </div>
        </>
      )}
    </div>
  );
}