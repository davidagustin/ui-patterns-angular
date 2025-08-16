import { Component } from '@angular/core';

interface RadioOption {
  id: string;
  label: string;
  value: string;
  description?: string;
}

interface CheckboxOption {
  id: string;
  label: string;
  value: boolean;
  description?: string;
}

interface FormSection {
  id: string;
  title: string;
  type: 'radio' | 'checkbox';
  options: RadioOption[] | CheckboxOption[];
  selectedValue?: string;
  required?: boolean;
}

@Component({
  selector: 'app-radio-checkbox',
  templateUrl: './radio-checkbox.component.html',
  styleUrls: ['./radio-checkbox.component.scss']
})
export class RadioCheckboxComponent {
  selectedTheme = 'auto';
  selectedPlan = 'pro';
  features: CheckboxOption[] = [
    { id: 'notifications', label: 'Email Notifications', value: true, description: 'Receive updates via email' },
    { id: 'analytics', label: 'Analytics Tracking', value: false, description: 'Help improve our service' },
    { id: 'marketing', label: 'Marketing Communications', value: false, description: 'Promotional emails and offers' },
    { id: 'newsletter', label: 'Weekly Newsletter', value: true, description: 'Latest news and updates' }
  ];

  preferences: CheckboxOption[] = [
    { id: 'darkMode', label: 'Dark Mode', value: false },
    { id: 'compactView', label: 'Compact View', value: true },
    { id: 'autoSave', label: 'Auto-save', value: true },
    { id: 'showTips', label: 'Show Tips', value: false }
  ];

  formSections: FormSection[] = [
    {
      id: 'theme',
      title: 'Theme Preference',
      type: 'radio',
      selectedValue: 'auto',
      required: true,
      options: [
        { id: 'light', label: 'Light Theme', value: 'light', description: 'Clean, bright interface' },
        { id: 'dark', label: 'Dark Theme', value: 'dark', description: 'Easy on the eyes' },
        { id: 'auto', label: 'Auto Theme', value: 'auto', description: 'Follows system preference' }
      ]
    },
    {
      id: 'plan',
      title: 'Subscription Plan',
      type: 'radio',
      selectedValue: 'pro',
      required: true,
      options: [
        { id: 'free', label: 'Free Plan', value: 'free', description: 'Basic features included' },
        { id: 'pro', label: 'Pro Plan', value: 'pro', description: 'Advanced features and priority support' },
        { id: 'enterprise', label: 'Enterprise Plan', value: 'enterprise', description: 'Full feature set with custom integration' }
      ]
    }
  ];

  surveyAnswers = {
    experience: '',
    platforms: [] as string[],
    frequency: '',
    satisfaction: ''
  };

  experienceOptions: RadioOption[] = [
    { id: 'beginner', label: 'Beginner', value: 'beginner', description: 'Just getting started' },
    { id: 'intermediate', label: 'Intermediate', value: 'intermediate', description: 'Some experience' },
    { id: 'advanced', label: 'Advanced', value: 'advanced', description: 'Highly experienced' },
    { id: 'expert', label: 'Expert', value: 'expert', description: 'Professional level' }
  ];

  platformOptions: CheckboxOption[] = [
    { id: 'web', label: 'Web', value: false },
    { id: 'mobile', label: 'Mobile', value: false },
    { id: 'desktop', label: 'Desktop', value: false },
    { id: 'tablet', label: 'Tablet', value: false }
  ];

  onRadioChange(sectionId: string, value: string): void {
    const section = this.formSections.find(s => s.id === sectionId);
    if (section) {
      section.selectedValue = value;
    }
  }

  onCheckboxChange(option: CheckboxOption): void {
    option.value = !option.value;
  }

  onSurveyRadioChange(field: string, value: string): void {
    (this.surveyAnswers as any)[field] = value;
  }

  onSurveyCheckboxChange(platform: string): void {
    const index = this.surveyAnswers.platforms.indexOf(platform);
    if (index > -1) {
      this.surveyAnswers.platforms.splice(index, 1);
    } else {
      this.surveyAnswers.platforms.push(platform);
    }
  }

  isPlatformSelected(platform: string): boolean {
    return this.surveyAnswers.platforms.includes(platform);
  }

  getSelectedFeatures(): string[] {
    return this.features.filter(f => f.value).map(f => f.label);
  }

  getSelectedPreferences(): string[] {
    return this.preferences.filter(p => p.value).map(p => p.label);
  }

