import { Component } from '@angular/core';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  action?: () => void;
  children?: MenuItem[];
  disabled?: boolean;
  separator?: boolean;
}

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
  activeMenu: string | null = null;
  lastAction = '';

  fileMenu: MenuItem[] = [
    { id: 'new', label: 'New', icon: '📄', action: () => this.executeAction('New File') },
    { id: 'open', label: 'Open', icon: '📁', action: () => this.executeAction('Open File') },
    { id: 'recent', label: 'Recent Files', icon: '🕒', children: [
      { id: 'recent-1', label: 'project.ts', action: () => this.executeAction('Open project.ts') },
      { id: 'recent-2', label: 'styles.css', action: () => this.executeAction('Open styles.css') }
    ]},
    { id: 'separator-1', label: '', separator: true },
    { id: 'save', label: 'Save', icon: '💾', action: () => this.executeAction('Save File') },
    { id: 'save-as', label: 'Save As...', icon: '💾', action: () => this.executeAction('Save As') },
    { id: 'separator-2', label: '', separator: true },
    { id: 'exit', label: 'Exit', icon: '🚪', action: () => this.executeAction('Exit Application') }
  ];

  editMenu: MenuItem[] = [
    { id: 'undo', label: 'Undo', icon: '↶', action: () => this.executeAction('Undo') },
    { id: 'redo', label: 'Redo', icon: '↷', action: () => this.executeAction('Redo') },
    { id: 'separator-1', label: '', separator: true },
    { id: 'cut', label: 'Cut', icon: '✂️', action: () => this.executeAction('Cut') },
    { id: 'copy', label: 'Copy', icon: '📋', action: () => this.executeAction('Copy') },
    { id: 'paste', label: 'Paste', icon: '📄', action: () => this.executeAction('Paste') },
    { id: 'separator-2', label: '', separator: true },
    { id: 'find', label: 'Find', icon: '🔍', action: () => this.executeAction('Find') },
    { id: 'replace', label: 'Replace', icon: '🔄', action: () => this.executeAction('Replace') }
  ];

  contextMenu: MenuItem[] = [
    { id: 'copy', label: 'Copy', icon: '📋', action: () => this.executeAction('Copy') },
    { id: 'paste', label: 'Paste', icon: '📄', action: () => this.executeAction('Paste') },
    { id: 'separator-1', label: '', separator: true },
    { id: 'properties', label: 'Properties', icon: '⚙️', action: () => this.executeAction('Properties') }
  ];

  toggleMenu(menuId: string): void {
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  }

  closeMenus(): void {
    this.activeMenu = null;
  }

  executeAction(action: string): void {
    this.lastAction = `${action} at ${new Date().toLocaleTimeString()}`;
    this.closeMenus();
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    // Implementation for context menu positioning would go here
  }

  get exampleCode(): string {
    return `<!-- Menu Bar -->
<div class="menu-bar">
  <button class="menu-button" (click)="toggleMenu('file')">File</button>
  <button class="menu-button" (click)="toggleMenu('edit')">Edit</button>
</div>

<!-- Dropdown Menu -->
<div class="dropdown-menu" *ngIf="activeMenu === 'file'">
  <div *ngFor="let item of fileMenu" class="menu-item">
    <button *ngIf="!item.separator" (click)="item.action?.()">
      <span class="icon">{{ item.icon }}</span>
      {{ item.label }}
    </button>
    <hr *ngIf="item.separator" class="menu-separator">
  </div>
</div>

<!-- Context Menu -->
<div class="context-menu" (contextmenu)="onContextMenu($event)">
  Right-click for context menu
</div>`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Menus" 
  description="Various menu patterns including dropdown, context, and hierarchical menus"
  icon="📋">
</app-pattern-header>

<div class="menus-demo">
  <!-- Menu Bar -->
  <div class="menu-section">
    <h3>Menu Bar</h3>
    <div class="menu-bar">
      <button class="menu-button" 
              [class.active]="activeMenu === 'file'"
              (click)="toggleMenu('file')">
        File
      </button>
      <button class="menu-button"
              [class.active]="activeMenu === 'edit'"
              (click)="toggleMenu('edit')">
        Edit
      </button>
      
      <!-- File Dropdown -->
      <div class="dropdown-menu file-menu" *ngIf="activeMenu === 'file'">
        <div *ngFor="let item of fileMenu" class="menu-item-wrapper">
          <hr *ngIf="item.separator" class="menu-separator">
          <button *ngIf="!item.separator" 
                  class="menu-item"
                  [disabled]="item.disabled"
                  (click)="item.action?.()">
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-label">{{ item.label }}</span>
            <span class="menu-arrow" *ngIf="item.children">▶</span>
          </button>
        </div>
      </div>
      
      <!-- Edit Dropdown -->
      <div class="dropdown-menu edit-menu" *ngIf="activeMenu === 'edit'">
        <div *ngFor="let item of editMenu" class="menu-item-wrapper">
          <hr *ngIf="item.separator" class="menu-separator">
          <button *ngIf="!item.separator" 
                  class="menu-item"
                  [disabled]="item.disabled"
                  (click)="item.action?.()">
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-label">{{ item.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Context Menu Demo -->
  <div class="context-section">
    <h3>Context Menu</h3>
    <div class="context-area" (contextmenu)="onContextMenu($event)">
      <p>Right-click anywhere in this area to see a context menu</p>
    </div>
  </div>

  <!-- Action Feedback -->
  <div class="feedback-section" *ngIf="lastAction">
    <div class="feedback-message">
      <span class="feedback-icon">✓</span>
      <span>{{ lastAction }}</span>
    </div>
  </div>
</div>

<!-- Overlay to close menus -->
<div class="menu-overlay" 
     *ngIf="activeMenu"
     (click)="closeMenus()">
</div>

<app-code-tabs 
  [htmlCode]="htmlCode"
  [scssCode]="scssCode"
  [typescriptCode]="typescriptCode"
  [exampleCode]="exampleCode">
</app-code-tabs>`;
  }

  get scssCode(): string {
    return `/* Menu Styles */
.menus-demo {
  padding: var(--spacing-6);
}

.menu-section,
.context-section,
.feedback-section {
  margin-bottom: var(--spacing-6);
  position: relative;

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }
}

