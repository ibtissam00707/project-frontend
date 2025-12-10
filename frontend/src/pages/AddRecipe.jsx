// frontend/src/pages/AddRecipe.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config.js";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState("");
  const [servings, setServings] = useState(1);

  const [ingredients, setIngredients] = useState([
    { label: "", quantity: "", unit: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // changement valeur d'un champ ingrédient
  function handleIngredientChange(index, field, value) {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  // ajouter une ligne d’ingrédient
  function addIngredientField() {
    setIngredients((prev) => [...prev, { label: "", quantity: "", unit: "" }]);
  }

  // supprimer une ligne d’ingrédient
  function removeIngredientField(index) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  // soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1) Création de la recette
      const recipeRes = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          steps: steps ? steps.split("\n") : [], // textarea → array
          servings: Number(servings),
        }),
      });

      if (!recipeRes.ok) {
        const txt = await recipeRes.text();
        console.error("Erreur création recette :", txt);
        throw new Error("Erreur lors de la création de la recette");
      }

      const recipeData = await recipeRes.json();
      console.log("Recette créée :", recipeData);

      // récupération de l'id de la recette (id ou @id)
      let recipeId = recipeData.id;
      if (!recipeId && recipeData["@id"]) {
        recipeId = recipeData["@id"].split("/").pop();
      }

      if (!recipeId) {
        throw new Error("Impossible de récupérer l'id de la recette créée");
      }

      // 2) Création des ingrédients liés à la recette
      const ingredientsToSend = ingredients.filter(
        (ing) => ing.label.trim() !== ""
      );

      if (ingredientsToSend.length > 0) {
        const promises = ingredientsToSend.map(async (ing) => {
          const res = await fetch(
            `${API_URL}/recipes/${recipeId}/ingredients`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                label: ing.label,
                unit: ing.unit,
                quantity: Number(ing.quantity) || 0,
              }),
            }
          );

          console.log(
            "POST /recipes/" + recipeId + "/ingredients status =",
            res.status
          );

          if (!res.ok) {
            const txt = await res.text();
            console.error("Erreur création ingrédient :", txt);
            throw new Error("Erreur lors de la création d'un ingrédient");
          }

          return res.json();
        });

        await Promise.all(promises);
      }

      alert("Recette ajoutée !");
      navigate("/"); // retour à la liste
    } catch (error) {
      console.error(error);
      alert(
        "Erreur lors de l'ajout de la recette ou de ses ingrédients. Vérifie la console et le backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Recettes</h1>

      <nav>
        <Link to="/">Accueil</Link> | <span>Ajouter une recette</span>
      </nav>

      <h2>Ajouter une recette</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Titre :
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Catégorie :
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Étapes :
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder={"Étape 1\nÉtape 2\nÉtape 3"}
            />
          </label>
        </div>

        <div>
          <label>
            Portions :
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </label>
        </div>

        <h3>Ingrédients</h3>
        {ingredients.map((ing, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <input
              type="text"
              placeholder="Nom"
              value={ing.label}
              onChange={(e) =>
                handleIngredientChange(index, "label", e.target.value)
              }
              style={{ marginRight: "4px", width: "160px" }}
            />
            <input
              type="number"
              placeholder="Quantité"
              value={ing.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              style={{ marginRight: "4px", width: "80px" }}
            />
            <input
              type="text"
              placeholder="Unité"
              value={ing.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
              style={{ marginRight: "4px", width: "80px" }}
            />
            {ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
              >
                Supprimer
              </button>
            )}
          </div>
        ))}

        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={addIngredientField}>
            + Ajouter un ingrédient
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "En cours..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
