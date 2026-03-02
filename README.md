
# 🍳 Recipe Discovery App

A modern, feature-rich React application that allows users to discover, search, and save their favorite recipes using TheMealDB API.

## 📋 Features

- **Browse Recipes by Category**: Explore various recipe categories fetched from TheMealDB API
- **Search Functionality**: Search for specific recipes by name with real-time results
- **Recipe Details**: View comprehensive information including ingredients, measurements, and instructions
- **Favorites Management**: Save and manage favorite recipes with persistent storage using localStorage
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during data fetching with custom spinners
- **Error Handling**: Graceful error messages for API failures or network issues

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router v6** - Navigation and routing
- **Context API** - Global state management for favorites
- **Custom Hooks** - Reusable logic for data fetching, favorites, and localStorage
- **CSS3** - Styling with responsive design principles
- **TheMealDB API** - Free recipe database

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xpieemma/Recipe-Discovery-react
   cd Recipe-Discovery-react
Install dependencies

bash
npm install
Start the development server

bash
npm start
Open your browser
Navigate to localhost to view the app

🏗️ Project Structure
text
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx     # Navigation bar with search
│   ├── RecipeCard.jsx # Recipe preview card
│   ├── SearchBar.jsx  # Search input component
│   ├── Spinner.jsx    # Loading indicator
│   └── ErrorMessage.jsx # Error display component
├── hooks/             # Custom React hooks
│   ├── useFavorites.js # Custom hook for consuming favorites context
│   ├── useFetch.js     # Data fetching logic with loading/error states
│   └── useLocalStorage.js # localStorage synchronization hook
├── context/           # React Context providers
│   ├── _FavoritesContext.js # Context creation (separate file)
│   └── FavoritesContext.jsx # Provider with favorites logic
├── pages/             # Page components
│   ├── HomePage.jsx        # Categories overview
│   ├── CategoryPage.jsx    # Recipes by category
│   ├── RecipeDetailPage.jsx # Single recipe view with favorites toggle
│   ├── FavoritesPage.jsx    # Saved recipes display
│   └── SearchResultsPage.jsx # Search results display
├── App.jsx            # Main app component with routing
└── index.js           # Entry point
🎯 Core Features Implementation
State Management
Local state with useState for component-specific data

Global state with Context API for favorites management

Custom hooks for reusable logic:

useFetch - Handles API calls with loading/error states

useLocalStorage - Persists data to browser storage

useFavorites - Provides clean access to favorites context

Favorites System Architecture
The most challenging aspect of this project was architecting the favorites system to properly separate concerns. After several iterations, I landed on a three-file structure:

text
src/
├── context/
│   ├── _FavoritesContext.js    # Pure context creation
│   └── FavoritesContext.jsx    # Provider with business logic
└── hooks/
    └── useFavorites.js         # Custom hook for consumption
Step 1: Pure Context Creation
javascript
// context/_FavoritesContext.js
import { createContext } from "react";
export const FavoritesContext = createContext();
Why separate?

The context object is just a container - it doesn't need logic

Can be imported anywhere without bringing in provider logic

Prevents circular dependency issues

Step 2: Provider with Business Logic
javascript
// context/FavoritesContext.jsx
import { useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FavoritesContext } from "./_FavoritesContext";

