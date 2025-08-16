import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  size: string;
  inStock: boolean;
}

interface FilterCount {
  value: string;
  count: number;
}

type SortField = 'name' | 'price' | 'rating';
type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'app-data-filtering',
  templateUrl: './data-filtering.component.html',
  styleUrls: ['./data-filtering.component.scss']
})
export class DataFilteringComponent {
  searchTerm = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  priceRange: [number, number] = [0, 1000];
  selectedRatings: number[] = [];
  selectedSizes: string[] = [];
  sortBy: SortField = 'name';
  sortOrder: SortOrder = 'asc';

  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', brand: 'TechPro', price: 89.99, rating: 4.5, size: 'One Size', inStock: true },
    { id: 2, name: 'Smartphone Case', category: 'Electronics', brand: 'TechPro', price: 24.99, rating: 4.2, size: 'Universal', inStock: true },
    { id: 3, name: 'Running Shoes', category: 'Sports', brand: 'SportFlex', price: 129.99, rating: 4.7, size: '10', inStock: true },
    { id: 4, name: 'Yoga Mat', category: 'Sports', brand: 'SportFlex', price: 39.99, rating: 4.3, size: 'Standard', inStock: false },
    { id: 5, name: 'Coffee Mug', category: 'Home', brand: 'HomeStyle', price: 12.99, rating: 4.1, size: '12oz', inStock: true },
    { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', brand: 'AudioMax', price: 79.99, rating: 4.6, size: 'Portable', inStock: true },
    { id: 7, name: 'Tennis Racket', category: 'Sports', brand: 'SportFlex', price: 89.99, rating: 4.4, size: 'Adult', inStock: true },
    { id: 8, name: 'Desk Lamp', category: 'Home', brand: 'HomeStyle', price: 45.99, rating: 4.0, size: 'Standard', inStock: true },
    { id: 9, name: 'Fitness Tracker', category: 'Electronics', brand: 'TechPro', price: 149.99, rating: 4.8, size: 'One Size', inStock: false },
    { id: 10, name: 'Water Bottle', category: 'Sports', brand: 'SportFlex', price: 19.99, rating: 4.2, size: '32oz', inStock: true },
    { id: 11, name: 'Throw Pillow', category: 'Home', brand: 'HomeStyle', price: 29.99, rating: 4.1, size: '18x18', inStock: true },
    { id: 12, name: 'Wireless Mouse', category: 'Electronics', brand: 'TechPro', price: 34.99, rating: 4.3, size: 'Standard', inStock: true }
  ];

  get categories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  get brands(): string[] {
    return [...new Set(this.products.map(p => p.brand))];
  }

  get sizes(): string[] {
    return [...new Set(this.products.map(p => p.size))];
  }

  get ratings(): number[] {
    return [4.0, 4.2, 4.4, 4.6, 4.8];
  }

  get filteredProducts(): Product[] {
    let filtered = this.products.filter(product => {
      // Search term filter
      const matchesSearch = this.searchTerm === '' || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = this.selectedCategories.length === 0 || 
        this.selectedCategories.includes(product.category);

      // Brand filter
      const matchesBrand = this.selectedBrands.length === 0 || 
        this.selectedBrands.includes(product.brand);

      // Price range filter
      const matchesPrice = product.price >= this.priceRange[0] && product.price <= this.priceRange[1];

      // Rating filter
      const matchesRating = this.selectedRatings.length === 0 || 
        this.selectedRatings.some(rating => product.rating >= rating);

      // Size filter
      const matchesSize = this.selectedSizes.length === 0 || 
        this.selectedSizes.includes(product.size);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesSize;
    });

    // Sort products
    filtered.sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];
      
      if (this.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }

