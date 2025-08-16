import { Component, HostListener } from '@angular/core';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  likes: number;
}

@Component({
  selector: 'app-continuous-scrolling',
  templateUrl: './continuous-scrolling.component.html',
  styleUrls: ['./continuous-scrolling.component.scss']
})
export class ContinuousScrollingComponent {
  posts: Post[] = [];
  isLoading = false;
  hasMorePosts = true;
  currentPage = 1;
  postsPerPage = 10;

  ngOnInit(): void {
    this.loadMorePosts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const threshold = 100;
    const position = window.pageYOffset + window.innerHeight;
    const height = document.documentElement.scrollHeight;
    
    if (position > height - threshold && !this.isLoading && this.hasMorePosts) {
      this.loadMorePosts();
    }
  }

  loadMorePosts(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      const newPosts = this.generatePosts(this.currentPage);
      this.posts = [...this.posts, ...newPosts];
      this.currentPage++;
      this.isLoading = false;
      
      // Stop loading after 50 posts for demo
      if (this.posts.length >= 50) {
        this.hasMorePosts = false;
      }
    }, 1000);
  }

  generatePosts(page: number): Post[] {
    const posts: Post[] = [];
    const startId = (page - 1) * this.postsPerPage + 1;
    
    for (let i = 0; i < this.postsPerPage; i++) {
      const id = startId + i;
      posts.push({
        id,
        title: `Blog Post ${id}: ${this.getRandomTitle()}`,
        content: this.getRandomContent(),
        author: this.getRandomAuthor(),
        date: this.getRandomDate(),
        image: `📷`,
        likes: Math.floor(Math.random() * 500) + 10
      });
    }
    
    return posts;
  }

  getRandomTitle(): string {
    const titles = [
      'The Future of Web Development',
      'Best Practices for Modern Apps',
      'Understanding User Experience',
      'Advanced JavaScript Techniques',
      'Mobile-First Design Principles',
      'Performance Optimization Tips',
      'Accessibility in Web Design',
      'CSS Grid and Flexbox Mastery',
      'React vs Angular Comparison',
      'Building Scalable Applications'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  getRandomContent(): string {
    const contents = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  }

  getRandomAuthor(): string {
    const authors = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eva Brown', 'Frank Miller'];
    return authors[Math.floor(Math.random() * authors.length)];
  }

  getRandomDate(): string {
    const dates = ['2024-01-15', '2024-01-10', '2024-01-05', '2023-12-28', '2023-12-20'];
    return dates[Math.floor(Math.random() * dates.length)];
  }

  get htmlCode(): string {
    return `<div class="continuous-scroll-container">
  <!-- Post List -->
  <div class="posts-container">
    <div *ngFor="let post of posts; trackBy: trackByPostId" class="post-item">
      <div class="post-image">
        <span class="image-placeholder">{{ post.image }}</span>
      </div>
      
      <div class="post-content">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-excerpt">{{ post.content }}</p>
        
        <div class="post-meta">
          <span class="post-author">{{ post.author }}</span>
          <span class="post-date">{{ post.date | date:'mediumDate' }}</span>
          <span class="post-likes">❤️ {{ post.likes }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading Indicator -->
  <div *ngIf="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <span class="loading-text">Loading more posts...</span>
  </div>

  <!-- End Message -->
  <div *ngIf="!hasMorePosts && !isLoading" class="end-message">
    <span class="end-text">You've reached the end! 🎉</span>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* Continuous Scrolling Container */
.continuous-scroll-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-4);
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.post-item {
  display: flex;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  animation: fadeInUp 0.5s ease-out;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
}

.post-image {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  background: var(--gray-100);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;

  @media (prefers-color-scheme: dark) {
    background: var(--gray-800);
  }
}

.post-content {
  flex: 1;
  min-width: 0;
}

.post-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
  line-height: 1.4;
}

.post-excerpt {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--spacing-3) 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.post-author {
  font-weight: 500;
  color: var(--primary-600);
}

.post-likes {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

/* Loading States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--gray-200);
  border-top: 4px solid var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @media (prefers-color-scheme: dark) {
    border-color: var(--gray-700);
    border-top-color: var(--primary-400);
  }
}

.loading-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.end-message {
  text-align: center;
  padding: var(--spacing-6);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

/* Animations */
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 640px) {
  .post-item {
    flex-direction: column;
    text-align: center;
  }

  .post-image {
    width: 100%;
    height: 200px;
    align-self: center;
  }

  .post-meta {
    justify-content: center;
    flex-wrap: wrap;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component, HostListener } from '@angular/core';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  likes: number;
}

@Component({
  selector: 'app-continuous-scrolling',
  templateUrl: './continuous-scrolling.component.html',
  styleUrls: ['./continuous-scrolling.component.scss']
})
export class ContinuousScrollingComponent {
  posts: Post[] = [];
  isLoading = false;
  hasMorePosts = true;
  currentPage = 1;
  postsPerPage = 10;

  ngOnInit(): void {
    this.loadMorePosts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const threshold = 100;
    const position = window.pageYOffset + window.innerHeight;
    const height = document.documentElement.scrollHeight;
    
    if (position > height - threshold && !this.isLoading && this.hasMorePosts) {
      this.loadMorePosts();
    }
  }

  loadMorePosts(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      const newPosts = this.generatePosts(this.currentPage);
      this.posts = [...this.posts, ...newPosts];
      this.currentPage++;
      this.isLoading = false;
      
      // Stop loading after 50 posts for demo
      if (this.posts.length >= 50) {
        this.hasMorePosts = false;
      }
    }, 1000);
  }

  generatePosts(page: number): Post[] {
    const posts: Post[] = [];
    const startId = (page - 1) * this.postsPerPage + 1;
    
    for (let i = 0; i < this.postsPerPage; i++) {
      const id = startId + i;
      posts.push({
        id,
        title: \`Blog Post \${id}: \${this.getRandomTitle()}\`,
        content: this.getRandomContent(),
        author: this.getRandomAuthor(),
        date: this.getRandomDate(),
        image: '📷',
        likes: Math.floor(Math.random() * 500) + 10
      });
    }
    
    return posts;
  }

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
}`;
  }

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
}