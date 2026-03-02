import { useParams } from "react-router-dom"


export default function CategoryPage() {
  const {categoryName} = useParams();


  return (
<div className="category-page">
  <h1>{categoryName} Recipes</h1>
</div>
  );

}