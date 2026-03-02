
import {useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage";
import { FavoritesContext } from "./_FavoritesContext";




// export const useFavorites = () => {
//   const context = useContext(FavoritesContext);
//   if (!context){
//     throw new Error ('provider error ');
//   }
//   return context;
// };

export function FavoritesProvider({children}) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addToFavorites = useCallback ((recipe) => {
    setFavorites(prev => {
      if(!prev.some(fav => fav.idMeal === recipe.idMeal)){
        return [...prev, recipe];
      }
      return prev;
   });

  }, [setFavorites]);

  const removeFromFavorites = useCallback((recipeId) => {
    setFavorites(prev => prev.filter(recipe => recipe.idMeal !== recipeId));
  }, [setFavorites]);

  const isFavorite = useCallback ((recipeId) => {
    return favorites.some(recipe => recipe.idMeal === recipeId);
  }, [favorites]);

  const value = {favorites, addToFavorites, removeFromFavorites, isFavorite};

  return (
    < FavoritesContext.Provider value ={value}>
    {children}
    </FavoritesContext.Provider>
  );
};