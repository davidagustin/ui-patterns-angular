import { Component } from '@angular/core';

interface RatingConfig {
  value: number;
  maxRating: number;
  size: 'small' | 'medium' | 'large';
  readonly: boolean;
  allowHalf: boolean;
  showTooltip: boolean;
}

interface ReviewExample {
  id: number;
  product: string;
  rating: number;
  review: string;
  author: string;
  date: Date;
  helpful: number;
}

@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss']
})
export class RatingInputComponent {
  currentExample = 'basic';
  
  // Basic rating examples
  basicRating = 0;
  starRating = 3.5;
  heartRating = 2;
  thumbsRating = 1; // 0 = none, 1 = up, -1 = down
  emojiRating = 3;
  
  // Advanced configurations
  advancedConfigs: RatingConfig[] = [
    {
      value: 4,
      maxRating: 5,
      size: 'small',
      readonly: false,
      allowHalf: false,
      showTooltip: false
    },
    {
      value: 3.5,
      maxRating: 5,
      size: 'medium',
      readonly: false,
      allowHalf: true,
      showTooltip: true
    },
    {
      value: 2,
      maxRating: 10,
      size: 'large',
      readonly: true,
      allowHalf: false,
      showTooltip: false
    }
  ];

  // Hover states
  hoveredStar = 0;
  hoveredHeart = 0;
  hoveredEmoji = 0;

  // Review examples
  reviews: ReviewExample[] = [
    {
      id: 1,
      product: 'Wireless Headphones',
      rating: 4.5,
      review: 'Great sound quality and comfortable to wear for long periods.',
      author: 'John D.',
      date: new Date('2024-01-15'),
      helpful: 12
    },
    {
      id: 2,
      product: 'Smart Watch',
      rating: 3,
      review: 'Good features but battery life could be better.',
      author: 'Sarah M.',
      date: new Date('2024-02-10'),
      helpful: 8
    },
    {
      id: 3,
      product: 'Coffee Maker',
      rating: 5,
      review: 'Perfect coffee every time! Highly recommended.',
      author: 'Mike R.',
      date: new Date('2024-01-28'),
      helpful: 23
    }
  ];

  // Tooltip labels
  ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  emojiLabels = ['😢', '😕', '😐', '😊', '😍'];

  setExample(example: string): void {
    this.currentExample = example;
  }

  // Star rating methods
  setStarRating(rating: number): void {
    this.basicRating = rating;
  }

  setAdvancedRating(rating: number): void {
    this.starRating = rating;
  }

  onStarHover(star: number): void {
    this.hoveredStar = star;
  }

  onStarLeave(): void {
    this.hoveredStar = 0;
  }

  getStarClass(index: number, rating: number, hovered: number = 0): string {
    const currentRating = hovered || rating;
    if (index <= currentRating) {
      return 'filled';
    }
    if (index - 0.5 <= currentRating) {
      return 'half-filled';
    }
    return 'empty';
  }

  // Heart rating methods
  setHeartRating(rating: number): void {
    this.heartRating = rating;
  }

  onHeartHover(heart: number): void {
    this.hoveredHeart = heart;
  }

  onHeartLeave(): void {
    this.hoveredHeart = 0;
  }

  getHeartClass(index: number): string {
    const currentRating = this.hoveredHeart || this.heartRating;
    return index <= currentRating ? 'filled' : 'empty';
  }

  // Thumbs rating methods
  setThumbsRating(value: number): void {
    this.thumbsRating = this.thumbsRating === value ? 0 : value;
  }

  // Emoji rating methods
  setEmojiRating(rating: number): void {
    this.emojiRating = rating;
  }

  onEmojiHover(emoji: number): void {
    this.hoveredEmoji = emoji;
  }

  onEmojiLeave(): void {
    this.hoveredEmoji = 0;
  }

  getEmojiClass(index: number): string {
    const currentRating = this.hoveredEmoji || this.emojiRating;
    return index <= currentRating ? 'selected' : 'unselected';
  }

  // Advanced configuration methods
  updateConfig(index: number, property: keyof RatingConfig, value: any): void {
    this.advancedConfigs[index] = { ...this.advancedConfigs[index], [property]: value };
  }

