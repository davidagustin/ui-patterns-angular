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
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.accordion-section {
  border-bottom: 1px solid #e5e7eb;

  &.last {
    border-bottom: none;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  background: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: #f9fafb;
  }

  &.active {
    background-color: #eff6ff;
    color: #1d4ed8;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    color: #f9fafb;

    &:hover {
      background-color: #374151;
    }

    &.active {
      background-color: #1e3a8a;
      color: #93c5fd;
    }
  }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  font-size: 1.25rem;
}

.section-info {
  text-align: left;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.section-count {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #f3f4f6;
  border-radius: 50%;
  transition: all 0.2s ease;
  transform: rotate(-90deg);

  &.open {
    transform: rotate(0deg);
    background-color: #dbeafe;
    color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #374151;
    color: #9ca3af;

    &.open {
      background-color: #1e40af;
      color: #93c5fd;
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
  padding: 1rem 1.5rem;
  background-color: #f9fafb;

  @media (prefers-color-scheme: dark) {
    background-color: #111827;
  }
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.accordion-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    &:hover {
      border-color: #3b82f6;
    }
  }
}

.item-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.item-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.accordion-controls {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background-color: #111827;
    border-top-color: #374151;
  }
}

.control-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.expand {
    background-color: #dbeafe;
    color: #1d4ed8;

    &:hover {
      background-color: #bfdbfe;
    }

    @media (prefers-color-scheme: dark) {
      background-color: #1e3a8a;
      color: #93c5fd;
    }
  }

  &.collapse {
    background-color: #f3f4f6;
    color: #374151;

    &:hover {
      background-color: #e5e7eb;
    }

    @media (prefers-color-scheme: dark) {
      background-color: #374151;
      color: #f9fafb;
    }
  }
}

/* Focus states for accessibility */
.accordion-header:focus,
.accordion-item:focus,
.control-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Responsive design */
@media (max-width: 640px) {
  .accordion-header {
    padding: 0.75rem 1rem;
  }
  
  .content-inner {
    padding: 0.75rem 1rem;
  }
  
  .accordion-item {
    padding: 0.5rem;
  }
  
  .section-title {
    font-size: 0.875rem;
  }
  
  .section-count {
    font-size: 0.75rem;
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