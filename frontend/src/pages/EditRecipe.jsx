import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config.js";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState("");
  const [servings, setServings] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement recette");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title || "");
        setCategory(data.category || "");
        setSteps(data.steps || "");
        setServings(data.servings ?? 1);
      })
      .catch((e) => {
        console.error(e);
        alert("Impossible de charger la recette.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/recipes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
        body: JSON.stringify({
          title,
          category,
          steps,
          servings: Number(servings),
        }),
      });

      if (!res.ok) throw new Error("Erreur modification " + res.status);

      alert("Recette modifiée ✅");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification.");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h2 className="page-title">Modifier une recette</h2>
        <p className="page-subtitle">Mets à jour les informations.</p>
      </header>

      <form className="recipe-card" onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Titre :
            <input
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Catégorie :
            <input
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <label>
            Étapes :
            <textarea
              rows={5}
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </label>

          <label>
            Portions :
            <input
              type="number"
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              min={1}
            />
          </label>

          <button className="btn-edit" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
