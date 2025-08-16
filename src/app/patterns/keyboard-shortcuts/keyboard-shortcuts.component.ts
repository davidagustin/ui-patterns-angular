import { Component, HostListener } from '@angular/core';

interface KeyboardShortcut {
  id: string;
  name: string;
  description: string;
  keys: string[];
  category: 'navigation' | 'editing' | 'view' | 'general';
  action: () => void;
  enabled: boolean;
}

@Component({
  selector: 'app-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: ['./keyboard-shortcuts.component.scss']
})
export class KeyboardShortcutsComponent {
  showShortcutsModal = false;
  pressedKeys: Set<string> = new Set();
  lastAction = '';
  searchQuery = '';

  shortcuts: KeyboardShortcut[] = [
    {
      id: 'copy',
      name: 'Copy',
      description: 'Copy selected text or element',
      keys: ['Ctrl', 'C'],
      category: 'editing',
      action: () => this.executeAction('Copy'),
      enabled: true
    },
    {
      id: 'paste',
      name: 'Paste',
      description: 'Paste from clipboard',
      keys: ['Ctrl', 'V'],
      category: 'editing',
      action: () => this.executeAction('Paste'),
      enabled: true
    },
    {
      id: 'save',
      name: 'Save',
      description: 'Save current document',
      keys: ['Ctrl', 'S'],
      category: 'general',
      action: () => this.executeAction('Save'),
      enabled: true
    },
    {
      id: 'undo',
      name: 'Undo',
      description: 'Undo last action',
      keys: ['Ctrl', 'Z'],
      category: 'editing',
      action: () => this.executeAction('Undo'),
      enabled: true
    },
    {
      id: 'redo',
      name: 'Redo',
      description: 'Redo last undone action',
      keys: ['Ctrl', 'Y'],
      category: 'editing',
      action: () => this.executeAction('Redo'),
      enabled: true
    },
    {
      id: 'find',
      name: 'Find',
      description: 'Open search dialog',
      keys: ['Ctrl', 'F'],
      category: 'navigation',
      action: () => this.executeAction('Find'),
      enabled: true
    },
    {
      id: 'help',
      name: 'Help',
      description: 'Show keyboard shortcuts',
      keys: ['F1'],
      category: 'general',
      action: () => this.toggleShortcutsModal(),
      enabled: true
    },
    {
      id: 'refresh',
      name: 'Refresh',
      description: 'Refresh the page',
      keys: ['F5'],
      category: 'general',
      action: () => this.executeAction('Refresh'),
      enabled: true
    }
  ];

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = this.normalizeKey(event.key);
    this.pressedKeys.add(key);
    
    if (event.ctrlKey) this.pressedKeys.add('Ctrl');
    if (event.shiftKey) this.pressedKeys.add('Shift');
    if (event.altKey) this.pressedKeys.add('Alt');
    if (event.metaKey) this.pressedKeys.add('Meta');

    this.checkShortcuts(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.pressedKeys.clear();
  }

  private normalizeKey(key: string): string {
    const keyMap: { [key: string]: string } = {
      ' ': 'Space',
      'Control': 'Ctrl',
      'Command': 'Meta',
      'Option': 'Alt'
    };
    return keyMap[key] || key;
  }

  private checkShortcuts(event: KeyboardEvent): void {
    for (const shortcut of this.shortcuts) {
      if (this.isShortcutPressed(shortcut.keys)) {
        event.preventDefault();
        if (shortcut.enabled) {
          shortcut.action();
        }
        break;
      }
    }
  }

  private isShortcutPressed(shortcutKeys: string[]): boolean {
    if (shortcutKeys.length !== this.pressedKeys.size) {
      return false;
    }
    return shortcutKeys.every(key => this.pressedKeys.has(key));
  }

  executeAction(action: string): void {
    this.lastAction = `${action} executed at ${new Date().toLocaleTimeString()}`;
    console.log(`Keyboard shortcut: ${action}`);
  }

  toggleShortcutsModal(): void {
    this.showShortcutsModal = !this.showShortcutsModal;
  }

