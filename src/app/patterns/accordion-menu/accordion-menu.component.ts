import { Component } from '@angular/core';

interface AccordionItem {
  id: string;
  title: string;
  description: string;
}

interface AccordionSection {
  id: string;
  title: string;
  icon: string;
  items: AccordionItem[];
}

@Component({
  selector: 'app-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  styleUrls: ['./accordion-menu.component.scss']
})
export class AccordionMenuComponent {
  openAccordions = new Set<string>(['section-1']);

  accordionSections: AccordionSection[] = [
    {
      id: 'section-1',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { id: 'installation', title: 'Installation Guide', description: 'How to install and set up the project' },
        { id: 'quickstart', title: 'Quick Start', description: 'Get up and running in 5 minutes' },
        { id: 'configuration', title: 'Configuration', description: 'Configure your settings' },
      ]
    },
    {
      id: 'section-2',
      title: 'Components',
      icon: '🧩',
      items: [
        { id: 'buttons', title: 'Buttons', description: 'Various button styles and states' },
        { id: 'forms', title: 'Forms', description: 'Input fields and form controls' },
        { id: 'navigation', title: 'Navigation', description: 'Menus, tabs, and navigation components' },
        { id: 'feedback', title: 'Feedback', description: 'Alerts, notifications, and modals' },
      ]
    },
    {
      id: 'section-3',
      title: 'Advanced Topics',
      icon: '📚',
      items: [
        { id: 'theming', title: 'Theming', description: 'Customize colors and styles' },
        { id: 'accessibility', title: 'Accessibility', description: 'Making your app accessible' },
        { id: 'performance', title: 'Performance', description: 'Optimization techniques' },
      ]
    },
    {
      id: 'section-4',
      title: 'API Reference',
      icon: '📊',
      items: [
        { id: 'hooks', title: 'Angular Services', description: 'Service documentation' },
        { id: 'utilities', title: 'Utility Functions', description: 'Helper functions and utilities' },
        { id: 'types', title: 'TypeScript Types', description: 'Type definitions and interfaces' },
      ]
    }
  ];

  toggleAccordion(id: string): void {
    if (this.openAccordions.has(id)) {
      this.openAccordions.delete(id);
    } else {
      this.openAccordions.add(id);
    }
  }

  isAccordionOpen(id: string): boolean {
    return this.openAccordions.has(id);
  }

  expandAll(): void {
    this.openAccordions = new Set(this.accordionSections.map(s => s.id));
  }

  collapseAll(): void {
    this.openAccordions = new Set();
  }

  get exampleCode(): string {
    return `<!-- Basic Accordion Example -->
<div class="simple-accordion">
  <div class="accordion-item">
    <button class="accordion-header" (click)="toggleSection('section1')">
      <span>📝 Documentation</span>
      <span class="chevron" [class.open]="isOpen('section1')">▼</span>
    </button>
    <div class="accordion-content" [class.open]="isOpen('section1')">
      <p>This section contains documentation content...</p>
    </div>
  </div>
  
  <div class="accordion-item">
    <button class="accordion-header" (click)="toggleSection('section2')">
      <span>⚙️ Settings</span>
      <span class="chevron" [class.open]="isOpen('section2')">▼</span>
    </button>
    <div class="accordion-content" [class.open]="isOpen('section2')">
      <p>Configuration options go here...</p>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class SimpleAccordion {
  openSections = new Set<string>();
  
  toggleSection(id: string) {
    if (this.openSections.has(id)) {
      this.openSections.delete(id);
    } else {
      this.openSections.add(id);
    }
  }
  
  isOpen(id: string): boolean {
    return this.openSections.has(id);
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="accordion-menu">
  <div *ngFor="let section of accordionSections; let last = last" 
       class="accordion-section"
       [class.last]="last">
    
    <!-- Accordion Header -->
    <button 
      (click)="toggleAccordion(section.id)"
      class="accordion-header"
      [class.active]="isAccordionOpen(section.id)">
      
      <div class="header-content">
        <span class="section-icon">{{ section.icon }}</span>
        <div class="section-info">
          <h3 class="section-title">{{ section.title }}</h3>
          <p class="section-count">{{ section.items.length }} items</p>
        </div>
      </div>
      
      <div class="chevron" [class.open]="isAccordionOpen(section.id)">
        <svg class="chevron-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clip-rule="evenodd"/>
        </svg>
      </div>
    </button>

    <!-- Accordion Content -->
    <div class="accordion-content" [class.open]="isAccordionOpen(section.id)">
      <div class="content-inner">
        <div class="items-container">
          <div *ngFor="let item of section.items" class="accordion-item">
            <div class="item-indicator"></div>
            <div class="item-content">
              <h4 class="item-title">{{ item.title }}</h4>
              <p class="item-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Control Buttons -->
  <div class="accordion-controls">
    <button (click)="expandAll()" class="control-btn expand">
      Expand All
    </button>
    <button (click)="collapseAll()" class="control-btn collapse">
      Collapse All
    </button>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Accordion Menu Styles */
.accordion-menu {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.accordion-section {
  border-bottom: 1px solid var(--border-primary);

  &.last {
    border-bottom: none;
  }
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-4) var(--spacing-6);
  background: var(--bg-primary);
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-align: left;
  color: var(--text-primary);

  &:hover {
    background-color: var(--gray-50);
  }

  &.active {
    background-color: var(--primary-50);
    color: var(--primary-700);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: var(--gray-800);
    }

    &.active {
      background-color: var(--primary-900);
      color: var(--primary-300);
    }
  }
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.section-icon {
  font-size: var(--font-size-xl);
}

.section-info {
  text-align: left;
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.section-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: var(--gray-100);
  border-radius: 50%;
  transition: all var(--transition-normal);
  transform: rotate(-90deg);

  &.open {
    transform: rotate(0deg);
    background-color: var(--primary-100);
    color: var(--primary-600);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-700);
    color: var(--gray-400);

    &.open {
      background-color: var(--primary-800);
      color: var(--primary-300);
    }
  }
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
}

.accordion-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.open {
    max-height: 30rem;
    opacity: 1;
  }
}

.content-inner {
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--gray-50);

  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-900);
  }
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.accordion-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--primary-500);
    box-shadow: var(--shadow-sm);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      border-color: var(--primary-500);
    }
  }
}

.item-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--primary-500);
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.item-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: 0;
}

.accordion-controls {
  display: flex;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--gray-50);
  border-top: 1px solid var(--border-primary);

  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-900);
  }
}

.control-btn {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);

  &.expand {
    background-color: var(--primary-100);
    color: var(--primary-700);

    &:hover {
      background-color: var(--primary-200);
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--primary-900);
      color: var(--primary-300);
    }
  }

  &.collapse {
    background-color: var(--gray-100);
    color: var(--gray-700);

    &:hover {
      background-color: var(--gray-200);
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--gray-700);
      color: var(--gray-300);

      &:hover {
        background-color: var(--gray-600);
      }
    }
  }
}

/* Focus states for accessibility */
.accordion-header:focus,
.accordion-item:focus,
.control-btn:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Responsive design */
@media (max-width: 640px) {
  .accordion-header {
    padding: var(--spacing-3) var(--spacing-4);
  }
  
  .content-inner {
    padding: var(--spacing-3) var(--spacing-4);
  }
  
  .accordion-item {
    padding: var(--spacing-2);
  }
  
  .section-title {
    font-size: var(--font-size-sm);
  }
  
  .section-count {
    font-size: var(--font-size-xs);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface AccordionItem {
  id: string;
  title: string;
  description: string;
}

interface AccordionSection {
  id: string;
  title: string;
  icon: string;
  items: AccordionItem[];
}

@Component({
  selector: 'app-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  styleUrls: ['./accordion-menu.component.scss']
})
export class AccordionMenuComponent {
  openAccordions = new Set<string>(['section-1']);

  accordionSections: AccordionSection[] = [
    {
      id: 'section-1',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { id: 'installation', title: 'Installation Guide', description: 'How to install and set up the project' },
        { id: 'quickstart', title: 'Quick Start', description: 'Get up and running in 5 minutes' },
        { id: 'configuration', title: 'Configuration', description: 'Configure your settings' },
      ]
    },
    {
      id: 'section-2',
      title: 'Components',
      icon: '🧩',
      items: [
        { id: 'buttons', title: 'Buttons', description: 'Various button styles and states' },
        { id: 'forms', title: 'Forms', description: 'Input fields and form controls' },
        { id: 'navigation', title: 'Navigation', description: 'Menus, tabs, and navigation components' },
        { id: 'feedback', title: 'Feedback', description: 'Alerts, notifications, and modals' },
      ]
    },
    {
      id: 'section-3',
      title: 'Advanced Topics',
      icon: '📚',
      items: [
        { id: 'theming', title: 'Theming', description: 'Customize colors and styles' },
        { id: 'accessibility', title: 'Accessibility', description: 'Making your app accessible' },
        { id: 'performance', title: 'Performance', description: 'Optimization techniques' },
      ]
    },
    {
      id: 'section-4',
      title: 'API Reference',
      icon: '📊',
      items: [
        { id: 'hooks', title: 'Angular Services', description: 'Service documentation' },
        { id: 'utilities', title: 'Utility Functions', description: 'Helper functions and utilities' },
        { id: 'types', title: 'TypeScript Types', description: 'Type definitions and interfaces' },
      ]
    }
  ];

  toggleAccordion(id: string): void {
    if (this.openAccordions.has(id)) {
      this.openAccordions.delete(id);
    } else {
      this.openAccordions.add(id);
    }
  }

  isAccordionOpen(id: string): boolean {
    return this.openAccordions.has(id);
  }

  expandAll(): void {
    this.openAccordions = new Set(this.accordionSections.map(s => s.id));
  }

  collapseAll(): void {
    this.openAccordions = new Set();
  }
}`;
  }
}