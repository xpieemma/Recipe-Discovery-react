import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";


export default function CategoryPage() {
  const {categoryName} = useParams();
  const {data} = useFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c={categoryName}`);


  return (
<div className="category-page">
  <h1>{categoryName} Recipes</h1>
  {data && <pre> {JSON.stringify(data, null, 2)}</pre>}
</div>
  );

}