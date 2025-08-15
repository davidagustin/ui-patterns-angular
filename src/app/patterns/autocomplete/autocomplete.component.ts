import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  query = '';
  suggestions: string[] = [];
  isOpen = false;
  selectedIndex = -1;

  countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Japan', 'Australia', 'Brazil', 'India', 'China', 'Mexico',
    'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Poland', 'Russia', 'South Korea'
  ];

  onInputChange(value: string): void {
    this.query = value;
    this.updateSuggestions();
  }

  updateSuggestions(): void {
    if (this.query.trim()) {
      const filtered = this.countries.filter(country =>
        country.toLowerCase().includes(this.query.toLowerCase())
      );
      this.suggestions = filtered;
      this.isOpen = filtered.length > 0;
      this.selectedIndex = -1;
    } else {
      this.suggestions = [];
      this.isOpen = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = this.selectedIndex < this.suggestions.length - 1 ? this.selectedIndex + 1 : this.selectedIndex;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : -1;
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.query = this.suggestions[this.selectedIndex];
          this.isOpen = false;
        }
        break;
      case 'Escape':
        this.isOpen = false;
        this.inputRef.nativeElement.blur();
        break;
    }
  }

  onSuggestionClick(suggestion: string): void {
    this.query = suggestion;
    this.isOpen = false;
    this.inputRef.nativeElement.focus();
  }

  onInputFocus(): void {
    if (this.suggestions.length > 0) {
      this.isOpen = true;
    }
  }

  onInputBlur(): void {
    // Delay closing to allow for clicks on suggestions
    setTimeout(() => this.isOpen = false, 200);
  }

  get exampleCode(): string {
    return `<!-- Basic Autocomplete Example -->
<div class="autocomplete-container">
  <input
    #inputRef
    type="text"
    [(ngModel)]="query"
    (input)="onInputChange($event.target.value)"
    (keydown)="onKeyDown($event)"
    (focus)="onInputFocus()"
    (blur)="onInputBlur()"
    placeholder="Type to search..."
    class="autocomplete-input"
    autocomplete="off"
    [attr.aria-expanded]="isOpen"
    aria-haspopup="listbox"
    [attr.aria-activedescendant]="selectedIndex >= 0 ? 'suggestion-' + selectedIndex : null"
    role="combobox"
    aria-autocomplete="list"
  />
  
  <div *ngIf="isOpen && suggestions.length > 0" 
       class="suggestions-dropdown"
       role="listbox">
    <button
      *ngFor="let suggestion of suggestions; let i = index"
      [id]="'suggestion-' + i"
      (click)="onSuggestionClick(suggestion)"
      [class]="'suggestion-item ' + (i === selectedIndex ? 'selected' : '')"
      role="option"
      [attr.aria-selected]="i === selectedIndex">
      {{ suggestion }}
    </button>
  </div>
</div>

<!-- Component TypeScript -->
export class AutocompleteComponent {
  query = '';
  suggestions: string[] = [];
  isOpen = false;
  selectedIndex = -1;
  
  countries = ['United States', 'Canada', 'United Kingdom', ...];
  
  onInputChange(value: string): void {
    this.query = value;
    if (value.trim()) {
      this.suggestions = this.countries.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      this.isOpen = this.suggestions.length > 0;
    } else {
      this.isOpen = false;
    }
  }
  
  onSuggestionClick(suggestion: string): void {
    this.query = suggestion;
    this.isOpen = false;
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="autocomplete-pattern-container">
  <app-pattern-header
    title="🔍 Autocomplete Pattern"
    description="Provide real-time suggestions as users type, helping them find options quickly and reducing input errors."
    [showBreadcrumb]="false">
  </app-pattern-header>

  <div class="pattern-layout">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Start typing a country name to see autocomplete suggestions. Use arrow keys to navigate and Enter to select.
        </p>
        
        <div class="autocomplete-container">
          <label for="autocomplete-input" class="sr-only">Search countries</label>
          <input
            #inputRef
            id="autocomplete-input"
            type="text"
            [(ngModel)]="query"
            (input)="onInputChange($any($event.target).value)"
            (keydown)="onKeyDown($event)"
            (focus)="onInputFocus()"
            (blur)="onInputBlur()"
            placeholder="Type to search..."
            class="autocomplete-input"
            autocomplete="off"
            [attr.aria-expanded]="isOpen"
            aria-haspopup="listbox"
            aria-controls="suggestions-listbox"
            [attr.aria-activedescendant]="selectedIndex >= 0 ? 'suggestion-' + selectedIndex : null"
            role="combobox"
            aria-autocomplete="list"
          />
          
          <div *ngIf="isOpen && suggestions.length > 0" 
               id="suggestions-listbox"
               class="suggestions-dropdown"
               role="listbox"
               aria-label="Country suggestions">
            <button
              *ngFor="let suggestion of suggestions; let i = index"
              [id]="'suggestion-' + i"
              (click)="onSuggestionClick(suggestion)"
              [class]="'suggestion-item ' + (i === selectedIndex ? 'selected' : '')"
              role="option"
              [attr.aria-selected]="i === selectedIndex">
              {{ suggestion }}
            </button>
          </div>
        </div>

        <div class="keyboard-shortcuts">
          <h4 class="shortcuts-title">Keyboard Shortcuts</h4>
          <div class="shortcuts-list">
            <div class="shortcut-item">
              <kbd class="keyboard-key">↑↓</kbd> Navigate suggestions
            </div>
            <div class="shortcut-item">
              <kbd class="keyboard-key">Enter</kbd> Select highlighted suggestion
            </div>
            <div class="shortcut-item">
              <kbd class="keyboard-key">Escape</kbd> Close suggestions
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="code-section">
      <app-code-tabs 
        [exampleCode]="exampleCode"
        [htmlCode]="htmlCode" 
        [scssCode]="scssCode" 
        [typescriptCode]="typescriptCode"
        title="Code Example">
      </app-code-tabs>
    </div>
  </div>

  <!-- Key Features -->
  <div class="features-section">
    <h3 class="features-title">✨ Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Real-time Filtering</h4>
          <p class="feature-description">Instant suggestions as user types</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Keyboard Navigation</h4>
          <p class="feature-description">Arrow keys, Enter, and Escape support</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Visual Feedback</h4>
          <p class="feature-description">Highlighted selection and hover states</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Accessibility</h4>
          <p class="feature-description">Screen reader support and ARIA labels</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Use Cases -->
  <div class="use-cases-section">
    <h3 class="use-cases-title">🎯 Common Use Cases</h3>
    <div class="use-cases-grid">
      <div class="use-case-item">
        <div class="use-case-icon">🌍</div>
        <h4 class="use-case-name">Country Selection</h4>
        <p class="use-case-description">Quick country lookup in forms and settings</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">🔍</div>
        <h4 class="use-case-name">Search Suggestions</h4>
        <p class="use-case-description">Product search with instant results</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">👤</div>
        <h4 class="use-case-name">User Selection</h4>
        <p class="use-case-description">Tagging users in comments or mentions</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Autocomplete Container */
.autocomplete-container {
  position: relative;
  width: 100%;
}

/* Input Field */
.autocomplete-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;

    &:focus {
      border-color: #60a5fa;
    }

    &::placeholder {
      color: #6b7280;
    }
  }
}

/* Suggestions Dropdown */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: 15rem;
  overflow-y: auto;
  animation: dropdownSlideIn 0.2s ease-out;

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-color: #374151;
  }
}

/* Suggestion Item */
.suggestion-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.15s ease;
  color: #374151;
  font-size: 0.875rem;

  &:hover {
    background-color: #f3f4f6;
  }

  &.selected {
    background-color: #dbeafe;
    color: #1e40af;
    font-weight: 500;
  }

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;

    &:hover {
      background-color: #374151;
    }

    &.selected {
      background-color: #1e3a8a;
      color: #93c5fd;
    }
  }
}

/* Dropdown Animation */
@keyframes dropdownSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Keyboard Shortcuts */
.keyboard-shortcuts {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background-color: #111827;
  }
}

.shortcuts-title {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.shortcut-item {
  font-size: 0.75rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.keyboard-key {
  padding: 0.125rem 0.25rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-family: ui-monospace, monospace;

  @media (prefers-color-scheme: dark) {
    background-color: #374151;
    color: #f9fafb;
  }
}

/* Loading State */
.suggestions-loading {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-style: italic;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @media (prefers-color-scheme: dark) {
    border-color: #374151;
    border-top-color: #60a5fa;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* No Results State */
.no-results {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-style: italic;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Highlighted Text */
.highlighted-text {
  background-color: #fef3c7;
  color: #92400e;
  font-weight: 600;

  @media (prefers-color-scheme: dark) {
    background-color: #451a03;
    color: #fed7aa;
  }
}

/* Scrollbar Styling */
.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
  }
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;

  &:hover {
    background: #94a3b8;
  }

  @media (prefers-color-scheme: dark) {
    background: #4b5563;

    &:hover {
      background: #6b7280;
    }
  }
}

/* Focus states for accessibility */
.autocomplete-input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.suggestion-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .autocomplete-input {
    border-width: 2px;
  }
  
  .suggestions-dropdown {
    border-width: 2px;
  }
  
  .suggestion-item.selected {
    background-color: #000;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      background-color: #fff;
      color: #000;
    }
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .suggestions-dropdown {
    max-height: 12rem;
  }
  
  .suggestion-item {
    padding: 1rem;
    font-size: 1rem;
  }

  .keyboard-shortcuts {
    padding: 0.5rem;
  }

  .shortcuts-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .shortcut-item {
    font-size: 0.625rem;
  }
}

/* Common pattern styles */
.autocomplete-pattern-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.pattern-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.example-section {
  display: flex;
  flex-direction: column;
}

.example-card {
  background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 0.75rem;
  padding: 1.5rem;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #1e3a8a20 0%, #581c8720 100%);
    border-color: #1e40af;
  }
}

.example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1e40af;

  @media (prefers-color-scheme: dark) {
    color: #93c5fd;
  }
}

.example-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.code-section {
  display: flex;
  flex-direction: column;
}

.features-section {
  background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%);
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #14532d20 0%, #1e3a8a20 100%);
    border-color: #166534;
  }
}

.features-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #166534;

  @media (prefers-color-scheme: dark) {
    color: #86efac;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-icon {
  color: #16a34a;
  font-size: 1.125rem;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    color: #4ade80;
  }
}

.feature-content {
  flex: 1;
}

.feature-name {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.feature-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.use-cases-section {
  background: linear-gradient(135deg, #fdf4ff 0%, #fef3c7 100%);
  border: 1px solid #e879f9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #581c8720 0%, #78350f20 100%);
    border-color: #a855f7;
  }
}

.use-cases-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #7c2d12;

  @media (prefers-color-scheme: dark) {
    color: #fbbf24;
  }
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.use-case-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.use-case-icon {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.use-case-name {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.use-case-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`;
  }

  get typescriptCode(): string {
    return `import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  query = '';
  suggestions: string[] = [];
  isOpen = false;
  selectedIndex = -1;

  countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Japan', 'Australia', 'Brazil', 'India', 'China', 'Mexico',
    'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Poland', 'Russia', 'South Korea'
  ];

  onInputChange(value: string): void {
    this.query = value;
    this.updateSuggestions();
  }

  private updateSuggestions(): void {
    if (this.query.trim()) {
      const filtered = this.countries.filter(country =>
        country.toLowerCase().includes(this.query.toLowerCase())
      );
      this.suggestions = filtered;
      this.isOpen = filtered.length > 0;
      this.selectedIndex = -1;
    } else {
      this.suggestions = [];
      this.isOpen = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = this.selectedIndex < this.suggestions.length - 1 
          ? this.selectedIndex + 1 
          : this.selectedIndex;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = this.selectedIndex > 0 
          ? this.selectedIndex - 1 
          : -1;
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.query = this.suggestions[this.selectedIndex];
          this.isOpen = false;
        }
        break;
      case 'Escape':
        this.isOpen = false;
        this.inputRef.nativeElement.blur();
        break;
    }
  }

  onSuggestionClick(suggestion: string): void {
    this.query = suggestion;
    this.isOpen = false;
    this.inputRef.nativeElement.focus();
  }

  onInputFocus(): void {
    if (this.suggestions.length > 0) {
      this.isOpen = true;
    }
  }

  onInputBlur(): void {
    // Delay closing to allow for clicks on suggestions
    setTimeout(() => this.isOpen = false, 200);
  }
}

// Advanced example with async data loading
export class AdvancedAutocompleteComponent {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  query = '';
  suggestions: any[] = [];
  isOpen = false;
  isLoading = false;
  selectedIndex = -1;
  private searchTimeout: any;

  async onInputChange(value: string): Promise<void> {
    this.query = value;
    
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (!value.trim()) {
      this.suggestions = [];
      this.isOpen = false;
      this.isLoading = false;
      return;
    }

    // Debounce search
    this.isLoading = true;
    this.searchTimeout = setTimeout(async () => {
      try {
        this.suggestions = await this.searchService.search(value);
        this.isOpen = this.suggestions.length > 0;
        this.selectedIndex = -1;
      } catch (error) {
        console.error('Search error:', error);
        this.suggestions = [];
        this.isOpen = false;
      } finally {
        this.isLoading = false;
      }
    }, 300);
  }

  // Highlight matching text in suggestions
  highlightMatch(text: string, query: string): string {
    if (!query) return text;
    
    const regex = new RegExp(\`(\${query})\`, 'gi');
    return text.replace(regex, '<mark class="highlighted-text">$1</mark>');
  }
}`;
  }
}