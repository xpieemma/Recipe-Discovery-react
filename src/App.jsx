import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./context/FavoritesContext";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <>
      <Router>
        <FavoritesProvider>
          <div className="App">
            <Navbar />
            <main className="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/category/:categoryName"
                  element={<CategoryPage />}
                />
                <Route
                  path="/recipe/:recipeId"
                  element={<RecipeDetailPage />}
                />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </Router>
    </>
  );
}

export default App;
