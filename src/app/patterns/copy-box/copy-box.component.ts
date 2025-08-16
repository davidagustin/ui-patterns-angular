import { Component } from '@angular/core';

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

interface Command {
  id: string;
  title: string;
  command: string;
}

interface TextSnippet {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-copy-box',
  templateUrl: './copy-box.component.html',
  styleUrls: ['./copy-box.component.scss']
})
export class CopyBoxComponent {
  copiedItems = new Set<string>();

  copyToClipboard(id: string, content: string): void {
    navigator.clipboard.writeText(content).then(() => {
      this.copiedItems.add(id);
      setTimeout(() => {
        this.copiedItems.delete(id);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  isCopied(id: string): boolean {
    return this.copiedItems.has(id);
  }

  codeSnippets: CodeSnippet[] = [
    {
      id: 'angular-component',
      title: 'Angular Component',
      language: 'typescript',
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  template: \`
    <button 
      (click)="onClick()"
      class="btn btn-primary"
    >
      <ng-content></ng-content>
    </button>
  \`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  onClick(): void {
    console.log('Button clicked!');
  }
}`
    },
    {
      id: 'scss-animation',
      title: 'SCSS Animation',
      language: 'scss',
      code: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}`
    },
    {
      id: 'api-config',
      title: 'API Configuration',
      language: 'typescript',
      code: `interface ApiConfig {
  apiKey: string;
  baseURL: string;
  timeout: number;
}

const config: ApiConfig = {
  apiKey: 'sk-1234567890abcdef',
  baseURL: 'https://api.example.com/v1',
  timeout: 10000
};`
    }
  ];

  commands: Command[] = [
    {
      id: 'npm-install',
      title: 'Install Dependencies',
      command: 'npm install @angular/core @angular/common @angular/forms'
    },
    {
      id: 'ng-generate',
      title: 'Generate Component',
      command: 'ng generate component copy-box --standalone'
    },
    {
      id: 'ng-serve',
      title: 'Start Development Server',
      command: 'ng serve --port 4200 --open'
    }
  ];

  textSnippets: TextSnippet[] = [
    {
      id: 'email',
      title: 'Support Email',
      content: 'support@example.com'
    },
    {
      id: 'phone',
      title: 'Phone Number',
      content: '+1 (555) 123-4567'
    },
    {
      id: 'address',
      title: 'Office Address',
      content: '123 Main St, Suite 100, City, ST 12345'
    }
  ];



  get htmlCode(): string {
    return `<div class="copy-container">
  <!-- Code Snippets Section -->
  <div class="code-snippets-section">
    <h3 class="section-title">Code Snippets</h3>
    
    <div *ngFor="let snippet of codeSnippets" class="code-snippet-item">
      <div class="code-header">
        <div class="code-meta">
          <span class="code-title">{{ snippet.title }}</span>
          <span class="code-language">{{ snippet.language }}</span>
        </div>
        <button 
          (click)="copyToClipboard(snippet.code, snippet.id)"
          [class.copied]="isCopied(snippet.id)"
          class="copy-button"
        >
          <span *ngIf="isCopied(snippet.id); else notCopied">
            ✓ Copied!
          </span>
          <ng-template #notCopied>
            📋 Copy
          </ng-template>
        </button>
      </div>
      
      <pre class="code-content"><code>{{ snippet.code }}</code></pre>
    </div>
  </div>

  <!-- Terminal Commands Section -->
  <div class="commands-section">
    <h3 class="section-title">Terminal Commands</h3>
    
    <div *ngFor="let cmd of commands" class="command-item">
      <div class="command-info">
        <div class="command-title">{{ cmd.title }}</div>
        <code class="command-text">{{ cmd.command }}</code>
      </div>
      <button 
        (click)="copyToClipboard(cmd.command, cmd.id)"
        [class.copied]="isCopied(cmd.id)"
        class="command-copy-btn"
      >
        {{ isCopied(cmd.id) ? '✓ Copied' : 'Copy' }}
      </button>
    </div>
  </div>

  <!-- Text Snippets Section -->
  <div class="text-snippets-section">
    <h3 class="section-title">Contact Information</h3>
    
    <div *ngFor="let snippet of textSnippets" class="text-snippet-item">
      <div class="snippet-info">
        <div class="snippet-title">{{ snippet.title }}</div>
        <div class="snippet-content">{{ snippet.content }}</div>
      </div>
      <button 
        (click)="copyToClipboard(snippet.content, snippet.id)"
        [class.copied]="isCopied(snippet.id)"
        class="text-copy-btn"
      >
        {{ isCopied(snippet.id) ? '✓' : '📋' }}
      </button>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Copy Container */
.copy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

/* Section Styling */
.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-4) 0;
}

/* Code Snippets */
.code-snippets-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.code-snippet-item {
  background: var(--gray-900);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--gray-800);
  border-bottom: 1px solid var(--gray-700);
}

.code-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.code-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--gray-100);
}

.code-language {
  font-size: var(--font-size-xs);
  background: var(--gray-700);
  color: var(--gray-300);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
}

.code-content {
  padding: var(--spacing-4);
  color: var(--gray-100);
  font-family: 'Fira Code', Monaco, Consolas, monospace;
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin: 0;
  overflow-x: auto;
  white-space: pre-wrap;
}

/* Copy Buttons */
.copy-button {
  background: var(--gray-600);
  color: var(--gray-200);
  border: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);

  &:hover {
    background: var(--gray-500);
  }

  &.copied {
    background: var(--green-600);
    color: white;
    animation: copySuccess 0.3s ease;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-500);
  }
}

