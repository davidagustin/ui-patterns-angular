import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';

interface RefreshableItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  author: string;
  likes: number;
}

@Component({
  selector: 'app-pull-refresh',
  templateUrl: './pull-refresh.component.html',
  styleUrls: ['./pull-refresh.component.scss']
})
export class PullRefreshComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  
  items: RefreshableItem[] = [];
  isRefreshing = false;
  pullDistance = 0;
  pullThreshold = 80;
  isPulling = false;
  canRefresh = false;
  
  private startY = 0;
  private isScrolling = false;
  private lastRefresh = new Date();

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.items = [
      {
        id: '1',
        title: 'Breaking: New Angular Features Released',
        description: 'Angular team announces exciting new features for developers...',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        author: 'Angular Team',
        likes: 245
      },
      {
        id: '2',
        title: 'Best Practices for Progressive Web Apps',
        description: 'Learn how to build fast, reliable PWAs with modern techniques...',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        author: 'PWA Expert',
        likes: 189
      },
      {
        id: '3',
        title: 'TypeScript 5.0: What\'s New and Improved',
        description: 'Exploring the latest TypeScript features and performance improvements...',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        author: 'TS Developer',
        likes: 156
      },
      {
        id: '4',
        title: 'Mobile-First Design Principles',
        description: 'Essential guidelines for creating responsive mobile experiences...',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        author: 'UX Designer',
        likes: 203
      },
      {
        id: '5',
        title: 'State Management in Angular Applications',
        description: 'Comparing different state management solutions for Angular...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        author: 'Angular Dev',
        likes: 178
      }
    ];
  }

  onTouchStart(event: TouchEvent): void {
    if (this.scrollContainer.nativeElement.scrollTop === 0 && !this.isRefreshing) {
      this.startY = event.touches[0].clientY;
      this.isScrolling = true;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isScrolling || this.isRefreshing) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;

    if (deltaY > 0 && this.scrollContainer.nativeElement.scrollTop === 0) {
      event.preventDefault();
      this.isPulling = true;
      this.pullDistance = Math.min(deltaY * 0.5, this.pullThreshold * 1.5);
      this.canRefresh = this.pullDistance >= this.pullThreshold;
    }
  }

  onTouchEnd(): void {
    if (this.isPulling && this.canRefresh && !this.isRefreshing) {
      this.triggerRefresh();
    } else {
      this.resetPull();
    }
    
    this.isScrolling = false;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    // Support mouse wheel for desktop testing
    if (event.deltaY < 0 && this.scrollContainer.nativeElement.scrollTop === 0 && !this.isRefreshing) {
      event.preventDefault();
      this.pullDistance = Math.min(this.pullDistance + Math.abs(event.deltaY) * 0.5, this.pullThreshold * 1.5);
      this.isPulling = true;
      this.canRefresh = this.pullDistance >= this.pullThreshold;
      
      // Auto-trigger refresh if threshold is exceeded
      if (this.canRefresh) {
        setTimeout(() => this.triggerRefresh(), 100);
      }
    }
  }

  triggerRefresh(): void {
    this.isRefreshing = true;
    this.pullDistance = this.pullThreshold;
    
    // Simulate API call
    setTimeout(() => {
      this.refreshData();
      this.isRefreshing = false;
      this.resetPull();
      this.lastRefresh = new Date();
    }, 2000);
  }

  refreshData(): void {
    // Add new items to the top
    const newItems: RefreshableItem[] = [
      {
        id: `new-${Date.now()}`,
        title: 'Fresh Content: Latest Updates Available',
        description: 'New content has been loaded from the server...',
        timestamp: new Date(),
        author: 'News Bot',
        likes: Math.floor(Math.random() * 100) + 50
      },
      {
        id: `new-${Date.now() + 1}`,
        title: 'Just In: Important Announcement',
        description: 'Breaking news and updates you need to know about...',
        timestamp: new Date(Date.now() - 1000 * 30), // 30 seconds ago
        author: 'Editor',
        likes: Math.floor(Math.random() * 200) + 100
      }
    ];
    
    this.items = [...newItems, ...this.items];
  }

  resetPull(): void {
    this.isPulling = false;
    this.pullDistance = 0;
    this.canRefresh = false;
  }

  manualRefresh(): void {
    if (!this.isRefreshing) {
      this.triggerRefresh();
    }
  }

  getTimeSince(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  }

  getPullHeight(): number {
    return this.pullDistance;
  }

  getPullOpacity(): number {
    return Math.min(this.pullDistance / this.pullThreshold, 1);
  }

  getPullRotation(): number {
    return this.canRefresh ? 180 : (this.pullDistance / this.pullThreshold) * 180;
  }

  get exampleCode(): string {
    return `<!-- Basic Pull Refresh Example -->
<div class="pull-refresh-container"
     (touchstart)="onTouchStart($event)"
     (touchmove)="onTouchMove($event)"
     (touchend)="onTouchEnd()">
     
  <!-- Pull Indicator -->
  <div class="pull-indicator" [style.height.px]="pullDistance">
    <div class="pull-content" *ngIf="isPulling">
      <div class="pull-icon" [class.can-refresh]="canRefresh">
        <svg [style.transform]="'rotate(' + getPullRotation() + 'deg)'">
          <path d="M12 2v6l4-4-4-4z"/>
        </svg>
      </div>
      <span class="pull-text">
        {{ canRefresh ? 'Release to refresh' : 'Pull to refresh' }}
      </span>
    </div>
  </div>
  
  <!-- Content List -->
  <div class="content-list">
    <div *ngFor="let item of items" class="content-item">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <div class="item-meta">
        <span>{{ item.author }}</span>
        <span>{{ getTimeSince(item.timestamp) }}</span>
      </div>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class PullRefreshComponent {
  pullDistance = 0;
  isPulling = false;
  canRefresh = false;
  isRefreshing = false;
  
  onTouchStart(event: TouchEvent) {
    // Handle touch start
  }
  
  onTouchMove(event: TouchEvent) {
    // Calculate pull distance
    // Update pull state
  }
  
  onTouchEnd() {
    if (this.canRefresh) {
      this.triggerRefresh();
    }
  }
  
  triggerRefresh() {
    this.isRefreshing = true;
    // Perform refresh operation
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="pull-refresh-pattern-container">
  <app-pattern-header
    title="Pull Refresh Pattern"
    description="Enable users to refresh content by pulling down on mobile devices, providing an intuitive way to get fresh data."
    icon="🔄">
  </app-pattern-header>

  <div class="pattern-layout">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">📱 Interactive Example</h2>
        <p class="example-description">
          Pull down on the content area below to refresh, or use the refresh button for desktop testing.
        </p>
        
        <div class="demo-controls">
          <button (click)="manualRefresh()" class="refresh-btn" [disabled]="isRefreshing">
            <span class="refresh-icon" [class.spinning]="isRefreshing">🔄</span>
            {{ isRefreshing ? 'Refreshing...' : 'Manual Refresh' }}
          </button>
          <span class="last-refresh">Last refresh: {{ getTimeSince(lastRefresh) }}</span>
        </div>
        
        <div 
          class="pull-refresh-demo"
          #scrollContainer
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd()">
          
          <!-- Pull Indicator -->
          <div 
            class="pull-indicator"
            [style.height.px]="getPullHeight()"
            [style.opacity]="getPullOpacity()">
            <div class="pull-content" *ngIf="isPulling || isRefreshing">
              <div class="pull-icon" [class.can-refresh]="canRefresh" [class.refreshing]="isRefreshing">
                <svg 
                  class="pull-arrow"
                  [style.transform]="'rotate(' + getPullRotation() + 'deg)'"
                  *ngIf="!isRefreshing"
                  viewBox="0 0 24 24">
                  <path d="M12 2l4 4h-3v6h-2V6H8l4-4z" fill="currentColor"/>
                </svg>
                <div class="pull-spinner" *ngIf="isRefreshing">
                  <div class="spinner"></div>
                </div>
              </div>
              <span class="pull-text">
                <ng-container *ngIf="!isRefreshing">
                  {{ canRefresh ? 'Release to refresh' : 'Pull to refresh' }}
                </ng-container>
                <ng-container *ngIf="isRefreshing">
                  Refreshing...
                </ng-container>
              </span>
            </div>
          </div>
          
          <!-- Content List -->
          <div class="content-list">
            <div *ngFor="let item of items; trackBy: trackItem" class="content-item">
              <div class="item-header">
                <h3 class="item-title">{{ item.title }}</h3>
                <div class="item-actions">
                  <button class="like-btn">
                    ❤️ {{ item.likes }}
                  </button>
                </div>
              </div>
              <p class="item-description">{{ item.description }}</p>
              <div class="item-meta">
                <span class="item-author">{{ item.author }}</span>
                <span class="item-time">{{ getTimeSince(item.timestamp) }}</span>
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
          <h4 class="feature-name">Touch Gestures</h4>
          <p class="feature-description">Native mobile pull-to-refresh interaction</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Visual Feedback</h4>
          <p class="feature-description">Clear indicators for pull progress and state</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Smooth Animations</h4>
          <p class="feature-description">Fluid pull and release animations</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Customizable</h4>
          <p class="feature-description">Adjustable thresholds and styling</p>
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
        <h4 class="use-case-name">Social Media Feeds</h4>
        <p class="use-case-description">Refresh timeline and news feeds</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">📧</div>
        <h4 class="use-case-name">Email Apps</h4>
        <p class="use-case-description">Check for new messages</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">📰</div>
        <h4 class="use-case-name">News Applications</h4>
        <p class="use-case-description">Update latest articles and stories</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Pull Refresh Pattern Styles */
.pull-refresh-pattern-container {
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

.demo-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-3);
  background: var(--gray-50);
  border-radius: var(--radius-lg);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover:not(:disabled) {
    background: var(--primary-600);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.refresh-icon {
  font-size: var(--font-size-base);
  transition: transform var(--transition-normal);

  &.spinning {
    animation: spin 1s linear infinite;
  }
}

.last-refresh {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.pull-refresh-demo {
  height: 400px;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow-y: auto;
  background: var(--bg-primary);
  position: relative;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
  user-select: none;

  @media (max-width: 768px) {
    height: 350px;
  }
}

.pull-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, var(--primary-50), var(--primary-100));
  border-bottom: 1px solid var(--primary-200);
  transition: height 0.3s ease, opacity 0.3s ease;
  min-height: 0;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom, var(--primary-900), var(--primary-800));
    border-bottom-color: var(--primary-700);
  }
}

.pull-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
}

.pull-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-600);
  transition: all var(--transition-normal);

  &.can-refresh {
    color: var(--green-600);
  }

  &.refreshing {
    color: var(--primary-500);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--primary-400);

    &.can-refresh {
      color: var(--green-400);
    }
  }
}

.pull-arrow {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform var(--transition-normal);
}

.pull-spinner {
  width: 1.5rem;
  height: 1.5rem;
}

.spinner {
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-200);
  border-top: 2px solid var(--primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.pull-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

.content-list {
  padding: var(--spacing-4);
}

.content-item {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-secondary);
  transition: all var(--transition-normal);
  animation: slideIn 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--gray-50);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }
}

.item-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-2);
}

.item-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
  flex: 1;
  min-width: 0;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-left: var(--spacing-3);
}

.like-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  background: none;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--red-50);
    border-color: var(--red-200);
    color: var(--red-600);

    @media (prefers-color-scheme: dark) {
      background: var(--red-900);
      border-color: var(--red-700);
      color: var(--red-400);
    }
  }
}

.item-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 var(--spacing-3) 0;
}

.item-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.item-author {
  font-weight: 500;
}

.item-time {
  font-style: italic;
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

/* Animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .pull-refresh-pattern-container {
    padding: var(--spacing-4);
  }

  .demo-controls {
    flex-direction: column;
    gap: var(--spacing-2);
    text-align: center;
  }

  .item-header {
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .item-actions {
    margin-left: 0;
    align-self: flex-start;
  }

  .item-meta {
    flex-direction: column;
    gap: var(--spacing-1);
    align-items: flex-start;
  }

  .features-grid,
  .use-cases-grid {
    grid-template-columns: 1fr;
  }
}

/* Focus states for accessibility */
.refresh-btn:focus,
.like-btn:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}`;
  }

  get typescriptCode(): string {
    return `import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';

interface RefreshableItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  author: string;
  likes: number;
}

@Component({
  selector: 'app-pull-refresh',
  templateUrl: './pull-refresh.component.html',
  styleUrls: ['./pull-refresh.component.scss']
})
export class PullRefreshComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  
  items: RefreshableItem[] = [];
  isRefreshing = false;
  pullDistance = 0;
  pullThreshold = 80;
  isPulling = false;
  canRefresh = false;
  
  private startY = 0;
  private isScrolling = false;

  onTouchStart(event: TouchEvent): void {
    if (this.scrollContainer.nativeElement.scrollTop === 0 && !this.isRefreshing) {
      this.startY = event.touches[0].clientY;
      this.isScrolling = true;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isScrolling || this.isRefreshing) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;

    if (deltaY > 0 && this.scrollContainer.nativeElement.scrollTop === 0) {
      event.preventDefault();
      this.isPulling = true;
      this.pullDistance = Math.min(deltaY * 0.5, this.pullThreshold * 1.5);
      this.canRefresh = this.pullDistance >= this.pullThreshold;
    }
  }

  onTouchEnd(): void {
    if (this.isPulling && this.canRefresh && !this.isRefreshing) {
      this.triggerRefresh();
    } else {
      this.resetPull();
    }
    
    this.isScrolling = false;
  }

  triggerRefresh(): void {
    this.isRefreshing = true;
    this.pullDistance = this.pullThreshold;
    
    // Simulate API call
    setTimeout(() => {
      this.refreshData();
      this.isRefreshing = false;
      this.resetPull();
    }, 2000);
  }

  refreshData(): void {
    // Add new items to the top
    const newItems: RefreshableItem[] = [
      {
        id: \`new-\${Date.now()}\`,
        title: 'Fresh Content: Latest Updates Available',
        description: 'New content has been loaded from the server...',
        timestamp: new Date(),
        author: 'News Bot',
        likes: Math.floor(Math.random() * 100) + 50
      }
    ];
    
    this.items = [...newItems, ...this.items];
  }

  resetPull(): void {
    this.isPulling = false;
    this.pullDistance = 0;
    this.canRefresh = false;
  }

  getTimeSince(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return \`\${diffMins}m ago\`;
    return timestamp.toLocaleDateString();
  }

  getPullHeight(): number {
    return this.pullDistance;
  }

  getPullOpacity(): number {
    return Math.min(this.pullDistance / this.pullThreshold, 1);
  }

  getPullRotation(): number {
    return this.canRefresh ? 180 : (this.pullDistance / this.pullThreshold) * 180;
  }

  trackItem(index: number, item: RefreshableItem): string {
    return item.id;
  }
}`;
  }

  trackItem(index: number, item: RefreshableItem): string {
    return item.id;
  }
}