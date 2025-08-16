import { Component } from '@angular/core';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications: Notification[] = [];
  position = 'top-right';

  showNotification(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      duration: 5000
    };
    
    this.notifications.push(notification);
    
    if (notification.duration) {
      setTimeout(() => this.removeNotification(notification.id), notification.duration);
    }
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getIconForType(type: string): string {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type as keyof typeof icons] || 'ℹ️';
  }

  get htmlCode(): string {
    return `<div class="notifications-pattern">
  <div class="pattern-header">
    <h1 class="pattern-title">
      <span class="pattern-icon">🔔</span>
      Notifications Pattern
    </h1>
    <p class="pattern-description">
      Display contextual messages and alerts to provide user feedback.
    </p>
  </div>

  <div class="demo-container">
    <div class="demo-controls">
      <button (click)="showNotification('success', 'Success!', 'Operation completed successfully')" 
              class="btn btn-success">Success</button>
      <button (click)="showNotification('error', 'Error!', 'Something went wrong')" 
              class="btn btn-error">Error</button>
      <button (click)="showNotification('warning', 'Warning!', 'Please check your input')" 
              class="btn btn-warning">Warning</button>
      <button (click)="showNotification('info', 'Info', 'Here is some information')" 
              class="btn btn-info">Info</button>
    </div>
  </div>

  <app-code-tabs 
    [htmlCode]="htmlCode" 
    [scssCode]="scssCode" 
    [typescriptCode]="typescriptCode"
    title="Notifications Implementation">
  </app-code-tabs>
</div>

<div class="notifications-container" [class]="'position-' + position">
  <div *ngFor="let notification of notifications" 
       class="notification" 
       [class]="'notification-' + notification.type">
    <div class="notification-icon">
      {{ getIconForType(notification.type) }}
    </div>
    <div class="notification-content">
      <h4 class="notification-title">{{ notification.title }}</h4>
      <p class="notification-message">{{ notification.message }}</p>
    </div>
    <button (click)="removeNotification(notification.id)" 
            class="notification-close">×</button>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `.notifications-pattern {
  .pattern-header {
    text-align: center;
    margin-bottom: var(--spacing-8);
  }

  .demo-controls {
    display: flex;
    gap: var(--spacing-3);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--spacing-6);
  }

  .btn {
    padding: var(--spacing-2) var(--spacing-4);
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);

    &.btn-success {
      background: var(--green-500);
      color: white;
      &:hover { background: var(--green-600); }
    }

    &.btn-error {
      background: var(--red-500);
      color: white;
      &:hover { background: var(--red-600); }
    }

    &.btn-warning {
      background: #f59e0b;
      color: white;
      &:hover { background: #d97706; }
    }

    &.btn-info {
      background: var(--primary-500);
      color: white;
      &:hover { background: var(--primary-600); }
    }
  }
}

.notifications-container {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  max-width: 400px;
  pointer-events: none;

  &.position-top-right {
    top: var(--spacing-4);
    right: var(--spacing-4);
  }
}

.notification {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
  animation: slideIn 0.3s ease-out;

  &.notification-success {
    border-left: 4px solid var(--green-500);
  }

  &.notification-error {
    border-left: 4px solid var(--red-500);
  }

  &.notification-warning {
    border-left: 4px solid #f59e0b;
  }

  &.notification-info {
    border-left: 4px solid var(--primary-500);
  }
}

.notification-close {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-tertiary);
  cursor: pointer;
  
  &:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications: Notification[] = [];

  showNotification(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      duration: 5000
    };
    
    this.notifications.push(notification);
    
    if (notification.duration) {
      setTimeout(() => this.removeNotification(notification.id), notification.duration);
    }
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}`;
  }
}