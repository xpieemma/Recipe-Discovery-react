import { useParams } from "react-router-dom"


export default function RecipeDetailPage() {
  const {recipeId} = useParams();

  
  
  return (
    <div className="recipe-detail">
      <h1>
loading Recipe {recipeId}...
      </h1>
    </div>
  )
}