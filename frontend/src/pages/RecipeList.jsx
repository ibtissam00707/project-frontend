
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config.js";

const ITEMS_PER_PAGE = 5;

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

 useEffect(() => {
  fetch(`${API_URL}/api/recipes`)
    .then((res) => {
  if (!res.ok) {
    throw new Error("Erreur HTTP " + res.status);
  }
  return res.json();
})

    .then((data) => {
      const items = data["hydra:member"] ?? data.member ?? [];
      setRecipes(items);
      setError(null);
    })
    .catch((err) => {
      console.error(err);
      setError("Impossible de charger les recettes.");
    });
}, []);

  
 const handleDelete = async (id) => {
  const ok = window.confirm("Tu veux vraiment supprimer cette recette ?");
  if (!ok) return;

  try {
    const res = await fetch(`${API_URL}/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok && res.status !== 204) {
      throw new Error("Erreur suppression: " + res.status);
    }

    setRecipes((prev) => prev.filter((r) => r.id !== id));
  } catch (e) {
    console.error(e);
    alert("Suppression impossible. Vérifie le backend / console.");
  }
};

  if (error) {
    return (
      <div>
        <h2>Liste des recettes</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(recipes.length / ITEMS_PER_PAGE));
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visibleRecipes = recipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2>Liste des recettes</h2>

      {recipes.length === 0 && <p>Aucune recette pour l’instant.</p>}

      <ul>
        <div className="recipe-grid">
          {visibleRecipes.map((r) => (
            <article className="recipe-card" key={r.id}>
              <h3>{r.title}</h3>

              <div className="actions">
                {}
                <button className="btn-view" type="button">
                  Voir
                </button>

                <button className="btn-edit" type="button">
                  Modifier
                </button>

                {}
                <button
                  className="btn-delete"
                  type="button"
                  onClick={() => handleDelete(r.id)}
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      </ul>

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
