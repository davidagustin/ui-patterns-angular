import { Component } from '@angular/core';

interface LongPressItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  actions: { label: string; action: () => void }[];
}

@Component({
  selector: 'app-long-press',
  templateUrl: './long-press.component.html',
  styleUrls: ['./long-press.component.scss']
})
export class LongPressComponent {
  longPressTimer: any = null;
  pressStartTime = 0;
  isLongPressing = false;
  longPressThreshold = 500;
  activeItem: string | null = null;
  showContextMenu = false;
  contextMenuPosition = { x: 0, y: 0 };
  lastAction = '';

  items: LongPressItem[] = [
    {
      id: 'item1',
      title: 'Photo Album',
      description: 'Summer vacation photos',
      icon: '📸',
      actions: [
        { label: 'Edit', action: () => this.executeAction('Edit Photo Album') },
        { label: 'Share', action: () => this.executeAction('Share Photo Album') },
        { label: 'Delete', action: () => this.executeAction('Delete Photo Album') }
      ]
    },
    {
      id: 'item2',
      title: 'Music Playlist',
      description: 'Favorite songs collection',
      icon: '🎵',
      actions: [
        { label: 'Play', action: () => this.executeAction('Play Playlist') },
        { label: 'Edit', action: () => this.executeAction('Edit Playlist') },
        { label: 'Download', action: () => this.executeAction('Download Playlist') }
      ]
    },
    {
      id: 'item3',
      title: 'Document',
      description: 'Important project file',
      icon: '📄',
      actions: [
        { label: 'Open', action: () => this.executeAction('Open Document') },
        { label: 'Rename', action: () => this.executeAction('Rename Document') },
        { label: 'Move', action: () => this.executeAction('Move Document') }
      ]
    }
  ];

  onMouseDown(event: MouseEvent, itemId: string): void {
    this.startLongPress(event, itemId);
  }

  onMouseUp(event: MouseEvent): void {
    this.endLongPress(event);
  }

  onMouseLeave(): void {
    this.cancelLongPress();
  }

  onTouchStart(event: TouchEvent, itemId: string): void {
    event.preventDefault();
    const touch = event.touches[0];
    this.startLongPress(touch, itemId);
  }

  onTouchEnd(event: TouchEvent): void {
    this.endLongPress(event);
  }

  onTouchCancel(): void {
    this.cancelLongPress();
  }

  private startLongPress(event: MouseEvent | Touch, itemId: string): void {
    this.pressStartTime = Date.now();
    this.activeItem = itemId;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    
    this.longPressTimer = setTimeout(() => {
      this.triggerLongPress();
    }, this.longPressThreshold);
  }

  private endLongPress(event: MouseEvent | TouchEvent): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    const pressDuration = Date.now() - this.pressStartTime;
    
    if (pressDuration < this.longPressThreshold && !this.isLongPressing) {
      // Short press - regular click
      this.executeAction(`Quick tap on ${this.activeItem}`);
    }

    this.isLongPressing = false;
    this.activeItem = null;
  }

  private cancelLongPress(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    this.isLongPressing = false;
    this.activeItem = null;
    this.showContextMenu = false;
  }

  private triggerLongPress(): void {
    this.isLongPressing = true;
    this.showContextMenu = true;
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  executeAction(action: string): void {
    this.lastAction = `${action} at ${new Date().toLocaleTimeString()}`;
    this.showContextMenu = false;
    this.isLongPressing = false;
    this.activeItem = null;
  }

  getActiveItemActions(): { label: string; action: () => void }[] {
    const item = this.items.find(i => i.id === this.activeItem);
    return item ? item.actions : [];
  }

  get exampleCode(): string {
    return `<!-- Long Press Component -->
<div class="long-press-item" 
     (mousedown)="onMouseDown($event, item.id)"
     (mouseup)="onMouseUp($event)"
     (mouseleave)="onMouseLeave()"
     (touchstart)="onTouchStart($event, item.id)"
     (touchend)="onTouchEnd($event)">
  <div class="item-content">
    <span class="item-icon">{{ item.icon }}</span>
    <div class="item-info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</div>

<!-- Context Menu -->
<div class="context-menu" *ngIf="showContextMenu">
  <button *ngFor="let action of getActiveItemActions()" 
          (click)="action.action()">
    {{ action.label }}
  </button>
</div>

<!-- Component Logic -->
export class LongPressComponent {
  longPressTimer: any = null;
  longPressThreshold = 500;
  
  private startLongPress(event: MouseEvent, itemId: string): void {
    this.longPressTimer = setTimeout(() => {
      this.triggerLongPress(itemId);
    }, this.longPressThreshold);
  }
  
  private triggerLongPress(itemId: string): void {
    // Show context menu
    this.showContextMenu = true;
  }
}`;
  }

  get htmlCode(): string {
    return `<app-pattern-header 
  title="Long Press" 
  description="Detect long press gestures for context menus and secondary actions"
  icon="👆">
</app-pattern-header>

<div class="long-press-demo">
  <!-- Instructions -->
  <div class="instructions-section">
    <h3>How to Use</h3>
    <div class="instructions-grid">
      <div class="instruction-item">
        <span class="instruction-icon">👆</span>
        <div class="instruction-content">
          <h4>Long Press</h4>
          <p>Press and hold for 0.5 seconds to open context menu</p>
        </div>
      </div>
      <div class="instruction-item">
        <span class="instruction-icon">👌</span>
        <div class="instruction-content">
          <h4>Quick Tap</h4>
          <p>Quick tap for primary action</p>
        </div>
      </div>
      <div class="instruction-item">
        <span class="instruction-icon">📱</span>
        <div class="instruction-content">
          <h4>Mobile Support</h4>
          <p>Works with touch and mouse events</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Demo Items -->
  <div class="items-section">
    <h3>Try Long Press on These Items</h3>
    <div class="items-grid">
      <div *ngFor="let item of items" 
           class="long-press-item"
           [class.active]="activeItem === item.id"
           [class.long-pressing]="isLongPressing && activeItem === item.id"
           (mousedown)="onMouseDown($event, item.id)"
           (mouseup)="onMouseUp($event)"
           (mouseleave)="onMouseLeave()"
           (touchstart)="onTouchStart($event, item.id)"
           (touchend)="onTouchEnd($event)"
           (touchcancel)="onTouchCancel()">
        
        <div class="item-content">
          <div class="item-icon">{{ item.icon }}</div>
          <div class="item-info">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
        
        <!-- Long Press Indicator -->
        <div class="press-indicator" 
             *ngIf="activeItem === item.id && !showContextMenu">
        </div>
      </div>
    </div>
  </div>

  <!-- Context Menu -->
  <div class="context-menu" 
       *ngIf="showContextMenu"
       [style.left.px]="contextMenuPosition.x"
       [style.top.px]="contextMenuPosition.y"
       (click)="$event.stopPropagation()">
    <div class="context-menu-content">
      <button *ngFor="let action of getActiveItemActions()" 
              class="context-action"
              (click)="action.action()">
        {{ action.label }}
      </button>
    </div>
  </div>

  <!-- Action Feedback -->
  <div class="feedback-section" *ngIf="lastAction">
    <div class="feedback-message">
      <span class="feedback-icon">✓</span>
      <span>{{ lastAction }}</span>
    </div>
  </div>

  <!-- Overlay to close context menu -->
  <div class="context-overlay" 
       *ngIf="showContextMenu"
       (click)="showContextMenu = false">
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
    return `/* Long Press Styles */
.long-press-demo {
  padding: var(--spacing-6);
}

.instructions-section,
.items-section,
.feedback-section {
  margin-bottom: var(--spacing-6);

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }
}

.instructions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
}

