import { Component, HostListener } from '@angular/core';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

interface GalleryFilter {
  category: string;
  label: string;
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  selectedImageIndex = -1;
  isLightboxOpen = false;
  currentFilter = 'all';
  searchQuery = '';
  viewMode: 'grid' | 'masonry' | 'list' = 'grid';
  columns = 3;

  filters: GalleryFilter[] = [
    { category: 'all', label: 'All Images' },
    { category: 'nature', label: 'Nature' },
    { category: 'architecture', label: 'Architecture' },
    { category: 'people', label: 'People' },
    { category: 'technology', label: 'Technology' }
  ];

  images: GalleryImage[] = [
    {
      id: '1',
      src: 'https://picsum.photos/400/300?random=1',
      alt: 'Beautiful landscape',
      title: 'Mountain Vista',
      description: 'A stunning view of snow-capped mountains at sunrise',
      category: 'nature',
      tags: ['landscape', 'mountains', 'sunrise']
    },
    {
      id: '2',
      src: 'https://picsum.photos/400/500?random=2',
      alt: 'Modern building',
      title: 'Glass Tower',
      description: 'Contemporary glass architecture in the city center',
      category: 'architecture',
      tags: ['building', 'glass', 'modern']
    },
    {
      id: '3',
      src: 'https://picsum.photos/400/400?random=3',
      alt: 'Portrait photo',
      title: 'Street Portrait',
      description: 'Candid street photography capturing human emotion',
      category: 'people',
      tags: ['portrait', 'street', 'emotion']
    },
    {
      id: '4',
      src: 'https://picsum.photos/400/350?random=4',
      alt: 'Technology setup',
      title: 'Workspace',
      description: 'Modern workspace with multiple monitors and gadgets',
      category: 'technology',
      tags: ['workspace', 'computer', 'setup']
    },
    {
      id: '5',
      src: 'https://picsum.photos/400/450?random=5',
      alt: 'Forest path',
      title: 'Forest Trail',
      description: 'Winding path through dense autumn forest',
      category: 'nature',
      tags: ['forest', 'path', 'autumn']
    },
    {
      id: '6',
      src: 'https://picsum.photos/400/320?random=6',
      alt: 'City skyline',
      title: 'Urban Skyline',
      description: 'City lights reflecting on water at dusk',
      category: 'architecture',
      tags: ['city', 'skyline', 'lights']
    },
    {
      id: '7',
      src: 'https://picsum.photos/400/380?random=7',
      alt: 'Group photo',
      title: 'Friends',
      description: 'Happy group of friends enjoying outdoor activities',
      category: 'people',
      tags: ['friends', 'group', 'happy']
    },
    {
      id: '8',
      src: 'https://picsum.photos/400/420?random=8',
      alt: 'Gadgets',
      title: 'Tech Collection',
      description: 'Collection of modern electronic devices and accessories',
      category: 'technology',
      tags: ['gadgets', 'electronics', 'modern']
    },
    {
      id: '9',
      src: 'https://picsum.photos/400/360?random=9',
      alt: 'Ocean waves',
      title: 'Ocean View',
      description: 'Powerful waves crashing against rocky coastline',
      category: 'nature',
      tags: ['ocean', 'waves', 'coast']
    }
  ];

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }

  get filteredImages(): GalleryImage[] {
    let filtered = this.images;

    // Filter by category
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(img => img.category === this.currentFilter);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(img =>
        img.title?.toLowerCase().includes(query) ||
        img.description?.toLowerCase().includes(query) ||
        img.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  get currentImage(): GalleryImage | null {
    if (this.selectedImageIndex >= 0 && this.selectedImageIndex < this.filteredImages.length) {
      return this.filteredImages[this.selectedImageIndex];
    }
    return null;
  }

  openLightbox(index: number): void {
    this.selectedImageIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedImageIndex = -1;
    document.body.style.overflow = 'auto';
  }

  previousImage(): void {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    } else {
      this.selectedImageIndex = this.filteredImages.length - 1;
    }
  }

  nextImage(): void {
    if (this.selectedImageIndex < this.filteredImages.length - 1) {
      this.selectedImageIndex++;
    } else {
      this.selectedImageIndex = 0;
    }
  }

  setFilter(category: string): void {
    this.currentFilter = category;
  }

  setViewMode(mode: 'grid' | 'masonry' | 'list'): void {
    this.viewMode = mode;
  }

  setColumns(cols: number): void {
    this.columns = cols;
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
  }

  get htmlCode(): string {
    return `<!-- Image Gallery Container -->
<div class="gallery-container">
  <!-- Gallery Controls -->
  <div class="gallery-controls">
    <div class="search-container">
      <input type="text" 
             class="search-input"
             placeholder="Search images..."
             [(ngModel)]="searchQuery">
    </div>
    
    <div class="filter-buttons">
      <button *ngFor="let filter of filters"
              class="filter-btn"
              [class.active]="currentFilter === filter.category"
              (click)="setFilter(filter.category)">
        {{ filter.label }}
      </button>
    </div>
    
    <div class="view-controls">
      <button class="view-btn"
              [class.active]="viewMode === 'grid'"
              (click)="setViewMode('grid')">Grid</button>
      <button class="view-btn"
              [class.active]="viewMode === 'masonry'"
              (click)="setViewMode('masonry')">Masonry</button>
      <button class="view-btn"
              [class.active]="viewMode === 'list'"
              (click)="setViewMode('list')">List</button>
    </div>
  </div>

  <!-- Image Grid -->
  <div class="image-grid" [ngClass]="'view-' + viewMode">
    <div *ngFor="let image of filteredImages; let i = index"
         class="image-item"
         (click)="openLightbox(i)">
      <img [src]="image.src"
           [alt]="image.alt"
           (load)="onImageLoad($event)"
           (error)="onImageError($event)">
      <div class="image-overlay">
        <h3 class="image-title">{{ image.title }}</h3>
        <p class="image-description">{{ image.description }}</p>
      </div>
    </div>
  </div>

  <!-- Lightbox -->
  <div class="lightbox" [class.open]="isLightboxOpen" (click)="closeLightbox()">
    <div class="lightbox-content" (click)="$event.stopPropagation()">
      <button class="lightbox-close" (click)="closeLightbox()">×</button>
      
      <button class="lightbox-nav prev" (click)="previousImage()">‹</button>
      <button class="lightbox-nav next" (click)="nextImage()">›</button>
      
      <img *ngIf="currentImage" 
           [src]="currentImage.src"
           [alt]="currentImage.alt"
           class="lightbox-image">
      
      <div class="lightbox-info" *ngIf="currentImage">
        <h3>{{ currentImage.title }}</h3>
        <p>{{ currentImage.description }}</p>
        <div class="image-tags">
          <span *ngFor="let tag of currentImage.tags" 
                class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Gallery Container */
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Gallery Controls */
.gallery-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
  }
}

.search-container {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
  }
  
  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
}

.view-controls {
  display: flex;
  gap: 0.25rem;
}

.view-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  
  &:first-child {
    border-radius: 0.375rem 0 0 0.375rem;
  }
  
  &:last-child {
    border-radius: 0 0.375rem 0.375rem 0;
  }
  
  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
}

/* Image Grid */
.image-grid {
  display: grid;
  gap: 1rem;
  
  &.view-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  &.view-masonry {
    columns: 3;
    column-gap: 1rem;
    
    @media (max-width: 768px) {
      columns: 2;
    }
    
    @media (max-width: 480px) {
      columns: 1;
    }
  }
  
  &.view-list {
    grid-template-columns: 1fr;
    
    .image-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      img {
        width: 150px;
        height: 100px;
        object-fit: cover;
      }
    }
  }
}

.image-item {
  position: relative;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease;
  break-inside: avoid;
  margin-bottom: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: opacity 0.3s ease;
    
    &:not(.loaded) {
      opacity: 0;
    }
    
    &.loaded {
      opacity: 1;
    }
  }
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  .image-item:hover & {
    transform: translateY(0);
  }
}

.image-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.image-description {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  
  &.open {
    opacity: 1;
    visibility: visible;
  }
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  
  &.prev {
    left: -80px;
  }
  
  &.next {
    right: -80px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.lightbox-info {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  text-align: center;
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }
  
  p {
    margin: 0 0 1rem 0;
    opacity: 0.9;
  }
}

.image-tags {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  selectedImageIndex = -1;
  isLightboxOpen = false;
  currentFilter = 'all';
  searchQuery = '';
  viewMode: 'grid' | 'masonry' | 'list' = 'grid';

  images: GalleryImage[] = [
    {
      id: '1',
      src: 'https://picsum.photos/400/300?random=1',
      alt: 'Beautiful landscape',
      title: 'Mountain Vista',
      description: 'A stunning view of snow-capped mountains',
      category: 'nature',
      tags: ['landscape', 'mountains']
    }
    // ... more images
  ];

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }

  get filteredImages(): GalleryImage[] {
    let filtered = this.images;
    
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(img => img.category === this.currentFilter);
    }
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(img =>
        img.title?.toLowerCase().includes(query) ||
        img.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }

  openLightbox(index: number): void {
    this.selectedImageIndex = index;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedImageIndex = -1;
  }
}`;
  }
}