import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-tabs',
  templateUrl: './code-tabs.component.html',
  styleUrls: ['./code-tabs.component.scss']
})
export class CodeTabsComponent implements OnInit {
  @Input() title: string = 'Code Example';
  @Input() htmlCode?: string;
  @Input() scssCode?: string;
  @Input() typescriptCode?: string;
  @Input() exampleCode?: string;

  activeTab: 'html' | 'scss' | 'typescript' | 'example' = 'example';

  setActiveTab(tab: 'html' | 'scss' | 'typescript' | 'example') {
    this.activeTab = tab;
  }

  get hasHtml(): boolean {
    return !!this.htmlCode;
  }

  get hasScss(): boolean {
    return !!this.scssCode;
  }

  get hasTypescript(): boolean {
    return !!this.typescriptCode;
  }

  get hasExample(): boolean {
    return !!this.exampleCode;
  }

  get availableTabs(): Array<{key: 'html' | 'scss' | 'typescript' | 'example', label: string}> {
    const tabs: Array<{key: 'html' | 'scss' | 'typescript' | 'example', label: string}> = [];
    if (this.hasExample) tabs.push({key: 'example' as const, label: 'Example'});
    if (this.hasHtml) tabs.push({key: 'html' as const, label: 'HTML'});
    if (this.hasScss) tabs.push({key: 'scss' as const, label: 'SCSS'});
    if (this.hasTypescript) tabs.push({key: 'typescript' as const, label: 'TypeScript'});
    return tabs;
  }

  ngOnInit() {
    // Set the first available tab as active
    const availableTabs = this.availableTabs;
    if (availableTabs.length > 0) {
      this.activeTab = availableTabs[0].key;
    }
  }

  getCurrentCode(): string {
    switch (this.activeTab) {
      case 'html':
        return this.htmlCode || '';
      case 'scss':
        return this.scssCode || '';
      case 'typescript':
        return this.typescriptCode || '';
      case 'example':
        return this.exampleCode || '';
      default:
        return '';
    }
  }
}