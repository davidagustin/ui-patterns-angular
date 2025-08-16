import { Component } from '@angular/core';

interface DataGridColumn {
  key: string;
  label: string;
  sortable?: boolean;
  editable?: boolean;
  type?: 'text' | 'email' | 'select' | 'number';
  options?: string[];
}

interface DataGridRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  projects: number;
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  searchTerm = '';
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRows = new Set<number>();
  editingCell: { rowId: number; field: string } | null = null;
  viewMode: 'table' | 'cards' = 'table';

  columns: DataGridColumn[] = [
    { key: 'name', label: 'Name', sortable: true, editable: true, type: 'text' },
    { key: 'email', label: 'Email', sortable: true, editable: true, type: 'email' },
    { key: 'role', label: 'Role', sortable: true, editable: true, type: 'select', options: ['Admin', 'Developer', 'Designer', 'Manager'] },
    { key: 'status', label: 'Status', sortable: true, editable: true, type: 'select', options: ['Active', 'Inactive', 'Pending'] },
    { key: 'lastActive', label: 'Last Active', sortable: true },
    { key: 'projects', label: 'Projects', sortable: true, editable: true, type: 'number' }
  ];

  data: DataGridRow[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2024-01-15', projects: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', lastActive: '2024-01-14', projects: 3 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Designer', status: 'Inactive', lastActive: '2024-01-10', projects: 2 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Manager', status: 'Active', lastActive: '2024-01-15', projects: 8 },
    { id: 5, name: 'Chris Wilson', email: 'chris@example.com', role: 'Developer', status: 'Pending', lastActive: '2024-01-12', projects: 4 },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Designer', status: 'Active', lastActive: '2024-01-13', projects: 6 },
    { id: 7, name: 'David Lee', email: 'david@example.com', role: 'Admin', status: 'Active', lastActive: '2024-01-14', projects: 7 },
    { id: 8, name: 'Lisa Garcia', email: 'lisa@example.com', role: 'Developer', status: 'Inactive', lastActive: '2024-01-08', projects: 2 }
  ];

  get filteredData(): DataGridRow[] {
    if (!this.searchTerm) {
      return this.data;
    }

    const term = this.searchTerm.toLowerCase();
    return this.data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  }

  get sortedData(): DataGridRow[] {
    const filtered = this.filteredData;
    
    if (!this.sortField) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[this.sortField as keyof DataGridRow];
      const bValue = b[this.sortField as keyof DataGridRow];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return this.sortDirection === 'desc' ? -comparison : comparison;
    });
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  onSelectAll(): void {
    if (this.selectedRows.size === this.sortedData.length) {
      this.selectedRows.clear();
    } else {
      this.selectedRows = new Set(this.sortedData.map(row => row.id));
    }
  }

  onSelectRow(id: number): void {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  onEditCell(rowId: number, field: string): void {
    this.editingCell = { rowId, field };
  }

  onSaveCell(value: string): void {
    if (this.editingCell) {
      const row = this.data.find(r => r.id === this.editingCell!.rowId);
      if (row) {
        (row as any)[this.editingCell.field] = value;
      }
      this.editingCell = null;
    }
  }

  onCancelEdit(): void {
    this.editingCell = null;
  }

  deleteSelected(): void {
    this.data = this.data.filter(row => !this.selectedRows.has(row.id));
    this.selectedRows.clear();
  }

  exportData(): void {
    const csv = this.convertToCSV(this.sortedData);
    this.downloadCSV(csv, 'data-export.csv');
  }

  private convertToCSV(data: DataGridRow[]): string {
    const headers = this.columns.map(col => col.label).join(',');
    const rows = data.map(row => 
      this.columns.map(col => row[col.key as keyof DataGridRow]).join(',')
    );
    return [headers, ...rows].join('\n');
  }

  private downloadCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getStatusClass(status: string): string {
    const classes = {
      'Active': 'status-active',
      'Inactive': 'status-inactive', 
      'Pending': 'status-pending'
    };
    return classes[status as keyof typeof classes] || '';
  }

  getRowValue(row: DataGridRow, key: string): any {
    return (row as any)[key];
  }

  get htmlCode(): string {
    return `<!-- Data Grid Container -->
<div class="data-grid-container">
  <!-- Controls -->
  <div class="grid-controls">
    <div class="search-section">
      <input
        type="text"
        placeholder="Search all fields..."
        [(ngModel)]="searchTerm"
        class="search-input">
      <span class="result-count">{{ filteredData.length }} of {{ data.length }} records</span>
    </div>
    
    <div class="action-section">
      <button (click)="viewMode = viewMode === 'table' ? 'cards' : 'table'"
              class="view-toggle-btn">
        {{ viewMode === 'table' ? '=� Cards' : '=� Table' }}
      </button>
      
      <button *ngIf="selectedRows.size > 0"
              (click)="deleteSelected()"
              class="delete-btn">
        Delete ({{ selectedRows.size }})
      </button>
      
      <button (click)="exportData()" class="export-btn">
        Export CSV
      </button>
    </div>
  </div>

  <!-- Data Table -->
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th class="select-column">
            <input type="checkbox"
                   [checked]="selectedRows.size === sortedData.length && sortedData.length > 0"
                   (change)="onSelectAll()">
          </th>
          <th *ngFor="let column of columns"
              [class.sortable]="column.sortable"
              (click)="column.sortable && onSort(column.key)">
            <div class="header-content">
              <span>{{ column.label }}</span>
              <svg *ngIf="column.sortable" class="sort-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of sortedData"
            [class.selected]="selectedRows.has(row.id)">
          <td class="select-column">
            <input type="checkbox"
                   [checked]="selectedRows.has(row.id)"
                   (change)="onSelectRow(row.id)">
          </td>
          <td *ngFor="let column of columns"
              [class.editable]="column.editable"
              (click)="column.editable && onEditCell(row.id, column.key)">
            
            <!-- Editable Cell -->
            <div *ngIf="editingCell?.rowId === row.id && editingCell?.field === column.key">
              <input *ngIf="column.type !== 'select'"
                     [type]="column.type || 'text'"
                     [value]="row[column.key]"
                     (blur)="onSaveCell($event.target.value)"
                     (keydown.enter)="onSaveCell($event.target.value)"
                     (keydown.escape)="onCancelEdit()"
                     class="edit-input"
                     autofocus>
              
              <select *ngIf="column.type === 'select'"
                      [value]="row[column.key]"
                      (blur)="onSaveCell($event.target.value)"
                      (change)="onSaveCell($event.target.value)"
                      class="edit-select"
                      autofocus>
                <option *ngFor="let option of column.options" [value]="option">
                  {{ option }}
                </option>
              </select>
            </div>
            
            <!-- Display Cell -->
            <div *ngIf="editingCell?.rowId !== row.id || editingCell?.field !== column.key"
                 class="cell-content">
              <span *ngIf="column.key !== 'status'">{{ row[column.key] }}</span>
              <span *ngIf="column.key === 'status'" 
                    [class]="'status-badge ' + getStatusClass(row.status)">
                {{ row.status }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Data Grid Container */
.data-grid-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

/* Grid Controls */
.grid-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.search-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  min-width: 250px;

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}

.result-count {
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.action-section {
  display: flex;
  gap: 8px;
  align-items: center;
}

.view-toggle-btn,
.delete-btn,
.export-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-toggle-btn {
  background: #3b82f6;
  color: white;
  &:hover { background: #2563eb; }
}

.delete-btn {
  background: #ef4444;
  color: white;
  &:hover { background: #dc2626; }
}

.export-btn {
  background: #10b981;
  color: white;
  &:hover { background: #059669; }
}

/* Table Container */
.table-container {
  overflow-x: auto;
}

/* Data Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f9fafb;

  @media (prefers-color-scheme: dark) {
    background: #111827;
  }
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.data-table th {
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.sortable {
    cursor: pointer;
    user-select: none;

    &:hover {
      background: #f3f4f6;

      @media (prefers-color-scheme: dark) {
        background: #1f2937;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort-icon {
  width: 16px;
  height: 16px;
  opacity: 0.5;
}

.select-column {
  width: 48px;
  text-align: center;
}

.data-table tbody tr {
  transition: background-color 0.2s ease;

  &:hover {
    background: #f9fafb;

    @media (prefers-color-scheme: dark) {
      background: #374151;
    }
  }

  &.selected {
    background: #eff6ff;

    @media (prefers-color-scheme: dark) {
      background: #1e3a8a;
    }
  }
}

.data-table td {
  color: #374151;
  font-size: 14px;

  &.editable {
    cursor: pointer;

    &:hover {
      background: #f3f4f6;

      @media (prefers-color-scheme: dark) {
        background: #4b5563;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* Cell Content */
.cell-content {
  min-height: 20px;
  display: flex;
  align-items: center;
}

/* Edit Controls */
.edit-input,
.edit-select {
  width: 100%;
  padding: 4px 8px;
  border: 2px solid #3b82f6;
  border-radius: 4px;
  font-size: 14px;
  background: white;

  @media (prefers-color-scheme: dark) {
    background: #374151;
    color: #f9fafb;
  }
}

/* Status Badge */
.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  &.status-active {
    background: #dcfce7;
    color: #166534;
  }

  &.status-inactive {
    background: #fecaca;
    color: #991b1b;
  }

  &.status-pending {
    background: #fef3c7;
    color: #92400e;
  }

  @media (prefers-color-scheme: dark) {
    &.status-active {
      background: #166534;
      color: #bbf7d0;
    }

    &.status-inactive {
      background: #991b1b;
      color: #fca5a5;
    }

    &.status-pending {
      background: #92400e;
      color: #fde68a;
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .data-table {
    font-size: 12px;
  }

  .data-table th,
  .data-table td {
    padding: 8px;
  }

  .search-input {
    min-width: auto;
    width: 100%;
  }

  .action-section {
    width: 100%;
    justify-content: space-between;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface DataGridColumn {
  key: string;
  label: string;
  sortable?: boolean;
  editable?: boolean;
  type?: 'text' | 'email' | 'select' | 'number';
  options?: string[];
}

interface DataGridRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  projects: number;
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  searchTerm = '';
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRows = new Set<number>();
  editingCell: { rowId: number; field: string } | null = null;

  columns: DataGridColumn[] = [
    { key: 'name', label: 'Name', sortable: true, editable: true, type: 'text' },
    { key: 'email', label: 'Email', sortable: true, editable: true, type: 'email' },
    { key: 'role', label: 'Role', sortable: true, editable: true, type: 'select', options: ['Admin', 'Developer', 'Designer'] },
    { key: 'status', label: 'Status', sortable: true, editable: true, type: 'select', options: ['Active', 'Inactive', 'Pending'] }
  ];

  data: DataGridRow[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2024-01-15', projects: 5 }
    // ... more data
  ];

  get filteredData(): DataGridRow[] {
    if (!this.searchTerm) return this.data;
    
    const term = this.searchTerm.toLowerCase();
    return this.data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  onSelectRow(id: number): void {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  onEditCell(rowId: number, field: string): void {
    this.editingCell = { rowId, field };
  }

  exportData(): void {
    const csv = this.convertToCSV(this.sortedData);
    this.downloadCSV(csv, 'data-export.csv');
  }
}`;
  }
}