  getFilterCounts(filterType: string, values: string[]): FilterCount[] {
    return values.map(value => {
      const count = this.products.filter(product => {
        const matchesOtherFilters = 
          (this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category)) &&
          (this.selectedBrands.length === 0 || this.selectedBrands.includes(product.brand)) &&
          (this.selectedSizes.length === 0 || this.selectedSizes.includes(product.size)) &&
          product.price >= this.priceRange[0] && product.price <= this.priceRange[1] &&
          (this.selectedRatings.length === 0 || this.selectedRatings.some(rating => product.rating >= rating)) &&
          (this.searchTerm === '' || 
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()));

        switch (filterType) {
          case 'category':
            return matchesOtherFilters && product.category === value;
          case 'brand':
            return matchesOtherFilters && product.brand === value;
          case 'size':
            return matchesOtherFilters && product.size === value;
          default:
            return false;
        }
      }).length;

      return { value, count };
    });
  }

  handleFilterToggle(filterType: string, value: string): void {
    switch (filterType) {
      case 'category':
        this.selectedCategories = this.selectedCategories.includes(value) 
          ? this.selectedCategories.filter(cat => cat !== value)
          : [...this.selectedCategories, value];
        break;
      case 'brand':
        this.selectedBrands = this.selectedBrands.includes(value) 
          ? this.selectedBrands.filter(brand => brand !== value)
          : [...this.selectedBrands, value];
        break;
      case 'size':
        this.selectedSizes = this.selectedSizes.includes(value) 
          ? this.selectedSizes.filter(size => size !== value)
          : [...this.selectedSizes, value];
        break;
    }
  }

  handleRatingToggle(rating: number): void {
    this.selectedRatings = this.selectedRatings.includes(rating) 
      ? this.selectedRatings.filter(r => r !== rating)
      : [...this.selectedRatings, rating];
  }

  clearAllFilters(): void {
    this.selectedCategories = [];
    this.selectedBrands = [];
    this.selectedSizes = [];
    this.selectedRatings = [];
    this.priceRange = [0, 1000];
    this.searchTerm = '';
  }

  getActiveFiltersCount(): number {
    return this.selectedCategories.length + 
           this.selectedBrands.length + 
           this.selectedSizes.length + 
           this.selectedRatings.length + 
           (this.priceRange[0] > 0 || this.priceRange[1] < 1000 ? 1 : 0) + 
           (this.searchTerm ? 1 : 0);
  }

  onPriceRangeChange(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    
    if (index === 0) {
      this.priceRange = [value, this.priceRange[1]];
    } else {
      this.priceRange = [this.priceRange[0], value];
    }
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(rating));
  }

  get htmlCode(): string {
    return `<div class="data-filtering-container">
  <div class="filtering-layout">
    <!-- Filters Sidebar -->
    <div class="filters-sidebar">
      <div class="filter-header">
        <h2 class="filter-title">Filters</h2>
        <button 
          *ngIf="getActiveFiltersCount() > 0"
          (click)="clearAllFilters()"
          class="clear-all-btn">
          Clear All
        </button>
      </div>

      <!-- Search Filter -->
      <div class="filter-section">
        <label class="filter-label">Search Products</label>
        <input
          type="text"
          [(ngModel)]="searchTerm"
          placeholder="Search by name or brand..."
          class="search-input">
      </div>

      <!-- Price Range Filter -->
      <div class="filter-section">
        <label class="filter-label">
          Price Range: \${{ priceRange[0] }} - \${{ priceRange[1] }}
        </label>
        <div class="price-range-container">
          <input
            type="range"
            min="0"
            max="1000"
            [value]="priceRange[1]"
            (input)="onPriceRangeChange($event, 1)"
            class="price-range-slider">
          <div class="price-range-labels">
            <span>\$0</span>
            <span>\$1000</span>
          </div>
        </div>
      </div>

      <!-- Categories Filter -->
      <div class="filter-section">
        <h3 class="filter-subtitle">Categories</h3>
        <div class="filter-options">
          <label 
            *ngFor="let item of getFilterCounts('category', categories)" 
            class="filter-option">
            <input
              type="checkbox"
              [checked]="selectedCategories.includes(item.value)"
              (change)="handleFilterToggle('category', item.value)"
              class="filter-checkbox">
            <span class="filter-text">{{ item.value }}</span>
            <span class="filter-count">({{ item.count }})</span>
          </label>
        </div>
      </div>

      <!-- Brands Filter -->
      <div class="filter-section">
        <h3 class="filter-subtitle">Brands</h3>
        <div class="filter-options">
          <label 
            *ngFor="let item of getFilterCounts('brand', brands)" 
            class="filter-option">
            <input
              type="checkbox"
              [checked]="selectedBrands.includes(item.value)"
              (change)="handleFilterToggle('brand', item.value)"
              class="filter-checkbox">
            <span class="filter-text">{{ item.value }}</span>
            <span class="filter-count">({{ item.count }})</span>
          </label>
        </div>
      </div>

      <!-- Ratings Filter -->
      <div class="filter-section">
        <h3 class="filter-subtitle">Minimum Rating</h3>
        <div class="filter-options">
          <label 
            *ngFor="let rating of ratings" 
            class="filter-option">
            <input
              type="checkbox"
              [checked]="selectedRatings.includes(rating)"
              (change)="handleRatingToggle(rating)"
              class="filter-checkbox">
            <span class="filter-text">{{ rating }}★ & up</span>
          </label>
        </div>
      </div>

      <!-- Sizes Filter -->
      <div class="filter-section">
        <h3 class="filter-subtitle">Sizes</h3>
        <div class="filter-options">
          <label 
            *ngFor="let item of getFilterCounts('size', sizes)" 
            class="filter-option">
            <input
              type="checkbox"
              [checked]="selectedSizes.includes(item.value)"
              (change)="handleFilterToggle('size', item.value)"
              class="filter-checkbox">
            <span class="filter-text">{{ item.value }}</span>
            <span class="filter-count">({{ item.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Products Area -->
    <div class="products-area">
      <!-- Results Header -->
      <div class="results-header">
        <div class="results-info">
          <h2 class="results-title">Products ({{ filteredProducts.length }})</h2>
          <p *ngIf="getActiveFiltersCount() > 0" class="active-filters">
            {{ getActiveFiltersCount() }} active filter{{ getActiveFiltersCount() !== 1 ? 's' : '' }}
          </p>
        </div>
        
        <div class="sort-controls">
          <select 
            [(ngModel)]="sortBy" 
            class="sort-select">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
          
          <button 
            (click)="toggleSortOrder()" 
            class="sort-order-btn">
            {{ sortOrder === 'asc' ? '↑' : '↓' }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid" *ngIf="filteredProducts.length > 0">
        <div 
          *ngFor="let product of filteredProducts" 
          class="product-card">
          <div class="product-header">
            <h3 class="product-name">{{ product.name }}</h3>
            <span class="product-brand">{{ product.brand }}</span>
          </div>
          
          <div class="product-rating">
            <span 
              *ngFor="let filled of getStarArray(product.rating)" 
              class="star" 
              [class.filled]="filled">★</span>
            <span class="rating-value">({{ product.rating }})</span>
          </div>
          
          <div class="product-footer">
            <span class="product-price">\${{ product.price }}</span>
            <span 
              class="stock-status" 
              [class.in-stock]="product.inStock"
              [class.out-of-stock]="!product.inStock">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
          
          <div class="product-meta">
            <span class="product-category">{{ product.category }}</span>
            <span class="product-size">{{ product.size }}</span>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div *ngIf="filteredProducts.length === 0" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3 class="no-results-title">No products found</h3>
        <p class="no-results-text">Try adjusting your filters or search terms</p>
        <button 
          (click)="clearAllFilters()" 
          class="clear-filters-btn">
          Clear All Filters
        </button>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Data Filtering Container */
.data-filtering-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

/* Layout */
.filtering-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-8);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
}

/* Filters Sidebar */
.filters-sidebar {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  height: fit-content;
  position: sticky;
  top: var(--spacing-4);
  box-shadow: var(--shadow-sm);

  @media (max-width: 1024px) {
    position: static;
  }
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
}

.filter-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.clear-all-btn {
  background: none;
  border: none;
  color: var(--primary-600);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: color var(--transition-normal);

  &:hover {
    color: var(--primary-700);
    text-decoration: underline;
  }
}

/* Filter Sections */
.filter-section {
  margin-bottom: var(--spacing-6);

  &:last-child {
    margin-bottom: 0;
  }
}

.filter-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
}

.filter-subtitle {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-3) 0;
}

/* Search Input */
.search-input {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-500);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

/* Price Range */
.price-range-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.price-range-slider {
  width: 100%;
  height: 6px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--primary-600);
    border-radius: 50%;
    cursor: pointer;
    transition: background var(--transition-normal);

    &:hover {
      background: var(--primary-700);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--primary-600);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background var(--transition-normal);

    &:hover {
      background: var(--primary-700);
    }
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

.price-range-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* Filter Options */
.filter-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.filter-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: background var(--transition-normal);

  &:hover {
    background: var(--gray-50);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }
}

.filter-checkbox {
  accent-color: var(--primary-600);
}

.filter-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.filter-count {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  background: var(--gray-100);
  padding: 2px var(--spacing-1);
  border-radius: var(--radius-sm);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

/* Products Area */
.products-area {
  min-height: 0;
}

/* Results Header */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-4);
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-secondary);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-3);
    align-items: stretch;
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.results-info {
  flex: 1;
}

.results-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.active-filters {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Sort Controls */
.sort-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.sort-select {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-500);
  }
}

.sort-order-btn {
  padding: var(--spacing-2);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 40px;

  &:hover {
    background: var(--gray-50);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-500);
  }
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
}

.product-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2);
}

.product-name {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.product-brand {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-left: var(--spacing-2);
}

/* Product Rating */
.product-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-3);
}

.star {
  font-size: var(--font-size-sm);
  color: var(--gray-300);

  &.filled {
    color: var(--yellow-400);
  }
}

.rating-value {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-left: var(--spacing-1);
}

/* Product Footer */
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.product-price {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.stock-status {
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);

  &.in-stock {
    background: var(--green-100);
    color: var(--green-800);

    @media (prefers-color-scheme: dark) {
      background: var(--green-900);
      color: var(--green-300);
    }
  }

  &.out-of-stock {
    background: var(--red-100);
    color: var(--red-800);

    @media (prefers-color-scheme: dark) {
      background: var(--red-900);
      color: var(--red-300);
    }
  }
}

/* Product Meta */
.product-meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* No Results */
.no-results {
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-4);
}

.no-results-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.no-results-text {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-4) 0;
}

.clear-filters-btn {
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-normal);

  &:hover {
    background: var(--primary-700);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-500);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .data-filtering-container {
    padding: var(--spacing-4);
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-4);
  }

  .product-card {
    padding: var(--spacing-3);
  }

  .filter-sidebar {
    position: static;
    margin-bottom: var(--spacing-4);
  }
}

/* Accessibility */
.search-input:focus-visible,
.price-range-slider:focus-visible,
.filter-checkbox:focus-visible,
.sort-select:focus-visible,
.sort-order-btn:focus-visible,
.clear-filters-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .product-card,
  .filters-sidebar,
  .results-header {
    border-width: 2px;
  }
  
  .filter-option:hover {
    border: 1px solid var(--text-primary);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  size: string;
  inStock: boolean;
}

interface FilterCount {
  value: string;
  count: number;
}

type SortField = 'name' | 'price' | 'rating';
type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'app-data-filtering',
  templateUrl: './data-filtering.component.html',
  styleUrls: ['./data-filtering.component.scss']
})
export class DataFilteringComponent {
  searchTerm = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  priceRange: [number, number] = [0, 1000];
  selectedRatings: number[] = [];
  selectedSizes: string[] = [];
  sortBy: SortField = 'name';
  sortOrder: SortOrder = 'asc';

  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', brand: 'TechPro', price: 89.99, rating: 4.5, size: 'One Size', inStock: true },
    { id: 2, name: 'Smartphone Case', category: 'Electronics', brand: 'TechPro', price: 24.99, rating: 4.2, size: 'Universal', inStock: true },
    { id: 3, name: 'Running Shoes', category: 'Sports', brand: 'SportFlex', price: 129.99, rating: 4.7, size: '10', inStock: true }
  ];

  get filteredProducts(): Product[] {
    let filtered = this.products.filter(product => {
      const matchesSearch = this.searchTerm === '' || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.selectedCategories.length === 0 || 
        this.selectedCategories.includes(product.category);

      const matchesBrand = this.selectedBrands.length === 0 || 
        this.selectedBrands.includes(product.brand);

      const matchesPrice = product.price >= this.priceRange[0] && product.price <= this.priceRange[1];

      const matchesRating = this.selectedRatings.length === 0 || 
        this.selectedRatings.some(rating => product.rating >= rating);

      const matchesSize = this.selectedSizes.length === 0 || 
        this.selectedSizes.includes(product.size);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesSize;
    });

    // Sort products
    filtered.sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];
      
      if (this.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }

  getFilterCounts(filterType: string, values: string[]): FilterCount[] {
    return values.map(value => {
      const count = this.products.filter(product => {
        // Calculate count for other filters...
        return true; // Simplified for brevity
      }).length;

      return { value, count };
    });
  }

  handleFilterToggle(filterType: string, value: string): void {
    switch (filterType) {
      case 'category':
        this.selectedCategories = this.selectedCategories.includes(value) 
          ? this.selectedCategories.filter(cat => cat !== value)
          : [...this.selectedCategories, value];
        break;
      case 'brand':
        this.selectedBrands = this.selectedBrands.includes(value) 
          ? this.selectedBrands.filter(brand => brand !== value)
          : [...this.selectedBrands, value];
        break;
    }
  }

  clearAllFilters(): void {
    this.selectedCategories = [];
    this.selectedBrands = [];
    this.selectedSizes = [];
    this.selectedRatings = [];
    this.priceRange = [0, 1000];
    this.searchTerm = '';
  }

  getActiveFiltersCount(): number {
    return this.selectedCategories.length + 
           this.selectedBrands.length + 
           this.selectedSizes.length + 
           this.selectedRatings.length + 
           (this.priceRange[0] > 0 || this.priceRange[1] < 1000 ? 1 : 0) + 
           (this.searchTerm ? 1 : 0);
  }
}`;
  }
}