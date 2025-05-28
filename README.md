# Recipe Explorer Lite

A lightweight recipe browsing application built with Next.js 15, TypeScript, Tailwind CSS, and React Query. Browse delicious recipes from around the world and share your feedback!

## 🚀 Features

- **Comprehensive Recipe Browsing**: Explore recipes from all categories in TheMealDB
- **Advanced Search**: Search recipes by name with real-time results
- **Category Filtering**: Filter recipes by cuisine categories (Beef, Chicken, Dessert, etc.)
- **Recipe Details**: View comprehensive recipe information including ingredients, instructions, and cooking videos
- **Feedback System**: Submit reviews and ratings for recipes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark/light theme based on system preferences
- **Loading States**: Smooth loading skeletons and error handling
- **Modern UI**: Clean, accessible interface with smooth animations
- **Centralized Type System**: Well-organized TypeScript types for maintainability

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with centralized type definitions
- **Styling**: Tailwind CSS with custom utilities
- **Data Fetching**: React Query (@tanstack/react-query) with intelligent caching
- **HTTP Client**: Axios
- **API**: TheMealDB (https://www.themealdb.com/api.php)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with search and recipe grid
│   ├── providers.tsx      # React Query provider setup
│   ├── recipe/[id]/       # Dynamic recipe detail pages
│   └── globals.css        # Global styles and utilities
├── components/            # Reusable UI components
│   ├── RecipeCard.tsx     # Recipe card component
│   ├── FeedbackForm.tsx   # Recipe feedback form
│   ├── SearchBar.tsx      # Search and filter component
│   ├── LoadingSkeleton.tsx # Loading state component
│   └── ErrorMessage.tsx   # Error state component
├── hooks/                 # Custom React Query hooks
│   └── useRecipes.ts      # Recipe data fetching hooks
├── lib/                   # Utility functions and API
│   └── api.ts             # TheMealDB API integration
└── types/                 # Centralized type definitions
    └── common.d.ts        # All TypeScript interfaces and types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-explorer-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Data Fetching Approach

### React Query Implementation

The application uses React Query for efficient data fetching, caching, and state management:

- **Intelligent Caching**: Recipes cached for 5-10 minutes, categories for 30 minutes
- **Background Refetching**: Data automatically refreshed when stale
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Skeleton loaders provide smooth user experience
- **Query Invalidation**: Smart cache invalidation on data mutations

### API Integration

**TheMealDB API Endpoints Used:**
- `GET /categories.php` - Fetch all recipe categories
- `GET /filter.php?c={category}` - Get recipes by category
- `GET /search.php?s={name}` - Search recipes by name
- `GET /search.php?f={letter}` - Search recipes by first letter
- `GET /lookup.php?i={id}` - Get detailed recipe by ID
- `GET /random.php` - Fetch random recipes (fallback)

### Custom Hooks

- `useAllMeals()` - Fetches comprehensive recipe collection
- `useCategories()` - Fetches available recipe categories
- `useMealsByCategory(category)` - Fetches recipes from specific category
- `useSearchMeals(query)` - Searches recipes by name
- `useSearchMealsByLetter(letter)` - Searches recipes by first letter
- `useMeal(id)` - Fetches detailed recipe information
- `useFeedbackMutation()` - Handles feedback form submissions

## 🎨 Design Decisions

### UI/UX Choices

- **Search-First Design**: Prominent search bar with real-time filtering
- **Card-based Layout**: Easy scanning of recipe options
- **Responsive Grid**: Adapts from 1 column (mobile) to 4 columns (desktop)
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML
- **Visual Feedback**: Clear loading states and search result indicators

### Performance Optimizations

- **Image Optimization**: Next.js Image component with proper sizing and domains
- **Code Splitting**: Automatic route-based code splitting
- **Caching Strategy**: React Query handles intelligent caching with stale-while-revalidate
- **Loading Strategies**: Skeleton screens prevent layout shift
- **Debounced Search**: 500ms debounce to reduce API calls during typing

### Type Safety

- **Centralized Types**: All interfaces and types in `src/types/common.d.ts`
- **API Type Safety**: Proper typing for all API responses
- **Component Props**: Strongly typed component interfaces
- **Hook Return Types**: Explicit return type definitions

## 🔍 Search & Filter Features

### Search Functionality
- **Real-time Search**: Debounced search with instant results
- **Minimum Query Length**: Search activates after 3 characters
- **Search Feedback**: Clear indication of search terms and results count

### Category Filtering
- **Dynamic Categories**: Categories loaded from API
- **Exclusive Filtering**: Category filter clears search and vice versa
- **Clear All**: Easy reset to show all recipes

### Result Management
- **Smart State Management**: Separate states for all/search/category views
- **No Results Handling**: Helpful messages and suggestions
- **Result Counts**: Clear indication of how many recipes found

## 🔮 Future Enhancements

- **Advanced Filters**: Filter by ingredients, cooking time, difficulty
- **Favorites System**: Save favorite recipes locally with localStorage
- **Recipe Collections**: Create custom recipe collections
- **User Authentication**: Personal recipe collections and preferences
- **Recipe Sharing**: Social sharing capabilities
- **Offline Support**: PWA features for offline browsing
- **Recipe Ratings**: Display average ratings from community feedback
- **Ingredient Shopping Lists**: Generate shopping lists from recipes

## 🐛 Known Issues & Assumptions

### Assumptions Made

1. **API Reliability**: TheMealDB API is assumed to be stable and available
2. **Image Availability**: All recipe images from the API are assumed to be accessible
3. **Feedback Storage**: Feedback is currently mocked (console logged) - would need backend integration
4. **Browser Support**: Modern browsers with ES2017+ support
5. **API Rate Limits**: No explicit rate limiting implemented (relies on browser/network limits)

### Current Limitations

- **Feedback Persistence**: Reviews are not actually stored (demo implementation)
- **Advanced Search**: No search by ingredients or nutritional information
- **Rate Limiting**: No rate limiting implemented for API calls
- **Offline Support**: No offline caching or PWA features
- **User Accounts**: No user authentication or personalization

### Performance Considerations

- **API Call Optimization**: Limited to 8 recipes per category to avoid excessive API calls
- **Image Loading**: Uses Next.js Image optimization but depends on external CDN
- **Search Debouncing**: 500ms delay balances responsiveness with API efficiency

## 📝 Environment Variables

No environment variables are required for basic functionality. The app uses the public TheMealDB API.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the free recipe API
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) for powerful data fetching capabilities
# home-accessment
