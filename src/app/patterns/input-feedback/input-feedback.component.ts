import { Component } from '@angular/core';

interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'custom';
  value?: any;
  message: string;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel';
  value: string;
  placeholder: string;
  rules: ValidationRule[];
  touched: boolean;
  focused: boolean;
}

interface FeedbackMessage {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  icon: string;
}

@Component({
  selector: 'app-input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: ['./input-feedback.component.scss']
})
export class InputFeedbackComponent {
  
  formFields: FormField[] = [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      value: '',
      placeholder: 'Enter your username',
      touched: false,
      focused: false,
      rules: [
        { type: 'required', message: 'Username is required' },
        { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
        { type: 'maxLength', value: 20, message: 'Username cannot exceed 20 characters' },
        { type: 'pattern', value: '^[a-zA-Z0-9_]+$', message: 'Username can only contain letters, numbers, and underscores' }
      ]
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      value: '',
      placeholder: 'your.email@example.com',
      touched: false,
      focused: false,
      rules: [
        { type: 'required', message: 'Email is required' },
        { type: 'email', message: 'Please enter a valid email address' }
      ]
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      value: '',
      placeholder: 'Create a strong password',
      touched: false,
      focused: false,
      rules: [
        { type: 'required', message: 'Password is required' },
        { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
        { type: 'pattern', value: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)', message: 'Password must contain uppercase, lowercase, and numbers' }
      ]
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      value: '',
      placeholder: '+1 (555) 123-4567',
      touched: false,
      focused: false,
      rules: [
        { type: 'pattern', value: '^\\+?[1-9]\\d{1,14}$', message: 'Please enter a valid phone number' }
      ]
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      value: '',
      placeholder: 'Enter your age',
      touched: false,
      focused: false,
      rules: [
        { type: 'required', message: 'Age is required' },
        { type: 'custom', message: 'Age must be between 13 and 120' }
      ]
    }
  ];

  feedbackTypes = [
    { 
      type: 'error' as const, 
      title: 'Error Messages', 
      description: 'Critical validation failures',
      icon: '❌',
      example: 'This field is required'
    },
    { 
      type: 'warning' as const, 
      title: 'Warning Messages', 
      description: 'Potential issues to address',
      icon: '⚠️',
      example: 'Password strength: Medium'
    },
    { 
      type: 'success' as const, 
      title: 'Success Messages', 
      description: 'Validation passed successfully',
      icon: '✅',
      example: 'Username is available'
    },
    { 
      type: 'info' as const, 
      title: 'Info Messages', 
      description: 'Helpful guidance and tips',
      icon: 'ℹ️',
      example: 'Use 8+ characters for better security'
    }
  ];

  onFieldInput(field: FormField): void {
    // Mark field as touched when user starts typing
    if (!field.touched && field.value.length > 0) {
      field.touched = true;
    }
  }

  onFieldFocus(field: FormField): void {
    field.focused = true;
  }

  onFieldBlur(field: FormField): void {
    field.focused = false;
    field.touched = true;
  }

  validateField(field: FormField): FeedbackMessage | null {
    if (!field.touched && !field.focused) {
      return null;
    }

    // Check each validation rule
    for (const rule of field.rules) {
      const isValid = this.checkRule(field.value, rule);
      if (!isValid) {
        return {
          type: 'error',
          message: rule.message,
          icon: '❌'
        };
      }
    }

    // Special success messages for certain fields
    if (field.touched && field.value) {
      if (field.id === 'username' && field.value.length >= 3) {
        return {
          type: 'success',
          message: 'Username looks good!',
          icon: '✅'
        };
      }
      if (field.id === 'email' && this.isValidEmail(field.value)) {
        return {
          type: 'success',
          message: 'Valid email address',
          icon: '✅'
        };
      }
      if (field.id === 'password' && field.value.length >= 8) {
        const strength = this.getPasswordStrength(field.value);
        if (strength === 'Strong') {
          return {
            type: 'success',
            message: 'Strong password!',
            icon: '✅'
          };
        } else if (strength === 'Medium') {
          return {
            type: 'warning',
            message: 'Password strength: Medium',
            icon: '⚠️'
          };
        }
      }
    }

    // Info messages for focused empty fields
    if (field.focused && !field.value) {
      if (field.id === 'username') {
        return {
          type: 'info',
          message: 'Choose a unique username (3-20 characters)',
          icon: 'ℹ️'
        };
      }
      if (field.id === 'password') {
        return {
          type: 'info',
          message: 'Use 8+ characters with uppercase, lowercase, and numbers',
          icon: 'ℹ️'
        };
      }
    }

    return null;
  }

  private checkRule(value: string, rule: ValidationRule): boolean {
    switch (rule.type) {
      case 'required':
        return value.trim().length > 0;
      
      case 'minLength':
        return value.length >= rule.value;
      
      case 'maxLength':
        return value.length <= rule.value;
      
      case 'pattern':
        const regex = new RegExp(rule.value);
        return regex.test(value);
      
      case 'email':
        return this.isValidEmail(value);
      
      case 'custom':
        if (rule.message.includes('Age')) {
          const age = parseInt(value);
          return age >= 13 && age <= 120;
        }
        return true;
      
      default:
        return true;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private getPasswordStrength(password: string): 'Weak' | 'Medium' | 'Strong' {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    
    if (score >= 4) return 'Strong';
    if (score >= 2) return 'Medium';
    return 'Weak';
  }

  getFieldStatus(field: FormField): 'default' | 'error' | 'warning' | 'success' | 'info' {
    const feedback = this.validateField(field);
    return feedback ? feedback.type : 'default';
  }

  isFieldValid(field: FormField): boolean {
    const feedback = this.validateField(field);
    return !feedback || feedback.type !== 'error';
  }

  getFieldProgress(field: FormField): number {
    if (!field.value) return 0;
    
    let validRules = 0;
    for (const rule of field.rules) {
      if (this.checkRule(field.value, rule)) {
        validRules++;
      }
    }
    
    return (validRules / field.rules.length) * 100;
  }

  get exampleCode(): string {
    return `<!-- Input with Real-time Feedback -->
<div class="form-field">
  <label for="username">Username</label>
  <div class="input-container">
    <input
      type="text"
      [(ngModel)]="field.value"
      (input)="onFieldInput(field)"
      (focus)="onFieldFocus(field)"
      (blur)="onFieldBlur(field)"
      [class]="getFieldStatus(field)"
      placeholder="Enter username">
    
    <div class="input-feedback" *ngIf="validateField(field) as feedback">
      <span class="feedback-icon">{{ feedback.icon }}</span>
      <span class="feedback-message">{{ feedback.message }}</span>
    </div>
    
    <!-- Progress Indicator -->
    <div class="validation-progress">
      <div class="progress-bar" 
           [style.width.%]="getFieldProgress(field)">
      </div>
    </div>
  </div>
</div>

<!-- Component Logic -->
export class InputFeedbackComponent {
  validateField(field: FormField): FeedbackMessage | null {
    if (!field.touched && !field.focused) return null;
    
    for (const rule of field.rules) {
      if (!this.checkRule(field.value, rule)) {
        return {
          type: 'error',
          message: rule.message,
          icon: '❌'
        };
      }
    }
    
    return {
      type: 'success',
      message: 'Looks good!',
      icon: '✅'
    };
  }
}`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Input Feedback" 
  description="Real-time validation and feedback for form inputs"
  icon="💬">
</app-pattern-header>

<div class="input-feedback-demo">
  <!-- Feedback Types Overview -->
  <div class="feedback-types-grid">
    <div *ngFor="let type of feedbackTypes" class="feedback-type-card">
      <div class="type-icon">{{ type.icon }}</div>
      <h3>{{ type.title }}</h3>
      <p>{{ type.description }}</p>
      <div class="type-example" [ngClass]="'example-' + type.type">
        {{ type.example }}
      </div>
    </div>
  </div>

  <!-- Interactive Form -->
  <div class="form-container">
    <h3>Registration Form with Real-time Feedback</h3>
    
    <form class="feedback-form">
      <div *ngFor="let field of formFields" class="form-field">
        <label class="field-label" [for]="field.id">
          {{ field.label }}
          <span *ngIf="field.rules.some(r => r.type === 'required')" class="required">*</span>
        </label>
        
        <div class="input-container" [ngClass]="'status-' + getFieldStatus(field)">
          <input
            [id]="field.id"
            [type]="field.type"
            [name]="field.id"
            [(ngModel)]="field.value"
            [placeholder]="field.placeholder"
            (input)="onFieldInput(field)"
            (focus)="onFieldFocus(field)"
            (blur)="onFieldBlur(field)"
            class="form-input"
            [class.has-feedback]="validateField(field)">
          
          <!-- Status Icon -->
          <div class="status-icon" *ngIf="field.touched || field.focused">
            <span *ngIf="getFieldStatus(field) === 'error'">❌</span>
            <span *ngIf="getFieldStatus(field) === 'warning'">⚠️</span>
            <span *ngIf="getFieldStatus(field) === 'success'">✅</span>
            <span *ngIf="getFieldStatus(field) === 'info'">ℹ️</span>
          </div>
          
          <!-- Progress Bar -->
          <div class="validation-progress" *ngIf="field.touched && field.value">
            <div class="progress-bar" 
                 [style.width.%]="getFieldProgress(field)"
                 [ngClass]="'progress-' + getFieldStatus(field)">
            </div>
          </div>
          
          <!-- Feedback Message -->
          <div class="feedback-message" 
               *ngIf="validateField(field) as feedback"
               [ngClass]="'feedback-' + feedback.type">
            <div class="feedback-content">
              <span class="feedback-icon">{{ feedback.icon }}</span>
              <span class="feedback-text">{{ feedback.message }}</span>
            </div>
          </div>
        </div>
        
        <!-- Field Requirements (shown when focused) -->
        <div class="field-requirements" 
             *ngIf="field.focused && field.rules.length > 0">
          <div class="requirements-title">Requirements:</div>
          <ul class="requirements-list">
            <li *ngFor="let rule of field.rules" 
                class="requirement-item"
                [class.met]="checkRule(field.value, rule)"
                [class.unmet]="!checkRule(field.value, rule)">
              <span class="requirement-icon">
                {{ checkRule(field.value, rule) ? '✅' : '⭕' }}
              </span>
              <span class="requirement-text">{{ rule.message }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" 
                class="submit-btn"
                [disabled]="!formFields.every(f => isFieldValid(f))">
          Create Account
        </button>
        <div class="form-status">
          <span *ngIf="formFields.every(f => isFieldValid(f))" class="status-valid">
            ✅ All fields are valid
          </span>
          <span *ngIf="!formFields.every(f => isFieldValid(f))" class="status-invalid">
            ❌ Please fix the errors above
          </span>
        </div>
      </div>
    </form>
  </div>

  <!-- Features Section -->
  <div class="features-section">
    <h3>Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <div class="feature-icon">⚡</div>
        <h4>Real-time Validation</h4>
        <p>Instant feedback as users type</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🎯</div>
        <h4>Smart Timing</h4>
        <p>Shows feedback at the right moment</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📊</div>
        <h4>Progress Indicators</h4>
        <p>Visual progress for complex validation</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🎨</div>
        <h4>Multiple States</h4>
        <p>Error, warning, success, and info states</p>
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
    return `/* Input Feedback Styles */
.input-feedback-demo {
  padding: var(--spacing-6);
}

.feedback-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.feedback-type-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  text-align: center;

  .type-icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-3);
  }

  h3 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-2) 0;
  }

  p {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-3) 0;
  }

  .type-example {
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    font-weight: 500;

    &.example-error {
      background: var(--red-50);
      color: var(--red-700);
      border: 1px solid var(--red-200);
    }

    &.example-warning {
      background: var(--yellow-50);
      color: var(--yellow-700);
      border: 1px solid var(--yellow-200);
    }

    &.example-success {
      background: var(--green-50);
      color: var(--green-700);
      border: 1px solid var(--green-200);
    }

    &.example-info {
      background: var(--blue-50);
      color: var(--blue-700);
      border: 1px solid var(--blue-200);
    }

    @media (prefers-color-scheme: dark) {
      &.example-error {
        background: var(--red-900);
        color: var(--red-300);
        border-color: var(--red-700);
      }

      &.example-warning {
        background: var(--yellow-900);
        color: var(--yellow-300);
        border-color: var(--yellow-700);
      }

      &.example-success {
        background: var(--green-900);
        color: var(--green-300);
        border-color: var(--green-700);
      }

      &.example-info {
        background: var(--blue-900);
        color: var(--blue-300);
        border-color: var(--blue-700);
      }
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

.feedback-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.form-field {
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

.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  
  &.status-error {
    .form-input {
      border-color: var(--red-400);
      background: var(--red-50);

      @media (prefers-color-scheme: dark) {
        background: var(--red-900);
        border-color: var(--red-600);
      }
    }
  }

  &.status-warning {
    .form-input {
      border-color: var(--yellow-400);
      background: var(--yellow-50);

      @media (prefers-color-scheme: dark) {
        background: var(--yellow-900);
        border-color: var(--yellow-600);
      }
    }
  }

  &.status-success {
    .form-input {
      border-color: var(--green-400);
      background: var(--green-50);

      @media (prefers-color-scheme: dark) {
        background: var(--green-900);
        border-color: var(--green-600);
      }
    }
  }

  &.status-info {
    .form-input {
      border-color: var(--blue-400);
      background: var(--blue-50);

      @media (prefers-color-scheme: dark) {
        background: var(--blue-900);
        border-color: var(--blue-600);
      }
    }
  }
}

.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  background: var(--bg-primary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }

  &.has-feedback {
    padding-right: 3rem;
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

.status-icon {
  position: absolute;
  right: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  z-index: 10;
}

.validation-progress {
  height: 2px;
  background: var(--gray-200);
  border-radius: 1px;
  margin-top: 1px;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

.progress-bar {
  height: 100%;
  transition: width var(--transition-normal);
  border-radius: 1px;

  &.progress-error {
    background: var(--red-500);
  }

  &.progress-warning {
    background: var(--yellow-500);
  }

  &.progress-success {
    background: var(--green-500);
  }

  &.progress-info {
    background: var(--blue-500);
  }

  &.progress-default {
    background: var(--gray-400);
  }
}

.feedback-message {
  margin-top: var(--spacing-2);
  animation: feedbackIn 0.3s ease-out;

  @keyframes feedbackIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.feedback-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.feedback-error .feedback-content {
  background: var(--red-50);
  color: var(--red-700);
  border: 1px solid var(--red-200);

  @media (prefers-color-scheme: dark) {
    background: var(--red-900);
    color: var(--red-300);
    border-color: var(--red-700);
  }
}

.feedback-warning .feedback-content {
  background: var(--yellow-50);
  color: var(--yellow-700);
  border: 1px solid var(--yellow-200);

  @media (prefers-color-scheme: dark) {
    background: var(--yellow-900);
    color: var(--yellow-300);
    border-color: var(--yellow-700);
  }
}

.feedback-success .feedback-content {
  background: var(--green-50);
  color: var(--green-700);
  border: 1px solid var(--green-200);

  @media (prefers-color-scheme: dark) {
    background: var(--green-900);
    color: var(--green-300);
    border-color: var(--green-700);
  }
}

.feedback-info .feedback-content {
  background: var(--blue-50);
  color: var(--blue-700);
  border: 1px solid var(--blue-200);

  @media (prefers-color-scheme: dark) {
    background: var(--blue-900);
    color: var(--blue-300);
    border-color: var(--blue-700);
  }
}

.feedback-icon {
  font-size: 0.875rem;
  flex-shrink: 0;
}

.feedback-text {
  flex: 1;
  line-height: 1.4;
}

/* Field Requirements */
.field-requirements {
  margin-top: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--gray-50);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  animation: requirementsIn 0.3s ease-out;

  @keyframes requirementsIn {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 200px;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.requirements-title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-xs);
  transition: all var(--transition-normal);

  &.met {
    color: var(--green-700);

    .requirement-icon {
      animation: checkmark 0.3s ease-out;
    }

    @media (prefers-color-scheme: dark) {
      color: var(--green-300);
    }
  }

  &.unmet {
    color: var(--text-tertiary);
  }

  @keyframes checkmark {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
}

.requirement-icon {
  font-size: 0.75rem;
  flex-shrink: 0;
}

.requirement-text {
  flex: 1;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--border-secondary);
}

.submit-btn {
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover:not(:disabled) {
    background: var(--primary-700);
  }

  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.form-status {
  font-size: var(--font-size-sm);
  font-weight: 500;

  .status-valid {
    color: var(--green-600);
  }

  .status-invalid {
    color: var(--red-600);
  }
}

/* Features Section */
.features-section {
  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
}

.feature-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  text-align: center;

  .feature-icon {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-2);
  }

  h4 {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-1) 0;
  }

  p {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    margin: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .input-feedback-demo {
    padding: var(--spacing-4);
  }

  .feedback-types-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .form-container {
    padding: var(--spacing-4);
  }

  .form-actions {
    flex-direction: column;
    gap: var(--spacing-3);
    align-items: stretch;
  }

  .submit-btn {
    order: 2;
  }

  .form-status {
    order: 1;
    text-align: center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .feedback-message,
  .field-requirements,
  .requirement-item,
  .requirement-icon {
    animation: none;
    transition: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'custom';
  value?: any;
  message: string;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel';
  value: string;
  placeholder: string;
  rules: ValidationRule[];
  touched: boolean;
  focused: boolean;
}

interface FeedbackMessage {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  icon: string;
}

@Component({
  selector: 'app-input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: ['./input-feedback.component.scss']
})
export class InputFeedbackComponent {
  
  formFields: FormField[] = [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      value: '',
      placeholder: 'Enter your username',
      touched: false,
      focused: false,
      rules: [
        { type: 'required', message: 'Username is required' },
        { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
        { type: 'maxLength', value: 20, message: 'Username cannot exceed 20 characters' },
        { type: 'pattern', value: '^[a-zA-Z0-9_]+$', message: 'Username can only contain letters, numbers, and underscores' }
      ]
    }
    // ... more fields
  ];

  onFieldInput(field: FormField): void {
    if (!field.touched && field.value.length > 0) {
      field.touched = true;
    }
  }

  onFieldFocus(field: FormField): void {
    field.focused = true;
  }

  onFieldBlur(field: FormField): void {
    field.focused = false;
    field.touched = true;
  }

  validateField(field: FormField): FeedbackMessage | null {
    if (!field.touched && !field.focused) {
      return null;
    }

    for (const rule of field.rules) {
      const isValid = this.checkRule(field.value, rule);
      if (!isValid) {
        return {
          type: 'error',
          message: rule.message,
          icon: '❌'
        };
      }
    }

    if (field.touched && field.value) {
      return {
        type: 'success',
        message: 'Looks good!',
        icon: '✅'
      };
    }

    return null;
  }

  private checkRule(value: string, rule: ValidationRule): boolean {
    switch (rule.type) {
      case 'required':
        return value.trim().length > 0;
      case 'minLength':
        return value.length >= rule.value;
      case 'maxLength':
        return value.length <= rule.value;
      case 'pattern':
        const regex = new RegExp(rule.value);
        return regex.test(value);
      case 'email':
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
      default:
        return true;
    }
  }

  getFieldStatus(field: FormField): 'default' | 'error' | 'warning' | 'success' | 'info' {
    const feedback = this.validateField(field);
    return feedback ? feedback.type : 'default';
  }

  isFieldValid(field: FormField): boolean {
    const feedback = this.validateField(field);
    return !feedback || feedback.type !== 'error';
  }

  getFieldProgress(field: FormField): number {
    if (!field.value) return 0;
    
    let validRules = 0;
    for (const rule of field.rules) {
      if (this.checkRule(field.value, rule)) {
        validRules++;
      }
    }
    
    return (validRules / field.rules.length) * 100;
  }
}`;
  }

  // Helper method to check rules (used in template)
  checkRule(value: string, rule: ValidationRule): boolean {
    return this.checkRule(value, rule);
  }
}