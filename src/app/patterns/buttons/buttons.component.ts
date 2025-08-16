import { Component } from '@angular/core';

interface ButtonExample {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  buttonStates = {
    primary: false,
    secondary: false,
    danger: false,
    success: false,
    warning: false,
    ghost: false,
    link: false
  };

  loadingStates = {
    submit: false,
    save: false,
    delete: false
  };

  buttonExamples: ButtonExample[] = [
    { id: 'primary', label: 'Primary Button', type: 'primary', size: 'md' },
    { id: 'secondary', label: 'Secondary Button', type: 'secondary', size: 'md' },
    { id: 'danger', label: 'Danger Button', type: 'danger', size: 'md' },
    { id: 'success', label: 'Success Button', type: 'success', size: 'md' },
    { id: 'warning', label: 'Warning Button', type: 'warning', size: 'md' },
    { id: 'ghost', label: 'Ghost Button', type: 'ghost', size: 'md' },
    { id: 'link', label: 'Link Button', type: 'link', size: 'md' }
  ];

  iconButtons = [
    { id: 'edit', icon: '✏️', label: 'Edit', type: 'secondary' as const },
    { id: 'delete', icon: '🗑️', label: 'Delete', type: 'danger' as const },
    { id: 'save', icon: '💾', label: 'Save', type: 'primary' as const },
    { id: 'share', icon: '📤', label: 'Share', type: 'secondary' as const }
  ];

  sizeExamples = [
    { size: 'sm' as const, label: 'Small' },
    { size: 'md' as const, label: 'Medium' },
    { size: 'lg' as const, label: 'Large' }
  ];

  handleButtonClick(buttonId: string): void {
    console.log(`${buttonId} button clicked`);
    
    // Simulate button press feedback
    this.buttonStates[buttonId as keyof typeof this.buttonStates] = true;
    setTimeout(() => {
      this.buttonStates[buttonId as keyof typeof this.buttonStates] = false;
    }, 150);
  }

  handleLoadingAction(action: string): void {
    this.loadingStates[action as keyof typeof this.loadingStates] = true;
    
    // Simulate async operation
    setTimeout(() => {
      this.loadingStates[action as keyof typeof this.loadingStates] = false;
      console.log(`${action} completed`);
    }, 2000);
  }

  get htmlCode(): string {
    return `<div class="buttons-pattern">
  <div class="pattern-header">
    <h1 class="pattern-title">
      <span class="pattern-icon">🔘</span>
      Buttons Pattern
    </h1>
    <p class="pattern-description">
      Interactive buttons for triggering actions, with various styles, sizes, and states.
    </p>
  </div>

  <div class="demo-container">
    <!-- Button Types -->
    <div class="demo-section">
      <h3 class="section-title">Button Types</h3>
      <div class="button-grid">
        <button *ngFor="let btn of buttonExamples"
                class="btn"
                [class]="'btn-' + btn.type + ' btn-' + btn.size"
                [class.active]="buttonStates[btn.id]"
                (click)="handleButtonClick(btn.id)">
          {{ btn.label }}
        </button>
      </div>
    </div>

    <!-- Button Sizes -->
    <div class="demo-section">
      <h3 class="section-title">Button Sizes</h3>
      <div class="button-row">
        <button *ngFor="let size of sizeExamples"
                class="btn btn-primary"
                [class]="'btn-' + size.size">
          {{ size.label }}
        </button>
      </div>
    </div>

    <!-- Icon Buttons -->
    <div class="demo-section">
      <h3 class="section-title">Icon Buttons</h3>
      <div class="button-row">
        <button *ngFor="let btn of iconButtons"
                class="btn btn-icon"
                [class]="'btn-' + btn.type"
                (click)="handleButtonClick(btn.id)">
          <span class="btn-icon">{{ btn.icon }}</span>
          <span class="btn-text">{{ btn.label }}</span>
        </button>
      </div>
    </div>

    <!-- Loading States -->
    <div class="demo-section">
      <h3 class="section-title">Loading States</h3>
      <div class="button-row">
        <button class="btn btn-primary"
                [class.loading]="loadingStates.submit"
                [disabled]="loadingStates.submit"
                (click)="handleLoadingAction('submit')">
          <span *ngIf="!loadingStates.submit">Submit</span>
          <span *ngIf="loadingStates.submit" class="loading-content">
            <span class="spinner"></span>
            Submitting...
          </span>
        </button>

        <button class="btn btn-secondary"
                [class.loading]="loadingStates.save"
                [disabled]="loadingStates.save"
                (click)="handleLoadingAction('save')">
          <span *ngIf="!loadingStates.save">Save Draft</span>
          <span *ngIf="loadingStates.save" class="loading-content">
            <span class="spinner"></span>
            Saving...
          </span>
        </button>

        <button class="btn btn-danger"
                [class.loading]="loadingStates.delete"
                [disabled]="loadingStates.delete"
                (click)="handleLoadingAction('delete')">
          <span *ngIf="!loadingStates.delete">Delete</span>
          <span *ngIf="loadingStates.delete" class="loading-content">
            <span class="spinner"></span>
            Deleting...
          </span>
        </button>
      </div>
    </div>

    <!-- Disabled States -->
    <div class="demo-section">
      <h3 class="section-title">Disabled States</h3>
      <div class="button-row">
        <button class="btn btn-primary" disabled>Primary Disabled</button>
        <button class="btn btn-secondary" disabled>Secondary Disabled</button>
        <button class="btn btn-danger" disabled>Danger Disabled</button>
      </div>
    </div>

    <!-- Button Groups -->
    <div class="demo-section">
      <h3 class="section-title">Button Groups</h3>
      <div class="btn-group">
        <button class="btn btn-secondary">Left</button>
        <button class="btn btn-secondary active">Center</button>
        <button class="btn btn-secondary">Right</button>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `.buttons-pattern {
  .pattern-header {
    text-align: center;
    margin-bottom: var(--spacing-8);
  }

  .demo-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .demo-section {
    margin-bottom: var(--spacing-8);
    padding: var(--spacing-6);
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
  }

  .section-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-4);
  }

