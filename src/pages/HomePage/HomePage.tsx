import { useCallback, useEffect, useState } from "react";
import { Category, Meal } from "../../types/global";
import { Categories } from "../../components/Categories/Categories";
import "./HomePage.css";
import { fetchCategories } from "../../api";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import debounce from "lodash/debounce";
import { Pagination } from "../../components/Pagination/Pagination";
import { useRecipes } from "../../context/Recipes";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { recipes } = useRecipes();
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Meal[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [query, setQuery] = useState<string>('');
  const [localQuery, setLocalQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const recipesPerPage = 10;

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    handleFiltration(query, currentCategory);
  }, [query, recipes, currentCategory]); 

  const handleFiltration = (query: string, currentCategory: Category | null) => {
    let filtered = recipes;
    
    if (currentCategory) {
      filtered = filtered.filter(recipe => recipe.strCategory === currentCategory.strCategory);
    }

    if (query) {
      filtered = filtered.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleSelectCategory = (category: Category) => {
    setCurrentCategory(category);
  };

  const debouncedSetValue = useCallback(
    debounce((newValue: string) => {
      setQuery(newValue);
    }, 1000),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
    debouncedSetValue(event.target.value);
  }

  const onPageChange = (page:number) => {
    setCurrentPage(page);
  }

  const indexOfLastRecipe = (currentPage + 1) * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div className="homePage">
      {categories && (
        <Categories
          onChange={handleSelectCategory}
          categories={categories}
          current={currentCategory?.idCategory}
        />
      )}

      <div className="homePage-content">
        <div className="header-block">
        {currentCategory ? (
          <h1 className="title">Recipes by {currentCategory?.strCategory}</h1>
        ) : (
          <h1 className="title text-red-500">All Recipes</h1>
        )}
           <Link to={`/favorites`} className="favorites">
            Favorites
          </Link>
        </div>


        <div className="search-block">
          <input placeholder='Apple pie' onChange={handleInputChange} value={localQuery} type="text" className="search-input" />
        </div>
        <div className="recipes-container">
          {currentRecipes &&
            currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} meal={recipe} />
            ))}
        </div>

        <Pagination total={filteredRecipes.length} perPage={recipesPerPage} currentPage={currentPage} onPageChange={onPageChange}/>

      </div>
    </div>
  );
};
