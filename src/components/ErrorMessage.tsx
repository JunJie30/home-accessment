import { Button } from '@/components/ui/button';

export default function ErrorMessage({ 
  message = "Something went wrong. Please try again.", 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          Try Again
        </Button>
      )}
    </div>
  );
} 