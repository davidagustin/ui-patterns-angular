import { Component } from '@angular/core';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  rating: number;
  tags: string[];
}

@Component({
  selector: 'app-adaptable-view',
  templateUrl: './adaptable-view.component.html',
  styleUrls: ['./adaptable-view.component.scss']
})
export class AdaptableViewComponent {
  viewMode: 'grid' | 'list' | 'card' = 'grid';

  content: ContentItem[] = [
    {
      id: 1,
      title: 'Smart Home Security System',
      description: 'Complete IoT security solution with AI-powered monitoring, mobile alerts, and 24/7 cloud recording for your peace of mind.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Technology',
      price: '$299.99',
      rating: 4.8,
      tags: ['Smart Home', 'Security', 'IoT']
    },
    {
      id: 2,
      title: 'Ergonomic Office Chair',
      description: 'Premium ergonomic design with lumbar support, adjustable height, and breathable mesh fabric for all-day comfort.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Furniture',
      price: '$449.99',
      rating: 4.6,
      tags: ['Office', 'Ergonomic', 'Comfort']
    },
    {
      id: 3,
      title: 'Wireless Noise-Canceling Headphones',
      description: 'Studio-quality sound with active noise cancellation, 30-hour battery life, and premium build quality.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Audio',
      price: '$199.99',
      rating: 4.9,
      tags: ['Audio', 'Wireless', 'Premium']
    },
    {
      id: 4,
      title: 'Organic Coffee Subscription',
      description: 'Freshly roasted organic coffee beans delivered monthly from sustainable farms around the world.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Food & Beverage',
      price: '$24.99/month',
      rating: 4.7,
      tags: ['Coffee', 'Organic', 'Subscription']
    },
    {
      id: 5,
      title: 'Fitness Tracking Smartwatch',
      description: 'Advanced health monitoring with GPS, heart rate tracking, sleep analysis, and 7-day battery life.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Fitness',
      price: '$349.99',
      rating: 4.5,
      tags: ['Fitness', 'Health', 'Smartwatch']
    },
    {
      id: 6,
      title: 'Portable Solar Power Bank',
      description: 'High-capacity solar charger with multiple USB ports, weatherproof design, and emergency LED flashlight.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Electronics',
      price: '$89.99',
      rating: 4.4,
      tags: ['Solar', 'Portable', 'Eco-friendly']
    }
  ];

  setViewMode(mode: 'grid' | 'list' | 'card'): void {
    this.viewMode = mode;
  }

  renderStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? '★' : '☆');
  }

  get htmlCode(): string {
    return `<div class="space-y-8">
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      📱 Adaptable View Pattern
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Allow users to switch between different content layouts (grid, list, card) to match their viewing preferences and context.
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
          Switch between different view modes to see how the same content adapts to different layouts.
        </p>
        
        <!-- View Mode Selector -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              (click)="setViewMode('grid')"
              [class]="'px-3 py-2 rounded-md text-sm font-medium transition-colors ' + 
                       (viewMode === 'grid' 
                         ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                         : 'text-gray-600 dark:text-gray-400')">
              <span class="mr-2">⚏</span>Grid
            </button>
            <button
              (click)="setViewMode('list')"
              [class]="'px-3 py-2 rounded-md text-sm font-medium transition-colors ' +
                       (viewMode === 'list' 
                         ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                         : 'text-gray-600 dark:text-gray-400')">
              <span class="mr-2">☰</span>List
            </button>
            <button
              (click)="setViewMode('card')"
              [class]="'px-3 py-2 rounded-md text-sm font-medium transition-colors ' +
                       (viewMode === 'card' 
                         ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                         : 'text-gray-600 dark:text-gray-400')">
              <span class="mr-2">▭</span>Card
            </button>
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ content.length }} items
          </span>
        </div>

        <!-- Content Display -->
        <div [ngClass]="{
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4': viewMode === 'grid',
          'space-y-2': viewMode === 'list',
          'grid grid-cols-1 gap-6': viewMode === 'card'
        }" class="transition-all duration-300">
          
          <div *ngFor="let item of content"
               [ngClass]="{
                 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md': viewMode === 'grid',
                 'flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700': viewMode === 'list',
                 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg': viewMode === 'card'
               }" class="transition-all duration-200">
            
            <!-- Grid View -->
            <div *ngIf="viewMode === 'grid'" class="p-4">
              <img [src]="item.image" [alt]="item.title" class="w-full h-32 object-cover rounded-md mb-3">
              <h3 class="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                {{ item.title }}
              </h3>
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {{ item.description }}
              </p>
              <div class="flex items-center justify-between">
                <span class="font-semibold text-sm text-green-600">{{ item.price }}</span>
                <div class="flex items-center">
                  <span *ngFor="let star of renderStars(item.rating)" 
                        [class]="star === '★' ? 'text-yellow-400' : 'text-gray-300'" 
                        class="text-sm">{{ star }}</span>
                  <span class="ml-1 text-xs text-gray-500">({{ item.rating }})</span>
                </div>
              </div>
            </div>

            <!-- List View -->
            <ng-container *ngIf="viewMode === 'list'">
              <img [src]="item.image" [alt]="item.title" class="w-12 h-12 object-cover rounded-md flex-shrink-0">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {{ item.category }}
                </p>
              </div>
              <div class="flex items-center space-x-3 flex-shrink-0">
                <div class="flex items-center">
                  <span *ngFor="let star of renderStars(item.rating)" 
                        [class]="star === '★' ? 'text-yellow-400' : 'text-gray-300'" 
                        class="text-sm">{{ star }}</span>
                </div>
                <span class="font-semibold text-sm text-green-600">{{ item.price }}</span>
              </div>
            </ng-container>

            <!-- Card View -->
            <div *ngIf="viewMode === 'card'" class="flex">
              <img [src]="item.image" [alt]="item.title" class="w-24 h-24 object-cover flex-shrink-0">
              <div class="p-4 flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {{ item.title }}
                  </h3>
                  <span class="font-semibold text-green-600 ml-3">{{ item.price }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {{ item.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                    {{ item.category }}
                  </span>
                  <div class="flex items-center">
                    <span *ngFor="let star of renderStars(item.rating)" 
                          [class]="star === '★' ? 'text-yellow-400' : 'text-gray-300'" 
                          class="text-sm">{{ star }}</span>
                    <span class="ml-1 text-xs text-gray-500">({{ item.rating }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="space-y-6">
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <app-code-tabs 
          [htmlCode]="htmlCode" 
          [cssCode]="cssCode" 
          [typescriptCode]="typescriptCode"
          title="Code Example">
        </app-code-tabs>
      </div>
    </div>
  </div>
</div>`;
  }

  get cssCode(): string {
    return `/* This Angular component uses Tailwind CSS classes directly in the template */
/* No custom CSS is needed as all styling is handled by Tailwind utilities */

/* Key Tailwind classes used for the Adaptable View pattern: */

/* View Mode Selector */
/* bg-gray-100 dark:bg-gray-800 - Background for button group */
/* rounded-lg p-1 - Rounded container with padding */

/* Active Button State */
/* bg-white dark:bg-gray-700 - Active button background */
/* text-blue-600 dark:text-blue-400 - Active text color */
/* shadow-sm - Subtle shadow for active state */

/* Inactive Button State */
/* text-gray-600 dark:text-gray-400 - Inactive text color */
/* transition-colors - Smooth color transitions */

/* Grid Layout */
/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 - Responsive grid */
/* gap-4 - Grid spacing */

/* List Layout */
/* space-y-2 - Vertical spacing between items */
/* flex items-center space-x-3 - Horizontal flex layout */

/* Card Layout */
/* grid grid-cols-1 gap-6 - Single column with larger gaps */
/* flex - Horizontal layout for card content */

/* Responsive Grid View */
/* grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 - Breakpoint-based columns */
/* w-full h-32 object-cover - Image sizing and cropping */

/* List View Layout */
/* w-12 h-12 object-cover rounded-md flex-shrink-0 - Small square images */
/* flex-1 min-w-0 - Flexible content area */
/* truncate - Text overflow handling */

/* Card View Layout */
/* w-24 h-24 object-cover flex-shrink-0 - Medium size images */
/* p-4 flex-1 - Padded flexible content */

/* Hover Effects */
/* hover:shadow-md - Grid item hover */
/* hover:bg-gray-50 dark:hover:bg-gray-700 - List item hover */
/* hover:shadow-lg - Card item hover */

/* Transitions */
/* transition-all duration-200 - Smooth item transitions */
/* transition-all duration-300 - Layout transition */

/* Typography */
/* line-clamp-1, line-clamp-2 - Text line clamping */
/* font-semibold - Bold text weights */
/* text-sm, text-xs - Text sizes */

/* Color System */
/* text-gray-900 dark:text-gray-100 - Primary text */
/* text-gray-600 dark:text-gray-400 - Secondary text */
/* text-green-600 - Price color */
/* text-yellow-400 - Star ratings */

/* Dark Mode Support */
/* All classes have dark: variants for automatic dark mode */
/* bg-white dark:bg-gray-800 - Background colors */
/* border-gray-200 dark:border-gray-700 - Border colors */

/* Benefits of Tailwind CSS approach: */
/* - Consistent design system */
/* - Built-in responsive design */
/* - Automatic dark mode support */
/* - No custom CSS to maintain */
/* - Smaller bundle size (only used classes) */
/* - Easy to scan and understand layout structure */`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  rating: number;
  tags: string[];
}

@Component({
  selector: 'app-adaptable-view',
  templateUrl: './adaptable-view.component.html',
  styleUrls: ['./adaptable-view.component.scss']
})
export class AdaptableViewComponent {
  viewMode: 'grid' | 'list' | 'card' = 'grid';

  content: ContentItem[] = [
    {
      id: 1,
      title: 'Smart Home Security System',
      description: 'Complete IoT security solution with AI-powered monitoring.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Technology',
      price: '$299.99',
      rating: 4.8,
      tags: ['Smart Home', 'Security', 'IoT']
    },
    {
      id: 2,
      title: 'Ergonomic Office Chair',
      description: 'Premium ergonomic design with lumbar support.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Furniture',
      price: '$449.99',
      rating: 4.6,
      tags: ['Office', 'Ergonomic', 'Comfort']
    },
    {
      id: 3,
      title: 'Wireless Noise-Canceling Headphones',
      description: 'Studio-quality sound with active noise cancellation.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Audio',
      price: '$199.99',
      rating: 4.9,
      tags: ['Audio', 'Wireless', 'Premium']
    }
    // ... more items
  ];

  setViewMode(mode: 'grid' | 'list' | 'card'): void {
    this.viewMode = mode;
  }

  renderStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? '★' : '☆');
  }
}`;
  }
}