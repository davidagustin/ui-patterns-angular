import { Component, ViewChild, ElementRef } from '@angular/core';

interface EditableField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
  isEditing: boolean;
  originalValue: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface UserProfile {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  company: string;
  position: string;
}

@Component({
  selector: 'app-inplace-editor',
  templateUrl: './inplace-editor.component.html',
  styleUrls: ['./inplace-editor.component.scss']
})
export class InplaceEditorComponent {
  @ViewChild('editInput') editInput!: ElementRef;

  userProfile: UserProfile = {
    id: '1',
    avatar: '👤',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Software developer passionate about creating intuitive user experiences. I love working with modern web technologies and building scalable applications.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    company: 'Tech Corp',
    position: 'Senior Developer'
  };

  editableFields: EditableField[] = [
    {
      id: 'name',
      label: 'Full Name',
      value: this.userProfile.name,
      originalValue: this.userProfile.name,
      type: 'text',
      placeholder: 'Enter your full name',
      isEditing: false,
      validation: { required: true, minLength: 2, maxLength: 50 }
    },
    {
      id: 'email',
      label: 'Email Address',
      value: this.userProfile.email,
      originalValue: this.userProfile.email,
      type: 'email',
      placeholder: 'Enter your email',
      isEditing: false,
      validation: { required: true, pattern: '^[^@]+@[^@]+\.[^@]+$' }
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: this.userProfile.phone,
      originalValue: this.userProfile.phone,
      type: 'text',
      placeholder: 'Enter your phone number',
      isEditing: false
    },
    {
      id: 'bio',
      label: 'Bio',
      value: this.userProfile.bio,
      originalValue: this.userProfile.bio,
      type: 'textarea',
      placeholder: 'Tell us about yourself',
      isEditing: false,
      validation: { maxLength: 500 }
    },
    {
      id: 'location',
      label: 'Location',
      value: this.userProfile.location,
      originalValue: this.userProfile.location,
      type: 'text',
      placeholder: 'Enter your location',
      isEditing: false
    },
    {
      id: 'website',
      label: 'Website',
      value: this.userProfile.website,
      originalValue: this.userProfile.website,
      type: 'text',
      placeholder: 'Enter your website URL',
      isEditing: false
    },
    {
      id: 'company',
      label: 'Company',
      value: this.userProfile.company,
      originalValue: this.userProfile.company,
      type: 'text',
      placeholder: 'Enter your company',
      isEditing: false
    },
    {
      id: 'position',
      label: 'Position',
      value: this.userProfile.position,
      originalValue: this.userProfile.position,
      type: 'select',
      options: ['Junior Developer', 'Developer', 'Senior Developer', 'Lead Developer', 'Architect', 'Manager', 'Director'],
      isEditing: false
    }
  ];

  quickEditItems = [
    { label: 'Task Title', value: 'Complete the quarterly report', icon: '📝' },
    { label: 'Due Date', value: '2024-03-15', icon: '📅' },
    { label: 'Priority', value: 'High', icon: '🔥' },
    { label: 'Status', value: 'In Progress', icon: '⏳' }
  ];

  startEdit(field: EditableField): void {
    if (field.isEditing) return;
    
    field.isEditing = true;
    field.originalValue = field.value;
    
    // Focus the input after the view updates
    setTimeout(() => {
      if (this.editInput) {
        this.editInput.nativeElement.focus();
        if (field.type === 'text' || field.type === 'email') {
          this.editInput.nativeElement.select();
        }
      }
    }, 0);
  }

  saveEdit(field: EditableField): void {
    if (!this.validateField(field)) {
      return;
    }

    field.isEditing = false;
    field.originalValue = field.value;
    
    // Update the user profile
    (this.userProfile as any)[field.id] = field.value;
  }

  cancelEdit(field: EditableField): void {
    field.isEditing = false;
    field.value = field.originalValue;
  }