  get exampleCode(): string {
    return `<!-- Basic Radio Button Example -->
<div class="radio-group">
  <label class="radio-option">
    <input type="radio" name="theme" value="light" [(ngModel)]="selectedTheme">
    <span class="radio-custom"></span>
    <span class="radio-label">Light Theme</span>
  </label>
  <label class="radio-option">
    <input type="radio" name="theme" value="dark" [(ngModel)]="selectedTheme">
    <span class="radio-custom"></span>
    <span class="radio-label">Dark Theme</span>
  </label>
</div>

<!-- Basic Checkbox Example -->
<div class="checkbox-group">
  <label class="checkbox-option">
    <input type="checkbox" [(ngModel)]="notifications">
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">Email Notifications</span>
  </label>
  <label class="checkbox-option">
    <input type="checkbox" [(ngModel)]="analytics">
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">Analytics Tracking</span>
  </label>
</div>

<!-- Component TypeScript -->
export class RadioCheckboxComponent {
  selectedTheme = 'light';
  notifications = true;
  analytics = false;
  
  onThemeChange(theme: string) {
    this.selectedTheme = theme;
  }
  
  onNotificationToggle() {
    this.notifications = !this.notifications;
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="radio-checkbox-pattern-container">
  <app-pattern-header
    title="Radio & Checkbox Pattern"
    description="Provide clear selection controls for single-choice (radio) and multi-choice (checkbox) scenarios with enhanced styling and functionality."
    icon="☑️">
  </app-pattern-header>

  <div class="pattern-layout">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Explore different radio button and checkbox implementations with various styles and configurations.
        </p>
        
        <!-- Radio Button Examples -->
        <div class="demo-section">
          <h3 class="demo-title">📻 Radio Button Groups</h3>
          
          <div *ngFor="let section of formSections" class="form-section">
            <h4 class="section-title">
              {{ section.title }}
              <span class="required-indicator" *ngIf="section.required">*</span>
            </h4>
            
            <div class="radio-group">
              <label 
                *ngFor="let option of section.options" 
                class="radio-option"
                [class.selected]="section.selectedValue === option.value">
                <input 
                  type="radio" 
                  [name]="section.id"
                  [value]="option.value"
                  [checked]="section.selectedValue === option.value"
                  (change)="onRadioChange(section.id, option.value)"
                  class="radio-input">
                <span class="radio-custom"></span>
                <div class="radio-content">
                  <span class="radio-label">{{ option.label }}</span>
                  <span class="radio-description" *ngIf="option.description">{{ option.description }}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Checkbox Examples -->
        <div class="demo-section">
          <h3 class="demo-title">☑️ Checkbox Groups</h3>
          
          <div class="form-section">
            <h4 class="section-title">Feature Preferences</h4>
            <div class="checkbox-group">
              <label 
                *ngFor="let feature of features" 
                class="checkbox-option"
                [class.checked]="feature.value">
                <input 
                  type="checkbox" 
                  [checked]="feature.value"
                  (change)="onCheckboxChange(feature)"
                  class="checkbox-input">
                <span class="checkbox-custom">
                  <svg class="check-icon" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </span>
                <div class="checkbox-content">
                  <span class="checkbox-label">{{ feature.label }}</span>
                  <span class="checkbox-description" *ngIf="feature.description">{{ feature.description }}</span>
                </div>
              </label>
            </div>
          </div>
          
          <div class="form-section">
            <h4 class="section-title">User Preferences</h4>
            <div class="checkbox-grid">
              <label 
                *ngFor="let pref of preferences" 
                class="checkbox-card"
                [class.checked]="pref.value">
                <input 
                  type="checkbox" 
                  [checked]="pref.value"
                  (change)="onCheckboxChange(pref)"
                  class="checkbox-input">
                <span class="checkbox-custom-card">
                  <svg class="check-icon" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </span>
                <span class="checkbox-label">{{ pref.label }}</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Survey Example -->
        <div class="demo-section">
          <h3 class="demo-title">📋 Survey Form</h3>
          
          <div class="survey-form">
            <div class="form-section">
              <h4 class="section-title">Experience Level</h4>
              <div class="radio-group horizontal">
                <label 
                  *ngFor="let exp of experienceOptions" 
                  class="radio-pill"
                  [class.selected]="surveyAnswers.experience === exp.value">
                  <input 
                    type="radio" 
                    name="experience"
                    [value]="exp.value"
                    [checked]="surveyAnswers.experience === exp.value"
                    (change)="onSurveyRadioChange('experience', exp.value)"
                    class="radio-input">
                  <span class="pill-content">
                    <span class="pill-label">{{ exp.label }}</span>
                    <span class="pill-description">{{ exp.description }}</span>
                  </span>
                </label>
              </div>
            </div>
            
            <div class="form-section">
              <h4 class="section-title">Platforms Used (Select all that apply)</h4>
              <div class="checkbox-tags">
                <label 
                  *ngFor="let platform of platformOptions" 
                  class="checkbox-tag"
                  [class.checked]="isPlatformSelected(platform.value)">
                  <input 
                    type="checkbox" 
                    [checked]="isPlatformSelected(platform.value)"
                    (change)="onSurveyCheckboxChange(platform.value)"
                    class="checkbox-input">
                  <span class="tag-content">{{ platform.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Summary -->
        <div class="demo-section">
          <h3 class="demo-title">📊 Selection Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <h5>Selected Features</h5>
              <div class="summary-tags">
                <span *ngFor="let feature of getSelectedFeatures()" class="summary-tag">{{ feature }}</span>
              </div>
            </div>
            <div class="summary-item">
              <h5>Selected Preferences</h5>
              <div class="summary-tags">
                <span *ngFor="let pref of getSelectedPreferences()" class="summary-tag">{{ pref }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="code-section">
      <app-code-tabs 
        [exampleCode]="exampleCode"
        [htmlCode]="htmlCode" 
        [scssCode]="scssCode" 
        [typescriptCode]="typescriptCode"
        title="Code Example">
      </app-code-tabs>
    </div>
  </div>

  <!-- Key Features -->
  <div class="features-section">
    <h3 class="features-title">✨ Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Custom Styling</h4>
          <p class="feature-description">Beautiful, accessible radio buttons and checkboxes</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Multiple Layouts</h4>
          <p class="feature-description">Cards, pills, tags, and traditional layouts</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Descriptive Options</h4>
          <p class="feature-description">Add descriptions and context to choices</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Keyboard Navigation</h4>
          <p class="feature-description">Full keyboard support and screen reader friendly</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Use Cases -->
  <div class="use-cases-section">
    <h3 class="use-cases-title">🎯 Common Use Cases</h3>
    <div class="use-cases-grid">
      <div class="use-case-item">
        <div class="use-case-icon">⚙️</div>
        <h4 class="use-case-name">Settings & Preferences</h4>
        <p class="use-case-description">User configuration and preference panels</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">📋</div>
        <h4 class="use-case-name">Forms & Surveys</h4>
        <p class="use-case-description">Data collection and user input forms</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">🛒</div>
        <h4 class="use-case-name">Product Options</h4>
        <p class="use-case-description">E-commerce product variants and features</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Radio & Checkbox Pattern Styles */
.radio-checkbox-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

.pattern-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-8);
}

.example-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.example-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: var(--text-primary);
}

.example-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-6);
}

.demo-section {
  margin-bottom: var(--spacing-8);

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-4);
  color: var(--text-primary);
  border-bottom: 2px solid var(--primary-200);
  padding-bottom: var(--spacing-2);
}

.form-section {
  margin-bottom: var(--spacing-6);
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-3);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.required-indicator {
  color: var(--red-500);
  font-size: var(--font-size-sm);
}

/* Radio Button Styles */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);

  &.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }
}

.radio-option {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--bg-primary);

  &:hover {
    border-color: var(--primary-500);
    box-shadow: var(--shadow-sm);
  }

  &.selected {
    border-color: var(--primary-500);
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-primary);
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  transition: all var(--transition-normal);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--primary-500);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform var(--transition-normal);
  }

  .radio-option.selected & {
    border-color: var(--primary-500);

    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

.radio-content {
  flex: 1;
  min-width: 0;
}

.radio-label {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
  display: block;
  margin-bottom: var(--spacing-1);
}

.radio-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Radio Pills */
.radio-pill {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--bg-primary);

  &:hover {
    border-color: var(--primary-500);
  }

  &.selected {
    background: var(--primary-500);
    border-color: var(--primary-500);
    color: white;

    .pill-label,
    .pill-description {
      color: white;
    }
  }
}

.pill-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pill-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.pill-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-top: var(--spacing-0-5);
}

/* Checkbox Styles */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.checkbox-option {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }

  &.checked {
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-sm);
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);

  .checkbox-option.checked & {
    background: var(--primary-500);
    border-color: var(--primary-500);
  }
}

.check-icon {
  width: 0.75rem;
  height: 0.75rem;
  fill: white;
  opacity: 0;
  transform: scale(0.8);
  transition: all var(--transition-normal);

  .checkbox-option.checked & {
    opacity: 1;
    transform: scale(1);
  }
}

.checkbox-content {
  flex: 1;
  min-width: 0;
}

.checkbox-label {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
  display: block;
  margin-bottom: var(--spacing-1);
}

.checkbox-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Checkbox Grid */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-3);
}

.checkbox-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--bg-primary);
  text-align: center;

  &:hover {
    border-color: var(--primary-500);
    box-shadow: var(--shadow-sm);
  }

  &.checked {
    border-color: var(--primary-500);
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }
}

.checkbox-custom-card {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-2);
  transition: all var(--transition-normal);

  .checkbox-card.checked & {
    background: var(--primary-500);
    border-color: var(--primary-500);
  }
}

/* Checkbox Tags */
.checkbox-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.checkbox-tag {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--bg-primary);

  &:hover {
    border-color: var(--primary-500);
  }

  &.checked {
    background: var(--primary-500);
    border-color: var(--primary-500);
    color: white;

    .tag-content {
      color: white;
    }
  }
}

.tag-content {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

/* Summary */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-4);
}

.summary-item {
  padding: var(--spacing-4);
  background: var(--gray-50);
  border-radius: var(--radius-lg);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }

  h5 {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-2) 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.summary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
}

.summary-tag {
  padding: var(--spacing-1) var(--spacing-2);
  background: var(--primary-100);
  color: var(--primary-700);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    background: var(--primary-800);
    color: var(--primary-300);
  }
}

/* Features and Use Cases */
.features-section,
.use-cases-section {
  margin-bottom: var(--spacing-8);
}

.features-title,
.use-cases-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-6);
  text-align: center;
  color: var(--text-primary);
}

.features-grid,
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
}

.feature-item,
.use-case-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.feature-icon,
.use-case-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  background: var(--primary-100);
  color: var(--primary-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-sm);

  @media (prefers-color-scheme: dark) {
    background: var(--primary-900);
    color: var(--primary-300);
  }
}

.feature-content {
  flex: 1;
}

.feature-name,
.use-case-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-primary);
}

.feature-description,
.use-case-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .radio-checkbox-pattern-container {
    padding: var(--spacing-4);
  }

  .radio-group.horizontal {
    flex-direction: column;
  }

  .checkbox-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .features-grid,
  .use-cases-grid {
    grid-template-columns: 1fr;
  }
}

/* Focus states for accessibility */
.radio-option:focus-within,
.checkbox-option:focus-within,
.checkbox-card:focus-within,
.radio-pill:focus-within,
.checkbox-tag:focus-within {
  outline: none;
  box-shadow: var(--focus-ring);
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface RadioOption {
  id: string;
  label: string;
  value: string;
  description?: string;
}

interface CheckboxOption {
  id: string;
  label: string;
  value: boolean;
  description?: string;
}

@Component({
  selector: 'app-radio-checkbox',
  templateUrl: './radio-checkbox.component.html',
  styleUrls: ['./radio-checkbox.component.scss']
})
export class RadioCheckboxComponent {
  selectedTheme = 'auto';
  
  features: CheckboxOption[] = [
    { id: 'notifications', label: 'Email Notifications', value: true, description: 'Receive updates via email' },
    { id: 'analytics', label: 'Analytics Tracking', value: false, description: 'Help improve our service' },
    { id: 'marketing', label: 'Marketing Communications', value: false, description: 'Promotional emails and offers' }
  ];

  themeOptions: RadioOption[] = [
    { id: 'light', label: 'Light Theme', value: 'light', description: 'Clean, bright interface' },
    { id: 'dark', label: 'Dark Theme', value: 'dark', description: 'Easy on the eyes' },
    { id: 'auto', label: 'Auto Theme', value: 'auto', description: 'Follows system preference' }
  ];

  onRadioChange(value: string): void {
    this.selectedTheme = value;
  }

  onCheckboxChange(option: CheckboxOption): void {
    option.value = !option.value;
  }

  getSelectedFeatures(): string[] {
    return this.features.filter(f => f.value).map(f => f.label);
  }
}`;
  }
}