import { Component } from '@angular/core';

interface HelpItem {
  id: string;
  title: string;
  content: string;
  type: 'tooltip' | 'popover' | 'inline' | 'modal';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  icon?: string;
}

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  help: HelpItem;
  required?: boolean;
}

@Component({
  selector: 'app-inline-help',
  templateUrl: './inline-help.component.html',
  styleUrls: ['./inline-help.component.scss']
})
export class InlineHelpComponent {
  activeTooltip: string | null = null;
  activePopover: string | null = null;
  showHelpModal = false;
  expandedHelp: string | null = null;

  formFields: FormField[] = [
    {
      id: 'username',
      label: 'Username',
      placeholder: 'Enter your username',
      value: '',
      required: true,
      help: {
        id: 'username-help',
        title: 'Username Requirements',
        content: 'Username must be 3-20 characters long, contain only letters, numbers, and underscores. It must be unique across the platform.',
        type: 'tooltip',
        placement: 'right',
        icon: '💡'
      }
    },
    {
      id: 'email',
      label: 'Email Address',
      placeholder: 'your.email@example.com',
      value: '',
      required: true,
      help: {
        id: 'email-help',
        title: 'Email Verification',
        content: 'We will send a verification email to this address. Make sure you have access to this email account to complete registration.',
        type: 'popover',
        placement: 'bottom',
        icon: '📧'
      }
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'Create a strong password',
      value: '',
      required: true,
      help: {
        id: 'password-help',
        title: 'Password Security',
        content: 'Password must contain at least 8 characters including uppercase, lowercase, numbers, and special characters. Avoid common passwords.',
        type: 'inline',
        icon: '🔒'
      }
    },
    {
      id: 'phone',
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      value: '',
      help: {
        id: 'phone-help',
        title: 'Phone Verification',
        content: 'Your phone number will be used for two-factor authentication and account recovery. We support international numbers.',
        type: 'modal',
        icon: '📱'
      }
    }
  ];

  helpTypes = [
    {
      id: 'tooltip',
      name: 'Tooltip',
      description: 'Hover to show brief help text',
      icon: '💡',
      demo: 'Hover over the info icon'
    },
    {
      id: 'popover',
      name: 'Popover',
      description: 'Click to show detailed help',
      icon: '📋',
      demo: 'Click the help button'
    },
    {
      id: 'inline',
      name: 'Inline Help',
      description: 'Always visible contextual help',
      icon: '📝',
      demo: 'Help text shown below field'
    },
    {
      id: 'modal',
      name: 'Help Modal',
      description: 'Full overlay with detailed help',
      icon: '📖',
      demo: 'Opens in modal dialog'
    }
  ];

  showTooltip(id: string): void {
    this.activeTooltip = id;
  }

  hideTooltip(): void {
    this.activeTooltip = null;
  }

  togglePopover(id: string): void {
    this.activePopover = this.activePopover === id ? null : id;
  }

  closePopover(): void {
    this.activePopover = null;
  }

