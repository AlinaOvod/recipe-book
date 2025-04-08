import { useContext } from 'react';
import './Favorites.css';  
import { StateContext } from '../../context/AppContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

export const Favorites = () => {
    const { favorites } = useContext(StateContext);

    const getIngredientsFromFavorites = () => {
      const ingredientCount: { [key: string]: number } = {};
  
      favorites.forEach((meal) => {
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          if (ingredient) {
            if (ingredientCount[ingredient]) {
              ingredientCount[ingredient] += 1;
            } else {
              ingredientCount[ingredient] = 1;
            }
          }
        }
      });
  
      const ingredients = Object.keys(ingredientCount).map((ingredient) => ({
        name: ingredient,
        count: ingredientCount[ingredient],
      }));
  
      return ingredients;
    };
  
    const ingredients = getIngredientsFromFavorites();

  return (
    <div className="favorites-page">
      <div className="favorites-recipes">
        <h2 className="recipe-title">Your favorites recipes</h2>
        {favorites.map((item) => <RecipeCard meal={item} />)}
      </div>
      <div className="favorites-ingridients">
        <div className="favorites-ing">
          <h3 className="ingridients"></h3>
        </div>
        <div className="favorites-ing">
          <h3 className="ingridients">
            Ingridients:
          </h3>
          <ul>
            {ingredients.map((item) => <li>{`${item.name}: ${item.count}`}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
