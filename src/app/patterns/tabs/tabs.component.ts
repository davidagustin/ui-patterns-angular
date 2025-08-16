import { Component } from '@angular/core';

interface Tab {
  id: string;
  title: string;
  content: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  activeTab = 'tab1';

  tabs: Tab[] = [
    {
      id: 'tab1',
      title: 'Overview',
      icon: '📊',
      content: 'This tab contains an overview of the project, including key metrics, recent activity, and important announcements.'
    },
    {
      id: 'tab2',
      title: 'Analytics',
      icon: '📈',
      content: 'Detailed analytics and reporting data are displayed here. This includes user engagement metrics and performance statistics.'
    },
    {
      id: 'tab3',
      title: 'Settings',
      icon: '⚙️',
      content: 'Configure your preferences and application settings. This includes user profile settings and notification preferences.'
    },
    {
      id: 'tab4',
      title: 'Premium',
      icon: '⭐',
      content: 'Explore premium features and upgrade options. Get access to advanced functionality and priority support.',
      disabled: true
    }
  ];

  setActiveTab(tabId: string): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab = tabId;
    }
  }

  get htmlCode(): string {
    return `<div class="tabs-container">
  <!-- Tab Navigation -->
  <div class="tab-nav">
    <button 
      *ngFor="let tab of tabs"
      (click)="setActiveTab(tab.id)"
      [class.active]="activeTab === tab.id"
      [class.disabled]="tab.disabled"
      class="tab-button"
      [disabled]="tab.disabled">
      <span class="tab-icon" *ngIf="tab.icon">{{ tab.icon }}</span>
      <span class="tab-title">{{ tab.title }}</span>
    </button>
  </div>

  <!-- Tab Content -->
  <div class="tab-content">
    <div class="tab-panel" *ngFor="let tab of tabs" [hidden]="activeTab !== tab.id">
      <h3 class="panel-title">{{ tab.title }}</h3>
      <p class="panel-content">{{ tab.content }}</p>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Tabs Container */
.tabs-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* Tab Navigation */
.tab-nav {
  display: flex;
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-primary);
  overflow-x: auto;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }
}

/* Tab Button */
.tab-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-5);
  background: none;
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  font-size: var(--font-size-sm);
  font-weight: 500;

  &:hover:not(.disabled) {
    color: var(--text-primary);
    background: var(--gray-100);
  }

  &.active {
    color: var(--primary-600);
    border-bottom-color: var(--primary-600);
    background: var(--bg-primary);

    @media (prefers-color-scheme: dark) {
      color: var(--primary-400);
      border-bottom-color: var(--primary-400);
    }
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--text-tertiary);
  }

  @media (prefers-color-scheme: dark) {
    &:hover:not(.disabled) {
      background: var(--gray-700);
    }
  }
}

/* Tab Content */
.tab-content {
  padding: var(--spacing-6);
}

.tab-panel {
  animation: fadeIn 0.3s ease-in-out;
}

.panel-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-3) 0;
}

.panel-content {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
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

interface Tab {
  id: string;
  title: string;
  content: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  activeTab = 'tab1';

  tabs: Tab[] = [
    {
      id: 'tab1',
      title: 'Overview',
      icon: '📊',
      content: 'This tab contains an overview of the project, including key metrics, recent activity, and important announcements.'
    },
    {
      id: 'tab2',
      title: 'Analytics',
      icon: '📈',
      content: 'Detailed analytics and reporting data are displayed here. This includes user engagement metrics and performance statistics.'
    },
    {
      id: 'tab3',
      title: 'Settings',
      icon: '⚙️',
      content: 'Configure your preferences and application settings. This includes user profile settings and notification preferences.'
    },
    {
      id: 'tab4',
      title: 'Premium',
      icon: '⭐',
      content: 'Explore premium features and upgrade options. Get access to advanced functionality and priority support.',
      disabled: true
    }
  ];

  setActiveTab(tabId: string): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab = tabId;
    }
  }
}`;
  }
}