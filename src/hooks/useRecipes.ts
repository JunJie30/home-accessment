import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getMealById, 
  searchMealsByName, 
  getAllMeals,
  getCategories,
  getMealsByCategory,
} from '@/lib/api';

// Hook for fetching all meals
export const useAllMeals = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['allMeals'],
    queryFn: getAllMeals,
    enabled: enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for fetching meals by category
export const useMealsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['mealsByCategory', category],
    queryFn: () => getMealsByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a specific meal by ID
export const useMeal = (id: string) => {
  return useQuery({
    queryKey: ['meal', id],
    queryFn: () => getMealById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for searching meals by name
export const useSearchMeals = (searchTerm: string) => {
  return useQuery({
    queryKey: ['searchMeals', searchTerm],
    queryFn: () => searchMealsByName(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mock feedback submission (since we don't have a real backend)
const submitFeedback = async (feedback: FeedbackData): Promise<FeedbackResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success (in a real app, this would be an actual API call)
  console.log('Feedback submitted:', feedback);
  
  return {
    success: true,
    message: 'Thank you for your feedback! Your comment has been submitted successfully.',
  };
};

// Hook for submitting feedback
export const useFeedbackMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submitFeedback,
    onSuccess: (data, variables) => {
      // Optionally invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['meal', variables.recipeId] });
    },
  });
}; 