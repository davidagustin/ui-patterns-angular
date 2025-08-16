import { Component } from '@angular/core';

interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  action?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  isOpen = false;
  selectedValue = 'Select an option';

  dropdownItems: DropdownItem[] = [
    { id: 'edit', label: 'Edit', icon: '✏️' },
    { id: 'duplicate', label: 'Duplicate', icon: '📄' },
    { id: 'separator1', label: '', separator: true },
    { id: 'archive', label: 'Archive', icon: '📦' },
    { id: 'delete', label: 'Delete', icon: '🗑️', disabled: false }
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: DropdownItem): void {
    if (!item.disabled && !item.separator) {
      this.selectedValue = item.label;
      this.isOpen = false;
      if (item.action) {
        item.action();
      }
    }
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  get htmlCode(): string {
    return `<div class="dropdown-container">
  <button 
    (click)="toggleDropdown()"
    class="dropdown-trigger"
    [class.active]="isOpen">
    <span>{{ selectedValue }}</span>
    <span class="dropdown-icon" [class.rotate]="isOpen">▼</span>
  </button>

  <div class="dropdown-menu" [class.open]="isOpen">
    <div 
      *ngFor="let item of dropdownItems"
      [class.separator]="item.separator"
      [class.disabled]="item.disabled"
      class="dropdown-item"
      (click)="selectItem(item)">
      
      <span *ngIf="item.icon" class="item-icon">{{ item.icon }}</span>
      <span *ngIf="!item.separator" class="item-label">{{ item.label }}</span>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Dropdown Container */
.dropdown-container {
  position: relative;
  display: inline-block;
  width: 200px;
}

/* Dropdown Trigger */
.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
  color: var(--text-primary);

  &:hover {
    border-color: var(--primary-500);
    background: var(--bg-secondary);
  }

  &.active {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
}

.dropdown-icon {
  transition: transform var(--transition-fast);
  color: var(--text-tertiary);

  &.rotate {
    transform: rotate(180deg);
  }
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-1);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-fast);
  z-index: 50;
  overflow: hidden;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  font-size: var(--font-size-sm);
  color: var(--text-primary);

  &:hover:not(.disabled):not(.separator) {
    background: var(--bg-secondary);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--text-tertiary);
  }

  &.separator {
    height: 1px;
    padding: 0;
    margin: var(--spacing-1) 0;
    background: var(--border-primary);
    cursor: default;
  }
}

.item-icon {
  font-size: var(--font-size-base);
  flex-shrink: 0;
}

.item-label {
  flex: 1;
  font-weight: 500;
}

/* Focus states for accessibility */
.dropdown-trigger:focus,
.dropdown-item:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  action?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  isOpen = false;
  selectedValue = 'Select an option';

  dropdownItems: DropdownItem[] = [
    { id: 'edit', label: 'Edit', icon: '✏️' },
    { id: 'duplicate', label: 'Duplicate', icon: '📄' },
    { id: 'separator1', label: '', separator: true },
    { id: 'archive', label: 'Archive', icon: '📦' },
    { id: 'delete', label: 'Delete', icon: '🗑️' }
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: DropdownItem): void {
    if (!item.disabled && !item.separator) {
      this.selectedValue = item.label;
      this.isOpen = false;
    }
  }
}`;
  }
}