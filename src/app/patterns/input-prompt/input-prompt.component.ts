import { Component } from '@angular/core';

interface PromptField {
  id: string;
  type: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel';
  label: string;
  placeholder: string;
  value: string;
  prompts: string[];
  showPrompts: boolean;
  required?: boolean;
  icon?: string;
}

interface CommandPrompt {
  id: string;
  command: string;
  description: string;
  shortcut?: string;
  category: 'navigation' | 'edit' | 'view' | 'help';
}

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.scss']
})
export class InputPromptComponent {
  searchQuery = '';
  commandQuery = '';
  showSearchPrompts = false;
  showCommandPrompts = false;
  selectedPromptIndex = -1;
  selectedCommandIndex = -1;
  
  formFields: PromptField[] = [
    {
      id: 'search',
      type: 'search',
      label: 'Search',
      placeholder: 'Type to search...',
      value: '',
      showPrompts: false,
      icon: '🔍',
      prompts: [
        'recent projects',
        'documentation',
        'team members',
        'design patterns',
        'code examples',
        'user interfaces',
        'components library',
        'style guide'
      ]
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Recipients',
      placeholder: 'Type email address...',
      value: '',
      showPrompts: false,
      icon: '📧',
      prompts: [
        'john.doe@company.com',
        'sarah.wilson@company.com',
        'michael.chen@company.com',
        'team@company.com',
        'support@company.com',
        'admin@company.com'
      ]
    },
    {
      id: 'tags',
      type: 'text',
      label: 'Tags',
      placeholder: 'Add tags...',
      value: '',
      showPrompts: false,
      icon: '🏷️',
      prompts: [
        'frontend',
        'backend',
        'design',
        'ui/ux',
        'react',
        'angular',
        'typescript',
        'javascript',
        'css',
        'html'
      ]
    },
    {
      id: 'url',
      type: 'url',
      label: 'Website URL',
      placeholder: 'Enter website URL...',
      value: '',
      showPrompts: false,
      icon: '🌐',
      prompts: [
        'https://github.com/',
        'https://stackoverflow.com/',
        'https://developer.mozilla.org/',
        'https://angular.io/',
        'https://react.dev/',
        'https://typescript.org/',
        'https://nodejs.org/'
      ]
    }
  ];

  commands: CommandPrompt[] = [
    {
      id: 'new-file',
      command: 'Create New File',
      description: 'Create a new file in the current directory',
      shortcut: 'Ctrl+N',
      category: 'edit'
    },
    {
      id: 'open-file',
      command: 'Open File',
      description: 'Open an existing file',
      shortcut: 'Ctrl+O',
      category: 'navigation'
    },
    {
      id: 'save-file',
      command: 'Save File',
      description: 'Save the current file',
      shortcut: 'Ctrl+S',
      category: 'edit'
    },
    {
      id: 'find-replace',
      command: 'Find and Replace',
      description: 'Search and replace text',
      shortcut: 'Ctrl+H',
      category: 'edit'
    },
    {
      id: 'toggle-sidebar',
      command: 'Toggle Sidebar',
      description: 'Show or hide the sidebar',
      shortcut: 'Ctrl+B',
      category: 'view'
    },
    {
      id: 'command-palette',
      command: 'Command Palette',
      description: 'Open command palette',
      shortcut: 'Ctrl+Shift+P',
      category: 'navigation'
    },
    {
      id: 'settings',
      command: 'Open Settings',
      description: 'Open application settings',
      shortcut: 'Ctrl+,',
      category: 'navigation'
    },
    {
      id: 'help',
      command: 'Show Help',
      description: 'Open help documentation',
      shortcut: 'F1',
      category: 'help'
    }
  ];

