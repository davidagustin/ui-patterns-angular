import { Component } from '@angular/core';

interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
}

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  sortBy: 'newest' | 'oldest' | 'popular' = 'newest';
  selectedCategory: string = 'all';

  articles: Article[] = [
    {
      id: 1,
      title: 'Building Scalable React Applications with Modern Architecture',
      summary: 'Learn how to structure large React applications using modern patterns like component composition, custom hooks, and state management solutions.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['React', 'Architecture', 'JavaScript'],
      likes: 245,
      comments: 18
    },
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      summary: 'Explore the emerging technologies and frameworks that are shaping the future of web development, from AI-powered tools to edge computing.',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Trends',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTA5OTgxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['Web Development', 'AI', 'Trends'],
      likes: 189,
      comments: 24
    },
    {
      id: 3,
      title: 'Mastering CSS Grid: Advanced Layout Techniques',
      summary: 'Deep dive into CSS Grid with practical examples and advanced techniques for creating complex, responsive layouts with clean code.',
      author: 'Emily Johnson',
      date: '2024-01-10',
      readTime: '15 min read',
      category: 'CSS',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjU5RTBCIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['CSS', 'Grid', 'Layout'],
      likes: 312,
      comments: 31
    },
    {
      id: 4,
      title: 'TypeScript Best Practices for Enterprise Applications',
      summary: 'Comprehensive guide to using TypeScript effectively in large-scale applications, covering type safety, performance, and maintainability.',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'TypeScript',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['TypeScript', 'Enterprise', 'Best Practices'],
      likes: 156,
      comments: 12
    },
    {
      id: 5,
      title: 'Building Accessible Web Components with ARIA',
      summary: 'Learn how to create web components that work for everyone by implementing proper ARIA attributes and accessibility best practices.',
      author: 'Lisa Wang',
      date: '2024-01-05',
      readTime: '11 min read',
      category: 'Accessibility',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRUY0NDQ0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['Accessibility', 'ARIA', 'Web Components'],
      likes: 203,
      comments: 16
    },
    {
      id: 6,
      title: 'Performance Optimization Strategies for Modern Web Apps',
      summary: 'Practical techniques for optimizing web application performance, including code splitting, lazy loading, and efficient state management.',
      author: 'Alex Thompson',
      date: '2024-01-03',
      readTime: '13 min read',
      category: 'Performance',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjM2NkYxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['Performance', 'Optimization', 'Web Apps'],
      likes: 278,
      comments: 22
    }
  ];

  categories = ['all', 'React', 'CSS', 'TypeScript', 'Trends', 'Accessibility', 'Performance'];

  get sortedArticles(): Article[] {
    const filtered = this.selectedCategory === 'all' 
      ? this.articles 
      : this.articles.filter(article => article.category === this.selectedCategory);
    
    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  }

  setSortBy(sortBy: 'newest' | 'oldest' | 'popular'): void {
    this.sortBy = sortBy;
  }

  setSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  get htmlCode(): string {
    return `<div class="space-y-8">
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      📰 Article List Pattern
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Display articles and blog posts in an organized, scannable list with filtering, sorting, and rich metadata.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Interactive Example -->
    <div class="space-y-6">
      <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 class="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
          🎯 Interactive Example
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Browse through articles with different sorting options and category filters.
        </p>
        
        <!-- Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
            <select
              [value]="sortBy"
              (change)="setSortBy($any($event.target).value)"
              class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
            <select
              [value]="selectedCategory"
              (change)="setSelectedCategory($any($event.target).value)"
              class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800">
              <option *ngFor="let category of categories" [value]="category">
                {{ category === 'all' ? 'All Categories' : category }}
              </option>
            </select>
          </div>
        </div>

        <!-- Article List -->
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <article *ngFor="let article of sortedArticles" 
                   class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div class="flex">
              <img
                [src]="article.image"
                [alt]="article.title"
                class="w-24 h-24 object-cover flex-shrink-0">
              <div class="p-4 flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 pr-2">
                    {{ article.title }}
                  </h3>
                  <span class="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full flex-shrink-0">
                    {{ article.category }}
                  </span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {{ article.summary }}
                </p>
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div class="flex items-center space-x-3">
                    <span class="font-medium">{{ article.author }}</span>
                    <span>{{ formatDate(article.date) }}</span>
                    <span>{{ article.readTime }}</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>{{ article.likes }}</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{{ article.comments }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="space-y-6">
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <app-code-tabs 
          [htmlCode]="htmlCode" 
          [scssCode]="scssCode" 
          [typescriptCode]="typescriptCode"
          title="Code Example">
        </app-code-tabs>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* This Angular component uses SCSS with CSS variables for styling */
/* Custom SCSS provides maintainable, scalable styles with proper design tokens */

/* Key SCSS features used for the Article List pattern: */

/* Container and Layout */
/* space-y-8 - Vertical spacing between sections */
/* grid grid-cols-1 lg:grid-cols-2 gap-8 - Responsive two-column layout */

/* Header */
/* text-3xl font-bold - Large title styling */
/* bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent - Gradient text */
/* text-lg text-gray-600 dark:text-gray-400 - Subtitle styling with dark mode */

/* Interactive Example Container */
/* bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 - Gradient background */
/* rounded-xl p-6 - Rounded container with padding */
/* border border-blue-200 dark:border-blue-800 - Border with dark mode variant */

/* Controls */
/* flex flex-col sm:flex-row gap-4 - Responsive flex layout */
/* px-3 py-1 border border-gray-300 dark:border-gray-600 rounded - Select styling */
/* bg-white dark:bg-gray-800 - Background with dark mode */

/* Article List */
/* space-y-4 - Vertical spacing between articles */
/* max-h-96 overflow-y-auto - Scrollable container */

/* Article Cards */
/* bg-white dark:bg-gray-800 - Card background */
/* rounded-lg border border-gray-200 dark:border-gray-700 - Card styling */
/* hover:shadow-md transition-shadow - Hover effects */

/* Article Layout */
/* flex - Horizontal layout for image and content */
/* w-24 h-24 object-cover flex-shrink-0 - Fixed size image */
/* p-4 flex-1 - Padded flexible content area */

/* Article Content */
/* font-semibold text-gray-900 dark:text-gray-100 - Title styling */
/* line-clamp-2 - Text truncation after 2 lines */
/* text-xs text-blue-600 dark:text-blue-400 - Category badge text */
/* bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full - Category badge */

/* Article Meta */
/* flex items-center justify-between - Layout for meta information */
/* space-x-3 - Horizontal spacing between elements */
/* text-xs text-gray-500 dark:text-gray-400 - Meta text styling */

/* Typography Scale */
/* text-3xl - 30px (48px line-height) */
/* text-xl - 20px (28px line-height) */
/* text-lg - 18px (28px line-height) */
/* text-sm - 14px (20px line-height) */
/* text-xs - 12px (16px line-height) */

/* Spacing Scale */
/* space-y-8 - 32px vertical spacing */
/* gap-8 - 32px grid gap */
/* gap-4 - 16px gap */
/* p-6 - 24px padding */
/* p-4 - 16px padding */
/* mb-6 - 24px bottom margin */
/* mb-4 - 16px bottom margin */

/* Color System */
/* Gray scale for neutral content */
/* Blue for primary actions and highlights */
/* Purple for gradients and accents */
/* All colors have dark mode variants */

/* Responsive Design */
/* sm: - Small screens (640px+) */
/* lg: - Large screens (1024px+) */
/* All layouts automatically adapt */

/* Dark Mode Support */
/* dark: prefix enables automatic dark mode */
/* System preference based switching */
/* Consistent contrast ratios maintained */

/* Benefits of SCSS approach: */
/* - Consistent design system */
/* - Built-in responsive behavior */
/* - Automatic dark mode support */
/* - No custom CSS maintenance needed */
/* - Smaller bundle size */
/* - Easy to scan and understand */`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
}

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  sortBy: 'newest' | 'oldest' | 'popular' = 'newest';
  selectedCategory: string = 'all';

  articles: Article[] = [
    {
      id: 1,
      title: 'Building Scalable React Applications with Modern Architecture',
      summary: 'Learn how to structure large React applications using modern patterns.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['React', 'Architecture', 'JavaScript'],
      likes: 245,
      comments: 18
    },
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      summary: 'Explore the emerging technologies and frameworks.',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Trends',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTA5OTgxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+CjxzdmcvPgo=',
      tags: ['Web Development', 'AI', 'Trends'],
      likes: 189,
      comments: 24
    }
    // ... more articles
  ];

  categories = ['all', 'React', 'CSS', 'TypeScript', 'Trends', 'Accessibility', 'Performance'];

  get sortedArticles(): Article[] {
    const filtered = this.selectedCategory === 'all' 
      ? this.articles 
      : this.articles.filter(article => article.category === this.selectedCategory);
    
    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  }

  setSortBy(sortBy: 'newest' | 'oldest' | 'popular'): void {
    this.sortBy = sortBy;
  }

  setSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}`;
  }
}