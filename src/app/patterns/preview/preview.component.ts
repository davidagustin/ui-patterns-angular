import { Component } from '@angular/core';

interface PreviewItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'image' | 'video' | 'document' | 'link';
  size?: string;
  modifiedDate?: Date;
  author?: string;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  selectedItem: PreviewItem | null = null;
  showPreviewModal = false;
  previewMode: 'hover' | 'click' | 'modal' = 'hover';
  
  previewItems: PreviewItem[] = [
    {
      id: '1',
      title: 'Mountain Landscape',
      description: 'Beautiful mountain scenery captured at sunset',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      type: 'image',
      size: '2.4 MB',
      modifiedDate: new Date('2024-01-15'),
      author: 'John Photographer'
    },
    {
      id: '2',
      title: 'Project Documentation',
      description: 'Comprehensive guide for the new features',
      imageUrl: 'https://picsum.photos/800/600?random=2',
      type: 'document',
      size: '156 KB',
      modifiedDate: new Date('2024-01-10'),
      author: 'Sarah Writer'
    },
    {
      id: '3',
      title: 'Demo Video',
      description: 'Product demonstration and walkthrough',
      imageUrl: 'https://picsum.photos/800/600?random=3',
      type: 'video',
      size: '12.8 MB',
      modifiedDate: new Date('2024-01-08'),
      author: 'Mike Producer'
    },
    {
      id: '4',
      title: 'Design System Guide',
      description: 'Complete design system documentation',
      imageUrl: 'https://picsum.photos/800/600?random=4',
      type: 'link',
      size: '2.1 MB',
      modifiedDate: new Date('2024-01-05'),
      author: 'Lisa Designer'
    },
    {
      id: '5',
      title: 'Ocean Waves',
      description: 'Peaceful ocean waves during golden hour',
      imageUrl: 'https://picsum.photos/800/600?random=5',
      type: 'image',
      size: '3.7 MB',
      modifiedDate: new Date('2024-01-03'),
      author: 'Alex Nature'
    },
    {
      id: '6',
      title: 'API Reference',
      description: 'Complete API documentation with examples',
      imageUrl: 'https://picsum.photos/800/600?random=6',
      type: 'document',
      size: '892 KB',
      modifiedDate: new Date('2024-01-01'),
      author: 'Dev Team'
    }
  ];

  onItemHover(item: PreviewItem): void {
    if (this.previewMode === 'hover') {
      this.selectedItem = item;
    }
  }

  onItemLeave(): void {
    if (this.previewMode === 'hover') {
      this.selectedItem = null;
    }
  }

  onItemClick(item: PreviewItem): void {
    if (this.previewMode === 'click') {
      this.selectedItem = this.selectedItem?.id === item.id ? null : item;
    } else if (this.previewMode === 'modal') {
      this.selectedItem = item;
      this.showPreviewModal = true;
    }
  }

  closeModal(): void {
    this.showPreviewModal = false;
    this.selectedItem = null;
  }

  setPreviewMode(mode: 'hover' | 'click' | 'modal'): void {
    this.previewMode = mode;
    this.selectedItem = null;
    this.showPreviewModal = false;
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'document': return '📄';
      case 'link': return '🔗';
      default: return '📁';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  get exampleCode(): string {
    return `<!-- Basic Preview Example -->
<div class="preview-container">
  <div class="preview-item" 
       (mouseenter)="onHover(item)"
       (mouseleave)="onLeave()"
       (click)="onClick(item)">
    <img [src]="item.imageUrl" [alt]="item.title" class="preview-thumb">
    <div class="item-info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
  
  <!-- Preview Panel -->
  <div class="preview-panel" *ngIf="selectedItem">
    <img [src]="selectedItem.imageUrl" [alt]="selectedItem.title">
    <div class="preview-details">
      <h3>{{ selectedItem.title }}</h3>
      <p>{{ selectedItem.description }}</p>
      <div class="meta-info">
        <span>{{ selectedItem.size }}</span>
        <span>{{ formatDate(selectedItem.modifiedDate) }}</span>
      </div>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class PreviewComponent {
  selectedItem: any = null;
  
  onHover(item: any) {
    this.selectedItem = item;
  }
  
  onLeave() {
    this.selectedItem = null;
  }
  
  onClick(item: any) {
    // Handle click action
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="preview-pattern-container">
  <div class="pattern-header">
    <h1 class="pattern-title gradient-text">👁️ Preview Pattern</h1>
    <p class="pattern-description">
      Show quick previews of content without navigating away from the current view. Perfect for images, documents, and media files.
    </p>
  </div>

  <div class="pattern-layout">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-card">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Choose a preview mode and interact with the items below to see previews in action.
        </p>
        
        <!-- Preview Mode Controls -->
        <div class="mode-controls">
          <button 
            *ngFor="let mode of ['hover', 'click', 'modal']"
            (click)="setPreviewMode(mode)"
            class="mode-btn"
            [class.active]="previewMode === mode">
            {{ mode | titlecase }}
          </button>
        </div>
        
        <div class="preview-demo">
          <!-- Items Grid -->
          <div class="items-grid">
            <div 
              *ngFor="let item of previewItems"
              class="preview-item"
              [class.selected]="selectedItem?.id === item.id"
              (mouseenter)="onItemHover(item)"
              (mouseleave)="onItemLeave()"
              (click)="onItemClick(item)">
              
              <div class="item-thumbnail">
                <img [src]="item.imageUrl" [alt]="item.title" loading="lazy">
                <div class="item-overlay">
                  <span class="item-type">{{ getTypeIcon(item.type) }}</span>
                </div>
              </div>
              
              <div class="item-content">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-description">{{ item.description }}</p>
                <div class="item-meta">
                  <span class="item-size">{{ item.size }}</span>
                  <span class="item-date">{{ formatDate(item.modifiedDate!) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Preview Panel (for hover and click modes) -->
          <div 
            class="preview-panel"
            [class.visible]="selectedItem && !showPreviewModal"
            *ngIf="selectedItem && !showPreviewModal">
            
            <div class="preview-header">
              <h3 class="preview-title">{{ selectedItem.title }}</h3>
              <button 
                *ngIf="previewMode === 'click'"
                (click)="selectedItem = null"
                class="close-btn">
                ✕
              </button>
            </div>
            
            <div class="preview-content">
              <div class="preview-image">
                <img [src]="selectedItem.imageUrl" [alt]="selectedItem.title">
              </div>
              
              <div class="preview-details">
                <p class="preview-description">{{ selectedItem.description }}</p>
                
                <div class="preview-meta">
                  <div class="meta-item">
                    <span class="meta-label">Type:</span>
                    <span class="meta-value">{{ getTypeIcon(selectedItem.type) }} {{ selectedItem.type | titlecase }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Size:</span>
                    <span class="meta-value">{{ selectedItem.size }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Modified:</span>
                    <span class="meta-value">{{ formatDate(selectedItem.modifiedDate!) }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Author:</span>
                    <span class="meta-value">{{ selectedItem.author }}</span>
                  </div>
                </div>
                
                <div class="preview-actions">
                  <button class="action-btn primary">Open</button>
                  <button class="action-btn secondary">Download</button>
                  <button class="action-btn secondary">Share</button>
                </div>
              </div>
            </div>
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

  <!-- Modal Preview -->
  <div class="preview-modal" [class.visible]="showPreviewModal" *ngIf="showPreviewModal">
    <div class="modal-backdrop" (click)="closeModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ selectedItem?.title }}</h2>
        <button (click)="closeModal()" class="modal-close">✕</button>
      </div>
      
      <div class="modal-body">
        <div class="modal-image">
          <img [src]="selectedItem?.imageUrl" [alt]="selectedItem?.title">
        </div>
        
        <div class="modal-details">
          <p class="modal-description">{{ selectedItem?.description }}</p>
          
          <div class="modal-meta">
            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-label">Type</span>
                <span class="meta-value">{{ getTypeIcon(selectedItem?.type || '') }} {{ selectedItem?.type | titlecase }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Size</span>
                <span class="meta-value">{{ selectedItem?.size }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Modified</span>
                <span class="meta-value">{{ formatDate(selectedItem?.modifiedDate!) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Author</span>
                <span class="meta-value">{{ selectedItem?.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="action-btn primary">Open Full Size</button>
        <button class="action-btn secondary">Download</button>
        <button class="action-btn secondary">Share</button>
      </div>
    </div>
  </div>

  <!-- Key Features -->
  <div class="features-section">
    <h3 class="features-title">✨ Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Multiple Trigger Modes</h4>
          <p class="feature-description">Support for hover, click, and modal previews</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Rich Metadata</h4>
          <p class="feature-description">Display file size, dates, authors, and more</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Media Support</h4>
          <p class="feature-description">Works with images, videos, documents, and links</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div class="feature-content">
          <h4 class="feature-name">Responsive Design</h4>
          <p class="feature-description">Adapts to different screen sizes and devices</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Use Cases -->
  <div class="use-cases-section">
    <h3 class="use-cases-title">🎯 Common Use Cases</h3>
    <div class="use-cases-grid">
      <div class="use-case-item">
        <div class="use-case-icon">🖼️</div>
        <h4 class="use-case-name">Image Galleries</h4>
        <p class="use-case-description">Preview images before opening full view</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">📁</div>
        <h4 class="use-case-name">File Browsers</h4>
        <p class="use-case-description">Quick file content previews</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">📰</div>
        <h4 class="use-case-name">Article Lists</h4>
        <p class="use-case-description">Preview article content and metadata</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Preview Pattern Styles */
.preview-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

.pattern-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.pattern-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pattern-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.pattern-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-8);
}

.example-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.example-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: var(--text-primary);
}

.example-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-6);
}

.mode-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-1);
  background: var(--gray-100);
  border-radius: var(--radius-lg);
  width: fit-content;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.mode-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 500;

  &:hover {
    background: var(--gray-200);
    color: var(--text-primary);
  }

  &.active {
    background: var(--primary-500);
    color: white;
    box-shadow: var(--shadow-sm);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-700);
    }
  }
}

.preview-demo {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--spacing-6);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-4);
}

.preview-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;

  &:hover {
    border-color: var(--primary-500);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &.selected {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-100);

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 0 3px var(--primary-900);
    }
  }
}

.item-thumbnail {
  position: relative;
  height: 160px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }

  .preview-item:hover & img {
    transform: scale(1.05);
  }
}

.item-overlay {
  position: absolute;
  top: var(--spacing-2);
  right: var(--spacing-2);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.item-content {
  padding: var(--spacing-4);
}

.item-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-primary);
  line-height: 1.3;
}

.item-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-3) 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.preview-panel {
  position: sticky;
  top: var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  opacity: 0;
  transform: translateY(var(--spacing-4));
  transition: all var(--transition-normal);
  height: fit-content;
  box-shadow: var(--shadow-md);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
  }
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-primary);
  background: var(--gray-50);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.preview-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-tertiary);
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-200);
    color: var(--text-primary);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-700);
    }
  }
}

.preview-content {
  display: flex;
  flex-direction: column;
}

.preview-image {
  aspect-ratio: 16/9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.preview-details {
  padding: var(--spacing-4);
}

.preview-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-4) 0;
  line-height: 1.5;
}

.preview-meta {
  margin-bottom: var(--spacing-4);
}

.meta-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid var(--border-secondary);

  &:last-child {
    border-bottom: none;
  }
}

.meta-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-value {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.preview-actions {
  display: flex;
  gap: var(--spacing-2);
}

.action-btn {
  flex: 1;
  padding: var(--spacing-2) var(--spacing-3);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &.primary {
    background: var(--primary-500);
    color: white;

    &:hover {
      background: var(--primary-600);
    }
  }

  &.secondary {
    background: var(--gray-100);
    color: var(--text-primary);

    &:hover {
      background: var(--gray-200);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
      color: var(--text-primary);

      &:hover {
        background: var(--gray-600);
      }
    }
  }
}

/* Modal Styles */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);

  &.visible {
    opacity: 1;
    visibility: visible;
  }
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  max-width: 800px;
  max-height: 90vh;
  margin: var(--spacing-4);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  transform: scale(0.9);
  transition: transform var(--transition-normal);

  .preview-modal.visible & {
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--border-primary);
  background: var(--gray-50);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--text-tertiary);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-200);
    color: var(--text-primary);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-700);
    }
  }
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  max-height: 500px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: none;
  }
}

.modal-image {
  background: var(--gray-900);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.modal-details {
  padding: var(--spacing-6);
  overflow-y: auto;
}

.modal-description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-6) 0;
  line-height: 1.6;
}

.modal-meta {
  margin-bottom: var(--spacing-6);
}

.meta-grid {
  display: grid;
  gap: var(--spacing-3);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-3);
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--border-primary);
  background: var(--gray-50);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

/* Features and Use Cases */
.features-section,
.use-cases-section {
  margin-bottom: var(--spacing-8);
}

.features-title,
.use-cases-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-6);
  text-align: center;
  color: var(--text-primary);
}

.features-grid,
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
}

.feature-item,
.use-case-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.feature-icon,
.use-case-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  background: var(--primary-100);
  color: var(--primary-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-sm);

  @media (prefers-color-scheme: dark) {
    background: var(--primary-900);
    color: var(--primary-300);
  }
}

.feature-content,
.use-case-item {
  flex: 1;
}

.feature-name,
.use-case-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-primary);
}

.feature-description,
.use-case-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .preview-pattern-container {
    padding: var(--spacing-4);
  }

  .pattern-title {
    font-size: var(--font-size-2xl);
  }

  .pattern-description {
    font-size: var(--font-size-base);
  }

  .preview-demo {
    grid-template-columns: 1fr;
  }

  .items-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: var(--spacing-2);
    max-width: calc(100vw - var(--spacing-4));
  }

  .modal-body {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
  }
}

/* Focus states for accessibility */
.preview-item:focus,
.mode-btn:focus,
.action-btn:focus,
.close-btn:focus,
.modal-close:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface PreviewItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'image' | 'video' | 'document' | 'link';
  size?: string;
  modifiedDate?: Date;
  author?: string;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  selectedItem: PreviewItem | null = null;
  showPreviewModal = false;
  previewMode: 'hover' | 'click' | 'modal' = 'hover';
  
  previewItems: PreviewItem[] = [
    {
      id: '1',
      title: 'Mountain Landscape',
      description: 'Beautiful mountain scenery captured at sunset',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      type: 'image',
      size: '2.4 MB',
      modifiedDate: new Date('2024-01-15'),
      author: 'John Photographer'
    },
    {
      id: '2',
      title: 'Project Documentation',
      description: 'Comprehensive guide for the new features',
      imageUrl: 'https://picsum.photos/800/600?random=2',
      type: 'document',
      size: '156 KB',
      modifiedDate: new Date('2024-01-10'),
      author: 'Sarah Writer'
    }
    // ... more items
  ];

  onItemHover(item: PreviewItem): void {
    if (this.previewMode === 'hover') {
      this.selectedItem = item;
    }
  }

  onItemLeave(): void {
    if (this.previewMode === 'hover') {
      this.selectedItem = null;
    }
  }

  onItemClick(item: PreviewItem): void {
    if (this.previewMode === 'click') {
      this.selectedItem = this.selectedItem?.id === item.id ? null : item;
    } else if (this.previewMode === 'modal') {
      this.selectedItem = item;
      this.showPreviewModal = true;
    }
  }

  closeModal(): void {
    this.showPreviewModal = false;
    this.selectedItem = null;
  }

  setPreviewMode(mode: 'hover' | 'click' | 'modal'): void {
    this.previewMode = mode;
    this.selectedItem = null;
    this.showPreviewModal = false;
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'document': return '📄';
      case 'link': return '🔗';
      default: return '📁';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}`;
  }
}