/* Menu Bar */
.menu-bar {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-2);
  display: flex;
  gap: var(--spacing-1);
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover,
  &.active {
    background: var(--primary-100);
    color: var(--primary-700);
  }

  @media (prefers-color-scheme: dark) {
    &:hover,
    &.active {
      background: var(--primary-800);
      color: var(--primary-300);
    }
  }
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  z-index: 1000;
  padding: var(--spacing-2);
  margin-top: var(--spacing-1);
  animation: menuIn 0.2s ease-out;

  &.file-menu {
    left: 0;
  }

  &.edit-menu {
    left: 60px;
  }

  @keyframes menuIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.menu-item-wrapper {
  display: contents;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover:not(:disabled) {
    background: var(--gray-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    &:hover:not(:disabled) {
      background: var(--gray-800);
    }
  }
}

.menu-icon {
  font-size: 1rem;
  width: 1.5rem;
  text-align: center;
}

.menu-label {
  flex: 1;
}

.menu-arrow {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.menu-separator {
  border: none;
  border-top: 1px solid var(--border-secondary);
  margin: var(--spacing-1) 0;
}

/* Context Menu */
.context-area {
  background: var(--bg-secondary);
  border: 2px dashed var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  text-align: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--primary-300);
    background: var(--primary-50);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--primary-900);
    }
  }
}

/* Feedback */
.feedback-section {
  background: var(--bg-primary);
  border: 1px solid var(--green-200);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}

.feedback-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--green-700);
  font-weight: 500;

  .feedback-icon {
    background: var(--green-100);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--green-300);

    .feedback-icon {
      background: var(--green-800);
    }
  }
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dropdown-menu {
    left: 0;
    right: 0;
    min-width: auto;
  }

  .menu-bar {
    flex-wrap: wrap;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .dropdown-menu {
    animation: none;
  }

  .menu-item,
  .menu-button {
    transition: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  action?: () => void;
  children?: MenuItem[];
  disabled?: boolean;
  separator?: boolean;
}

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
  activeMenu: string | null = null;
  lastAction = '';

  fileMenu: MenuItem[] = [
    { id: 'new', label: 'New', icon: '📄', action: () => this.executeAction('New File') },
    { id: 'open', label: 'Open', icon: '📁', action: () => this.executeAction('Open File') },
    { id: 'separator-1', label: '', separator: true },
    { id: 'save', label: 'Save', icon: '💾', action: () => this.executeAction('Save File') },
    { id: 'exit', label: 'Exit', icon: '🚪', action: () => this.executeAction('Exit Application') }
  ];

  editMenu: MenuItem[] = [
    { id: 'undo', label: 'Undo', icon: '↶', action: () => this.executeAction('Undo') },
    { id: 'redo', label: 'Redo', icon: '↷', action: () => this.executeAction('Redo') },
    { id: 'separator-1', label: '', separator: true },
    { id: 'cut', label: 'Cut', icon: '✂️', action: () => this.executeAction('Cut') },
    { id: 'copy', label: 'Copy', icon: '📋', action: () => this.executeAction('Copy') },
    { id: 'paste', label: 'Paste', icon: '📄', action: () => this.executeAction('Paste') }
  ];

  toggleMenu(menuId: string): void {
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  }

  closeMenus(): void {
    this.activeMenu = null;
  }

  executeAction(action: string): void {
    this.lastAction = \`\${action} at \${new Date().toLocaleTimeString()}\`;
    this.closeMenus();
  }
}`;
  }
}