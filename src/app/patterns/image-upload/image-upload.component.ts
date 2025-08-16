import { Component, ElementRef, ViewChild } from '@angular/core';

interface UploadedImage {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  uploadedImages: UploadedImage[] = [];
  isDragOver = false;
  maxFileSize = 5 * 1024 * 1024; // 5MB
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  maxFiles = 10;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  handleFiles(files: File[]): void {
    const validFiles = files.filter(file => this.validateFile(file));
    const remainingSlots = this.maxFiles - this.uploadedImages.length;
    const filesToProcess = validFiles.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const imageId = this.generateId();
      const uploadedImage: UploadedImage = {
        id: imageId,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: '',
        uploadProgress: 0,
        status: 'uploading'
      };

      this.uploadedImages.push(uploadedImage);
      this.generatePreview(uploadedImage);
      this.simulateUpload(uploadedImage);
    });

    // Clear the file input
    this.fileInput.nativeElement.value = '';
  }

  validateFile(file: File): boolean {
    if (!this.allowedTypes.includes(file.type)) {
      alert(`File type ${file.type} is not allowed. Please select: ${this.allowedTypes.join(', ')}`);
      return false;
    }

    if (file.size > this.maxFileSize) {
      alert(`File size exceeds ${this.formatFileSize(this.maxFileSize)} limit.`);
      return false;
    }

    return true;
  }

  generatePreview(image: UploadedImage): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.preview = e.target?.result as string;
    };
    reader.readAsDataURL(image.file);
  }

  simulateUpload(image: UploadedImage): void {
    const interval = setInterval(() => {
      image.uploadProgress += Math.random() * 20;
      
      if (image.uploadProgress >= 100) {
        image.uploadProgress = 100;
        image.status = 'completed';
        clearInterval(interval);
      }
    }, 200);

    // Simulate occasional errors
    if (Math.random() < 0.1) {
      setTimeout(() => {
        image.status = 'error';
        image.error = 'Upload failed. Please try again.';
        clearInterval(interval);
      }, 1000 + Math.random() * 2000);
    }
  }

  removeImage(imageId: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== imageId);
  }

  retryUpload(image: UploadedImage): void {
    image.status = 'uploading';
    image.uploadProgress = 0;
    image.error = undefined;
    this.simulateUpload(image);
  }

  clearAll(): void {
    this.uploadedImages = [];
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  get remainingSlots(): number {
    return this.maxFiles - this.uploadedImages.length;
  }

  get completedUploads(): number {
    return this.uploadedImages.filter(img => img.status === 'completed').length;
  }

  get failedUploads(): number {
    return this.uploadedImages.filter(img => img.status === 'error').length;
  }

  get htmlCode(): string {
    return `<!-- Image Upload Container -->
<div class="image-upload-container">
  <!-- Upload Area -->
  <div 
    class="upload-area"
    [class.drag-over]="isDragOver"
    (dragover)="onDragOver($event)"
    (dragleave)="onDragLeave($event)"
    (drop)="onDrop($event)"
    (click)="openFileDialog()">
    
    <input
      #fileInput
      type="file"
      multiple
      accept="image/*"
      (change)="onFileSelect($event)"
      class="file-input">
    
    <div class="upload-content">
      <div class="upload-icon">=ø</div>
      <h3 class="upload-title">Drop images here or click to browse</h3>
      <p class="upload-description">
        Upload up to {{ maxFiles }} images (max {{ formatFileSize(maxFileSize) }} each)
      </p>
      <div class="upload-formats">
        Supported: JPG, PNG, GIF, WebP
      </div>
    </div>
  </div>

  <!-- Upload Stats -->
  <div class="upload-stats" *ngIf="uploadedImages.length > 0">
    <div class="stat-item">
      <span class="stat-label">Total:</span>
      <span class="stat-value">{{ uploadedImages.length }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Completed:</span>
      <span class="stat-value success">{{ completedUploads }}</span>
    </div>
    <div class="stat-item" *ngIf="failedUploads > 0">
      <span class="stat-label">Failed:</span>
      <span class="stat-value error">{{ failedUploads }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Remaining slots:</span>
      <span class="stat-value">{{ remainingSlots }}</span>
    </div>
  </div>

  <!-- Uploaded Images Grid -->
  <div class="uploaded-images" *ngIf="uploadedImages.length > 0">
    <div class="images-header">
      <h3>Uploaded Images ({{ uploadedImages.length }})</h3>
      <button (click)="clearAll()" class="clear-all-btn">
        =Ñ Clear All
      </button>
    </div>

    <div class="images-grid">
      <div 
        *ngFor="let image of uploadedImages" 
        class="image-item"
        [class.uploading]="image.status === 'uploading'"
        [class.completed]="image.status === 'completed'"
        [class.error]="image.status === 'error'">
        
        <div class="image-preview">
          <img 
            *ngIf="image.preview" 
            [src]="image.preview" 
            [alt]="image.name"
            class="preview-img">
          <div *ngIf="!image.preview" class="preview-placeholder">
            =÷
          </div>
        </div>

        <div class="image-info">
          <div class="image-name">{{ image.name }}</div>
          <div class="image-size">{{ formatFileSize(image.size) }}</div>
          
          <!-- Progress Bar -->
          <div 
            *ngIf="image.status === 'uploading'" 
            class="progress-bar">
            <div 
              class="progress-fill"
              [style.width.%]="image.uploadProgress">
            </div>
            <span class="progress-text">{{ image.uploadProgress.toFixed(0) }}%</span>
          </div>

          <!-- Status Icons -->
          <div class="image-status">
            <span *ngIf="image.status === 'completed'" class="status-icon success">
               Uploaded
            </span>
            <span *ngIf="image.status === 'error'" class="status-icon error">
              L {{ image.error }}
            </span>
          </div>
        </div>

        <div class="image-actions">
          <button 
            *ngIf="image.status === 'error'"
            (click)="retryUpload(image)"
            class="action-btn retry">
            = Retry
          </button>
          <button 
            (click)="removeImage(image.id)"
            class="action-btn remove">
            =Ñ Remove
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div *ngIf="uploadedImages.length === 0" class="empty-state">
    <div class="empty-icon">=¼</div>
    <h3>No images uploaded yet</h3>
    <p>Drag and drop images above or click to browse your files</p>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Image Upload Container */
.image-upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Upload Area */
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
  position: relative;

  &:hover {
    border-color: #3b82f6;
    background: #f0f9ff;
  }

  &.drag-over {
    border-color: #10b981;
    background: #f0fdf4;
    transform: scale(1.02);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    &:hover {
      border-color: #60a5fa;
      background: #1e3a8a20;
    }

    &.drag-over {
      border-color: #34d399;
      background: #064e3b20;
    }
  }
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
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
  color: #111827;
  margin: 0 0 0.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.upload-description {
  color: #6b7280;
  margin: 0 0 1rem 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.upload-formats {
  font-size: 0.875rem;
  color: #9ca3af;
  font-style: italic;

  @media (prefers-color-scheme: dark) {
    color: #6b7280;
  }
}

/* Upload Stats */
.upload-stats {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;

  &.success {
    color: #10b981;
  }

  &.error {
    color: #ef4444;
  }

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

/* Uploaded Images */
.uploaded-images {
  margin-top: 2rem;
}

.images-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;

    @media (prefers-color-scheme: dark) {
      color: #f9fafb;
    }
  }
}

.clear-all-btn {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #dc2626;
  }
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.image-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease;

  &.uploading {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &.completed {
    border-color: #10b981;
  }

  &.error {
    border-color: #ef4444;
    background: #fef2f2;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    &.error {
      background: #7f1d1d20;
    }
  }
}

.image-preview {
  width: 100%;
  height: 150px;
  border-radius: 0.375rem;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  font-size: 3rem;
  color: #9ca3af;
}

.image-info {
  margin-bottom: 1rem;
}

.image-name {
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.image-size {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Progress Bar */
.progress-bar {
  position: relative;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
  border-radius: 0.25rem;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 500;
  color: #111827;
  text-shadow: 0 0 2px white;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
    text-shadow: 0 0 2px black;
  }
}

/* Status Icons */
.image-status {
  margin-bottom: 0.5rem;
}

.status-icon {
  font-size: 0.875rem;
  font-weight: 500;

  &.success {
    color: #10b981;
  }

  &.error {
    color: #ef4444;
  }
}

/* Image Actions */
.image-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &.retry {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &.remove {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #ef4444;
      color: white;
    }

    @media (prefers-color-scheme: dark) {
      background: #374151;
      color: #d1d5db;

      &:hover {
        background: #ef4444;
        color: white;
      }
    }
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: #374151;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .image-upload-container {
    padding: 0.5rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }

  .upload-stats {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .images-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, ElementRef, ViewChild } from '@angular/core';

interface UploadedImage {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  uploadedImages: UploadedImage[] = [];
  isDragOver = false;
  maxFileSize = 5 * 1024 * 1024; // 5MB
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  maxFiles = 10;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  handleFiles(files: File[]): void {
    const validFiles = files.filter(file => this.validateFile(file));
    const remainingSlots = this.maxFiles - this.uploadedImages.length;
    const filesToProcess = validFiles.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const uploadedImage: UploadedImage = {
        id: this.generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: '',
        uploadProgress: 0,
        status: 'uploading'
      };

      this.uploadedImages.push(uploadedImage);
      this.generatePreview(uploadedImage);
      this.simulateUpload(uploadedImage);
    });
  }

  validateFile(file: File): boolean {
    return this.allowedTypes.includes(file.type) && file.size <= this.maxFileSize;
  }

  generatePreview(image: UploadedImage): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.preview = e.target?.result as string;
    };
    reader.readAsDataURL(image.file);
  }

  simulateUpload(image: UploadedImage): void {
    const interval = setInterval(() => {
      image.uploadProgress += Math.random() * 20;
      
      if (image.uploadProgress >= 100) {
        image.uploadProgress = 100;
        image.status = 'completed';
        clearInterval(interval);
      }
    }, 200);
  }

  removeImage(imageId: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== imageId);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}`;
  }
}