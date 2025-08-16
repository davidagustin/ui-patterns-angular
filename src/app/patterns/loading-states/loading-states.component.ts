import { Component } from '@angular/core';

interface LoadingExample {
  id: string;
  title: string;
  description: string;
  isLoading: boolean;
  hasError: boolean;
  progress?: number;
}

@Component({
  selector: 'app-loading-states',
  templateUrl: './loading-states.component.html',
  styleUrls: ['./loading-states.component.scss']
})
export class LoadingStatesComponent {
  currentExample = 'spinners';
  
  loadingExamples: LoadingExample[] = [
    {
      id: 'basic',
      title: 'Basic Loading',
      description: 'Simple loading state',
      isLoading: false,
      hasError: false
    },
    {
      id: 'progress',
      title: 'Progress Loading',
      description: 'Loading with progress indicator',
      isLoading: false,
      hasError: false,
      progress: 0
    },
    {
      id: 'skeleton',
      title: 'Skeleton Loading',
      description: 'Content placeholder while loading',
      isLoading: false,
      hasError: false
    },
    {
      id: 'error',
      title: 'Error State',
      description: 'Loading with error handling',
      isLoading: false,
      hasError: false
    }
  ];

  progressValue = 0;
  skeletonLoading = false;
  cardLoading = false;
  tableLoading = false;
  buttonLoading = false;

  setExample(example: string): void {
    this.currentExample = example;
  }

  startLoading(exampleId: string): void {
    const example = this.loadingExamples.find(e => e.id === exampleId);
    if (!example) return;

    example.isLoading = true;
    example.hasError = false;

    if (exampleId === 'progress') {
      example.progress = 0;
      this.simulateProgress(example);
    } else {
      setTimeout(() => {
        example.isLoading = false;
        
        // Simulate random errors for error example
        if (exampleId === 'error' && Math.random() < 0.3) {
          example.hasError = true;
        }
      }, 2000 + Math.random() * 2000);
    }
  }

  simulateProgress(example: LoadingExample): void {
    const interval = setInterval(() => {
      if (example.progress! < 100) {
        example.progress! += Math.random() * 15;
        if (example.progress! > 100) {
          example.progress = 100;
        }
      } else {
        example.isLoading = false;
        clearInterval(interval);
      }
    }, 200);
  }

  retryAction(exampleId: string): void {
    const example = this.loadingExamples.find(e => e.id === exampleId);
    if (example) {
      example.hasError = false;
      this.startLoading(exampleId);
    }
  }

  toggleSkeletonLoading(): void {
    this.skeletonLoading = !this.skeletonLoading;
    if (this.skeletonLoading) {
      setTimeout(() => {
        this.skeletonLoading = false;
      }, 3000);
    }
  }

  toggleCardLoading(): void {
    this.cardLoading = !this.cardLoading;
    if (this.cardLoading) {
      setTimeout(() => {
        this.cardLoading = false;
      }, 2500);
    }
  }

  toggleTableLoading(): void {
    this.tableLoading = !this.tableLoading;
    if (this.tableLoading) {
      setTimeout(() => {
        this.tableLoading = false;
      }, 3000);
    }
  }

  simulateButtonAction(): void {
    this.buttonLoading = true;
    setTimeout(() => {
      this.buttonLoading = false;
    }, 2000);
  }

  startProgressDemo(): void {
    this.progressValue = 0;
    const interval = setInterval(() => {
      this.progressValue += Math.random() * 10;
      if (this.progressValue >= 100) {
        this.progressValue = 100;
        clearInterval(interval);
        setTimeout(() => {
          this.progressValue = 0;
        }, 1000);
      }
    }, 150);
  }

