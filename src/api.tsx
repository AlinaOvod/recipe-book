export const fetchMeals = async () => {
  const allRecipes = [];

  for (const char of 'abcdefghijklmnopqrstuvwxyz') {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
    const data = await res.json();
    if (data.meals) {
      allRecipes.push(...data.meals);
    }
  }
  return allRecipes;
};

export const fetchCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  console.log(data)
  return data.categories;
};