import { Component } from '@angular/core';

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface Item {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.scss']
})
export class CategorizationComponent {
  selectedCategory = 'all';

  categories: Category[] = [
    { id: 'all', name: 'All Items', count: 42, color: 'gray' },
    { id: 'electronics', name: 'Electronics', count: 12, color: 'blue' },
    { id: 'clothing', name: 'Clothing', count: 8, color: 'green' },
    { id: 'books', name: 'Books', count: 15, color: 'purple' },
    { id: 'home', name: 'Home & Garden', count: 7, color: 'orange' }
  ];

  items: Item[] = [
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      category: 'electronics', 
      price: '$199.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 2, 
      name: 'Cotton T-Shirt', 
      category: 'clothing', 
      price: '$29.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 3, 
      name: 'JavaScript Guide', 
      category: 'books', 
      price: '$39.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 4, 
      name: 'Bluetooth Speaker', 
      category: 'electronics', 
      price: '$89.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 5, 
      name: 'Garden Tools Set', 
      category: 'home', 
      price: '$79.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 6, 
      name: 'Denim Jeans', 
      category: 'clothing', 
      price: '$69.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 7, 
      name: 'React Cookbook', 
      category: 'books', 
      price: '$45.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    },
    { 
      id: 8, 
      name: 'Smart Watch', 
      category: 'electronics', 
      price: '$299.99', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K' 
    }
  ];

