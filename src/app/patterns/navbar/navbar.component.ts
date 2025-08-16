import { Component, HostListener } from '@angular/core';

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  active?: boolean;
  icon?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  unread: boolean;
  timestamp: Date;
}

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'page' | 'user' | 'document';
  url: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isSearchOpen = false;
  isNotificationsOpen = false;
  isUserMenuOpen = false;
  searchQuery = '';

  navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', url: '/dashboard', active: true },
    { id: 'projects', label: 'Projects', url: '/projects' },
    { id: 'team', label: 'Team', url: '/team' },
    { id: 'analytics', label: 'Analytics', url: '/analytics' },
    { id: 'reports', label: 'Reports', url: '/reports' }
  ];

  notifications: Notification[] = [
    {
      id: '1',
      title: 'New Project Created',
      message: 'Project "Website Redesign" has been created',
      type: 'success',
      unread: true,
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Team Member Added',
      message: 'John Doe has joined your team',
      type: 'info',
      unread: true,
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Deployment Warning',
      message: 'Your staging environment needs attention',
      type: 'warning',
      unread: false,
      timestamp: new Date(Date.now() - 60 * 60 * 1000)
    }
  ];

  searchSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Dashboard', type: 'page', url: '/dashboard' },
    { id: '2', title: 'User Settings', type: 'page', url: '/settings' },
    { id: '3', title: 'John Doe', type: 'user', url: '/users/john-doe' },
    { id: '4', title: 'Project Documentation', type: 'document', url: '/docs/project' }
  ];

  userProfile = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '👩‍💼',
    role: 'Product Manager'
  };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.search-container')) {
      this.isSearchOpen = false;
    }
    if (!target.closest('.notifications-container')) {
      this.isNotificationsOpen = false;
    }
    if (!target.closest('.user-menu-container')) {
      this.isUserMenuOpen = false;
    }
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    this.isMobileMenuOpen = false;
    this.isSearchOpen = false;
    this.isNotificationsOpen = false;
    this.isUserMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        searchInput?.focus();
      }, 100);
    }
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  setActiveNavItem(itemId: string): void {
    this.navigationItems.forEach(item => {
      item.active = item.id === itemId;
    });
    this.isMobileMenuOpen = false;
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    this.isSearchOpen = false;
  }

  selectSuggestion(suggestion: SearchSuggestion): void {
    console.log('Selected:', suggestion);
    this.searchQuery = suggestion.title;
    this.isSearchOpen = false;
  }

  markNotificationRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.unread = false;
    }
  }

  markAllNotificationsRead(): void {
    this.notifications.forEach(n => n.unread = false);
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  get filteredSuggestions(): SearchSuggestion[] {
    if (!this.searchQuery.trim()) return this.searchSuggestions;
    return this.searchSuggestions.filter(s => 
      s.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  formatNotificationTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  }

  onLogout(): void {
    console.log('User logged out');
    this.isUserMenuOpen = false;
  }

  get htmlCode(): string {
    return `<nav class="navbar">
  <div class="navbar-container">
    <!-- Logo Section -->
    <div class="navbar-brand">
      <div class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Company</span>
      </div>
    </div>

    <!-- Desktop Navigation -->
    <div class="navbar-nav desktop-nav">
      <a *ngFor="let item of navigationItems"
         class="nav-link"
         [class.active]="item.active"
         (click)="setActiveNavItem(item.id)">
        {{ item.label }}
      </a>
    </div>

    <!-- Search, Notifications, User Menu -->
    <div class="navbar-actions">
      <!-- Search -->
      <div class="search-container">
        <button class="search-trigger" (click)="toggleSearch()">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
          </svg>
        </button>
        
        <div class="search-dropdown" [class.open]="isSearchOpen">
          <div class="search-input-container">
            <input type="text"
                   class="search-input"
                   placeholder="Search..."
                   [(ngModel)]="searchQuery"
                   (keydown.enter)="onSearch()">
            <button class="search-submit" (click)="onSearch()">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
            </button>
          </div>
          
          <div class="search-suggestions" *ngIf="filteredSuggestions.length > 0">
            <div *ngFor="let suggestion of filteredSuggestions"
                 class="suggestion-item"
                 (click)="selectSuggestion(suggestion)">
              <span class="suggestion-icon">
                <span *ngIf="suggestion.type === 'page'">📄</span>
                <span *ngIf="suggestion.type === 'user'">👤</span>
                <span *ngIf="suggestion.type === 'document'">📋</span>
              </span>
              <span class="suggestion-title">{{ suggestion.title }}</span>
              <span class="suggestion-type">{{ suggestion.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="notifications-container">
        <button class="notification-trigger" (click)="toggleNotifications()">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
          <span class="notification-badge" *ngIf="unreadNotificationsCount > 0">
            {{ unreadNotificationsCount }}
          </span>
        </button>
        
        <div class="notifications-dropdown" [class.open]="isNotificationsOpen">
          <div class="notifications-header">
            <h3>Notifications</h3>
            <button class="mark-all-read" (click)="markAllNotificationsRead()">
              Mark all read
            </button>
          </div>
          
          <div class="notifications-list">
            <div *ngFor="let notification of notifications"
                 class="notification-item"
                 [class.unread]="notification.unread"
                 (click)="markNotificationRead(notification.id)">
              <div class="notification-content">
                <div class="notification-title">{{ notification.title }}</div>
                <div class="notification-message">{{ notification.message }}</div>
                <div class="notification-time">{{ formatNotificationTime(notification.timestamp) }}</div>
              </div>
              <button class="notification-delete" (click)="deleteNotification(notification.id)">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- User Menu -->
      <div class="user-menu-container">
        <button class="user-trigger" (click)="toggleUserMenu()">
          <span class="user-avatar">{{ userProfile.avatar }}</span>
          <span class="user-name desktop-only">{{ userProfile.name }}</span>
          <svg class="chevron-down" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </button>
        
        <div class="user-dropdown" [class.open]="isUserMenuOpen">
          <div class="user-info">
            <div class="user-details">
              <div class="user-display-name">{{ userProfile.name }}</div>
              <div class="user-email">{{ userProfile.email }}</div>
              <div class="user-role">{{ userProfile.role }}</div>
            </div>
          </div>
          
          <div class="user-menu-items">
            <a class="user-menu-item">Profile Settings</a>
            <a class="user-menu-item">Account</a>
            <a class="user-menu-item">Preferences</a>
            <hr class="menu-divider">
            <a class="user-menu-item">Help Center</a>
            <a class="user-menu-item" (click)="onLogout()">Sign Out</a>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5h14M3 10h14M3 15h14"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <div class="mobile-nav" [class.open]="isMobileMenuOpen">
    <a *ngFor="let item of navigationItems"
       class="mobile-nav-link"
       [class.active]="item.active"
       (click)="setActiveNavItem(item.id)">
      {{ item.label }}
    </a>
  </div>
</nav>`;
  }

  get scssCode(): string {
    return `/* Navbar Styles */
.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-bottom-color: #374151;
  }
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo */
.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.logo-icon {
  font-size: 1.5rem;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  gap: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #374151;
  }
  
  &.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    
    &:hover {
      color: #f9fafb;
    }
    
    &.active {
      color: #60a5fa;
      border-bottom-color: #60a5fa;
    }
  }
}

/* Navbar Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Search */
.search-container {
  position: relative;
}

.search-trigger {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    
    &:hover {
      background: #374151;
      color: #f9fafb;
    }
  }
}

.search-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  
  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.search-input-container {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  @media (prefers-color-scheme: dark) {
    background: transparent;
    color: #f9fafb;
  }
}

.search-submit {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
}

.search-suggestions {
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
  }
  
  @media (prefers-color-scheme: dark) {
    &:hover {
      background: #374151;
    }
  }
}

.suggestion-icon {
  font-size: 1rem;
}

.suggestion-title {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.suggestion-type {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Notifications */
.notifications-container {
  position: relative;
}

.notification-trigger {
  position: relative;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    
    &:hover {
      background: #374151;
      color: #f9fafb;
    }
  }
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 0.75rem;
  min-width: 1.25rem;
  text-align: center;
}

.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 380px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  
  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.notifications-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    
    @media (prefers-color-scheme: dark) {
      color: #f9fafb;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.mark-all-read {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    color: #2563eb;
  }
}

.notifications-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-left: 3px solid transparent;
  
  &.unread {
    background: #f0f9ff;
    border-left-color: #3b82f6;
    
    @media (prefers-color-scheme: dark) {
      background: #1e3a8a;
    }
  }
  
  &:hover {
    background: #f3f4f6;
    
    @media (prefers-color-scheme: dark) {
      background: #374151;
    }
  }
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.notification-message {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.notification-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.notification-delete {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
}

/* User Menu */
.user-menu-container {
  position: relative;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
  }
  
  @media (prefers-color-scheme: dark) {
    &:hover {
      background: #374151;
    }
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.user-name {
  font-weight: 500;
  color: #1f2937;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.chevron-down {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.desktop-only {
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 240px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  
  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.user-info {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.user-display-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.user-role {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  font-weight: 500;
}

.user-menu-items {
  padding: 0.5rem 0;
}

.user-menu-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #6b7280;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    
    &:hover {
      background: #374151;
      color: #f9fafb;
    }
  }
}

.menu-divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0.5rem 0;
  
  @media (prefers-color-scheme: dark) {
    border-top-color: #374151;
  }
}

/* Mobile Menu */
.mobile-menu-btn {
  display: block;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (min-width: 768px) {
    display: none;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    
    &:hover {
      background: #374151;
      color: #f9fafb;
    }
  }
}

.mobile-nav {
  display: none;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;
  
  &.open {
    display: block;
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-top-color: #374151;
  }
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  &.active {
    background: #dbeafe;
    color: #3b82f6;
    border-right: 3px solid #3b82f6;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    
    &:hover {
      background: #374151;
      color: #f9fafb;
    }
    
    &.active {
      background: #1e40af;
      color: #60a5fa;
    }
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .navbar-container {
    padding: 0 0.5rem;
  }
  
  .search-dropdown,
  .notifications-dropdown,
  .user-dropdown {
    width: 280px;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    
    &.open {
      transform: translateX(-50%) translateY(0);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  active?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  unread: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isSearchOpen = false;
  isNotificationsOpen = false;
  isUserMenuOpen = false;
  searchQuery = '';

  navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', url: '/dashboard', active: true },
    { id: 'projects', label: 'Projects', url: '/projects' },
    { id: 'team', label: 'Team', url: '/team' },
    { id: 'analytics', label: 'Analytics', url: '/analytics' }
  ];

  notifications: Notification[] = [
    {
      id: '1',
      title: 'New Project Created',
      message: 'Project "Website Redesign" has been created',
      type: 'success',
      unread: true,
      timestamp: new Date()
    }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.search-container')) {
      this.isSearchOpen = false;
    }
    if (!target.closest('.notifications-container')) {
      this.isNotificationsOpen = false;
    }
    if (!target.closest('.user-menu-container')) {
      this.isUserMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  setActiveNavItem(itemId: string): void {
    this.navigationItems.forEach(item => {
      item.active = item.id === itemId;
    });
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }
}`;
  }
}