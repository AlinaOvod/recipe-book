import React, { createContext, useState, useEffect, useContext } from "react";
import { Meal } from "../types/global";
import { fetchMeals } from "../api";

interface RecipesContextType {
  recipes: Meal[];
  setRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const RecipesProvider: React.FC<Props> = ({ children }) => {
  const [recipes, setRecipes] = useState<Meal[]>([]);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      fetchMeals().then((data) => {
        setRecipes(data);
        localStorage.setItem("recipes", JSON.stringify(data));
      });
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};