/* Terminal Commands */
.commands-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.command-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--primary-500);
    background: var(--gray-750);
  }
}

.command-info {
  flex: 1;
  min-width: 0;
}

.command-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--gray-100);
  margin-bottom: var(--spacing-1);
}

.command-text {
  font-size: var(--font-size-sm);
  font-family: 'Fira Code', Monaco, Consolas, monospace;
  color: var(--gray-300);
  background: var(--gray-900);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  display: inline-block;
}

.command-copy-btn {
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  margin-left: var(--spacing-3);

  &:hover {
    background: var(--primary-700);
  }

  &.copied {
    background: var(--green-600);
    animation: copySuccess 0.3s ease;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-500);
  }
}

/* Text Snippets */
.text-snippets-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.text-snippet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--primary-300);
    background: var(--gray-50);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }
}

.snippet-info {
  flex: 1;
  min-width: 0;
}

.snippet-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.snippet-content {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-family: monospace;
}

.text-copy-btn {
  background: var(--gray-200);
  color: var(--text-primary);
  border: none;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 40px;

  &:hover {
    background: var(--gray-300);
  }

  &.copied {
    background: var(--green-100);
    color: var(--green-700);
    animation: copySuccess 0.3s ease;

    @media (prefers-color-scheme: dark) {
      background: var(--green-900);
      color: var(--green-300);
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-500);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
    color: var(--gray-300);

    &:hover {
      background: var(--gray-600);
    }
  }
}

/* Success Animation */
@keyframes copySuccess {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .copy-container {
    padding: var(--spacing-2);
  }
  
  .code-header {
    flex-direction: column;
    gap: var(--spacing-2);
    align-items: stretch;
  }
  
  .command-item {
    flex-direction: column;
    gap: var(--spacing-3);
    align-items: stretch;
  }
  
  .command-copy-btn {
    margin-left: 0;
  }
  
  .text-snippet-item {
    flex-direction: column;
    gap: var(--spacing-2);
    align-items: stretch;
  }

  .text-copy-btn {
    align-self: flex-end;
  }
}

/* Accessibility */
.copy-button:focus-visible,
.command-copy-btn:focus-visible,
.text-copy-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .copy-button,
  .command-copy-btn,
  .text-copy-btn {
    transition: none;
  }
  
  .copied {
    animation: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

interface Command {
  id: string;
  title: string;
  command: string;
}

interface TextSnippet {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-copy-box',
  templateUrl: './copy-box.component.html',
  styleUrls: ['./copy-box.component.scss']
})
export class CopyBoxComponent {
  copiedItems = new Set<string>();

  codeSnippets: CodeSnippet[] = [
    {
      id: 'angular-component',
      title: 'Angular Component',
      language: 'typescript',
      code: \`import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  template: \\\`
    <button 
      (click)="onClick()"
      class="btn btn-primary"
    >
      <ng-content></ng-content>
    </button>
  \\\`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  onClick(): void {
    console.log('Button clicked!');
  }
}\`
    }
  ];


}`;
  }
}