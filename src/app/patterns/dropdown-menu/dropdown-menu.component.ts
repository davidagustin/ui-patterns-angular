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
  padding: 12px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    border-color: #3b82f6;
    background: #f9fafb;
  }

  &.active {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;

    &:hover {
      background: #374151;
    }
  }
}

.dropdown-icon {
  transition: transform 0.2s ease;
  color: #6b7280;

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
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 50;

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

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;

  &:hover:not(.disabled):not(.separator) {
    background: #f3f4f6;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.separator {
    height: 1px;
    padding: 0;
    margin: 4px 0;
    background: #e5e7eb;
    cursor: default;
  }

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;

    &:hover:not(.disabled):not(.separator) {
      background: #374151;
    }

    &.separator {
      background: #374151;
    }
  }
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