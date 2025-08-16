import { Component } from '@angular/core';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful?: number;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  searchTerm = '';
  selectedCategory = 'all';
  expandedItems = new Set<string>();
  
  categories: FAQCategory[] = [
    { id: 'all', name: 'All Questions', icon: '❓', count: 0 },
    { id: 'general', name: 'General', icon: '🌐', count: 0 },
    { id: 'technical', name: 'Technical', icon: '⚙️', count: 0 },
    { id: 'billing', name: 'Billing', icon: '💳', count: 0 },
    { id: 'support', name: 'Support', icon: '🛟', count: 0 }
  ];

  faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I get started with this platform?',
      answer: 'Getting started is easy! First, create an account by clicking the sign-up button. Then, complete your profile setup and explore our interactive tutorials. Our onboarding guide will walk you through the key features step by step.',
      category: 'general',
      tags: ['getting-started', 'onboarding', 'account'],
      helpful: 42
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments. All transactions are processed securely through our encrypted payment gateway.',
      category: 'billing',
      tags: ['payment', 'credit-card', 'paypal', 'security'],
      helpful: 38
    },
    {
      id: '3',
      question: 'How can I integrate the API with my application?',
      answer: 'Our REST API is well-documented and includes SDKs for popular programming languages. Start by obtaining your API key from the developer dashboard, then refer to our comprehensive documentation with code examples and best practices.',
      category: 'technical',
      tags: ['api', 'integration', 'documentation', 'sdk'],
      helpful: 55
    },
    {
      id: '4',
      question: 'What should I do if I encounter a technical issue?',
      answer: 'For technical issues, first check our status page and troubleshooting guide. If the problem persists, contact our support team through the help center, live chat, or email. Include detailed information about the issue for faster resolution.',
      category: 'support',
      tags: ['troubleshooting', 'technical-support', 'help'],
      helpful: 29
    },
    {
      id: '5',
      question: 'Can I upgrade or downgrade my subscription plan?',
      answer: 'Yes, you can change your subscription plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. You\'ll be prorated for any changes.',
      category: 'billing',
      tags: ['subscription', 'upgrade', 'downgrade', 'billing'],
      helpful: 33
    },
    {
      id: '6',
      question: 'Is my data secure and backed up?',
      answer: 'Absolutely! We use enterprise-grade encryption, regular security audits, and automated daily backups. Your data is stored in multiple secure data centers with 99.9% uptime guarantee and disaster recovery protocols.',
      category: 'general',
      tags: ['security', 'backup', 'encryption', 'privacy'],
      helpful: 67
    }
  ];

  constructor() {
    this.updateCategoryCounts();
  }

  get filteredFAQs(): FAQItem[] {
    return this.faqItems.filter(item => {
      const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
      const matchesSearch = this.searchTerm === '' || 
        item.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }

  toggleExpanded(id: string): void {
    if (this.expandedItems.has(id)) {
      this.expandedItems.delete(id);
    } else {
      this.expandedItems.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedItems.has(id);
  }

  setCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  expandAll(): void {
    this.filteredFAQs.forEach(item => this.expandedItems.add(item.id));
  }

  collapseAll(): void {
    this.expandedItems.clear();
  }

  markHelpful(item: FAQItem): void {
    item.helpful = (item.helpful || 0) + 1;
  }

  private updateCategoryCounts(): void {
    this.categories.forEach(category => {
      if (category.id === 'all') {
        category.count = this.faqItems.length;
      } else {
        category.count = this.faqItems.filter(item => item.category === category.id).length;
      }
    });
  }

  get exampleCode(): string {
    return `<!-- Simple FAQ Component -->
<div class="faq-container">
  <div class="search-box">
    <input 
      type="text" 
      [(ngModel)]="searchTerm" 
      placeholder="Search FAQs..."
      class="search-input">
  </div>

  <div class="faq-list">
    <div *ngFor="let item of filteredFAQs" class="faq-item">
      <button 
        (click)="toggleExpanded(item.id)"
        class="faq-question"
        [class.expanded]="isExpanded(item.id)">
        {{ item.question }}
        <span class="expand-icon">{{ isExpanded(item.id) ? '−' : '+' }}</span>
      </button>
      
      <div class="faq-answer" [class.expanded]="isExpanded(item.id)">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</div>

<!-- Component TypeScript -->
export class SimpleFAQ {
  searchTerm = '';
  expandedItems = new Set<string>();
  
  faqItems = [
    {
      id: '1',
      question: 'How do I get started?',
      answer: 'Getting started is easy! First, create an account...'
    }
  ];

  toggleExpanded(id: string) {
    if (this.expandedItems.has(id)) {
      this.expandedItems.delete(id);
    } else {
      this.expandedItems.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedItems.has(id);
  }
}`;
  }

  get htmlCode(): string {
    return `<div class="faq-container">
  <!-- Header -->
  <div class="faq-header">
    <h2 class="faq-title">Frequently Asked Questions</h2>
    <p class="faq-subtitle">Find answers to common questions</p>
  </div>

  <!-- Search and Filters -->
  <div class="faq-controls">
    <div class="search-section">
      <input 
        type="text" 
        [(ngModel)]="searchTerm" 
        placeholder="Search questions, answers, or tags..."
        class="search-input">
    </div>
    
    <div class="category-filters">
      <button 
        *ngFor="let category of categories"
        (click)="setCategory(category.id)"
        [class.active]="selectedCategory === category.id"
        class="category-btn">
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-name">{{ category.name }}</span>
        <span class="category-count">({{ category.count }})</span>
      </button>
    </div>
    
    <div class="bulk-actions">
      <button (click)="expandAll()" class="action-btn">Expand All</button>
      <button (click)="collapseAll()" class="action-btn">Collapse All</button>
    </div>
  </div>

  <!-- FAQ List -->
  <div class="faq-list">
    <div *ngFor="let item of filteredFAQs; let i = index" 
         class="faq-item"
         [style.animation-delay.ms]="i * 50">
      
      <button 
        (click)="toggleExpanded(item.id)"
        class="faq-question"
        [class.expanded]="isExpanded(item.id)"
        [attr.aria-expanded]="isExpanded(item.id)"
        [attr.aria-controls]="'answer-' + item.id">
        
        <span class="question-text">{{ item.question }}</span>
        
        <div class="question-meta">
          <span class="helpful-count" *ngIf="item.helpful">
            👍 {{ item.helpful }}
          </span>
          <span class="expand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" *ngIf="!isExpanded(item.id)"/>
              <path d="M19 13H5v-2h14v2z" *ngIf="isExpanded(item.id)"/>
            </svg>
          </span>
        </div>
      </button>
      
      <div 
        class="faq-answer" 
        [class.expanded]="isExpanded(item.id)"
        [id]="'answer-' + item.id"
        [attr.aria-hidden]="!isExpanded(item.id)">
        
        <div class="answer-content">
          <p class="answer-text">{{ item.answer }}</p>
          
          <div class="answer-footer">
            <div class="tags">
              <span *ngFor="let tag of item.tags" class="tag">#{{ tag }}</span>
            </div>
            
            <div class="helpful-section">
              <span class="helpful-text">Was this helpful?</span>
              <button 
                (click)="markHelpful(item)"
                class="helpful-btn">
                👍 Helpful
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="filteredFAQs.length === 0" class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3 class="no-results-title">No FAQs found</h3>
      <p class="no-results-text">Try adjusting your search terms or category filter</p>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* FAQ Pattern Styles */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

/* Header */
.faq-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.faq-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.faq-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: 0;
}

/* Controls */
.faq-controls {
  margin-bottom: var(--spacing-6);
}

.search-section {
  margin-bottom: var(--spacing-4);
}

.search-input {
  width: 100%;
  padding: var(--spacing-4);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-500);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

/* Category Filters */
.category-filters {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: var(--font-size-sm);

  &:hover {
    background: var(--gray-50);
    border-color: var(--primary-500);
  }

  &.active {
    background: var(--primary-500);
    color: white;
    border-color: var(--primary-500);
  }
}

.category-icon {
  font-size: var(--font-size-base);
}

.category-count {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

/* Bulk Actions */
.bulk-actions {
  display: flex;
  gap: var(--spacing-2);
}

.action-btn {
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--gray-100);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: var(--font-size-sm);

  &:hover {
    background: var(--gray-200);
    color: var(--text-primary);
  }
}

/* FAQ List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.faq-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  animation: fadeInUp 0.3s ease-out;

  &:hover {
    box-shadow: var(--shadow-md);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* FAQ Question */
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-primary);

  &:hover {
    background: var(--gray-50);
  }

  &.expanded {
    background: var(--primary-50);
    color: var(--primary-700);
  }
}

.question-text {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.5;
}

.question-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.helpful-count {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  background: var(--gray-100);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
}

.expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--gray-200);
  border-radius: 50%;
  transition: all var(--transition-normal);
  
  svg {
    width: 1rem;
    height: 1rem;
  }

  .faq-question.expanded & {
    background: var(--primary-500);
    color: white;
    transform: rotate(180deg);
  }
}

/* FAQ Answer */
.faq-answer {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.expanded {
    max-height: 500px;
    opacity: 1;
  }
}

.answer-content {
  padding: 0 var(--spacing-4) var(--spacing-4);
  border-top: 1px solid var(--border-secondary);
}

.answer-text {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: var(--spacing-3) 0;
}

.answer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--border-tertiary);
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
}

.tag {
  font-size: var(--font-size-xs);
  color: var(--primary-600);
  background: var(--primary-100);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
}

/* Helpful Section */
.helpful-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.helpful-text {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.helpful-btn {
  background: none;
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--green-50);
    border-color: var(--green-500);
    color: var(--green-600);
  }
}

/* No Results */
.no-results {
  text-align: center;
  padding: var(--spacing-12);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-4);
}

.no-results-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.no-results-text {
  color: var(--text-secondary);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .faq-container {
    padding: var(--spacing-4);
  }

  .category-filters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2);
  }

  .answer-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .question-text {
    font-size: var(--font-size-sm);
  }

  .faq-question {
    padding: var(--spacing-3);
  }

  .answer-content {
    padding: 0 var(--spacing-3) var(--spacing-3);
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .faq-question {
    &:hover {
      background: var(--gray-800);
    }

    &.expanded {
      background: var(--primary-900);
      color: var(--primary-300);
    }
  }

  .expand-icon {
    background: var(--gray-700);

    .faq-question.expanded & {
      background: var(--primary-600);
    }
  }

  .tag {
    background: var(--primary-900);
    color: var(--primary-300);
  }

  .helpful-btn:hover {
    background: var(--green-900);
    border-color: var(--green-600);
    color: var(--green-400);
  }
}

/* Accessibility */
.search-input:focus-visible,
.category-btn:focus-visible,
.action-btn:focus-visible,
.faq-question:focus-visible,
.helpful-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .faq-item,
  .faq-question,
  .faq-answer,
  .expand-icon {
    animation: none;
    transition: none;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful?: number;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  searchTerm = '';
  selectedCategory = 'all';
  expandedItems = new Set<string>();
  
  categories: FAQCategory[] = [
    { id: 'all', name: 'All Questions', icon: '❓', count: 0 },
    { id: 'general', name: 'General', icon: '🌐', count: 0 },
    { id: 'technical', name: 'Technical', icon: '⚙️', count: 0 },
    { id: 'billing', name: 'Billing', icon: '💳', count: 0 },
    { id: 'support', name: 'Support', icon: '🛟', count: 0 }
  ];

  faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I get started with this platform?',
      answer: 'Getting started is easy! First, create an account...',
      category: 'general',
      tags: ['getting-started', 'onboarding', 'account'],
      helpful: 42
    }
  ];

  get filteredFAQs(): FAQItem[] {
    return this.faqItems.filter(item => {
      const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
      const matchesSearch = this.searchTerm === '' || 
        item.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }

  toggleExpanded(id: string): void {
    if (this.expandedItems.has(id)) {
      this.expandedItems.delete(id);
    } else {
      this.expandedItems.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedItems.has(id);
  }

  setCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  expandAll(): void {
    this.filteredFAQs.forEach(item => this.expandedItems.add(item.id));
  }

  collapseAll(): void {
    this.expandedItems.clear();
  }

  markHelpful(item: FAQItem): void {
    item.helpful = (item.helpful || 0) + 1;
  }
}`;
  }
}