import { Component } from '@angular/core';

interface DisclosureSection {
  id: string;
  title: string;
  summary: string;
  content: string;
  expanded: boolean;
  level: number;
  icon?: string;
}

interface FormStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
  fields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'checkbox';
  value: any;
  required: boolean;
  options?: string[];
}

@Component({
  selector: 'app-progressive-disclosure',
  templateUrl: './progressive-disclosure.component.html',
  styleUrls: ['./progressive-disclosure.component.scss']
})
export class ProgressiveDisclosureComponent {
  currentExample = 'content';
  
  // Content Disclosure Example
  contentSections: DisclosureSection[] = [
    {
      id: 'overview',
      title: 'Project Overview',
      summary: 'High-level project description and goals',
      content: 'This comprehensive project aims to revolutionize how users interact with complex data through intuitive progressive disclosure patterns. We focus on presenting information in digestible chunks that prevent cognitive overload while maintaining access to detailed information when needed.',
      expanded: false,
      level: 1,
      icon: '=À'
    },
    {
      id: 'requirements',
      title: 'Technical Requirements',
      summary: 'System specifications and technical constraints',
      content: 'Our technical stack includes Angular 15+, TypeScript 4.9+, and SCSS for styling. The system must support responsive design across devices, maintain accessibility standards (WCAG 2.1 AA), and provide smooth animations for progressive disclosure interactions.',
      expanded: false,
      level: 1,
      icon: 'ô'
    },
    {
      id: 'architecture',
      title: 'System Architecture',
      summary: 'Component structure and data flow patterns',
      content: 'The architecture follows a modular component-based approach with clear separation of concerns. Each disclosure component manages its own state while providing events for parent coordination. We implement lazy loading for content that might not be viewed.',
      expanded: false,
      level: 2,
      icon: '<◊'
    },
    {
      id: 'implementation',
      title: 'Implementation Details',
      summary: 'Code examples and best practices',
      content: 'Implementation focuses on performance and accessibility. We use CSS transitions for smooth animations, ARIA attributes for screen readers, and keyboard navigation support. Content is loaded progressively to improve initial page load times.',
      expanded: false,
      level: 2,
      icon: '=ª'
    }
  ];

