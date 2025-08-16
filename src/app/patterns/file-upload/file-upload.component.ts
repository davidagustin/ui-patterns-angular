import { Component } from '@angular/core';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'uploading' | 'success' | 'error';
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  files: UploadedFile[] = [];
  dragActive = false;
  maxFileSize = 10 * 1024 * 1024; // 10MB
  allowedTypes = ['image/*', 'application/pdf', 'text/*'];

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFiles(Array.from(target.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(fileList: File[]): void {
    fileList.forEach(file => {
      if (this.validateFile(file)) {
        const uploadFile: UploadedFile = {
          id: this.generateId(),
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'uploading'
        };
        
        this.files.push(uploadFile);
        this.simulateUpload(uploadFile);
      }
    });
  }

  private validateFile(file: File): boolean {
    if (file.size > this.maxFileSize) {
      alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      return false;
    }
    return true;
  }

  private simulateUpload(file: UploadedFile): void {
    const interval = setInterval(() => {
      if (file.progress !== undefined) {
        file.progress += Math.random() * 20;
        if (file.progress >= 100) {
          file.progress = 100;
          file.status = 'success';
          clearInterval(interval);
        }
      }
    }, 100);
  }

  removeFile(fileId: string): void {
    this.files = this.files.filter(f => f.id !== fileId);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  get htmlCode(): string {
    return `<div class="file-upload-container">
  <!-- Upload Area -->
  <div class="upload-area"
       [class.drag-active]="dragActive"
       (dragover)="onDragOver($event)"
       (dragleave)="onDragLeave($event)"
       (drop)="onDrop($event)">
    
    <div class="upload-content">
      <div class="upload-icon">📁</div>
      <h3 class="upload-title">Drop files here or click to browse</h3>
      <p class="upload-subtitle">Supports images, PDFs, and text files up to 10MB</p>
      
      <input type="file"
             multiple
             class="file-input"
             (change)="onFileSelect($event)"
             accept="image/*,application/pdf,text/*">
      
      <button class="browse-btn" onclick="this.previousElementSibling.click()">
        Browse Files
      </button>
    </div>
  </div>

  <!-- File List -->
  <div class="file-list" *ngIf="files.length > 0">
    <h4 class="list-title">Uploaded Files ({{ files.length }})</h4>
    
    <div *ngFor="let file of files" class="file-item">
      <div class="file-info">
        <div class="file-icon">
          <span *ngIf="file.type.startsWith('image/')">🖼️</span>
          <span *ngIf="file.type === 'application/pdf'">📄</span>
          <span *ngIf="file.type.startsWith('text/')">📝</span>
          <span *ngIf="!file.type.startsWith('image/') && file.type !== 'application/pdf' && !file.type.startsWith('text/')">📎</span>
        </div>
        
        <div class="file-details">
          <div class="file-name">{{ file.name }}</div>
          <div class="file-meta">
            {{ formatFileSize(file.size) }} • 
            <span [class]="'status ' + file.status">{{ file.status }}</span>
          </div>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="progress-container" *ngIf="file.status === 'uploading'">
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="file.progress"></div>
        </div>
        <span class="progress-text">{{ file.progress?.toFixed(0) }}%</span>
      </div>
      
      <!-- Actions -->
      <div class="file-actions">
        <button class="action-btn success" *ngIf="file.status === 'success'">
          ✓
        </button>
        <button class="action-btn error" *ngIf="file.status === 'error'">
          ⚠️
        </button>
        <button class="action-btn remove" (click)="removeFile(file.id)">
          🗑️
        </button>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* File Upload Container */
.file-upload-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Upload Area */
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  background: #f9fafb;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #3b82f6;
    background: #f0f9ff;
  }

  &.drag-active {
    border-color: #3b82f6;
    background: #dbeafe;
    transform: scale(1.02);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    &:hover {
      background: #1e3a8a;
      border-color: #60a5fa;
    }

    &.drag-active {
      background: #1e40af;
      border-color: #60a5fa;
    }
  }
}

.upload-content {
  pointer-events: none;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.upload-subtitle {
  color: #6b7280;
  margin: 0 0 1.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.browse-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  pointer-events: all;
  transition: background 0.2s ease;

  &:hover {
    background: #2563eb;
  }
}

/* File List */
.file-list {
  margin-top: 2rem;
}

.list-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  gap: 1rem;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.file-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.file-details {
  min-width: 0;
  flex: 1;
}

.file-name {
  font-weight: 500;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.file-meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.status {
  &.uploading {
    color: #f59e0b;
  }

  &.success {
    color: #10b981;
  }

  &.error {
    color: #ef4444;
  }
}

/* Progress Bar */
.progress-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: #6b7280;
  min-width: 35px;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* File Actions */
.file-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &.success {
    background: #dcfce7;
    color: #16a34a;

    &:hover {
      background: #bbf7d0;
    }
  }

  &.error {
    background: #fef2f2;
    color: #dc2626;

    &:hover {
      background: #fecaca;
    }
  }

  &.remove {
    background: #f3f4f6;
    color: #6b7280;

    &:hover {
      background: #ef4444;
      color: white;
    }
  }

  @media (prefers-color-scheme: dark) {
    &.success {
      background: #064e3b;
      color: #34d399;
    }

    &.error {
      background: #7f1d1d;
      color: #f87171;
    }

    &.remove {
      background: #374151;
      color: #9ca3af;

      &:hover {
        background: #dc2626;
      }
    }
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .upload-area {
    padding: 2rem 1rem;
  }

  .file-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .progress-container {
    min-width: auto;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'uploading' | 'success' | 'error';
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  files: UploadedFile[] = [];
  dragActive = false;
  maxFileSize = 10 * 1024 * 1024; // 10MB
  allowedTypes = ['image/*', 'application/pdf', 'text/*'];

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFiles(Array.from(target.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(fileList: File[]): void {
    fileList.forEach(file => {
      if (this.validateFile(file)) {
        const uploadFile: UploadedFile = {
          id: this.generateId(),
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'uploading'
        };
        
        this.files.push(uploadFile);
        this.simulateUpload(uploadFile);
      }
    });
  }

  private validateFile(file: File): boolean {
    if (file.size > this.maxFileSize) {
      alert(\`File \${file.name} is too large. Maximum size is 10MB.\`);
      return false;
    }
    return true;
  }

  removeFile(fileId: string): void {
    this.files = this.files.filter(f => f.id !== fileId);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}`;
  }
}