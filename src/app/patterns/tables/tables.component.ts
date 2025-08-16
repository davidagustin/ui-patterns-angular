import { Component } from '@angular/core';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'status' | 'actions';
}

interface TableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
  actions?: string[];
  [key: string]: any;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | null;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  currentPage = 1;
  itemsPerPage = 5;
  sortConfig: SortConfig = { key: '', direction: null };
  searchQuery = '';
  selectedRows: string[] = [];
  
  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', type: 'status', sortable: true },
    { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ];

  data: TableRow[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: new Date(2024, 0, 15, 14, 30),
      actions: ['edit', 'delete', 'view']
    },
    {
      id: '2', 
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: new Date(2024, 0, 14, 9, 15),
      actions: ['edit', 'view']
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com', 
      role: 'Viewer',
      status: 'inactive',
      lastLogin: new Date(2024, 0, 10, 16, 45),
      actions: ['view']
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'Editor',
      status: 'pending',
      lastLogin: new Date(2024, 0, 13, 11, 20),
      actions: ['edit', 'delete', 'view']
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: new Date(2024, 0, 16, 8, 30),
      actions: ['edit', 'delete', 'view']
    },
    {
      id: '6',
      name: 'Diana Prince',
      email: 'diana@example.com',
      role: 'Viewer',
      status: 'active',
      lastLogin: new Date(2024, 0, 12, 13, 45),
      actions: ['view']
    },
    {
      id: '7',
      name: 'Eve Davis',
      email: 'eve@example.com',
      role: 'Editor',
      status: 'inactive',
      lastLogin: new Date(2024, 0, 8, 15, 10),
      actions: ['edit', 'view']
    },
    {
      id: '8',
      name: 'Frank Miller',
      email: 'frank@example.com',
      role: 'Administrator',
      status: 'pending',
      lastLogin: new Date(2024, 0, 11, 10, 25),
      actions: ['edit', 'delete', 'view']
    }
  ];

  get filteredData(): TableRow[] {
    let filtered = this.data;
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(row => 
        row.name.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.role.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query)
      );
    }

    if (this.sortConfig.key && this.sortConfig.direction) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[this.sortConfig.key];
        const bVal = b[this.sortConfig.key];
        
        if (aVal < bVal) {
          return this.sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return this.sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }

  get paginatedData(): TableRow[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get totalItems(): number {
    return this.filteredData.length;
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get allSelected(): boolean {
    return this.paginatedData.length > 0 && 
           this.paginatedData.every(row => this.selectedRows.includes(row.id));
  }

  get someSelected(): boolean {
    return this.selectedRows.length > 0 && !this.allSelected;
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortConfig.key === column.key) {
      if (this.sortConfig.direction === 'asc') {
        this.sortConfig.direction = 'desc';
      } else if (this.sortConfig.direction === 'desc') {
        this.sortConfig.direction = null;
        this.sortConfig.key = '';
      } else {
        this.sortConfig.direction = 'asc';
      }
    } else {
      this.sortConfig.key = column.key;
      this.sortConfig.direction = 'asc';
    }
  }

  onSelectAll(): void {
    if (this.allSelected) {
      this.selectedRows = this.selectedRows.filter(id => 
        !this.paginatedData.some(row => row.id === id)
      );
    } else {
      const newSelections = this.paginatedData
        .filter(row => !this.selectedRows.includes(row.id))
        .map(row => row.id);
      this.selectedRows = [...this.selectedRows, ...newSelections];
    }
  }

  onSelectRow(rowId: string): void {
    const index = this.selectedRows.indexOf(rowId);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(rowId);
    }
  }

  isRowSelected(rowId: string): boolean {
    return this.selectedRows.includes(rowId);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onItemsPerPageChange(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1;
  }

  onAction(action: string, rowId: string): void {
    console.log(`Action: ${action} on row: ${rowId}`);
    // Implement action logic here
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  getCellValue(row: TableRow, column: TableColumn): any {
    return row[column.key];
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  get htmlCode(): string {
    return `<div class="table-container">
  <!-- Search and Controls -->
  <div class="table-controls">
    <div class="search-container">
      <input type="text" 
             class="search-input"
             placeholder="Search users..."
             [(ngModel)]="searchQuery">
      <button class="search-clear" 
              *ngIf="searchQuery"
              (click)="clearSearch()">×</button>
    </div>
    
    <div class="page-size-selector">
      <label for="pageSize">Show:</label>
      <select id="pageSize" 
              [value]="itemsPerPage"
              (change)="onItemsPerPageChange(+$event.target.value)">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>

  <!-- Data Table -->
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th class="select-column">
            <input type="checkbox"
                   [checked]="allSelected"
                   [indeterminate]="someSelected"
                   (change)="onSelectAll()">
          </th>
          <th *ngFor="let column of columns"
              [class.sortable]="column.sortable"
              (click)="onSort(column)">
            <div class="column-header">
              <span>{{ column.label }}</span>
              <span *ngIf="column.sortable" class="sort-indicator">
                <span class="sort-arrow up"
                      [class.active]="sortConfig.key === column.key && sortConfig.direction === 'asc'">▲</span>
                <span class="sort-arrow down"
                      [class.active]="sortConfig.key === column.key && sortConfig.direction === 'desc'">▼</span>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of paginatedData" 
            [class.selected]="isRowSelected(row.id)">
          <td class="select-column">
            <input type="checkbox"
                   [checked]="isRowSelected(row.id)"
                   (change)="onSelectRow(row.id)">
          </td>
          <td *ngFor="let column of columns" [attr.data-label]="column.label">
            <ng-container [ngSwitch]="column.type">
              <!-- Status Column -->
              <span *ngSwitchCase="'status'" 
                    class="status-badge"
                    [ngClass]="getStatusClass(getCellValue(row, column))">
                {{ getCellValue(row, column) | titlecase }}
              </span>
              
              <!-- Date Column -->
              <span *ngSwitchCase="'date'">
                {{ formatDate(getCellValue(row, column)) }}
              </span>
              
              <!-- Actions Column -->
              <div *ngSwitchCase="'actions'" class="actions-cell">
                <button *ngFor="let action of row.actions"
                        class="action-btn"
                        [class]="'action-' + action"
                        (click)="onAction(action, row.id)"
                        [title]="action | titlecase">
                  <span [ngSwitch]="action">
                    <span *ngSwitchCase="'edit'">✏️</span>
                    <span *ngSwitchCase="'delete'">🗑️</span>
                    <span *ngSwitchCase="'view'">👁️</span>
                    <span *ngSwitchDefault>{{ action }}</span>
                  </span>
                </button>
              </div>
              
              <!-- Default Text Column -->
              <span *ngSwitchDefault>{{ getCellValue(row, column) }}</span>
            </ng-container>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="table-footer">
    <div class="pagination-info">
      Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} entries
      <span *ngIf="selectedRows.length > 0">
        ({{ selectedRows.length }} selected)
      </span>
    </div>
    
    <div class="pagination-controls">
      <button class="pagination-btn"
              [disabled]="currentPage === 1"
              (click)="onPageChange(currentPage - 1)">
        Previous
      </button>
      
      <button *ngFor="let page of [].constructor(totalPages); let i = index"
              class="pagination-btn page-number"
              [class.active]="currentPage === i + 1"
              (click)="onPageChange(i + 1)">
        {{ i + 1 }}
      </button>
      
      <button class="pagination-btn"
              [disabled]="currentPage === totalPages"
              (click)="onPageChange(currentPage + 1)">
        Next
      </button>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Table Container */
.table-container {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
  }
}

/* Table Controls */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.search-container {
  position: relative;
  min-width: 250px;
  
  @media (max-width: 768px) {
    min-width: auto;
  }
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
    
    &::placeholder {
      color: #9ca3af;
    }
  }
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.25rem;
  
  &:hover {
    color: #374151;
  }
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  
  select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    
    @media (prefers-color-scheme: dark) {
      background: #374151;
      border-color: #4b5563;
      color: #f9fafb;
    }
  }
}

/* Table Wrapper */
.table-wrapper {
  overflow-x: auto;
}

/* Data Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    
    @media (prefers-color-scheme: dark) {
      border-bottom-color: #374151;
    }
  }
  
  th {
    background: #f9fafb;
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    &.sortable {
      cursor: pointer;
      user-select: none;
      
      &:hover {
        background: #f3f4f6;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      background: #111827;
      color: #d1d5db;
      
      &.sortable:hover {
        background: #1f2937;
      }
    }
  }
  
  tbody tr {
    transition: background-color 0.2s ease;
    
    &:hover {
      background: #f9fafb;
    }
    
    &.selected {
      background: #dbeafe;
      
      @media (prefers-color-scheme: dark) {
        background: #1e3a8a;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      &:hover {
        background: #1f2937;
      }
    }
  }
  
  td {
    color: #1f2937;
    font-size: 0.875rem;
    
    @media (prefers-color-scheme: dark) {
      color: #f9fafb;
    }
  }
}

.select-column {
  width: 40px;
  
  input[type="checkbox"] {
    cursor: pointer;
  }
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.sort-indicator {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.sort-arrow {
  font-size: 0.5rem;
  color: #d1d5db;
  transition: color 0.2s ease;
  
  &.active {
    color: #3b82f6;
  }
}

/* Status Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fef2f2;
  color: #991b1b;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

/* Actions Cell */
.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem;
  border: none;
  border-radius: 0.375rem;
  background: #f3f4f6;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }
  
  &.action-edit {
    background: #dbeafe;
    color: #1d4ed8;
    
    &:hover {
      background: #bfdbfe;
    }
  }
  
  &.action-delete {
    background: #fecaca;
    color: #dc2626;
    
    &:hover {
      background: #fca5a5;
    }
  }
  
  &.action-view {
    background: #d1fae5;
    color: #047857;
    
    &:hover {
      background: #a7f3d0;
    }
  }
}

/* Table Footer */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  @media (prefers-color-scheme: dark) {
    background: #111827;
    border-top-color: #374151;
  }
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
  
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.pagination-controls {
  display: flex;
  gap: 0.25rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
}

.pagination-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:first-child {
    border-radius: 0.375rem 0 0 0.375rem;
  }
  
  &:last-child {
    border-radius: 0 0.375rem 0.375rem 0;
  }
  
  &.page-number {
    border-radius: 0;
    min-width: 2.5rem;
    justify-content: center;
  }
  
  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }
  
  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
    
    &:hover:not(:disabled) {
      background: #4b5563;
    }
    
    &.active {
      background: #1d4ed8;
      border-color: #1d4ed8;
    }
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .data-table {
    th {
      display: none;
    }
    
    td {
      display: block;
      padding: 0.5rem 1rem;
      border: none;
      
      &:before {
        content: attr(data-label) ': ';
        font-weight: 600;
        color: #6b7280;
        display: inline-block;
        min-width: 100px;
      }
      
      &.select-column {
        display: table-cell;
        width: 40px;
        
        &:before {
          display: none;
        }
      }
    }
    
    tbody tr {
      display: table;
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'status' | 'date' | 'actions';
}

interface TableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
  actions?: string[];
  [key: string]: any;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  currentPage = 1;
  itemsPerPage = 5;
  sortConfig = { key: '', direction: null };
  searchQuery = '';
  selectedRows: string[] = [];
  
  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', type: 'status', sortable: true },
    { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ];

  data: TableRow[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: new Date(),
      actions: ['edit', 'delete', 'view']
    }
    // ... more data
  ];

  get filteredData(): TableRow[] {
    let filtered = this.data;
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(row => 
        row.name.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;
    // Sort logic here
  }

  onSelectAll(): void {
    // Select all logic
  }

  onSelectRow(rowId: string): void {
    // Row selection logic
  }

  onAction(action: string, rowId: string): void {
    console.log(\`Action: \${action} on row: \${rowId}\`);
  }
}`;
  }
}