  get filteredItems(): Item[] {
    return this.selectedCategory === 'all' 
      ? this.items 
      : this.items.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  getCategoryColor(color: string): string {
    const colorClasses = {
      gray: 'gray',
      blue: 'blue',
      green: 'green',
      purple: 'purple',
      orange: 'orange'
    };
    return colorClasses[color as keyof typeof colorClasses] || 'gray';
  }

  findCategoryByItemCategory(itemCategory: string): Category | undefined {
    return this.categories.find(cat => cat.id === itemCategory);
  }

  get exampleCode(): string {
    return `<!-- Basic Categorization Example -->
<div class="simple-categorization">
  <div class="category-nav">
    <button 
      *ngFor="let category of categories"
      (click)="selectCategory(category.id)"
      class="category-button"
      [class.active]="selectedCategory === category.id"
      [ngClass]="getCategoryColorClass(category.color)">
      {{ category.name }}
      <span class="category-count">{{ category.count }}</span>
    </button>
  </div>

  <div class="items-grid">
    <div 
      *ngFor="let item of filteredItems"
      class="item-card">
      
      <img 
        [src]="item.image" 
        [alt]="item.name"
        class="item-image">
      
      <div class="item-content">
        <div class="item-header">
          <h3 class="item-title">{{ item.name }}</h3>
          <span 
            class="item-category"
            [ngClass]="getCategoryColorClass(findCategory(item.category)?.color)">
            {{ findCategory(item.category)?.name }}
          </span>
        </div>
        <p class="item-price">{{ item.price }}</p>
      </div>
    </div>
  </div>

  <div *ngIf="filteredItems.length === 0" class="empty-state">
    No items found in this category
  </div>
</div>

<!-- Component TypeScript -->
export class SimpleCategorization {
  selectedCategory = 'all';
  categories = [
    { id: 'all', name: 'All Items', count: 42, color: 'gray' },
    { id: 'electronics', name: 'Electronics', count: 12, color: 'blue' }
  ];
  
  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }
  
  get filteredItems() {
    return this.selectedCategory === 'all' 
      ? this.items 
      : this.items.filter(item => item.category === this.selectedCategory);
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="categorization-pattern-container">
  <div class="pattern-header">
    <h1 class="pattern-title gradient-text">📁 Categorization Pattern</h1>
    <p class="pattern-description">
      Organize content into distinct categories with visual indicators and filtering capabilities.
    </p>
  </div>

  <div class="pattern-layout">
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Click on categories to filter items. Each category shows item count and uses color coding for easy identification.
        </p>
        
        <!-- Category Navigation -->
        <div class="category-nav">
          <button
            *ngFor="let category of categories"
            (click)="selectCategory(category.id)"
            class="category-button"
            [class.active]="selectedCategory === category.id"
            [attr.data-color]="category.color">
            {{ category.name }}
            <span class="category-count">{{ category.count }}</span>
          </button>
        </div>

        <!-- Items Grid -->
        <div class="items-grid">
          <div 
            *ngFor="let item of filteredItems"
            class="item-card">
            
            <img 
              [src]="item.image" 
              [alt]="item.name"
              class="item-image">
            
            <div class="item-content">
              <div class="item-header">
                <h3 class="item-title">{{ item.name }}</h3>
                <span 
                  *ngIf="findCategoryByItemCategory(item.category) as category"
                  class="item-category"
                  [attr.data-color]="category.color">
                  {{ category.name }}
                </span>
              </div>
              <p class="item-price">{{ item.price }}</p>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div *ngIf="filteredItems.length === 0" class="empty-state">
          <div class="empty-icon">📂</div>
          <p class="empty-text">No items found in this category</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Categorization Pattern Styles */
.categorization-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8);
  color: var(--text-primary);
}

/* Pattern Header */
.pattern-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.pattern-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
  background: linear-gradient(135deg, var(--primary-600), var(--purple-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pattern-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Pattern Layout */
.pattern-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
}

/* Example Section */
.example-section {
  background: linear-gradient(135deg, var(--primary-50), var(--purple-50));
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  border: 1px solid var(--primary-200);

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, var(--primary-900) / 20%, var(--purple-900) / 20%);
    border-color: var(--primary-800);
  }
}

.example-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.example-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--primary-800);
  margin-bottom: var(--spacing-4);

  @media (prefers-color-scheme: dark) {
    color: var(--primary-200);
  }
}

.example-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-6);
  line-height: 1.6;
  font-size: var(--font-size-sm);
}

/* Category Navigation */
.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
}

.category-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    border-color: var(--gray-400);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }

  &.active {
    ring: 2px solid var(--primary-500);
    ring-offset: 2px;
    box-shadow: var(--shadow-sm);
  }

  // Category color variations
  &[data-color="gray"] {
    &.active {
      background: var(--gray-100);
      color: var(--gray-800);
      border-color: var(--gray-400);

      @media (prefers-color-scheme: dark) {
        background: var(--gray-800);
        color: var(--gray-200);
      }
    }
  }

  &[data-color="blue"] {
    &.active {
      background: var(--blue-100);
      color: var(--blue-800);
      border-color: var(--blue-400);

      @media (prefers-color-scheme: dark) {
        background: var(--blue-900) / 30%;
        color: var(--blue-200);
      }
    }
  }

  &[data-color="green"] {
    &.active {
      background: var(--green-100);
      color: var(--green-800);
      border-color: var(--green-400);

      @media (prefers-color-scheme: dark) {
        background: var(--green-900) / 30%;
        color: var(--green-200);
      }
    }
  }

  &[data-color="purple"] {
    &.active {
      background: var(--purple-100);
      color: var(--purple-800);
      border-color: var(--purple-400);

      @media (prefers-color-scheme: dark) {
        background: var(--purple-900) / 30%;
        color: var(--purple-200);
      }
    }
  }

  &[data-color="orange"] {
    &.active {
      background: var(--orange-100);
      color: var(--orange-800);
      border-color: var(--orange-400);

      @media (prefers-color-scheme: dark) {
        background: var(--orange-900) / 30%;
        color: var(--orange-200);
      }
    }
  }
}

.category-count {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-4);
  max-height: 400px;
  overflow-y: auto;
  padding: var(--spacing-2);
}

/* Item Card */
.item-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  transition: all var(--transition-normal);
  cursor: pointer;
  animation: fadeInUp 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary-400);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
    border-color: var(--gray-700);

    &:hover {
      border-color: var(--primary-500);
    }
  }
}

.item-image {
  width: 100%;
  height: 6rem;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-3);
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2);
  gap: var(--spacing-2);
}

.item-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.25;
  margin: 0;
  flex: 1;
  min-width: 0;
  
  /* Multi-line text truncation */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-category {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-full);
  white-space: nowrap;
  flex-shrink: 0;

  &[data-color="gray"] {
    background: var(--gray-100);
    color: var(--gray-800);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
      color: var(--gray-200);
    }
  }

  &[data-color="blue"] {
    background: var(--blue-100);
    color: var(--blue-800);

    @media (prefers-color-scheme: dark) {
      background: var(--blue-900) / 30%;
      color: var(--blue-200);
    }
  }

  &[data-color="green"] {
    background: var(--green-100);
    color: var(--green-800);

    @media (prefers-color-scheme: dark) {
      background: var(--green-900) / 30%;
      color: var(--green-200);
    }
  }

  &[data-color="purple"] {
    background: var(--purple-100);
    color: var(--purple-800);

    @media (prefers-color-scheme: dark) {
      background: var(--purple-900) / 30%;
      color: var(--purple-200);
    }
  }

  &[data-color="orange"] {
    background: var(--orange-100);
    color: var(--orange-800);

    @media (prefers-color-scheme: dark) {
      background: var(--orange-900) / 30%;
      color: var(--orange-200);
    }
  }
}

.item-price {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--green-600);
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: var(--green-400);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-8);
  color: var(--text-secondary);
  grid-column: 1 / -1;
}

.empty-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.empty-text {
  font-size: var(--font-size-base);
  font-style: italic;
  margin: 0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .categorization-pattern-container {
    padding: var(--spacing-4);
  }

  .category-nav {
    flex-direction: column;
  }

  .category-button {
    justify-content: space-between;
  }

  .items-grid {
    grid-template-columns: 1fr;
    max-height: none;
  }

  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .item-category {
    align-self: flex-start;
  }
}

/* Focus states for accessibility */
.category-button:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

.item-card:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Loading state */
.items-grid.loading {
  opacity: 0.6;
  pointer-events: none;
}

.item-card.loading {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface Item {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.scss']
})
export class CategorizationComponent {
  selectedCategory = 'all';

  categories: Category[] = [
    { id: 'all', name: 'All Items', count: 42, color: 'gray' },
    { id: 'electronics', name: 'Electronics', count: 12, color: 'blue' },
    { id: 'clothing', name: 'Clothing', count: 8, color: 'green' },
    { id: 'books', name: 'Books', count: 15, color: 'purple' },
    { id: 'home', name: 'Home & Garden', count: 7, color: 'orange' }
  ];

  items: Item[] = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: '$199.99', image: '...' },
    { id: 2, name: 'Cotton T-Shirt', category: 'clothing', price: '$29.99', image: '...' },
    { id: 3, name: 'JavaScript Guide', category: 'books', price: '$39.99', image: '...' },
    { id: 4, name: 'Bluetooth Speaker', category: 'electronics', price: '$89.99', image: '...' },
    { id: 5, name: 'Garden Tools Set', category: 'home', price: '$79.99', image: '...' },
    { id: 6, name: 'Denim Jeans', category: 'clothing', price: '$69.99', image: '...' },
    { id: 7, name: 'React Cookbook', category: 'books', price: '$45.99', image: '...' },
    { id: 8, name: 'Smart Watch', category: 'electronics', price: '$299.99', image: '...' }
  ];

  get filteredItems(): Item[] {
    return this.selectedCategory === 'all' 
      ? this.items 
      : this.items.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  getCategoryColor(color: string): string {
    const colorClasses = {
      gray: 'gray',
      blue: 'blue',
      green: 'green',
      purple: 'purple',
      orange: 'orange'
    };
    return colorClasses[color as keyof typeof colorClasses] || 'gray';
  }

  findCategoryByItemCategory(itemCategory: string): Category | undefined {
    return this.categories.find(cat => cat.id === itemCategory);
  }
}`;
  }
}