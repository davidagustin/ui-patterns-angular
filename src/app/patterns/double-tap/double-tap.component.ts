import { Component, HostListener } from '@angular/core';

interface DoubleTapItem {
  id: string;
  title: string;
  content: string;
  liked: boolean;
  likes: number;
  bookmarked: boolean;
  image?: string;
}

interface TapEvent {
  id: string;
  timestamp: number;
  action: 'like' | 'bookmark' | 'zoom' | 'select';
}

@Component({
  selector: 'app-double-tap',
  templateUrl: './double-tap.component.html',
  styleUrls: ['./double-tap.component.scss']
})
export class DoubleTapComponent {
  private tapTimeout: any = null;
  private lastTap = 0;
  private doubleTapDelay = 300; // milliseconds
  
  currentDemo: 'cards' | 'gallery' | 'list' = 'cards';
  showInstructions = true;
  
  recentTaps: TapEvent[] = [];
  selectedItems = new Set<string>();
  zoomedImage: string | null = null;

  // Demo data
  cardItems: DoubleTapItem[] = [
    {
      id: 'card-1',
      title: 'Mountain Adventure',
      content: 'Explore breathtaking mountain trails and discover hidden gems in nature.',
      liked: false,
      likes: 42,
      bookmarked: false,
      image: '🏔️'
    },
    {
      id: 'card-2',
      title: 'Ocean Waves',
      content: 'Listen to the soothing sounds of ocean waves on a peaceful beach.',
      liked: true,
      likes: 89,
      bookmarked: false,
      image: '🌊'
    },
    {
      id: 'card-3',
      title: 'Forest Path',
      content: 'Walk through ancient forests and connect with the natural world.',
      liked: false,
      likes: 67,
      bookmarked: true,
      image: '🌲'
    },
    {
      id: 'card-4',
      title: 'Desert Sunset',
      content: 'Watch spectacular sunsets paint the desert sky in brilliant colors.',
      liked: false,
      likes: 34,
      bookmarked: false,
      image: '🌅'
    }
  ];

  galleryItems = [
    { id: 'img-1', src: '🖼️', alt: 'Abstract Art 1' },
    { id: 'img-2', src: '🎨', alt: 'Abstract Art 2' },
    { id: 'img-3', src: '🖌️', alt: 'Abstract Art 3' },
    { id: 'img-4', src: '🎭', alt: 'Abstract Art 4' },
    { id: 'img-5', src: '🌈', alt: 'Abstract Art 5' },
    { id: 'img-6', src: '⭐', alt: 'Abstract Art 6' }
  ];

  listItems = [
    { id: 'list-1', name: 'Creative Writing Workshop', type: 'Workshop' },
    { id: 'list-2', name: 'Digital Photography Course', type: 'Course' },
    { id: 'list-3', name: 'Web Development Bootcamp', type: 'Bootcamp' },
    { id: 'list-4', name: 'UI/UX Design Fundamentals', type: 'Course' },
    { id: 'list-5', name: 'Data Science Masterclass', type: 'Masterclass' }
  ];

  setCurrentDemo(demo: 'cards' | 'gallery' | 'list'): void {
    this.currentDemo = demo;
    this.clearSelections();
  }

  clearSelections(): void {
    this.selectedItems.clear();
    this.zoomedImage = null;
  }

  dismissInstructions(): void {
    this.showInstructions = false;
  }

  // Single tap handler
  handleSingleTap(item: any, action: string): void {
    console.log(`Single tap: ${action} on ${item.id || item.name}`);
    
    // Add visual feedback for single tap
    this.addTapEvent(item.id, action as any);
  }

  // Double tap handlers for different contexts
  handleCardDoubleTap(card: DoubleTapItem): void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTap;
    
    if (tapLength < this.doubleTapDelay && tapLength > 0) {
      // This is a double tap
      this.toggleLike(card);
      this.addTapEvent(card.id, 'like');
    }
    
