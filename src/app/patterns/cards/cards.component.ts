import { Component } from '@angular/core';

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  author?: string;
  readTime?: string;
  date?: string;
  likes?: number;
  tags?: string[];
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  selectedFilter = 'all';
  viewMode = 'grid';
  likedCards = new Set<string>();
  bookmarkedCards = new Set<string>();

  cards: Card[] = [
    {
      id: '1',
      title: 'Getting Started with Angular',
      description: 'Learn the fundamentals of Angular framework and build your first application. This comprehensive guide covers everything from setup to deployment.',
      image: '🚀',
      category: 'Tutorial',
      featured: true,
      author: 'Sarah Chen',
      readTime: '5 min read',
      date: '2024-01-15',
      likes: 245,
      tags: ['angular', 'beginner', 'tutorial']
    },
    {
      id: '2',
      title: 'Advanced Component Patterns',
      description: 'Master advanced Angular component patterns and architectural best practices. Deep dive into component communication and state management.',
      image: '🎯',
      category: 'Advanced',
      featured: false,
      author: 'Mike Johnson',
      readTime: '12 min read',
      date: '2024-01-12',
      likes: 189,
      tags: ['angular', 'advanced', 'patterns']
    },
    {
      id: '3',
      title: 'State Management with NgRx',
      description: 'Implement effective state management solutions in your Angular applications using NgRx. Learn to manage complex application state.',
      image: '📊',
      category: 'Architecture',
      featured: true,
      author: 'Emily Rodriguez',
      readTime: '8 min read',
      date: '2024-01-10',
      likes: 312,
      tags: ['ngrx', 'state-management', 'angular']
    },
    {
      id: '4',
      title: 'Performance Optimization',
      description: 'Optimize your Angular apps for better performance and user experience. Learn about lazy loading, change detection, and more.',
      image: '⚡',
      category: 'Performance',
      featured: false,
      author: 'David Kim',
      readTime: '10 min read',
      date: '2024-01-08',
      likes: 156,
      tags: ['performance', 'optimization', 'angular']
    },
    {
      id: '5',
      title: 'Testing Strategies',
      description: 'Comprehensive testing approaches for Angular applications. Unit testing, integration testing, and end-to-end testing strategies.',
      image: '🧪',
      category: 'Testing',
      featured: false,
      author: 'Lisa Wang',
      readTime: '15 min read',
      date: '2024-01-05',
      likes: 98,
      tags: ['testing', 'jasmine', 'karma']
    },
    {
      id: '6',
      title: 'Deployment Guide',
      description: 'Deploy your Angular applications to various hosting platforms. From build optimization to CI/CD pipelines.',
      image: '🌐',
      category: 'DevOps',
      featured: false,
      author: 'Alex Thompson',
      readTime: '7 min read',
      date: '2024-01-03',
      likes: 203,
      tags: ['deployment', 'devops', 'ci-cd']
    }
  ];

  get filteredCards(): Card[] {
    if (this.selectedFilter === 'all') {
      return this.cards;
    }
    if (this.selectedFilter === 'featured') {
      return this.cards.filter(card => card.featured);
    }
    return this.cards.filter(card => card.category.toLowerCase() === this.selectedFilter.toLowerCase());
  }

  get categories(): string[] {
    const cats = Array.from(new Set(this.cards.map(card => card.category)));
    return ['all', 'featured', ...cats];
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  toggleLike(cardId: string): void {
    if (this.likedCards.has(cardId)) {
      this.likedCards.delete(cardId);
      const card = this.cards.find(c => c.id === cardId);
      if (card && card.likes) {
        card.likes--;
      }
    } else {
      this.likedCards.add(cardId);
      const card = this.cards.find(c => c.id === cardId);
      if (card && card.likes) {
        card.likes++;
      }
    }
  }

  toggleBookmark(cardId: string): void {
    if (this.bookmarkedCards.has(cardId)) {
      this.bookmarkedCards.delete(cardId);
    } else {
      this.bookmarkedCards.add(cardId);
    }
  }

  isLiked(cardId: string): boolean {
    return this.likedCards.has(cardId);
  }

  isBookmarked(cardId: string): boolean {
    return this.bookmarkedCards.has(cardId);
  }

  onLearnMore(cardId: string): void {
    console.log('Learn more clicked for card:', cardId);
  }

  get htmlCode(): string {
    return `<!-- Cards Container with Filters -->
<div class="cards-container">
  <!-- Filter Controls -->
  <div class="filter-controls">
    <div class="filter-buttons">
      <button *ngFor="let category of categories" 
              (click)="setFilter(category)"
              class="filter-btn"
              [class.active]="selectedFilter === category">
        {{ category | titlecase }}
      </button>
    </div>
    
    <div class="view-controls">
      <button (click)="setViewMode('grid')"
              class="view-btn"
              [class.active]="viewMode === 'grid'">
        Grid View
      </button>
      <button (click)="setViewMode('list')"
              class="view-btn"
              [class.active]="viewMode === 'list'">
        List View
      </button>
    </div>
  </div>

  <!-- Cards Grid/List -->
  <div class="cards-content" [class.list-view]="viewMode === 'list'">
    <div *ngFor="let card of filteredCards" 
         class="card-item"
         [class.featured]="card.featured">
      
      <!-- Card Image/Icon -->
      <div class="card-image">
        <div class="card-icon">
          <span>{{ card.image }}</span>
        </div>
        
        <!-- Featured Badge -->
        <div *ngIf="card.featured" class="featured-badge">
          Featured
        </div>
        
        <!-- Category Badge -->
        <div class="category-badge">
          {{ card.category }}
        </div>
      </div>
      
      <!-- Card Content -->
      <div class="card-content">
        <!-- Card Header -->
        <div class="card-header">
          <h3 class="card-title">{{ card.title }}</h3>
          <div class="card-meta">
            <span>{{ card.author }}</span>
            <span>•</span>
            <span>{{ card.readTime }}</span>
            <span>•</span>
            <span>{{ card.date | date:'MMM d' }}</span>
          </div>
        </div>
        
        <!-- Description -->
        <p class="card-description">{{ card.description }}</p>
        
        <!-- Tags -->
        <div class="card-tags">
          <span *ngFor="let tag of card.tags" class="tag">
            #{{ tag }}
          </span>
        </div>
        
        <!-- Card Footer -->
        <div class="card-footer">
          <div class="card-actions">
            <button (click)="toggleLike(card.id)"
                    class="action-btn like-btn"
                    [class.active]="isLiked(card.id)">
              ♥ {{ card.likes }}
            </button>
            
            <button (click)="toggleBookmark(card.id)"
                    class="action-btn bookmark-btn"
                    [class.active]="isBookmarked(card.id)">
              ★
            </button>
          </div>
          
          <button (click)="onLearnMore(card.id)" class="read-more-btn">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Cards Component Styles */
.cards-container {

/* Example of key Tailwind classes used: */

/* Card Container */
/* bg-white dark:bg-gray-800 - Background colors for light/dark mode */
/* rounded-xl - Extra rounded corners */
/* border border-gray-200 dark:border-gray-700 - Borders with dark mode */
/* overflow-hidden - Hide overflow */
/* transition-all duration-300 - Smooth transitions */
/* hover:shadow-lg hover:-translate-y-1 - Hover effects */

/* Grid Layout */
/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 - Responsive grid */
/* gap-6 - Grid gap */
/* space-y-4 - Vertical spacing for list view */

/* Featured Cards */
/* ring-2 ring-blue-500/20 - Featured card ring */

/* Filter Controls */
/* flex flex-wrap items-center justify-between - Filter layout */
/* px-4 py-2 rounded-lg - Button styling */
/* bg-blue-100 dark:bg-blue-900/30 - Active filter background */
/* text-blue-700 dark:text-blue-300 - Active filter text */

/* Card Content */
/* text-lg font-semibold - Title styling */
/* text-gray-600 dark:text-gray-400 - Description text */
/* line-clamp-3 - Text truncation */

/* Badges */
/* bg-yellow-500 text-white - Featured badge */
/* bg-blue-500 text-white - Category badge */
/* px-2 py-1 rounded-lg text-xs - Badge styling */

/* Tags */
/* bg-gray-100 dark:bg-gray-700 - Tag background */
/* text-gray-600 dark:text-gray-400 - Tag text */
/* flex flex-wrap gap-1 - Tag layout */

/* Interactive Elements */
/* hover:text-red-500 - Like button hover */
/* hover:text-blue-500 - Bookmark button hover */
/* bg-blue-500 hover:bg-blue-600 - Primary button */
/* transition-colors - Color transitions */

/* List View */
/* flex - Horizontal card layout for list view */
/* w-32 flex-shrink-0 - Fixed width image in list view */

/* Responsive Design */
/* md:grid-cols-2 lg:grid-cols-3 - Responsive columns */
/* space-x-4 - Horizontal spacing */
/* flex-wrap - Wrapping elements */

/* Dark Mode */
/* dark: prefix - Automatic dark mode support */
/* All colors have dark mode variants defined */

/* Focus states for accessibility */
.card-item:focus,
.filter-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  author?: string;
  readTime?: string;
  date?: string;
  likes?: number;
  tags?: string[];
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  selectedFilter = 'all';
  viewMode = 'grid';
  likedCards = new Set<string>();
  bookmarkedCards = new Set<string>();

  cards: Card[] = [
    {
      id: '1',
      title: 'Getting Started with Angular',
      description: 'Learn the fundamentals of Angular framework and build your first application.',
      image: '🚀',
      category: 'Tutorial',
      featured: true,
      author: 'Sarah Chen',
      readTime: '5 min read',
      date: '2024-01-15',
      likes: 245,
      tags: ['angular', 'beginner', 'tutorial']
    }
    // ... more cards
  ];

  get filteredCards(): Card[] {
    if (this.selectedFilter === 'all') {
      return this.cards;
    }
    if (this.selectedFilter === 'featured') {
      return this.cards.filter(card => card.featured);
    }
    return this.cards.filter(card => 
      card.category.toLowerCase() === this.selectedFilter.toLowerCase()
    );
  }

  get categories(): string[] {
    const cats = Array.from(new Set(this.cards.map(card => card.category)));
    return ['all', 'featured', ...cats];
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  toggleLike(cardId: string): void {
    if (this.likedCards.has(cardId)) {
      this.likedCards.delete(cardId);
      const card = this.cards.find(c => c.id === cardId);
      if (card && card.likes) {
        card.likes--;
      }
    } else {
      this.likedCards.add(cardId);
      const card = this.cards.find(c => c.id === cardId);
      if (card && card.likes) {
        card.likes++;
      }
    }
  }

  toggleBookmark(cardId: string): void {
    if (this.bookmarkedCards.has(cardId)) {
      this.bookmarkedCards.delete(cardId);
    } else {
      this.bookmarkedCards.add(cardId);
    }
  }

  isLiked(cardId: string): boolean {
    return this.likedCards.has(cardId);
  }

  isBookmarked(cardId: string): boolean {
    return this.bookmarkedCards.has(cardId);
  }

  onLearnMore(cardId: string): void {
    console.log('Learn more clicked for card:', cardId);
    // Navigate to card detail or perform action
  }
}`;
  }
}