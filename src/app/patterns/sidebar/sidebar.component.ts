import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface MenuItem {
  id: string;
  label: string;
  name: string;
  icon: string;
  url?: string;
  badge?: string | number;
  children?: MenuItem[];
  active?: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  initials: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isMobileOpen = false;
  activeMenuId = 'dashboard';
  expandedMenus = new Set<string>();

  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤',
    role: 'Administrator',
    initials: 'JD'
  };

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      name: 'Dashboard',
      icon: '📊',
      url: '/dashboard',
      active: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      name: 'Analytics',
      icon: '📈',
      badge: 'New',
      children: [
        { id: 'reports', label: 'Reports', name: 'Reports', icon: '📋', url: '/analytics/reports' },
        { id: 'metrics', label: 'Metrics', name: 'Metrics', icon: '📏', url: '/analytics/metrics' },
        { id: 'insights', label: 'Insights', name: 'Insights', icon: '💡', url: '/analytics/insights' }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      name: 'User Management',
      icon: '👥',
      badge: 12,
      children: [
        { id: 'all-users', label: 'All Users', name: 'All Users', icon: '👤', url: '/users' },
        { id: 'roles', label: 'Roles & Permissions', name: 'Roles & Permissions', icon: '🔐', url: '/users/roles' },
        { id: 'invitations', label: 'Invitations', name: 'Invitations', icon: '✉️', url: '/users/invitations' }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      name: 'Projects',
      icon: '📁',
      url: '/projects'
    },
    {
      id: 'settings',
      label: 'Settings',
      name: 'Settings',
      icon: '⚙️',
      children: [
        { id: 'general', label: 'General', name: 'General', icon: '🔧', url: '/settings/general' },
        { id: 'security', label: 'Security', name: 'Security', icon: '🛡️', url: '/settings/security' },
        { id: 'integrations', label: 'Integrations', name: 'Integrations', icon: '🔗', url: '/settings/integrations' }
      ]
    },
    {
      id: 'help',
      label: 'Help & Support',
      name: 'Help & Support',
      icon: '❓',
      url: '/help'
    }
  ];

  ngOnInit(): void {
    this.expandedMenus.add('analytics');
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth > 1024) {
      this.isMobileOpen = false;
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.expandedMenus.clear();
    }
  }

  toggleMobile(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobile(): void {
    this.isMobileOpen = false;
  }

  toggleSubmenu(menuId: string): void {
    if (this.isCollapsed) return;
    
    if (this.expandedMenus.has(menuId)) {
      this.expandedMenus.delete(menuId);
    } else {
      this.expandedMenus.add(menuId);
    }
  }

  setActiveMenu(menuId: string): void {
    this.activeMenuId = menuId;
    
    // Set active state
    this.menuItems.forEach(item => {
      item.active = item.id === menuId;
      if (item.children) {
        item.children.forEach(child => {
          child.active = child.id === menuId;
          if (child.active) {
            item.active = true;
            this.expandedMenus.add(item.id);
          }
        });
      }
    });
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus.has(menuId) && !this.isCollapsed;
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  // Additional methods for template compatibility
  toggleCollapsed(): void {
    this.toggleCollapse();
  }

  get activeMenuItem(): string {
    return this.activeMenuId;
  }

  selectMenuItem(menuId: string): void {
    this.setActiveMenu(menuId);
  }

  hasSubMenu(menuId: string): boolean {
    const item = this.menuItems.find(item => item.id === menuId);
    return !!(item && item.children && item.children.length > 0);
  }

  isExpanded(menuId: string): boolean {
    return this.isMenuExpanded(menuId);
  }

  getSubMenuItems(menuId: string): MenuItem[] {
    const item = this.menuItems.find(item => item.id === menuId);
    return item?.children || [];
  }

  selectSubMenuItem(menuId: string): void {
    this.setActiveMenu(menuId);
  }

  getActivePageName(): string {
    const activeItem = this.menuItems.find(item => item.id === this.activeMenuId);
    if (activeItem) return activeItem.label;
    
    // Check in submenus
    for (const item of this.menuItems) {
      if (item.children) {
        const subItem = item.children.find(child => child.id === this.activeMenuId);
        if (subItem) return subItem.label;
      }
    }
    
    return 'Dashboard';
  }

  get htmlCode(): string {
    return `<div class="sidebar-layout">
  <!-- Mobile Menu Button -->
  <button class="mobile-menu-btn" 
          (click)="toggleMobile()"
          [class.hidden]="!isMobileMenuVisible">
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 5h14M3 10h14M3 15h14"/>
    </svg>
  </button>

  <!-- Mobile Backdrop -->
  <div class="mobile-backdrop"
       [class.visible]="isMobileOpen"
       (click)="closeMobile()">
  </div>

  <!-- Sidebar -->
  <aside class="sidebar"
         [class.collapsed]="isCollapsed"
         [class.mobile-open]="isMobileOpen">
    
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo-section">
        <div class="logo">A</div>
        <span class="logo-text" [class.hidden]="isCollapsed">Admin</span>
      </div>
      
      <button class="collapse-btn" 
              (click)="toggleCollapse()"
              [class.hidden]="isMobileOpen">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6L6 10l4 4V6z"/>
        </svg>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <ul class="menu-list">
        <li *ngFor="let item of menuItems" class="menu-item">
          <!-- Menu Item Button -->
          <button class="menu-button"
                  [class.active]="item.active"
                  [class.has-children]="hasChildren(item)"
                  (click)="hasChildren(item) ? toggleSubmenu(item.id) : setActiveMenu(item.id)">
            
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-label" [class.hidden]="isCollapsed">
              {{ item.label }}
            </span>
            
            <!-- Badge -->
            <span *ngIf="item.badge && !isCollapsed" 
                  class="menu-badge">
              {{ item.badge }}
            </span>
            
            <!-- Expand Arrow -->
            <svg *ngIf="hasChildren(item) && !isCollapsed"
                 class="expand-arrow"
                 [class.expanded]="isMenuExpanded(item.id)"
                 fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 8l4 4 4-4H6z"/>
            </svg>
          </button>

          <!-- Submenu -->
          <ul *ngIf="hasChildren(item) && isMenuExpanded(item.id)"
              class="submenu">
            <li *ngFor="let child of item.children" class="submenu-item">
              <button class="submenu-button"
                      [class.active]="child.active"
                      (click)="setActiveMenu(child.id)">
                <span class="submenu-icon">{{ child.icon }}</span>
                <span class="submenu-label">{{ child.label }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- User Profile -->
    <div class="user-profile" [class.collapsed]="isCollapsed">
      <div class="user-avatar">{{ userProfile.avatar }}</div>
      <div class="user-info" [class.hidden]="isCollapsed">
        <div class="user-name">{{ userProfile.name }}</div>
        <div class="user-role">{{ userProfile.role }}</div>
      </div>
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="main-content" 
        [class.sidebar-collapsed]="isCollapsed"
        [class.sidebar-open]="isMobileOpen">
    <div class="content-wrapper">
      <h1>Main Content Area</h1>
      <p>This is where your page content would go.</p>
    </div>
  </main>
</div>`;
  }

  get scssCode(): string {
    return `/* Sidebar Layout */
.sidebar-layout {
  display: flex;
  height: 100vh;
  background: #f3f4f6;
  
  @media (prefers-color-scheme: dark) {
    background: #111827;
  }
}

/* Mobile Menu Button */
.mobile-menu-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  display: none;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 1024px) {
    display: block;
  }
}

/* Mobile Backdrop */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  
  &.visible {
    opacity: 1;
    visibility: visible;
  }
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 50;
  
  &.collapsed {
    width: 80px;
  }
  
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    
    &.mobile-open {
      transform: translateX(0);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-right-color: #374151;
  }
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  transition: opacity 0.3s ease;
  
  &.hidden {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.collapse-btn {
  width: 32px;
  height: 32px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #6b7280;
    transition: transform 0.3s ease;
  }
  
  .sidebar.collapsed & svg {
    transform: rotate(180deg);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
    
    &:hover {
      background: #4b5563;
    }
    
    svg {
      color: #d1d5db;
    }
  }
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  margin-bottom: 2px;
}

.menu-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  text-align: left;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  &.active {
    background: #dbeafe;
    color: #1d4ed8;
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
      color: #93c5fd;
    }
  }
}

.menu-icon {
  width: 20px;
  font-size: 1.25rem;
  text-align: center;
  flex-shrink: 0;
}

.menu-label {
  flex: 1;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease;
  
  .sidebar.collapsed & {
    opacity: 0;
    width: 0;
  }
}

.menu-badge {
  padding: 2px 8px;
  background: #ef4444;
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.expand-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  
  &.expanded {
    transform: rotate(180deg);
  }
}

/* Submenu */
.submenu {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #f9fafb;
  
  @media (prefers-color-scheme: dark) {
    background: #111827;
  }
}

.submenu-item {
  margin-bottom: 1px;
}

.submenu-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem 0.5rem 3rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  text-align: left;
  font-size: 0.875rem;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  &.active {
    background: #bfdbfe;
    color: #1e40af;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
    
    &:hover {
      background: #374151;
      color: #f3f4f6;
    }
    
    &.active {
      background: #1e3a8a;
      color: #93c5fd;
    }
  }
}

.submenu-icon {
  width: 16px;
  font-size: 1rem;
  text-align: center;
}

.submenu-label {
  font-weight: 400;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  
  &.collapsed {
    justify-content: center;
  }
  
  @media (prefers-color-scheme: dark) {
    border-top-color: #374151;
  }
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.user-info {
  flex: 1;
  min-width: 0;
  transition: opacity 0.3s ease;
  
  &.hidden {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
}

.user-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.user-role {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Main Content */
.main-content {
  flex: 1;
  transition: all 0.3s ease;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    width: 100%;
    
    &.sidebar-open {
      pointer-events: none;
    }
  }
}

.content-wrapper {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }
  
  .main-content {
    margin-left: 0;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  url?: string;
  badge?: string | number;
  children?: MenuItem[];
  active?: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isMobileOpen = false;
  activeMenuId = 'dashboard';
  expandedMenus = new Set<string>();

  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤',
    role: 'Administrator'
  };

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      url: '/dashboard',
      active: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      badge: 'New',
      children: [
        { id: 'reports', label: 'Reports', icon: '📋' },
        { id: 'metrics', label: 'Metrics', icon: '📏' }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: '👥',
      badge: 12,
      children: [
        { id: 'all-users', label: 'All Users', icon: '👤' },
        { id: 'roles', label: 'Roles & Permissions', icon: '🔐' }
      ]
    }
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth > 1024) {
      this.isMobileOpen = false;
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.expandedMenus.clear();
    }
  }

  toggleMobile(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  toggleSubmenu(menuId: string): void {
    if (this.isCollapsed) return;
    
    if (this.expandedMenus.has(menuId)) {
      this.expandedMenus.delete(menuId);
    } else {
      this.expandedMenus.add(menuId);
    }
  }

  setActiveMenu(menuId: string): void {
    this.activeMenuId = menuId;
    // Update active states logic here
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus.has(menuId) && !this.isCollapsed;
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }
}`;
  }
}