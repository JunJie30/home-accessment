# Recipe Explorer Lite

A modern, responsive web application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** that allows users to explore and search through a vast collection of recipes from [TheMealDB API](https://www.themealdb.com/).

## ✨ Features

- **Comprehensive Recipe Browsing**: Explore a diverse collection of recipes from TheMealDB
- **Smart Search**: Real-time recipe search with debounced input and intelligent results
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and loading states
- **Performance Optimized**: Efficient data fetching with React Query caching and background updates
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Recipe Details**: Comprehensive recipe pages with ingredients, instructions, and nutritional info
- **Feedback System**: User feedback and rating system for recipes (demo implementation)
- **Error Handling**: Robust error boundaries with user-friendly retry mechanisms
- **Loading States**: Skeleton screens and progressive loading for optimal UX
- **Search Persistence**: URL-based search state management for shareable links

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **API**: TheMealDB API
- **Image Optimization**: Next.js Image component
- **Icons**: Heroicons
- **Deployment**: Vercel ready

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with search and results
│   └── recipe/[id]/       # Dynamic recipe detail pages
│       └── page.tsx       # Individual recipe page
├── components/            # Reusable UI components  
│   ├── RecipeCard.tsx     # Recipe card component
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

- **Intelligent Caching**: Recipes cached for 5-10 minutes to reduce API calls
- **Background Refetching**: Data automatically refreshed when stale
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Skeleton loaders provide smooth user experience
- **Query Invalidation**: Smart cache invalidation on data mutations

### API Integration

**TheMealDB API Endpoints Used:**
- `GET /search.php?s={name}` - Search recipes by name
- `GET /search.php?f={letter}` - Search recipes by first letter  
- `GET /lookup.php?i={id}` - Get detailed recipe by ID
- `GET /random.php` - Fetch random recipes (fallback)

### Custom Hooks

- `useAllMeals()` - Fetches comprehensive recipe collection
- `useSearchMeals(query)` - Searches recipes by name
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

## 🔍 Search Features

### Search Functionality
- **Real-time Search**: Debounced search with instant results
- **Minimum Query Length**: Search activates after 3 characters
- **Search Feedback**: Clear indication of search terms and results count

### Result Management
- **Smart State Management**: Separate states for all/search views
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

- **API Call Optimization**: Limited recipe fetching to avoid excessive API calls
- **Image Loading**: Uses Next.js Image optimization but depends on external CDN
- **Search Debouncing**: 500ms delay balances responsiveness with API efficiency

## 📝 Environment Variables

No environment variables are required for basic functionality. The application uses the public TheMealDB API endpoints.

Optional configuration:
```env
NEXT_PUBLIC_API_URL=https://www.themealdb.com/api/json/v1/1
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the comprehensive recipe API
- [Next.js](https://nextjs.org/) team for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) for powerful data synchronization
