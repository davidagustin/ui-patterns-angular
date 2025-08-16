import { Component } from '@angular/core';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: 'meeting' | 'task' | 'reminder' | 'personal';
  description?: string;
}

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent {
  currentDate = new Date();
  selectedDate: Date | null = null;
  viewMode: 'month' | 'week' = 'month';

  events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Standup',
      date: new Date(2024, 1, 15),
      time: '9:00 AM',
      type: 'meeting',
      description: 'Daily team sync meeting'
    },
    {
      id: '2',
      title: 'Project Review',
      date: new Date(2024, 1, 18),
      time: '2:00 PM',
      type: 'meeting',
      description: 'Quarterly project review with stakeholders'
    },
    {
      id: '3',
      title: 'Code Review',
      date: new Date(2024, 1, 20),
      time: '11:00 AM',
      type: 'task',
      description: 'Review pending pull requests'
    },
    {
      id: '4',
      title: 'Doctor Appointment',
      date: new Date(2024, 1, 22),
      time: '3:30 PM',
      type: 'personal',
      description: 'Annual checkup'
    },
    {
      id: '5',
      title: 'Submit Report',
      date: new Date(2024, 1, 25),
      type: 'reminder',
      description: 'Monthly status report due'
    }
  ];

  get currentMonth(): string {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get calendarDays(): (Date | null)[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: (Date | null)[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      if (date.getMonth() === month) {
        days.push(date);
      } else {
        days.push(null);
      }
    }
    return days;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  selectDate(date: Date | null): void {
    this.selectedDate = date;
  }

  getEventsForDate(date: Date | null): CalendarEvent[] {
    if (!date) return [];
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  getEventTypeIcon(type: string): string {
    switch (type) {
      case 'meeting': return '👥';
      case 'task': return '📋';
      case 'reminder': return '⏰';
      case 'personal': return '👤';
      default: return '📅';
    }
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.selectedDate = new Date();
  }

  get exampleCode(): string {
    return `<!-- Simple Calendar Example -->
<div class="calendar-container">
  <div class="calendar-header">
    <button (click)="previousMonth()" class="nav-button">
      ← Previous
    </button>
    <h2 class="calendar-title">{{ currentMonth }}</h2>
    <button (click)="nextMonth()" class="nav-button">
      Next →
    </button>
  </div>

  <div class="calendar-grid">
    <div class="calendar-weekdays">
      <div *ngFor="let day of weekdays" class="weekday">{{ day }}</div>
    </div>
    
    <div class="calendar-days">
      <div *ngFor="let date of calendarDays" 
           class="calendar-day"
           [class.today]="isToday(date)"
           [class.selected]="isSelected(date)"
           (click)="selectDate(date)">
        <span class="day-number">{{ date?.getDate() }}</span>
        <div class="day-events">
          <div *ngFor="let event of getEventsForDate(date)" 
               class="event-dot"
               [class]="'event-' + event.type">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class CalendarExample {
  currentDate = new Date();
  selectedDate: Date | null = null;
  
  events = [
    { id: '1', title: 'Meeting', date: new Date(), type: 'meeting' }
  ];

  get currentMonth(): string {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="event-calendar">
  <!-- Calendar Header -->
  <div class="calendar-header">
    <div class="calendar-navigation">
      <button (click)="previousMonth()" class="nav-button">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
      <h2 class="calendar-title">{{ currentMonth }}</h2>
      <button (click)="nextMonth()" class="nav-button">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
    
    <div class="calendar-controls">
      <button (click)="goToToday()" class="today-button">
        Today
      </button>
      <div class="view-toggle">
        <button 
          (click)="viewMode = 'month'" 
          class="view-button"
          [class.active]="viewMode === 'month'">
          Month
        </button>
        <button 
          (click)="viewMode = 'week'" 
          class="view-button"
          [class.active]="viewMode === 'week'">
          Week
        </button>
      </div>
    </div>
  </div>

  <!-- Calendar Grid -->
  <div class="calendar-grid">
    <!-- Weekday Headers -->
    <div class="weekdays-header">
      <div class="weekday">Sun</div>
      <div class="weekday">Mon</div>
      <div class="weekday">Tue</div>
      <div class="weekday">Wed</div>
      <div class="weekday">Thu</div>
      <div class="weekday">Fri</div>
      <div class="weekday">Sat</div>
    </div>
    
    <!-- Calendar Days -->
    <div class="calendar-days">
      <div *ngFor="let date of calendarDays" 
           class="calendar-day"
           [class.today]="isToday(date)"
           [class.selected]="isSelected(date)"
           [class.other-month]="!date"
           (click)="selectDate(date)">
        
        <div *ngIf="date" class="day-content">
          <span class="day-number">{{ date.getDate() }}</span>
          
          <div class="day-events">
            <div *ngFor="let event of getEventsForDate(date)" 
                 class="event-indicator"
                 [class]="'event-' + event.type"
                 [title]="event.title">
              <span class="event-dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Event Details Sidebar -->
  <div class="event-sidebar" *ngIf="selectedDate">
    <div class="sidebar-header">
      <h3 class="sidebar-title">
        {{ selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
      </h3>
      <button (click)="selectedDate = null" class="close-button">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
    
    <div class="sidebar-content">
      <div *ngIf="getEventsForDate(selectedDate).length === 0" class="no-events">
        <div class="no-events-icon">📅</div>
        <p class="no-events-text">No events scheduled</p>
      </div>
      
      <div *ngFor="let event of getEventsForDate(selectedDate)" class="event-card">
        <div class="event-header">
          <div class="event-type-icon">{{ getEventTypeIcon(event.type) }}</div>
          <div class="event-info">
            <h4 class="event-title">{{ event.title }}</h4>
            <p class="event-time" *ngIf="event.time">{{ event.time }}</p>
          </div>
          <div class="event-type-badge" [class]="'badge-' + event.type">
            {{ event.type }}
          </div>
        </div>
        <p class="event-description" *ngIf="event.description">
          {{ event.description }}
        </p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Event Calendar Styles */
.event-calendar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 600px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
}

/* Calendar Header */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-6);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-primary);
  grid-column: 1 / -1;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--spacing-3);
  }
}

.calendar-navigation {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--primary-50);
    border-color: var(--primary-500);
    color: var(--primary-600);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
      color: var(--primary-400);
    }
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.calendar-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  min-width: 200px;
  text-align: center;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.today-button {
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
    transform: translateY(-1px);
  }
}

.view-toggle {
  display: flex;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.view-button {
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--bg-primary);
  border: none;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:not(:last-child) {
    border-right: 1px solid var(--border-primary);
  }

  &.active {
    background: var(--primary-500);
    color: white;
  }

  &:not(.active):hover {
    background: var(--gray-100);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }
}

/* Calendar Grid */
.calendar-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.weekdays-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: var(--gray-100);
  border-bottom: 1px solid var(--border-primary);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.weekday {
  padding: var(--spacing-3);
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  flex: 1;
}

.calendar-day {
  border: 1px solid var(--border-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;

  &:hover {
    background: var(--primary-50);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }
  }

  &.today {
    background: var(--primary-100);
    border-color: var(--primary-500);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
    }

    .day-number {
      color: var(--primary-700);
      font-weight: 600;

      @media (prefers-color-scheme: dark) {
        color: var(--primary-300);
      }
    }
  }

  &.selected {
    background: var(--primary-500);
    color: white;

    .day-number {
      color: white;
    }
  }

  &.other-month {
    background: var(--gray-50);
    pointer-events: none;

    @media (prefers-color-scheme: dark) {
      background: var(--gray-900);
    }
  }
}

.day-content {
  padding: var(--spacing-2);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.day-number {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.day-events {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
  margin-top: auto;
}

.event-indicator {
  position: relative;
}

.event-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: block;

  .event-meeting & {
    background: var(--blue-500);
  }

  .event-task & {
    background: var(--green-500);
  }

  .event-reminder & {
    background: var(--yellow-500);
  }

  .event-personal & {
    background: var(--purple-500);
  }
}

/* Event Sidebar */
.event-sidebar {
  width: 300px;
  background: var(--bg-primary);
  border-left: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--border-primary);
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-primary);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }
}

.sidebar-title {
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-200);
    color: var(--text-secondary);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-700);
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
}

.sidebar-content {
  flex: 1;
  padding: var(--spacing-4);
  overflow-y: auto;
}

.no-events {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8);
  text-align: center;
}

.no-events-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-4);
}

.no-events-text {
  color: var(--text-secondary);
  margin: 0;
}

.event-card {
  background: var(--gray-50);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-3);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.event-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-2);
}

.event-type-icon {
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.event-info {
  flex: 1;
  min-width: 0;
}

.event-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.event-time {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: 0;
}

.event-type-badge {
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  text-transform: capitalize;

  &.badge-meeting {
    background: var(--blue-100);
    color: var(--blue-700);

    @media (prefers-color-scheme: dark) {
      background: var(--blue-900);
      color: var(--blue-300);
    }
  }

  &.badge-task {
    background: var(--green-100);
    color: var(--green-700);

    @media (prefers-color-scheme: dark) {
      background: var(--green-900);
      color: var(--green-300);
    }
  }

  &.badge-reminder {
    background: var(--yellow-100);
    color: var(--yellow-700);

    @media (prefers-color-scheme: dark) {
      background: var(--yellow-900);
      color: var(--yellow-300);
    }
  }

  &.badge-personal {
    background: var(--purple-100);
    color: var(--purple-700);

    @media (prefers-color-scheme: dark) {
      background: var(--purple-900);
      color: var(--purple-300);
    }
  }
}

.event-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* Focus states for accessibility */
.nav-button:focus,
.today-button:focus,
.view-button:focus,
.calendar-day:focus,
.close-button:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Responsive design */
@media (max-width: 640px) {
  .calendar-title {
    font-size: var(--font-size-lg);
    min-width: auto;
  }

  .weekday {
    padding: var(--spacing-2);
    font-size: var(--font-size-xs);
  }

  .day-content {
    padding: var(--spacing-1);
  }

  .day-number {
    font-size: var(--font-size-xs);
  }

  .event-dot {
    width: 0.375rem;
    height: 0.375rem;
  }

  .sidebar-content {
    padding: var(--spacing-3);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: 'meeting' | 'task' | 'reminder' | 'personal';
  description?: string;
}

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent {
  currentDate = new Date();
  selectedDate: Date | null = null;
  viewMode: 'month' | 'week' = 'month';

  events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Standup',
      date: new Date(2024, 1, 15),
      time: '9:00 AM',
      type: 'meeting',
      description: 'Daily team sync meeting'
    },
    {
      id: '2',
      title: 'Project Review',
      date: new Date(2024, 1, 18),
      time: '2:00 PM',
      type: 'meeting',
      description: 'Quarterly project review with stakeholders'
    },
    {
      id: '3',
      title: 'Code Review',
      date: new Date(2024, 1, 20),
      time: '11:00 AM',
      type: 'task',
      description: 'Review pending pull requests'
    }
  ];

  get currentMonth(): string {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get calendarDays(): (Date | null)[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: (Date | null)[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      if (date.getMonth() === month) {
        days.push(date);
      } else {
        days.push(null);
      }
    }
    return days;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  selectDate(date: Date | null): void {
    this.selectedDate = date;
  }

  getEventsForDate(date: Date | null): CalendarEvent[] {
    if (!date) return [];
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  getEventTypeIcon(type: string): string {
    switch (type) {
      case 'meeting': return '👥';
      case 'task': return '📋';
      case 'reminder': return '⏰';
      case 'personal': return '👤';
      default: return '📅';
    }
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.selectedDate = new Date();
  }
}`;
  }
}