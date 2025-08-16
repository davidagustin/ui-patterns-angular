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
