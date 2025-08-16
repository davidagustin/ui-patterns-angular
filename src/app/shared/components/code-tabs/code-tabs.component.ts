import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-tabs',
  templateUrl: './code-tabs.component.html',
  styleUrls: ['./code-tabs.component.scss']
})
export class CodeTabsComponent {
  @Input() htmlCode: string = '';
  @Input() scssCode: string = '';
  @Input() typescriptCode: string = '';
  @Input() exampleCode: string = '';
  @Input() title: string = 'Code Example';

  activeTab: 'html' | 'scss' | 'typescript' = 'html';

  setActiveTab(tab: 'html' | 'scss' | 'typescript'): void {
    this.activeTab = tab;
  }

  copyToClipboard(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      // You could add a toast notification here
    });
  }
}