  openHelpModal(): void {
    this.showHelpModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeHelpModal(): void {
    this.showHelpModal = false;
    document.body.style.overflow = 'auto';
  }

  toggleInlineHelp(id: string): void {
    this.expandedHelp = this.expandedHelp === id ? null : id;
  }

  getHelpById(id: string): HelpItem | undefined {
    return this.formFields.find(field => field.help.id === id)?.help;
  }

  get exampleCode(): string {
    return `<!-- Tooltip Help -->
<div class="field-group">
  <label>Username <span class="required">*</span></label>
  <div class="input-with-help">
    <input type="text" placeholder="Enter username">
    <div class="help-trigger tooltip" 
         (mouseenter)="showTooltip('username')"
         (mouseleave)="hideTooltip()">
      <span class="help-icon">💡</span>
      <div class="tooltip-content" *ngIf="activeTooltip === 'username'">
        Username must be 3-20 characters long
      </div>
    </div>
  </div>
</div>

<!-- Popover Help -->
<div class="field-group">
  <label>Email Address <span class="required">*</span></label>
  <div class="input-with-help">
    <input type="email" placeholder="your.email@example.com">
    <button class="help-trigger popover" (click)="togglePopover('email')">
      <span class="help-icon">📧</span>
    </button>
    <div class="popover-content" *ngIf="activePopover === 'email'">
      <h4>Email Verification</h4>
      <p>We will send a verification email to this address...</p>
    </div>
  </div>
</div>

<!-- Inline Help -->
<div class="field-group">
  <label>Password <span class="required">*</span></label>
  <input type="password" placeholder="Create a strong password">
  <div class="inline-help">
    <span class="help-icon">🔒</span>
    <span>Password must contain at least 8 characters...</span>
  </div>
</div>`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Inline Help" 
  description="Contextual help and guidance within forms and interfaces"
  icon="💡">
</app-pattern-header>

<div class="inline-help-demo">
  <!-- Help Types Overview -->
  <div class="help-types-grid">
    <div *ngFor="let type of helpTypes" class="help-type-card">
      <div class="type-icon">{{ type.icon }}</div>
      <h3>{{ type.name }}</h3>
      <p>{{ type.description }}</p>
      <div class="type-demo">{{ type.demo }}</div>
    </div>
  </div>

  <!-- Form with Different Help Types -->
  <div class="form-container">
    <h3>Registration Form with Inline Help</h3>
    
    <form class="help-form">
      <div *ngFor="let field of formFields" class="field-group">
        <label class="field-label">
          {{ field.label }}
          <span *ngIf="field.required" class="required">*</span>
        </label>
        
        <div class="input-with-help">
          <input 
            [id]="field.id"
            type="text" 
            [placeholder]="field.placeholder"
            [(ngModel)]="field.value"
            [name]="field.id"
            class="form-input">
          
          <!-- Tooltip Help -->
          <div *ngIf="field.help.type === 'tooltip'" 
               class="help-trigger tooltip"
               (mouseenter)="showTooltip(field.help.id)"
               (mouseleave)="hideTooltip()">
            <span class="help-icon">{{ field.help.icon }}</span>
            <div class="tooltip-content" 
                 [class.show]="activeTooltip === field.help.id"
                 [class.placement-right]="field.help.placement === 'right'">
              <div class="tooltip-header">{{ field.help.title }}</div>
              <div class="tooltip-body">{{ field.help.content }}</div>
            </div>
          </div>
          
          <!-- Popover Help -->
          <button *ngIf="field.help.type === 'popover'" 
                  type="button"
                  class="help-trigger popover-btn"
                  (click)="togglePopover(field.help.id)">
            <span class="help-icon">{{ field.help.icon }}</span>
          </button>
          
          <!-- Modal Help -->
          <button *ngIf="field.help.type === 'modal'" 
                  type="button"
                  class="help-trigger modal-btn"
                  (click)="openHelpModal()">
            <span class="help-icon">{{ field.help.icon }}</span>
          </button>
        </div>
        
        <!-- Popover Content -->
        <div *ngIf="field.help.type === 'popover' && activePopover === field.help.id" 
             class="popover-content">
          <div class="popover-header">
            <h4>{{ field.help.title }}</h4>
            <button class="close-btn" (click)="closePopover()">×</button>
          </div>
          <div class="popover-body">{{ field.help.content }}</div>
        </div>
        
        <!-- Inline Help -->
        <div *ngIf="field.help.type === 'inline'" class="inline-help">
          <button class="inline-help-toggle" 
                  (click)="toggleInlineHelp(field.help.id)">
            <span class="help-icon">{{ field.help.icon }}</span>
            <span>{{ field.help.title }}</span>
            <span class="toggle-icon" 
                  [class.expanded]="expandedHelp === field.help.id">▼</span>
          </button>
          <div class="inline-help-content" 
               [class.expanded]="expandedHelp === field.help.id">
            {{ field.help.content }}
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-btn">Create Account</button>
        <button type="button" class="help-btn" (click)="openHelpModal()">
          Need Help?
        </button>
      </div>
    </form>
  </div>

  <!-- Help Modal -->
  <div class="help-modal" 
       *ngIf="showHelpModal" 
       (click)="closeHelpModal()">
    <div class="modal-content" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h3>Registration Help</h3>
        <button class="close-btn" (click)="closeHelpModal()">×</button>
      </div>
      <div class="modal-body">
        <div class="help-section" *ngFor="let field of formFields">
          <h4>
            <span class="section-icon">{{ field.help.icon }}</span>
            {{ field.help.title }}
          </h4>
          <p>{{ field.help.content }}</p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-primary" (click)="closeHelpModal()">Got it!</button>
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
    return `/* Inline Help Styles */
.inline-help-demo {
  padding: var(--spacing-6);
}

.help-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.help-type-card {
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

  .type-icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-3);
  }

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-2) 0;
  }

  p {
    color: var(--text-secondary);
    margin: 0 0 var(--spacing-3) 0;
    font-size: var(--font-size-sm);
  }

  .type-demo {
    background: var(--primary-50);
    color: var(--primary-700);
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    font-weight: 500;

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
      color: var(--primary-300);
    }
  }
}

.form-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);

  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-6) 0;
  }
}

.help-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.field-group {
  position: relative;
}

.field-label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);

  .required {
    color: var(--red-500);
    margin-left: var(--spacing-1);
  }
}

.input-with-help {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.form-input {
  flex: 1;
  padding: var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

/* Help Triggers */
.help-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-normal);
  flex-shrink: 0;
  position: relative;

  .help-icon {
    font-size: 1rem;
  }

  &.tooltip {
    background: var(--gray-100);
    color: var(--gray-600);

    &:hover {
      background: var(--primary-100);
      color: var(--primary-600);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
      color: var(--gray-400);

      &:hover {
        background: var(--primary-800);
        color: var(--primary-300);
      }
    }
  }

  &.popover-btn,
  &.modal-btn {
    background: var(--primary-100);
    color: var(--primary-600);
    border: none;

    &:hover {
      background: var(--primary-200);
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--primary-800);
      color: var(--primary-300);

      &:hover {
        background: var(--primary-700);
      }
    }
  }
}

/* Tooltip */
.tooltip-content {
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: white;
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  max-width: 250px;
  white-space: normal;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-lg);

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &.placement-right {
    left: 120%;
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--gray-900);
  }

  &.placement-right::after {
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-right-color: var(--gray-900);
    border-top-color: transparent;
  }

  .tooltip-header {
    font-weight: 600;
    margin-bottom: var(--spacing-1);
  }

  .tooltip-body {
    line-height: 1.4;
  }
}

/* Popover */
.popover-content {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  min-width: 300px;
  margin-top: var(--spacing-2);
  animation: popoverIn 0.2s ease-out;

  @keyframes popoverIn {
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

.popover-header {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-primary);

  h4 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    flex: 1;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-1);
    border-radius: var(--radius-sm);
    transition: all var(--transition-normal);

    &:hover {
      background: var(--gray-100);
      color: var(--text-primary);
    }

    @media (prefers-color-scheme: dark) {
      &:hover {
        background: var(--gray-700);
      }
    }
  }
}

.popover-body {
  padding: var(--spacing-4);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

/* Inline Help */
.inline-help {
  margin-top: var(--spacing-2);
}

.inline-help-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    color: var(--text-primary);
  }

  .toggle-icon {
    transition: transform var(--transition-normal);
    font-size: var(--font-size-xs);

    &.expanded {
      transform: rotate(180deg);
    }
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-800);
    }
  }
}

.inline-help-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  padding: 0 var(--spacing-6);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;

  &.expanded {
    max-height: 200px;
    padding: var(--spacing-3) var(--spacing-6);
  }
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: space-between;
  margin-top: var(--spacing-4);
}

.submit-btn,
.help-btn {
  padding: var(--spacing-3) var(--spacing-6);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.submit-btn {
  background: var(--primary-600);
  color: white;

  &:hover {
    background: var(--primary-700);
  }
}

.help-btn {
  background: var(--gray-100);
  color: var(--gray-700);

  &:hover {
    background: var(--gray-200);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
    color: var(--gray-300);

    &:hover {
      background: var(--gray-600);
    }
  }
}

/* Help Modal */
.help-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-4);
  backdrop-filter: blur(5px);
  animation: modalIn 0.3s ease-out;

  @keyframes modalIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

.modal-content {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalContentIn 0.3s ease-out;

  @keyframes modalContentIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--border-primary);

  h3 {
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
    padding: var(--spacing-2);
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);

    &:hover {
      background: var(--gray-100);
      color: var(--text-primary);
    }

    @media (prefers-color-scheme: dark) {
      &:hover {
        background: var(--gray-700);
      }
    }
  }
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-6);
}

.help-section {
  margin-bottom: var(--spacing-6);

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-2) 0;

    .section-icon {
      font-size: 1.25rem;
    }
  }

  p {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0;
  }
}

.modal-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--border-primary);
  text-align: right;
}

.btn-primary {
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--primary-700);
  }

  &:focus {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .help-types-grid {
    grid-template-columns: 1fr;
  }

  .form-container {
    padding: var(--spacing-4);
  }

  .popover-content {
    left: 0;
    right: 0;
    min-width: auto;
  }

  .form-actions {
    flex-direction: column;
  }

  .modal-content {
    margin: var(--spacing-2);
    max-height: calc(100vh - var(--spacing-4));
  }

  .tooltip-content {
    position: fixed;
    left: var(--spacing-4) !important;
    right: var(--spacing-4);
    bottom: auto !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    max-width: none;
    white-space: normal;

    &::after {
      display: none;
    }
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .tooltip-content,
  .popover-content,
  .inline-help-content,
  .help-modal,
  .modal-content {
    transition: none;
    animation: none;
  }

  .toggle-icon {
    transition: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface HelpItem {
  id: string;
  title: string;
  content: string;
  type: 'tooltip' | 'popover' | 'inline' | 'modal';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  icon?: string;
}

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  help: HelpItem;
  required?: boolean;
}

@Component({
  selector: 'app-inline-help',
  templateUrl: './inline-help.component.html',
  styleUrls: ['./inline-help.component.scss']
})
export class InlineHelpComponent {
  activeTooltip: string | null = null;
  activePopover: string | null = null;
  showHelpModal = false;
  expandedHelp: string | null = null;

  formFields: FormField[] = [
    {
      id: 'username',
      label: 'Username',
      placeholder: 'Enter your username',
      value: '',
      required: true,
      help: {
        id: 'username-help',
        title: 'Username Requirements',
        content: 'Username must be 3-20 characters long, contain only letters, numbers, and underscores.',
        type: 'tooltip',
        placement: 'right',
        icon: '💡'
      }
    }
    // ... more form fields
  ];

  showTooltip(id: string): void {
    this.activeTooltip = id;
  }

  hideTooltip(): void {
    this.activeTooltip = null;
  }

  togglePopover(id: string): void {
    this.activePopover = this.activePopover === id ? null : id;
  }

  closePopover(): void {
    this.activePopover = null;
  }

  openHelpModal(): void {
    this.showHelpModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeHelpModal(): void {
    this.showHelpModal = false;
    document.body.style.overflow = 'auto';
  }

  toggleInlineHelp(id: string): void {
    this.expandedHelp = this.expandedHelp === id ? null : id;
  }
}`;
  }
}