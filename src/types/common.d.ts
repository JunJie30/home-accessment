// API Response Types from TheMealDB
type Meal = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

type MealsResponse = {
  meals: Meal[] | null;
}

// Processed/Clean Types for Application Use
type Ingredient = {
  name: string;
  measure: string;
}

type ProcessedMeal = {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  tags: string[];
  youtube?: string;
  ingredients: Ingredient[];
  source?: string;
}

// Component Props Types
type RecipeCardProps = {
  recipe: ProcessedMeal;
}

type FeedbackFormProps = {
  recipeId: string;
  recipeName: string;
}

type LoadingSkeletonProps = {
  count?: number;
}

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
}

// Form Data Types
type FeedbackData = {
  recipeId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
}

type FeedbackFormData = {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

// API Response Types
type FeedbackResponse = {
  success: boolean;
  message: string;
}

// Hook Return Types
type UseRandomMealsResult = {
  data: ProcessedMeal[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

type UseMealResult = {
  data: ProcessedMeal | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

type UseFeedbackMutationResult = {
  mutateAsync: (feedback: FeedbackData) => Promise<FeedbackResponse>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: FeedbackResponse;
}

// Utility Types
type RecipeId = string;
type Rating = 1 | 2 | 3 | 4 | 5;

// Search and Filter Types (for future use)
type SearchFilters = {
  area?: string;
  ingredient?: string;
}

type SearchParams = {
  query?: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
}

// Navigation Types
type BreadcrumbItem = {
  label: string;
  href: string;
}

// Theme Types
type Theme = 'light' | 'dark' | 'system';

// Status Types
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
type MutationState = 'idle' | 'pending' | 'success' | 'error'; 