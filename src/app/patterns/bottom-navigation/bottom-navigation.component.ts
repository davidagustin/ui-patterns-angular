import { Component } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | null;
  isFloating?: boolean;
}

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent {
  activeNavItem = 'home';
  activeBadgeItem = 'home';
  activeFloatingItem = 'home';
  activeGestureItem = 'home';

  basicNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  badgeNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠', badge: null },
    { id: 'messages', label: 'Messages', icon: '💬', badge: '3' },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: '12' },
    { id: 'profile', label: 'Profile', icon: '👤', badge: null },
  ];

  floatingNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'add', label: 'Add', icon: '➕', isFloating: true },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  setActiveNavItem(itemId: string): void {
    this.activeNavItem = itemId;
  }

  setActiveBadgeItem(itemId: string): void {
    this.activeBadgeItem = itemId;
  }

  setActiveFloatingItem(itemId: string): void {
    this.activeFloatingItem = itemId;
  }

  setActiveGestureItem(itemId: string): void {
    this.activeGestureItem = itemId;
  }

  getCurrentScreenContent(type: 'basic' | 'badge' | 'floating' | 'gesture'): string {
    let activeItem: string;
    let items: NavItem[];

    switch (type) {
      case 'basic':
        activeItem = this.activeNavItem;
        items = this.basicNavItems;
        break;
      case 'badge':
        activeItem = this.activeBadgeItem;
        items = this.badgeNavItems;
        break;
      case 'floating':
        activeItem = this.activeFloatingItem;
        items = this.floatingNavItems;
        break;
      case 'gesture':
        activeItem = this.activeGestureItem;
        items = this.basicNavItems;
        break;
    }

    const item = items.find(i => i.id === activeItem);
    return item ? item.label : 'Home';
  }

  getCurrentScreenIcon(type: 'basic' | 'badge' | 'floating' | 'gesture'): string {
    let activeItem: string;
    let items: NavItem[];

    switch (type) {
      case 'basic':
        activeItem = this.activeNavItem;
        items = this.basicNavItems;
        break;
      case 'badge':
        activeItem = this.activeBadgeItem;
        items = this.badgeNavItems;
        break;
      case 'floating':
        activeItem = this.activeFloatingItem;
        items = this.floatingNavItems;
        break;
      case 'gesture':
        activeItem = this.activeGestureItem;
        items = this.basicNavItems;
        break;
    }

    const item = items.find(i => i.id === activeItem);
    return item ? item.icon : '🏠';
  }

  getBadgeScreenDescription(): string {
    switch (this.activeBadgeItem) {
      case 'messages':
        return 'You have 3 unread messages';
      case 'notifications':
        return 'You have 12 new notifications';
      case 'home':
        return 'Welcome to your dashboard';
      case 'profile':
        return 'Manage your account settings';
      default:
        return 'Content area';
    }
  }

  getFloatingScreenDescription(): string {
    switch (this.activeFloatingItem) {
      case 'add':
        return 'Create new content here';
      case 'home':
        return 'Your main dashboard';
      case 'search':
        return 'Search through content';
      case 'chat':
        return 'Your conversations';
      case 'profile':
        return 'Your profile and settings';
      default:
        return 'Content area';
    }
  }

  getActiveItemIndex(type: 'basic' | 'badge' | 'floating' | 'gesture'): number {
    let activeItem: string;
    let items: NavItem[];

    switch (type) {
      case 'basic':
        activeItem = this.activeNavItem;
        items = this.basicNavItems;
        break;
      case 'badge':
        activeItem = this.activeBadgeItem;
        items = this.badgeNavItems;
        break;
      case 'floating':
        activeItem = this.activeFloatingItem;
        items = this.floatingNavItems;
        break;
      case 'gesture':
        activeItem = this.activeGestureItem;
        items = this.basicNavItems;
        break;
    }

    return items.findIndex(item => item.id === activeItem);
  }

  onGestureItemHover(): void {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }

  get exampleCode(): string {
    return `<!-- Basic Bottom Navigation Example -->
<div class="bottom-nav-container">
  <!-- Content Area -->
  <div class="content-area">
    <div class="content-center">
      <div class="content-icon">{{ getCurrentScreenIcon('basic') }}</div>
      <h3 class="content-title">{{ getCurrentScreenContent('basic') }} Screen</h3>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <div class="bottom-nav">
    <nav class="bottom-nav-list">
      <button
        *ngFor="let item of basicNavItems"
        (click)="setActiveNavItem(item.id)"
        [class]="'nav-item ' + (activeNavItem === item.id ? 'active' : '')"
        [attr.aria-current]="activeNavItem === item.id ? 'page' : null">
        <span class="nav-item-icon">{{ item.icon }}</span>
        <span class="nav-item-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</div>

<!-- Component TypeScript -->
export class BottomNavigationComponent {
  activeNavItem = 'home';
  
  basicNavItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];
  
  setActiveNavItem(itemId: string): void {
    this.activeNavItem = itemId;
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="bottom-navigation-pattern-container">
  <app-pattern-header
    title="📱 Bottom Navigation Pattern"
    description="Create mobile-friendly bottom navigation bars with icons, badges, and floating action buttons for intuitive app navigation."
    [showBreadcrumb]="false">
  </app-pattern-header>

  <div class="pattern-layout">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Examples</h2>
        <p class="example-description">
          Three different bottom navigation styles: basic tabs, with notification badges, and with floating action button.
        </p>
        
        <div class="navigation-examples">
          <!-- Basic Bottom Navigation -->
          <div class="example-variant">
            <h3 class="variant-title">1. Basic Bottom Navigation</h3>
            <div class="bottom-nav-container">
              <!-- Mock Content Area -->
              <div class="content-area">
                <div class="content-center">
                  <div class="content-icon">{{ getCurrentScreenIcon('basic') }}</div>
                  <h3 class="content-title">{{ getCurrentScreenContent('basic') }} Screen</h3>
                  <p class="content-description">
                    This is the {{ getCurrentScreenContent('basic').toLowerCase() }} content area.
                  </p>
                </div>
              </div>

              <!-- Bottom Navigation -->
              <div class="bottom-nav">
                <nav class="bottom-nav-list">
                  <button
                    *ngFor="let item of basicNavItems"
                    (click)="setActiveNavItem(item.id)"
                    [class]="'nav-item ' + (activeNavItem === item.id ? 'active' : '')"
                    [attr.aria-current]="activeNavItem === item.id ? 'page' : null">
                    <span class="nav-item-icon">{{ item.icon }}</span>
                    <span class="nav-item-label">{{ item.label }}</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation with Badges -->
          <div class="example-variant">
            <h3 class="variant-title">2. With Notification Badges</h3>
            <div class="bottom-nav-container">
              <!-- Mock Content Area -->
              <div class="content-area">
                <div class="content-center">
                  <div class="content-icon">{{ getCurrentScreenIcon('badge') }}</div>
                  <h3 class="content-title">{{ getCurrentScreenContent('badge') }} Screen</h3>
                  <p class="content-description">{{ getBadgeScreenDescription() }}</p>
                </div>
              </div>

              <!-- Bottom Navigation with Badges -->
              <div class="bottom-nav">
                <nav class="bottom-nav-list">
                  <button
                    *ngFor="let item of badgeNavItems"
                    (click)="setActiveBadgeItem(item.id)"
                    [class]="'nav-item ' + (activeBadgeItem === item.id ? 'active' : '')"
                    [attr.aria-current]="activeBadgeItem === item.id ? 'page' : null">
                    <div class="nav-item-with-badge">
                      <span class="nav-item-icon">{{ item.icon }}</span>
                      <span *ngIf="item.badge" 
                            class="nav-item-badge"
                            [attr.aria-label]="item.badge + ' notifications'">
                        {{ item.badge }}
                      </span>
                    </div>
                    <span class="nav-item-label">{{ item.label }}</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation with Floating Action Button -->
          <div class="example-variant">
            <h3 class="variant-title">3. With Floating Action Button</h3>
            <div class="bottom-nav-container">
              <!-- Mock Content Area -->
              <div class="content-area">
                <div class="content-center">
                  <div class="content-icon">{{ getCurrentScreenIcon('floating') }}</div>
                  <h3 class="content-title">{{ getCurrentScreenContent('floating') }} Screen</h3>
                  <p class="content-description">{{ getFloatingScreenDescription() }}</p>
                </div>
              </div>

              <!-- Bottom Navigation with FAB -->
              <div class="bottom-nav floating-nav">
                <nav class="bottom-nav-list">
                  <button
                    *ngFor="let item of floatingNavItems"
                    (click)="setActiveFloatingItem(item.id)"
                    [class]="'nav-item ' + (item.isFloating ? 'fab-item' : (activeFloatingItem === item.id ? 'active' : ''))"
                    [attr.aria-current]="activeFloatingItem === item.id ? 'page' : null">
                    <div *ngIf="item.isFloating; else regularItem" class="fab-button">
                      <span class="fab-icon">{{ item.icon }}</span>
                    </div>
                    <ng-template #regularItem>
                      <span class="nav-item-icon">{{ item.icon }}</span>
                      <span class="nav-item-label">{{ item.label }}</span>
                    </ng-template>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <!-- Gesture-Enhanced Bottom Navigation -->
          <div class="example-variant">
            <h3 class="variant-title">4. With Gesture Support</h3>
            <div class="bottom-nav-container">
              <!-- Mock Content Area with Swipe Indicator -->
              <div class="content-area">
                <div class="content-center">
                  <div class="content-icon">{{ getCurrentScreenIcon('gesture') }}</div>
                  <h3 class="content-title">{{ getCurrentScreenContent('gesture') }} Screen</h3>
                  <p class="content-description">Swipe left/right or tap tabs to navigate</p>
                  
                  <!-- Swipe Indicator -->
                  <div class="swipe-indicator">
                    <span class="swipe-text">← Swipe</span>
                    <div class="indicator-dots">
                      <div
                        *ngFor="let item of basicNavItems; let i = index"
                        [class]="'indicator-dot ' + (activeGestureItem === item.id ? 'active' : '')">
                      </div>
                    </div>
                    <span class="swipe-text">Swipe →</span>
                  </div>
                </div>
              </div>

              <!-- Bottom Navigation with Enhanced Interactions -->
              <div class="bottom-nav gesture-nav">
                <!-- Active Indicator -->
                <div class="active-indicator" 
                     [style.transform]="'translateX(' + (getActiveItemIndex('gesture') * 100) + '%)'">
                </div>
                
                <nav class="bottom-nav-list">
                  <button
                    *ngFor="let item of basicNavItems"
                    (click)="setActiveGestureItem(item.id)"
                    (mouseenter)="onGestureItemHover()"
                    [class]="'nav-item gesture-item ' + (activeGestureItem === item.id ? 'active' : '')"
                    [attr.aria-current]="activeGestureItem === item.id ? 'page' : null">
                    <span [class]="'nav-item-icon ' + (activeGestureItem === item.id ? 'active-icon' : '')">
                      {{ item.icon }}
                    </span>
                    <span class="nav-item-label">{{ item.label }}</span>
                    
                    <!-- Ripple Effect Container -->
                    <div class="ripple-container">
                      <div class="ripple-effect"></div>
                    </div>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div class="interactive-features">
          <h4 class="features-subtitle">Interactive Features</h4>
          <div class="features-list">
            <div class="feature-bullet">• Active state indicators with color changes</div>
            <div class="feature-bullet">• Notification badges with count display</div>
            <div class="feature-bullet">• Floating action button with shadow effects</div>
            <div class="feature-bullet">• Gesture support with haptic feedback</div>
            <div class="feature-bullet">• Smooth hover and transition animations</div>
            <div class="feature-bullet">• Ripple effects and scale transformations</div>
            <div class="feature-bullet">• Responsive design for different screen sizes</div>
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
          <h4 class="feature-name">Icon-Based Navigation</h4>
          <p class="feature-description">Clear visual indicators with labels</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Notification Badges</h4>
          <p class="feature-description">Count indicators for alerts and messages</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Floating Action Button</h4>
          <p class="feature-description">Prominent call-to-action in navigation</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Active State Indicators</h4>
          <p class="feature-description">Clear visual feedback for current tab</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Mobile-Optimized</h4>
          <p class="feature-description">Touch-friendly with appropriate sizing</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Smooth Animations</h4>
          <p class="feature-description">Hover effects and state transitions</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Use Cases -->
  <div class="use-cases-section">
    <h3 class="use-cases-title">🎯 Common Use Cases</h3>
    <div class="use-cases-grid">
      <div class="use-case-item">
        <div class="use-case-icon">📱</div>
        <h4 class="use-case-name">Mobile Apps</h4>
        <p class="use-case-description">Primary navigation for mobile applications</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">🌐</div>
        <h4 class="use-case-name">Progressive Web Apps</h4>
        <p class="use-case-description">Native app-like navigation experience</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">💬</div>
        <h4 class="use-case-name">Social Media Apps</h4>
        <p class="use-case-description">Quick access to main features and feeds</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Bottom Navigation Styles */

/* Container */
.bottom-nav-container {
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-color: #374151;
  }
}

/* Content Area */
.content-area {
  height: 10rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;

  @media (prefers-color-scheme: dark) {
    background-color: #374151;
  }
}

.content-center {
  text-align: center;
}

.content-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.content-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.content-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Bottom Navigation */
.bottom-nav {
  background-color: white;
  border-top: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-top-color: #374151;
  }
}

.bottom-nav-list {
  display: flex;
  position: relative;
}

/* Navigation Item */
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: #9ca3af;

  &:hover {
    background-color: #f3f4f6;
    color: #6b7280;

    @media (prefers-color-scheme: dark) {
      background-color: #374151;
      color: #9ca3af;
    }
  }

  &.active {
    color: #3b82f6;

    @media (prefers-color-scheme: dark) {
      color: #60a5fa;
    }
  }

  @media (prefers-color-scheme: dark) {
    color: #6b7280;
  }
}

.nav-item-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  transition: transform 0.2s ease;
}

.nav-item-label {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Badge Navigation */
.nav-item-with-badge {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-item-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  z-index: 10;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Floating Action Button */
.floating-nav {
  position: relative;
}

.fab-item {
  position: relative;
  top: -1rem;
}

.fab-button {
  width: 3rem;
  height: 3rem;
  background-color: #3b82f6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #3b82f6;

    &:hover {
      background-color: #2563eb;
    }
  }
}

.fab-icon {
  color: white;
  font-size: 1.25rem;
}

/* Gesture Navigation */
.gesture-nav {
  .active-indicator {
    position: absolute;
    top: 0;
    height: 2px;
    background-color: #3b82f6;
    transition: all 0.3s ease-out;
    width: 25%; /* 100% / 4 items */
    z-index: 10;

    @media (prefers-color-scheme: dark) {
      background-color: #60a5fa;
    }
  }

  .nav-item {
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);

      .nav-item-icon {
        transform: scale(1.1);
      }
    }

    &.active {
      background-color: rgba(59, 130, 246, 0.1);

      .nav-item-icon {
        transform: scale(1.2);
      }

      @media (prefers-color-scheme: dark) {
        background-color: rgba(96, 165, 250, 0.2);
      }
    }
  }

  .ripple-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 0.5rem;
  }

  .ripple-effect {
    position: absolute;
    inset: 0;
    background-color: #3b82f6;
    opacity: 0;
    transform: scale(0);
    border-radius: 50%;
    transition: all 0.3s ease;

    @media (prefers-color-scheme: dark) {
      background-color: #60a5fa;
    }
  }

  .nav-item:hover .ripple-effect {
    opacity: 0.1;
    transform: scale(1.5);
  }
}

/* Swipe Indicator */
.swipe-indicator {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
}

.swipe-text {
  font-size: 0.75rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.indicator-dots {
  display: flex;
  gap: 0.25rem;
}

.indicator-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #d1d5db;
  transition: background-color 0.2s ease;

  &.active {
    background-color: #3b82f6;

    @media (prefers-color-scheme: dark) {
      background-color: #60a5fa;
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: #6b7280;
  }
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Icon Hover Effects */
.nav-item:hover .nav-item-icon {
  transform: scale(1.1);
}

.nav-item.active .nav-item-icon {
  transform: scale(1.2);
}

/* Focus States */
.nav-item:focus {
  outline: none;
  background-color: #f3f4f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);

  @media (prefers-color-scheme: dark) {
    background-color: #374151;
  }
}

.fab-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 640px) {
  .nav-item {
    padding: 0.5rem 0.25rem;
  }
  
  .nav-item-icon {
    font-size: 1.125rem;
  }
  
  .nav-item-label {
    font-size: 0.625rem;
  }
  
  .fab-button {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .fab-icon {
    font-size: 1rem;
  }
}

/* Common pattern styles */
.bottom-navigation-pattern-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.pattern-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.example-section {
  display: flex;
  flex-direction: column;
}

.example-card {
  background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 0.75rem;
  padding: 1.5rem;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #1e3a8a20 0%, #581c8720 100%);
    border-color: #1e40af;
  }
}

.example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1e40af;

  @media (prefers-color-scheme: dark) {
    color: #93c5fd;
  }
}

.example-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.navigation-examples {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.example-variant {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.variant-title {
  font-weight: 500;
  color: #111827;
  margin: 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.interactive-features {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background-color: #111827;
  }
}

.features-subtitle {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.feature-bullet {
  font-size: 0.75rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.code-section {
  display: flex;
  flex-direction: column;
}

.features-section {
  background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%);
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #14532d20 0%, #1e3a8a20 100%);
    border-color: #166534;
  }
}

.features-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #166534;

  @media (prefers-color-scheme: dark) {
    color: #86efac;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-icon {
  color: #16a34a;
  font-size: 1.125rem;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    color: #4ade80;
  }
}

.feature-content {
  flex: 1;
}

.feature-name {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.feature-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.use-cases-section {
  background: linear-gradient(135deg, #fdf4ff 0%, #fef3c7 100%);
  border: 1px solid #e879f9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #581c8720 0%, #78350f20 100%);
    border-color: #a855f7;
  }
}

.use-cases-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #7c2d12;

  @media (prefers-color-scheme: dark) {
    color: #fbbf24;
  }
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.use-case-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.use-case-icon {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.use-case-name {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.use-case-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Accessibility */
.nav-item[aria-current="page"] {
  color: #3b82f6;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
  }
}

/* Print Styles */
@media print {
  .bottom-nav {
    display: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .nav-item-icon,
  .fab-button,
  .active-indicator,
  .ripple-effect {
    transition: none;
  }
  
  .nav-item:hover .nav-item-icon,
  .nav-item.active .nav-item-icon {
    transform: none;
  }
  
  .nav-item-badge {
    animation: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .nav-item {
    border: 1px solid transparent;
  }
  
  .nav-item:focus {
    border-color: #3b82f6;
  }
  
  .nav-item-badge {
    border: 2px solid white;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | null;
  isFloating?: boolean;
}

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent {
  activeNavItem = 'home';
  activeBadgeItem = 'home';
  activeFloatingItem = 'home';
  activeGestureItem = 'home';

  basicNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  badgeNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠', badge: null },
    { id: 'messages', label: 'Messages', icon: '💬', badge: '3' },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: '12' },
    { id: 'profile', label: 'Profile', icon: '👤', badge: null },
  ];

  floatingNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'add', label: 'Add', icon: '➕', isFloating: true },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  setActiveNavItem(itemId: string): void {
    this.activeNavItem = itemId;
  }

  setActiveBadgeItem(itemId: string): void {
    this.activeBadgeItem = itemId;
  }

  setActiveFloatingItem(itemId: string): void {
    this.activeFloatingItem = itemId;
  }

  setActiveGestureItem(itemId: string): void {
    this.activeGestureItem = itemId;
  }

  getCurrentScreenContent(type: 'basic' | 'badge' | 'floating' | 'gesture'): string {
    let activeItem: string;
    let items: NavItem[];

    switch (type) {
      case 'basic':
        activeItem = this.activeNavItem;
        items = this.basicNavItems;
        break;
      case 'badge':
        activeItem = this.activeBadgeItem;
        items = this.badgeNavItems;
        break;
      case 'floating':
        activeItem = this.activeFloatingItem;
        items = this.floatingNavItems;
        break;
      case 'gesture':
        activeItem = this.activeGestureItem;
        items = this.basicNavItems;
        break;
    }

    const item = items.find(i => i.id === activeItem);
    return item ? item.label : 'Home';
  }

  onGestureItemHover(): void {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }
}

// Advanced Bottom Navigation Service
@Injectable()
export class BottomNavigationService {
  private activeRoute$ = new BehaviorSubject<string>('home');
  private badgeUpdates$ = new Subject<{ itemId: string; count: number }>();

  constructor(private router: Router) {
    // Listen to route changes to update active navigation
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => this.extractRouteFromUrl(event.url))
      )
      .subscribe(route => this.activeRoute$.next(route));
  }

  get activeRoute(): Observable<string> {
    return this.activeRoute$.asObservable();
  }

  get badgeUpdates(): Observable<{ itemId: string; count: number }> {
    return this.badgeUpdates$.asObservable();
  }

  updateBadge(itemId: string, count: number): void {
    this.badgeUpdates$.next({ itemId, count });
  }

  navigateToRoute(route: string): void {
    this.router.navigate([\`/\${route}\`]);
  }

  private extractRouteFromUrl(url: string): string {
    return url.split('/')[1] || 'home';
  }
}

// Enhanced Component with Service Integration
export class EnhancedBottomNavigationComponent implements OnInit, OnDestroy {
  activeItem = 'home';
  badgeCounts = new Map<string, number>();
  
  private destroy$ = new Subject<void>();

  constructor(private navService: BottomNavigationService) {}

  ngOnInit(): void {
    // Subscribe to active route changes
    this.navService.activeRoute
      .pipe(takeUntil(this.destroy$))
      .subscribe(route => this.activeItem = route);

    // Subscribe to badge updates
    this.navService.badgeUpdates
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ itemId, count }) => {
        if (count > 0) {
          this.badgeCounts.set(itemId, count);
        } else {
          this.badgeCounts.delete(itemId);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onItemClick(itemId: string): void {
    this.navService.navigateToRoute(itemId);
    
    // Clear badge when item is clicked
    if (this.badgeCounts.has(itemId)) {
      this.badgeCounts.delete(itemId);
      this.navService.updateBadge(itemId, 0);
    }
  }

  getBadgeCount(itemId: string): number | null {
    return this.badgeCounts.get(itemId) || null;
  }
}`;
  }
}