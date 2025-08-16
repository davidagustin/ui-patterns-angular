import { Component } from '@angular/core';

interface MathProblem {
  num1: number;
  num2: number;
  operator: string;
}

type CaptchaType = 'image' | 'checkbox' | 'math';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent {
  captchaType: CaptchaType = 'image';
  isVerified: boolean = false;
  userAnswer: string = '';
  mathProblem: MathProblem = { num1: 7, num2: 3, operator: '+' };
  imageCaptcha: string = 'ABCD123';
  checkboxChecked: boolean = false;

  generateMathProblem(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    this.mathProblem = { num1, num2, operator };
  }

  generateImageCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.imageCaptcha = result;
  }

  verifyCaptcha(): void {
    let correct = false;
    
    switch (this.captchaType) {
      case 'math':
        const expected = this.mathProblem.operator === '+' ? this.mathProblem.num1 + this.mathProblem.num2 :
                        this.mathProblem.operator === '-' ? this.mathProblem.num1 - this.mathProblem.num2 :
                        this.mathProblem.num1 * this.mathProblem.num2;
        correct = parseInt(this.userAnswer) === expected;
        break;
      case 'image':
        correct = this.userAnswer.toUpperCase() === this.imageCaptcha;
        break;
      case 'checkbox':
        correct = this.checkboxChecked;
        break;
    }
    
    if (correct) {
      this.isVerified = true;
      this.userAnswer = '';
    } else {
      alert('Incorrect answer. Please try again.');
      this.userAnswer = '';
      if (this.captchaType === 'math') this.generateMathProblem();
      if (this.captchaType === 'image') this.generateImageCaptcha();
    }
  }

  resetCaptcha(): void {
    this.isVerified = false;
    this.userAnswer = '';
    this.checkboxChecked = false;
    if (this.captchaType === 'math') this.generateMathProblem();
    if (this.captchaType === 'image') this.generateImageCaptcha();
  }

  setCaptchaType(type: CaptchaType): void {
    this.captchaType = type;
    this.resetCaptcha();
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkboxChecked = target.checked;
  }

  onAnswerChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.userAnswer = target.value;
  }

  getCharStyle(index: number): any {
    return {
      transform: `rotate(${Math.random() * 20 - 10}deg)`,
      color: `hsl(${Math.random() * 360}, 70%, 40%)`
    };
  }

  get htmlCode(): string {
    return `<div class="pattern-container">
  <app-pattern-header
    title="CAPTCHA Pattern"
    emoji="🤖"
    description="Verify that users are human with various types of CAPTCHA challenges that are both secure and user-friendly.">
  </app-pattern-header>

  <div class="pattern-grid">
    <!-- Interactive Example -->
    <div class="example-section">
      <div class="example-container">
        <h2 class="example-title">🎯 Interactive Example</h2>
        <p class="example-description">
          Try different types of CAPTCHA challenges. Each type serves different security needs and user experience preferences.
        </p>
        
        <div class="captcha-demo">
          <!-- CAPTCHA Type Selector -->
          <div class="captcha-types">
            <button
              (click)="setCaptchaType('image')"
              [class.active]="captchaType === 'image'"
              class="type-button">
              Image CAPTCHA
            </button>
            <button
              (click)="setCaptchaType('checkbox')"
              [class.active]="captchaType === 'checkbox'"
              class="type-button">
              Checkbox CAPTCHA
            </button>
            <button
              (click)="setCaptchaType('math')"
              [class.active]="captchaType === 'math'"
              class="type-button">
              Math CAPTCHA
            </button>
          </div>

          <!-- CAPTCHA Challenge -->
          <div class="captcha-container">
            <div *ngIf="isVerified; else captchaChallenge" class="verification-success">
              <div class="success-icon">✅</div>
              <h3 class="success-title">Verification Successful!</h3>
              <p class="success-message">
                You have successfully completed the CAPTCHA challenge.
              </p>
              <button (click)="resetCaptcha()" class="try-again-button">
                Try Another CAPTCHA
              </button>
            </div>

            <ng-template #captchaChallenge>
              <div class="challenge-container">
                <h3 class="challenge-title">Complete the CAPTCHA Challenge</h3>
                
                <!-- Image CAPTCHA -->
                <div *ngIf="captchaType === 'image'" class="image-captcha">
                  <div class="captcha-display">
                    <div class="captcha-text">
                      <span 
                        *ngFor="let char of imageCaptcha.split(''); let i = index"
                        class="captcha-char"
                        [style]="getCharStyle(i)">
                        {{ char }}
                      </span>
                    </div>
                    <div class="captcha-instruction">
                      Enter the characters you see above
                    </div>
                  </div>
                  <input
                    type="text"
                    [(ngModel)]="userAnswer"
                    placeholder="Enter the code"
                    class="captcha-input"
                    maxlength="6"
                  />
                  <button 
                    (click)="generateImageCaptcha()" 
                    class="refresh-button">
                    Generate new code
                  </button>
                </div>

                <!-- Checkbox CAPTCHA -->
                <div *ngIf="captchaType === 'checkbox'" class="checkbox-captcha">
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      id="captcha-checkbox"
                      [(ngModel)]="checkboxChecked"
                      class="checkbox-input"
                    />
                    <label for="captcha-checkbox" class="checkbox-label">
                      I'm not a robot
                    </label>
                  </div>
                  <p class="checkbox-instruction">
                    Simply check the box to verify you're human
                  </p>
                </div>

                <!-- Math CAPTCHA -->
                <div *ngIf="captchaType === 'math'" class="math-captcha">
                  <div class="math-display">
                    <div class="math-problem">
                      {{ mathProblem.num1 }} {{ mathProblem.operator }} {{ mathProblem.num2 }} = ?
                    </div>
                    <div class="math-instruction">
                      Solve the math problem
                    </div>
                  </div>
                  <input
                    type="number"
                    [(ngModel)]="userAnswer"
                    placeholder="Enter your answer"
                    class="captcha-input"
                  />
                  <button 
                    (click)="generateMathProblem()" 
                    class="refresh-button">
                    Generate new problem
                  </button>
                </div>

                <button
                  (click)="verifyCaptcha()"
                  class="verify-button"
                  [disabled]="captchaType !== 'checkbox' && !userAnswer.trim()">
                  Verify CAPTCHA
                </button>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="code-section">
      <div class="code-container">
        <app-code-tabs 
          [htmlCode]="htmlCode" 
          [scssCode]="scssCode" 
          [typescriptCode]="typescriptCode"
          title="Code Example">
        </app-code-tabs>
      </div>
    </div>
  </div>

  <!-- Key Features -->
  <div class="features-section">
    <h3 class="features-title">✨ Key Features</h3>
    <div class="features-grid">
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-title">Multiple Types</h4>
          <p class="feature-description">Support for image, checkbox, and math CAPTCHAs</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-title">Accessibility</h4>
          <p class="feature-description">Alternative options for users with disabilities</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-title">User-Friendly</h4>
          <p class="feature-description">Clear instructions and error handling</p>
        </div>
      </div>
      <div class="feature-item">
        <span class="feature-icon">✓</span>
        <div>
          <h4 class="feature-title">Security</h4>
          <p class="feature-description">Effective protection against automated bots</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Use Cases -->
  <div class="use-cases-section">
    <h3 class="use-cases-title">🎯 Common Use Cases</h3>
    <div class="use-cases-grid">
      <div class="use-case-item">
        <div class="use-case-icon">📝</div>
        <h4 class="use-case-title">Form Protection</h4>
        <p class="use-case-description">Prevent spam submissions on contact forms</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">👤</div>
        <h4 class="use-case-title">User Registration</h4>
        <p class="use-case-description">Verify human users during sign-up process</p>
      </div>
      <div class="use-case-item">
        <div class="use-case-icon">💬</div>
        <h4 class="use-case-title">Comment Systems</h4>
        <p class="use-case-description">Protect against automated comment spam</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get scssCode(): string {
    return `/* CAPTCHA Demo Container */
.captcha-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* CAPTCHA Type Selector */
.captcha-types {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.type-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #f9fafb;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    color: #d1d5db;
    border-color: #4b5563;

    &:hover {
      background: #4b5563;
      border-color: #6b7280;
    }

    &.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
  }
}

