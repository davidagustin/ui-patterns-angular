import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  currentPage = 1;
  totalPages = 10;
  itemsPerPage = 10;
  totalItems = 95;

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

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  get htmlCode(): string {
    return `<div class="pagination-container">
  <div class="pagination-info">
    <span>Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
    {{ Math.min(currentPage * itemsPerPage, totalItems) }} of {{ totalItems }} entries</span>
  </div>

  <nav class="pagination-nav" aria-label="Pagination">
    <button 
      (click)="previousPage()"
      [disabled]="currentPage === 1"
      class="pagination-button prev">
      ê Previous
    </button>

    <div class="pagination-pages">
      <button 
        *ngFor="let page of getVisiblePages()"
        (click)="goToPage(page)"
        [class.active]="page === currentPage"
        class="pagination-button page">
        {{ page }}
      </button>
    </div>

    <button 
      (click)="nextPage()"
      [disabled]="currentPage === totalPages"
      class="pagination-button next">
      Next í
    </button>
  </nav>
</div>`;
  }

  get scssCode(): string {
    return `/* Pagination Container */
.pagination-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.pagination-info {
  color: #6b7280;
  font-size: 14px;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Pagination Navigation */
.pagination-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-pages {
  display: flex;
  gap: 4px;
}

/* Pagination Buttons */
.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f9fafb;
  }

  &.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &.prev,
  &.next {
    gap: 4px;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;

    &:hover:not(:disabled) {
      background: #374151;
    }

    &:disabled {
      background: #111827;
      color: #6b7280;
    }

    &.active {
      background: #3b82f6;
      border-color: #3b82f6;
    }
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .pagination-container {
    gap: 12px;
  }

  .pagination-nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .pagination-button {
    padding: 6px 8px;
    font-size: 13px;
    min-width: 36px;
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
  totalPages = 10;
  itemsPerPage = 10;
  totalItems = 95;

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

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}`;
  }
}