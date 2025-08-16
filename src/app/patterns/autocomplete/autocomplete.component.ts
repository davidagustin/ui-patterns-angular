import { Component, HostListener } from '@angular/core';

interface AutocompleteOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  category?: string;
  avatar?: string;
  icon?: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  // Basic Autocomplete
  basicQuery = '';
  basicIsOpen = false;
  basicSelectedIndex = -1;
  
  // Multi-select Autocomplete
  multiQuery = '';
  multiIsOpen = false;
  multiSelectedIndex = -1;
  multiSelectedItems: AutocompleteOption[] = [];
  
  // User Search Autocomplete
  userQuery = '';
  userIsOpen = false;
  userSelectedIndex = -1;

  countries: AutocompleteOption[] = [
    { id: '1', label: 'United States', value: 'us', icon: '🇺🇸' },
    { id: '2', label: 'Canada', value: 'ca', icon: '🇨🇦' },
    { id: '3', label: 'United Kingdom', value: 'uk', icon: '🇬🇧' },
    { id: '4', label: 'Germany', value: 'de', icon: '🇩🇪' },
    { id: '5', label: 'France', value: 'fr', icon: '🇫🇷' },
    { id: '6', label: 'Japan', value: 'jp', icon: '🇯🇵' },
    { id: '7', label: 'Australia', value: 'au', icon: '🇦🇺' },
    { id: '8', label: 'Brazil', value: 'br', icon: '🇧🇷' }
  ];

  languages: AutocompleteOption[] = [
    { id: '1', label: 'JavaScript', value: 'javascript', icon: '🟨', category: 'Frontend' },
    { id: '2', label: 'TypeScript', value: 'typescript', icon: '🔷', category: 'Frontend' },
    { id: '3', label: 'Python', value: 'python', icon: '🐍', category: 'Backend' },
    { id: '4', label: 'Java', value: 'java', icon: '☕', category: 'Backend' },
    { id: '5', label: 'C++', value: 'cpp', icon: '⚡', category: 'System' },
    { id: '6', label: 'Rust', value: 'rust', icon: '🦀', category: 'System' }
  ];

  users: AutocompleteOption[] = [
    { 
      id: '1', 
      label: 'John Doe', 
      value: 'john.doe', 
      description: 'Software Engineer',
      avatar: '👨‍💻',
      category: 'Engineering'
    },
    { 
      id: '2', 
      label: 'Jane Smith', 
      value: 'jane.smith', 
      description: 'Product Manager',
      avatar: '👩‍💼',
      category: 'Product'
    },
    { 
      id: '3', 
      label: 'Mike Johnson', 
      value: 'mike.johnson', 
      description: 'UX Designer',
      avatar: '👨‍🎨',
      category: 'Design'
    }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.autocomplete-container')) {
      this.closeAllDropdowns();
    }
  }

  // Basic Autocomplete Methods
  onBasicInput(): void {
    this.basicIsOpen = this.basicQuery.length > 0;
    this.basicSelectedIndex = -1;
  }

  onBasicKeydown(event: KeyboardEvent): void {
    const filteredOptions = this.getFilteredCountries();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.basicSelectedIndex = Math.min(this.basicSelectedIndex + 1, filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.basicSelectedIndex = Math.max(this.basicSelectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.basicSelectedIndex >= 0) {
          this.selectBasicOption(filteredOptions[this.basicSelectedIndex]);
        }
        break;
      case 'Escape':
        this.basicIsOpen = false;
        break;
    }
  }

  selectBasicOption(option: AutocompleteOption): void {
    this.basicQuery = option.label;
    this.basicIsOpen = false;
    this.basicSelectedIndex = -1;
  }

  getFilteredCountries(): AutocompleteOption[] {
    if (!this.basicQuery.trim()) return [];
    
    const query = this.basicQuery.toLowerCase();
    return this.countries.filter(country =>
      country.label.toLowerCase().includes(query) ||
      country.value.toLowerCase().includes(query)
    ).slice(0, 6);
  }

  // Multi-select Autocomplete Methods
  onMultiInput(): void {
    this.multiIsOpen = this.multiQuery.length > 0;
    this.multiSelectedIndex = -1;
  }

  onMultiKeydown(event: KeyboardEvent): void {
    const filteredOptions = this.getFilteredLanguages();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.multiSelectedIndex = Math.min(this.multiSelectedIndex + 1, filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.multiSelectedIndex = Math.max(this.multiSelectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.multiSelectedIndex >= 0) {
          this.selectMultiOption(filteredOptions[this.multiSelectedIndex]);
        }
        break;
      case 'Backspace':
        if (this.multiQuery === '' && this.multiSelectedItems.length > 0) {
          this.removeMultiItem(this.multiSelectedItems[this.multiSelectedItems.length - 1]);
        }
        break;
      case 'Escape':
        this.multiIsOpen = false;
        break;
    }
  }

  selectMultiOption(option: AutocompleteOption): void {
    if (!this.multiSelectedItems.find(item => item.id === option.id)) {
      this.multiSelectedItems.push(option);
    }
    this.multiQuery = '';
    this.multiIsOpen = false;
    this.multiSelectedIndex = -1;
  }

  removeMultiItem(option: AutocompleteOption): void {
    this.multiSelectedItems = this.multiSelectedItems.filter(item => item.id !== option.id);
  }

  getFilteredLanguages(): AutocompleteOption[] {
    if (!this.multiQuery.trim()) return [];
    
    const query = this.multiQuery.toLowerCase();
    const selectedIds = this.multiSelectedItems.map(item => item.id);
    
    return this.languages.filter(lang =>
      !selectedIds.includes(lang.id) &&
      (lang.label.toLowerCase().includes(query) ||
       lang.value.toLowerCase().includes(query) ||
       lang.category?.toLowerCase().includes(query))
    ).slice(0, 5);
  }

  // User Search Methods
  onUserInput(): void {
    this.userIsOpen = this.userQuery.length > 0;
    this.userSelectedIndex = -1;
  }

  onUserKeydown(event: KeyboardEvent): void {
    const filteredOptions = this.getFilteredUsers();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.userSelectedIndex = Math.min(this.userSelectedIndex + 1, filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.userSelectedIndex = Math.max(this.userSelectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.userSelectedIndex >= 0) {
          this.selectUserOption(filteredOptions[this.userSelectedIndex]);
        }
        break;
      case 'Escape':
        this.userIsOpen = false;
        break;
    }
  }

  selectUserOption(option: AutocompleteOption): void {
    this.userQuery = option.label;
    this.userIsOpen = false;
    this.userSelectedIndex = -1;
  }

  getFilteredUsers(): AutocompleteOption[] {
    if (!this.userQuery.trim()) return [];
    
    const query = this.userQuery.toLowerCase();
    return this.users.filter(user =>
      user.label.toLowerCase().includes(query) ||
      user.description?.toLowerCase().includes(query) ||
      user.category?.toLowerCase().includes(query)
    );
  }

  closeAllDropdowns(): void {
    this.basicIsOpen = false;
    this.multiIsOpen = false;
    this.userIsOpen = false;
    this.basicSelectedIndex = -1;
    this.multiSelectedIndex = -1;
    this.userSelectedIndex = -1;
  }

  highlightMatch(text: string, query: string): string {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  get htmlCode(): string {
    return `<!-- Basic Autocomplete -->
<div class="autocomplete-container">
  <label class="autocomplete-label">Search Countries</label>
  <input type="text"
         class="autocomplete-input"
         placeholder="Type to search..."
         [(ngModel)]="query"
         (input)="onInput()"
         (keydown)="onKeydown($event)">
  
  <div class="autocomplete-dropdown" [class.open]="isOpen">
    <div *ngFor="let option of filteredOptions; let i = index"
         class="autocomplete-option"
         [class.highlighted]="i === selectedIndex"
         (click)="selectOption(option)">
      <span class="option-icon" *ngIf="option.icon">{{ option.icon }}</span>
      <span class="option-label" [innerHTML]="highlightMatch(option.label, query)"></span>
    </div>
    
    <div *ngIf="filteredOptions.length === 0 && query.trim()" 
         class="no-results">
      No results found
    </div>
  </div>
</div>

<!-- Multi-select Autocomplete -->
<div class="autocomplete-container multi-select">
  <label class="autocomplete-label">Programming Languages</label>
  <div class="autocomplete-multi-input">
    <div class="selected-items">
      <span *ngFor="let item of selectedItems" 
            class="selected-tag">
        {{ item.label }}
        <button class="remove-btn" (click)="removeItem(item)">×</button>
      </span>
    </div>
    <input type="text"
           class="autocomplete-input"
           placeholder="Add languages..."
           [(ngModel)]="query"
           (input)="onInput()"
           (keydown)="onKeydown($event)">
  </div>
  
  <div class="autocomplete-dropdown" [class.open]="isOpen">
    <div *ngFor="let option of filteredOptions; let i = index"
         class="autocomplete-option"
         [class.highlighted]="i === selectedIndex"
         (click)="selectOption(option)">
      <span class="option-icon" *ngIf="option.icon">{{ option.icon }}</span>
      <div class="option-content">
        <span class="option-label" [innerHTML]="highlightMatch(option.label, query)"></span>
        <span class="option-category">{{ option.category }}</span>
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
  max-width: 400px;
  margin-bottom: 1rem;
}

.autocomplete-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

/* Input Styles */
.autocomplete-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
}

/* Dropdown Styles */
.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: 300px;
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
}

.autocomplete-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover,
  &.highlighted {
    background: #f3f4f6;
  }
}

.option-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.option-label {
  font-size: 0.875rem;
  color: #1f2937;
  
  ::ng-deep mark {
    background: #fef3c7;
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
  }
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface AutocompleteOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  category?: string;
  icon?: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  query = '';
  isOpen = false;
  selectedIndex = -1;
  selectedItems: AutocompleteOption[] = [];

  options: AutocompleteOption[] = [
    { id: '1', label: 'Option 1', value: 'option1' },
    { id: '2', label: 'Option 2', value: 'option2' }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.autocomplete-container')) {
      this.isOpen = false;
    }
  }

  onInput(): void {
    this.isOpen = this.query.length > 0;
    this.selectedIndex = -1;
  }

  onKeydown(event: KeyboardEvent): void {
    const filteredOptions = this.getFilteredOptions();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectOption(filteredOptions[this.selectedIndex]);
        }
        break;
    }
  }

  selectOption(option: AutocompleteOption): void {
    this.query = option.label;
    this.isOpen = false;
    this.selectedIndex = -1;
  }

  getFilteredOptions(): AutocompleteOption[] {
    if (!this.query.trim()) return [];
    
    const query = this.query.toLowerCase();
    return this.options.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }
}`;
  }
}