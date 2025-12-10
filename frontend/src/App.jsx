import { Routes, Route, Link } from "react-router-dom";
import RecipeList from "./pages/RecipeList.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Recettes</h1>

      <nav>
        <Link to="/">Accueil</Link>{" | "}
        <Link to="/add">Ajouter une recette</Link>
      </nav>

      <h2>Liste des recettes</h2>

      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
    </div>
  );
}
