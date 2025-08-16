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
              [class.active]="viewMode === 'grid'"
              title="Grid View">
        <svg class="view-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z..."/>
        </svg>
      </button>
      <button (click)="setViewMode('list')"
              class="view-btn"
              [class.active]="viewMode === 'list'"
              title="List View">
        <svg class="view-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4..."/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Cards Grid/List -->
  <div class="cards-content" [class.list-view]="viewMode === 'list'">
    <div *ngFor="let card of filteredCards" 
         class="card-item"
         [class.featured]="card.featured"
         [class.list-layout]="viewMode === 'list'">
      
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
          </div>
        </div>
        
        <!-- Description -->
        <p class="card-description">{{ card.description }}</p>
        
        <!-- Tags -->
        <div class="card-tags" *ngIf="viewMode === 'grid'">
          <span *ngFor="let tag of card.tags?.slice(0, 2)" class="tag">
            #{{ tag }}
          </span>
        </div>
        
        <!-- Card Footer -->
        <div class="card-footer">
          <div class="card-actions">
            <button (click)="toggleLike(card.id)"
                    class="action-btn like-btn"
                    [class.active]="isLiked(card.id)">
              <svg class="action-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343..."/>
              </svg>
              <span>{{ card.likes }}</span>
            </button>
            
            <button (click)="toggleBookmark(card.id)"
                    class="action-btn bookmark-btn"
                    [class.active]="isBookmarked(card.id)">
              <svg class="action-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
              </svg>
            </button>
          </div>
          
          <button (click)="onLearnMore(card.id)" class="read-more-btn">
            Read
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Cards Container */
.cards-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-primary);
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.filter-btn {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--gray-100);
  color: var(--gray-700);

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    background: var(--primary-100);
    color: var(--primary-700);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
    color: var(--gray-300);

    &:hover {
      background: var(--gray-600);
    }

    &.active {
      background: var(--primary-900);
      color: var(--primary-300);
    }
  }
}

/* Cards Content */
.cards-content {
  padding: var(--spacing-4);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-4);

  &.list-view {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
}

/* Card Item */
.card-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &.featured {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2);
  }

  &.list-layout {
    display: flex;
    flex-direction: row;
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
    border-color: var(--gray-700);
  }
}

/* Card Image */
.card-image {
  position: relative;
  height: 128px;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--purple-50) 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .list-layout & {
    width: 80px;
    flex-shrink: 0;
    height: auto;
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  }
}

/* Badges */
.featured-badge {
  position: absolute;
  top: var(--spacing-1);
  left: var(--spacing-1);
  background: var(--yellow-500);
  color: white;
  padding: 2px var(--spacing-1);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.category-badge {
  position: absolute;
  top: var(--spacing-1);
  right: var(--spacing-1);
  background: var(--primary-500);
  color: white;
  padding: 2px var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

/* Card Content */
.card-content {
  padding: var(--spacing-3);
  flex: 1;
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
  line-height: 1.4;
  transition: color var(--transition-fast);

  .card-item:hover & {
    color: var(--primary-600);
  }

  @media (prefers-color-scheme: dark) {
    .card-item:hover & {
      color: var(--primary-400);
    }
  }
}

.card-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--spacing-3) 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Tags */
.tag {
  padding: 2px var(--spacing-2);
  background: var(--gray-100);
  color: var(--gray-600);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
    color: var(--gray-400);
  }
}

/* Action Buttons */
.action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  background: none;
  border: none;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color var(--transition-fast);

  &.like-btn.active {
    color: var(--red-500);
  }

  &.bookmark-btn.active {
    color: var(--primary-500);
  }
}

.read-more-btn {
  padding: var(--spacing-1) var(--spacing-2);
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--primary-600);
  }
}

/* Focus States */
.filter-btn:focus,
.action-btn:focus,
.read-more-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Responsive Design */
@media (max-width: 640px) {
  .cards-content {
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