  onKeydown(event: KeyboardEvent, field: EditableField): void {
    switch (event.key) {
      case 'Enter':
        if (field.type !== 'textarea' || event.ctrlKey) {
          event.preventDefault();
          this.saveEdit(field);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.cancelEdit(field);
        break;
    }
  }

  validateField(field: EditableField): boolean {
    if (!field.validation) return true;

    const value = field.value.trim();
    
    if (field.validation.required && !value) {
      return false;
    }
    
    if (field.validation.minLength && value.length < field.validation.minLength) {
      return false;
    }
    
    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      return false;
    }
    
    if (field.validation.pattern) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return false;
      }
    }
    
    return true;
  }

  isFieldValid(field: EditableField): boolean {
    return this.validateField(field);
  }

  getValidationError(field: EditableField): string {
    if (!field.validation) return '';

    const value = field.value.trim();
    
    if (field.validation.required && !value) {
      return 'This field is required';
    }
    
    if (field.validation.minLength && value.length < field.validation.minLength) {
      return `Minimum ${field.validation.minLength} characters required`;
    }
    
    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      return `Maximum ${field.validation.maxLength} characters allowed`;
    }
    
    if (field.validation.pattern && field.id === 'email') {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    return '';
  }

  quickEdit(item: any, newValue: string): void {
    item.value = newValue;
  }

  get exampleCode(): string {
    return `<!-- Basic Inline Edit -->
<div class="editable-field">
  <label>{{ field.label }}</label>
  <div *ngIf="!field.isEditing" 
       class="display-value"
       (click)="startEdit(field)">
    {{ field.value || 'Click to edit' }}
    <span class="edit-icon">✏️</span>
  </div>
  
  <div *ngIf="field.isEditing" class="edit-container">
    <input #editInput
           type="text"
           [(ngModel)]="field.value"
           [placeholder]="field.placeholder"
           (keydown)="onKeydown($event, field)"
           class="edit-input">
    
    <div class="edit-actions">
      <button (click)="saveEdit(field)" class="save-btn">✓</button>
      <button (click)="cancelEdit(field)" class="cancel-btn">✕</button>
    </div>
  </div>
</div>

<!-- Component Logic -->
export class InplaceEditorComponent {
  startEdit(field: any): void {
    field.isEditing = true;
    field.originalValue = field.value;
  }

  saveEdit(field: any): void {
    field.isEditing = false;
    // Save logic here
  }

  cancelEdit(field: any): void {
    field.isEditing = false;
    field.value = field.originalValue;
  }
}`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Inplace Editor" 
  description="Edit content directly within the interface without navigation"
  icon="✏️">
</app-pattern-header>

<div class="inplace-editor-demo">
  <!-- User Profile Card -->
  <div class="profile-card">
    <div class="profile-header">
      <div class="avatar">{{ userProfile.avatar }}</div>
      <div class="profile-info">
        <h2>{{ userProfile.name }}</h2>
        <p>{{ userProfile.position }} at {{ userProfile.company }}</p>
      </div>
    </div>
    
    <div class="profile-fields">
      <div *ngFor="let field of editableFields" class="field-group">
        <label class="field-label">{{ field.label }}</label>
        
        <!-- Display Mode -->
        <div *ngIf="!field.isEditing" 
             class="display-value"
             [class.empty]="!field.value"
             (click)="startEdit(field)">
          <span class="value-text">
            {{ field.value || 'Click to add ' + field.label.toLowerCase() }}
          </span>
          <span class="edit-icon">✏️</span>
        </div>
        
        <!-- Edit Mode -->
        <div *ngIf="field.isEditing" class="edit-container">
          <!-- Text Input -->
          <input *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'number'"
                 #editInput
                 [type]="field.type"
                 [(ngModel)]="field.value"
                 [placeholder]="field.placeholder"
                 (keydown)="onKeydown($event, field)"
                 [class.invalid]="!isFieldValid(field)"
                 class="edit-input">
          
          <!-- Textarea -->
          <textarea *ngIf="field.type === 'textarea'"
                    #editInput
                    [(ngModel)]="field.value"
                    [placeholder]="field.placeholder"
                    (keydown)="onKeydown($event, field)"
                    [class.invalid]="!isFieldValid(field)"
                    class="edit-textarea"
                    rows="3"></textarea>
          
          <!-- Select -->
          <select *ngIf="field.type === 'select'"
                  #editInput
                  [(ngModel)]="field.value"
                  class="edit-select">
            <option *ngFor="let option of field.options" [value]="option">
              {{ option }}
            </option>
          </select>
          
          <!-- Edit Actions -->
          <div class="edit-actions">
            <button (click)="saveEdit(field)" 
                    [disabled]="!isFieldValid(field)"
                    class="save-btn" 
                    title="Save (Enter)">
              ✓
            </button>
            <button (click)="cancelEdit(field)" 
                    class="cancel-btn" 
                    title="Cancel (Esc)">
              ✕
            </button>
          </div>
          
          <!-- Validation Error -->
          <div *ngIf="!isFieldValid(field)" class="validation-error">
            {{ getValidationError(field) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Edit Examples -->
  <div class="quick-edit-section">
    <h3>Quick Edit Examples</h3>
    <div class="quick-edit-grid">
      <div *ngFor="let item of quickEditItems" class="quick-edit-item">
        <div class="item-icon">{{ item.icon }}</div>
        <div class="item-content">
          <label>{{ item.label }}</label>
          <div class="editable-inline"
               contenteditable="true"
               (blur)="quickEdit(item, $event.target.textContent)"
               (keydown.enter)="$event.target.blur()">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Feature Highlights -->
  <div class="features-section">
    <h3>Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <div class="feature-icon">🎯</div>
        <h4>Click to Edit</h4>
        <p>Single click to activate edit mode</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">⌨️</div>
        <h4>Keyboard Shortcuts</h4>
        <p>Enter to save, Escape to cancel</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">✅</div>
        <h4>Validation</h4>
        <p>Real-time validation feedback</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🔄</div>
        <h4>Auto-save</h4>
        <p>Changes saved automatically</p>
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
    return `/* Inplace Editor Styles */
.inplace-editor-demo {
  padding: var(--spacing-6);
}

.profile-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-sm);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-6);
  border-bottom: 1px solid var(--border-primary);

  .avatar {
    width: 4rem;
    height: 4rem;
    background: var(--primary-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;

    @media (prefers-color-scheme: dark) {
      background: var(--primary-800);
    }
  }

  .profile-info {
    h2 {
      font-size: var(--font-size-xl);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-1) 0;
    }

    p {
      color: var(--text-secondary);
      margin: 0;
      font-size: var(--font-size-sm);
    }
  }
}

.profile-fields {
  display: grid;
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
}

/* Display Mode */
.display-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3);
  background: var(--gray-50);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-height: 2.75rem;

  &:hover {
    background: var(--gray-100);
    border-color: var(--primary-300);

    .edit-icon {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  &.empty {
    color: var(--text-tertiary);
    font-style: italic;
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);

    &:hover {
      background: var(--gray-700);
    }
  }
}

.value-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  word-break: break-word;
}

.edit-icon {
  opacity: 0;
  transition: all var(--transition-normal);
  font-size: 0.875rem;
  margin-left: var(--spacing-2);
}

/* Edit Mode */
.edit-container {
  position: relative;
}

.edit-input,
.edit-textarea,
.edit-select {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--primary-300);
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

  &.invalid {
    border-color: var(--red-400);
    background: var(--red-50);

    @media (prefers-color-scheme: dark) {
      background: var(--red-900);
      border-color: var(--red-600);
    }
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

.edit-textarea {
  resize: vertical;
  min-height: 4rem;
  font-family: inherit;
}

.edit-select {
  cursor: pointer;
}

.edit-actions {
  display: flex;
  gap: var(--spacing-2);
  position: absolute;
  top: var(--spacing-1);
  right: var(--spacing-1);
  z-index: 10;
}

.save-btn,
.cancel-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.save-btn {
  background: var(--green-500);
  color: white;

  &:hover:not(:disabled) {
    background: var(--green-600);
    transform: scale(1.05);
  }

  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
  }
}

.cancel-btn {
  background: var(--red-500);
  color: white;

  &:hover {
    background: var(--red-600);
    transform: scale(1.05);
  }
}

.validation-error {
  color: var(--red-600);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-1);
  padding-left: var(--spacing-3);
}

/* Quick Edit Section */
.quick-edit-section {
  margin-bottom: var(--spacing-8);

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }
}

.quick-edit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
}

.quick-edit-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);

  .item-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .item-content {
    flex: 1;
    min-width: 0;

    label {
      display: block;
      font-size: var(--font-size-xs);
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-1);
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }
  }
}

.editable-inline {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: var(--spacing-1);
  cursor: pointer;
  transition: all var(--transition-normal);
  word-break: break-word;

  &:hover {
    background: var(--gray-50);
    border-color: var(--gray-200);
  }

  &:focus {
    outline: none;
    background: var(--bg-primary);
    border-color: var(--primary-400);
    box-shadow: var(--focus-ring);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-800);
      border-color: var(--gray-600);
    }

    &:focus {
      background: var(--gray-900);
    }
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
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .feature-icon {
    font-size: 2rem;
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
  .inplace-editor-demo {
    padding: var(--spacing-4);
  }

  .profile-card {
    padding: var(--spacing-4);
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-3);

    .profile-info {
      h2 {
        font-size: var(--font-size-lg);
      }
    }
  }

  .edit-actions {
    position: static;
    margin-top: var(--spacing-2);
    justify-content: flex-end;
  }

  .quick-edit-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .quick-edit-item {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-2);
  }
}

/* Touch Support */
@media (hover: none) {
  .edit-icon {
    opacity: 1;
  }

  .display-value:hover .edit-icon {
    transform: none;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .display-value,
  .edit-icon,
  .save-btn,
  .cancel-btn,
  .feature-item {
    transition: none;
  }

  .save-btn:hover,
  .cancel-btn:hover {
    transform: none;
  }

  .feature-item:hover {
    transform: none;
  }
}

/* Focus Management */
.display-value:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}`;
  }

  get typescriptCode(): string {
    return `import { Component, ViewChild, ElementRef } from '@angular/core';

interface EditableField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
  isEditing: boolean;
  originalValue: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

@Component({
  selector: 'app-inplace-editor',
  templateUrl: './inplace-editor.component.html',
  styleUrls: ['./inplace-editor.component.scss']
})
export class InplaceEditorComponent {
  @ViewChild('editInput') editInput!: ElementRef;

  editableFields: EditableField[] = [
    {
      id: 'name',
      label: 'Full Name',
      value: 'John Doe',
      originalValue: 'John Doe',
      type: 'text',
      placeholder: 'Enter your full name',
      isEditing: false,
      validation: { required: true, minLength: 2, maxLength: 50 }
    }
    // ... more fields
  ];

  startEdit(field: EditableField): void {
    if (field.isEditing) return;
    
    field.isEditing = true;
    field.originalValue = field.value;
    
    setTimeout(() => {
      if (this.editInput) {
        this.editInput.nativeElement.focus();
        if (field.type === 'text' || field.type === 'email') {
          this.editInput.nativeElement.select();
        }
      }
    }, 0);
  }

  saveEdit(field: EditableField): void {
    if (!this.validateField(field)) {
      return;
    }

    field.isEditing = false;
    field.originalValue = field.value;
  }

  cancelEdit(field: EditableField): void {
    field.isEditing = false;
    field.value = field.originalValue;
  }

  onKeydown(event: KeyboardEvent, field: EditableField): void {
    switch (event.key) {
      case 'Enter':
        if (field.type !== 'textarea' || event.ctrlKey) {
          event.preventDefault();
          this.saveEdit(field);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.cancelEdit(field);
        break;
    }
  }

  validateField(field: EditableField): boolean {
    if (!field.validation) return true;

    const value = field.value.trim();
    
    if (field.validation.required && !value) {
      return false;
    }
    
    if (field.validation.minLength && value.length < field.validation.minLength) {
      return false;
    }
    
    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      return false;
    }
    
    if (field.validation.pattern) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return false;
      }
    }
    
    return true;
  }
}`;
  }
}