  // Review methods
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
  }

  get averageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  }

  get ratingDistribution(): { [key: number]: number } {
    const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.reviews.forEach(review => {
      const roundedRating = Math.round(review.rating);
      distribution[roundedRating]++;
    });
    return distribution;
  }

  getDistributionPercentage(rating: number): number {
    return this.reviews.length > 0 ? (this.ratingDistribution[rating] / this.reviews.length) * 100 : 0;
  }

  getStarArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  get htmlCode(): string {
    return `<!-- Rating Input Container -->
<div class="rating-input-container">
  <!-- Example Navigation -->
  <div class="example-navigation">
    <button 
      (click)="setExample('basic')"
      class="nav-button"
      [class.active]="currentExample === 'basic'">
      ⭐ Basic Ratings
    </button>
    <button 
      (click)="setExample('advanced')"
      class="nav-button"
      [class.active]="currentExample === 'advanced'">
      🔧 Advanced Config
    </button>
    <button 
      (click)="setExample('reviews')"
      class="nav-button"
      [class.active]="currentExample === 'reviews'">
      📝 Review System
    </button>
  </div>

  <!-- Basic Rating Examples -->
  <div *ngIf="currentExample === 'basic'" class="basic-examples">
    <!-- Star Rating -->
    <div class="rating-section">
      <h3>Star Rating</h3>
      <div class="star-rating">
        <span 
          *ngFor="let star of [1,2,3,4,5]; let i = index"
          class="star"
          [class]="getStarClass(star, basicRating, hoveredStar)"
          (click)="setStarRating(star)"
          (mouseenter)="onStarHover(star)"
          (mouseleave)="onStarLeave()">
          ★
        </span>
      </div>
      <p>Rating: {{ basicRating }}/5</p>
    </div>

    <!-- Heart Rating -->
    <div class="rating-section">
      <h3>Heart Rating</h3>
      <div class="heart-rating">
        <span 
          *ngFor="let heart of [1,2,3,4,5]; let i = index"
          class="heart"
          [class]="getHeartClass(heart)"
          (click)="setHeartRating(heart)"
          (mouseenter)="onHeartHover(heart)"
          (mouseleave)="onHeartLeave()">
          ♥
        </span>
      </div>
      <p>Rating: {{ heartRating }}/5</p>
    </div>

    <!-- Emoji Rating -->
    <div class="rating-section">
      <h3>Emoji Rating</h3>
      <div class="emoji-rating">
        <span 
          *ngFor="let emoji of emojiLabels; let i = index"
          class="emoji"
          [class]="getEmojiClass(i + 1)"
          (click)="setEmojiRating(i + 1)"
          (mouseenter)="onEmojiHover(i + 1)"
          (mouseleave)="onEmojiLeave()">
          {{ emoji }}
        </span>
      </div>
      <p>Rating: {{ emojiRating }}/5 - {{ ratingLabels[emojiRating - 1] || 'Not rated' }}</p>
    </div>

    <!-- Thumbs Rating -->
    <div class="rating-section">
      <h3>Thumbs Rating</h3>
      <div class="thumbs-rating">
        <button 
          class="thumb-button"
          [class.active]="thumbsRating === 1"
          (click)="setThumbsRating(1)">
          👍 Like
        </button>
        <button 
          class="thumb-button"
          [class.active]="thumbsRating === -1"
          (click)="setThumbsRating(-1)">
          👎 Dislike
        </button>
      </div>
      <p>Status: {{ thumbsRating === 1 ? 'Liked' : thumbsRating === -1 ? 'Disliked' : 'No rating' }}</p>
    </div>
  </div>

  <!-- Advanced Configuration -->
  <div *ngIf="currentExample === 'advanced'" class="advanced-examples">
    <div *ngFor="let config of advancedConfigs; let i = index" class="config-card">
      <h3>Configuration {{ i + 1 }}</h3>
      
      <!-- Configuration Controls -->
      <div class="config-controls">
        <div class="control-group">
          <label>Max Rating:</label>
          <input 
            type="number" 
            [ngModel]="config.maxRating"
            (ngModelChange)="updateConfig(i, 'maxRating', $event)"
            min="1" max="10">
        </div>
        
        <div class="control-group">
          <label>Size:</label>
          <select 
            [ngModel]="config.size"
            (ngModelChange)="updateConfig(i, 'size', $event)">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        
        <div class="control-group checkbox">
          <label>
            <input 
              type="checkbox"
              [ngModel]="config.readonly"
              (ngModelChange)="updateConfig(i, 'readonly', $event)">
            Read Only
          </label>
        </div>
        
        <div class="control-group checkbox">
          <label>
            <input 
              type="checkbox"
              [ngModel]="config.allowHalf"
              (ngModelChange)="updateConfig(i, 'allowHalf', $event)">
            Allow Half Stars
          </label>
        </div>
      </div>

      <!-- Rating Display -->
      <div class="rating-display" [class]="config.size">
        <div class="star-rating advanced">
          <span 
            *ngFor="let star of getStarArray(config.maxRating); let j = index"
            class="star"
            [class]="getStarClass(j + 1, config.value)"
            (click)="!config.readonly && updateConfig(i, 'value', j + 1)">
            ★
          </span>
        </div>
        <span class="rating-value">{{ config.value }}/{{ config.maxRating }}</span>
      </div>
    </div>
  </div>

  <!-- Review System -->
  <div *ngIf="currentExample === 'reviews'" class="reviews-examples">
    <div class="reviews-summary">
      <h3>Customer Reviews</h3>
      <div class="summary-stats">
        <div class="average-rating">
          <span class="rating-number">{{ averageRating.toFixed(1) }}</span>
          <div class="rating-stars">{{ getRatingStars(averageRating) }}</div>
          <span class="review-count">Based on {{ reviews.length }} reviews</span>
        </div>
        
        <div class="rating-breakdown">
          <div *ngFor="let rating of [5,4,3,2,1]" class="breakdown-row">
            <span class="rating-label">{{ rating }} ★</span>
            <div class="progress-bar">
              <div 
                class="progress-fill"
                [style.width.%]="getDistributionPercentage(rating)">
              </div>
            </div>
            <span class="percentage">{{ getDistributionPercentage(rating).toFixed(0) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="reviews-list">
      <div *ngFor="let review of reviews" class="review-card">
        <div class="review-header">
          <div class="reviewer-info">
            <span class="reviewer-name">{{ review.author }}</span>
            <span class="review-date">{{ formatDate(review.date) }}</span>
          </div>
          <div class="review-rating">
            <span class="stars">{{ getRatingStars(review.rating) }}</span>
            <span class="rating-number">({{ review.rating }})</span>
          </div>
        </div>
        
        <h4 class="product-name">{{ review.product }}</h4>
        <p class="review-text">{{ review.review }}</p>
        
        <div class="review-actions">
          <button class="helpful-button">
            👍 Helpful ({{ review.helpful }})
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `.rating-input-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.example-navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
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
}

