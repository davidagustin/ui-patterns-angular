import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-tabs',
  template: `
    <div class="code-tabs-container">
      <h2 class="code-tabs-title">
        💻 {{ title }}
      </h2>
      
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button
          (click)="activeTab = 'html'"
          [class]="getTabClasses('html')"
          type="button"
        >
          HTML
        </button>
        <button
          (click)="activeTab = 'scss'"
          [class]="getTabClasses('scss')"
          type="button"
        >
          SCSS
        </button>
        <button
          (click)="activeTab = 'typescript'"
          [class]="getTabClasses('typescript')"
          type="button"
        >
          TypeScript
        </button>
      </div>

      <!-- Tab Content -->
      <div class="code-block">
        <pre class="code-content">{{ getCurrentCode() }}</pre>
      </div>
    </div>
  `,
  styleUrls: ['./code-tabs.component.scss']
})
export class CodeTabsComponent {
  @Input() htmlCode: string = '';
  @Input() scssCode: string = '';
  @Input() typescriptCode: string = '';
  @Input() title: string = 'Code Example';

  activeTab: 'html' | 'scss' | 'typescript' = 'html';

  getTabClasses(tab: string): string {
    const baseClasses = 'tab-button';
    return this.activeTab === tab
      ? `${baseClasses} tab-active`
      : `${baseClasses} tab-inactive`;
  }

  getCurrentCode(): string {
    switch (this.activeTab) {
      case 'html':
        return this.htmlCode;
      case 'scss':
        return this.scssCode;
      case 'typescript':
        return this.typescriptCode;
      default:
        return this.htmlCode;
    }
  }
}