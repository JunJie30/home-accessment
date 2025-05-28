import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Get all categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<CategoriesResponse>(`${API_BASE_URL}/categories.php`);
    return response.data.categories?.map((cat: Category) => cat.strCategory) || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get all meals from all categories (using diverse approach)
export const getAllMeals = async (): Promise<ProcessedMeal[]> => {
  try {
    const allMeals: ProcessedMeal[] = [];
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    
    // Fetch meals starting with different letters for diversity
    for (const letter of letters) {
      try {
        const meals = await searchMealsByLetter(letter);
        // Take first 3 meals from each letter to avoid too many API calls
        const limitedMeals = meals.slice(0, 3);
        allMeals.push(...limitedMeals);
        
        // Stop if we have enough meals
        if (allMeals.length >= 30) break;
      } catch (error) {
        console.error(`Error fetching meals for letter ${letter}:`, error);
      }
    }
    
    // If we don't have enough meals, supplement with random ones
    if (allMeals.length < 20) {
      const randomMeals = await getRandomMeals(20 - allMeals.length);
      allMeals.push(...randomMeals.filter(meal => !allMeals.find(m => m.id === meal.id)));
    }
    
    return allMeals;
  } catch (error) {
    console.error('Error fetching all meals:', error);
    return [];
  }
};

// Get random meals for the home page (keeping this for fallback)
export const getRandomMeals = async (count: number = 12): Promise<ProcessedMeal[]> => {
  const meals: ProcessedMeal[] = [];
  
  // Fetch multiple random meals
  for (let i = 0; i < count; i++) {
    try {
      const response = await axios.get<MealsResponse>(`${API_BASE_URL}/random.php`);
      if (response.data.meals && response.data.meals[0]) {
        const meal = processMeal(response.data.meals[0]);
        // Avoid duplicates
        if (!meals.find(m => m.id === meal.id)) {
          meals.push(meal);
        }
      }
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  }
  
  return meals;
};

// Get meal by ID
export const getMealById = async (id: string): Promise<ProcessedMeal | null> => {
  try {
    const response = await axios.get<MealsResponse>(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (response.data.meals && response.data.meals[0]) {
      return processMeal(response.data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching meal by ID:', error);
    throw error;
  }
};

// Search meals by name
export const searchMealsByName = async (name: string): Promise<ProcessedMeal[]> => {
  try {
    const response = await axios.get<MealsResponse>(`${API_BASE_URL}/search.php?s=${name}`);
    if (response.data.meals) {
      return response.data.meals.map(processMeal);
    }
    return [];
  } catch (error) {
    console.error('Error searching meals:', error);
    return [];
  }
};

// Search meals by first letter
export const searchMealsByLetter = async (letter: string): Promise<ProcessedMeal[]> => {
  try {
    const response = await axios.get<MealsResponse>(`${API_BASE_URL}/search.php?f=${letter}`);
    if (response.data.meals) {
      return response.data.meals.map(processMeal);
    }
    return [];
  } catch (error) {
    console.error('Error searching meals by letter:', error);
    return [];
  }
};

// Get meals by category
export const getMealsByCategory = async (category: string): Promise<ProcessedMeal[]> => {
  try {
    const response = await axios.get<MealsResponse>(`${API_BASE_URL}/filter.php?c=${category}`);
    if (response.data.meals) {
      // Filter endpoint returns basic info, fetch full details for first few
      const basicMeals = response.data.meals.slice(0, 12);
      const fullMeals: ProcessedMeal[] = [];
      
      for (const basicMeal of basicMeals) {
        try {
          const fullMeal = await getMealById(basicMeal.idMeal);
          if (fullMeal) {
            fullMeals.push(fullMeal);
          }
        } catch (error) {
          console.error(`Error fetching full meal details for ${basicMeal.idMeal}:`, error);
        }
      }
      
      return fullMeals;
    }
    return [];
  } catch (error) {
    console.error('Error fetching meals by category:', error);
    return [];
  }
};

// Process raw meal data into a cleaner format
const processMeal = (meal: Meal): ProcessedMeal => {
  const ingredients: Array<{ name: string; measure: string }> = [];
  
  // Extract ingredients and measurements
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }
  
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [],
    youtube: meal.strYoutube,
    ingredients,
    source: meal.strSource,
  };
}; 