import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";


export default function RecipeDetailPage() {
  const {recipeId} = useParams();

  const {data, loading, error} = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
if (loading) return <Spinner/>
if (error) return <ErrorMessage message={error} />
const recipe = data?.meals?.[0];
if(!recipe) return <ErrorMessage message="cant be found" />

  console.log(recipeId);

  console.log(data);

  return (
    <div className="recipe-detail">
      <h1>
{recipe.strMeal} loaded successfully 
      </h1>
    </div>
  )
}