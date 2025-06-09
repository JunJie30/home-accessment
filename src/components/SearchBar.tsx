'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onShowAll: () => void;
  isLoading?: boolean;
}

function SearchBarInner({ 
  onSearch, 
  onShowAll, 
  isLoading = false 
}: SearchBarProps) {
  const searchParams = useSearchParams();
  
  // Get current values from URL params
  const urlSearch = searchParams.get('search') || '';
  
  // Local state synced with URL params
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  
  // Track if the search change came from user input or URL sync
  const [isUserInput, setIsUserInput] = useState(false);

  // Sync local state with URL params when they change
  useEffect(() => {
    setSearchQuery(urlSearch);
    setIsUserInput(false); // Mark as URL sync, not user input
  }, [urlSearch]);

  // Debounce search - only trigger for user input, not URL syncing
  useEffect(() => {
    if (!isUserInput) return; // Don't trigger for URL syncing
    
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        onSearch(searchQuery);
      } else if (searchQuery.length === 0 && urlSearch) {
        // If user cleared search, show all
        onShowAll();
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [searchQuery, isUserInput, onSearch, onShowAll, urlSearch]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setIsUserInput(true); // Mark as user input
  };

  const clearSearch = () => {
    setSearchQuery('');
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
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Status */}
      {searchQuery && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Searching for: <span className="font-medium">&quot;{searchQuery}&quot;</span>
        </div>
      )}
    </div>
  );
}

function SearchBarFallback({ isLoading }: { isLoading?: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search for recipes..."
              disabled={isLoading}
              value=""
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense fallback={<SearchBarFallback isLoading={props.isLoading} />}>
      <SearchBarInner {...props} />
    </Suspense>
  );
} 