  get filteredShortcuts(): KeyboardShortcut[] {
    if (!this.searchQuery) return this.shortcuts;
    
    return this.shortcuts.filter(shortcut =>
      shortcut.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      shortcut.keys.some(key => key.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  getShortcutsByCategory(category: string): KeyboardShortcut[] {
    return this.filteredShortcuts.filter(shortcut => shortcut.category === category);
  }

  formatKeys(keys: string[]): string {
    return keys.join(' + ');
  }

  get exampleCode(): string {
    return `<!-- Keyboard Shortcuts Component -->
<div class="shortcuts-demo">
  <button (click)="toggleShortcutsModal()">
    Show Shortcuts (F1)
  </button>
  
  <div *ngIf="lastAction" class="action-feedback">
    {{ lastAction }}
  </div>
</div>

<!-- Shortcuts Modal -->
<div class="shortcuts-modal" *ngIf="showShortcutsModal">
  <div class="modal-content">
    <h2>Keyboard Shortcuts</h2>
    
    <div *ngFor="let category of categories" class="category-section">
      <h3>{{ category | titlecase }}</h3>
      <div class="shortcuts-grid">
        <div *ngFor="let shortcut of getShortcutsByCategory(category)" 
             class="shortcut-item">
          <div class="shortcut-info">
            <strong>{{ shortcut.name }}</strong>
            <span>{{ shortcut.description }}</span>
          </div>
          <div class="shortcut-keys">
            <kbd *ngFor="let key of shortcut.keys">{{ key }}</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Component Logic -->
@HostListener('document:keydown', ['$event'])
onKeyDown(event: KeyboardEvent): void {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    this.save();
  }
}`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Keyboard Shortcuts" 
  description="Comprehensive keyboard shortcuts system with help modal and visual feedback"
  icon="⌨️">
</app-pattern-header>

<div class="keyboard-shortcuts-demo">
  <!-- Demo Controls -->
  <div class="demo-section">
    <h3>Try These Shortcuts</h3>
    <div class="shortcut-cards">
      <div class="shortcut-card" *ngFor="let shortcut of shortcuts.slice(0, 6)">
        <div class="card-header">
          <h4>{{ shortcut.name }}</h4>
          <div class="keys-display">
            <kbd *ngFor="let key of shortcut.keys">{{ key }}</kbd>
          </div>
        </div>
        <p>{{ shortcut.description }}</p>
        <button (click)="shortcut.action()" class="test-btn">Test</button>
      </div>
    </div>
  </div>

  <!-- Action Feedback -->
  <div class="feedback-section" *ngIf="lastAction">
    <div class="feedback-message">
      <span class="feedback-icon">✓</span>
      <span>{{ lastAction }}</span>
    </div>
  </div>

  <!-- Help Button -->
  <div class="help-section">
    <button class="help-btn" (click)="toggleShortcutsModal()">
      <span class="help-icon">❓</span>
      Show All Shortcuts (F1)
    </button>
  </div>

  <!-- Shortcuts Modal -->
  <div class="shortcuts-modal" *ngIf="showShortcutsModal" (click)="toggleShortcutsModal()">
    <div class="modal-content" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h2>Keyboard Shortcuts</h2>
        <button class="close-btn" (click)="toggleShortcutsModal()">×</button>
      </div>
      
      <!-- Search -->
      <div class="search-section">
        <input 
          type="search" 
          placeholder="Search shortcuts..."
          [(ngModel)]="searchQuery"
          class="search-input">
      </div>
      
      <!-- Categories -->
      <div class="categories-section">
        <div class="category-section" *ngFor="let category of ['navigation', 'editing', 'view', 'general']">
          <h3 class="category-title">{{ category | titlecase }}</h3>
          <div class="shortcuts-list">
            <div class="shortcut-item" 
                 *ngFor="let shortcut of getShortcutsByCategory(category)"
                 [class.disabled]="!shortcut.enabled">
              <div class="shortcut-info">
                <div class="shortcut-name">{{ shortcut.name }}</div>
                <div class="shortcut-description">{{ shortcut.description }}</div>
              </div>
              <div class="shortcut-keys">
                <kbd *ngFor="let key of shortcut.keys; let last = last">
                  {{ key }}<span *ngIf="!last" class="key-separator">+</span>
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<app-code-tabs 
  [htmlCode]="htmlCode"
  [scssCode]="scssCode"
  [typescriptCode]="typescriptCode"
  [exampleCode]="exampleCode">
</app-code-tabs>`;
  }

  get scssCode(): string {
    return `/* Keyboard Shortcuts Styles */
.keyboard-shortcuts-demo {
  padding: var(--spacing-6);
}

.demo-section,
.feedback-section,
.help-section {
  margin-bottom: var(--spacing-6);

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }
}

.shortcut-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-4);
}

.shortcut-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-200);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);

  h4 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
}