.basic-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.rating-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
}

.star-rating {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin: 1rem 0;

  .star {
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #d1d5db;

    &.filled {
      color: #fbbf24;
      transform: scale(1.1);
    }

    &:hover {
      transform: scale(1.2);
    }
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface RatingConfig {
  value: number;
  maxRating: number;
  size: 'small' | 'medium' | 'large';
  readonly: boolean;
  allowHalf: boolean;
  showTooltip: boolean;
}

@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss']
})
export class RatingInputComponent {
  currentExample = 'basic';
  
  // Basic rating values
  basicRating = 0;
  starRating = 3.5;
  heartRating = 2;
  thumbsRating = 1; // 0 = none, 1 = up, -1 = down
  emojiRating = 3;
  
  // Hover states
  hoveredStar = 0;
  hoveredHeart = 0;
  hoveredEmoji = 0;

  // Rating labels
  ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  emojiLabels = ['😢', '😕', '😐', '😊', '😍'];

  setExample(example: string): void {
    this.currentExample = example;
  }

  // Star rating methods
  setStarRating(rating: number): void {
    this.basicRating = rating;
  }

  onStarHover(star: number): void {
    this.hoveredStar = star;
  }

  onStarLeave(): void {
    this.hoveredStar = 0;
  }

  getStarClass(index: number, rating: number, hovered: number = 0): string {
    const currentRating = hovered || rating;
    if (index <= currentRating) {
      return 'filled';
    }
    if (index - 0.5 <= currentRating) {
      return 'half-filled';
    }
    return 'empty';
  }

  // Additional methods for heart, emoji, and thumbs ratings...
  // Configuration management methods...
  // Review system methods...
}`;
  }
}