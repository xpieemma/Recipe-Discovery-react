

import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({ recipe }) => (
  <div className="recipe-card">
    <Link to={`/recipe/${recipe.idMeal}`}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      {recipe.strCategory && <p className="category">{recipe.strCategory}</p>}
    </Link>
  </div>
);
export default RecipeCard;