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
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

/* Tab Navigation */
.tab-nav {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;

  @media (prefers-color-scheme: dark) {
    background: #111827;
    border-bottom-color: #374151;
  }
}

/* Tab Button */
.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;

  &:hover:not(.disabled) {
    color: #374151;
    background: #f3f4f6;
  }

  &.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
    background: white;

    @media (prefers-color-scheme: dark) {
      color: #60a5fa;
      border-bottom-color: #60a5fa;
      background: #1f2937;
    }
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;

    &:hover:not(.disabled) {
      color: #f3f4f6;
      background: #374151;
    }
  }
}

/* Tab Content */
.tab-content {
  padding: 24px;
}

.tab-panel {
  animation: fadeIn 0.3s ease-in-out;
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.panel-content {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
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