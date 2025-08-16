import { Component } from '@angular/core';

interface ChartData {
  [key: string]: number[];
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface ChartPoint {
  x: number;
  y: number;
}

type ChartType = 'bar' | 'line' | 'pie' | 'area';
type TimeRange = '7d' | '30d' | '90d' | '1y';
type MetricType = 'sales' | 'users' | 'revenue';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent {
  selectedChart: ChartType = 'bar';
  timeRange: TimeRange = '30d';
  selectedMetric: MetricType = 'sales';

  salesData: ChartData = {
    '7d': [120, 190, 300, 500, 200, 300, 450],
    '30d': [120, 190, 300, 500, 200, 300, 450, 280, 320, 400, 350, 420, 380, 290, 310, 280, 350, 400, 450, 380, 320, 290, 350, 420, 380, 310, 280, 350, 400, 450],
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 500) + 100),
    '1y': Array.from({ length: 365 }, () => Math.floor(Math.random() * 500) + 100)
  };

  userData: ChartData = {
    '7d': [50, 80, 120, 200, 150, 180, 220],
    '30d': [50, 80, 120, 200, 150, 180, 220, 160, 190, 240, 210, 250, 230, 170, 200, 160, 220, 250, 280, 240, 200, 170, 220, 250, 240, 200, 160, 220, 250, 280],
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 300) + 50),
    '1y': Array.from({ length: 365 }, () => Math.floor(Math.random() * 300) + 50)
  };

  revenueData: ChartData = {
    '7d': [1200, 1900, 3000, 5000, 2000, 3000, 4500],
    '30d': [1200, 1900, 3000, 5000, 2000, 3000, 4500, 2800, 3200, 4000, 3500, 4200, 3800, 2900, 3100, 2800, 3500, 4000, 4500, 3800, 3200, 2900, 3500, 4200, 3800, 3100, 2800, 3500, 4000, 4500],
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 5000) + 1000),
    '1y': Array.from({ length: 365 }, () => Math.floor(Math.random() * 5000) + 1000)
  };

  pieData: PieData[] = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' }
  ];

  chartTypes = [
    { key: 'bar' as ChartType, label: 'Bar Chart', icon: '📊' },
    { key: 'line' as ChartType, label: 'Line Chart', icon: '📈' },
    { key: 'area' as ChartType, label: 'Area Chart', icon: '📉' },
    { key: 'pie' as ChartType, label: 'Pie Chart', icon: '🥧' }
  ];

  timeRanges = [
    { key: '7d' as TimeRange, label: '7 Days' },
    { key: '30d' as TimeRange, label: '30 Days' },
    { key: '90d' as TimeRange, label: '90 Days' },
    { key: '1y' as TimeRange, label: '1 Year' }
  ];

  metrics = [
    { key: 'sales' as MetricType, label: 'Sales' },
    { key: 'users' as MetricType, label: 'Users' },
    { key: 'revenue' as MetricType, label: 'Revenue' }
  ];

  getCurrentData(): number[] {
    switch (this.selectedMetric) {
      case 'sales': return this.salesData[this.timeRange];
      case 'users': return this.userData[this.timeRange];
      case 'revenue': return this.revenueData[this.timeRange];
      default: return this.salesData[this.timeRange];
    }
  }

  getMetricLabel(): string {
    switch (this.selectedMetric) {
      case 'sales': return 'Sales';
      case 'users': return 'Users';
      case 'revenue': return 'Revenue';
      default: return 'Sales';
    }
  }

  getMetricUnit(): string {
    switch (this.selectedMetric) {
      case 'sales': return 'units';
      case 'users': return 'users';
      case 'revenue': return '$';
      default: return 'units';
    }
  }

  getTimeRangeLabel(): string {
    switch (this.timeRange) {
      case '7d': return '7 Days';
      case '30d': return '30 Days';
      case '90d': return '90 Days';
      case '1y': return '1 Year';
      default: return '30 Days';
    }
  }

  get currentData(): number[] {
    return this.getCurrentData();
  }

  get total(): number {
    return this.currentData.reduce((sum, value) => sum + value, 0);
  }

  get average(): number {
    return Math.round(this.total / this.currentData.length);
  }

  get max(): number {
    return Math.max(...this.currentData);
  }

  get min(): number {
    return Math.min(...this.currentData);
  }

  getBarChartData(): Array<{value: number, height: number, index: number}> {
    const displayData = this.currentData.slice(-10);
    const maxValue = Math.max(...displayData);
    
    return displayData.map((value, index) => ({
      value,
      height: (value / maxValue) * 200,
      index: index + 1
    }));
  }

  getLineChartPath(): string {
    const displayData = this.currentData.slice(-10);
    const maxValue = Math.max(...displayData);
    
    const points = displayData.map((value, index) => ({
      x: (index / (displayData.length - 1)) * 100,
      y: 100 - ((value / maxValue) * 100)
    }));

    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x}% ${point.y}%`
    ).join(' ');
  }

  getLineChartPoints(): ChartPoint[] {
    const displayData = this.currentData.slice(-10);
    const maxValue = Math.max(...displayData);
    
    return displayData.map((value, index) => ({
      x: (index / (displayData.length - 1)) * 100,
      y: 100 - ((value / maxValue) * 100)
    }));
  }

  getAreaChartPath(): string {
    const linePath = this.getLineChartPath();
    return `${linePath} L 100% 100% L 0% 100% Z`;
  }

  getPieChartPaths(): Array<{path: string, color: string}> {
    const total = this.pieData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return this.pieData.map(item => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;

      const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos((currentAngle - 90) * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin((currentAngle - 90) * Math.PI / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const path = [
        `M 50 50`,
        `L ${x1} ${y1}`,
        `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      return { path, color: item.color };
    });
  }

  setChartType(type: ChartType): void {
    this.selectedChart = type;
  }

  setTimeRange(range: TimeRange): void {
    this.timeRange = range;
  }

  setMetric(metric: MetricType): void {
    this.selectedMetric = metric;
  }

  get htmlCode(): string {
    return `<div class="data-visualization-container">
  <!-- Controls -->
  <div class="visualization-controls">
    <div class="control-group">
      <label class="control-label">Chart Type</label>
      <div class="chart-type-grid">
        <button 
          *ngFor="let chart of chartTypes"
          (click)="setChartType(chart.key)"
          [class.active]="selectedChart === chart.key"
          class="chart-type-button">
          <div class="chart-type-icon">{{ chart.icon }}</div>
          <div class="chart-type-label">{{ chart.label }}</div>
        </button>
      </div>
    </div>

    <div class="control-group">
      <label class="control-label">Metric</label>
      <select 
        [(ngModel)]="selectedMetric" 
        class="metric-select">
        <option value="sales">Sales</option>
        <option value="users">Users</option>
        <option value="revenue">Revenue</option>
      </select>
    </div>

    <div class="control-group">
      <label class="control-label">Time Range</label>
      <div class="time-range-grid">
        <button 
          *ngFor="let range of timeRanges"
          (click)="setTimeRange(range.key)"
          [class.active]="timeRange === range.key"
          class="time-range-button">
          {{ range.label }}
        </button>
      </div>
    </div>
  </div>

  <!-- Chart Display -->
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">
        {{ getMetricLabel() }} - {{ getTimeRangeLabel() }}
      </h3>
      <div class="chart-info">
        {{ selectedChart === 'pie' ? 'Device Distribution' : currentData.length + ' data points' }}
      </div>
    </div>

    <div class="chart-area">
      <!-- Bar Chart -->
      <div *ngIf="selectedChart === 'bar'" class="bar-chart">
        <div 
          *ngFor="let bar of getBarChartData()" 
          class="bar-item"
          [title]="getMetricLabel() + ': ' + bar.value + ' ' + getMetricUnit()">
          <div 
            class="bar" 
            [style.height.px]="bar.height">
          </div>
          <span class="bar-label">{{ bar.index }}</span>
        </div>
      </div>

      <!-- Line Chart -->
      <div *ngIf="selectedChart === 'line'" class="line-chart">
        <svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            [attr.d]="getLineChartPath()"
            fill="none"
            stroke="var(--primary-600)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <circle
            *ngFor="let point of getLineChartPoints()"
            [attr.cx]="point.x + '%'"
            [attr.cy]="point.y + '%'"
            r="2"
            fill="var(--primary-600)"
            class="chart-point" />
        </svg>
      </div>

      <!-- Area Chart -->
      <div *ngIf="selectedChart === 'area'" class="area-chart">
        <svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="var(--primary-600)" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="var(--primary-600)" stop-opacity="0.1"/>
            </linearGradient>
          </defs>
          <path
            [attr.d]="getAreaChartPath()"
            fill="url(#areaGradient)"
            stroke="var(--primary-600)"
            stroke-width="1" />
        </svg>
      </div>

      <!-- Pie Chart -->
      <div *ngIf="selectedChart === 'pie'" class="pie-chart">
        <svg class="pie-svg" viewBox="0 0 100 100">
          <path
            *ngFor="let slice of getPieChartPaths()"
            [attr.d]="slice.path"
            [attr.fill]="slice.color"
            class="pie-slice" />
          <circle cx="50" cy="50" r="15" fill="var(--bg-primary)"/>
        </svg>
      </div>
    </div>

    <!-- Stats -->
    <div *ngIf="selectedChart !== 'pie'" class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ total.toLocaleString() }}</div>
        <div class="stat-label">Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ average.toLocaleString() }}</div>
        <div class="stat-label">Average</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ max.toLocaleString() }}</div>
        <div class="stat-label">Max</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ min.toLocaleString() }}</div>
        <div class="stat-label">Min</div>
      </div>
    </div>

    <!-- Pie Legend -->
    <div *ngIf="selectedChart === 'pie'" class="pie-legend">
      <div 
        *ngFor="let item of pieData" 
        class="legend-item">
        <div 
          class="legend-color" 
          [style.background-color]="item.color">
        </div>
        <span class="legend-text">{{ item.name }} ({{ item.value }}%)</span>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Data Visualization Container */
.data-visualization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

/* Controls */
.visualization-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
  padding: var(--spacing-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-xl);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.control-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

/* Chart Type Grid */
.chart-type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-1);
}

.chart-type-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    border-color: var(--primary-300);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }

  &.active {
    background: var(--primary-50);
    border-color: var(--primary-500);
    color: var(--primary-700);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
      color: var(--primary-300);
    }
  }
}

.chart-type-icon {
  font-size: var(--font-size-lg);
}

.chart-type-label {
  font-size: var(--font-size-xs);
  font-weight: 500;
}

/* Metric Select */
.metric-select {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-500);
  }
}

/* Time Range Grid */
.time-range-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-1);
}

.time-range-button {
  padding: var(--spacing-2);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gray-50);
    border-color: var(--primary-300);

    @media (prefers-color-scheme: dark) {
      background: var(--gray-800);
    }
  }

  &.active {
    background: var(--primary-50);
    border-color: var(--primary-500);
    color: var(--primary-700);

    @media (prefers-color-scheme: dark) {
      background: var(--primary-900);
      color: var(--primary-300);
    }
  }
}

/* Chart Container */
.chart-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--border-secondary);
}

.chart-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.chart-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Chart Area */
.chart-area {
  height: 300px;
  margin-bottom: var(--spacing-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bar Chart */
.bar-chart {
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: var(--spacing-1);
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar {
  width: 100%;
  background: var(--primary-600);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  cursor: pointer;
  transition: all var(--transition-normal);
  min-height: 4px;

  &:hover {
    background: var(--primary-700);
  }
}

.bar-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: var(--spacing-1);
}

/* Line & Area Charts */
.line-chart,
.area-chart {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.chart-point {
  cursor: pointer;
  transition: r var(--transition-normal);

  &:hover {
    r: 3;
  }
}

/* Pie Chart */
.pie-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.pie-svg {
  width: 200px;
  height: 200px;
}

.pie-slice {
  cursor: pointer;
  transition: opacity var(--transition-normal);

  &:hover {
    opacity: 0.8;
  }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--border-secondary);
}

.stat-card {
  text-align: center;
  padding: var(--spacing-3);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-secondary);
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* Pie Legend */
.pie-legend {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .data-visualization-container {
    padding: var(--spacing-4);
  }

  .visualization-controls {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }

  .chart-type-grid,
  .time-range-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2);
  }

  .chart-container {
    padding: var(--spacing-4);
  }

  .chart-area {
    height: 250px;
    padding: var(--spacing-2);
  }

  .pie-legend {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2);
  }
}

/* Accessibility */
.chart-type-button:focus-visible,
.time-range-button:focus-visible,
.metric-select:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .chart-container,
  .stat-card {
    border-width: 2px;
  }
  
  .bar:hover,
  .chart-point:hover,
  .pie-slice:hover {
    outline: 2px solid var(--text-primary);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .bar,
  .chart-point,
  .pie-slice,
  .chart-type-button,
  .time-range-button {
    transition: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface ChartData {
  [key: string]: number[];
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface ChartPoint {
  x: number;
  y: number;
}

type ChartType = 'bar' | 'line' | 'pie' | 'area';
type TimeRange = '7d' | '30d' | '90d' | '1y';
type MetricType = 'sales' | 'users' | 'revenue';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent {
  selectedChart: ChartType = 'bar';
  timeRange: TimeRange = '30d';
  selectedMetric: MetricType = 'sales';

  salesData: ChartData = {
    '7d': [120, 190, 300, 500, 200, 300, 450],
    '30d': [120, 190, 300, 500, 200, 300, 450, 280, 320, 400, 350, 420, 380, 290, 310, 280, 350, 400, 450, 380, 320, 290, 350, 420, 380, 310, 280, 350, 400, 450],
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 500) + 100),
    '1y': Array.from({ length: 365 }, () => Math.floor(Math.random() * 500) + 100)
  };

  userData: ChartData = {
    '7d': [50, 80, 120, 200, 150, 180, 220],
    '30d': [50, 80, 120, 200, 150, 180, 220, 160, 190, 240, 210, 250, 230, 170, 200, 160, 220, 250, 280, 240, 200, 170, 220, 250, 240, 200, 160, 220, 250, 280],
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 300) + 50),
    '1y': Array.from({ length: 365 }, () => Math.floor(Math.random() * 300) + 50)
  };

  revenueData: ChartData = {
    '7d': [1200, 1900, 3000, 5000, 2000, 3000, 4500],
    '30d': [1200, 1900, 3000, 5000, 2000, 3000, 4500, 2800, 3200, 4000, 3500, 4200, 3800, 2900, 3100, 2800, 3500, 4000, 4500, 3800, 3200, 2900, 3500, 4200, 3800, 3100, 2800, 3500, 4000, 4500],
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 5000) + 1000),
    '1y': Array.from({ length: 365 }, () => Math.floor(Math.random() * 5000) + 1000)
  };

  pieData: PieData[] = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' }
  ];

  chartTypes = [
    { key: 'bar' as ChartType, label: 'Bar Chart', icon: '📊' },
    { key: 'line' as ChartType, label: 'Line Chart', icon: '📈' },
    { key: 'area' as ChartType, label: 'Area Chart', icon: '📉' },
    { key: 'pie' as ChartType, label: 'Pie Chart', icon: '🥧' }
  ];

  timeRanges = [
    { key: '7d' as TimeRange, label: '7 Days' },
    { key: '30d' as TimeRange, label: '30 Days' },
    { key: '90d' as TimeRange, label: '90 Days' },
    { key: '1y' as TimeRange, label: '1 Year' }
  ];

  getCurrentData(): number[] {
    switch (this.selectedMetric) {
      case 'sales': return this.salesData[this.timeRange];
      case 'users': return this.userData[this.timeRange];
      case 'revenue': return this.revenueData[this.timeRange];
      default: return this.salesData[this.timeRange];
    }
  }

  getMetricLabel(): string {
    switch (this.selectedMetric) {
      case 'sales': return 'Sales';
      case 'users': return 'Users'; 
      case 'revenue': return 'Revenue';
      default: return 'Sales';
    }
  }

  getMetricUnit(): string {
    switch (this.selectedMetric) {
      case 'sales': return 'units';
      case 'users': return 'users';
      case 'revenue': return '$';
      default: return 'units';
    }
  }

  get currentData(): number[] {
    return this.getCurrentData();
  }

  get total(): number {
    return this.currentData.reduce((sum, value) => sum + value, 0);
  }

  get average(): number {
    return Math.round(this.total / this.currentData.length);
  }

  get max(): number {
    return Math.max(...this.currentData);
  }

  get min(): number {
    return Math.min(...this.currentData);
  }

  getBarChartData(): Array<{value: number, height: number, index: number}> {
    const displayData = this.currentData.slice(-10);
    const maxValue = Math.max(...displayData);
    
    return displayData.map((value, index) => ({
      value,
      height: (value / maxValue) * 200,
      index: index + 1
    }));
  }

  getLineChartPath(): string {
    const displayData = this.currentData.slice(-10);
    const maxValue = Math.max(...displayData);
    
    const points = displayData.map((value, index) => ({
      x: (index / (displayData.length - 1)) * 100,
      y: 100 - ((value / maxValue) * 100)
    }));

    return points.map((point, index) => 
      \`\${index === 0 ? 'M' : 'L'} \${point.x}% \${point.y}%\`
    ).join(' ');
  }

  getLineChartPoints(): ChartPoint[] {
    const displayData = this.currentData.slice(-10);
    const maxValue = Math.max(...displayData);
    
    return displayData.map((value, index) => ({
      x: (index / (displayData.length - 1)) * 100,
      y: 100 - ((value / maxValue) * 100)
    }));
  }

  getAreaChartPath(): string {
    const linePath = this.getLineChartPath();
    return \`\${linePath} L 100% 100% L 0% 100% Z\`;
  }

  getPieChartPaths(): Array<{path: string, color: string}> {
    const total = this.pieData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return this.pieData.map(item => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;

      const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos((currentAngle - 90) * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin((currentAngle - 90) * Math.PI / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const path = [
        \`M 50 50\`,
        \`L \${x1} \${y1}\`,
        \`A 40 40 0 \${largeArcFlag} 1 \${x2} \${y2}\`,
        'Z'
      ].join(' ');

      return { path, color: item.color };
    });
  }

  setChartType(type: ChartType): void {
    this.selectedChart = type;
  }

  setTimeRange(range: TimeRange): void {
    this.timeRange = range;
  }

  setMetric(metric: MetricType): void {
    this.selectedMetric = metric;
  }
}`;
  }
}