import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  inStock: boolean;
  tags: string[];
  dateAdded: Date;
}

interface FilterConfig {
  category: string;
  brand: string;
  priceRange: { min: number; max: number };
  minRating: number;
  inStock: boolean | null;
  tags: string[];
}

interface SortOption {
  key: keyof Product;
  label: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss']
})
export class FilterSortComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      brand: 'TechCorp',
      price: 199.99,
      rating: 4.5,
      inStock: true,
      tags: ['wireless', 'bluetooth', 'premium'],
      dateAdded: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      brand: 'FitTech',
      price: 299.99,
      rating: 4.2,
      inStock: false,
      tags: ['smart', 'fitness', 'waterproof'],
      dateAdded: new Date('2024-02-10')
    },
    {
      id: 3,
      name: 'Coffee Maker',
      category: 'Appliances',
      brand: 'BrewMaster',
      price: 89.99,
      rating: 4.7,
      inStock: true,
      tags: ['kitchen', 'automatic', 'programmable'],
      dateAdded: new Date('2024-01-20')
    },
    {
      id: 4,
      name: 'Running Shoes',
      category: 'Sports',
      brand: 'SportMax',
      price: 129.99,
      rating: 4.3,
      inStock: true,
      tags: ['running', 'comfortable', 'lightweight'],
      dateAdded: new Date('2024-03-05')
    },
    {
      id: 5,
      name: 'Laptop Stand',
      category: 'Electronics',
      brand: 'DeskPro',
      price: 49.99,
      rating: 4.1,
      inStock: true,
      tags: ['ergonomic', 'adjustable', 'portable'],
      dateAdded: new Date('2024-02-28')
    },
    {
      id: 6,
      name: 'Yoga Mat',
      category: 'Sports',
      brand: 'FlexFit',
      price: 34.99,
      rating: 4.6,
      inStock: false,
      tags: ['yoga', 'non-slip', 'eco-friendly'],
      dateAdded: new Date('2024-01-08')
    }
  ];

  filteredProducts: Product[] = [...this.products];
  
  filters: FilterConfig = {
    category: '',
    brand: '',
    priceRange: { min: 0, max: 500 },
    minRating: 0,
    inStock: null,
    tags: []
  };

  sortOptions: SortOption[] = [
    { key: 'name', label: 'Name A-Z', direction: 'asc' },
    { key: 'name', label: 'Name Z-A', direction: 'desc' },
    { key: 'price', label: 'Price Low-High', direction: 'asc' },
    { key: 'price', label: 'Price High-Low', direction: 'desc' },
    { key: 'rating', label: 'Rating Low-High', direction: 'asc' },
    { key: 'rating', label: 'Rating High-Low', direction: 'desc' },
    { key: 'dateAdded', label: 'Newest First', direction: 'desc' },
    { key: 'dateAdded', label: 'Oldest First', direction: 'asc' }
  ];

  currentSort: SortOption = this.sortOptions[0];
  searchQuery = '';
  showFilters = false;

  ngOnInit(): void {
    this.applyFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onBrandChange(): void {
    this.applyFilters();
  }

  onPriceRangeChange(): void {
    this.applyFilters();
  }

  onRatingChange(): void {
    this.applyFilters();
  }

  onStockFilterChange(): void {
    this.applyFilters();
  }

  onTagToggle(tag: string): void {
    const index = this.filters.tags.indexOf(tag);
    if (index > -1) {
      this.filters.tags.splice(index, 1);
    } else {
      this.filters.tags.push(tag);
    }
    this.applyFilters();
  }

  onSortChange(): void {
    this.applySorting();
  }

  clearFilters(): void {
    this.filters = {
      category: '',
      brand: '',
      priceRange: { min: 0, max: 500 },
      minRating: 0,
      inStock: null,
      tags: []
    };
    this.searchQuery = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Text search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (this.filters.category) {
      filtered = filtered.filter(product => product.category === this.filters.category);
    }

    // Brand filter
    if (this.filters.brand) {
      filtered = filtered.filter(product => product.brand === this.filters.brand);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= this.filters.priceRange.min && 
      product.price <= this.filters.priceRange.max
    );

    // Rating filter
    if (this.filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= this.filters.minRating);
    }

    // Stock filter
    if (this.filters.inStock !== null) {
      filtered = filtered.filter(product => product.inStock === this.filters.inStock);
    }

    // Tags filter
    if (this.filters.tags.length > 0) {
      filtered = filtered.filter(product =>
        this.filters.tags.every(tag => product.tags.includes(tag))
      );
    }

    this.filteredProducts = filtered;
    this.applySorting();
  }

  applySorting(): void {
    this.filteredProducts.sort((a, b) => {
      const aValue = a[this.currentSort.key];
      const bValue = b[this.currentSort.key];

      let result = 0;
      if (aValue < bValue) result = -1;
      if (aValue > bValue) result = 1;

      return this.currentSort.direction === 'desc' ? -result : result;
    });
  }

  get categories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  get brands(): string[] {
    return [...new Set(this.products.map(p => p.brand))];
  }

  get allTags(): string[] {
    const tags = this.products.flatMap(p => p.tags);
    return [...new Set(tags)];
  }

  get maxPrice(): number {
    return Math.max(...this.products.map(p => p.price));
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.filters.category) count++;
    if (this.filters.brand) count++;
    if (this.filters.priceRange.min > 0 || this.filters.priceRange.max < this.maxPrice) count++;
    if (this.filters.minRating > 0) count++;
    if (this.filters.inStock !== null) count++;
    if (this.filters.tags.length > 0) count++;
    if (this.searchQuery) count++;
    return count;
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return ''.repeat(fullStars) + 
           (hasHalfStar ? '' : '') + 
           ''.repeat(emptyStars);
  }

  get htmlCode(): string {
    return `<!-- Filter Sort Container -->
<div class="filter-sort-container">
  <!-- Search and Controls -->
  <div class="search-controls">
    <div class="search-bar">
      <input 
        type="text"
        [(ngModel)]="searchQuery"
        (input)="onSearchChange()"
        placeholder="Search products..."
        class="search-input">
      <span class="search-icon">=</span>
    </div>
    
    <button 
      (click)="toggleFilters()"
      class="filter-toggle"
      [class.active]="showFilters">
      =' Filters
      <span *ngIf="activeFiltersCount > 0" class="filter-badge">
        {{ activeFiltersCount }}
      </span>
    </button>
    
    <select 
      [(ngModel)]="currentSort"
      (change)="onSortChange()"
      class="sort-select">
      <option *ngFor="let option of sortOptions" [ngValue]="option">
        {{ option.label }}
      </option>
    </select>
  </div>

  <!-- Filter Panel -->
  <div class="filter-panel" *ngIf="showFilters">
    <div class="filter-header">
      <h3>Filters</h3>
      <button (click)="clearFilters()" class="clear-filters">
        Clear All
      </button>
    </div>
    
    <div class="filter-groups">
      <!-- Category Filter -->
      <div class="filter-group">
        <label>Category</label>
        <select 
          [(ngModel)]="filters.category"
          (change)="onCategoryChange()"
          class="filter-select">
          <option value="">All Categories</option>
          <option *ngFor="let category of categories" [value]="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Brand Filter -->
      <div class="filter-group">
        <label>Brand</label>
        <select 
          [(ngModel)]="filters.brand"
          (change)="onBrandChange()"
          class="filter-select">
          <option value="">All Brands</option>
          <option *ngFor="let brand of brands" [value]="brand">
            {{ brand }}
          </option>
        </select>
      </div>

      <!-- Price Range -->
      <div class="filter-group">
        <label>Price Range</label>
        <div class="price-inputs">
          <input 
            type="number"
            [(ngModel)]="filters.priceRange.min"
            (input)="onPriceRangeChange()"
            placeholder="Min"
            class="price-input">
          <span>-</span>
          <input 
            type="number"
            [(ngModel)]="filters.priceRange.max"
            (input)="onPriceRangeChange()"
            placeholder="Max"
            class="price-input">
        </div>
      </div>

      <!-- Rating Filter -->
      <div class="filter-group">
        <label>Minimum Rating</label>
        <select 
          [(ngModel)]="filters.minRating"
          (change)="onRatingChange()"
          class="filter-select">
          <option [value]="0">Any Rating</option>
          <option [value]="4">4+ Stars</option>
          <option [value]="3">3+ Stars</option>
          <option [value]="2">2+ Stars</option>
          <option [value]="1">1+ Stars</option>
        </select>
      </div>

      <!-- Stock Filter -->
      <div class="filter-group">
        <label>Availability</label>
        <select 
          [(ngModel)]="filters.inStock"
          (change)="onStockFilterChange()"
          class="filter-select">
          <option [ngValue]="null">All Products</option>
          <option [ngValue]="true">In Stock</option>
          <option [ngValue]="false">Out of Stock</option>
        </select>
      </div>

      <!-- Tags Filter -->
      <div class="filter-group">
        <label>Tags</label>
        <div class="tag-filters">
          <button 
            *ngFor="let tag of allTags"
            (click)="onTagToggle(tag)"
            class="tag-filter"
            [class.active]="filters.tags.includes(tag)">
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Results -->
  <div class="results-section">
    <div class="results-header">
      <h2>Products ({{ filteredProducts.length }})</h2>
      <div class="view-options">
        <button class="view-btn active">ž Grid</button>
        <button class="view-btn">0 List</button>
      </div>
    </div>

    <div class="products-grid">
      <div 
        *ngFor="let product of filteredProducts" 
        class="product-card"
        [class.out-of-stock]="!product.inStock">
        
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-brand">{{ product.brand }}</div>
        </div>
        
        <div class="product-details">
          <div class="product-category">{{ product.category }}</div>
          <div class="product-price">{{ formatPrice(product.price) }}</div>
          <div class="product-rating">
            <span class="stars">{{ getRatingStars(product.rating) }}</span>
            <span class="rating-value">({{ product.rating }})</span>
          </div>
          
          <div class="product-status">
            <span 
              class="stock-status"
              [class.in-stock]="product.inStock"
              [class.out-of-stock]="!product.inStock">
              {{ product.inStock ? ' In Stock' : 'L Out of Stock' }}
            </span>
          </div>
          
          <div class="product-tags">
            <span *ngFor="let tag of product.tags" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="filteredProducts.length === 0" class="no-results">
      <div class="no-results-icon">=</div>
      <h3>No products found</h3>
      <p>Try adjusting your filters or search terms</p>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Filter Sort Container */
.filter-sort-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Search Controls */
.search-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #f9fafb;
    border-color: #3b82f6;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:hover {
      background: #4b5563;
    }
  }
}

.filter-badge {
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.sort-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

/* Filter Panel */
.filter-panel {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  animation: slideDown 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;

    @media (prefers-color-scheme: dark) {
      color: #f9fafb;
    }
  }
}

.clear-filters {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:hover {
      background: #4b5563;
    }
  }
}

.filter-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;

    @media (prefers-color-scheme: dark) {
      color: #d1d5db;
    }
  }
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #6b7280;
  }
}

.price-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-filter {
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:hover {
      background: #4b5563;
    }
  }
}

/* Results Section */
.results-section {
  margin-top: 1.5rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;

    @media (prefers-color-scheme: dark) {
      color: #f9fafb;
    }
  }
}

.view-options {
  display: flex;
  gap: 0.25rem;
}

.view-btn {
  padding: 0.5rem;
  background: white;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:first-child {
    border-radius: 0.375rem 0 0 0.375rem;
  }

  &:last-child {
    border-radius: 0 0.375rem 0.375rem 0;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.product-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &.out-of-stock {
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    &:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
  }
}

.product-header {
  margin-bottom: 1rem;
}

.product-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.product-brand {
  color: #6b7280;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.product-category {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #374151;
  width: fit-content;

  @media (prefers-color-scheme: dark) {
    background: #374151;
    color: #d1d5db;
  }
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .stars {
    color: #fbbf24;
    font-size: 1rem;
  }

  .rating-value {
    color: #6b7280;
    font-size: 0.875rem;

    @media (prefers-color-scheme: dark) {
      color: #9ca3af;
    }
  }
}

.stock-status {
  font-size: 0.875rem;
  font-weight: 500;

  &.in-stock {
    color: #059669;
  }

  &.out-of-stock {
    color: #ef4444;
  }
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  padding: 0.125rem 0.375rem;
  background: #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  color: #374151;

  @media (prefers-color-scheme: dark) {
    background: #4b5563;
    color: #d1d5db;
  }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: #374151;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .filter-sort-container {
    padding: 0.5rem;
  }

  .filter-groups {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .results-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
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
  inStock: boolean;
  tags: string[];
  dateAdded: Date;
}

interface FilterConfig {
  category: string;
  brand: string;
  priceRange: { min: number; max: number };
  minRating: number;
  inStock: boolean | null;
  tags: string[];
}

interface SortOption {
  key: keyof Product;
  label: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss']
})
export class FilterSortComponent {
  products: Product[] = [
    // Sample product data...
  ];

  filteredProducts: Product[] = [...this.products];
  
  filters: FilterConfig = {
    category: '',
    brand: '',
    priceRange: { min: 0, max: 500 },
    minRating: 0,
    inStock: null,
    tags: []
  };

  sortOptions: SortOption[] = [
    { key: 'name', label: 'Name A-Z', direction: 'asc' },
    { key: 'price', label: 'Price Low-High', direction: 'asc' },
    { key: 'rating', label: 'Rating High-Low', direction: 'desc' }
    // More sort options...
  ];

  currentSort: SortOption = this.sortOptions[0];
  searchQuery = '';
  showFilters = false;

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply search, category, brand, price, rating, stock, and tag filters
    // Implementation details...

    this.filteredProducts = filtered;
    this.applySorting();
  }

  applySorting(): void {
    this.filteredProducts.sort((a, b) => {
      const aValue = a[this.currentSort.key];
      const bValue = b[this.currentSort.key];

      let result = 0;
      if (aValue < bValue) result = -1;
      if (aValue > bValue) result = 1;

      return this.currentSort.direction === 'desc' ? -result : result;
    });
  }

  // Additional helper methods for filtering, sorting, and data manipulation...
}`;
  }
}