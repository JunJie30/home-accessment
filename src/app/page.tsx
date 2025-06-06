'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { 
  useAllMeals, 
  useSearchMeals, 
  useMealsByCategory 
} from '@/hooks/useRecipes';
import RecipeCard from '@/components/RecipeCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current parameters from URL
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  
  // Determine view mode - now supports both category AND search
  const viewMode = category && search ? 'both' : search ? 'search' : category ? 'category' : 'all';

  // Only fetch data for the current view mode
  const allMealsQuery = useAllMeals(viewMode === 'all');
  const searchQuery_result = useSearchMeals(viewMode === 'search' ? search : '');
  const categoryQuery = useMealsByCategory(viewMode === 'category' || viewMode === 'both' ? category : '');

  // Determine which data to show
  const getCurrentData = () => {
    switch (viewMode) {
      case 'search':
        return {
          data: searchQuery_result.data,
          isLoading: searchQuery_result.isLoading,
          error: searchQuery_result.error,
          refetch: searchQuery_result.refetch,
        };
      case 'category':
        return {
          data: categoryQuery.data,
          isLoading: categoryQuery.isLoading,
          error: categoryQuery.error,
          refetch: categoryQuery.refetch,
        };
      case 'both':
        // Filter category results by search term locally
        const filteredData = categoryQuery.data?.filter(meal => 
          meal.name.toLowerCase().includes(search.toLowerCase()) ||
          meal.ingredients.some(ingredient => 
            ingredient.name.toLowerCase().includes(search.toLowerCase())
          )
        );
        return {
          data: filteredData,
          isLoading: categoryQuery.isLoading,
          error: categoryQuery.error,
          refetch: categoryQuery.refetch,
        };
      default:
        return {
          data: allMealsQuery.data,
          isLoading: allMealsQuery.isLoading,
          error: allMealsQuery.error,
          refetch: allMealsQuery.refetch,
        };
    }
  };

  const { data: recipes, isLoading, error, refetch } = getCurrentData();

  // URL parameter update functions
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  const handleShowAll = () => {
    router.push('/');
  };

  const getResultsText = () => {
    if (!recipes) return '';
    
    const count = recipes.length;
    switch (viewMode) {
      case 'search':
        return `Found ${count} recipe${count !== 1 ? 's' : ''} for "${search}"`;
      case 'category':
        return `Showing ${count} recipe${count !== 1 ? 's' : ''} from ${category}`;
      case 'both':
        return `Found ${count} recipe${count !== 1 ? 's' : ''} for "${search}" in ${category}`;
      default:
        return `Explore our collection of ${count} delicious recipes`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Recipe Explorer Lite
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover delicious recipes from around the world
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onShowAll={handleShowAll}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading && <LoadingSkeleton count={12} />}
        
        {/* Error State */}
        {error && (
          <ErrorMessage 
            message="Failed to load recipes. Please check your internet connection and try again."
            onRetry={() => refetch()}
          />
        )}
        
        {/* Results */}
        {recipes && recipes.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {viewMode === 'search' ? 'Search Results' : 
                 viewMode === 'category' ? `${category} Recipes` : 
                 viewMode === 'both' ? `"${search}" in ${category}` :
                 'All Recipes'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {getResultsText()}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
        
        {/* No Results */}
        {recipes && recipes.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {viewMode === 'search' 
                ? `No recipes found for "${search}". Try a different search term.`
                : viewMode === 'category'
                ? `No recipes found in the ${category} category.`
                : viewMode === 'both'
                ? `No recipes found for "${search}" in the ${category} category. Try a different search term or category.`
                : 'No recipes available at the moment.'
              }
            </p>
            <button
              onClick={handleShowAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Show All Recipes
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
