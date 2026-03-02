import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Spinner from "../components/Spinner"
import useFetch from "../hooks/useFetch"


export default function HomePage() {
const {data, loading, error} = useFetch('https://www.themealdb.com/api/json/v1/1/categories.php')

if (loading) return <Spinner/>
if (error) return <ErrorMessage message = {error} />

const categories = data?.categories || [];

return (
    <div>
      <h1></h1>
      <div>
        {categories.map(category => (
          <Link>
          <img src = {category.strCategoryThumb} alt={category.strCategory}/>
          <h3>{category.strCategory}</h3>
          <p>{category.strCategoryDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};