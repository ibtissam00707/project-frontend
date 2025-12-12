import { Link, Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import "./styles.css";
import EditRecipe from "./pages/EditRecipe.jsx";


export default function App() {
  return (
    <>
      <header>
  <h1>Recettes</h1>
  <nav>
    <Link to="/">Liste</Link>
    <Link to="/add">Ajouter</Link>
  </nav>
</header>
      <main className="container">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />

        </Routes>
      </main>

      <footer>
        Projet React – Gestion des recettes
      </footer>
    </>
  );
}