export function FavoritesProvider({children}) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  
  const addToFavorites = useCallback((recipe) => {
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

  const isFavorite = useCallback((recipeId) => {
    return favorites.some(recipe => recipe.idMeal === recipeId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{favorites, addToFavorites, removeFromFavorites, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
}
Step 3: Custom Hook for Clean Consumption
javascript
// hooks/useFavorites.js
import { useContext } from "react";
import { FavoritesContext } from "../context/_FavoritesContext";

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
Clean Component Consumption
javascript
// In any component
import { useFavorites } from '../hooks/useFavorites';

function RecipeDetailPage() {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favoriteStatus = isFavorite(recipeId);
  
  return (
    <button onClick={() => favoriteStatus ? removeFromFavorites(recipeId) : addToFavorites(recipe)}>
      {favoriteStatus ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}
Why This Architecture Works
Clear Separation of Responsibilities:

_FavoritesContext.js: Just creates the context container

FavoritesContext.jsx: Contains all the logic and provides the value

useFavorites.js: Provides a clean, safe API for components

Prevents Common React Context Pitfalls:

Error handling in useFavorites ensures developers get clear messages if they forget the Provider

useCallback wrappers prevent unnecessary re-renders

Splitting context creation from provider logic prevents circular dependencies

Data Fetching with useFetch
I created a generic useFetch hook rather than API-specific hooks for each endpoint:

javascript
// hooks/useFetch.js
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ... fetch logic
};

// Usage across components
const { data: categories } = useFetch(API_ENDPOINTS.categories);
const { data: recipes } = useFetch(API_ENDPOINTS.filterByCategory(category));
Why this decision?

Reusability: The same hook works for any API endpoint

Consistency: All data fetching behaves the same way across the app

Maintainability: Changes to error handling only need to be made in one place

Testability: The hook can be easily tested in isolation

Persistence with useLocalStorage
javascript
// hooks/useLocalStorage.js
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error('Error writing to localStorage:', err);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
};
Storing Complete Recipe Objects
I chose to store complete recipe objects in favorites rather than just IDs:

javascript
const [favorites, setFavorites] = useLocalStorage('favorites', []);
Benefits:

Favorites page renders immediately without additional API calls

Offline access to favorite recipes

Consistent display across sessions

Trade-offs considered:

Storage size: Storing full objects uses more localStorage space, but TheMealDB recipes are small

Data freshness: If recipe details change in API, favorites won't auto-update

Performance: No need for additional API calls when viewing favorites

Routing Structure
I created specialized page components rather than a single dynamic page:

javascript
// Explicit routes for clarity
<Route path="/" element={<HomePage />} />
<Route path="/category/:name" element={<CategoryPage />} />
<Route path="/recipe/:id" element={<RecipeDetailPage />} />
<Route path="/favorites" element={<FavoritesPage />} />
<Route path="/search" element={<SearchResultsPage />} />
Reasoning:

Separation of Concerns: Each page has a single responsibility

Code Readability: Immediately clear what each route renders

Performance: Code splitting becomes easier

Maintainability: Changes to one page don't affect others

🔗 API Reference
This app uses TheMealDB API endpoints:

Get all categories: https://www.themealdb.com/api/json/v1/1/categories.php

Filter by category: https://www.themealdb.com/api/json/v1/1/filter.php?c={category}

Lookup recipe by ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

Search by name: https://www.themealdb.com/api/json/v1/1/search.php?s={query}

📱 Responsive Design
The application is fully responsive with breakpoints at:

Mobile: 320px - 480px

Tablet: 481px - 768px

Desktop: 769px+

💭 Lessons Learned
Separation of Concerns at the File Level: Breaking down React features into multiple focused files makes the codebase more maintainable than one large file.

Custom Hooks for Consumption: Creating a dedicated hook for context consumption provides better error handling and a cleaner API.

useCallback is Essential: Without useCallback in the provider, every re-render creates new function instances, causing unnecessary child component re-renders.

Error Early, Error Clearly: The error in useFavorites catches provider usage mistakes immediately with a clear message, saving debugging time.

LocalStorage Limitations: localStorage has size limits (~5-10MB) and is synchronous, which can impact performance if not managed carefully.

API Design Matters: The structure of TheMealDB API influenced many design decisions. A well-designed API makes frontend development much smoother.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.



🙏 Acknowledgments
TheMealDB for providing the free recipe API

React for the amazing library

All contributors and users of this application

📧 Contact
LinkedIn: linkedin.com/in/epierr14

Project Link: https://github.com/xpieemma/Recipe-Discovery-react