/* CAPTCHA Container */
.captcha-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

/* Verification Success */
.verification-success {
  text-align: center;
  padding: 2rem 1rem;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #16a34a;
  margin-bottom: 0.5rem;

  @media (prefers-color-scheme: dark) {
    color: #22c55e;
  }
}

.success-message {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

.try-again-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

/* Challenge Container */
.challenge-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.challenge-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

/* Image CAPTCHA */
.image-captcha {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.captcha-display {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.captcha-text {
  font-size: 1.5rem;
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.captcha-char {
  display: inline-block;
  margin: 0 0.25rem;
  transition: transform 0.2s ease;
}

.captcha-instruction {
  font-size: 0.75rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Checkbox CAPTCHA */
.checkbox-captcha {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.checkbox-input {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #3b82f6;
  cursor: pointer;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.checkbox-instruction {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Math CAPTCHA */
.math-captcha {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.math-display {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    background: #374151;
  }
}

.math-problem {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.math-instruction {
  font-size: 0.75rem;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
}

/* Input Fields */
.captcha-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background: white;
  color: #111827;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }

    &::placeholder {
      color: #6b7280;
    }
  }
}

/* Refresh Button */
.refresh-button {
  font-size: 0.875rem;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  align-self: flex-start;
  transition: color 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;

    &:hover {
      color: #93c5fd;
    }
  }
}

/* Verify Button */
.verify-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .captcha-types {
    flex-direction: column;
  }

  .type-button {
    text-align: center;
  }

  .captcha-container {
    padding: 1rem;
  }

  .verification-success {
    padding: 1.5rem 0.5rem;
  }

  .captcha-text {
    font-size: 1.25rem;
  }

  .math-problem {
    font-size: 1.125rem;
  }
}

/* Animation */
.captcha-char:hover {
  transform: scale(1.1) !important;
}

/* Focus Improvements */
.type-button:focus,
.try-again-button:focus,
.refresh-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface MathProblem {
  num1: number;
  num2: number;
  operator: string;
}

type CaptchaType = 'image' | 'checkbox' | 'math';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent {
  captchaType: CaptchaType = 'image';
  isVerified: boolean = false;
  userAnswer: string = '';
  mathProblem: MathProblem = { num1: 7, num2: 3, operator: '+' };
  imageCaptcha: string = 'ABCD123';
  checkboxChecked: boolean = false;

  generateMathProblem(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    this.mathProblem = { num1, num2, operator };
  }

  generateImageCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.imageCaptcha = result;
  }

  verifyCaptcha(): void {
    let correct = false;
    
    switch (this.captchaType) {
      case 'math':
        const expected = this.mathProblem.operator === '+' ? this.mathProblem.num1 + this.mathProblem.num2 :
                        this.mathProblem.operator === '-' ? this.mathProblem.num1 - this.mathProblem.num2 :
                        this.mathProblem.num1 * this.mathProblem.num2;
        correct = parseInt(this.userAnswer) === expected;
        break;
      case 'image':
        correct = this.userAnswer.toUpperCase() === this.imageCaptcha;
        break;
      case 'checkbox':
        correct = this.checkboxChecked;
        break;
    }
    
    if (correct) {
      this.isVerified = true;
      this.userAnswer = '';
    } else {
      alert('Incorrect answer. Please try again.');
      this.userAnswer = '';
      if (this.captchaType === 'math') this.generateMathProblem();
      if (this.captchaType === 'image') this.generateImageCaptcha();
    }
  }

  resetCaptcha(): void {
    this.isVerified = false;
    this.userAnswer = '';
    this.checkboxChecked = false;
    if (this.captchaType === 'math') this.generateMathProblem();
    if (this.captchaType === 'image') this.generateImageCaptcha();
  }

  setCaptchaType(type: CaptchaType): void {
    this.captchaType = type;
    this.resetCaptcha();
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkboxChecked = target.checked;
  }

  onAnswerChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.userAnswer = target.value;
  }

  getCharStyle(index: number): any {
    return {
      transform: \`rotate(\${Math.random() * 20 - 10}deg)\`,
      color: \`hsl(\${Math.random() * 360}, 70%, 40%)\`
    };
  }
}`;
  }
}