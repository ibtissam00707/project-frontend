
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config.js";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [displayServings, setDisplayServings] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetch(`${API_URL}/api/recipes`)

  
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de la recette");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setDisplayServings(data.servings || 1);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger la recette.");
      });
  }, [id]);

  
  useEffect(() => {
    fetch(`${API_URL}/api/recipes/${id}`)

      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des ingrédients");
        return res.json();
      })
      .then((data) => {
        
        setIngredients(data.member || []);
      })
      .catch((err) => {
        console.error(err);
        
        setIngredients([]);
      });
  }, [id]);

  if (error) {
    return (
      <div>
        <h1>Recettes</h1>
        <p style={{ color: "red" }}>{error}</p>
        <p>
          <Link to="/">Retour à la liste</Link>
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div>
        <h1>Recettes</h1>
        <p>Chargement...</p>
      </div>
    );
  }

  const baseServings = recipe.servings || 1;

  
  const getScaledQuantity = (quantity) => {
    if (!quantity) return "";
    const q = parseFloat(quantity);
    if (isNaN(q)) {
      
      return quantity;
    }
    const factor = displayServings / baseServings;
    const result = q * factor;
    
    return result % 1 === 0 ? result.toString() : result.toFixed(2);
  };

  const handleServingsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setDisplayServings(value);
    }
  };

  return (
    <div>
      <h1>Recettes</h1>

      <nav>
        <Link to="/">Accueil</Link> | <Link to="/add">Ajouter une recette</Link>
      </nav>

      <h2>{recipe.title}</h2>

      <p>Catégorie : {recipe.category}</p>

      <p>
        Portions :{" "}
        <input
          type="number"
          min="1"
          value={displayServings}
          onChange={handleServingsChange}
          style={{ width: "60px" }}
        />{" "}
        (base : {baseServings})
      </p>

      <h3>Ingrédients</h3>
      {ingredients.length === 0 ? (
        <p>Aucun ingrédient pour cette recette.</p>
      ) : (
        <ul>
          {ingredients.map((ing) => (
            <li key={ing.id}>
              {getScaledQuantity(ing.quantity)} {ing.unit} {ing.label}
            </li>
          ))}
        </ul>
      )}

      <h3>Étapes</h3>
      <pre>{recipe.steps}</pre>

      <p>
        <Link to="/">Retour à la liste</Link>
      </p>
    </div>
  );
}
