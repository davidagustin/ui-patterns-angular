import { Component, ElementRef, ViewChild } from '@angular/core';

interface ZoomableImage {
  id: string;
  src: string;
  alt: string;
  description: string;
}

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent {
  @ViewChild('zoomContainer', { static: false }) zoomContainer!: ElementRef;
  @ViewChild('zoomImage', { static: false }) zoomImage!: ElementRef;

  selectedImage: ZoomableImage | null = null;
  isZooming = false;
  zoomLevel = 1;
  panPosition = { x: 0, y: 0 };
  isPanning = false;
  lastPanPoint = { x: 0, y: 0 };

  images: ZoomableImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Mountain landscape',
      description: 'Beautiful mountain scenery with snow-capped peaks'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'Forest path',
      description: 'Serene forest trail with morning light'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Ocean waves',
      description: 'Powerful ocean waves crashing on rocks'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'City skyline',
      description: 'Modern city skyline at sunset'
    }
  ];

  openZoom(image: ZoomableImage): void {
    this.selectedImage = image;
    this.isZooming = true;
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
    document.body.style.overflow = 'hidden';
  }

  closeZoom(): void {
    this.selectedImage = null;
    this.isZooming = false;
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
    document.body.style.overflow = 'auto';
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    this.zoomLevel = Math.max(0.5, Math.min(5, this.zoomLevel * delta));
    this.updateImageTransform();
  }

  onMouseDown(event: MouseEvent): void {
    if (this.zoomLevel > 1) {
      this.isPanning = true;
      this.lastPanPoint = { x: event.clientX, y: event.clientY };
      event.preventDefault();
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isPanning && this.zoomLevel > 1) {
      const deltaX = event.clientX - this.lastPanPoint.x;
      const deltaY = event.clientY - this.lastPanPoint.y;
      
      this.panPosition.x += deltaX;
      this.panPosition.y += deltaY;
      
      this.lastPanPoint = { x: event.clientX, y: event.clientY };
      this.updateImageTransform();
    }
  }

  onMouseUp(): void {
    this.isPanning = false;
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(5, this.zoomLevel * 1.2);
    this.updateImageTransform();
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(0.5, this.zoomLevel * 0.8);
    if (this.zoomLevel === 1) {
      this.panPosition = { x: 0, y: 0 };
    }
    this.updateImageTransform();
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
    this.updateImageTransform();
  }

  private updateImageTransform(): void {
    if (this.zoomImage) {
      const transform = `scale(${this.zoomLevel}) translate(${this.panPosition.x / this.zoomLevel}px, ${this.panPosition.y / this.zoomLevel}px)`;
      this.zoomImage.nativeElement.style.transform = transform;
    }
  }

  get exampleCode(): string {
    return `<!-- Basic Image Zoom Example -->
<div class="image-gallery">
  <div class="image-item" *ngFor="let image of images" (click)="openZoom(image)">
    <img [src]="image.src" [alt]="image.alt" loading="lazy">
    <div class="zoom-indicator">🔍</div>
  </div>
</div>

<!-- Zoom Modal -->
<div class="zoom-modal" *ngIf="isZooming" (click)="closeZoom()">
  <div class="zoom-container" 
       (wheel)="onWheel($event)"
       (mousedown)="onMouseDown($event)"
       (mousemove)="onMouseMove($event)"
       (mouseup)="onMouseUp()">
    <img [src]="selectedImage?.src" 
         [alt]="selectedImage?.alt"
         class="zoom-image">
  </div>
  
  <div class="zoom-controls">
    <button (click)="zoomIn(); $event.stopPropagation()">+</button>
    <button (click)="zoomOut(); $event.stopPropagation()">-</button>
    <button (click)="resetZoom(); $event.stopPropagation()">Reset</button>
  </div>
</div>

<!-- Component Logic -->
export class ImageZoomComponent {
  zoomLevel = 1;
  panPosition = { x: 0, y: 0 };
  
  onWheel(event: WheelEvent) {
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    this.zoomLevel = Math.max(0.5, Math.min(5, this.zoomLevel * delta));
  }
}`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Image Zoom" 
  description="Interactive image zoom with pan and zoom controls"
  icon="🔍">
</app-pattern-header>

<div class="image-zoom-demo">
  <!-- Gallery Grid -->
  <div class="gallery-grid">
    <div *ngFor="let image of images" 
         class="gallery-item"
         (click)="openZoom(image)">
      <img [src]="image.src" 
           [alt]="image.alt" 
           class="gallery-image"
           loading="lazy">
      <div class="image-overlay">
        <div class="zoom-icon">🔍</div>
        <div class="image-info">
          <h3>{{ image.alt }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Zoom Modal -->
  <div class="zoom-modal" 
       *ngIf="isZooming" 
       (click)="closeZoom()"
       [@fadeInOut]>
    
    <!-- Close Button -->
    <button class="close-btn" 
            (click)="closeZoom(); $event.stopPropagation()"
            aria-label="Close zoom">
      ✕
    </button>

    <!-- Zoom Container -->
    <div #zoomContainer 
         class="zoom-container"
         (wheel)="onWheel($event)"
         (mousedown)="onMouseDown($event)"
         (mousemove)="onMouseMove($event)"
         (mouseup)="onMouseUp()"
         (click)="$event.stopPropagation()">
      
      <img #zoomImage
           [src]="selectedImage?.src" 
           [alt]="selectedImage?.alt"
           class="zoom-image"
           [class.panning]="isPanning">
    </div>

    <!-- Zoom Controls -->
    <div class="zoom-controls" (click)="$event.stopPropagation()">
      <button class="control-btn zoom-in" 
              (click)="zoomIn()"
              [disabled]="zoomLevel >= 5"
              title="Zoom In">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
        </svg>
      </button>
      
      <button class="control-btn zoom-out" 
              (click)="zoomOut()"
              [disabled]="zoomLevel <= 0.5"
              title="Zoom Out">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M7 9v1h5V9H7z"/>
        </svg>
      </button>
      
      <button class="control-btn reset" 
              (click)="resetZoom()"
              title="Reset Zoom">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
      </button>
      
      <!-- Zoom Level Indicator -->
      <div class="zoom-level">{{ (zoomLevel * 100).toFixed(0) }}%</div>
    </div>

    <!-- Image Info -->
    <div class="image-info-panel" *ngIf="selectedImage">
      <h3>{{ selectedImage.alt }}</h3>
      <p>{{ selectedImage.description }}</p>
    </div>
  </div>
</div>

<app-code-tabs 
  [htmlCode]="htmlCode"
  [scssCode]="scssCode"
  [typescriptCode]="typescriptCode"
  [exampleCode]="exampleCode">
</app-code-tabs>`;
  }

  get scssCode(): string {
    return `/* Image Zoom Styles */
.image-zoom-demo {
  padding: var(--spacing-6);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);

    .image-overlay {
      opacity: 1;
    }

    .gallery-image {
      transform: scale(1.05);
    }
  }
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.7) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
  color: white;
  text-align: center;
  padding: var(--spacing-4);
}

