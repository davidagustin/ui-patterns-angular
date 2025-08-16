import { Component } from '@angular/core';

interface SliderConfig {
  min: number;
  max: number;
  step: number;
  value: number;
  label: string;
}

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  // Single value sliders
  priceRange = { min: 0, max: 1000, value: 250 };
  volumeLevel = { min: 0, max: 100, value: 75 };
  
  // Dual range slider
  priceFilter = { min: 0, max: 1000, from: 200, to: 800 };
  
  // Stepped slider
  rating = { min: 1, max: 5, value: 3, step: 1 };
  
  // Vertical slider
  temperature = { min: -10, max: 50, value: 22 };

  sliders: SliderConfig[] = [
    { min: 0, max: 100, step: 1, value: 50, label: 'Progress' },
    { min: 0, max: 1000, step: 10, value: 250, label: 'Budget' },
    { min: 1, max: 10, step: 0.5, value: 5, label: 'Rating' }
  ];

  onSliderChange(slider: SliderConfig, event: Event): void {
    const target = event.target as HTMLInputElement;
    slider.value = parseFloat(target.value);
  }

  onPriceChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.priceRange.value = parseInt(target.value);
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.volumeLevel.value = parseInt(target.value);
  }

  onRatingChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.rating.value = parseInt(target.value);
  }

  onDualRangeFromChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value);
    if (newValue <= this.priceFilter.to) {
      this.priceFilter.from = newValue;
    }
  }

  onDualRangeToChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value);
    if (newValue >= this.priceFilter.from) {
      this.priceFilter.to = newValue;
    }
  }

  formatCurrency(value: number): string {
    return `$${value}`;
  }

  formatPercentage(value: number): string {
    return `${value}%`;
  }

  formatTemperature(value: number): string {
    return `${value}°C`;
  }

  getSliderProgress(slider: SliderConfig): number {
    return ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  }

  getDualRangeProgress(): { left: number; width: number } {
    const total = this.priceFilter.max - this.priceFilter.min;
    const left = ((this.priceFilter.from - this.priceFilter.min) / total) * 100;
    const width = ((this.priceFilter.to - this.priceFilter.from) / total) * 100;
    return { left, width };
  }

  get htmlCode(): string {
    return `<div class="range-slider-container">
  <!-- Single Range Sliders -->
  <div class="slider-group">
    <h3 class="group-title">Single Range Sliders</h3>
    
    <!-- Price Slider -->
    <div class="slider-item">
      <label class="slider-label">
        Price Range: {{ formatCurrency(priceRange.value) }}
      </label>
      <div class="slider-wrapper">
        <input type="range"
               class="range-input"
               [min]="priceRange.min"
               [max]="priceRange.max"
               [value]="priceRange.value"
               (input)="onPriceChange($event)">
        <div class="slider-track">
          <div class="slider-progress" 
               [style.width.%]="(priceRange.value / priceRange.max) * 100">
          </div>
        </div>
      </div>
      <div class="slider-labels">
        <span>{{ formatCurrency(priceRange.min) }}</span>
        <span>{{ formatCurrency(priceRange.max) }}</span>
      </div>
    </div>

    <!-- Volume Slider -->
    <div class="slider-item">
      <label class="slider-label">
        Volume: {{ formatPercentage(volumeLevel.value) }}
      </label>
      <div class="slider-wrapper">
        <input type="range"
               class="range-input volume"
               [min]="volumeLevel.min"
               [max]="volumeLevel.max"
               [value]="volumeLevel.value"
               (input)="onVolumeChange($event)">
      </div>
    </div>
  </div>

  <!-- Dual Range Slider -->
  <div class="slider-group">
    <h3 class="group-title">Dual Range Slider</h3>
    
    <div class="slider-item">
      <label class="slider-label">
        Price Filter: {{ formatCurrency(priceFilter.from) }} - {{ formatCurrency(priceFilter.to) }}
      </label>
      <div class="dual-slider-wrapper">
        <div class="dual-slider-track">
          <div class="dual-slider-progress"
               [style.left.%]="getDualRangeProgress().left"
               [style.width.%]="getDualRangeProgress().width">
          </div>
        </div>
        <input type="range"
               class="dual-range-input from"
               [min]="priceFilter.min"
               [max]="priceFilter.max"
               [value]="priceFilter.from"
               (input)="onDualRangeFromChange($event)">
        <input type="range"
               class="dual-range-input to"
               [min]="priceFilter.min"
               [max]="priceFilter.max"
               [value]="priceFilter.to"
               (input)="onDualRangeToChange($event)">
      </div>
    </div>
  </div>

  <!-- Stepped Slider -->
  <div class="slider-group">
    <h3 class="group-title">Stepped Slider</h3>
    
    <div class="slider-item">
      <label class="slider-label">
        Rating: {{ rating.value }} / {{ rating.max }}
      </label>
      <div class="slider-wrapper">
        <input type="range"
               class="range-input stepped"
               [min]="rating.min"
               [max]="rating.max"
               [step]="rating.step"
               [value]="rating.value"
               (input)="onRatingChange($event)">
        <div class="step-markers">
          <span *ngFor="let i of [].constructor(rating.max)" 
                class="step-marker"
                [class.active]="i + 1 <= rating.value">
            {{ i + 1 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Range Slider Container */
.range-slider-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.slider-group {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.group-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.slider-item {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.slider-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.75rem;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* Single Range Slider */
.slider-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
}

.range-input {
  width: 100%;
  height: 6px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-track {
    width: 100%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  &::-moz-range-track {
    width: 100%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    border: none;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &.volume {
    &::-webkit-slider-thumb {
      background: #10b981;
    }

    &::-moz-range-thumb {
      background: #10b981;
    }
  }

  &.stepped {
    &::-webkit-slider-thumb {
      background: #f59e0b;
    }

    &::-moz-range-thumb {
      background: #f59e0b;
    }
  }

  @media (prefers-color-scheme: dark) {
    &::-webkit-slider-track {
      background: #374151;
    }

    &::-moz-range-track {
      background: #374151;
    }
  }
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  transform: translateY(-50%);
  pointer-events: none;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.slider-progress {
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.2s ease;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Dual Range Slider */
.dual-slider-wrapper {
  position: relative;
  height: 24px;
  margin-bottom: 0.5rem;
}

.dual-slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  transform: translateY(-50%);

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.dual-slider-progress {
  position: absolute;
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.dual-range-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: all;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    pointer-events: all;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &.to {
    &::-webkit-slider-thumb {
      background: #8b5cf6;
    }

    &::-moz-range-thumb {
      background: #8b5cf6;
    }
  }
}

/* Stepped Slider */
.step-markers {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.step-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &.active {
    background: #f59e0b;
    color: white;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    color: #9ca3af;

    &.active {
      background: #f59e0b;
      color: #1f2937;
    }
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .slider-group {
    padding: 1rem;
  }

  .range-input {
    &::-webkit-slider-thumb {
      width: 24px;
      height: 24px;
    }

    &::-moz-range-thumb {
      width: 24px;
      height: 24px;
    }
  }

  .dual-range-input {
    &::-webkit-slider-thumb {
      width: 24px;
      height: 24px;
    }

    &::-moz-range-thumb {
      width: 24px;
      height: 24px;
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface SliderConfig {
  min: number;
  max: number;
  step: number;
  value: number;
  label: string;
}

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  // Single value sliders
  priceRange = { min: 0, max: 1000, value: 250 };
  volumeLevel = { min: 0, max: 100, value: 75 };
  
  // Dual range slider
  priceFilter = { min: 0, max: 1000, from: 200, to: 800 };
  
  // Stepped slider
  rating = { min: 1, max: 5, value: 3, step: 1 };

  onSliderChange(event: Event, property: string): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    
    switch(property) {
      case 'price':
        this.priceRange.value = value;
        break;
      case 'volume':
        this.volumeLevel.value = value;
        break;
      case 'rating':
        this.rating.value = value;
        break;
    }
  }

  onDualRangeChange(event: Event, type: 'from' | 'to'): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    
    if (type === 'from' && value <= this.priceFilter.to) {
      this.priceFilter.from = value;
    } else if (type === 'to' && value >= this.priceFilter.from) {
      this.priceFilter.to = value;
    }
  }

  formatCurrency(value: number): string {
    return \`$\${value}\`;
  }

  formatPercentage(value: number): string {
    return \`\${value}%\`;
  }

  getDualRangeProgress(): { left: number; width: number } {
    const total = this.priceFilter.max - this.priceFilter.min;
    const left = ((this.priceFilter.from - this.priceFilter.min) / total) * 100;
    const width = ((this.priceFilter.to - this.priceFilter.from) / total) * 100;
    return { left, width };
  }
}`;
  }
}