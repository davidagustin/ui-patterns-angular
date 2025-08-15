import { Component, OnDestroy } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

@Component({
  selector: 'app-autosave',
  templateUrl: './autosave.component.html',
  styleUrls: ['./autosave.component.scss']
})
export class AutosaveComponent implements OnDestroy {
  content = '';
  lastSaved: Date | null = null;
  isSaving = false;
  saveStatus: SaveStatus = 'idle';

  private destroy$ = new Subject<void>();
  private contentChanged$ = new Subject<string>();

  constructor() {
    // Set up autosave with debouncing
    this.contentChanged$
      .pipe(
        debounceTime(1000), // Wait 1 second after user stops typing
        takeUntil(this.destroy$)
      )
      .subscribe((content) => {
        if (content && content.length > 0) {
          this.performSave();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onContentChange(value: string): void {
    this.content = value;
    this.contentChanged$.next(value);
  }

  private async performSave(): Promise<void> {
    this.isSaving = true;
    this.saveStatus = 'saving';

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.lastSaved = new Date();
      this.isSaving = false;
      this.saveStatus = 'saved';
      
      // Reset status after 3 seconds
      setTimeout(() => {
        if (this.saveStatus === 'saved') {
          this.saveStatus = 'idle';
        }
      }, 3000);
    } catch (error) {
      this.isSaving = false;
      this.saveStatus = 'error';
      console.error('Save failed:', error);
    }
  }

  getStatusText(): string {
    switch (this.saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'All changes saved';
      case 'error':
        return 'Save failed';
      default:
        return this.lastSaved 
          ? `Last saved ${this.lastSaved.toLocaleTimeString()}` 
          : 'Start typing to auto-save';
    }
  }

  getStatusClass(): string {
    switch (this.saveStatus) {
      case 'saving':
        return 'status-saving';
      case 'saved':
        return 'status-saved';
      case 'error':
        return 'status-error';
      default:
        return 'status-idle';
    }
  }

  get exampleCode(): string {
    return `<!-- Basic Autosave Example -->
<div class="autosave-container">
  <div class="editor-header">
    <h3 class="editor-title">Document Editor</h3>
    <div [class]="'status-indicator ' + getStatusClass()">
      <span *ngIf="isSaving" class="status-icon saving">⏳</span>
      <span *ngIf="saveStatus === 'saved'" class="status-icon">✅</span>
      {{ getStatusText() }}
    </div>
  </div>
  
  <textarea
    [(ngModel)]="content"
    (input)="onContentChange($any($event.target).value)"
    placeholder="Start typing your content here..."
    rows="8"
    class="autosave-textarea">
  </textarea>
  
  <div class="editor-footer">
    <span class="character-count">{{ content.length }} characters</span>
    <span class="save-info">Auto-saves every 1 second after you stop typing</span>
  </div>
</div>

<!-- Component TypeScript -->
export class AutosaveComponent {
  content = '';
  lastSaved: Date | null = null;
  isSaving = false;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';
  
  private contentChanged$ = new Subject<string>();
  
  constructor() {
    this.contentChanged$
      .pipe(debounceTime(1000))
      .subscribe((content) => {
        if (content && content.length > 0) {
          this.performSave();
        }
      });
  }
  
  onContentChange(value: string): void {
    this.content = value;
    this.contentChanged$.next(value);
  }
  
  private async performSave(): Promise<void> {
    this.isSaving = true;
    this.saveStatus = 'saving';
    
    try {
      await this.saveService.save(this.content);
      this.lastSaved = new Date();
      this.saveStatus = 'saved';
    } catch (error) {
      this.saveStatus = 'error';
    } finally {
      this.isSaving = false;
    }
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="autosave-pattern-container">
  <app-pattern-header
    title="💾 Autosave Pattern"
    description="Automatically save user progress to prevent data loss and provide peace of mind during content creation."
    [showBreadcrumb]="false">
  </app-pattern-header>

  <div class="pattern-layout">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Start typing in the text area below. The content will automatically save after you stop typing for 1 second.
        </p>
        
        <div class="autosave-demo">
          <div class="editor-header">
            <h3 class="editor-title">Document Editor</h3>
            <div [class]="'status-indicator ' + getStatusClass()" 
                 [attr.aria-live]="saveStatus === 'saving' ? 'polite' : null">
              <span *ngIf="isSaving" class="status-icon saving">⏳</span>
              <span *ngIf="saveStatus === 'saved'" class="status-icon success">✅</span>
              <span *ngIf="saveStatus === 'error'" class="status-icon error">❌</span>
              {{ getStatusText() }}
            </div>
          </div>
          
          <textarea
            [(ngModel)]="content"
            (input)="onContentChange($any($event.target).value)"
            placeholder="Start typing your content here... The autosave feature will automatically save your work as you type."
            rows="8"
            class="autosave-textarea"
            aria-label="Document content editor with autosave">
          </textarea>
          
          <div class="editor-footer">
            <span class="character-count">{{ content.length }} characters</span>
            <span class="save-info">Auto-saves every 1 second after you stop typing</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="code-section">
      <app-code-tabs 
        [exampleCode]="exampleCode"
        [htmlCode]="htmlCode" 
        [scssCode]="scssCode" 
        [typescriptCode]="typescriptCode"
        title="Code Example">
      </app-code-tabs>
    </div>
  </div>

  <!-- Key Features -->
  <div class="features-section">
    <h3 class="features-title">✨ Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Debounced Saving</h4>
          <p class="feature-description">Saves after user stops typing to avoid excessive API calls</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Visual Feedback</h4>
          <p class="feature-description">Clear indicators showing save status and last saved time</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Error Handling</h4>
          <p class="feature-description">Graceful handling of save failures with user notification</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Data Recovery</h4>
          <p class="feature-description">Automatic recovery of unsaved changes on page reload</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Best Practices -->
  <div class="best-practices-section">
    <h3 class="best-practices-title">💡 Best Practices</h3>
    <div class="practices-grid">
      <div class="practices-column">
        <div class="practice-item">
          <span class="practice-number">1.</span>
          <div class="practice-content">
            <h4 class="practice-name">Use Debouncing</h4>
            <p class="practice-description">Wait for user to stop typing before saving</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-number">2.</span>
          <div class="practice-content">
            <h4 class="practice-name">Show Save Status</h4>
            <p class="practice-description">Provide clear visual feedback about save state</p>
          </div>
        </div>
      </div>
      <div class="practices-column">
        <div class="practice-item">
          <span class="practice-number">3.</span>
          <div class="practice-content">
            <h4 class="practice-name">Handle Errors Gracefully</h4>
            <p class="practice-description">Retry failed saves and notify users appropriately</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-number">4.</span>
          <div class="practice-content">
            <h4 class="practice-name">Optimize Performance</h4>
            <p class="practice-description">Use efficient save intervals and batch updates</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Autosave Container */
.autosave-demo {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

/* Editor Header */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background-color: #111827;
    border-bottom-color: #374151;
  }
}

.editor-title {
  font-weight: 500;
  color: #374151;
  font-size: 1.125rem;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

/* Status Indicator */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &.status-saving {
    color: #d97706;
    background-color: #fef3c7;

    @media (prefers-color-scheme: dark) {
      background-color: #451a03;
      color: #fbbf24;
    }
  }

  &.status-saved {
    color: #059669;
    background-color: #d1fae5;

    @media (prefers-color-scheme: dark) {
      background-color: #064e3b;
      color: #34d399;
    }
  }

  &.status-error {
    color: #dc2626;
    background-color: #fee2e2;

    @media (prefers-color-scheme: dark) {
      background-color: #450a0a;
      color: #f87171;
    }
  }

  &.status-idle {
    color: #6b7280;
    background-color: #f3f4f6;

    @media (prefers-color-scheme: dark) {
      background-color: #374151;
      color: #9ca3af;
    }
  }
}

/* Status Icons */
.status-icon {
  font-size: 1rem;

  &.saving {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  &.success {
    animation: bounce 0.6s ease-in-out;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Textarea */
.autosave-textarea {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.2s ease;
  background: white;
  color: #111827;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    color: #f9fafb;

    &:focus {
      box-shadow: inset 0 0 0 2px #60a5fa;
    }

    &::placeholder {
      color: #6b7280;
    }
  }
}

/* Editor Footer */
.editor-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    background-color: #111827;
    border-top-color: #374151;
    color: #9ca3af;
  }
}

.character-count {
  font-weight: 500;
}

.save-info {
  font-style: italic;
}

/* Loading Animation */
.saving-animation {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #d97706;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @media (prefers-color-scheme: dark) {
    border-color: #374151;
    border-top-color: #fbbf24;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Focus States */
.autosave-textarea:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Common pattern styles */
.autosave-pattern-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.pattern-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.example-section {
  display: flex;
  flex-direction: column;
}

.example-card {
  background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 0.75rem;
  padding: 1.5rem;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #1e3a8a20 0%, #581c8720 100%);
    border-color: #1e40af;
  }
}

.example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1e40af;

  @media (prefers-color-scheme: dark) {
    color: #93c5fd;
  }
}

.example-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.code-section {
  display: flex;
  flex-direction: column;
}

.features-section {
  background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%);
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #14532d20 0%, #1e3a8a20 100%);
    border-color: #166534;
  }
}

.features-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #166534;

  @media (prefers-color-scheme: dark) {
    color: #86efac;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-icon {
  color: #16a34a;
  font-size: 1.125rem;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    color: #4ade80;
  }
}

.feature-content {
  flex: 1;
}

.feature-name {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.feature-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.best-practices-section {
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  border: 1px solid #fbbf24;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #78350f20 0%, #ea580c20 100%);
    border-color: #d97706;
  }
}

.best-practices-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #92400e;

  @media (prefers-color-scheme: dark) {
    color: #fbbf24;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.practices-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.practice-number {
  color: #d97706;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    color: #fbbf24;
  }
}

.practice-content {
  flex: 1;
}

.practice-name {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.practice-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .editor-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .editor-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, OnDestroy } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

@Component({
  selector: 'app-autosave',
  templateUrl: './autosave.component.html',
  styleUrls: ['./autosave.component.scss']
})
export class AutosaveComponent implements OnDestroy {
  content = '';
  lastSaved: Date | null = null;
  isSaving = false;
  saveStatus: SaveStatus = 'idle';

  private destroy$ = new Subject<void>();
  private contentChanged$ = new Subject<string>();

  constructor() {
    // Set up autosave with debouncing
    this.contentChanged$
      .pipe(
        debounceTime(1000), // Wait 1 second after user stops typing
        takeUntil(this.destroy$)
      )
      .subscribe((content) => {
        if (content && content.length > 0) {
          this.performSave();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onContentChange(value: string): void {
    this.content = value;
    this.contentChanged$.next(value);
  }

  private async performSave(): Promise<void> {
    this.isSaving = true;
    this.saveStatus = 'saving';

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.lastSaved = new Date();
      this.isSaving = false;
      this.saveStatus = 'saved';
      
      // Reset status after 3 seconds
      setTimeout(() => {
        if (this.saveStatus === 'saved') {
          this.saveStatus = 'idle';
        }
      }, 3000);
    } catch (error) {
      this.isSaving = false;
      this.saveStatus = 'error';
      console.error('Save failed:', error);
    }
  }

  getStatusText(): string {
    switch (this.saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'All changes saved';
      case 'error':
        return 'Save failed';
      default:
        return this.lastSaved 
          ? \`Last saved \${this.lastSaved.toLocaleTimeString()}\` 
          : 'Start typing to auto-save';
    }
  }

  getStatusClass(): string {
    switch (this.saveStatus) {
      case 'saving':
        return 'status-saving';
      case 'saved':
        return 'status-saved';
      case 'error':
        return 'status-error';
      default:
        return 'status-idle';
    }
  }
}

// Advanced example with service integration
@Injectable()
export class AutosaveService {
  private autosaveSubject = new Subject<{ id: string; content: string }>();
  
  constructor(private http: HttpClient) {
    // Set up batch saving
    this.autosaveSubject
      .pipe(
        debounceTime(2000),
        distinctUntilChanged((prev, curr) => prev.content === curr.content),
        switchMap(data => this.saveToServer(data))
      )
      .subscribe();
  }
  
  scheduleAutosave(id: string, content: string): void {
    this.autosaveSubject.next({ id, content });
  }
  
  private saveToServer(data: { id: string; content: string }): Observable<any> {
    return this.http.post('/api/autosave', data).pipe(
      catchError(error => {
        console.error('Autosave failed:', error);
        return of(null);
      })
    );
  }
}

// Component with offline support
export class OfflineAutosaveComponent implements OnDestroy {
  private readonly STORAGE_KEY = 'autosave_content';
  
  ngOnInit(): void {
    // Restore content from localStorage on component init
    const savedContent = localStorage.getItem(this.STORAGE_KEY);
    if (savedContent) {
      this.content = savedContent;
    }
    
    // Save to localStorage immediately when content changes
    this.contentChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(content => {
        localStorage.setItem(this.STORAGE_KEY, content);
      });
  }
  
  private async performSave(): Promise<void> {
    try {
      await this.saveService.save(this.content);
      // Clear localStorage after successful server save
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      // Keep in localStorage if server save fails
      console.error('Server save failed, keeping local backup');
    }
  }
}`;
  }
}