.zoom-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.image-info {
  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin: 0 0 var(--spacing-1) 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  p {
    font-size: var(--font-size-sm);
    margin: 0;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
}

/* Zoom Modal */
.zoom-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}

.close-btn {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 3rem;
  height: 3rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-normal);
  z-index: 1001;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
}

.zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.zoom-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  transition: transform 0.1s ease-out;
  transform-origin: center;
  user-select: none;

  &.panning {
    cursor: grabbing;
  }
}

.zoom-controls {
  position: absolute;
  bottom: var(--spacing-6);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-2);
  background: rgba(0, 0, 0, 0.7);
  padding: var(--spacing-3);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
  z-index: 1001;
}

.control-btn {
  width: 3rem;
  height: 3rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
}

.zoom-level {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  padding: 0 var(--spacing-3);
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
}

.image-info-panel {
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  max-width: 300px;
  z-index: 1001;

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin: 0 0 var(--spacing-2) 0;
  }

  p {
    font-size: var(--font-size-sm);
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-3);
  }

  .close-btn {
    top: var(--spacing-2);
    right: var(--spacing-2);
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }

  .zoom-controls {
    bottom: var(--spacing-4);
    gap: var(--spacing-1);
    padding: var(--spacing-2);
  }

  .control-btn {
    width: 2.5rem;
    height: 2.5rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  .image-info-panel {
    top: var(--spacing-2);
    left: var(--spacing-2);
    max-width: calc(100vw - var(--spacing-8));
    padding: var(--spacing-3);
  }

  .zoom-image {
    max-width: 95vw;
    max-height: 95vh;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .gallery-item {
    box-shadow: var(--shadow-dark);

    &:hover {
      box-shadow: var(--shadow-dark-lg);
    }
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .gallery-image,
  .image-overlay,
  .control-btn,
  .close-btn {
    transition: none;
  }

  .zoom-icon {
    animation: none;
  }
}

/* Focus Management */
.gallery-item:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Touch Support */
@media (hover: none) {
  .image-overlay {
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 50%
    );
    justify-content: flex-end;
  }

  .zoom-icon {
    display: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, ElementRef, ViewChild } from '@angular/core';

interface ZoomableImage {
  id: string;
  src: string;
  alt: string;
  description: string;
}

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent {
  @ViewChild('zoomContainer', { static: false }) zoomContainer!: ElementRef;
  @ViewChild('zoomImage', { static: false }) zoomImage!: ElementRef;

  selectedImage: ZoomableImage | null = null;
  isZooming = false;
  zoomLevel = 1;
  panPosition = { x: 0, y: 0 };
  isPanning = false;
  lastPanPoint = { x: 0, y: 0 };

  images: ZoomableImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Mountain landscape',
      description: 'Beautiful mountain scenery with snow-capped peaks'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'Forest path',
      description: 'Serene forest trail with morning light'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Ocean waves',
      description: 'Powerful ocean waves crashing on rocks'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'City skyline',
      description: 'Modern city skyline at sunset'
    }
  ];

  openZoom(image: ZoomableImage): void {
    this.selectedImage = image;
    this.isZooming = true;
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
    document.body.style.overflow = 'hidden';
  }

  closeZoom(): void {
    this.selectedImage = null;
    this.isZooming = false;
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
    document.body.style.overflow = 'auto';
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    this.zoomLevel = Math.max(0.5, Math.min(5, this.zoomLevel * delta));
    this.updateImageTransform();
  }

  onMouseDown(event: MouseEvent): void {
    if (this.zoomLevel > 1) {
      this.isPanning = true;
      this.lastPanPoint = { x: event.clientX, y: event.clientY };
      event.preventDefault();
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isPanning && this.zoomLevel > 1) {
      const deltaX = event.clientX - this.lastPanPoint.x;
      const deltaY = event.clientY - this.lastPanPoint.y;
      
      this.panPosition.x += deltaX;
      this.panPosition.y += deltaY;
      
      this.lastPanPoint = { x: event.clientX, y: event.clientY };
      this.updateImageTransform();
    }
  }

  onMouseUp(): void {
    this.isPanning = false;
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(5, this.zoomLevel * 1.2);
    this.updateImageTransform();
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(0.5, this.zoomLevel * 0.8);
    if (this.zoomLevel === 1) {
      this.panPosition = { x: 0, y: 0 };
    }
    this.updateImageTransform();
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
    this.updateImageTransform();
  }

  private updateImageTransform(): void {
    if (this.zoomImage) {
      const transform = \`scale(\${this.zoomLevel}) translate(\${this.panPosition.x / this.zoomLevel}px, \${this.panPosition.y / this.zoomLevel}px)\`;
      this.zoomImage.nativeElement.style.transform = transform;
    }
  }
}`;
  }
}