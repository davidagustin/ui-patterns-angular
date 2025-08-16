import { Component } from '@angular/core';

interface HSL {
  h: number;
  s: number;
  l: number;
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  selectedColor = '#3b82f6';
  hsl: HSL = { h: 217, s: 91, l: 60 };
  presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6',
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#6b7280', '#374151', '#111827', '#000000'
  ];
  customColors: string[] = [];
  isPickerOpen = false;

  hexToHsl(hex: string): HSL {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  onColorChange(color: string): void {
    this.selectedColor = color;
    this.hsl = this.hexToHsl(color);
  }

  onHslChange(newHsl: Partial<HSL>): void {
    this.hsl = { ...this.hsl, ...newHsl };
    this.selectedColor = this.hslToHex(this.hsl.h, this.hsl.s, this.hsl.l);
  }

  addToCustomColors(): void {
    if (!this.customColors.includes(this.selectedColor)) {
      this.customColors = [this.selectedColor, ...this.customColors.slice(0, 9)];
    }
  }

  clearCustomColors(): void {
    this.customColors = [];
  }

  togglePicker(): void {
    this.isPickerOpen = !this.isPickerOpen;
  }

  getContrastColor(color: string): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }

  get htmlCode(): string {
    return `<div class="color-picker-container">
  <!-- Color Preview -->
  <div class="color-preview-section">
    <div class="color-preview" 
         [style.backgroundColor]="selectedColor"
         (click)="togglePicker()"
         title="Click to open color picker">
    </div>
    
    <div class="color-info">
      <div class="color-label" [style.color]="selectedColor">Current Color</div>
      <div class="color-hex">{{ selectedColor.toUpperCase() }}</div>
    </div>
  </div>

  <!-- Color Input -->
  <div class="color-input-group">
    <input type="text" 
           [(ngModel)]="selectedColor"
           (input)="onColorChange(selectedColor)"
           class="color-text-input"
           placeholder="#000000">
    <input type="color" 
           [(ngModel)]="selectedColor"
           (input)="onColorChange(selectedColor)"
           class="color-native-input">
  </div>

  <!-- Advanced Picker Panel -->
  <div *ngIf="isPickerOpen" class="color-picker-panel">
    <!-- HSL Controls -->
    <div class="hsl-controls">
      <div class="hsl-control">
        <label class="hsl-label">Hue: {{ hsl.h }}°</label>
        <input type="range" 
               min="0" max="360" 
               [value]="hsl.h"
               (input)="onHslChange({ h: +$any($event.target).value })"
               class="hsl-slider slider-hue">
      </div>
      
      <div class="hsl-control">
        <label class="hsl-label">Saturation: {{ hsl.s }}%</label>
        <input type="range" 
               min="0" max="100" 
               [value]="hsl.s"
               (input)="onHslChange({ s: +$any($event.target).value })"
               class="hsl-slider">
      </div>
      
      <div class="hsl-control">
        <label class="hsl-label">Lightness: {{ hsl.l }}%</label>
        <input type="range" 
               min="0" max="100" 
               [value]="hsl.l"
               (input)="onHslChange({ l: +$any($event.target).value })"
               class="hsl-slider">
      </div>
    </div>

    <button (click)="addToCustomColors()" class="add-custom-btn">
      Add to Custom Colors
    </button>
  </div>

  <!-- Preset Colors -->
  <div class="color-section">
    <h3 class="section-title">Preset Colors</h3>
    <div class="color-grid">
      <button *ngFor="let color of presetColors"
              class="color-swatch"
              [style.backgroundColor]="color"
              (click)="onColorChange(color)"
              [title]="color">
      </button>
    </div>
  </div>

  <!-- Custom Colors -->
  <div *ngIf="customColors.length > 0" class="color-section">
    <div class="section-header">
      <h3 class="section-title">Custom Colors</h3>
      <button (click)="clearCustomColors()" class="clear-btn">Clear All</button>
    </div>
    <div class="color-grid">
      <button *ngFor="let color of customColors"
              class="color-swatch"
              [style.backgroundColor]="color"
              (click)="onColorChange(color)"
              [title]="color">
      </button>
    </div>
  </div>

  <!-- Color Information -->
  <div class="color-info-panel">
    <h3 class="section-title">Color Information</h3>
    <div class="color-info-grid">
      <div class="color-info-item">
        <div class="color-info-label">HEX</div>
        <div class="color-info-value">{{ selectedColor.toUpperCase() }}</div>
      </div>
      <div class="color-info-item">
        <div class="color-info-label">HSL</div>
        <div class="color-info-value">{{ hsl.h }}°, {{ hsl.s }}%, {{ hsl.l }}%</div>
      </div>
      <div class="color-info-item">
        <div class="color-info-label">Contrast</div>
        <div class="contrast-sample"
             [style.backgroundColor]="selectedColor"
             [style.color]="getContrastColor(selectedColor)">
          Sample Text
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Color Picker Component */
.color-picker-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  position: relative;
}

/* Color Preview Section */
.color-preview-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.color-preview {
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius-xl);
  border: 2px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    transform: scale(1.05);
    border-color: var(--gray-400);
  }

  &:active {
    transform: scale(0.95);
  }
}

.color-info {
  flex: 1;
}

.color-label {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-1);
}

.color-hex {
  font-family: monospace;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Color Input Group */
.color-input-group {
  display: flex;
  gap: var(--spacing-2);
}

.color-text-input {
  flex: 1;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-family: monospace;
  font-size: var(--font-size-sm);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }
}

.color-native-input {
  width: 3rem;
  height: 2.5rem;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  background: none;
}

/* Color Picker Panel */
.color-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-xl);
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* HSL Controls */
.hsl-controls {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.hsl-control {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.hsl-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.hsl-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 1rem;
  border-radius: var(--radius-md);
  outline: none;
  cursor: pointer;
  background: var(--gray-200);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 2px solid var(--primary-500);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }

  &::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 2px solid var(--primary-500);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }
}

.slider-hue {
  background: linear-gradient(
    to right,
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}

/* Color Grid */
.color-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: var(--spacing-2);
}

.color-swatch {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  border: 2px solid var(--border-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);

  &:hover {
    border-color: var(--gray-400);
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Color Sections */
.color-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.clear-btn {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-normal);

  &:hover {
    color: var(--text-primary);
  }
}

/* Add Custom Button */
.add-custom-btn {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--primary-600);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-normal);

  &:hover {
    background: var(--primary-700);
  }

  &:active {
    background: var(--primary-800);
  }
}

/* Color Info Panel */
.color-info-panel {
  background: var(--gray-50);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);

  @media (prefers-color-scheme: dark) {
    background: var(--gray-900);
  }
}

.color-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  font-size: var(--font-size-xs);
}

.color-info-item {
  display: flex;
  flex-direction: column;
}

.color-info-label {
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: var(--spacing-1);
}

.color-info-value {
  font-family: monospace;
  font-weight: 500;
  color: var(--text-primary);
}

.contrast-sample {
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  text-align: center;
}

/* Responsive */
@media (max-width: 640px) {
  .color-grid {
    grid-template-columns: repeat(8, 1fr);
    gap: var(--spacing-3);
  }
  
  .color-swatch {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .color-info-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface HSL {
  h: number;
  s: number;
  l: number;
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  selectedColor = '#3b82f6';
  hsl: HSL = { h: 217, s: 91, l: 60 };
  presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6',
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#6b7280', '#374151', '#111827', '#000000'
  ];
  customColors: string[] = [];
  isPickerOpen = false;

  hexToHsl(hex: string): HSL {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;
  }

  onColorChange(color: string): void {
    this.selectedColor = color;
    this.hsl = this.hexToHsl(color);
  }

  onHslChange(newHsl: Partial<HSL>): void {
    this.hsl = { ...this.hsl, ...newHsl };
    this.selectedColor = this.hslToHex(this.hsl.h, this.hsl.s, this.hsl.l);
  }

  addToCustomColors(): void {
    if (!this.customColors.includes(this.selectedColor)) {
      this.customColors = [this.selectedColor, ...this.customColors.slice(0, 9)];
    }
  }

  clearCustomColors(): void {
    this.customColors = [];
  }

  togglePicker(): void {
    this.isPickerOpen = !this.isPickerOpen;
  }

  getContrastColor(color: string): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}`;
  }
}