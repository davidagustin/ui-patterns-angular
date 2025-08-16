import { Component } from '@angular/core';

interface Pattern {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
  route: string;
}

@Component({
  selector: 'app-patterns-list',
  templateUrl: './patterns-list.component.html',
  styleUrls: ['./patterns-list.component.scss']
})
export class PatternsListComponent {
  searchQuery = '';
  selectedCategory = 'All';
  selectedDifficulty = 'All';

  categories = [
    'All',
    'Navigation',
    'Data Display',
    'Forms & Inputs',
    'Feedback',
    'Layout',
    'Interactive',
    'Media',
    'Content'
  ];

  difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  patterns: Pattern[] = [
    {
      id: 'accordion-menu',
      name: 'Accordion Menu',
      title: 'Accordion Menu',
      description: 'Expandable sections for organizing content hierarchically',
      category: 'Navigation',
      icon: '🎢',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['menu', 'expandable', 'hierarchy'],
      route: 'accordion-menu'
    },
    {
      id: 'adaptable-view',
      name: 'Adaptable View',
      title: 'Adaptable View',
      description: 'Flexible layouts that adapt to content and screen size',
      category: 'Layout',
      icon: '📱',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['responsive', 'layout', 'adaptive'],
      route: 'adaptable-view'
    },
    {
      id: 'alternating-rows',
      name: 'Alternating Rows',
      title: 'Alternating Rows',
      description: 'Table rows with alternating colors for better readability',
      category: 'Data Display',
      icon: '📊',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['table', 'zebra', 'readability'],
      route: 'alternating-rows'
    },
    {
      id: 'article-list',
      name: 'Article List',
      title: 'Article List',
      description: 'Structured display of articles with metadata',
      category: 'Content',
      icon: '📄',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['articles', 'list', 'content'],
      route: 'article-list'
    },
    {
      id: 'autocomplete',
      name: 'Autocomplete',
      title: 'Autocomplete',
      description: 'Search input with real-time suggestions',
      category: 'Forms & Inputs',
      icon: '🔍',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['search', 'suggestions', 'input'],
      route: 'autocomplete'
    },
    {
      id: 'autosave',
      name: 'Autosave',
      title: 'Autosave',
      description: 'Automatic saving of user input with status feedback',
      category: 'Forms & Inputs',
      icon: '💾',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['save', 'automatic', 'feedback'],
      route: 'autosave'
    },
    {
      id: 'bottom-navigation',
      name: 'Bottom Navigation',
      title: 'Bottom Navigation',
      description: 'Mobile-friendly navigation at the bottom of the screen',
      category: 'Navigation',
      icon: '📱',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['mobile', 'navigation', 'bottom'],
      route: 'bottom-navigation'
    },
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      title: 'Breadcrumbs',
      description: 'Hierarchical navigation showing current location',
      category: 'Navigation',
      icon: '🍞',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['navigation', 'hierarchy', 'path'],
      route: 'breadcrumbs'
    },
    {
      id: 'calendar-picker',
      name: 'Calendar Picker',
      title: 'Calendar Picker',
      description: 'Interactive calendar for date selection',
      category: 'Forms & Inputs',
      icon: '📅',
      difficulty: 'Hard',
      status: 'completed',
      tags: ['calendar', 'date', 'picker'],
      route: 'calendar-picker'
    },
    {
      id: 'captcha',
      name: 'CAPTCHA',
      title: 'CAPTCHA',
      description: 'Security verification to prevent automated submissions',
      category: 'Forms & Inputs',
      icon: '🔐',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['security', 'verification', 'bot-protection'],
      route: 'captcha'
    },
    {
      id: 'cards',
      name: 'Cards',
      title: 'Cards',
      description: 'Flexible content containers with various layouts',
      category: 'Layout',
      icon: '🃏',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['cards', 'container', 'layout'],
      route: 'cards'
    },
    {
      id: 'carousel',
      name: 'Carousel',
      title: 'Carousel',
      description: 'Image and content slider with navigation controls',
      category: 'Media',
      icon: '🎠',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['slider', 'images', 'navigation'],
      route: 'carousel'
    },
    {
      id: 'categorization',
      name: 'Categorization',
      title: 'Categorization',
      description: 'Organize and filter content by categories',
      category: 'Data Display',
      icon: '🗂️',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['categories', 'filter', 'organization'],
      route: 'categorization'
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      title: 'Color Picker',
      description: 'Interactive color selection interface',
      category: 'Forms & Inputs',
      icon: '🎨',
      difficulty: 'Hard',
      status: 'completed',
      tags: ['color', 'picker', 'interface'],
      route: 'color-picker'
    },
    {
      id: 'completeness-meter',
      name: 'Completeness Meter',
      title: 'Completeness Meter',
      description: 'Visual progress indicator for multi-step processes',
      category: 'Feedback',
      icon: '📊',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['progress', 'meter', 'completion'],
      route: 'completeness-meter'
    },
    {
      id: 'continuous-scrolling',
      name: 'Continuous Scrolling',
      title: 'Continuous Scrolling',
      description: 'Infinite scroll with dynamic content loading',
      category: 'Interactive',
      icon: '📜',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['scroll', 'infinite', 'loading'],
      route: 'continuous-scrolling'
    },
    {
      id: 'copy-box',
      name: 'Copy Box',
      title: 'Copy Box',
      description: 'Easy-to-use copy functionality for code and text',
      category: 'Interactive',
      icon: '📋',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['copy', 'clipboard', 'code'],
      route: 'copy-box'
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      title: 'Dashboard',
      description: 'Comprehensive data visualization and monitoring interface',
      category: 'Layout',
      icon: '📊',
      difficulty: 'Hard',
      status: 'completed',
      tags: ['dashboard', 'analytics', 'monitoring'],
      route: 'dashboard'
    },
    {
      id: 'data-grid',
      name: 'Data Grid',
      title: 'Data Grid',
      description: 'Advanced table with sorting, filtering, and pagination',
      category: 'Data Display',
      icon: '📋',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['table', 'grid', 'data'],
      route: 'data-grid'
    },
    {
      id: 'dropdown-menu',
      name: 'Dropdown Menu',
      title: 'Dropdown Menu',
      description: 'Contextual menu with nested options',
      category: 'Navigation',
      icon: '📋',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['menu', 'dropdown', 'navigation'],
      route: 'dropdown-menu'
    },
    {
      id: 'file-upload',
      name: 'File Upload',
      title: 'File Upload',
      description: 'Drag and drop file upload with progress feedback',
      category: 'Forms & Inputs',
      icon: '📁',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['upload', 'file', 'drag-drop'],
      route: 'file-upload'
    },
    {
      id: 'forms',
      name: 'Forms',
      title: 'Forms',
      description: 'Comprehensive form patterns with validation',
      category: 'Forms & Inputs',
      icon: '📝',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['forms', 'validation', 'input'],
      route: 'forms'
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      title: 'Image Gallery',
      description: 'Responsive image gallery with lightbox and filtering',
      category: 'Media',
      icon: '🖼️',
      difficulty: 'Hard',
      status: 'completed',
      tags: ['gallery', 'images', 'lightbox', 'filter'],
      route: 'image-gallery'
    },
    {
      id: 'modal',
      name: 'Modal',
      title: 'Modal',
      description: 'Overlay dialogs for focused interactions',
      category: 'Feedback',
      icon: '🪟',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['modal', 'dialog', 'overlay'],
      route: 'modal'
    },
    {
      id: 'navbar',
      name: 'Navbar',
      title: 'Navbar',
      description: 'Top navigation bar with responsive design',
      category: 'Navigation',
      icon: '🧭',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['navigation', 'navbar', 'header'],
      route: 'navbar'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      title: 'Notifications',
      description: 'Toast notifications and alert systems',
      category: 'Feedback',
      icon: '🔔',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['notifications', 'alerts', 'toast'],
      route: 'notifications'
    },
    {
      id: 'pagination',
      name: 'Pagination',
      title: 'Pagination',
      description: 'Page navigation for large datasets',
      category: 'Navigation',
      icon: '📄',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['pagination', 'navigation', 'pages'],
      route: 'pagination'
    },
    {
      id: 'range-slider',
      name: 'Range Slider',
      title: 'Range Slider',
      description: 'Interactive slider for range selection',
      category: 'Forms & Inputs',
      icon: '🎚️',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['slider', 'range', 'input'],
      route: 'range-slider'
    },
    {
      id: 'search',
      name: 'Search',
      title: 'Search',
      description: 'Advanced search with filters and suggestions',
      category: 'Forms & Inputs',
      icon: '🔍',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['search', 'filters', 'suggestions'],
      route: 'search'
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      title: 'Sidebar',
      description: 'Collapsible side navigation panel',
      category: 'Navigation',
      icon: '📑',
      difficulty: 'Medium',
      status: 'completed',
      tags: ['sidebar', 'navigation', 'panel'],
      route: 'sidebar'
    },
    {
      id: 'tabs',
      name: 'Tabs',
      title: 'Tabs',
      description: 'Tabbed interface for organizing content',
      category: 'Navigation',
      icon: '📑',
      difficulty: 'Easy',
      status: 'completed',
      tags: ['tabs', 'navigation', 'content'],
      route: 'tabs'
    }
  ];

  get filteredPatterns(): Pattern[] {
    return this.patterns.filter(pattern => {
      const matchesSearch = pattern.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           pattern.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           pattern.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      const matchesCategory = this.selectedCategory === 'All' || pattern.category === this.selectedCategory;
      const matchesDifficulty = this.selectedDifficulty === 'All' || pattern.difficulty === this.selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  get patternsByCategory(): { [key: string]: Pattern[] } {
    const grouped: { [key: string]: Pattern[] } = {};
    
    this.filteredPatterns.forEach(pattern => {
      if (!grouped[pattern.category]) {
        grouped[pattern.category] = [];
      }
      grouped[pattern.category].push(pattern);
    });
    
    return grouped;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.selectedDifficulty = 'All';
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Navigation': '#3b82f6',
      'Data Display': '#8b5cf6',
      'Forms & Inputs': '#10b981',
      'Feedback': '#f59e0b',
      'Layout': '#ec4899',
      'Interactive': '#06b6d4',
      'Media': '#84cc16',
      'Content': '#f97316'
    };
    return colors[category] || '#6b7280';
  }

  filterPatterns(): void {
    // This method is called by the template but filtering is handled by the getter
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  getCompletedCount(): number {
    return this.patterns.filter(p => p.status === 'completed').length;
  }

  getInProgressCount(): number {
    return this.patterns.filter(p => p.status === 'in-progress').length;
  }
}