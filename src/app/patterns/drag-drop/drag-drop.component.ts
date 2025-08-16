import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface DragItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface DropZone {
  id: string;
  title: string;
  items: DragItem[];
  acceptedCategories: string[];
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {
  items: DragItem[] = [
    { id: '1', title: 'Task Management', description: 'Plan and track your projects', category: 'productivity' },
    { id: '2', title: 'Code Editor', description: 'Write and edit code', category: 'development' },
    { id: '3', title: 'Image Gallery', description: 'Organize your photos', category: 'media' },
    { id: '4', title: 'Music Player', description: 'Listen to your favorite songs', category: 'media' },
    { id: '5', title: 'Calendar', description: 'Schedule your events', category: 'productivity' },
    { id: '6', title: 'Database Tool', description: 'Manage your databases', category: 'development' }
  ];

  dropZones: DropZone[] = [
    {
      id: 'productivity',
      title: 'Productivity Tools',
      items: [],
      acceptedCategories: ['productivity']
    },
    {
      id: 'development',
      title: 'Development Tools',
      items: [],
      acceptedCategories: ['development']
    },
    {
      id: 'media',
      title: 'Media Tools',
      items: [],
      acceptedCategories: ['media']
    },
    {
      id: 'general',
      title: 'General Collection',
      items: [],
      acceptedCategories: ['productivity', 'development', 'media']
    }
  ];

  onItemDrop(event: CdkDragDrop<DragItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onZoneDrop(event: CdkDragDrop<DragItem[]>, zoneId: string): void {
    const zone = this.dropZones.find(z => z.id === zoneId);
    const draggedItem = event.previousContainer.data[event.previousIndex];
    
    if (zone && zone.acceptedCategories.includes(draggedItem.category)) {
      this.onItemDrop(event);
    }
  }

  canDrop(item: DragItem, zoneId: string): boolean {
    const zone = this.dropZones.find(z => z.id === zoneId);
    return zone ? zone.acceptedCategories.includes(item.category) : false;
  }

  resetToDefaults(): void {
    this.dropZones.forEach(zone => zone.items = []);
    this.items = [
      { id: '1', title: 'Task Management', description: 'Plan and track your projects', category: 'productivity' },
      { id: '2', title: 'Code Editor', description: 'Write and edit code', category: 'development' },
      { id: '3', title: 'Image Gallery', description: 'Organize your photos', category: 'media' },
      { id: '4', title: 'Music Player', description: 'Listen to your favorite songs', category: 'media' },
      { id: '5', title: 'Calendar', description: 'Schedule your events', category: 'productivity' },
      { id: '6', title: 'Database Tool', description: 'Manage your databases', category: 'development' }
    ];
  }

  get exampleCode(): string {
    return `<!-- Simple Drag and Drop Example -->
<div class="drag-drop-container">
  <div class="source-container" 
       cdkDropList 
       #sourceList="cdkDropList"
       [cdkDropListData]="sourceItems"
       (cdkDropListDropped)="onDrop($event)">
    
    <div *ngFor="let item of sourceItems" 
         class="drag-item"
         cdkDrag>
      <div class="drag-handle" cdkDragHandle>⋮⋮</div>
      <div class="item-content">
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>

  <div class="target-container"
       cdkDropList 
       #targetList="cdkDropList"
       [cdkDropListData]="targetItems"
       [cdkDropListConnectedTo]="[sourceList]"
       (cdkDropListDropped)="onDrop($event)">
    
    <div *ngFor="let item of targetItems" 
         class="drag-item"
         cdkDrag>
      {{ item.title }}
    </div>
  </div>
</div>

<!-- Component TypeScript -->
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export class DragDropExample {
  sourceItems = [
    { id: '1', title: 'Item 1', description: 'First item' },
    { id: '2', title: 'Item 2', description: 'Second item' }
  ];
  
  targetItems = [];

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="drag-drop-pattern">
  <!-- Source Items -->
  <div class="source-section">
    <h3 class="section-title">Available Items</h3>
    <div class="items-container"
         cdkDropList
         #sourceList="cdkDropList"
         [cdkDropListData]="items"
         [cdkDropListConnectedTo]="getConnectedLists()"
         (cdkDropListDropped)="onItemDrop($event)">
      
      <div *ngFor="let item of items" 
           class="drag-item"
           [class]="'category-' + item.category"
           cdkDrag>
        
        <div class="drag-handle" cdkDragHandle>
          <svg class="handle-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </div>
        
        <div class="item-content">
          <div class="category-indicator" [class]="'category-' + item.category"></div>
          <div class="item-info">
            <h4 class="item-title">{{ item.title }}</h4>
            <p class="item-description">{{ item.description }}</p>
            <span class="item-category">{{ item.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Drop Zones -->
  <div class="drop-zones-section">
    <h3 class="section-title">Drop Zones</h3>
    <div class="zones-grid">
      <div *ngFor="let zone of dropZones" 
           class="drop-zone"
           [class.has-items]="zone.items.length > 0">
        
        <div class="zone-header">
          <h4 class="zone-title">{{ zone.title }}</h4>
          <span class="items-count">{{ zone.items.length }} items</span>
        </div>
        
        <div class="zone-drop-area"
             cdkDropList
             [id]="zone.id"
             [cdkDropListData]="zone.items"
             [cdkDropListConnectedTo]="getConnectedLists()"
             (cdkDropListDropped)="onZoneDrop($event, zone.id)">
          
          <div *ngFor="let item of zone.items" 
               class="dropped-item"
               [class]="'category-' + item.category"
               cdkDrag>
            
            <div class="item-content">
              <h5 class="item-title">{{ item.title }}</h5>
              <p class="item-description">{{ item.description }}</p>
            </div>
            
            <div class="drag-handle" cdkDragHandle>
              <svg class="handle-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </div>
          </div>
          
          <div *ngIf="zone.items.length === 0" class="empty-zone">
            <div class="empty-icon">📦</div>
            <p class="empty-text">Drop {{ zone.acceptedCategories.join(', ') }} items here</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Reset Button -->
  <div class="controls-section">
    <button (click)="resetToDefaults()" class="reset-btn">
      Reset to Defaults
    </button>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Drag and Drop Pattern Styles */
.drag-drop-pattern {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-6);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-4) 0;
}

/* Source Items */
.source-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  min-height: 200px;
  padding: var(--spacing-2);
  border: 2px dashed var(--border-secondary);
  border-radius: var(--radius-md);
  background: var(--gray-50);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }
}

.drag-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  cursor: grab;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &.cdk-drag-animating {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }

  &.cdk-drag-placeholder {
    opacity: 0.4;
    transform: scale(0.95);
  }

  &.cdk-drag-preview {
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-500);
  }
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--text-secondary);
  cursor: grab;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);

  &:hover {
    background-color: var(--gray-100);
    color: var(--text-primary);

    @media (prefers-color-scheme: dark) {
      background-color: var(--gray-700);
    }
  }

  &:active {
    cursor: grabbing;
  }
}

.handle-icon {
  width: 1rem;
  height: 1rem;
}

.item-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  flex: 1;
  min-width: 0;
}

.category-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  flex-shrink: 0;

  &.category-productivity {
    background-color: var(--blue-500);
  }

  &.category-development {
    background-color: var(--green-500);
  }

  &.category-media {
    background-color: var(--purple-500);
  }
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.item-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-1) 0;
}

.item-category {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  text-transform: capitalize;
}

/* Drop Zones */
.drop-zones-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}

.zones-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.drop-zone {
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-primary);
}

.zone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-primary);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.zone-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.items-count {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  background: var(--gray-200);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

.zone-drop-area {
  min-height: 150px;
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);

  &.cdk-drop-list-dragging {
    background-color: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background-color: var(--primary-900);
    }
  }
}

.dropped-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2);
  background: var(--gray-50);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-sm);
  cursor: grab;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }

  &:hover {
    background: var(--gray-100);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }

  &.cdk-drag-placeholder {
    opacity: 0.4;
  }

  &.cdk-drag-preview {
    box-shadow: var(--shadow-lg);
  }

  .item-title {
    font-size: var(--font-size-xs);
    margin-bottom: var(--spacing-1);
  }

  .item-description {
    font-size: var(--font-size-xs);
    margin: 0;
  }

  .drag-handle {
    width: 1.5rem;
    height: 1.5rem;

    .handle-icon {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
}

.empty-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 120px;
  color: var(--text-tertiary);
  text-align: center;
}

.empty-icon {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-2);
}

.empty-text {
  font-size: var(--font-size-xs);
  margin: 0;
}

/* Controls */
.controls-section {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-4);
}

.reset-btn {
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--primary-600);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
}

/* CDK Drag Drop Global Styles */
.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.cdk-drop-list {
  border-radius: var(--radius-md);
}

.cdk-drop-list.cdk-drop-list-dragging .cdk-drag:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

/* Focus states for accessibility */
.drag-item:focus,
.dropped-item:focus,
.reset-btn:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .drag-item {
    padding: var(--spacing-2);
  }

  .item-title {
    font-size: var(--font-size-xs);
  }

  .item-description {
    display: none;
  }

  .zones-grid {
    gap: var(--spacing-2);
  }

  .zone-drop-area {
    min-height: 100px;
    padding: var(--spacing-2);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface DragItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface DropZone {
  id: string;
  title: string;
  items: DragItem[];
  acceptedCategories: string[];
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {
  items: DragItem[] = [
    { id: '1', title: 'Task Management', description: 'Plan and track your projects', category: 'productivity' },
    { id: '2', title: 'Code Editor', description: 'Write and edit code', category: 'development' },
    { id: '3', title: 'Image Gallery', description: 'Organize your photos', category: 'media' },
    { id: '4', title: 'Music Player', description: 'Listen to your favorite songs', category: 'media' },
    { id: '5', title: 'Calendar', description: 'Schedule your events', category: 'productivity' },
    { id: '6', title: 'Database Tool', description: 'Manage your databases', category: 'development' }
  ];

  dropZones: DropZone[] = [
    {
      id: 'productivity',
      title: 'Productivity Tools',
      items: [],
      acceptedCategories: ['productivity']
    },
    {
      id: 'development',
      title: 'Development Tools',
      items: [],
      acceptedCategories: ['development']
    },
    {
      id: 'media',
      title: 'Media Tools',
      items: [],
      acceptedCategories: ['media']
    },
    {
      id: 'general',
      title: 'General Collection',
      items: [],
      acceptedCategories: ['productivity', 'development', 'media']
    }
  ];

  onItemDrop(event: CdkDragDrop<DragItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onZoneDrop(event: CdkDragDrop<DragItem[]>, zoneId: string): void {
    const zone = this.dropZones.find(z => z.id === zoneId);
    const draggedItem = event.previousContainer.data[event.previousIndex];
    
    if (zone && zone.acceptedCategories.includes(draggedItem.category)) {
      this.onItemDrop(event);
    }
  }

  canDrop(item: DragItem, zoneId: string): boolean {
    const zone = this.dropZones.find(z => z.id === zoneId);
    return zone ? zone.acceptedCategories.includes(item.category) : false;
  }

  getConnectedLists(): string[] {
    return ['sourceList', ...this.dropZones.map(zone => zone.id)];
  }

  resetToDefaults(): void {
    this.dropZones.forEach(zone => zone.items = []);
    this.items = [
      { id: '1', title: 'Task Management', description: 'Plan and track your projects', category: 'productivity' },
      { id: '2', title: 'Code Editor', description: 'Write and edit code', category: 'development' },
      { id: '3', title: 'Image Gallery', description: 'Organize your photos', category: 'media' },
      { id: '4', title: 'Music Player', description: 'Listen to your favorite songs', category: 'media' },
      { id: '5', title: 'Calendar', description: 'Schedule your events', category: 'productivity' },
      { id: '6', title: 'Database Tool', description: 'Manage your databases', category: 'development' }
    ];
  }
}`;
  }

  getConnectedLists(): string[] {
    return ['sourceList', ...this.dropZones.map(zone => zone.id)];
  }
}