  .button-row {
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;
    align-items: center;
  }

  /* Base Button Styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--font-size-sm);
    font-weight: 500;
    line-height: 1;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
    position: relative;
    overflow: hidden;

    &:focus-visible {
      outline: 2px solid var(--primary-500);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &.loading {
      color: transparent;
    }
  }

  /* Button Types */
  .btn-primary {
    background: var(--primary-500);
    color: white;
    border-color: var(--primary-500);

    &:hover:not(:disabled) {
      background: var(--primary-600);
      border-color: var(--primary-600);
    }

    &:active,
    &.active {
      background: var(--primary-700);
      border-color: var(--primary-700);
      transform: translateY(1px);
    }
  }

  .btn-secondary {
    background: var(--bg-primary);
    color: var(--text-primary);
    border-color: var(--border-primary);

    &:hover:not(:disabled) {
      background: var(--bg-secondary);
      border-color: var(--border-secondary);
    }

    &:active,
    &.active {
      background: var(--bg-tertiary);
      transform: translateY(1px);
    }
  }

  .btn-danger {
    background: var(--red-500);
    color: white;
    border-color: var(--red-500);

    &:hover:not(:disabled) {
      background: var(--red-600);
      border-color: var(--red-600);
    }

    &:active,
    &.active {
      background: var(--red-700);
      border-color: var(--red-700);
      transform: translateY(1px);
    }
  }

  .btn-success {
    background: var(--green-500);
    color: white;
    border-color: var(--green-500);

    &:hover:not(:disabled) {
      background: var(--green-600);
      border-color: var(--green-600);
    }

    &:active,
    &.active {
      background: var(--green-700);
      border-color: var(--green-700);
      transform: translateY(1px);
    }
  }

  .btn-warning {
    background: #f59e0b;
    color: white;
    border-color: #f59e0b;

    &:hover:not(:disabled) {
      background: #d97706;
      border-color: #d97706;
    }

    &:active,
    &.active {
      background: #b45309;
      border-color: #b45309;
      transform: translateY(1px);
    }
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-primary);
    border-color: transparent;

    &:hover:not(:disabled) {
      background: var(--bg-secondary);
    }

