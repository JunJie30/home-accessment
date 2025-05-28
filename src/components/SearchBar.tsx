'use client';

import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useRecipes';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onShowAll: () => void;
  isLoading?: boolean;
}

export default function SearchBar({ 
  onSearch, 
  onCategoryFilter, 
  onShowAll, 
  isLoading = false 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: categories } = useCategories();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        onSearch(searchQuery);
      } else if (searchQuery.length === 0) {
        onShowAll();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch, onShowAll]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when filtering by category
    
    if (category === '') {
      onShowAll();
    } else {
      onCategoryFilter(category);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(''); // Clear category when searching
  };

  const clearAll = () => {
    setSearchQuery('');
    setSelectedCategory('');
    onShowAll();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Recipes
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search for recipes..."
              disabled={isLoading}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:w-64">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        {(searchQuery || selectedCategory) && (
          <div className="flex items-end">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium"
              disabled={isLoading}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Search Status */}
      {searchQuery && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Searching for: <span className="font-medium">&quot;{searchQuery}&quot;</span>
        </div>
      )}
      
      {selectedCategory && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing recipes from: <span className="font-medium">{selectedCategory}</span>
        </div>
      )}
    </div>
  );
} 