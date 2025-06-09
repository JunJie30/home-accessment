import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.themealdb.com/api/json/v1/1';

// Get all meals (simplified approach without categories)
export const getAllMeals = async (): Promise<ProcessedMeal[]> => {
  try {
    // Fetch popular meals by searching for common letters
    const letters = ['a', 'b', 'c', 'd', 'e'];
    const mealsPerLetter = 5;
    
    // Process all letters in parallel
    const letterPromises = letters.map(async (letter) => {
      try {
        const response = await axios.get<MealsResponse>(`${API_BASE_URL}/search.php?f=${letter}`);
        
        if (response.data.meals) {
          // Take fewer meals but process them in parallel
          const basicMeals = response.data.meals.slice(0, mealsPerLetter);
          
          // Process all meals (they already have full details from search endpoint)
          return basicMeals.map(meal => processMeal(meal));
        }
        return [];
      } catch (error) {
        console.error(`Error fetching meals starting with ${letter}:`, error);
        return [];
      }
    });

    // Wait for all letters to complete in parallel
    const letterResults = await Promise.allSettled(letterPromises);
    
    // Flatten all results
    const allMeals = letterResults
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