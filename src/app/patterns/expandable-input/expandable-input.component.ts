import { Component } from '@angular/core';

interface SearchSuggestion {
  id: string;
  text: string;
  category: string;
  icon?: string;
}

@Component({
  selector: 'app-expandable-input',
  templateUrl: './expandable-input.component.html',
  styleUrls: ['./expandable-input.component.scss']
})
export class ExpandableInputComponent {
  searchValue = '';
  isExpanded = false;
  showSuggestions = false;
  activeDemo: 'search' | 'textarea' | 'tags' = 'search';
  tagInput = '';
  textareaValue = '';
  tags: string[] = ['angular', 'typescript'];

  suggestions: SearchSuggestion[] = [
    { id: '1', text: 'Angular Components', category: 'Framework', icon: '🔶' },
    { id: '2', text: 'TypeScript Interfaces', category: 'Language', icon: '🔷' },
    { id: '3', text: 'RxJS Observables', category: 'Library', icon: '🔴' },
    { id: '4', text: 'Material Design', category: 'Design', icon: '🎨' },
    { id: '5', text: 'Progressive Web Apps', category: 'Technology', icon: '📱' },
    { id: '6', text: 'State Management', category: 'Architecture', icon: '🏗️' }
  ];

  get filteredSuggestions(): SearchSuggestion[] {
    if (!this.searchValue.trim()) return this.suggestions;
    return this.suggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      suggestion.category.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  onSearchFocus(): void {
    this.isExpanded = true;
    this.showSuggestions = true;
  }

  onSearchBlur(): void {
    setTimeout(() => {
      this.isExpanded = false;
      this.showSuggestions = false;
    }, 150);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue = input.value;
    this.showSuggestions = input.value.length > 0;
  }

  selectSuggestion(suggestion: SearchSuggestion): void {
    this.searchValue = suggestion.text;
    this.showSuggestions = false;
  }

  clearSearch(): void {
    this.searchValue = '';
    this.showSuggestions = false;
  }

  // Tag input methods
  onTagKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.tagInput.trim()) {
      this.addTag(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag.toLowerCase())) {
      this.tags.push(tag.toLowerCase());
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  setActiveDemo(demo: 'search' | 'textarea' | 'tags'): void {
    this.activeDemo = demo;
  }

  get exampleCode(): string {
    return `<!-- Simple Expandable Search -->
<div class="expandable-search" [class.expanded]="isExpanded">
  <input
    type="text"
    [(ngModel)]="searchValue"
    (focus)="onSearchFocus()"
    (blur)="onSearchBlur()"
    placeholder="Search..."
    class="search-input">
  
  <div *ngIf="showSuggestions" class="suggestions">
    <div 
      *ngFor="let suggestion of filteredSuggestions"
      class="suggestion-item"
      (click)="selectSuggestion(suggestion)">
      {{ suggestion.text }}
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class ExpandableSearch {
  searchValue = '';
  isExpanded = false;
  showSuggestions = false;
  
  suggestions = [
    { text: 'Angular Components', category: 'Framework' },
    { text: 'TypeScript', category: 'Language' }
  ];

  onSearchFocus() {
    this.isExpanded = true;
    this.showSuggestions = true;
  }

  onSearchBlur() {
    setTimeout(() => {
      this.isExpanded = false;
      this.showSuggestions = false;
    }, 150);
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="expandable-input-container">
  <!-- Demo Controls -->
  <div class="demo-controls">
    <button 
      *ngFor="let demo of ['search', 'textarea', 'tags']"
      (click)="setActiveDemo(demo)"
      [class.active]="activeDemo === demo"
      class="demo-btn">
      {{ demo | titlecase }} Demo
    </button>
  </div>

  <!-- Search Demo -->
  <div *ngIf="activeDemo === 'search'" class="search-demo">
    <h3 class="demo-title">Expandable Search with Suggestions</h3>
    
    <div class="expandable-search" [class.expanded]="isExpanded">
      <div class="search-container">
        <input
          type="text"
          [(ngModel)]="searchValue"
          (focus)="onSearchFocus()"
          (blur)="onSearchBlur()"
          (input)="onSearchInput($event)"
          placeholder="Start typing to search..."
          class="search-input">
        
        <button 
          *ngIf="searchValue"
          (click)="clearSearch()"
          class="clear-button">
          ×
        </button>
        
        <div class="search-icon">
          🔍
        </div>
      </div>
      
      <div *ngIf="showSuggestions && filteredSuggestions.length > 0" 
           class="suggestions-dropdown">
        <div 
          *ngFor="let suggestion of filteredSuggestions"
          class="suggestion-item"
          (click)="selectSuggestion(suggestion)">
          <span class="suggestion-icon">{{ suggestion.icon }}</span>
          <div class="suggestion-content">
            <span class="suggestion-text">{{ suggestion.text }}</span>
            <span class="suggestion-category">{{ suggestion.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Textarea Demo -->
  <div *ngIf="activeDemo === 'textarea'" class="textarea-demo">
    <h3 class="demo-title">Auto-expanding Textarea</h3>
    
    <div class="expandable-textarea-container">
      <textarea
        [(ngModel)]="textareaValue"
        placeholder="Start typing and watch the textarea expand..."
        class="expandable-textarea"
        rows="2"
        [style.height]="'auto'"></textarea>
      
      <div class="character-count">
        {{ textareaValue.length }} characters
      </div>
    </div>
  </div>

  <!-- Tags Demo -->
  <div *ngIf="activeDemo === 'tags'" class="tags-demo">
    <h3 class="demo-title">Expandable Tag Input</h3>
    
    <div class="tag-input-container">
      <div class="tags-list">
        <span 
          *ngFor="let tag of tags; let i = index"
          class="tag-item">
          {{ tag }}
          <button 
            (click)="removeTag(i)"
            class="tag-remove">
            ×
          </button>
        </span>
      </div>
      
      <input
        type="text"
        [(ngModel)]="tagInput"
        (keypress)="onTagKeyPress($event)"
        placeholder="Add tags (press Enter)"
        class="tag-input">
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Expandable Input Styles */
.expandable-input-container {
  padding: var(--spacing-6);
  max-width: 800px;
  margin: 0 auto;
}

/* Demo Controls */
.demo-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;
}

.demo-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    border-color: var(--primary-500);
  }

  &.active {
    background: var(--primary-600);
    color: white;
    border-color: var(--primary-600);
  }
}

/* Demo Titles */
.demo-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-4) 0;
  text-align: center;
}

/* Expandable Search */
.expandable-search {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  transition: all var(--transition-normal);

  &.expanded {
    max-width: 600px;
  }
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-12) var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
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

.search-icon {
  position: absolute;
  right: var(--spacing-4);
  font-size: var(--font-size-lg);
  color: var(--text-tertiary);
  pointer-events: none;
}

.clear-button {
  position: absolute;
  right: var(--spacing-10);
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-tertiary);
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-100);
    color: var(--text-secondary);
  }
}

/* Suggestions Dropdown */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-top: none;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  cursor: pointer;
  transition: background var(--transition-normal);
  border-bottom: 1px solid var(--border-secondary);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--primary-50);
  }
}

.suggestion-icon {
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.suggestion-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.suggestion-text {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.suggestion-category {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* Expandable Textarea */
.expandable-textarea-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.expandable-textarea {
  width: 100%;
  min-height: 80px;
  max-height: 300px;
  padding: var(--spacing-4);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-family: inherit;
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: none;
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

.character-count {
  text-align: right;
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* Tag Input */
.tag-input-container {
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2);
  background: var(--bg-primary);
  transition: all var(--transition-normal);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  align-items: center;

  &:focus-within {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-500);
  }
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  background: var(--primary-100);
  color: var(--primary-800);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  animation: tagSlideIn 0.2s ease-out;
}

@keyframes tagSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tag-remove {
  background: none;
  border: none;
  color: var(--primary-600);
  font-size: var(--font-size-sm);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color var(--transition-normal);

  &:hover {
    color: var(--primary-800);
  }
}

.tag-input {
  flex: 1;
  min-width: 120px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-2);

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .expandable-input-container {
    padding: var(--spacing-4);
  }

  .expandable-search {
    max-width: 100%;

    &.expanded {
      max-width: 100%;
    }
  }

  .demo-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
  }

  .suggestion-item {
    padding: var(--spacing-2);
  }

  .tag-input-container {
    max-width: 100%;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .suggestions-dropdown {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  .tag-item {
    background: var(--primary-800);
    color: var(--primary-200);
  }

  .tag-remove {
    color: var(--primary-400);

    &:hover {
      color: var(--primary-200);
    }
  }

  .suggestion-item:hover {
    background: var(--primary-900);
  }
}

/* Accessibility */
.search-input:focus-visible,
.expandable-textarea:focus-visible,
.tag-input:focus-visible,
.demo-btn:focus-visible,
.clear-button:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .expandable-search,
  .search-input,
  .expandable-textarea,
  .tag-input-container,
  .demo-btn,
  .suggestion-item,
  .tag-item {
    transition: none;
  }

  .tag-item {
    animation: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface SearchSuggestion {
  id: string;
  text: string;
  category: string;
  icon?: string;
}

@Component({
  selector: 'app-expandable-input',
  templateUrl: './expandable-input.component.html',
  styleUrls: ['./expandable-input.component.scss']
})
export class ExpandableInputComponent {
  searchValue = '';
  isExpanded = false;
  showSuggestions = false;
  activeDemo: 'search' | 'textarea' | 'tags' = 'search';
  tagInput = '';
  textareaValue = '';
  tags: string[] = ['angular', 'typescript'];

  suggestions: SearchSuggestion[] = [
    { id: '1', text: 'Angular Components', category: 'Framework', icon: '🔶' },
    { id: '2', text: 'TypeScript Interfaces', category: 'Language', icon: '🔷' },
    { id: '3', text: 'RxJS Observables', category: 'Library', icon: '🔴' }
  ];

  get filteredSuggestions(): SearchSuggestion[] {
    if (!this.searchValue.trim()) return this.suggestions;
    return this.suggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      suggestion.category.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  onSearchFocus(): void {
    this.isExpanded = true;
    this.showSuggestions = true;
  }

  onSearchBlur(): void {
    setTimeout(() => {
      this.isExpanded = false;
      this.showSuggestions = false;
    }, 150);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue = input.value;
    this.showSuggestions = input.value.length > 0;
  }

  selectSuggestion(suggestion: SearchSuggestion): void {
    this.searchValue = suggestion.text;
    this.showSuggestions = false;
  }

  // Tag input methods
  onTagKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.tagInput.trim()) {
      this.addTag(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag.toLowerCase())) {
      this.tags.push(tag.toLowerCase());
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }
}`;
  }
}