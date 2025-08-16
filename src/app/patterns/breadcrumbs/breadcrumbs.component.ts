import { Component } from '@angular/core';

interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  // Example breadcrumb data
  basicBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Category', url: '/category' },
    { label: 'Subcategory', url: '/category/subcategory' },
    { label: 'Current Page' }
  ];

  complexBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
    { label: 'E-commerce', url: '/dashboard/ecommerce' },
    { label: 'Products', url: '/dashboard/ecommerce/products' },
    { label: 'Electronics', url: '/dashboard/ecommerce/products/electronics' },
    { label: 'Smartphones', url: '/dashboard/ecommerce/products/electronics/smartphones' },
    { label: 'iPhone 15 Pro Max' }
  ];

  longBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Documentation', url: '/docs' },
    { label: 'UI Components', url: '/docs/ui-components' },
    { label: 'Navigation', url: '/docs/ui-components/navigation' },
    { label: 'Breadcrumbs', url: '/docs/ui-components/navigation/breadcrumbs' },
    { label: 'Examples', url: '/docs/ui-components/navigation/breadcrumbs/examples' },
    { label: 'Advanced Usage', url: '/docs/ui-components/navigation/breadcrumbs/examples/advanced' },
    { label: 'Current Implementation Guide' }
  ];

  // Track mobile collapsed state
  isMobileCollapsed = true;

  // Methods
  navigateTo(item: BreadcrumbItem) {
    if (item.url) {
      console.log('Navigating to:', item.url);
      // In a real app, you would use Router.navigate()
    }
  }

  toggleMobileView() {
    this.isMobileCollapsed = !this.isMobileCollapsed;
  }

  shouldHideOnMobile(breadcrumbs: BreadcrumbItem[], item: BreadcrumbItem, isFirst: boolean, isLast: boolean): boolean {
    if (this.isMobileCollapsed && breadcrumbs.length > 3) {
      const index = breadcrumbs.indexOf(item);
      const secondToLast = breadcrumbs.length - 2;
      return !isFirst && !isLast && index !== secondToLast;
    }
    return false;
  }

  // Code display getters
  get htmlCode(): string {
    return `<!-- Basic Breadcrumbs -->
<nav aria-label="Breadcrumb navigation" class="breadcrumbs-nav">
  <ol class="breadcrumbs-list">
    <li class="breadcrumb-item" *ngFor="let item of breadcrumbs; let last = last">
      <a 
        *ngIf="item.url && !last" 
        [href]="item.url"
        class="breadcrumb-link"
        (click)="navigateTo(item)"
      >
        <span *ngIf="item.icon" class="breadcrumb-icon" [attr.data-icon]="item.icon"></span>
        {{ item.label }}
      </a>
      <span *ngIf="!item.url || last" class="breadcrumb-current" [attr.aria-current]="last ? 'page' : null">
        <span *ngIf="item.icon" class="breadcrumb-icon" [attr.data-icon]="item.icon"></span>
        {{ item.label }}
      </span>
      <span *ngIf="!last" class="breadcrumb-separator" aria-hidden="true">/</span>
    </li>
  </ol>
</nav>

<!-- Responsive Breadcrumbs with Collapse -->
<nav aria-label="Breadcrumb navigation" class="breadcrumbs-nav responsive">
  <ol class="breadcrumbs-list" [class.collapsed]="isMobileCollapsed">
    <li class="breadcrumb-item" *ngFor="let item of breadcrumbs; let first = first; let last = last">
      <button 
        *ngIf="first && breadcrumbs.length > 3" 
        class="breadcrumb-toggle"
        (click)="toggleMobileView()"
        [attr.aria-expanded]="!isMobileCollapsed"
        aria-label="Show all breadcrumb items"
      >
        ...
      </button>
      <a 
        *ngIf="item.url && !last" 
        [href]="item.url"
        class="breadcrumb-link"
        (click)="navigateTo(item)"
        [class.hidden-mobile]="shouldHideOnMobile(breadcrumbs, item, first, last)"
      >
        <span *ngIf="item.icon" class="breadcrumb-icon" [attr.data-icon]="item.icon"></span>
        {{ item.label }}
      </a>
      <span 
        *ngIf="!item.url || last" 
        class="breadcrumb-current"
        [attr.aria-current]="last ? 'page' : null"
        [class.hidden-mobile]="shouldHideOnMobile(breadcrumbs, item, first, last)"
      >
        <span *ngIf="item.icon" class="breadcrumb-icon" [attr.data-icon]="item.icon"></span>
        {{ item.label }}
      </span>
      <span 
        *ngIf="!last" 
        class="breadcrumb-separator" 
        aria-hidden="true"
        [class.hidden-mobile]="shouldHideOnMobile(breadcrumbs, item, first, last)"
      >
        /
      </span>
    </li>
  </ol>
</nav>`;
  }

  get scssCode(): string {
    return `.breadcrumbs-nav {
  margin-bottom: var(--spacing-6);

  .breadcrumbs-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--spacing-1);
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
  }

  .breadcrumb-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1);
    padding: var(--spacing-1) var(--spacing-2);
    color: var(--text-secondary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);

    &:hover {
      color: var(--primary-600);
      background-color: var(--primary-50);
    }

    &:focus-visible {
      outline: 2px solid var(--primary-500);
      outline-offset: 2px;
    }
  }

  .breadcrumb-current {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1);
    padding: var(--spacing-1) var(--spacing-2);
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }

  .breadcrumb-separator {
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
    margin: 0 var(--spacing-1);
    user-select: none;
  }

  .breadcrumb-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;

    &[data-icon="home"]::before { content: "🏠"; }
    &[data-icon="dashboard"]::before { content: "📊"; }
  }

  .breadcrumb-toggle {
    display: none;
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      background-color: var(--primary-50);
      color: var(--primary-600);
    }

    &:focus-visible {
      outline: 2px solid var(--primary-500);
      outline-offset: 2px;
    }
  }

  // Responsive behavior
  &.responsive {
    @media (max-width: 768px) {
      .breadcrumb-toggle {
        display: inline-block;
      }

      .breadcrumbs-list.collapsed {
        .hidden-mobile {
          display: none;
        }
      }
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .breadcrumbs-nav {
    .breadcrumb-link:hover {
      color: var(--primary-400);
      background-color: var(--primary-900);
    }

    .breadcrumb-toggle:hover {
      background-color: var(--primary-900);
      color: var(--primary-400);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Category', url: '/category' },
    { label: 'Subcategory', url: '/category/subcategory' },
    { label: 'Current Page' }
  ];

  isMobileCollapsed = true;

  navigateTo(item: BreadcrumbItem) {
    if (item.url) {
      console.log('Navigating to:', item.url);
      // In a real app: this.router.navigate([item.url]);
    }
  }

  toggleMobileView() {
    this.isMobileCollapsed = !this.isMobileCollapsed;
  }

  shouldHideOnMobile(breadcrumbs: BreadcrumbItem[], item: BreadcrumbItem, isFirst: boolean, isLast: boolean): boolean {
    if (this.isMobileCollapsed && breadcrumbs.length > 3) {
      const index = breadcrumbs.indexOf(item);
      const secondToLast = breadcrumbs.length - 2;
      return !isFirst && !isLast && index !== secondToLast;
    }
    return false;
  }
}`;
  }
}