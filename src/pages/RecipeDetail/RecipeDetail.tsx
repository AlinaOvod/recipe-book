import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Meal } from '../../types/global';
import { useRecipes } from '../../context/Recipes';
import './RecipeDetail.css';  

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>(); 
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const { recipes } = useRecipes();

  useEffect(() => {
    if (id) {
      const recipe = recipes.find(res => res.idMeal === id);
      setSelectedRecipe(recipe || null);
    }
  }, [id, recipes]);

  if (!selectedRecipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <div className="recipe-content">
        <h2 className="recipe-title">{selectedRecipe.strMeal}</h2>
        <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="recipe-image" />
        <p className="recipe-category">Category: {selectedRecipe.strCategory}</p>
        <p className="recipe-area">Area: {selectedRecipe.strArea}</p>

        <div className="recipe-instructions">
          <h3>Instructions</h3>
          <p>{selectedRecipe.strInstructions}</p>
        </div>

        <div className="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {[...Array(20)].map((_, index) => {
              const ingredient = selectedRecipe[`strIngredient${index + 1}`];
              const measure = selectedRecipe[`strMeasure${index + 1}`];
              return ingredient && measure ? (
                <li key={index}>
                  {measure} of {ingredient}
                </li>
              ) : null;
            })}
          </ul>
        </div>

        <a href={selectedRecipe.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-video">
          Watch Recipe Video
        </a>
      </div>
    </div>
  );
};

export default RecipeDetail;
