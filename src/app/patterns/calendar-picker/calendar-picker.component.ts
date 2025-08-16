import { Component, HostListener } from '@angular/core';

interface DayInfo {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isEmpty?: boolean;
}

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent {
  selectedDate: Date | null = null;
  currentMonth: Date = new Date();
  showCalendar: boolean = false;
  selectedTime: string = '12:00';

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.calendar-picker') && this.showCalendar) {
      this.closeCalendar();
    }
  }

  getDaysInMonth(date: Date): { daysInMonth: number; startingDayOfWeek: number } {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  }

  getMonthName(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === this.currentMonth.getMonth() &&
      today.getFullYear() === this.currentMonth.getFullYear()
    );
  }

  isSelected(day: number): boolean {
    if (!this.selectedDate) return false;
    return (
      this.selectedDate.getDate() === day &&
      this.selectedDate.getMonth() === this.currentMonth.getMonth() &&
      this.selectedDate.getFullYear() === this.currentMonth.getFullYear()
    );
  }

  handleDateSelect(day: number): void {
    const newDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
    this.selectedDate = newDate;
  }

  goToPreviousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
  }

  goToNextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }

  goToToday(): void {
    const today = new Date();
    this.currentMonth = today;
    this.selectedDate = today;
  }

  formatSelectedDate(): string {
    if (!this.selectedDate) return 'Select a date';
    return this.selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  closeCalendar(): void {
    this.showCalendar = false;
  }

  onTimeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedTime = target.value;
  }

  getCalendarDays(): DayInfo[] {
    const { daysInMonth, startingDayOfWeek } = this.getDaysInMonth(this.currentMonth);
    const days: DayInfo[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: 0, isToday: false, isSelected: false, isEmpty: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isToday: this.isToday(day),
        isSelected: this.isSelected(day),
        isEmpty: false
      });
    }

    return days;
  }

  get htmlCode(): string {
    return `<!-- Calendar Picker Container -->
<div class="calendar-picker">
  <!-- Date Input -->
  <div class="input-container">
    <label class="input-label">Select Date & Time</label>
    <div class="input-wrapper">
      <input
        type="text"
        [value]="selectedDate ? formatSelectedDate() + ' at ' + selectedTime : 'Click to select date and time'"
        (click)="toggleCalendar()"
        readonly
        class="calendar-input"
        placeholder="Select date and time"
      />
      <div class="input-icon">📅</div>
    </div>
  </div>

  <!-- Calendar Popup -->
  <div *ngIf="showCalendar" class="calendar-dropdown">
    <!-- Calendar Header -->
    <div class="calendar-header">
      <button
        (click)="goToPreviousMonth()"
        class="nav-button"
        aria-label="Previous month">
        ←
      </button>
      <h3 class="month-title">{{ getMonthName(currentMonth) }}</h3>
      <button
        (click)="goToNextMonth()"
        class="nav-button"
        aria-label="Next month">
        →
      </button>
    </div>

    <!-- Today Button -->
    <div class="today-section">
      <button (click)="goToToday()" class="today-link">
        Go to Today
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-grid">
      <!-- Day Headers -->
      <div *ngFor="let dayName of dayNames" class="day-header">
        {{ dayName }}
      </div>
      
      <!-- Calendar Days -->
      <div *ngFor="let dayInfo of getCalendarDays()" class="day-cell">
        <button
          *ngIf="!dayInfo.isEmpty"
          (click)="handleDateSelect(dayInfo.day)"
          class="day-button"
          [class.today]="dayInfo.isToday"
          [class.selected]="dayInfo.isSelected">
          {{ dayInfo.day }}
        </button>
      </div>
    </div>

    <!-- Time Picker -->
    <div class="time-section">
      <label class="time-label">Time</label>
      <input
        type="time"
        [value]="selectedTime"
        (change)="onTimeChange($event)"
        class="time-input"
      />
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button (click)="closeCalendar()" class="cancel-button">
        Cancel
      </button>
      <button (click)="closeCalendar()" class="ok-button">
        OK
      </button>
    </div>
  </div>

  <!-- Selected Date Display -->
  <div *ngIf="selectedDate" class="selected-display">
    <div class="selected-content">
      <span class="selected-icon">✅</span>
      <div>
        <p class="selected-date">Selected: {{ formatSelectedDate() }}</p>
        <p class="selected-time">Time: {{ selectedTime }}</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Calendar Picker Container */
.calendar-picker {
  position: relative;
  max-width: 400px;
  width: 100%;
}

/* Input Container */
.input-container {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.calendar-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;

  &:hover {
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:hover {
      border-color: #6b7280;
    }

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }
  }
}

.input-icon {
  position: absolute;
  right: 0.75rem;
  font-size: 1.25rem;
  color: #9ca3af;
  pointer-events: none;

  @media (prefers-color-scheme: dark) {
    color: #6b7280;
  }
}

/* Calendar Dropdown */
.calendar-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  z-index: 50;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 
                0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface DayInfo {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isEmpty?: boolean;
}

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent {
  selectedDate: Date | null = null;
  currentMonth: Date = new Date();
  showCalendar: boolean = false;
  selectedTime: string = '12:00';

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('.calendar-picker') && this.showCalendar) {
      this.closeCalendar();
    }
  }

  getDaysInMonth(date: Date): { daysInMonth: number; startingDayOfWeek: number } {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  }

  getMonthName(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === this.currentMonth.getMonth() &&
      today.getFullYear() === this.currentMonth.getFullYear()
    );
  }

  isSelected(day: number): boolean {
    if (!this.selectedDate) return false;
    return (
      this.selectedDate.getDate() === day &&
      this.selectedDate.getMonth() === this.currentMonth.getMonth() &&
      this.selectedDate.getFullYear() === this.currentMonth.getFullYear()
    );
  }

  handleDateSelect(day: number): void {
    const newDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
    this.selectedDate = newDate;
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  closeCalendar(): void {
    this.showCalendar = false;
  }

  getCalendarDays(): DayInfo[] {
    const { daysInMonth, startingDayOfWeek } = this.getDaysInMonth(this.currentMonth);
    const days: DayInfo[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: 0, isToday: false, isSelected: false, isEmpty: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isToday: this.isToday(day),
        isSelected: this.isSelected(day),
        isEmpty: false
      });
    }

    return days;
  }
}`;
  }
}