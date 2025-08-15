import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-tabs',
  template: `
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        💻 {{ title }}
      </h2>
      
      <!-- Tab Navigation -->
      <div class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          (click)="activeTab = 'html'"
          [class]="getTabClasses('html')"
        >
          HTML
        </button>
        <button
          (click)="activeTab = 'css'"
          [class]="getTabClasses('css')"
        >
          CSS
        </button>
        <button
          (click)="activeTab = 'typescript'"
          [class]="getTabClasses('typescript')"
        >
          TypeScript
        </button>
      </div>

      <!-- Tab Content -->
      <div class="code-block">
        <pre class="text-sm leading-relaxed">{{ getCurrentCode() }}</pre>
      </div>
    </div>
  `,
  styles: [`
    button {
      padding: 0.5rem 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    .tab-active {
      color: #3b82f6;
      border-bottom: 2px solid #3b82f6;
      background-color: rgba(59, 130, 246, 0.1);
    }

    .tab-inactive {
      color: #6b7280;
    }

    .tab-inactive:hover {
      color: #374151;
      background-color: rgba(107, 114, 128, 0.1);
    }

    @media (prefers-color-scheme: dark) {
      .tab-active {
        color: #93c5fd;
        border-bottom-color: #93c5fd;
        background-color: rgba(147, 197, 253, 0.2);
      }

      .tab-inactive {
        color: #9ca3af;
      }

      .tab-inactive:hover {
        color: #f3f4f6;
        background-color: rgba(156, 163, 175, 0.2);
      }
    }
  `]
})
export class CodeTabsComponent {
  @Input() htmlCode: string = '';
  @Input() cssCode: string = '';
  @Input() typescriptCode: string = '';
  @Input() title: string = 'Code Example';

  activeTab: 'html' | 'css' | 'typescript' = 'html';

  getTabClasses(tab: string): string {
    const baseClasses = 'px-4 py-2 font-medium transition-all';
    return this.activeTab === tab
      ? `${baseClasses} tab-active`
      : `${baseClasses} tab-inactive`;
  }

  getCurrentCode(): string {
    switch (this.activeTab) {
      case 'html':
        return this.htmlCode;
      case 'css':
        return this.cssCode;
      case 'typescript':
        return this.typescriptCode;
      default:
        return this.htmlCode;
    }
  }
}