  get htmlCode(): string {
    return `<!-- Loading States Container -->
<div class="loading-states-container">
  <!-- Example Navigation -->
  <div class="example-navigation">
    <button 
      (click)="setExample('spinners')"
      class="nav-button"
      [class.active]="currentExample === 'spinners'">
      ó Spinners
    </button>
    <button 
      (click)="setExample('skeleton')"
      class="nav-button"
      [class.active]="currentExample === 'skeleton'">
      =€ Skeleton
    </button>
    <button 
      (click)="setExample('progress')"
      class="nav-button"
      [class.active]="currentExample === 'progress'">
      =Ê Progress
    </button>
    <button 
      (click)="setExample('states')"
      class="nav-button"
      [class.active]="currentExample === 'states'">
      = States
    </button>
  </div>

  <!-- Spinner Examples -->
  <div *ngIf="currentExample === 'spinners'" class="spinner-examples">
    <div class="spinner-grid">
      <div class="spinner-item">
        <div class="spinner-basic"></div>
        <span>Basic Spinner</span>
      </div>
      
      <div class="spinner-item">
        <div class="spinner-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span>Dot Spinner</span>
      </div>
      
      <div class="spinner-item">
        <div class="spinner-pulse"></div>
        <span>Pulse Spinner</span>
      </div>
      
      <div class="spinner-item">
        <div class="spinner-bars">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span>Bar Spinner</span>
      </div>
    </div>
  </div>

  <!-- Skeleton Examples -->
  <div *ngIf="currentExample === 'skeleton'" class="skeleton-examples">
    <button (click)="toggleSkeletonLoading()" class="demo-button">
      {{ skeletonLoading ? 'Stop Loading' : 'Start Skeleton Demo' }}
    </button>
    
    <div class="skeleton-card" [class.loading]="skeletonLoading">
      <div class="skeleton-avatar" *ngIf="skeletonLoading"></div>
      <img *ngIf="!skeletonLoading" src="https://via.placeholder.com/60" alt="Avatar" class="avatar">
      
      <div class="skeleton-content">
        <div class="skeleton-line title" *ngIf="skeletonLoading"></div>
        <h3 *ngIf="!skeletonLoading">John Doe</h3>
        
        <div class="skeleton-line" *ngIf="skeletonLoading"></div>
        <div class="skeleton-line" *ngIf="skeletonLoading"></div>
        <p *ngIf="!skeletonLoading">Software Engineer with 5+ years of experience...</p>
      </div>
    </div>
  </div>

  <!-- Progress Examples -->
  <div *ngIf="currentExample === 'progress'" class="progress-examples">
    <button (click)="startProgressDemo()" class="demo-button">
      Start Progress Demo
    </button>
    
    <div class="progress-bars">
      <div class="progress-item">
        <label>Linear Progress</label>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="progressValue"></div>
        </div>
        <span class="progress-text">{{ progressValue.toFixed(0) }}%</span>
      </div>
      
      <div class="progress-item">
        <label>Circular Progress</label>
        <div class="progress-circle">
          <svg class="progress-svg" width="80" height="80">
            <circle cx="40" cy="40" r="30" class="progress-bg"></circle>
            <circle 
              cx="40" 
              cy="40" 
              r="30" 
              class="progress-stroke"
              [style.stroke-dasharray]="188.4"
              [style.stroke-dashoffset]="188.4 - (progressValue / 100 * 188.4)">
            </circle>
          </svg>
          <span class="progress-value">{{ progressValue.toFixed(0) }}%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading States Examples -->
  <div *ngIf="currentExample === 'states'" class="states-examples">
    <div class="state-grid">
      <div *ngFor="let example of loadingExamples" class="state-card">
        <h3>{{ example.title }}</h3>
        <p>{{ example.description }}</p>
        
        <div class="state-content">
          <div *ngIf="!example.isLoading && !example.hasError" class="success-state">
             Content loaded successfully
          </div>
          
          <div *ngIf="example.isLoading" class="loading-state">
            <div class="spinner-basic small"></div>
            <span>Loading...</span>
            <div *ngIf="example.progress !== undefined" class="inline-progress">
              <div class="progress-bar small">
                <div class="progress-fill" [style.width.%]="example.progress"></div>
              </div>
              <span>{{ example.progress?.toFixed(0) }}%</span>
            </div>
          </div>
          
          <div *ngIf="example.hasError" class="error-state">
            <span class="error-icon">L</span>
            <span>Failed to load content</span>
            <button (click)="retryAction(example.id)" class="retry-button">
              = Retry
            </button>
          </div>
        </div>
        
        <button 
          (click)="startLoading(example.id)"
          [disabled]="example.isLoading"
          class="start-button">
          {{ example.isLoading ? 'Loading...' : 'Start Loading' }}
        </button>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Loading States Container */
.loading-states-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

/* Example Navigation */
.example-navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.nav-button {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:hover {
      border-color: #60a5fa;
      background: #4b5563;
    }

    &.active {
      background: #3b82f6;
      color: white;
    }
  }
}

/* Spinner Examples */
.spinner-examples {
  padding: 2rem 0;
}

.spinner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.spinner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;

  span {
    font-size: 0.875rem;
    color: #6b7280;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    span {
      color: #9ca3af;
    }
  }
}

/* Basic Spinner */
.spinner-basic {
  width: 2rem;
  height: 2rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  &.small {
    width: 1rem;
    height: 1rem;
    border-width: 1px;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #4b5563;
    border-top-color: #60a5fa;
  }
}

/* Dot Spinner */
.spinner-dots {
  display: flex;
  gap: 0.25rem;

  div {
    width: 0.5rem;
    height: 0.5rem;
    background: #3b82f6;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
}

/* Pulse Spinner */
.spinner-pulse {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Bar Spinner */
.spinner-bars {
  display: flex;
  gap: 0.25rem;
  align-items: end;

  div {
    width: 0.25rem;
    height: 1.5rem;
    background: #3b82f6;
    animation: bars 1.2s ease-in-out infinite;

    &:nth-child(1) { animation-delay: -1.1s; }
    &:nth-child(2) { animation-delay: -1.0s; }
    &:nth-child(3) { animation-delay: -0.9s; }
    &:nth-child(4) { animation-delay: -0.8s; }
  }
}

/* Skeleton Examples */
.skeleton-examples {
  padding: 2rem 0;
}

.demo-button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #2563eb;
  }
}

.skeleton-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  max-width: 400px;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.skeleton-avatar,
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-avatar {
  background: linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(90deg, #374151, #4b5563, #374151);
    background-size: 200% 100%;
  }
}

.skeleton-content {
  flex: 1;
}

.skeleton-line {
  height: 1rem;
  background: linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;

  &.title {
    height: 1.5rem;
    width: 60%;
  }

  &:nth-child(2) {
    width: 80%;
  }

  &:last-child {
    width: 40%;
    margin-bottom: 0;
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(90deg, #374151, #4b5563, #374151);
    background-size: 200% 100%;
  }
}

/* Progress Examples */
.progress-examples {
  padding: 2rem 0;
}

.progress-bars {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.progress-item {
  flex: 1;
  
  label {
    display: block;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #374151;

    @media (prefers-color-scheme: dark) {
      color: #d1d5db;
    }
  }
}

.progress-bar {
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;

  &.small {
    height: 0.25rem;
    margin-bottom: 0.25rem;
  }

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
  font-size: 0.875rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.progress-circle {
  position: relative;
  display: inline-block;
}

.progress-svg {
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 4;

  @media (prefers-color-scheme: dark) {
    stroke: #374151;
  }
}

.progress-stroke {
  fill: none;
  stroke: #3b82f6;
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.progress-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* States Examples */
.states-examples {
  padding: 2rem 0;
}

.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.state-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    color: #111827;
  }

  p {
    margin: 0 0 1rem 0;
    color: #6b7280;
    font-size: 0.875rem;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;

    h3 {
      color: #f9fafb;
    }

    p {
      color: #9ca3af;
    }
  }
}

.state-content {
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.375rem;

  @media (prefers-color-scheme: dark) {
    background: #111827;
  }
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-direction: column;

  span {
    color: #6b7280;
    font-size: 0.875rem;
  }
}

.inline-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 120px;

  span {
    font-size: 0.75rem;
    min-width: 30px;
  }
}

.success-state {
  color: #059669;
  font-weight: 500;
  font-size: 0.875rem;
}

.error-state {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  color: #ef4444;
  font-size: 0.875rem;

  .error-icon {
    font-size: 1.5rem;
  }
}

.retry-button {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #dc2626;
  }
}

.start-button {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bars {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .loading-states-container {
    padding: 0.5rem;
  }

  .spinner-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .spinner-item {
    padding: 1rem;
  }

  .state-grid {
    grid-template-columns: 1fr;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface LoadingExample {
  id: string;
  title: string;
  description: string;
  isLoading: boolean;
  hasError: boolean;
  progress?: number;
}

@Component({
  selector: 'app-loading-states',
  templateUrl: './loading-states.component.html',
  styleUrls: ['./loading-states.component.scss']
})
export class LoadingStatesComponent {
  currentExample = 'spinners';
  
  loadingExamples: LoadingExample[] = [
    {
      id: 'basic',
      title: 'Basic Loading',
      description: 'Simple loading state',
      isLoading: false,
      hasError: false
    },
    {
      id: 'progress',
      title: 'Progress Loading', 
      description: 'Loading with progress indicator',
      isLoading: false,
      hasError: false,
      progress: 0
    }
    // More examples...
  ];

  progressValue = 0;
  skeletonLoading = false;

  setExample(example: string): void {
    this.currentExample = example;
  }

  startLoading(exampleId: string): void {
    const example = this.loadingExamples.find(e => e.id === exampleId);
    if (!example) return;

    example.isLoading = true;
    example.hasError = false;

    if (exampleId === 'progress') {
      example.progress = 0;
      this.simulateProgress(example);
    } else {
      // Simulate loading completion
      setTimeout(() => {
        example.isLoading = false;
      }, 2000 + Math.random() * 2000);
    }
  }

  simulateProgress(example: LoadingExample): void {
    const interval = setInterval(() => {
      if (example.progress! < 100) {
        example.progress! += Math.random() * 15;
        if (example.progress! > 100) {
          example.progress = 100;
        }
      } else {
        example.isLoading = false;
        clearInterval(interval);
      }
    }, 200);
  }

  // Additional methods for skeleton loading, button states, etc.
}`;
  }
}