    &:active,
    &.active {
      background: var(--bg-tertiary);
      transform: translateY(1px);
    }
  }

  .btn-link {
    background: transparent;
    color: var(--primary-500);
    border-color: transparent;
    text-decoration: underline;
    padding: var(--spacing-1) var(--spacing-2);

    &:hover:not(:disabled) {
      color: var(--primary-600);
      text-decoration: none;
    }

    &:active,
    &.active {
      color: var(--primary-700);
    }
  }

  /* Button Sizes */
  .btn-sm {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-xs);
  }

  .btn-md {
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--font-size-sm);
  }

  .btn-lg {
    padding: var(--spacing-4) var(--spacing-6);
    font-size: var(--font-size-base);
  }

  /* Icon Buttons */
  .btn-icon {
    .btn-icon {
      font-size: var(--font-size-base);
    }
  }

  /* Loading States */
  .loading-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: inherit;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Button Groups */
  .btn-group {
    display: inline-flex;
    border-radius: var(--radius-md);
    overflow: hidden;

    .btn {
      border-radius: 0;
      border-right-width: 0;

      &:first-child {
        border-top-left-radius: var(--radius-md);
        border-bottom-left-radius: var(--radius-md);
      }

      &:last-child {
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
        border-right-width: 1px;
      }

      &:focus {
        z-index: 1;
      }
    }
  }
}

@media (max-width: 640px) {
  .button-grid {
    grid-template-columns: 1fr;
  }

  .button-row {
    flex-direction: column;
    align-items: stretch;

    .btn {
      width: 100%;
    }
  }

  .btn-group {
    flex-direction: column;

    .btn {
      border-radius: 0;
      border-bottom-width: 0;
      border-right-width: 1px;

      &:first-child {
        border-top-left-radius: var(--radius-md);
        border-top-right-radius: var(--radius-md);
        border-bottom-left-radius: 0;
      }

      &:last-child {
        border-bottom-left-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
        border-top-right-radius: 0;
        border-bottom-width: 1px;
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .demo-section {
    background: var(--gray-800);
    border-color: var(--gray-700);
  }

  .btn-secondary {
    background: var(--gray-700);
    color: var(--gray-200);
    border-color: var(--gray-600);

    &:hover:not(:disabled) {
      background: var(--gray-600);
      border-color: var(--gray-500);
    }
  }

  .btn-ghost {
    color: var(--gray-200);

    &:hover:not(:disabled) {
      background: var(--gray-700);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface ButtonExample {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  buttonStates = {
    primary: false,
    secondary: false,
    danger: false,
    success: false,
    warning: false,
    ghost: false,
    link: false
  };

  loadingStates = {
    submit: false,
    save: false,
    delete: false
  };

  buttonExamples: ButtonExample[] = [
    { id: 'primary', label: 'Primary Button', type: 'primary', size: 'md' },
    { id: 'secondary', label: 'Secondary Button', type: 'secondary', size: 'md' },
    { id: 'danger', label: 'Danger Button', type: 'danger', size: 'md' },
    { id: 'success', label: 'Success Button', type: 'success', size: 'md' },
    { id: 'warning', label: 'Warning Button', type: 'warning', size: 'md' },
    { id: 'ghost', label: 'Ghost Button', type: 'ghost', size: 'md' },
    { id: 'link', label: 'Link Button', type: 'link', size: 'md' }
  ];

  iconButtons = [
    { id: 'edit', icon: '✏️', label: 'Edit', type: 'secondary' as const },
    { id: 'delete', icon: '🗑️', label: 'Delete', type: 'danger' as const },
    { id: 'save', icon: '💾', label: 'Save', type: 'primary' as const },
    { id: 'share', icon: '📤', label: 'Share', type: 'secondary' as const }
  ];

  sizeExamples = [
    { size: 'sm' as const, label: 'Small' },
    { size: 'md' as const, label: 'Medium' },
    { size: 'lg' as const, label: 'Large' }
  ];

  handleButtonClick(buttonId: string): void {
    console.log(\`\${buttonId} button clicked\`);
    
    // Simulate button press feedback
    this.buttonStates[buttonId as keyof typeof this.buttonStates] = true;
    setTimeout(() => {
      this.buttonStates[buttonId as keyof typeof this.buttonStates] = false;
    }, 150);
  }

  handleLoadingAction(action: string): void {
    this.loadingStates[action as keyof typeof this.loadingStates] = true;
    
    // Simulate async operation
    setTimeout(() => {
      this.loadingStates[action as keyof typeof this.loadingStates] = false;
      console.log(\`\${action} completed\`);
    }, 2000);
  }
}`;
  }
}