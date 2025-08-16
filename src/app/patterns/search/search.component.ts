import { Component } from '@angular/core';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery = '';
  isSearchFocused = false;
  showResults = false;
  selectedIndex = -1;

  allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Accordion Menu Pattern',
      description: 'Expandable content sections with smooth animations',
      category: 'Navigation',
      url: '/patterns/accordion-menu',
      icon: '=�'
    },
    {
      id: '2', 
      title: 'Modal Dialog Pattern',
      description: 'Overlay dialogs with backdrop and focus management',
      category: 'Interaction',
      url: '/patterns/modal',
      icon: '=�'
    },
    {
      id: '3',
      title: 'Card Layout Pattern',
      description: 'Content cards with filtering and view modes',
      category: 'Layout',
      url: '/patterns/cards',
      icon: '<�'
    },
    {
      id: '4',
      title: 'Tabs Navigation',
      description: 'Organize content into navigable sections',
      category: 'Navigation',
      url: '/patterns/tabs',
      icon: '=�'
    },
    {
      id: '5',
      title: 'Dropdown Menu',
      description: 'Interactive dropdowns with advanced features',
      category: 'Navigation',
      url: '/patterns/dropdown-menu',
      icon: '=�'
    },
    {
      id: '6',
      title: 'Form Patterns',
      description: 'Comprehensive form patterns with validation',
      category: 'Forms',
      url: '/patterns/forms',
      icon: '=�'
    }
  ];

  get filteredResults(): SearchResult[] {
    if (!this.searchQuery.trim()) {
      return [];
    }

    const query = this.searchQuery.toLowerCase();
    return this.allResults.filter(result =>
      result.title.toLowerCase().includes(query) ||
      result.description.toLowerCase().includes(query) ||
      result.category.toLowerCase().includes(query)
    );
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.showResults = this.searchQuery.length > 0;
    this.selectedIndex = -1;
  }

  onSearchFocus(): void {
    this.isSearchFocused = true;
    if (this.searchQuery.length > 0) {
      this.showResults = true;
    }
  }

  onSearchBlur(): void {
    this.isSearchFocused = false;
    // Delay hiding results to allow for clicks
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.showResults || this.filteredResults.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredResults.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectResult(this.filteredResults[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.showResults = false;
        this.selectedIndex = -1;
        break;
    }
  }

  selectResult(result: SearchResult): void {
    console.log('Selected result:', result);
    this.searchQuery = result.title;
    this.showResults = false;
    this.selectedIndex = -1;
    // In real app: this.router.navigate([result.url]);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.showResults = false;
    this.selectedIndex = -1;
  }

  get htmlCode(): string {
    return `<div class="pattern-demo">
  <div class="search-container">
  <div class="search-input-wrapper" [class.focused]="isSearchFocused">
    <div class="search-icon">
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
    </div>
    
    <input
      type="text"
      placeholder="Search patterns..."
      [(ngModel)]="searchQuery"
      (input)="onSearchInput($event)"
      (focus)="onSearchFocus()"
      (blur)="onSearchBlur()"
      (keydown)="onKeyDown($event)"
      class="search-input"
      autocomplete="off">
    
    <button *ngIf="searchQuery" 
            (click)="clearSearch()" 
            class="clear-button">
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
  </div>

  <div *ngIf="showResults" class="search-results">
    <div *ngIf="filteredResults.length === 0" class="no-results">
      <span class="no-results-icon">=</span>
      <p>No results found for "{{ searchQuery }}"</p>
    </div>
    
    <div *ngFor="let result of filteredResults; let i = index"
         (click)="selectResult(result)"
         [class.selected]="i === selectedIndex"
         class="search-result-item">
      
      <div class="result-icon">{{ result.icon }}</div>
      
      <div class="result-content">
        <h4 class="result-title">{{ result.title }}</h4>
        <p class="result-description">{{ result.description }}</p>
        <span class="result-category">{{ result.category }}</span>
      </div>
    </div>
  </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Search Container */
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
}

/* Search Input Wrapper */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;

  &.focused {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    &.focused {
      border-color: #60a5fa;
    }
  }
}

/* Search Icon */
.search-icon {
  display: flex;
  align-items: center;
  padding-left: 16px;
  color: #9ca3af;

  svg {
    width: 20px;
    height: 20px;
  }
}

/* Search Input */
.search-input {
  flex: 1;
  padding: 16px 12px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #1f2937;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;

    &::placeholder {
      color: #6b7280;
    }
  }
}

/* Clear Button */
.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 8px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: #374151;
      color: #9ca3af;
    }
  }
}

/* Search Results */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 50;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
}

/* No Results */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  text-align: center;
  color: #6b7280;

  .no-results-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Search Result Item */
.search-result-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &.selected {
    background: #f8fafc;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;

    &:hover,
    &.selected {
      background: #374151;
    }
  }
}

/* Result Icon */
.result-icon {
  font-size: 24px;
  line-height: 1;
  margin-top: 2px;
}

/* Result Content */
.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.result-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
  line-height: 1.4;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.result-category {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  color: #3b82f6;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 12px;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
    background: #1e3a8a;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery = '';
  isSearchFocused = false;
  showResults = false;
  selectedIndex = -1;

  allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Accordion Menu Pattern',
      description: 'Expandable content sections with smooth animations',
      category: 'Navigation',
      url: '/patterns/accordion-menu',
      icon: '=�'
    }
    // ... more results
  ];

  get filteredResults(): SearchResult[] {
    if (!this.searchQuery.trim()) {
      return [];
    }

    const query = this.searchQuery.toLowerCase();
    return this.allResults.filter(result =>
      result.title.toLowerCase().includes(query) ||
      result.description.toLowerCase().includes(query) ||
      result.category.toLowerCase().includes(query)
    );
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.showResults = this.searchQuery.length > 0;
    this.selectedIndex = -1;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.showResults) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredResults.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectResult(this.filteredResults[this.selectedIndex]);
        }
        break;
    }
  }

  selectResult(result: SearchResult): void {
    console.log('Selected result:', result);
    this.searchQuery = result.title;
    this.showResults = false;
  }
}`;
  }
}