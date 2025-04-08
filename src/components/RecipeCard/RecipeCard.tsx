import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Meal } from "../../types/global";
import "./RecipeCard.css";
import { Heart } from "lucide-react";
import { DispatchContext, StateContext } from "../../context/AppContext";
import classNames from "classnames";

interface RecipeCardProps {
  meal: Meal;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const dispatch = useContext(DispatchContext);
  const { favorites } = useContext(StateContext);
  const isFav = favorites.find(fav => fav.idMeal === meal.idMeal);

  const handleClick = (meal: Meal) => {
    if (!isFav) {
      dispatch({ type: 'ADD_FAV', payload: meal });
    } else {
      dispatch({ type: 'REMOVE_FAV', payload: meal.idMeal });
    }
  };
  return (
    <div className="recipe-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="recipe-info">
        <div className="recipe-text">
          <h3 className="recipe-title">{meal.strMeal}</h3>
          <p>
            <strong>Category:</strong> {!!meal.strCategory || "-"}
          </p>
          <p>
            <strong>Area:</strong> {!!meal.strArea || "-"}
          </p>
          {meal.strInstructions && (
            <p>{meal?.strInstructions?.slice(0, 100)}...</p>
          )}
        </div>
        <div className="action-buttons">
          <Link to={`/recipe/${meal.idMeal}`} className="view-recipe">
            View Full Recipe
          </Link>
          <button className={classNames("fav-button", {active : isFav})} onClick={() => handleClick(meal)}>
            <Heart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
