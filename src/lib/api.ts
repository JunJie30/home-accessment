import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.themealdb.com/api/json/v1/1';

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

// Get all meals from all categories (optimized approach)
export const getAllMeals = async (): Promise<ProcessedMeal[]> => {
  try {
    
    // Strategy: Use fewer categories and fewer meals per category, but process in parallel
    const categories = ['Chicken', 'Seafood', 'Beef', 'Dessert']; // Reduced from 8 to 4 categories
    const mealsPerCategory = 6; // Reduced from 10 to 6 per category
    
    // Process all categories in parallel instead of sequentially
    const categoryPromises = categories.map(async (category) => {
      try {
        const response = await axios.get<MealsResponse>(`${API_BASE_URL}/filter.php?c=${category}`);
        
        if (response.data.meals) {
          // Take fewer meals but process them in parallel
          const basicMeals = response.data.meals.slice(0, mealsPerCategory);
          
          // Fetch all meal details for this category in parallel
          const mealPromises = basicMeals.map(basicMeal => getMealById(basicMeal.idMeal));
          const fullMeals = await Promise.allSettled(mealPromises);
          
          // Filter out any failed requests and return successful ones
          return fullMeals
            .filter((result): result is PromiseFulfilledResult<ProcessedMeal | null> => 
              result.status === 'fulfilled' && result.value !== null
            )
            .map(result => result.value as ProcessedMeal);
        }
        return [];
      } catch (error) {
        console.error(`Error fetching category ${category}:`, error);
        return [];
      }
    });

    // Wait for all categories to complete in parallel
    const categoryResults = await Promise.allSettled(categoryPromises);
    
    // Flatten all results
    const allMeals = categoryResults
      .filter((result): result is PromiseFulfilledResult<ProcessedMeal[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);

    return allMeals;
  } catch (error) {
    console.error('Error fetching all meals:', error);
    return [];
  }
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
  
  const processedTags = meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [];
  
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    tags: processedTags,
    youtube: meal.strYoutube,
    ingredients,
    source: meal.strSource,
  };
}; 