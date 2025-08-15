import { Component } from '@angular/core';

interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

@Component({
  selector: 'app-alternating-rows',
  templateUrl: './alternating-rows.component.html',
  styleUrls: ['./alternating-rows.component.scss']
})
export class AlternatingRowsComponent {
  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRows = new Set<number>();

  data: TableData[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15' },
    { id: 5, name: 'Eva Brown', email: 'eva@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-13' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-08' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15' },
    { id: 8, name: 'Henry Taylor', email: 'henry@example.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-12' },
  ];

  get sortedData(): TableData[] {
    return [...this.data].sort((a, b) => {
      const aValue = a[this.sortField as keyof TableData];
      const bValue = b[this.sortField as keyof TableData];
      
      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  handleSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  toggleRowSelection(id: number): void {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  toggleAllRows(): void {
    if (this.selectedRows.size === this.data.length) {
      this.selectedRows.clear();
    } else {
      this.selectedRows = new Set(this.data.map(row => row.id));
    }
  }

  clearSelection(): void {
    this.selectedRows.clear();
  }

  isRowSelected(id: number): boolean {
    return this.selectedRows.has(id);
  }

  areAllRowsSelected(): boolean {
    return this.selectedRows.size === this.data.length;
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Editor':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }

  getStatusBadgeClass(status: string): string {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  get htmlCode(): string {
    return `<div class="space-y-8">
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      📊 Alternating Row Colors Pattern
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Improve table readability with alternating row colors, hover effects, and selection states for better data scanning.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Interactive Example -->
    <div class="space-y-6">
      <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 class="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
          🎯 Interactive Example
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Click headers to sort, select rows with checkboxes, and notice the alternating row colors.
        </p>
        
        <!-- Table Controls -->
        <div class="flex justify-between items-center mb-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ selectedRows.size }} of {{ data.length }} rows selected
          </div>
          <button
            (click)="clearSelection()"
            [disabled]="selectedRows.size === 0"
            class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50">
            Clear Selection
          </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    [checked]="areAllRowsSelected()"
                    (change)="toggleAllRows()"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                </th>
                <th *ngFor="let column of columns"
                    (click)="handleSort(column.key)"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div class="flex items-center space-x-1">
                    <span>{{ column.label }}</span>
                    <span class="text-gray-400">{{ getSortIcon(column.key) }}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr *ngFor="let row of sortedData; let i = index"
                  (click)="toggleRowSelection(row.id)"
                  [class]="getRowClasses(row.id, i)"
                  class="transition-colors cursor-pointer">
                
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    [checked]="isRowSelected(row.id)"
                    (change)="toggleRowSelection(row.id)"
                    (click)="$event.stopPropagation()"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                </td>
                <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ row.name }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {{ row.email }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  <span [class]="'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + getRoleBadgeClass(row.role)">
                    {{ row.role }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <span [class]="'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + getStatusBadgeClass(row.status)">
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {{ row.lastLogin }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="space-y-6">
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <app-code-tabs 
          [htmlCode]="htmlCode" 
          [cssCode]="cssCode" 
          [typescriptCode]="typescriptCode"
          title="Code Example">
        </app-code-tabs>
      </div>
    </div>
  </div>
</div>`;
  }

  get cssCode(): string {
    return `/* This Angular component uses Tailwind CSS classes directly in the template */
/* No custom CSS is needed as all styling is handled by Tailwind utilities */

/* Key Tailwind classes used for the Alternating Rows pattern: */

/* Table Container */
/* overflow-x-auto - Horizontal scroll for small screens */
/* rounded-lg - Rounded corners */
/* border border-gray-200 dark:border-gray-700 - Border with dark mode */

/* Table Structure */
/* w-full - Full width table */
/* bg-gray-50 dark:bg-gray-800 - Header background */
/* bg-white dark:bg-gray-900 - Body background */
/* divide-y divide-gray-200 dark:divide-gray-700 - Row dividers */

/* Alternating Row Colors (handled in component logic) */
/* even rows: bg-white dark:bg-gray-900 */
/* odd rows: bg-gray-50 dark:bg-gray-800 */

/* Hover Effects */
/* hover:bg-gray-100 dark:hover:bg-gray-700 - Row hover */
/* hover:bg-gray-100 dark:hover:bg-gray-700 - Header hover */

/* Selection States */
/* bg-blue-50 dark:bg-blue-900/20 - Selected row background */
/* border-blue-200 dark:border-blue-700 - Selected row border */

/* Interactive Elements */
/* cursor-pointer - Clickable rows and headers */
/* transition-colors - Smooth color transitions */

/* Sorting Indicators */
/* flex items-center space-x-1 - Header layout */
/* text-gray-400 - Sort arrow color */

/* Badges */
/* inline-flex px-2 py-1 text-xs font-semibold rounded-full - Badge base */
/* bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 - Admin role */
/* bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 - Editor role & Active status */
/* bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 - Viewer role */
/* bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 - Inactive status */

/* Typography */
/* text-xs font-medium uppercase tracking-wider - Header text */
/* text-sm font-medium - Primary text */
/* text-sm - Secondary text */

/* Spacing */
/* px-4 py-3 - Cell padding */
/* space-x-1 - Horizontal spacing */
/* mb-4 - Bottom margin */

/* States */
/* disabled:opacity-50 - Disabled button state */
/* focus:ring-blue-500 - Checkbox focus ring */

/* Responsive Design */
/* All layouts automatically responsive with Tailwind */
/* overflow-x-auto handles table overflow on small screens */

/* Dark Mode Support */
/* All classes have dark: variants for automatic dark mode */
/* Colors automatically adapt based on system preference */

/* Benefits of Tailwind CSS approach: */
/* - Consistent color scheme with automatic dark mode */
/* - Built-in responsive behavior */
/* - No custom CSS to maintain */
/* - Easy to modify and extend */
/* - Smaller bundle size (only used classes) */
/* - Clear visual hierarchy with proper contrast ratios */`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

@Component({
  selector: 'app-alternating-rows',
  templateUrl: './alternating-rows.component.html',
  styleUrls: ['./alternating-rows.component.scss']
})
export class AlternatingRowsComponent {
  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRows = new Set<number>();

  data: TableData[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-10' },
    // ... more data
  ];

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastLogin', label: 'Last Login' }
  ];

  get sortedData(): TableData[] {
    return [...this.data].sort((a, b) => {
      const aValue = a[this.sortField as keyof TableData];
      const bValue = b[this.sortField as keyof TableData];
      
      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  handleSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  toggleRowSelection(id: number): void {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  toggleAllRows(): void {
    if (this.selectedRows.size === this.data.length) {
      this.selectedRows.clear();
    } else {
      this.selectedRows = new Set(this.data.map(row => row.id));
    }
  }

  isRowSelected(id: number): boolean {
    return this.selectedRows.has(id);
  }

  areAllRowsSelected(): boolean {
    return this.selectedRows.size === this.data.length;
  }

  getRowClasses(rowId: number, index: number): string {
    const baseClasses = index % 2 === 0 
      ? 'bg-white dark:bg-gray-900' 
      : 'bg-gray-50 dark:bg-gray-800';
    
    const selectedClasses = this.isRowSelected(rowId)
      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
      : '';
    
    const hoverClasses = 'hover:bg-gray-100 dark:hover:bg-gray-700';
    
    return \`\${baseClasses} \${selectedClasses} \${hoverClasses}\`.trim();
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Editor':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }

  getStatusBadgeClass(status: string): string {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}`;
  }

  // Helper properties for template
  columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastLogin', label: 'Last Login' }
  ];

  getRowClasses(rowId: number, index: number): string {
    const baseClasses = index % 2 === 0 
      ? 'bg-white dark:bg-gray-900' 
      : 'bg-gray-50 dark:bg-gray-800';
    
    const selectedClasses = this.isRowSelected(rowId)
      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
      : '';
    
    const hoverClasses = 'hover:bg-gray-100 dark:hover:bg-gray-700';
    
    return `${baseClasses} ${selectedClasses} ${hoverClasses}`.trim();
  }
}