  get filteredCommands(): CommandPrompt[] {
    if (!this.commandQuery) return this.commands;
    
    return this.commands.filter(cmd => 
      cmd.command.toLowerCase().includes(this.commandQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(this.commandQuery.toLowerCase())
    );
  }

  onFieldInput(field: PromptField, event: Event): void {
    const input = event.target as HTMLInputElement;
    field.value = input.value;
    field.showPrompts = input.value.length > 0;
    this.selectedPromptIndex = -1;
  }

  onFieldFocus(field: PromptField): void {
    field.showPrompts = true;
  }

  onFieldBlur(field: PromptField): void {
    // Delay hiding prompts to allow for prompt selection
    setTimeout(() => {
      field.showPrompts = false;
      this.selectedPromptIndex = -1;
    }, 150);
  }

  onFieldKeydown(field: PromptField, event: KeyboardEvent): void {
    if (!field.showPrompts) return;

    const filteredPrompts = this.getFilteredPrompts(field);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedPromptIndex = Math.min(this.selectedPromptIndex + 1, filteredPrompts.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedPromptIndex = Math.max(this.selectedPromptIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedPromptIndex >= 0 && this.selectedPromptIndex < filteredPrompts.length) {
          this.selectPrompt(field, filteredPrompts[this.selectedPromptIndex]);
        }
        break;
      case 'Escape':
        field.showPrompts = false;
        this.selectedPromptIndex = -1;
        break;
    }
  }

  onCommandInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.commandQuery = input.value;
    this.showCommandPrompts = true;
    this.selectedCommandIndex = -1;
  }

  onCommandFocus(): void {
    this.showCommandPrompts = true;
  }

  onCommandBlur(): void {
    setTimeout(() => {
      this.showCommandPrompts = false;
      this.selectedCommandIndex = -1;
    }, 150);
  }

  onCommandKeydown(event: KeyboardEvent): void {
    if (!this.showCommandPrompts) return;

    const filteredCommands = this.filteredCommands;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedCommandIndex = Math.min(this.selectedCommandIndex + 1, filteredCommands.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedCommandIndex = Math.max(this.selectedCommandIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedCommandIndex >= 0 && this.selectedCommandIndex < filteredCommands.length) {
          this.executeCommand(filteredCommands[this.selectedCommandIndex]);
        }
        break;
      case 'Escape':
        this.showCommandPrompts = false;
        this.selectedCommandIndex = -1;
        break;
    }
  }

  getFilteredPrompts(field: PromptField): string[] {
    if (!field.value) return field.prompts;
    
    return field.prompts.filter(prompt => 
      prompt.toLowerCase().includes(field.value.toLowerCase())
    );
  }

  selectPrompt(field: PromptField, prompt: string): void {
    field.value = prompt;
    field.showPrompts = false;
    this.selectedPromptIndex = -1;
  }

