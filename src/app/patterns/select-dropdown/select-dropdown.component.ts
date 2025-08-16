import { Component, HostListener } from '@angular/core';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
  group?: string;
}

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  // Basic Select
  basicValue = '';
  basicIsOpen = false;
  
  // Multi-select
  multiValue: string[] = [];
  multiIsOpen = false;
  
  // Searchable Select
  searchableValue = '';
  searchableIsOpen = false;
  searchQuery = '';
  
  // Grouped Select
  groupedValue = '';
  groupedIsOpen = false;
  
  // Large Dataset Select
  largeValue = '';
  largeIsOpen = false;
  largeSearchQuery = '';

  basicOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
    { value: 'option5', label: 'Option 5' }
  ];

  multiOptions: SelectOption[] = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'typescript', label: 'TypeScript', icon: '🔷' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'go', label: 'Go', icon: '🐹' },
    { value: 'java', label: 'Java', icon: '☕' }
  ];

  searchableOptions: SelectOption[] = [
    { value: 'us', label: 'United States', icon: '🇺🇸' },
    { value: 'ca', label: 'Canada', icon: '🇨🇦' },
    { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
    { value: 'de', label: 'Germany', icon: '🇩🇪' },
    { value: 'fr', label: 'France', icon: '🇫🇷' },
    { value: 'jp', label: 'Japan', icon: '🇯🇵' },
    { value: 'au', label: 'Australia', icon: '🇦🇺' },
    { value: 'br', label: 'Brazil', icon: '🇧🇷' }
  ];

  groupedOptions: SelectOption[] = [
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'vue', label: 'Vue.js', group: 'Frontend' },
    { value: 'angular', label: 'Angular', group: 'Frontend' },
    { value: 'nodejs', label: 'Node.js', group: 'Backend' },
    { value: 'express', label: 'Express', group: 'Backend' },
    { value: 'django', label: 'Django', group: 'Backend' },
    { value: 'postgresql', label: 'PostgreSQL', group: 'Database' },
    { value: 'mongodb', label: 'MongoDB', group: 'Database' },
    { value: 'redis', label: 'Redis', group: 'Database' }
  ];

  largeOptions: SelectOption[] = [];

  constructor() {
    // Generate large dataset
    for (let i = 1; i <= 1000; i++) {
      this.largeOptions.push({
        value: `item${i}`,
        label: `Item ${i}`,
        description: `Description for item ${i}`
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    
    if (!target.closest('.select-container')) {
      this.basicIsOpen = false;
      this.multiIsOpen = false;
      this.searchableIsOpen = false;
      this.groupedIsOpen = false;
      this.largeIsOpen = false;
    }
  }

  // Basic Select Methods
  toggleBasicDropdown(): void {
    this.basicIsOpen = !this.basicIsOpen;
    this.closeOtherDropdowns('basic');
  }

  selectBasicOption(option: SelectOption): void {
    if (!option.disabled) {
      this.basicValue = option.value;
      this.basicIsOpen = false;
    }
  }

  getBasicSelectedLabel(): string {
    const selected = this.basicOptions.find(opt => opt.value === this.basicValue);
    return selected ? selected.label : 'Select an option';
  }

  // Multi-select Methods
  toggleMultiDropdown(): void {
    this.multiIsOpen = !this.multiIsOpen;
    this.closeOtherDropdowns('multi');
  }

  toggleMultiOption(option: SelectOption): void {
    if (option.disabled) return;
    
    const index = this.multiValue.indexOf(option.value);
    if (index > -1) {
      this.multiValue.splice(index, 1);
    } else {
      this.multiValue.push(option.value);
    }
  }

  isMultiOptionSelected(value: string): boolean {
    return this.multiValue.includes(value);
  }

  getMultiSelectedLabels(): string {
    if (this.multiValue.length === 0) return 'Select languages';
    if (this.multiValue.length === 1) {
      const selected = this.multiOptions.find(opt => opt.value === this.multiValue[0]);
      return selected ? selected.label : '';
    }
    return `${this.multiValue.length} selected`;
  }

  getMultiOptionLabel(value: string): string {
    const option = this.multiOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  }

  removeMultiSelection(value: string): void {
    const index = this.multiValue.indexOf(value);
    if (index > -1) {
      this.multiValue.splice(index, 1);
    }
  }

  // Searchable Select Methods
  toggleSearchableDropdown(): void {
    this.searchableIsOpen = !this.searchableIsOpen;
    this.closeOtherDropdowns('searchable');
    
    if (this.searchableIsOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('.searchable-input') as HTMLInputElement;
        searchInput?.focus();
      }, 100);
    }
  }

  selectSearchableOption(option: SelectOption): void {
    if (!option.disabled) {
      this.searchableValue = option.value;
      this.searchableIsOpen = false;
      this.searchQuery = '';
    }
  }

  getSearchableSelectedLabel(): string {
    const selected = this.searchableOptions.find(opt => opt.value === this.searchableValue);
    return selected ? selected.label : 'Select a country';
  }

  get filteredSearchableOptions(): SelectOption[] {
    if (!this.searchQuery.trim()) return this.searchableOptions;
    
    const query = this.searchQuery.toLowerCase();
    return this.searchableOptions.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }

  // Grouped Select Methods
  toggleGroupedDropdown(): void {
    this.groupedIsOpen = !this.groupedIsOpen;
    this.closeOtherDropdowns('grouped');
  }

  selectGroupedOption(option: SelectOption): void {
    if (!option.disabled) {
      this.groupedValue = option.value;
      this.groupedIsOpen = false;
    }
  }

  getGroupedSelectedLabel(): string {
    const selected = this.groupedOptions.find(opt => opt.value === this.groupedValue);
    return selected ? selected.label : 'Select a technology';
  }

  get groupedOptionsByGroup(): { [key: string]: SelectOption[] } {
    const groups: { [key: string]: SelectOption[] } = {};
    
    this.groupedOptions.forEach(option => {
      const group = option.group || 'Other';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(option);
    });
    
    return groups;
  }

  get groupKeys(): string[] {
    return Object.keys(this.groupedOptionsByGroup);
  }

  // Large Dataset Select Methods
  toggleLargeDropdown(): void {
    this.largeIsOpen = !this.largeIsOpen;
    this.closeOtherDropdowns('large');
    
    if (this.largeIsOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('.large-search-input') as HTMLInputElement;
        searchInput?.focus();
      }, 100);
    }
  }

  selectLargeOption(option: SelectOption): void {
    if (!option.disabled) {
      this.largeValue = option.value;
      this.largeIsOpen = false;
      this.largeSearchQuery = '';
    }
  }

  getLargeSelectedLabel(): string {
    const selected = this.largeOptions.find(opt => opt.value === this.largeValue);
    return selected ? selected.label : 'Select from 1000+ items';
  }

  get filteredLargeOptions(): SelectOption[] {
    if (!this.largeSearchQuery.trim()) return this.largeOptions.slice(0, 50); // Show first 50
    
    const query = this.largeSearchQuery.toLowerCase();
    return this.largeOptions
      .filter(option => option.label.toLowerCase().includes(query))
      .slice(0, 50); // Limit results for performance
  }

  // Utility Methods
  closeOtherDropdowns(except?: string): void {
    if (except !== 'basic') this.basicIsOpen = false;
    if (except !== 'multi') this.multiIsOpen = false;
    if (except !== 'searchable') this.searchableIsOpen = false;
    if (except !== 'grouped') this.groupedIsOpen = false;
    if (except !== 'large') this.largeIsOpen = false;
  }

  clearSearchQuery(): void {
    this.searchQuery = '';
  }

  clearLargeSearchQuery(): void {
    this.largeSearchQuery = '';
  }

  get htmlCode(): string {
    return `<!-- Basic Select Dropdown -->
<div class="select-container">
  <button class="select-trigger" (click)="toggleDropdown()">
    <span class="select-value">{{ getSelectedLabel() }}</span>
    <svg class="select-arrow" [class.open]="isOpen">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </button>
  
  <div class="select-dropdown" [class.open]="isOpen">
    <div *ngFor="let option of options" 
         class="select-option"
         [class.disabled]="option.disabled"
         (click)="selectOption(option)">
      <span class="option-icon" *ngIf="option.icon">{{ option.icon }}</span>
      <span class="option-label">{{ option.label }}</span>
    </div>
  </div>
</div>

<!-- Multi-Select Dropdown -->
<div class="select-container multi-select">
  <button class="select-trigger" (click)="toggleDropdown()">
    <div class="selected-items">
      <span *ngFor="let value of selectedValues" 
            class="selected-tag">
        {{ getOptionLabel(value) }}
        <button class="remove-btn" (click)="removeSelection(value)">×</button>
      </span>
    </div>
    <svg class="select-arrow" [class.open]="isOpen">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </button>
  
  <div class="select-dropdown" [class.open]="isOpen">
    <div *ngFor="let option of options" 
         class="select-option"
         [class.selected]="isOptionSelected(option.value)"
         (click)="toggleOption(option)">
      <input type="checkbox" 
             [checked]="isOptionSelected(option.value)"
             readonly>
      <span class="option-label">{{ option.label }}</span>
    </div>
  </div>
</div>

<!-- Searchable Select -->
<div class="select-container searchable">
  <button class="select-trigger" (click)="toggleDropdown()">
    <span class="select-value">{{ getSelectedLabel() }}</span>
    <svg class="select-arrow" [class.open]="isOpen">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </button>
  
  <div class="select-dropdown" [class.open]="isOpen">
    <div class="search-container">
      <input type="text" 
             class="search-input"
             placeholder="Search..."
             [(ngModel)]="searchQuery">
    </div>
    
    <div class="options-list">
      <div *ngFor="let option of filteredOptions" 
           class="select-option"
           (click)="selectOption(option)">
        <span class="option-icon" *ngIf="option.icon">{{ option.icon }}</span>
        <span class="option-label">{{ option.label }}</span>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Select Container */
.select-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}

/* Select Trigger */
.select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    border-color: #9ca3af;
  }
  
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

.select-value {
  flex: 1;
  text-align: left;
  color: #1f2937;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.select-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  transition: transform 0.2s ease;
  
  &.open {
    transform: rotate(180deg);
  }
}

/* Select Dropdown */
.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: 250px;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  
  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

/* Select Options */
.select-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #1f2937;
  
  &:hover {
    background: #f3f4f6;
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
    }
  }
  
  &.selected {
    background: #dbeafe;
    color: #1d4ed8;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
    
    &:hover {
      background: #374151;
    }
    
    &.selected {
      background: #1e3a8a;
      color: #93c5fd;
    }
  }
}

.option-icon {
  font-size: 1rem;
}

.option-label {
  flex: 1;
  font-size: 0.875rem;
}

/* Multi-Select Styles */
.multi-select {
  .select-trigger {
    min-height: 2.75rem;
    align-items: flex-start;
    padding: 0.5rem 1rem;
  }
  
  .selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    flex: 1;
    margin-right: 0.5rem;
  }
}

.selected-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #3b82f6;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
}

.remove-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    color: #fca5a5;
  }
}

/* Searchable Select */
.search-container {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

.options-list {
  max-height: 200px;
  overflow-y: auto;
}

/* Group Headers */
.group-header {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  
  @media (prefers-color-scheme: dark) {
    background: #111827;
    color: #9ca3af;
    border-bottom-color: #374151;
  }
}

/* Loading State */
.loading-state {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* No Results */
.no-results {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
  group?: string;
}

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  selectedValue = '';
  isOpen = false;
  searchQuery = '';
  
  options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.select-container')) {
      this.isOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.selectedValue = option.value;
      this.isOpen = false;
    }
  }

  getSelectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.selectedValue);
    return selected ? selected.label : 'Select an option';
  }

  get filteredOptions(): SelectOption[] {
    if (!this.searchQuery.trim()) return this.options;
    
    const query = this.searchQuery.toLowerCase();
    return this.options.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }
}`;
  }
}