    this.lastTap = currentTime;
  }

  handleImageDoubleTap(image: any): void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTap;
    
    if (tapLength < this.doubleTapDelay && tapLength > 0) {
      // This is a double tap - zoom image
      this.zoomedImage = this.zoomedImage === image.src ? null : image.src;
      this.addTapEvent(image.id, 'zoom');
    }
    
    this.lastTap = currentTime;
  }

  handleListDoubleTap(item: any): void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTap;
    
    if (tapLength < this.doubleTapDelay && tapLength > 0) {
      // This is a double tap - select item
      this.toggleSelection(item.id);
      this.addTapEvent(item.id, 'select');
    }
    
    this.lastTap = currentTime;
  }

  // Action methods
  toggleLike(card: DoubleTapItem): void {
    card.liked = !card.liked;
    card.likes += card.liked ? 1 : -1;
    
    // Add heart animation
    this.showHeartAnimation(card.id);
  }

  toggleBookmark(card: DoubleTapItem): void {
    card.bookmarked = !card.bookmarked;
    this.addTapEvent(card.id, 'bookmark');
  }

  toggleSelection(itemId: string): void {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
    } else {
      this.selectedItems.add(itemId);
    }
  }

  isSelected(itemId: string): boolean {
    return this.selectedItems.has(itemId);
  }

  // Helper methods
  private addTapEvent(id: string, action: 'like' | 'bookmark' | 'zoom' | 'select'): void {
    const event: TapEvent = {
      id,
      timestamp: Date.now(),
      action
    };
    
    this.recentTaps.unshift(event);
    
    // Keep only last 5 events
    if (this.recentTaps.length > 5) {
      this.recentTaps = this.recentTaps.slice(0, 5);
    }
  }

  private showHeartAnimation(cardId: string): void {
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
      cardElement.classList.add('heart-animation');
      setTimeout(() => {
        cardElement.classList.remove('heart-animation');
      }, 600);
    }
  }

  getTimeSince(timestamp: number): string {
    const diff = Date.now() - timestamp;
    if (diff < 1000) return 'Just now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    return `${Math.floor(diff / 60000)}m ago`;
  }

  clearEventLog(): void {
    this.recentTaps = [];
  }

  // Keyboard support for accessibility
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      const cardId = target.getAttribute('data-card-id');
      
      if (cardId && this.currentDemo === 'cards') {
        const card = this.cardItems.find(c => c.id === cardId);
        if (card) {
          this.toggleLike(card);
          event.preventDefault();
        }
      }
    }
  }

  get exampleCode(): string {
    return `<!-- Simple Double Tap Example -->
<div class="double-tap-demo">
  <div 
    class="tap-card"
    (click)="handleDoubleTap($event, item)"
    [class.liked]="item.liked">
    
    <h3>{{ item.title }}</h3>
    <p>{{ item.content }}</p>
    
    <div class="card-actions">
      <span class="like-count">{{ item.likes }} likes</span>
    </div>
    
    <!-- Heart animation overlay -->
    <div class="heart-overlay" *ngIf="showHeart">❤️</div>
  </div>
</div>

<!-- Component TypeScript -->
export class DoubleTapDemo {
  private lastTap = 0;
  private doubleTapDelay = 300;
  
  handleDoubleTap(event: Event, item: any) {
    const currentTime = Date.now();
    const tapLength = currentTime - this.lastTap;
    
    if (tapLength < this.doubleTapDelay && tapLength > 0) {
      // Double tap detected
      this.toggleLike(item);
    }
    
    this.lastTap = currentTime;
  }
  
  toggleLike(item: any) {
    item.liked = !item.liked;
    item.likes += item.liked ? 1 : -1;
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="double-tap-container">
  <!-- Demo Controls -->
  <div class="demo-controls">
    <button 
      *ngFor="let demo of ['cards', 'gallery', 'list']"
      (click)="setCurrentDemo(demo)"
      [class.active]="currentDemo === demo"
      class="demo-btn">
      {{ demo | titlecase }} Demo
    </button>
  </div>

  <!-- Instructions Banner -->
  <div *ngIf="showInstructions" class="instructions-banner">
    <div class="instructions-content">
      <span class="instructions-icon">👆</span>
      <div class="instructions-text">
        <h4>Double-tap to interact!</h4>
        <p>Try double-tapping on items to trigger special actions</p>
      </div>
      <button (click)="dismissInstructions()" class="dismiss-btn">×</button>
    </div>
  </div>

  <!-- Cards Demo -->
  <div *ngIf="currentDemo === 'cards'" class="cards-demo">
    <h3 class="demo-title">Double-tap to Like Cards</h3>
    <div class="cards-grid">
      <div 
        *ngFor="let card of cardItems"
        class="tap-card"
        [attr.data-card-id]="card.id"
        (click)="handleCardDoubleTap(card)"
        [class.liked]="card.liked"
        tabindex="0">
        
        <div class="card-image">{{ card.image }}</div>
        <div class="card-content">
          <h4 class="card-title">{{ card.title }}</h4>
          <p class="card-text">{{ card.content }}</p>
        </div>
        
        <div class="card-footer">
          <div class="card-stats">
            <span class="like-count" [class.active]="card.liked">
              ❤️ {{ card.likes }}
            </span>
            <button 
              (click)="$event.stopPropagation(); toggleBookmark(card)"
              class="bookmark-btn"
              [class.active]="card.bookmarked">
              🔖
            </button>
          </div>
        </div>
        
        <!-- Heart animation overlay -->
        <div class="heart-overlay">❤️</div>
      </div>
    </div>
  </div>

  <!-- Gallery Demo -->
  <div *ngIf="currentDemo === 'gallery'" class="gallery-demo">
    <h3 class="demo-title">Double-tap to Zoom Images</h3>
    <div class="gallery-grid">
      <div 
        *ngFor="let image of galleryItems"
        class="gallery-item"
        (click)="handleImageDoubleTap(image)"
        [class.zoomed]="zoomedImage === image.src">
        
        <div class="image-placeholder">{{ image.src }}</div>
        <span class="image-label">{{ image.alt }}</span>
      </div>
    </div>
    
    <!-- Zoomed overlay -->
    <div *ngIf="zoomedImage" class="zoom-overlay" (click)="zoomedImage = null">
      <div class="zoomed-image">{{ zoomedImage }}</div>
    </div>
  </div>

  <!-- List Demo -->
  <div *ngIf="currentDemo === 'list'" class="list-demo">
    <h3 class="demo-title">Double-tap to Select Items</h3>
    <div class="list-container">
      <div 
        *ngFor="let item of listItems"
        class="list-item"
        (click)="handleListDoubleTap(item)"
        [class.selected]="isSelected(item.id)">
        
        <div class="item-content">
          <h4 class="item-name">{{ item.name }}</h4>
          <span class="item-type">{{ item.type }}</span>
        </div>
        
        <div class="selection-indicator" *ngIf="isSelected(item.id)">✓</div>
      </div>
    </div>
    
    <div *ngIf="selectedItems.size > 0" class="selection-summary">
      {{ selectedItems.size }} item{{ selectedItems.size !== 1 ? 's' : '' }} selected
      <button (click)="clearSelections()" class="clear-btn">Clear</button>
    </div>
  </div>

  <!-- Event Log -->
  <div class="event-log">
    <div class="log-header">
      <h4>Recent Actions</h4>
      <button (click)="clearEventLog()" class="clear-log-btn">Clear</button>
    </div>
    <div class="log-entries">
      <div 
        *ngFor="let event of recentTaps; let i = index"
        class="log-entry"
        [style.animation-delay.ms]="i * 100">
        <span class="event-action">{{ event.action }}</span>
        <span class="event-target">{{ event.id }}</span>
        <span class="event-time">{{ getTimeSince(event.timestamp) }}</span>
      </div>
      <div *ngIf="recentTaps.length === 0" class="no-events">
        No recent actions
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Double Tap Container */
.double-tap-container {
  padding: var(--spacing-6);
  max-width: 1200px;
  margin: 0 auto;
}

/* Demo Controls */
.demo-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;
}

.demo-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    border-color: var(--primary-500);
  }

  &.active {
    background: var(--primary-600);
    color: white;
    border-color: var(--primary-600);
  }
}

/* Instructions Banner */
.instructions-banner {
  background: linear-gradient(135deg, var(--blue-50), var(--purple-50));
  border: 1px solid var(--blue-200);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  position: relative;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, var(--blue-900), var(--purple-900));
    border-color: var(--blue-700);
  }
}

.instructions-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.instructions-icon {
  font-size: var(--font-size-xl);
  flex-shrink: 0;
}

.instructions-text {
  flex: 1;

  h4 {
    margin: 0 0 var(--spacing-1) 0;
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
  }

  p {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
}

.dismiss-btn {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-100);
    color: var(--text-primary);
  }
}

/* Demo Titles */
.demo-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-4) 0;
  text-align: center;
}

/* Cards Demo */
.cards-demo {
  margin-bottom: var(--spacing-8);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-4);
}

.tap-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-500);
  }

  &.liked {
    border-color: var(--red-300);
    background: var(--red-50);

    @media (prefers-color-scheme: dark) {
      background: var(--red-900);
      border-color: var(--red-700);
    }
  }
}

.card-image {
  font-size: 3rem;
  text-align: center;
  margin-bottom: var(--spacing-3);
}

.card-content {
  margin-bottom: var(--spacing-3);
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.card-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.card-footer {
  border-top: 1px solid var(--border-secondary);
  padding-top: var(--spacing-3);
}

.card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  transition: color var(--transition-normal);

  &.active {
    color: var(--red-600);
    font-weight: 500;
  }
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  opacity: 0.6;
  transition: all var(--transition-normal);

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &.active {
    opacity: 1;
    color: var(--yellow-600);
  }
}

/* Heart Animation */
.heart-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: var(--red-500);
  opacity: 0;
  pointer-events: none;
  z-index: 10;
}

.tap-card.heart-animation .heart-overlay {
  animation: heartPop 0.6s ease-out;
}

@keyframes heartPop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

/* Gallery Demo */
.gallery-demo {
  margin-bottom: var(--spacing-8);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-3);
}

.gallery-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: scale(1.05);
  }

  &.zoomed {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-500);
  }
}

.image-placeholder {
  font-size: 3rem;
  margin-bottom: var(--spacing-2);
}

.image-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.zoomed-image {
  font-size: 8rem;
  animation: zoomIn 0.3s ease-out;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* List Demo */
.list-demo {
  margin-bottom: var(--spacing-8);
}

.list-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--gray-50);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }

  &.selected {
    background: var(--primary-50);
    border-color: var(--primary-200);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
      border-color: var(--primary-700);
    }
  }
}

.item-content {
  flex: 1;
}

.item-name {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.item-type {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  background: var(--gray-100);
  padding: 2px var(--spacing-2);
  border-radius: var(--radius-sm);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

.selection-indicator {
  color: var(--primary-600);
  font-size: var(--font-size-lg);
  font-weight: bold;
  animation: checkMark 0.3s ease-out;
}

@keyframes checkMark {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.selection-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--primary-50);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--primary-800);

  @media (prefers-color-scheme: dark) {
    background: var(--primary-900);
    border-color: var(--primary-700);
    color: var(--primary-200);
  }
}

.clear-btn {
  background: none;
  border: none;
  color: var(--primary-600);
  font-size: var(--font-size-sm);
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--primary-700);
  }
}

/* Event Log */
.event-log {
  background: var(--gray-50);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
  padding-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--border-secondary);

  h4 {
    margin: 0;
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
  }
}

.clear-log-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
    text-decoration: underline;
  }
}

.log-entries {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.log-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2);
  background: var(--bg-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  animation: slideInLeft 0.3s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.event-action {
  background: var(--primary-100);
  color: var(--primary-800);
  padding: 2px var(--spacing-2);
  border-radius: var(--radius-sm);
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    background: var(--primary-800);
    color: var(--primary-200);
  }
}

.event-target {
  color: var(--text-secondary);
  font-family: monospace;
}

.event-time {
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
}

.no-events {
  text-align: center;
  color: var(--text-tertiary);
  font-style: italic;
  padding: var(--spacing-4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .double-tap-container {
    padding: var(--spacing-4);
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .zoomed-image {
    font-size: 6rem;
  }

  .log-entry {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-1);
  }

  .demo-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
  }
}

/* Accessibility */
.tap-card:focus-visible,
.gallery-item:focus-visible,
.list-item:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .tap-card,
  .gallery-item,
  .list-item,
  .heart-overlay,
  .zoomed-image,
  .selection-indicator,
  .log-entry {
    animation: none;
    transition: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface DoubleTapItem {
  id: string;
  title: string;
  content: string;
  liked: boolean;
  likes: number;
  bookmarked: boolean;
}

interface TapEvent {
  id: string;
  timestamp: number;
  action: 'like' | 'bookmark' | 'zoom' | 'select';
}

@Component({
  selector: 'app-double-tap',
  templateUrl: './double-tap.component.html',
  styleUrls: ['./double-tap.component.scss']
})
export class DoubleTapComponent {
  private tapTimeout: any = null;
  private lastTap = 0;
  private doubleTapDelay = 300; // milliseconds
  
  currentDemo: 'cards' | 'gallery' | 'list' = 'cards';
  recentTaps: TapEvent[] = [];
  selectedItems = new Set<string>();
  zoomedImage: string | null = null;

  cardItems: DoubleTapItem[] = [
    {
      id: 'card-1',
      title: 'Mountain Adventure',
      content: 'Explore breathtaking mountain trails.',
      liked: false,
      likes: 42,
      bookmarked: false
    },
    {
      id: 'card-2',
      title: 'Ocean Waves',
      content: 'Listen to soothing ocean sounds.',
      liked: true,
      likes: 89,
      bookmarked: false
    }
  ];

  // Double tap detection
  handleCardDoubleTap(card: DoubleTapItem): void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTap;
    
    if (tapLength < this.doubleTapDelay && tapLength > 0) {
      // This is a double tap
      this.toggleLike(card);
      this.addTapEvent(card.id, 'like');
    }
    
    this.lastTap = currentTime;
  }

  toggleLike(card: DoubleTapItem): void {
    card.liked = !card.liked;
    card.likes += card.liked ? 1 : -1;
    
    // Add visual feedback
    this.showHeartAnimation(card.id);
  }

  private showHeartAnimation(cardId: string): void {
    const cardElement = document.querySelector(\`[data-card-id="\${cardId}"]\`);
    if (cardElement) {
      cardElement.classList.add('heart-animation');
      setTimeout(() => {
        cardElement.classList.remove('heart-animation');
      }, 600);
    }
  }

  private addTapEvent(id: string, action: 'like' | 'bookmark' | 'zoom' | 'select'): void {
    const event: TapEvent = {
      id,
      timestamp: Date.now(),
      action
    };
    
    this.recentTaps.unshift(event);
    
    // Keep only last 5 events
    if (this.recentTaps.length > 5) {
      this.recentTaps = this.recentTaps.slice(0, 5);
    }
  }

  // Keyboard accessibility
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      const cardId = target.getAttribute('data-card-id');
      
      if (cardId) {
        const card = this.cardItems.find(c => c.id === cardId);
        if (card) {
          this.toggleLike(card);
          event.preventDefault();
        }
      }
    }
  }
}`;
  }
}