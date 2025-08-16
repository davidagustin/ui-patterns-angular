import { Component } from '@angular/core';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  category: string;
}

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  portfolio: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

interface CompletenessMessage {
  text: string;
  icon: string;
}

@Component({
  selector: 'app-completeness-meter',
  templateUrl: './completeness-meter.component.html',
  styleUrls: ['./completeness-meter.component.scss']
})
export class CompletenessMeterComponent {
  tasks: Task[] = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Add your name and email',
      completed: false,
      required: true,
      category: 'profile'
    },
    {
      id: 'bio',
      title: 'Bio',
      description: 'Write a short bio about yourself',
      completed: false,
      required: true,
      category: 'profile'
    },
    {
      id: 'avatar',
      title: 'Profile Picture',
      description: 'Upload a profile picture',
      completed: false,
      required: false,
      category: 'profile'
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Add your technical skills',
      completed: false,
      required: true,
      category: 'profile'
    },
    {
      id: 'experience',
      title: 'Experience',
      description: 'Add your work experience',
      completed: false,
      required: true,
      category: 'profile'
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Add your educational background',
      completed: false,
      required: false,
      category: 'profile'
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Add your current location',
      completed: false,
      required: false,
      category: 'profile'
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      description: 'Add a link to your portfolio',
      completed: false,
      required: false,
      category: 'profile'
    },
    {
      id: 'social-links',
      title: 'Social Links',
      description: 'Add your social media profiles',
      completed: false,
      required: false,
      category: 'profile'
    }
  ];

  profileData: ProfileData = {
    name: '',
    email: '',
    bio: '',
    avatar: '',
    skills: [],
    experience: '',
    education: '',
    location: '',
    portfolio: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  };

  newSkill: string = '';

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completionPercentage(): number {
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  get requiredTasksCompleted(): number {
    return this.tasks.filter(task => task.required && task.completed).length;
  }

  get totalRequiredTasks(): number {
    return this.tasks.filter(task => task.required).length;
  }

  get requiredCompletionPercentage(): number {
    return Math.round((this.requiredTasksCompleted / this.totalRequiredTasks) * 100);
  }

  get nextIncompleteTask(): Task | null {
    return this.tasks.find(task => !task.completed) || null;
  }

  get isProfileComplete(): boolean {
    return this.tasks.filter(task => task.required).every(task => task.completed);
  }

  toggleTask(taskId: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  getTaskStatusIcon(task: Task): string {
    if (task.completed) return '✅';
    if (task.required) return '🔴';
    return '⚪';
  }

  get htmlCode(): string {
    return `<div class="completeness-container">
  <!-- Progress Header -->
  <div class="progress-header">
    <h3 class="progress-title">Profile Completion</h3>
    <div class="progress-stats">
      <span class="progress-fraction">{{ completedTasks }}/{{ totalTasks }}</span>
      <span class="progress-percentage">{{ completionPercentage }}%</span>
    </div>
  </div>

  <!-- Main Progress Bar -->
  <div class="progress-bar-container">
    <div class="progress-bar">
      <div class="progress-fill" 
           [style.width.%]="completionPercentage">
        <div class="progress-shine"></div>
      </div>
    </div>
    <div class="progress-labels">
      <span class="progress-label-start">0%</span>
      <span class="progress-label-end">100%</span>
    </div>
  </div>

  <!-- Required vs Optional Progress -->
  <div class="progress-breakdown">
    <div class="progress-section">
      <div class="section-header">
        <span class="section-title">Required Fields</span>
        <span class="section-stats">{{ requiredTasksCompleted }}/{{ totalRequiredTasks }}</span>
      </div>
      <div class="mini-progress-bar">
        <div class="mini-progress-fill required" 
             [style.width.%]="requiredCompletionPercentage"></div>
      </div>
    </div>

    <div class="progress-section">
      <div class="section-header">
        <span class="section-title">Overall Progress</span>
        <span class="section-stats">{{ completedTasks }}/{{ totalTasks }}</span>
      </div>
      <div class="mini-progress-bar">
        <div class="mini-progress-fill overall" 
             [style.width.%]="completionPercentage"></div>
      </div>
    </div>
  </div>

  <!-- Task List -->
  <div class="task-list">
    <div class="task-list-header">
      <h4 class="task-list-title">Complete Your Profile</h4>
      <div *ngIf="isProfileComplete" class="completion-badge">
        ✨ Complete!
      </div>
    </div>

    <div class="tasks">
      <div *ngFor="let task of tasks" 
           class="task-item"
           [class.completed]="task.completed"
           [class.required]="task.required">
        
        <button class="task-toggle" 
                (click)="toggleTask(task.id)"
                [title]="task.completed ? 'Mark as incomplete' : 'Mark as complete'">
          <span class="task-status">{{ getTaskStatusIcon(task) }}</span>
        </button>
        
        <div class="task-content">
          <span class="task-title">{{ task.title }}</span>
          <div class="task-meta">
            <span *ngIf="task.required" class="required-badge">Required</span>
            <span *ngIf="!task.required" class="optional-badge">Optional</span>
          </div>
        </div>
        
        <div class="task-actions">
          <button *ngIf="!task.completed" 
                  class="action-btn primary">
            Complete
          </button>
          <button *ngIf="task.completed" 
                  class="action-btn secondary">
            ✓ Done
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Next Step Suggestion -->
  <div *ngIf="nextIncompleteTask && !isProfileComplete" class="next-step">
    <div class="next-step-header">
      <span class="next-step-icon">👉</span>
      <span class="next-step-title">Next Step</span>
    </div>
    <div class="next-step-content">
      <span class="next-step-task">{{ nextIncompleteTask.title }}</span>
      <button class="next-step-btn">
        Complete Now
      </button>
    </div>
  </div>

  <!-- Completion Celebration -->
  <div *ngIf="isProfileComplete" class="completion-celebration">
    <div class="celebration-content">
      <div class="celebration-icon">🎉</div>
      <h3 class="celebration-title">Profile Complete!</h3>
      <p class="celebration-text">
        Great job! Your profile is now complete and ready to be discovered.
      </p>
      <button class="celebration-btn">
        View Profile
      </button>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Completeness Meter Component */
.completeness-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

/* Progress Header */
.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.progress-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.progress-stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}

.progress-fraction {
  color: var(--text-secondary);
  font-weight: 500;
}

.progress-percentage {
  color: var(--primary-600);
  font-weight: 600;
  font-size: var(--font-size-base);
}

/* Progress Bar */
.progress-bar-container {
  margin-bottom: var(--spacing-6);
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 12px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-2);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
  }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-full);
  transition: width 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
}

.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* Progress Breakdown */
.progress-breakdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.progress-section {
  background: var(--gray-50);
  padding: var(--spacing-3);
  border-radius: var(--radius-md);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.section-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.section-stats {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  font-weight: 500;
}

.mini-progress-bar {
  width: 100%;
  height: 6px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-600);
  }
}

.mini-progress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s ease-in-out;

  &.required {
    background: var(--red-500);
  }

  &.overall {
    background: var(--primary-500);
  }
}

/* Task List */
.task-list {
  margin-bottom: var(--spacing-6);
}

.task-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.task-list-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.completion-badge {
  background: var(--green-100);
  color: var(--green-700);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    background: var(--green-900);
    color: var(--green-300);
  }
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--primary-300);
    background: var(--gray-50);
  }

  &.completed {
    background: var(--green-50);
    border-color: var(--green-200);

    .task-title {
      text-decoration: line-through;
      color: var(--text-secondary);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--green-900);
      border-color: var(--green-700);
    }
  }

  &.required:not(.completed) {
    border-left: 4px solid var(--red-500);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: var(--gray-800);
    }
  }
}

.task-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  transition: transform var(--transition-fast);

  &:hover {
    transform: scale(1.1);
  }
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.task-meta {
  display: flex;
  gap: var(--spacing-2);
}

.required-badge,
.optional-badge {
  font-size: var(--font-size-xs);
  padding: 2px var(--spacing-1);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.required-badge {
  background: var(--red-100);
  color: var(--red-700);

  @media (prefers-color-scheme: dark) {
    background: var(--red-900);
    color: var(--red-300);
  }
}

.optional-badge {
  background: var(--gray-100);
  color: var(--gray-600);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-700);
    color: var(--gray-400);
  }
}

.task-actions {
  display: flex;
  gap: var(--spacing-2);
}

.action-btn {
  padding: var(--spacing-1) var(--spacing-3);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &.primary {
    background: var(--primary-600);
    color: white;

    &:hover {
      background: var(--primary-700);
    }
  }

  &.secondary {
    background: var(--green-100);
    color: var(--green-700);

    &:hover {
      background: var(--green-200);
    }

    @media (prefers-color-scheme: dark) {
      background: var(--green-900);
      color: var(--green-300);

      &:hover {
        background: var(--green-800);
      }
    }
  }
}

/* Next Step */
.next-step {
  background: var(--primary-50);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-4);

  @media (prefers-color-scheme: dark) {
    background: var(--primary-900);
    border-color: var(--primary-700);
  }
}

.next-step-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-2);
}

.next-step-icon {
  font-size: var(--font-size-base);
}

.next-step-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--primary-700);

  @media (prefers-color-scheme: dark) {
    color: var(--primary-300);
  }
}

.next-step-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-3);
}

.next-step-task {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.next-step-btn {
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-normal);

  &:hover {
    background: var(--primary-700);
  }
}

/* Completion Celebration */
.completion-celebration {
  background: var(--green-50);
  border: 1px solid var(--green-200);
  border-radius: var(--radius-md);
  padding: var(--spacing-6);
  text-align: center;

  @media (prefers-color-scheme: dark) {
    background: var(--green-900);
    border-color: var(--green-700);
  }
}

.celebration-content {
  max-width: 300px;
  margin: 0 auto;
}

.celebration-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-3);
}

.celebration-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--green-700);
  margin: 0 0 var(--spacing-2) 0;

  @media (prefers-color-scheme: dark) {
    color: var(--green-300);
  }
}

.celebration-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-4) 0;
  line-height: 1.5;
}

.celebration-btn {
  background: var(--green-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-normal);

  &:hover {
    background: var(--green-700);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .progress-breakdown {
    grid-template-columns: 1fr;
  }

  .task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .task-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .next-step-content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .next-step-btn {
    align-self: stretch;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  required: boolean;
}

@Component({
  selector: 'app-completeness-meter',
  templateUrl: './completeness-meter.component.html',
  styleUrls: ['./completeness-meter.component.scss']
})
export class CompletenessMetererComponent {
  tasks: Task[] = [
    { id: 'name', title: 'Add your full name', completed: true, required: true },
    { id: 'email', title: 'Verify email address', completed: true, required: true },
    { id: 'avatar', title: 'Upload profile photo', completed: false, required: false },
    { id: 'bio', title: 'Write a bio', completed: false, required: true },
    { id: 'location', title: 'Add location', completed: false, required: false },
    { id: 'skills', title: 'List your skills', completed: false, required: true },
    { id: 'experience', title: 'Add work experience', completed: false, required: false },
    { id: 'portfolio', title: 'Link portfolio website', completed: false, required: false }
  ];

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completionPercentage(): number {
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  get requiredTasksCompleted(): number {
    return this.tasks.filter(task => task.required && task.completed).length;
  }

  get totalRequiredTasks(): number {
    return this.tasks.filter(task => task.required).length;
  }

  get requiredCompletionPercentage(): number {
    return Math.round((this.requiredTasksCompleted / this.totalRequiredTasks) * 100);
  }

  get nextIncompleteTask(): Task | null {
    return this.tasks.find(task => !task.completed) || null;
  }

  get isProfileComplete(): boolean {
    return this.tasks.filter(task => task.required).every(task => task.completed);
  }

  toggleTask(taskId: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  getTaskStatusIcon(task: Task): string {
    if (task.completed) return '✅';
    if (task.required) return '🔴';
    return '⚪';
  }
}`;
  }
}