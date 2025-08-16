import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface ReorderItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface ListConfig {
  id: string;
  title: string;
  items: ReorderItem[];
  allowReorder: boolean;
}

@Component({
  selector: 'app-drag-reorder',
  templateUrl: './drag-reorder.component.html',
  styleUrls: ['./drag-reorder.component.scss']
})
export class DragReorderComponent {
  taskLists: ListConfig[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      allowReorder: true,
      items: [
        { id: '1', title: 'Design system review', description: 'Review and update design tokens', priority: 'medium', completed: false },
        { id: '2', title: 'User research analysis', description: 'Analyze recent user feedback', priority: 'high', completed: false },
        { id: '3', title: 'Performance optimization', description: 'Optimize bundle size and loading', priority: 'low', completed: false },
        { id: '4', title: 'Documentation update', description: 'Update API documentation', priority: 'medium', completed: false },
        { id: '5', title: 'Bug fixes', description: 'Fix reported issues from testing', priority: 'high', completed: false }
      ]
    },
    {
      id: 'features',
      title: 'Feature Priorities',
      allowReorder: true,
      items: [
        { id: '6', title: 'Dark mode implementation', description: 'Add dark theme support', priority: 'high', completed: false },
        { id: '7', title: 'Mobile responsive updates', description: 'Improve mobile experience', priority: 'medium', completed: false },
        { id: '8', title: 'Search functionality', description: 'Add global search feature', priority: 'low', completed: false },
        { id: '9', title: 'Notification system', description: 'Implement push notifications', priority: 'medium', completed: false }
      ]
    }
  ];

  players: ReorderItem[] = [
    { id: 'p1', title: 'Alex Thompson', description: 'Forward - Goals: 12', priority: 'high', completed: false },
    { id: 'p2', title: 'Maria Garcia', description: 'Midfielder - Assists: 8', priority: 'high', completed: false },
    { id: 'p3', title: 'James Wilson', description: 'Defender - Clean sheets: 5', priority: 'medium', completed: false },
    { id: 'p4', title: 'Sarah Chen', description: 'Goalkeeper - Saves: 45', priority: 'medium', completed: false },
    { id: 'p5', title: 'David Rodriguez', description: 'Forward - Goals: 8', priority: 'low', completed: false },
    { id: 'p6', title: 'Emma Johnson', description: 'Midfielder - Assists: 6', priority: 'low', completed: false }
  ];

  onListDrop(event: CdkDragDrop<ReorderItem[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  onPlayerDrop(event: CdkDragDrop<ReorderItem[]>): void {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  toggleTaskCompletion(listId: string, taskId: string): void {
    const list = this.taskLists.find(l => l.id === listId);
    if (list) {
      const task = list.items.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }

  togglePlayerSelection(playerId: string): void {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.completed = !player.completed;
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  }

  resetToDefaults(): void {
    this.taskLists = [
      {
        id: 'backlog',
        title: 'Backlog',
        allowReorder: true,
        items: [
          { id: '1', title: 'Design system review', description: 'Review and update design tokens', priority: 'medium', completed: false },
          { id: '2', title: 'User research analysis', description: 'Analyze recent user feedback', priority: 'high', completed: false },
          { id: '3', title: 'Performance optimization', description: 'Optimize bundle size and loading', priority: 'low', completed: false },
          { id: '4', title: 'Documentation update', description: 'Update API documentation', priority: 'medium', completed: false },
          { id: '5', title: 'Bug fixes', description: 'Fix reported issues from testing', priority: 'high', completed: false }
        ]
      },
      {
        id: 'features',
        title: 'Feature Priorities',
        allowReorder: true,
        items: [
          { id: '6', title: 'Dark mode implementation', description: 'Add dark theme support', priority: 'high', completed: false },
          { id: '7', title: 'Mobile responsive updates', description: 'Improve mobile experience', priority: 'medium', completed: false },
          { id: '8', title: 'Search functionality', description: 'Add global search feature', priority: 'low', completed: false },
          { id: '9', title: 'Notification system', description: 'Implement push notifications', priority: 'medium', completed: false }
        ]
      }
    ];

    this.players = [
      { id: 'p1', title: 'Alex Thompson', description: 'Forward - Goals: 12', priority: 'high', completed: false },
      { id: 'p2', title: 'Maria Garcia', description: 'Midfielder - Assists: 8', priority: 'high', completed: false },
      { id: 'p3', title: 'James Wilson', description: 'Defender - Clean sheets: 5', priority: 'medium', completed: false },
      { id: 'p4', title: 'Sarah Chen', description: 'Goalkeeper - Saves: 45', priority: 'medium', completed: false },
      { id: 'p5', title: 'David Rodriguez', description: 'Forward - Goals: 8', priority: 'low', completed: false },
      { id: 'p6', title: 'Emma Johnson', description: 'Midfielder - Assists: 6', priority: 'low', completed: false }
    ];
  }

  get exampleCode(): string {
    return `<!-- Simple Reorderable List -->
<div class="reorder-container">
  <h3>Task Priority List</h3>
  
  <div class="reorder-list" 
       cdkDropList 
       (cdkDropListDropped)="onDrop($event)">
    
    <div *ngFor="let item of items; let i = index" 
         class="reorder-item"
         cdkDrag>
      
      <div class="drag-handle" cdkDragHandle>
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </div>
      
      <div class="item-content">
        <div class="item-order">{{ i + 1 }}.</div>
        <div class="item-details">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
        <div class="item-priority" [class]="'priority-' + item.priority">
          {{ item.priority }}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export class ReorderExample {
  items = [
    { id: '1', title: 'First Task', description: 'High priority task', priority: 'high' },
    { id: '2', title: 'Second Task', description: 'Medium priority task', priority: 'medium' },
    { id: '3', title: 'Third Task', description: 'Low priority task', priority: 'low' }
  ];

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="drag-reorder-pattern">
  <!-- Task Lists Section -->
  <div class="lists-section">
    <h3 class="section-title">Project Task Lists</h3>
    <p class="section-description">Drag tasks to reorder them by priority</p>
    
    <div class="task-lists-grid">
      <div *ngFor="let list of taskLists" class="task-list">
        <div class="list-header">
          <h4 class="list-title">{{ list.title }}</h4>
          <span class="list-count">{{ list.items.length }} tasks</span>
        </div>
        
        <div class="list-container"
             cdkDropList
             [cdkDropListData]="list.items"
             [cdkDropListDisabled]="!list.allowReorder"
             (cdkDropListDropped)="onListDrop($event)">
          
          <div *ngFor="let task of list.items; let i = index" 
               class="reorder-item"
               [class.completed]="task.completed"
               cdkDrag
               [cdkDragDisabled]="task.completed">
            
            <div class="item-order">{{ i + 1 }}</div>
            
            <div class="drag-handle" cdkDragHandle>
              <svg class="handle-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </div>
            
            <div class="item-content">
              <div class="item-header">
                <h5 class="item-title">{{ task.title }}</h5>
                <div class="item-priority" [class]="'priority-' + task.priority">
                  <span class="priority-icon">{{ getPriorityIcon(task.priority) }}</span>
                  <span class="priority-text">{{ task.priority }}</span>
                </div>
              </div>
              <p class="item-description">{{ task.description }}</p>
            </div>
            
            <button 
              (click)="toggleTaskCompletion(list.id, task.id)"
              class="completion-toggle"
              [class.completed]="task.completed">
              <svg *ngIf="task.completed" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <svg *ngIf="!task.completed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Team Lineup Section -->
  <div class="lineup-section">
    <h3 class="section-title">Team Lineup Ranking</h3>
    <p class="section-description">Reorder players by performance ranking</p>
    
    <div class="lineup-container"
         cdkDropList
         [cdkDropListData]="players"
         (cdkDropListDropped)="onPlayerDrop($event)">
      
      <div *ngFor="let player of players; let i = index" 
           class="player-item"
           [class.selected]="player.completed"
           cdkDrag>
        
        <div class="player-rank">
          <span class="rank-number">{{ i + 1 }}</span>
          <div class="rank-medal" [class]="'rank-' + (i + 1)">
            <span *ngIf="i === 0">🥇</span>
            <span *ngIf="i === 1">🥈</span>
            <span *ngIf="i === 2">🥉</span>
            <span *ngIf="i > 2">{{ i + 1 }}</span>
          </div>
        </div>
        
        <div class="drag-handle" cdkDragHandle>
          <svg class="handle-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </div>
        
        <div class="player-content">
          <h5 class="player-name">{{ player.title }}</h5>
          <p class="player-stats">{{ player.description }}</p>
        </div>
        
        <button 
          (click)="togglePlayerSelection(player.id)"
          class="selection-toggle"
          [class.selected]="player.completed">
          <svg *ngIf="player.completed" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span *ngIf="!player.completed">Select</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Reset Controls -->
  <div class="controls-section">
    <button (click)="resetToDefaults()" class="reset-btn">
      Reset All Lists
    </button>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Drag Reorder Pattern Styles */
.drag-reorder-pattern {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.section-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-4) 0;
}

/* Task Lists Section */
.lists-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

.task-lists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

.task-list {
  background: var(--gray-50);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: var(--primary-50);
  border-bottom: 1px solid var(--border-secondary);

  @media (prefers-color-scheme: dark) {
    background: var(--primary-900);
  }
}

.list-title {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--primary-700);
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: var(--primary-300);
  }
}

.list-count {
  font-size: var(--font-size-xs);
  color: var(--primary-600);
  background: var(--primary-100);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);

  @media (prefers-color-scheme: dark) {
    color: var(--primary-400);
    background: var(--primary-800);
  }
}

.list-container {
  padding: var(--spacing-3);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

/* Reorderable Items */
.reorder-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  cursor: grab;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  &.completed {
    opacity: 0.6;
    background: var(--gray-100);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }

    .item-title {
      text-decoration: line-through;
    }
  }

  &.cdk-drag-animating {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }

  &.cdk-drag-placeholder {
    opacity: 0.4;
    transform: scale(0.95);
  }

  &.cdk-drag-preview {
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-500);
  }
}

.item-order {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--primary-100);
  color: var(--primary-700);
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: 600;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    background: var(--primary-900);
    color: var(--primary-300);
  }
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--text-tertiary);
  cursor: grab;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-100);
    color: var(--text-secondary);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
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
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-1);
}

.item-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.item-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

.item-priority {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);

  &.priority-high {
    background: var(--red-100);
    color: var(--red-700);

    @media (prefers-color-scheme: dark) {
      background: var(--red-900);
      color: var(--red-300);
    }
  }

  &.priority-medium {
    background: var(--yellow-100);
    color: var(--yellow-700);

    @media (prefers-color-scheme: dark) {
      background: var(--yellow-900);
      color: var(--yellow-300);
    }
  }

  &.priority-low {
    background: var(--green-100);
    color: var(--green-700);

    @media (prefers-color-scheme: dark) {
      background: var(--green-900);
      color: var(--green-300);
    }
  }
}

.priority-icon {
  font-size: var(--font-size-xs);
}

.completion-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-100);
    color: var(--text-secondary);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }

  &.completed {
    color: var(--green-600);
    background: var(--green-50);

    @media (prefers-color-scheme: dark) {
      color: var(--green-400);
      background: var(--green-900);
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
}

/* Team Lineup Section */
.lineup-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

.lineup-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  max-width: 600px;
  margin: 0 auto;
}

.player-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  cursor: grab;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  &.selected {
    border-color: var(--primary-500);
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }

  &.cdk-drag-preview {
    box-shadow: var(--shadow-xl);
  }
}

.player-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
}

.rank-number {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  font-weight: 500;
}

.rank-medal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: var(--font-size-lg);
  font-weight: 600;

  &.rank-1 {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #92400e;
  }

  &.rank-2 {
    background: linear-gradient(135deg, #c0c0c0, #e5e7eb);
    color: #374151;
  }

  &.rank-3 {
    background: linear-gradient(135deg, #cd7f32, #d97706);
    color: #92400e;
  }

  &:not(.rank-1):not(.rank-2):not(.rank-3) {
    background: var(--gray-100);
    color: var(--text-secondary);
    font-size: var(--font-size-sm);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }
}

.player-content {
  flex: 1;
  min-width: 0;
}

.player-name {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.player-stats {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.selection-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border: 1px solid var(--border-primary);
  background: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    border-color: var(--primary-500);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }

  &.selected {
    background: var(--primary-500);
    color: white;
    border-color: var(--primary-500);

    &:hover {
      background: var(--primary-600);
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
}

/* Controls */
.controls-section {
  display: flex;
  justify-content: center;
  padding: var(--spacing-4);
}

.reset-btn {
  padding: var(--spacing-3) var(--spacing-6);
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
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
  }
}

/* Focus states for accessibility */
.reorder-item:focus,
.player-item:focus,
.completion-toggle:focus,
.selection-toggle:focus,
.reset-btn:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Responsive design */
@media (max-width: 768px) {
  .task-lists-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .reorder-item,
  .player-item {
    padding: var(--spacing-2);
  }

  .item-order,
  .drag-handle,
  .completion-toggle {
    width: 1.5rem;
    height: 1.5rem;

    .handle-icon {
      width: 0.75rem;
      height: 0.75rem;
    }
  }

  .rank-medal {
    width: 2rem;
    height: 2rem;
    font-size: var(--font-size-base);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface ReorderItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface ListConfig {
  id: string;
  title: string;
  items: ReorderItem[];
  allowReorder: boolean;
}

@Component({
  selector: 'app-drag-reorder',
  templateUrl: './drag-reorder.component.html',
  styleUrls: ['./drag-reorder.component.scss']
})
export class DragReorderComponent {
  taskLists: ListConfig[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      allowReorder: true,
      items: [
        { id: '1', title: 'Design system review', description: 'Review and update design tokens', priority: 'medium', completed: false },
        { id: '2', title: 'User research analysis', description: 'Analyze recent user feedback', priority: 'high', completed: false },
        { id: '3', title: 'Performance optimization', description: 'Optimize bundle size and loading', priority: 'low', completed: false },
        { id: '4', title: 'Documentation update', description: 'Update API documentation', priority: 'medium', completed: false },
        { id: '5', title: 'Bug fixes', description: 'Fix reported issues from testing', priority: 'high', completed: false }
      ]
    },
    {
      id: 'features',
      title: 'Feature Priorities',
      allowReorder: true,
      items: [
        { id: '6', title: 'Dark mode implementation', description: 'Add dark theme support', priority: 'high', completed: false },
        { id: '7', title: 'Mobile responsive updates', description: 'Improve mobile experience', priority: 'medium', completed: false },
        { id: '8', title: 'Search functionality', description: 'Add global search feature', priority: 'low', completed: false },
        { id: '9', title: 'Notification system', description: 'Implement push notifications', priority: 'medium', completed: false }
      ]
    }
  ];

  players: ReorderItem[] = [
    { id: 'p1', title: 'Alex Thompson', description: 'Forward - Goals: 12', priority: 'high', completed: false },
    { id: 'p2', title: 'Maria Garcia', description: 'Midfielder - Assists: 8', priority: 'high', completed: false },
    { id: 'p3', title: 'James Wilson', description: 'Defender - Clean sheets: 5', priority: 'medium', completed: false },
    { id: 'p4', title: 'Sarah Chen', description: 'Goalkeeper - Saves: 45', priority: 'medium', completed: false },
    { id: 'p5', title: 'David Rodriguez', description: 'Forward - Goals: 8', priority: 'low', completed: false },
    { id: 'p6', title: 'Emma Johnson', description: 'Midfielder - Assists: 6', priority: 'low', completed: false }
  ];

  onListDrop(event: CdkDragDrop<ReorderItem[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  onPlayerDrop(event: CdkDragDrop<ReorderItem[]>): void {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  toggleTaskCompletion(listId: string, taskId: string): void {
    const list = this.taskLists.find(l => l.id === listId);
    if (list) {
      const task = list.items.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }

  togglePlayerSelection(playerId: string): void {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.completed = !player.completed;
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  }

  resetToDefaults(): void {
    // Reset implementation here
  }
}`;
  }
}