.instruction-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);

  .instruction-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .instruction-content {
    h4 {
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-1) 0;
    }

    p {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      margin: 0;
    }
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-4);
}

.long-press-item {
  position: relative;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  cursor: pointer;
  transition: all var(--transition-normal);
  user-select: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-200);
  }

  &.active {
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }

  &.long-pressing {
    transform: scale(0.98);
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }
}

.item-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.item-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.item-info {
  flex: 1;

  h4 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-1) 0;
  }

  p {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin: 0;
  }
}

.press-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--primary-600);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  animation: pressProgress 0.5s ease-out forwards;
}

@keyframes pressProgress {
  from { width: 0%; }
  to { width: 100%; }
}

/* Context Menu */
.context-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.context-menu {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
}

.context-menu-content {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-2);
  min-width: 150px;
  pointer-events: all;
  animation: contextMenuIn 0.2s ease-out;

  @keyframes contextMenuIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
}

.context-action {
  display: block;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    color: var(--primary-600);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-800);
    }
  }
}

.feedback-section {
  background: var(--bg-primary);
  border: 1px solid var(--green-200);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}

.feedback-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--green-700);
  font-weight: 500;

  .feedback-icon {
    background: var(--green-100);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--green-300);

    .feedback-icon {
      background: var(--green-800);
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .instructions-grid,
  .items-grid {
    grid-template-columns: 1fr;
  }

  .context-menu-content {
    min-width: 120px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .long-press-item,
  .context-action {
    transition: none;
  }

  .long-press-item:hover {
    transform: none;
  }

  .press-indicator {
    animation: none;
    width: 100%;
  }

  .context-menu-content {
    animation: none;
  }
}

/* Touch-specific styles */
@media (hover: none) {
  .long-press-item:hover {
    transform: none;
    box-shadow: var(--shadow-sm);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface LongPressItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  actions: { label: string; action: () => void }[];
}

@Component({
  selector: 'app-long-press',
  templateUrl: './long-press.component.html',
  styleUrls: ['./long-press.component.scss']
})
export class LongPressComponent {
  longPressTimer: any = null;
  pressStartTime = 0;
  isLongPressing = false;
  longPressThreshold = 500;
  activeItem: string | null = null;
  showContextMenu = false;
  contextMenuPosition = { x: 0, y: 0 };
  lastAction = '';

  items: LongPressItem[] = [
    {
      id: 'item1',
      title: 'Photo Album',
      description: 'Summer vacation photos',
      icon: '📸',
      actions: [
        { label: 'Edit', action: () => this.executeAction('Edit Photo Album') },
        { label: 'Share', action: () => this.executeAction('Share Photo Album') },
        { label: 'Delete', action: () => this.executeAction('Delete Photo Album') }
      ]
    }
    // ... more items
  ];

  onMouseDown(event: MouseEvent, itemId: string): void {
    this.startLongPress(event, itemId);
  }

  onTouchStart(event: TouchEvent, itemId: string): void {
    event.preventDefault();
    const touch = event.touches[0];
    this.startLongPress(touch, itemId);
  }

  private startLongPress(event: MouseEvent | Touch, itemId: string): void {
    this.pressStartTime = Date.now();
    this.activeItem = itemId;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    
    this.longPressTimer = setTimeout(() => {
      this.triggerLongPress();
    }, this.longPressThreshold);
  }

  private triggerLongPress(): void {
    this.isLongPressing = true;
    this.showContextMenu = true;
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  executeAction(action: string): void {
    this.lastAction = action;
    this.showContextMenu = false;
  }
}`;
  }
}