import { Component } from '@angular/core';

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  showInfo: boolean;
  showFirstLast: boolean;
  maxVisiblePages: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  currentPage = 1;
  totalPages = 25;
  itemsPerPage = 10;
  totalItems = 248;
  showInfo = true;
  showFirstLast = true;
  maxVisiblePages = 5;

  // Demo configurations
  demoConfigs = [
    { label: 'Default (248 items, 25 pages)', totalItems: 248, totalPages: 25, itemsPerPage: 10 },
    { label: 'Small dataset (35 items, 4 pages)', totalItems: 35, totalPages: 4, itemsPerPage: 10 },
    { label: 'Large dataset (5000 items, 500 pages)', totalItems: 5000, totalPages: 500, itemsPerPage: 10 },
    { label: 'Different page size (100 items, 5 pages)', totalItems: 100, totalPages: 5, itemsPerPage: 20 }
  ];

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.totalPages;
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    let start = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

    // Adjust start if we don't have enough pages at the end
    if (end - start + 1 < this.maxVisiblePages) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  shouldShowLeftEllipsis(): boolean {
    const visiblePages = this.getVisiblePages();
    return visiblePages.length > 0 && visiblePages[0] > 2;
  }

  shouldShowRightEllipsis(): boolean {
    const visiblePages = this.getVisiblePages();
    return visiblePages.length > 0 && visiblePages[visiblePages.length - 1] < this.totalPages - 1;
  }

  applyDemoConfig(config: any): void {
    this.totalItems = config.totalItems;
    this.totalPages = config.totalPages;
    this.itemsPerPage = config.itemsPerPage;
    this.currentPage = 1;
  }

  getStartItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newPageSize = parseInt(target.value);
    const currentItem = this.getStartItem();
    
    this.itemsPerPage = newPageSize;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = Math.ceil(currentItem / this.itemsPerPage);
  }

  get htmlCode(): string {
    return `<div class="pagination-demo">
  <!-- Pagination Info -->
  <div *ngIf="showInfo" class="pagination-info">
    <span>Showing {{ getStartItem() }} to {{ getEndItem() }} of {{ totalItems }} entries</span>
  </div>

  <!-- Main Pagination -->
  <nav class="pagination-nav" aria-label="Pagination Navigation">
    <!-- First Page Button -->
    <button 
      *ngIf="showFirstLast"
      (click)="firstPage()"
      [disabled]="currentPage === 1"
      class="pagination-btn first-btn"
      aria-label="Go to first page">
      ⟨⟨
    </button>

    <!-- Previous Button -->
    <button 
      (click)="previousPage()"
      [disabled]="currentPage === 1"
      class="pagination-btn prev-btn"
      aria-label="Go to previous page">
      <span class="btn-text">⟨ Previous</span>
    </button>

    <!-- First Page (always visible for large sets) -->
    <button 
      *ngIf="shouldShowLeftEllipsis()"
      (click)="goToPage(1)"
      [class.active]="currentPage === 1"
      class="pagination-btn page-btn">
      1
    </button>

    <!-- Left Ellipsis -->
    <span *ngIf="shouldShowLeftEllipsis()" class="pagination-ellipsis">...</span>

    <!-- Visible Page Numbers -->
    <div class="pagination-pages">
      <button 
        *ngFor="let page of getVisiblePages()"
        (click)="goToPage(page)"
        [class.active]="page === currentPage"
        class="pagination-btn page-btn"
        [attr.aria-label]="'Go to page ' + page"
        [attr.aria-current]="page === currentPage ? 'page' : null">
        {{ page }}
      </button>
    </div>

    <!-- Right Ellipsis -->
    <span *ngIf="shouldShowRightEllipsis()" class="pagination-ellipsis">...</span>

    <!-- Last Page (always visible for large sets) -->
    <button 
      *ngIf="shouldShowRightEllipsis()"
      (click)="goToPage(totalPages)"
      [class.active]="currentPage === totalPages"
      class="pagination-btn page-btn">
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button 
      (click)="nextPage()"
      [disabled]="currentPage === totalPages"
      class="pagination-btn next-btn"
      aria-label="Go to next page">
      <span class="btn-text">Next ⟩</span>
    </button>

    <!-- Last Page Button -->
    <button 
      *ngIf="showFirstLast"
      (click)="lastPage()"
      [disabled]="currentPage === totalPages"
      class="pagination-btn last-btn"
      aria-label="Go to last page">
      ⟩⟩
    </button>
  </nav>

  <!-- Items Per Page Selector -->
  <div class="pagination-controls">
    <label for="pageSize">Items per page:</label>
    <select id="pageSize" 
            [value]="itemsPerPage" 
            (change)="onPageSizeChange($event)"
            class="form-select">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `.pagination-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  align-items: center;
  max-width: 100%;
}

.pagination-info {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  text-align: center;
}

.pagination-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-pages {
  display: flex;
  gap: var(--spacing-1);
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
  font-weight: 500;
  min-width: 40px;
  color: var(--text-primary);

  &:hover:not(:disabled) {
    background: var(--bg-secondary);
    border-color: var(--border-secondary);
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--bg-secondary);
    color: var(--text-tertiary);
  }

  &.active {
    background: var(--primary-600);
    border-color: var(--primary-600);
    color: white;

    &:hover {
      background: var(--primary-700);
      border-color: var(--primary-700);
    }
  }

  &.prev-btn,
  &.next-btn {
    gap: var(--spacing-1);
    padding: var(--spacing-2) var(--spacing-4);
  }

  &.first-btn,
  &.last-btn {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-base);
  }
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-1);
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
  user-select: none;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);

  label {
    white-space: nowrap;
  }

  .form-select {
    min-width: 80px;
  }
}

// Responsive design
@media (max-width: 768px) {
  .pagination-container {
    gap: var(--spacing-3);
  }

  .pagination-nav {
    gap: var(--spacing-1);
  }

  .pagination-btn {
    padding: var(--spacing-1) var(--spacing-2);
    font-size: var(--font-size-xs);
    min-width: 32px;

    &.prev-btn,
    &.next-btn {
      padding: var(--spacing-1) var(--spacing-3);
    }
  }

  .pagination-controls {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-1);
  }
}

@media (max-width: 480px) {
  .pagination-nav {
    .prev-btn,
    .next-btn {
      span {
        display: none;
      }
    }

    .first-btn,
    .last-btn {
      display: none;
    }
  }

  .pagination-btn.prev-btn::after {
    content: '⟨';
  }

  .pagination-btn.next-btn::after {
    content: '⟩';
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  currentPage = 1;
  totalPages = 25;
  itemsPerPage = 10;
  totalItems = 248;
  showInfo = true;
  showFirstLast = true;
  maxVisiblePages = 5;

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.totalPages;
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    let start = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

    if (end - start + 1 < this.maxVisiblePages) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  shouldShowLeftEllipsis(): boolean {
    const visiblePages = this.getVisiblePages();
    return visiblePages.length > 0 && visiblePages[0] > 2;
  }

  shouldShowRightEllipsis(): boolean {
    const visiblePages = this.getVisiblePages();
    return visiblePages.length > 0 && visiblePages[visiblePages.length - 1] < this.totalPages - 1;
  }

  getStartItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newPageSize = parseInt(target.value);
    const currentItem = this.getStartItem();
    
    this.itemsPerPage = newPageSize;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = Math.ceil(currentItem / this.itemsPerPage);
  }
}`;
  }
}