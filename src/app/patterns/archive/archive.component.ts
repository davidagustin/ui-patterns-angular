import { Component } from '@angular/core';

interface ArchiveItem {
  id: number;
  title: string;
  status: 'Active' | 'Completed' | 'Archived';
  date: string;
  category: string;
}

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  archivedItems = new Set<number>();
  showArchived = false;

  items: ArchiveItem[] = [
    { id: 1, title: 'Project Alpha', status: 'Active', date: '2024-01-15', category: 'Development' },
    { id: 2, title: 'Marketing Campaign Q1', status: 'Completed', date: '2024-01-10', category: 'Marketing' },
    { id: 3, title: 'User Research Study', status: 'Active', date: '2024-01-20', category: 'Research' },
    { id: 4, title: 'Budget Planning 2023', status: 'Archived', date: '2023-12-31', category: 'Finance' },
    { id: 5, title: 'Product Launch Strategy', status: 'Completed', date: '2024-01-05', category: 'Strategy' },
    { id: 6, title: 'Team Building Event', status: 'Active', date: '2024-01-25', category: 'HR' },
    { id: 7, title: 'Q4 Sales Report', status: 'Archived', date: '2023-12-15', category: 'Sales' },
    { id: 8, title: 'Website Redesign', status: 'Active', date: '2024-01-18', category: 'Design' }
  ];

  toggleArchive(id: number): void {
    if (this.archivedItems.has(id)) {
      this.archivedItems.delete(id);
    } else {
      this.archivedItems.add(id);
    }
  }

  isArchived(id: number): boolean {
    return this.archivedItems.has(id);
  }

  toggleView(showArchived: boolean): void {
    this.showArchived = showArchived;
  }

  get filteredItems(): ArchiveItem[] {
    return this.items.filter(item => 
      this.showArchived ? this.isArchived(item.id) : !this.isArchived(item.id)
    );
  }

  get activeItems(): ArchiveItem[] {
    return this.items.filter(item => !this.isArchived(item.id));
  }

  get archivedCount(): number {
    return this.archivedItems.size;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'green';
      case 'Completed': return 'blue';
      default: return 'gray';
    }
  }

  get exampleCode(): string {
    return `<!-- Basic Archive Example -->
<div class="simple-archive">
  <div class="archive-controls">
    <div class="view-tabs">
      <button 
        (click)="setView('active')"
        [class.active]="currentView === 'active'"
        class="view-tab">
        Active ({{ activeCount }})
      </button>
      <button 
        (click)="setView('archived')"
        [class.active]="currentView === 'archived'"
        class="view-tab">
        Archived ({{ archivedCount }})
      </button>
    </div>
  </div>

  <div class="items-list">
    <div 
      *ngFor="let item of filteredItems"
      class="item-card"
      [class.archived]="isArchived(item.id)">
      
      <div class="item-content">
        <div 
          class="status-indicator"
          [ngClass]="item.status.toLowerCase()">
        </div>
        <div class="item-info">
          <h3 class="item-title">{{ item.title }}</h3>
          <div class="item-meta">
            <span class="item-category">{{ item.category }}</span>
            <span class="item-date">{{ formatDate(item.date) }}</span>
          </div>
        </div>
      </div>
      
      <button 
        (click)="toggleArchive(item.id)"
        class="archive-button"
        [class.unarchive]="isArchived(item.id)"
        [attr.aria-label]="isArchived(item.id) ? 'Unarchive item' : 'Archive item'">
        
        <svg *ngIf="isArchived(item.id)" class="archive-icon" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" />
        </svg>
        <svg *ngIf="!isArchived(item.id)" class="archive-icon" viewBox="0 0 24 24">
          <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </button>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class SimpleArchive {
  archivedItems = new Set<number>();
  currentView: 'active' | 'archived' = 'active';
  
  toggleArchive(id: number) {
    if (this.archivedItems.has(id)) {
      this.archivedItems.delete(id);
    } else {
      this.archivedItems.add(id);
    }
  }
  
  isArchived(id: number): boolean {
    return this.archivedItems.has(id);
  }
  
  setView(view: 'active' | 'archived') {
    this.currentView = view;
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="archive-pattern-container">
  <div class="pattern-header">
    <h1 class="pattern-title gradient-text">📦 Archive Pattern</h1>
    <p class="pattern-description">
      Organize and manage items by archiving them. Keep active items visible while storing completed or old items in an archive.
    </p>
  </div>

  <div class="pattern-layout">
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Click on section headers to expand or collapse content. Multiple sections can be open simultaneously.
        </p>
        
        <!-- Archive Controls -->
        <div class="archive-controls">
          <div class="view-tabs">
            <button
              (click)="toggleView(false)"
              class="view-tab"
              [class.active]="!showArchived">
              Active ({{ activeItems.length }})
            </button>
            <button
              (click)="toggleView(true)"
              class="view-tab"
              [class.active]="showArchived">
              Archived ({{ archivedCount }})
            </button>
          </div>
          
          <button 
            *ngIf="!showArchived && archivedCount > 0"
            (click)="toggleView(true)"
            class="archive-link">
            View Archive →
          </button>
        </div>

        <!-- Items List -->
        <div class="items-list">
          <div 
            *ngFor="let item of filteredItems"
            class="item-card"
            [class.archived]="isArchived(item.id)">
            
            <div class="item-content">
              <div 
                class="status-indicator"
                [ngClass]="getStatusColor(item.status)">
              </div>
              <div class="item-info">
                <h3 class="item-title">{{ item.title }}</h3>
                <div class="item-meta">
                  <span class="item-category">{{ item.category }}</span>
                  <span class="separator">•</span>
                  <span class="item-date">{{ formatDate(item.date) }}</span>
                </div>
              </div>
            </div>
            
            <button 
              (click)="toggleArchive(item.id)"
              class="archive-button"
              [class.unarchive]="isArchived(item.id)"
              [attr.aria-label]="isArchived(item.id) ? 'Unarchive item' : 'Archive item'">
              
              <svg *ngIf="isArchived(item.id)" class="archive-icon" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg *ngIf="!isArchived(item.id)" class="archive-icon" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>
          </div>

          <!-- Empty State -->
          <div *ngIf="filteredItems.length === 0" class="empty-state">
            <div class="empty-icon">📦</div>
            <p class="empty-title">
              {{ showArchived ? 'No archived items' : 'No active items' }}
            </p>
            <p class="empty-text">
              {{ showArchived 
                ? 'Items you archive will appear here' 
                : 'All items have been archived' }}
            </p>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div 
          *ngIf="!showArchived && activeItems.length > 0"
          class="bulk-actions">
          <h3 class="bulk-actions-title">Bulk Actions</h3>
          <div class="action-buttons">
            <button class="action-button primary">Archive Selected</button>
            <button class="action-button secondary">Select All</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Archive Pattern Styles */
.archive-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8);
  color: var(--text-primary);
}

/* Pattern Header */
.pattern-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.pattern-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
  background: linear-gradient(135deg, var(--primary-600), var(--purple-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pattern-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Pattern Layout */
.pattern-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
}

/* Example Section */
.example-section {
  background: linear-gradient(135deg, var(--primary-50), var(--purple-50));
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  border: 1px solid var(--primary-200);

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, var(--primary-900/20), var(--purple-900/20));
    border-color: var(--primary-800);
  }
}

.example-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.example-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--primary-800);
  margin-bottom: var(--spacing-4);

  @media (prefers-color-scheme: dark) {
    color: var(--primary-200);
  }
}

.example-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-6);
  line-height: 1.6;
}

/* Archive Controls */
.archive-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-6);
  gap: var(--spacing-4);
}

.view-tabs {
  display: flex;
  gap: var(--spacing-2);
  background: var(--gray-100);
  padding: var(--spacing-1);
  border-radius: var(--radius-lg);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.view-tab {
  padding: var(--spacing-2) var(--spacing-4);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-secondary);
  white-space: nowrap;

  &:hover {
    background: var(--gray-200);
    color: var(--text-primary);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }

  &.active {
    background: var(--primary-600);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover {
      background: var(--primary-700);
    }
  }
}

.archive-link {
  color: var(--primary-600);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: none;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &:hover {
    color: var(--primary-800);
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      color: var(--primary-400);
      background: var(--primary-900/20);
    }
  }

  @media (prefers-color-scheme: dark) {
    color: var(--primary-400);
  }
}

/* Items List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
}

/* Item Card */
.item-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
    border-color: var(--primary-300);
  }

  &.archived {
    background: var(--gray-50);
    opacity: 0.75;
    border-color: var(--gray-300);

    &:hover {
      transform: none;
      box-shadow: var(--shadow-sm);
      border-color: var(--gray-400);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--gray-900);
      border-color: var(--gray-700);

      &:hover {
        border-color: var(--gray-600);
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
    border-color: var(--gray-700);

    &:hover {
      border-color: var(--primary-500);
    }
  }
}

/* Item Content */
.item-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  flex: 1;
  min-width: 0;
}

.status-indicator {
  width: var(--spacing-3);
  height: var(--spacing-3);
  border-radius: 50%;
  flex-shrink: 0;

  &.green {
    background: var(--green-500);
  }

  &.blue {
    background: var(--blue-500);
  }

  &.gray {
    background: var(--gray-400);
  }
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  margin: 0 0 var(--spacing-1) 0;
  
  .item-card.archived & {
    color: var(--text-tertiary);
  }
}

.item-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.item-category {
  color: var(--primary-600);
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    color: var(--primary-400);
  }
}

.separator {
  color: var(--text-tertiary);
}

.item-date {
  color: var(--text-secondary);
}

/* Archive Button */
.archive-button {
  padding: var(--spacing-2);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--gray-100);
    color: var(--text-secondary);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }

  &.unarchive {
    color: var(--primary-600);

    &:hover {
      background: var(--primary-50);
      color: var(--primary-700);

      @media (prefers-color-scheme: dark) {
        background: var(--primary-900/20);
        color: var(--primary-400);
      }
    }

    @media (prefers-color-scheme: dark) {
      color: var(--primary-400);
    }
  }
}

.archive-icon {
  width: var(--spacing-5);
  height: var(--spacing-5);
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-12) var(--spacing-4);
  color: var(--text-secondary);
}

.empty-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.empty-title {
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.empty-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Bulk Actions */
.bulk-actions {
  padding: var(--spacing-4);
  background: var(--yellow-50);
  border: 1px solid var(--yellow-200);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-4);

  @media (prefers-color-scheme: dark) {
    background: var(--yellow-900/20);
    border-color: var(--yellow-800);
  }
}

.bulk-actions-title {
  font-weight: 600;
  color: var(--yellow-800);
  margin: 0 0 var(--spacing-3) 0;
  font-size: var(--font-size-base);

  @media (prefers-color-scheme: dark) {
    color: var(--yellow-200);
  }
}

.action-buttons {
  display: flex;
  gap: var(--spacing-2);
}

.action-button {
  padding: var(--spacing-2) var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &.primary {
    background: var(--yellow-600);
    color: white;

    &:hover {
      background: var(--yellow-700);
    }
  }

  &.secondary {
    background: var(--gray-200);
    color: var(--text-primary);

    &:hover {
      background: var(--gray-300);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
      color: var(--gray-200);

      &:hover {
        background: var(--gray-600);
      }
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .archive-pattern-container {
    padding: var(--spacing-4);
  }

  .archive-controls {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-3);
  }

  .view-tabs {
    justify-content: center;
  }

  .item-card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .item-content {
    width: 100%;
  }

  .archive-button {
    align-self: flex-end;
  }

  .action-buttons {
    flex-direction: column;
  }
}

/* Focus states for accessibility */
.view-tab:focus,
.archive-button:focus,
.action-button:focus,
.archive-link:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface ArchiveItem {
  id: number;
  title: string;
  status: 'Active' | 'Completed' | 'Archived';
  date: string;
  category: string;
}

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  archivedItems = new Set<number>();
  showArchived = false;

  items: ArchiveItem[] = [
    { id: 1, title: 'Project Alpha', status: 'Active', date: '2024-01-15', category: 'Development' },
    { id: 2, title: 'Marketing Campaign Q1', status: 'Completed', date: '2024-01-10', category: 'Marketing' },
    { id: 3, title: 'User Research Study', status: 'Active', date: '2024-01-20', category: 'Research' },
    { id: 4, title: 'Budget Planning 2023', status: 'Archived', date: '2023-12-31', category: 'Finance' },
    { id: 5, title: 'Product Launch Strategy', status: 'Completed', date: '2024-01-05', category: 'Strategy' },
    { id: 6, title: 'Team Building Event', status: 'Active', date: '2024-01-25', category: 'HR' },
    { id: 7, title: 'Q4 Sales Report', status: 'Archived', date: '2023-12-15', category: 'Sales' },
    { id: 8, title: 'Website Redesign', status: 'Active', date: '2024-01-18', category: 'Design' }
  ];

  toggleArchive(id: number): void {
    if (this.archivedItems.has(id)) {
      this.archivedItems.delete(id);
    } else {
      this.archivedItems.add(id);
    }
  }

  isArchived(id: number): boolean {
    return this.archivedItems.has(id);
  }

  toggleView(showArchived: boolean): void {
    this.showArchived = showArchived;
  }

  get filteredItems(): ArchiveItem[] {
    return this.items.filter(item => 
      this.showArchived ? this.isArchived(item.id) : !this.isArchived(item.id)
    );
  }

  get activeItems(): ArchiveItem[] {
    return this.items.filter(item => !this.isArchived(item.id));
  }

  get archivedCount(): number {
    return this.archivedItems.size;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'green';
      case 'Completed': return 'blue';
      default: return 'gray';
    }
  }
}`;
  }
}