import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  statsCards: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,592',
      change: '+12.5%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      title: 'Active Users',
      value: '1,429',
      change: '+8.2%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: '📈'
    },
    {
      title: 'Support Tickets',
      value: '89',
      change: '+5.4%',
      changeType: 'neutral',
      icon: '🎫'
    }
  ];

  chartData: ChartData[] = [
    { label: 'Desktop', value: 65, color: '#3b82f6' },
    { label: 'Mobile', value: 25, color: '#10b981' },
    { label: 'Tablet', value: 10, color: '#f59e0b' }
  ];

  recentActivity: Activity[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created new project "Website Redesign"',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      user: 'Sarah Johnson',
      action: 'Updated user permissions',
      timestamp: '5 minutes ago',
      status: 'warning'
    },
    {
      id: '3',
      user: 'Mike Chen',
      action: 'Failed login attempt detected',
      timestamp: '8 minutes ago',
      status: 'error'
    },
    {
      id: '4',
      user: 'Emily Davis',
      action: 'Completed task "UI Review"',
      timestamp: '12 minutes ago',
      status: 'success'
    },
    {
      id: '5',
      user: 'Alex Rodriguez',
      action: 'Uploaded new document',
      timestamp: '15 minutes ago',
      status: 'success'
    }
  ];

  getActivityIcon(status: string): string {
    const icons = {
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return icons[status as keyof typeof icons] || '📄';
  }

  getChartMaxValue(): number {
    return Math.max(...this.chartData.map(item => item.value));
  }

  get htmlCode(): string {
    return `<div class="dashboard-pattern">
  <div class="pattern-header">
    <h1 class="pattern-title">
      <span class="pattern-icon">📊</span>
      Dashboard Pattern
    </h1>
    <p class="pattern-description">
      A comprehensive dashboard layout with stats, charts, and activity feeds.
    </p>
  </div>

  <div class="demo-container">
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div *ngFor="let stat of statsCards" class="stat-card">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-content">
          <h3 class="stat-title">{{ stat.title }}</h3>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-change" [class]="'change-' + stat.changeType">
            {{ stat.change }}
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Activity Row -->
    <div class="dashboard-row">
      <!-- Chart Section -->
      <div class="chart-section">
        <h3 class="section-title">Traffic Sources</h3>
        <div class="chart-container">
          <div class="chart-bars">
            <div *ngFor="let item of chartData" class="chart-bar">
              <div class="bar-container">
                <div class="bar-fill" 
                     [style.height.%]="(item.value / getChartMaxValue()) * 100"
                     [style.background-color]="item.color">
                </div>
              </div>
              <div class="bar-label">{{ item.label }}</div>
              <div class="bar-value">{{ item.value }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="activity-section">
        <h3 class="section-title">Recent Activity</h3>
        <div class="activity-feed">
          <div *ngFor="let activity of recentActivity" class="activity-item">
            <div class="activity-icon">
              {{ getActivityIcon(activity.status) }}
            </div>
            <div class="activity-content">
              <div class="activity-user">{{ activity.user }}</div>
              <div class="activity-action">{{ activity.action }}</div>
              <div class="activity-timestamp">{{ activity.timestamp }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `.dashboard-pattern {
  .pattern-header {
    text-align: center;
    margin-bottom: var(--spacing-8);
  }

  .demo-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-8);
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-fast);

    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
  }

  .stat-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .stat-content {
    flex: 1;
  }

  .stat-title {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin: 0 0 var(--spacing-1) 0;
    font-weight: 500;
  }

  .stat-value {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-1);
  }

  .stat-change {
    font-size: var(--font-size-sm);
    font-weight: 600;

    &.change-positive {
      color: var(--green-600);
    }

    &.change-negative {
      color: var(--red-600);
    }

    &.change-neutral {
      color: var(--gray-600);
    }
  }

  .dashboard-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8);
    margin-bottom: var(--spacing-8);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-6);
    }
  }

  .chart-section,
  .activity-section {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-sm);
  }

  .section-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-4) 0;
  }

  .chart-container {
    height: 200px;
    display: flex;
    align-items: end;
    justify-content: center;
  }

  .chart-bars {
    display: flex;
    align-items: end;
    gap: var(--spacing-4);
    height: 100%;
    width: 100%;
    max-width: 300px;
  }

  .chart-bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .bar-container {
    flex: 1;
    width: 100%;
    max-width: 60px;
    display: flex;
    align-items: end;
    margin-bottom: var(--spacing-2);
  }

  .bar-fill {
    width: 100%;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    transition: height var(--transition-fast);
    min-height: 20px;
  }

  .bar-label {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-1);
    text-align: center;
  }

  .bar-value {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    font-weight: 600;
    text-align: center;
  }

  .activity-feed {
    max-height: 300px;
    overflow-y: auto;
  }

  .activity-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-3);
    padding: var(--spacing-3) 0;
    border-bottom: 1px solid var(--border-secondary);

    &:last-child {
      border-bottom: none;
    }
  }

  .activity-icon {
    font-size: var(--font-size-lg);
    line-height: 1;
    margin-top: var(--spacing-1);
  }

  .activity-content {
    flex: 1;
    min-width: 0;
  }

  .activity-user {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-05);
  }

  .activity-action {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-05);
  }

  .activity-timestamp {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .stat-card {
    padding: var(--spacing-4);
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-value {
    font-size: var(--font-size-xl);
  }
}

@media (prefers-color-scheme: dark) {
  .stat-card,
  .chart-section,
  .activity-section {
    background: var(--gray-800);
    border-color: var(--gray-700);
  }

  .stat-change {
    &.change-positive {
      color: var(--green-400);
    }

    &.change-negative {
      color: var(--red-400);
    }

    &.change-neutral {
      color: var(--gray-400);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  statsCards: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,592',
      change: '+12.5%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      title: 'Active Users',
      value: '1,429',
      change: '+8.2%',
      changeType: 'positive',
      icon: '👥'
    }
  ];

  chartData: ChartData[] = [
    { label: 'Desktop', value: 65, color: '#3b82f6' },
    { label: 'Mobile', value: 25, color: '#10b981' },
    { label: 'Tablet', value: 10, color: '#f59e0b' }
  ];

  recentActivity: Activity[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created new project "Website Redesign"',
      timestamp: '2 minutes ago',
      status: 'success'
    }
  ];

  getActivityIcon(status: string): string {
    const icons = {
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return icons[status as keyof typeof icons] || '📄';
  }

  getChartMaxValue(): number {
    return Math.max(...this.chartData.map(item => item.value));
  }
}`;
  }
}