.keys-display {
  display: flex;
  gap: var(--spacing-1);
}

kbd {
  background: var(--gray-100);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-family: monospace;
  font-weight: 600;
  color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
    color: var(--text-primary);
  }
}

.test-btn {
  background: var(--primary-600);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  margin-top: var(--spacing-2);

  &:hover {
    background: var(--primary-700);
  }
}

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

.help-btn {
  background: var(--gray-100);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  &:hover {
    background: var(--gray-200);
    transform: translateY(-1px);
  }

  .help-icon {
    background: var(--primary-100);
    color: var(--primary-600);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);

    &:hover {
      background: var(--gray-600);
    }

    .help-icon {
      background: var(--primary-800);
      color: var(--primary-300);
    }
  }
}

/* Modal Styles */
.shortcuts-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-4);
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--border-primary);

  h2 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-1);
    border-radius: var(--radius-sm);

    &:hover {
      background: var(--gray-100);
      color: var(--text-primary);
    }
  }
}

.search-section {
  padding: var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--border-primary);

  .search-input {
    width: 100%;
    padding: var(--spacing-2) var(--spacing-3);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);

    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: var(--focus-ring);
    }
  }
}

.categories-section {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-4) var(--spacing-6);
}

.category-section {
  margin-bottom: var(--spacing-6);

  &:last-child {
    margin-bottom: 0;
  }
}

.category-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-3) 0;
  padding-bottom: var(--spacing-1);
  border-bottom: 1px solid var(--border-secondary);
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
  }

  &.disabled {
    opacity: 0.5;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-800);
    }
  }
}

.shortcut-info {
  flex: 1;

  .shortcut-name {
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: var(--spacing-1);
  }

  .shortcut-description {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
}

.shortcut-keys {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);

  .key-separator {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
    margin: 0 var(--spacing-1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .shortcut-cards {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: var(--spacing-2);
    max-height: calc(100vh - var(--spacing-4));
  }

  .shortcut-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .shortcut-keys {
    align-self: flex-end;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .shortcut-card,
  .test-btn,
  .help-btn {
    transition: none;
  }

  .shortcut-card:hover {
    transform: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface KeyboardShortcut {
  id: string;
  name: string;
  description: string;
  keys: string[];
  category: 'navigation' | 'editing' | 'view' | 'general';
  action: () => void;
  enabled: boolean;
}

@Component({
  selector: 'app-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: ['./keyboard-shortcuts.component.scss']
})
export class KeyboardShortcutsComponent {
  showShortcutsModal = false;
  pressedKeys: Set<string> = new Set();
  lastAction = '';
  searchQuery = '';

  shortcuts: KeyboardShortcut[] = [
    {
      id: 'copy',
      name: 'Copy',
      description: 'Copy selected text or element',
      keys: ['Ctrl', 'C'],
      category: 'editing',
      action: () => this.executeAction('Copy'),
      enabled: true
    },
    {
      id: 'save',
      name: 'Save',
      description: 'Save current document',
      keys: ['Ctrl', 'S'],
      category: 'general',
      action: () => this.executeAction('Save'),
      enabled: true
    }
    // ... more shortcuts
  ];

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = this.normalizeKey(event.key);
    this.pressedKeys.add(key);
    
    if (event.ctrlKey) this.pressedKeys.add('Ctrl');
    if (event.shiftKey) this.pressedKeys.add('Shift');
    if (event.altKey) this.pressedKeys.add('Alt');

    this.checkShortcuts(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.pressedKeys.clear();
  }

  private checkShortcuts(event: KeyboardEvent): void {
    for (const shortcut of this.shortcuts) {
      if (this.isShortcutPressed(shortcut.keys)) {
        event.preventDefault();
        if (shortcut.enabled) {
          shortcut.action();
        }
        break;
      }
    }
  }

  private isShortcutPressed(shortcutKeys: string[]): boolean {
    return shortcutKeys.every(key => this.pressedKeys.has(key));
  }

  executeAction(action: string): void {
    this.lastAction = \`\${action} executed\`;
    console.log(\`Keyboard shortcut: \${action}\`);
  }

  toggleShortcutsModal(): void {
    this.showShortcutsModal = !this.showShortcutsModal;
  }

  get filteredShortcuts(): KeyboardShortcut[] {
    if (!this.searchQuery) return this.shortcuts;
    
    return this.shortcuts.filter(shortcut =>
      shortcut.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}`;
  }
}