// src/pages/RecipeList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config.js";

const ITEMS_PER_PAGE = 5;

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/recipes`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        setRecipes(data.member || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les recettes.");
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>Recettes</h1>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/add">Ajouter une recette</Link>
        </nav>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // Pagination côté client
  const totalPages = Math.max(1, Math.ceil(recipes.length / ITEMS_PER_PAGE));
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visibleRecipes = recipes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h1>Recettes</h1>

      <nav>
        <Link to="/">Accueil</Link> | <Link to="/add">Ajouter une recette</Link>
      </nav>

      <h2>Liste des recettes</h2>

      <ul>
        {visibleRecipes.map((r) => (
          <li key={r.id}>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "15px" }}>
          <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
            Précédent
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
