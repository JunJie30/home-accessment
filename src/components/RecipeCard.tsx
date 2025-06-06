import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCard({ recipe }: RecipeCardProps) {

  return (
    <Link 
      href={`/recipe/${recipe.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative aspect-square">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {recipe.area && (
          <div className="absolute top-2 right-2">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {recipe.area}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {recipe.name}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {recipe.category || 'Recipe'}
          </span>
          
          {recipe.tags && recipe.tags.length > 0 ? (
            <span className="text-xs">
              {recipe.tags.slice(0, 2).join(', ')}
            </span>
          ) : (
            <span className="text-xs text-gray-400">
              {recipe.ingredients.length} ingredients
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 