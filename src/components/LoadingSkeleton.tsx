export default function LoadingSkeleton({ count = 12 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 