  // Form Steps Example
  currentStepIndex = 0;
  formSteps: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      completed: false,
      current: true,
      fields: [
        { id: 'firstName', label: 'First Name', type: 'text', value: '', required: true },
        { id: 'lastName', label: 'Last Name', type: 'text', value: '', required: true },
        { id: 'email', label: 'Email', type: 'email', value: '', required: true }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      completed: false,
      current: false,
      fields: [
        { id: 'theme', label: 'Theme', type: 'select', value: '', required: false, options: ['Light', 'Dark', 'Auto'] },
        { id: 'notifications', label: 'Enable Notifications', type: 'checkbox', value: false, required: false }
      ]
    },
    {
      id: 'review',
      title: 'Review & Submit',
      completed: false,
      current: false,
      fields: []
    }
  ];

  // Settings Example
  showAdvancedSettings = false;
  showExpertOptions = false;
  
  basicSettings = {
    theme: 'auto',
    language: 'en',
    notifications: true
  };

  advancedSettings = {
    cacheSize: 100,
    autoSave: true,
    debugMode: false
  };

  expertSettings = {
    apiTimeout: 30000,
    retryAttempts: 3,
    compressionLevel: 'medium'
  };

  toggleSection(section: DisclosureSection): void {
    section.expanded = !section.expanded;
  }

  toggleAllSections(expand: boolean): void {
    this.contentSections.forEach(section => {
      section.expanded = expand;
    });
  }

  // Form Navigation
  nextStep(): void {
    if (this.currentStepIndex < this.formSteps.length - 1) {
      this.formSteps[this.currentStepIndex].completed = true;
      this.formSteps[this.currentStepIndex].current = false;
      this.currentStepIndex++;
      this.formSteps[this.currentStepIndex].current = true;
    }
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.formSteps[this.currentStepIndex].current = false;
      this.currentStepIndex--;
      this.formSteps[this.currentStepIndex].current = true;
      this.formSteps[this.currentStepIndex].completed = false;
    }
  }

  goToStep(index: number): void {
    this.formSteps[this.currentStepIndex].current = false;
    this.currentStepIndex = index;
    this.formSteps[this.currentStepIndex].current = true;
  }

  get currentStep(): FormStep {
    return this.formSteps[this.currentStepIndex];
  }

  get allFieldsValid(): boolean {
    return this.currentStep.fields
      .filter(field => field.required)
      .every(field => field.value && field.value.toString().trim() !== '');
  }

  // Settings toggles
  toggleAdvancedSettings(): void {
    this.showAdvancedSettings = !this.showAdvancedSettings;
    if (!this.showAdvancedSettings) {
      this.showExpertOptions = false;
    }
  }

  toggleExpertOptions(): void {
    this.showExpertOptions = !this.showExpertOptions;
  }

  setExample(example: string): void {
    this.currentExample = example;
  }

  get htmlCode(): string {
    return `<!-- Progressive Disclosure Examples -->
<div class="progressive-disclosure-container">
  <!-- Example Navigation -->
  <div class="example-navigation">
    <button 
      *ngFor="let example of examples"
      (click)="setExample(example.id)"
      class="nav-button"
      [class.active]="currentExample === example.id">
      {{ example.label }}
    </button>
  </div>

  <!-- Content Disclosure Example -->
  <div *ngIf="currentExample === 'content'" class="content-disclosure">
    <div class="disclosure-controls">
      <button (click)="toggleAllSections(true)" class="control-button">
        =÷ Expand All
      </button>
      <button (click)="toggleAllSections(false)" class="control-button">
        =’ Collapse All
      </button>
    </div>

    <div class="disclosure-sections">
      <div 
        *ngFor="let section of contentSections" 
        class="disclosure-section"
        [class.expanded]="section.expanded"
        [class.level-2]="section.level === 2">
        
        <button 
          (click)="toggleSection(section)"
          class="section-header"
          [attr.aria-expanded]="section.expanded">
          <span class="section-icon">{{ section.icon }}</span>
          <div class="section-content">
            <h3 class="section-title">{{ section.title }}</h3>
            <p class="section-summary">{{ section.summary }}</p>
          </div>
          <span class="expand-icon">{{ section.expanded ? 'º' : '∂' }}</span>
        </button>
        
        <div class="section-details" *ngIf="section.expanded">
          <p>{{ section.content }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Multi-Step Form Example -->
  <div *ngIf="currentExample === 'form'" class="form-disclosure">
    <div class="step-indicator">
      <div 
        *ngFor="let step of formSteps; let i = index"
        class="step-item"
        [class.completed]="step.completed"
        [class.current]="step.current"
        (click)="goToStep(i)">
        <div class="step-number">{{ i + 1 }}</div>
        <div class="step-title">{{ step.title }}</div>
      </div>
    </div>

    <div class="step-content">
      <h3>{{ currentStep.title }}</h3>
      
      <div class="form-fields" *ngIf="currentStep.fields.length > 0">
        <div *ngFor="let field of currentStep.fields" class="form-field">
          <label [for]="field.id">{{ field.label }}</label>
          
          <input 
            *ngIf="field.type === 'text' || field.type === 'email'"
            [id]="field.id"
            [type]="field.type"
            [(ngModel)]="field.value"
            [required]="field.required"
            class="form-input">
          
          <select 
            *ngIf="field.type === 'select'"
            [id]="field.id"
            [(ngModel)]="field.value"
            class="form-select">
            <option value="">Select...</option>
            <option *ngFor="let option of field.options" [value]="option">
              {{ option }}
            </option>
          </select>
          
          <label *ngIf="field.type === 'checkbox'" class="checkbox-label">
            <input 
              [id]="field.id"
              type="checkbox"
              [(ngModel)]="field.value">
            <span>{{ field.label }}</span>
          </label>
        </div>
      </div>
      
      <div *ngIf="currentStep.id === 'review'" class="review-section">
        <h4>Review Your Information</h4>
        <div class="review-item" *ngFor="let step of formSteps">
          <h5>{{ step.title }}</h5>
          <div *ngFor="let field of step.fields">
            <strong>{{ field.label }}:</strong> {{ field.value || 'Not provided' }}
          </div>
        </div>
      </div>

      <div class="step-navigation">
        <button 
          *ngIf="currentStepIndex > 0"
          (click)="previousStep()"
          class="nav-button secondary">
          ê Previous
        </button>
        
        <button 
          *ngIf="currentStepIndex < formSteps.length - 1"
          (click)="nextStep()"
          [disabled]="!allFieldsValid"
          class="nav-button primary">
          Next í
        </button>
        
        <button 
          *ngIf="currentStepIndex === formSteps.length - 1"
          class="nav-button primary">
          Submit
        </button>
      </div>
    </div>
  </div>

  <!-- Settings Example -->
  <div *ngIf="currentExample === 'settings'" class="settings-disclosure">
    <div class="settings-section">
      <h3>Basic Settings</h3>
      <div class="setting-item">
        <label>Theme</label>
        <select [(ngModel)]="basicSettings.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
    </div>

    <button 
      (click)="toggleAdvancedSettings()"
      class="disclosure-toggle"
      [class.expanded]="showAdvancedSettings">
      ô Advanced Settings
      <span class="toggle-icon">{{ showAdvancedSettings ? 'º' : '∂' }}</span>
    </button>

    <div *ngIf="showAdvancedSettings" class="advanced-settings">
      <div class="setting-item">
        <label>Cache Size (MB)</label>
        <input type="number" [(ngModel)]="advancedSettings.cacheSize">
      </div>

      <button 
        (click)="toggleExpertOptions()"
        class="disclosure-toggle sub-toggle"
        [class.expanded]="showExpertOptions">
        =' Expert Options
        <span class="toggle-icon">{{ showExpertOptions ? 'º' : '∂' }}</span>
      </button>

      <div *ngIf="showExpertOptions" class="expert-settings">
        <div class="setting-item">
          <label>API Timeout (ms)</label>
          <input type="number" [(ngModel)]="expertSettings.apiTimeout">
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Progressive Disclosure Container */
.progressive-disclosure-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Example Navigation */
.example-navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
}

/* Content Disclosure */
.disclosure-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.control-button {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }
}

.disclosure-sections {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.disclosure-section {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease;

  &.level-2 {
    margin-left: 1.5rem;
    border-color: #d1d5db;
  }

  &.expanded {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f9fafb;
  }
}

.section-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.section-content {
  flex: 1;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.section-summary {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.expand-icon {
  color: #6b7280;
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}

.section-details {
  padding: 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  animation: slideDown 0.2s ease;

  p {
    margin: 0;
    line-height: 1.6;
    color: #374151;
  }
}

/* Multi-Step Form */
.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    height: 2px;
    background: #e5e7eb;
    z-index: 1;
  }
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;

  &.completed .step-number {
    background: #10b981;
    color: white;
  }

  &.current .step-number {
    background: #3b82f6;
    color: white;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }
}

.step-number {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.2s ease;
}

.step-title {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  color: #374151;
}

/* Form Fields */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0 2rem 0;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

/* Settings Disclosure */
.settings-section {
  margin-bottom: 1.5rem;
}

.disclosure-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;

  &:hover {
    background: #e5e7eb;
  }

  &.sub-toggle {
    margin-left: 1rem;
    background: #e5e7eb;
  }
}

.advanced-settings,
.expert-settings {
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  animation: slideDown 0.2s ease;
}

.expert-settings {
  margin-left: 1rem;
  background: #f3f4f6;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;

  label {
    font-weight: 500;
    color: #374151;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-indicator {
    flex-direction: column;
    gap: 1rem;
    
    &::before {
      display: none;
    }
  }

  .step-item {
    flex-direction: row;
    justify-content: flex-start;
  }

  .step-title {
    margin-top: 0;
    margin-left: 1rem;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface DisclosureSection {
  id: string;
  title: string;
  summary: string;
  content: string;
  expanded: boolean;
  level: number;
  icon?: string;
}

@Component({
  selector: 'app-progressive-disclosure',
  templateUrl: './progressive-disclosure.component.html',
  styleUrls: ['./progressive-disclosure.component.scss']
})
export class ProgressiveDisclosureComponent {
  currentExample = 'content';
  
  contentSections: DisclosureSection[] = [
    {
      id: 'overview',
      title: 'Project Overview',
      summary: 'High-level project description and goals',
      content: 'Detailed content about the project overview...',
      expanded: false,
      level: 1,
      icon: '=À'
    }
    // ... more sections
  ];

  toggleSection(section: DisclosureSection): void {
    section.expanded = !section.expanded;
  }

  toggleAllSections(expand: boolean): void {
    this.contentSections.forEach(section => {
      section.expanded = expand;
    });
  }

  setExample(example: string): void {
    this.currentExample = example;
  }
}`;
  }
}