  executeCommand(command: CommandPrompt): void {
    console.log('Executing command:', command.command);
    this.commandQuery = '';
    this.showCommandPrompts = false;
    this.selectedCommandIndex = -1;
    // Here you would implement the actual command execution
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'navigation': return '🧭';
      case 'edit': return '✏️';
      case 'view': return '👁️';
      case 'help': return '❓';
      default: return '⚡';
    }
  }

  get exampleCode(): string {
    return `<!-- Input with Prompts -->
<div class="input-group">
  <label>Search</label>
  <div class="input-container">
    <input 
      type="text" 
      placeholder="Type to search..."
      (input)="onInput($event)"
      (focus)="showPrompts = true"
      (blur)="hidePrompts()"
      (keydown)="onKeydown($event)">
    
    <div class="prompts-dropdown" *ngIf="showPrompts">
      <div *ngFor="let prompt of filteredPrompts; let i = index"
           class="prompt-item"
           [class.selected]="i === selectedIndex"
           (click)="selectPrompt(prompt)">
        {{ prompt }}
      </div>
    </div>
  </div>
</div>

<!-- Command Palette -->
<div class="command-palette">
  <input 
    type="text" 
    placeholder="Type a command..."
    (input)="onCommandInput($event)"
    (keydown)="onCommandKeydown($event)">
  
  <div class="commands-list" *ngIf="showCommands">
    <div *ngFor="let cmd of filteredCommands; let i = index"
         class="command-item"
         [class.selected]="i === selectedIndex">
      <div class="command-name">{{ cmd.command }}</div>
      <div class="command-shortcut">{{ cmd.shortcut }}</div>
    </div>
  </div>
</div>`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Input Prompt" 
  description="Smart input fields with autocomplete suggestions and command palettes"
  icon="💡">
</app-pattern-header>

<div class="input-prompt-demo">
  <!-- Form Fields with Prompts -->
  <div class="form-section">
    <h3>Form Fields with Smart Prompts</h3>
    
    <div class="form-grid">
      <div *ngFor="let field of formFields" class="field-group">
        <label class="field-label">
          <span class="field-icon">{{ field.icon }}</span>
          {{ field.label }}
          <span *ngIf="field.required" class="required">*</span>
        </label>
        
        <div class="input-container">
          <input 
            [id]="field.id"
            [type]="field.type"
            [placeholder]="field.placeholder"
            [value]="field.value"
            (input)="onFieldInput(field, $event)"
            (focus)="onFieldFocus(field)"
            (blur)="onFieldBlur(field)"
            (keydown)="onFieldKeydown(field, $event)"
            class="prompt-input"
            autocomplete="off">
          
          <!-- Prompts Dropdown -->
          <div class="prompts-dropdown" 
               *ngIf="field.showPrompts && getFilteredPrompts(field).length > 0">
            <div class="prompts-header">
              <span class="prompts-title">Suggestions</span>
              <span class="prompts-count">{{ getFilteredPrompts(field).length }}</span>
            </div>
            
            <div class="prompts-list">
              <div *ngFor="let prompt of getFilteredPrompts(field); let i = index"
                   class="prompt-item"
                   [class.selected]="i === selectedPromptIndex"
                   (mousedown)="selectPrompt(field, prompt)">
                <span class="prompt-text">{{ prompt }}</span>
                <span class="prompt-type" *ngIf="field.type === 'email'">@</span>
                <span class="prompt-type" *ngIf="field.type === 'url'">🌐</span>
                <span class="prompt-type" *ngIf="field.type === 'search'">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Command Palette -->
  <div class="command-section">
    <h3>Command Palette</h3>
    <p class="section-description">
      Type to search for commands and actions. Use keyboard navigation to select.
    </p>
    
    <div class="command-palette">
      <div class="command-input-container">
        <div class="command-icon">⚡</div>
        <input 
          type="text" 
          placeholder="Type a command... (try 'new', 'open', 'save')"
          [value]="commandQuery"
          (input)="onCommandInput($event)"
          (focus)="onCommandFocus()"
          (blur)="onCommandBlur()"
          (keydown)="onCommandKeydown($event)"
          class="command-input"
          autocomplete="off">
        <div class="shortcut-hint">Ctrl+Shift+P</div>
      </div>
      
      <!-- Commands Dropdown -->
      <div class="commands-dropdown" 
           *ngIf="showCommandPrompts && filteredCommands.length > 0">
        <div class="commands-header">
          <span class="commands-title">Commands</span>
          <span class="commands-count">{{ filteredCommands.length }} of {{ commands.length }}</span>
        </div>
        
        <div class="commands-list">
          <div *ngFor="let command of filteredCommands; let i = index"
               class="command-item"
               [class.selected]="i === selectedCommandIndex"
               (mousedown)="executeCommand(command)">
            <div class="command-content">
              <div class="command-header">
                <span class="command-category-icon">{{ getCategoryIcon(command.category) }}</span>
                <span class="command-name">{{ command.command }}</span>
                <span class="command-shortcut" *ngIf="command.shortcut">{{ command.shortcut }}</span>
              </div>
              <div class="command-description">{{ command.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Usage Examples -->
  <div class="examples-section">
    <h3>Usage Examples</h3>
    
    <div class="example-grid">
      <div class="example-card">
        <div class="example-icon">🔍</div>
        <h4>Search Autocomplete</h4>
        <p>Dynamic suggestions based on user input with keyboard navigation support.</p>
      </div>
      
      <div class="example-card">
        <div class="example-icon">📧</div>
        <h4>Email Recipients</h4>
        <p>Smart email address suggestions from contacts and recent recipients.</p>
      </div>
      
      <div class="example-card">
        <div class="example-icon">🏷️</div>
        <h4>Tag Input</h4>
        <p>Predefined tags with filtering and selection for content categorization.</p>
      </div>
      
      <div class="example-card">
        <div class="example-icon">⚡</div>
        <h4>Command Palette</h4>
        <p>Quick access to application commands with fuzzy search and shortcuts.</p>
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
    return `/* Input Prompt Styles */
.input-prompt-demo {
  padding: var(--spacing-6);
}

.form-section,
.command-section,
.examples-section {
  margin-bottom: var(--spacing-8);

  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }

  .section-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-6) 0;
    line-height: 1.5;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

.field-group {
  position: relative;
}

.field-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);

  .field-icon {
    font-size: 1rem;
  }

  .required {
    color: var(--red-500);
    margin-left: var(--spacing-1);
  }
}

.input-container {
  position: relative;
}

.prompt-input {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  background: var(--bg-primary);

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

/* Prompts Dropdown */
.prompts-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  margin-top: var(--spacing-1);
  max-height: 200px;
  overflow: hidden;
  animation: dropdownIn 0.2s ease-out;

  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.prompts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-primary);
  font-size: var(--font-size-xs);

  .prompts-title {
    font-weight: 500;
    color: var(--text-secondary);
  }

  .prompts-count {
    color: var(--text-tertiary);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.prompts-list {
  max-height: 160px;
  overflow-y: auto;
}

.prompt-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-3);
  cursor: pointer;
  transition: all var(--transition-normal);
  border-bottom: 1px solid var(--border-secondary);

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &.selected {
    background: var(--primary-50);
    color: var(--primary-700);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
      color: var(--primary-300);
    }
  }

  .prompt-text {
    font-size: var(--font-size-sm);
    flex: 1;
  }

  .prompt-type {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    opacity: 0.7;
  }
}

/* Command Palette */
.command-palette {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.command-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  border: 2px solid var(--primary-200);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2);
  transition: all var(--transition-normal);

  &:focus-within {
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }

  .command-icon {
    font-size: 1.25rem;
    margin: 0 var(--spacing-2);
    color: var(--primary-600);
  }

  .shortcut-hint {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    background: var(--gray-100);
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-sm);
    margin-left: var(--spacing-2);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }
}

.command-input {
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-size: var(--font-size-base);
  padding: var(--spacing-2);

  &::placeholder {
    color: var(--text-tertiary);
  }
}

/* Commands Dropdown */
.commands-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  margin-top: var(--spacing-2);
  max-height: 400px;
  overflow: hidden;
  animation: dropdownIn 0.2s ease-out;
}

.commands-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-primary);
  font-size: var(--font-size-sm);

  .commands-title {
    font-weight: 600;
    color: var(--text-secondary);
  }

  .commands-count {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.commands-list {
  max-height: 320px;
  overflow-y: auto;
}

.command-item {
  padding: var(--spacing-3);
  cursor: pointer;
  transition: all var(--transition-normal);
  border-bottom: 1px solid var(--border-secondary);

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &.selected {
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }
}

.command-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.command-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.command-category-icon {
  font-size: 1rem;
  opacity: 0.7;
}

.command-name {
  font-weight: 500;
  color: var(--text-primary);
  flex: 1;
}

.command-shortcut {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  background: var(--gray-100);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-family: monospace;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

.command-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  line-height: 1.4;
  margin-left: 1.5rem;
}

/* Examples Section */
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
}

.example-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  text-align: center;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .example-icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-3);
  }

  h4 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-2) 0;
  }

  p {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    margin: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .command-input-container {
    .shortcut-hint {
      display: none;
    }
  }

  .commands-dropdown,
  .prompts-dropdown {
    max-height: 250px;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .prompts-dropdown,
  .commands-dropdown {
    animation: none;
  }

  .prompt-item,
  .command-item,
  .example-card {
    transition: none;
  }
}

/* Focus States */
.prompt-item:focus,
.command-item:focus {
  outline: none;
  background: var(--primary-100);

  @media (prefers-color-scheme: dark) {
    background: var(--primary-800);
  }
}

/* Scrollbar Styling */
.prompts-list::-webkit-scrollbar,
.commands-list::-webkit-scrollbar {
  width: 6px;
}

.prompts-list::-webkit-scrollbar-track,
.commands-list::-webkit-scrollbar-track {
  background: var(--gray-100);
}

.prompts-list::-webkit-scrollbar-thumb,
.commands-list::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 3px;

  &:hover {
    background: var(--gray-400);
  }
}

@media (prefers-color-scheme: dark) {
  .prompts-list::-webkit-scrollbar-track,
  .commands-list::-webkit-scrollbar-track {
    background: var(--gray-700);
  }

  .prompts-list::-webkit-scrollbar-thumb,
  .commands-list::-webkit-scrollbar-thumb {
    background: var(--gray-600);

    &:hover {
      background: var(--gray-500);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface PromptField {
  id: string;
  type: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel';
  label: string;
  placeholder: string;
  value: string;
  prompts: string[];
  showPrompts: boolean;
  required?: boolean;
  icon?: string;
}

interface CommandPrompt {
  id: string;
  command: string;
  description: string;
  shortcut?: string;
  category: 'navigation' | 'edit' | 'view' | 'help';
}

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.scss']
})
export class InputPromptComponent {
  searchQuery = '';
  commandQuery = '';
  showSearchPrompts = false;
  showCommandPrompts = false;
  selectedPromptIndex = -1;
  selectedCommandIndex = -1;
  
  formFields: PromptField[] = [
    {
      id: 'search',
      type: 'search',
      label: 'Search',
      placeholder: 'Type to search...',
      value: '',
      showPrompts: false,
      icon: '🔍',
      prompts: [
        'recent projects',
        'documentation',
        'team members',
        'design patterns'
      ]
    }
    // ... more fields
  ];

  commands: CommandPrompt[] = [
    {
      id: 'new-file',
      command: 'Create New File',
      description: 'Create a new file in the current directory',
      shortcut: 'Ctrl+N',
      category: 'edit'
    }
    // ... more commands
  ];

  get filteredCommands(): CommandPrompt[] {
    if (!this.commandQuery) return this.commands;
    
    return this.commands.filter(cmd => 
      cmd.command.toLowerCase().includes(this.commandQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(this.commandQuery.toLowerCase())
    );
  }

  onFieldInput(field: PromptField, event: Event): void {
    const input = event.target as HTMLInputElement;
    field.value = input.value;
    field.showPrompts = input.value.length > 0;
    this.selectedPromptIndex = -1;
  }

  onFieldKeydown(field: PromptField, event: KeyboardEvent): void {
    if (!field.showPrompts) return;

    const filteredPrompts = this.getFilteredPrompts(field);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedPromptIndex = Math.min(this.selectedPromptIndex + 1, filteredPrompts.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedPromptIndex = Math.max(this.selectedPromptIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedPromptIndex >= 0) {
          this.selectPrompt(field, filteredPrompts[this.selectedPromptIndex]);
        }
        break;
      case 'Escape':
        field.showPrompts = false;
        this.selectedPromptIndex = -1;
        break;
    }
  }

  getFilteredPrompts(field: PromptField): string[] {
    if (!field.value) return field.prompts;
    
    return field.prompts.filter(prompt => 
      prompt.toLowerCase().includes(field.value.toLowerCase())
    );
  }

  selectPrompt(field: PromptField, prompt: string): void {
    field.value = prompt;
    field.showPrompts = false;
    this.selectedPromptIndex = -1;
  }

  executeCommand(command: CommandPrompt): void {
    console.log('Executing command:', command.command);
    this.commandQuery = '';
    this.showCommandPrompts = false;
    this.selectedCommandIndex = -1;
  }
}`;
  }
}