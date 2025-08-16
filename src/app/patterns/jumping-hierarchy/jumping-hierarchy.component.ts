import { Component } from '@angular/core';

interface HierarchyLevel {
  level: number;
  label: string;
  path: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-jumping-hierarchy',
  templateUrl: './jumping-hierarchy.component.html',
  styleUrls: ['./jumping-hierarchy.component.scss']
})
export class JumpingHierarchyComponent {
  selectedLevel = 3;

  hierarchyLevels: HierarchyLevel[] = [
    { level: 1, label: 'Root', path: 'Home', icon: '🏠', color: 'blue' },
    { level: 2, label: 'Category', path: 'Home > Products', icon: '📦', color: 'green' },
    { level: 3, label: 'Subcategory', path: 'Home > Products > Electronics', icon: '💻', color: 'purple' },
    { level: 4, label: 'Product Type', path: 'Home > Products > Electronics > Laptops', icon: '💻', color: 'orange' },
    { level: 5, label: 'Product', path: 'Home > Products > Electronics > Laptops > MacBook Pro', icon: '🍎', color: 'red' },
  ];

  organizationLevels: HierarchyLevel[] = [
    { level: 1, label: 'Company', path: 'Acme Corp', icon: '🏢', color: 'blue' },
    { level: 2, label: 'Department', path: 'Acme Corp > Engineering', icon: '⚙️', color: 'green' },
    { level: 3, label: 'Team', path: 'Acme Corp > Engineering > Frontend', icon: '👥', color: 'purple' },
    { level: 4, label: 'Project', path: 'Acme Corp > Engineering > Frontend > UI Components', icon: '🎨', color: 'orange' },
    { level: 5, label: 'Task', path: 'Acme Corp > Engineering > Frontend > UI Components > Button Design', icon: '✅', color: 'red' },
  ];

  jumpToLevel(level: number): void {
    this.selectedLevel = level;
    console.log(`Jumping to level ${level}: ${this.hierarchyLevels[level - 1].label}`);
  }

  onDropdownChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.jumpToLevel(Number(target.value));
  }

  getCurrentLevel(levels: HierarchyLevel[]): HierarchyLevel {
    return levels[this.selectedLevel - 1];
  }

  get exampleCode(): string {
    return `<!-- Simple Jumping Hierarchy Example -->
<div class="simple-hierarchy">
  <div class="hierarchy-levels">
    <button 
      *ngFor="let level of hierarchyLevels" 
      (click)="jumpToLevel(level.level)"
      class="hierarchy-level"
      [class.level-active]="selectedLevel === level.level">
      <span class="level-icon">{{level.icon}}</span>
      <span class="level-label">{{level.label}}</span>
      <span class="level-badge">Level {{level.level}}</span>
    </button>
  </div>

  <div class="quick-jump-bar">
    <span class="jump-label">Quick Jump:</span>
    <button 
      *ngFor="let level of hierarchyLevels"
      (click)="jumpToLevel(level.level)"
      class="quick-jump-btn"
      [class.jump-active]="selectedLevel === level.level">
      {{level.label}}
    </button>
  </div>

  <div class="current-level">
    <div class="level-info">
      <span class="current-icon">{{getCurrentLevel(hierarchyLevels).icon}}</span>
      <div class="current-details">
        <div class="current-label">Current: {{getCurrentLevel(hierarchyLevels).label}}</div>
        <div class="current-path">{{getCurrentLevel(hierarchyLevels).path}}</div>
      </div>
    </div>
  </div>
</div>`;
  }

  get htmlCode(): string {
    return `<div class="container">
  <div class="header">
    <h1 class="title">🎯 Jumping in Hierarchy Pattern</h1>
    <p class="description">
      Allow users to jump directly to different levels in a hierarchical structure, bypassing intermediate navigation steps for faster access.
    </p>
  </div>

  <div class="main-grid">
    <div class="example-section">
      <div class="example-container">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Click on any level to jump directly to that part of the hierarchy. Notice how you can skip intermediate levels for faster navigation.
        </p>
        
        <div class="hierarchy-examples">
          <!-- Product Hierarchy -->
          <div class="hierarchy-card">
            <h3 class="hierarchy-title">Product Hierarchy</h3>
            
            <div class="hierarchy-levels">
              <button 
                *ngFor="let level of hierarchyLevels" 
                (click)="jumpToLevel(level.level)"
                class="hierarchy-level"
                [class.level-active]="selectedLevel === level.level"
                [attr.aria-label]="'Jump to ' + level.label + ' level'"
                [attr.aria-pressed]="selectedLevel === level.level">
                <span class="level-icon">{{level.icon}}</span>
                <span class="level-label">{{level.label}}</span>
                <span class="level-badge" [attr.data-color]="level.color">Level {{level.level}}</span>
              </button>
              <div class="level-path">{{level.path}}</div>
            </div>

            <div class="quick-jump-bar">
              <span class="jump-label">Quick Jump:</span>
              <button 
                *ngFor="let level of hierarchyLevels"
                (click)="jumpToLevel(level.level)"
                class="quick-jump-btn"
                [class.jump-active]="selectedLevel === level.level">
                {{level.label}}
              </button>
            </div>

            <div class="current-level">
              <div class="level-info">
                <span class="current-icon">{{getCurrentLevel(hierarchyLevels).icon}}</span>
                <div class="current-details">
                  <div class="current-label">Current: {{getCurrentLevel(hierarchyLevels).label}}</div>
                  <div class="current-path">{{getCurrentLevel(hierarchyLevels).path}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Organization Structure -->
          <div class="hierarchy-card">
            <h3 class="hierarchy-title">Organization Structure</h3>
            
            <div class="hierarchy-levels">
              <button 
                *ngFor="let level of organizationLevels" 
                (click)="jumpToLevel(level.level)"
                class="hierarchy-level"
                [class.level-active]="selectedLevel === level.level"
                [attr.aria-label]="'Jump to ' + level.label + ' level'"
                [attr.aria-pressed]="selectedLevel === level.level">
                <span class="level-icon">{{level.icon}}</span>
                <span class="level-label">{{level.label}}</span>
                <span class="level-badge" [attr.data-color]="level.color">Level {{level.level}}</span>
              </button>
              <div class="level-path">{{level.path}}</div>
            </div>

            <div class="current-level">
              <div class="level-info">
                <span class="current-icon">{{getCurrentLevel(organizationLevels).icon}}</span>
                <div class="current-details">
                  <div class="current-label">Current: {{getCurrentLevel(organizationLevels).label}}</div>
                  <div class="current-path">{{getCurrentLevel(organizationLevels).path}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dropdown Jump Navigation -->
          <div class="hierarchy-card">
            <h4 class="hierarchy-subtitle">Dropdown Jump Navigation</h4>
            <div class="dropdown-jump">
              <span class="jump-label">Jump to:</span>
              <select
                [value]="selectedLevel"
                (change)="onDropdownChange($event)"
                class="jump-select"
                aria-label="Select hierarchy level">
                <option 
                  *ngFor="let level of hierarchyLevels" 
                  [value]="level.level">
                  {{level.icon}} {{level.label}} - {{level.path.split(' > ').pop()}}
                </option>
              </select>
              <button
                (click)="jumpToLevel(selectedLevel)"
                class="jump-go-btn">
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="code-section">
      <app-code-tabs
        [exampleCode]="exampleCode"
        [htmlCode]="htmlCode"
        [scssCode]="scssCode"
        [typescriptCode]="typescriptCode"
      ></app-code-tabs>
    </div>
  </div>

  <!-- Key Features -->
  <div class="features-container">
    <h3 class="features-title">✨ Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-name">Direct Level Access</h4>
          <p class="feature-description">Jump to any hierarchy level without traversing intermediate steps</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-name">Multiple Interface Options</h4>
          <p class="feature-description">Buttons, quick jump bar, and dropdown selection</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-name">Visual Path Display</h4>
          <p class="feature-description">Clear indication of current position and full path</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-name">Level Identification</h4>
          <p class="feature-description">Color-coded badges and icons for easy recognition</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Use Cases -->
  <div class="use-cases-container">
    <h3 class="use-cases-title">🎯 Common Use Cases</h3>
    <div class="use-cases-grid">
      <div class="use-case-item">
        <div class="use-case-icon">📁</div>
        <h4 class="use-case-name">File Systems</h4>
        <p class="use-case-description">Navigate deep folder structures quickly</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">🏢</div>
        <h4 class="use-case-name">Organizational Charts</h4>
        <p class="use-case-description">Jump between different organizational levels</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">🛒</div>
        <h4 class="use-case-name">Product Categories</h4>
        <p class="use-case-description">Skip between category levels in e-commerce</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.header {
  text-align: center;
}

.title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--spacing-4);
  background: linear-gradient(to right, var(--primary-600), var(--purple-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: var(--text-lg);
  color: var(--text-muted);
  max-width: 42rem;
  margin: 0 auto;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.example-container {
  background: linear-gradient(135deg, var(--primary-50), var(--purple-50));
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  border: 1px solid var(--primary-200);
}

.example-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--spacing-4);
  color: var(--primary-800);
}

.example-description {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--spacing-6);
}

.hierarchy-examples {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

// Hierarchy Card
.hierarchy-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

.hierarchy-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-4);
}

.hierarchy-subtitle {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-3);
}

// Hierarchy Levels
.hierarchy-levels {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
}

.hierarchy-level {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: var(--gray-50);
    border-color: var(--border-hover);
  }
}

.level-active {
  background-color: var(--primary-50);
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--focus-ring);
}

.level-icon {
  font-size: var(--text-xl);
  line-height: 1;
}

.level-label {
  font-weight: var(--font-medium);
  color: var(--text-primary);
  flex: 1;
}

.level-badge {
  padding: var(--spacing-1) var(--spacing-2);
  background-color: var(--gray-100);
  color: var(--text-muted);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);

  &[data-color="blue"] {
    background-color: var(--primary-100);
    color: var(--primary-800);
  }
  
  &[data-color="green"] {
    background-color: var(--success-100);
    color: var(--success-800);
  }
  
  &[data-color="purple"] {
    background-color: var(--purple-100);
    color: var(--purple-800);
  }
  
  &[data-color="orange"] {
    background-color: var(--warning-100);
    color: var(--warning-800);
  }
  
  &[data-color="red"] {
    background-color: var(--error-100);
    color: var(--error-800);
  }
}

.level-active .level-badge {
  background-color: var(--primary-100);
  color: var(--primary-800);
}

.level-path {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

// Quick Jump Bar
.quick-jump-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-4);
  background-color: var(--gray-50);
  border-radius: var(--radius-lg);
  flex-wrap: wrap;
}

.jump-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  font-weight: var(--font-medium);
  margin-right: var(--spacing-2);
}

.quick-jump-btn {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--surface);
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-50);
    border-color: var(--border-hover);
  }
}

.jump-active {
  background-color: var(--primary-600);
  border-color: var(--primary-600);
  color: var(--surface);

  &:hover {
    background-color: var(--primary-700);
    border-color: var(--primary-700);
  }
}

// Dropdown Jump
.dropdown-jump {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background-color: var(--gray-50);
  border-radius: var(--radius-lg);
}

.jump-select {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text-primary);
  font-size: var(--text-sm);
  cursor: pointer;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--focus-ring);
  }
}

.jump-go-btn {
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--primary-600);
  color: var(--surface);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-700);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-ring);
  }
}

// Current Level Display
.current-level {
  padding: var(--spacing-4);
  background-color: var(--gray-50);
  border-radius: var(--radius-lg);
}

.level-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.current-icon {
  font-size: var(--text-2xl);
  line-height: 1;
}

.current-label {
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.current-path {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

// Features and Use Cases
.features-container,
.use-cases-container {
  background: linear-gradient(to right, var(--success-50), var(--primary-50));
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  border: 1px solid var(--success-200);
}

.features-title,
.use-cases-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  margin-bottom: var(--spacing-4);
  color: var(--success-800);
}

.use-cases-title {
  color: var(--purple-800);
}

.features-grid,
.use-cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.use-cases-grid {
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
}

.feature-icon {
  color: var(--success-600);
  font-size: var(--text-lg);
  flex-shrink: 0;
}

.feature-name,
.use-case-name {
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.feature-description,
.use-case-description {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin: 0;
}

.use-case-item {
  text-align: center;
  padding: var(--spacing-4);
  background: var(--surface);
  border-radius: var(--radius-lg);
}

.use-case-icon {
  font-size: var(--text-2xl);
  margin-bottom: var(--spacing-2);
}

// Responsive Design
@media (max-width: 768px) {
  .hierarchy-levels {
    gap: var(--spacing-2);
  }
  
  .hierarchy-level {
    padding: var(--spacing-2) var(--spacing-3);
  }
  
  .quick-jump-bar,
  .dropdown-jump {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }
  
  .jump-select {
    width: 100%;
  }
  
  .level-icon {
    font-size: var(--text-base);
  }
  
  .level-label {
    font-size: var(--text-sm);
  }
}

// Accessibility
.hierarchy-level:focus,
.quick-jump-btn:focus,
.jump-select:focus,
.jump-go-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--focus-ring);
}

// Animation
.current-level {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface HierarchyLevel {
  level: number;
  label: string;
  path: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-jumping-hierarchy',
  templateUrl: './jumping-hierarchy.component.html',
  styleUrls: ['./jumping-hierarchy.component.scss']
})
export class JumpingHierarchyComponent {
  selectedLevel = 3;

  hierarchyLevels: HierarchyLevel[] = [
    { level: 1, label: 'Root', path: 'Home', icon: '🏠', color: 'blue' },
    { level: 2, label: 'Category', path: 'Home > Products', icon: '📦', color: 'green' },
    { level: 3, label: 'Subcategory', path: 'Home > Products > Electronics', icon: '💻', color: 'purple' },
    { level: 4, label: 'Product Type', path: 'Home > Products > Electronics > Laptops', icon: '💻', color: 'orange' },
    { level: 5, label: 'Product', path: 'Home > Products > Electronics > Laptops > MacBook Pro', icon: '🍎', color: 'red' },
  ];

  organizationLevels: HierarchyLevel[] = [
    { level: 1, label: 'Company', path: 'Acme Corp', icon: '🏢', color: 'blue' },
    { level: 2, label: 'Department', path: 'Acme Corp > Engineering', icon: '⚙️', color: 'green' },
    { level: 3, label: 'Team', path: 'Acme Corp > Engineering > Frontend', icon: '👥', color: 'purple' },
    { level: 4, label: 'Project', path: 'Acme Corp > Engineering > Frontend > UI Components', icon: '🎨', color: 'orange' },
    { level: 5, label: 'Task', path: 'Acme Corp > Engineering > Frontend > UI Components > Button Design', icon: '✅', color: 'red' },
  ];

  jumpToLevel(level: number): void {
    this.selectedLevel = level;
    console.log(\`Jumping to level \${level}: \${this.hierarchyLevels[level - 1].label}\`);
    // Handle navigation logic here
    // This could involve:
    // - Router navigation to specific routes
    // - Loading data for the selected level
    // - Updating view state
    // - Analytics tracking
  }

  onDropdownChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.jumpToLevel(Number(target.value));
  }

  getCurrentLevel(levels: HierarchyLevel[]): HierarchyLevel {
    return levels[this.selectedLevel - 1];
  }

  // This component demonstrates:
  // - Hierarchical navigation patterns
  // - Multiple UI approaches for level jumping
  // - State management for current selection
  // - Accessible button and select implementations
  // - Visual feedback for current position
  // - Flexible data structure for different hierarchies
}`;
  }
}