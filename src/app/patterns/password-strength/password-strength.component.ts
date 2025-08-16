import { Component } from '@angular/core';

interface PasswordStrength {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  percentage: number;
  feedback: string[];
  color: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
  pattern: RegExp;
}

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  requirements: PasswordRequirement[] = [
    {
      id: 'length',
      label: 'At least 8 characters',
      met: false,
      pattern: /.{8,}/
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      met: false,
      pattern: /[A-Z]/
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter',
      met: false,
      pattern: /[a-z]/
    },
    {
      id: 'number',
      label: 'One number',
      met: false,
      pattern: /[0-9]/
    },
    {
      id: 'special',
      label: 'One special character',
      met: false,
      pattern: /[^A-Za-z0-9]/
    }
  ];

  get passwordStrength(): PasswordStrength {
    if (!this.password) {
      return {
        score: 0,
        level: 'weak',
        percentage: 0,
        feedback: ['Enter a password'],
        color: '#ef4444'
      };
    }

    let score = 0;
    const feedback: string[] = [];

    // Check each requirement
    this.requirements.forEach(req => {
      req.met = req.pattern.test(this.password);
      if (req.met) {
        score++;
      } else {
        feedback.push(req.label);
      }
    });

    // Additional checks for stronger passwords
    if (this.password.length >= 12) score += 0.5;
    if (this.password.length >= 16) score += 0.5;
    if (!/(.)\1{2,}/.test(this.password)) score += 0.5; // No repeated characters
    if (!/123|abc|qwe|password|admin/i.test(this.password)) score += 0.5; // No common patterns

    const maxScore = this.requirements.length + 2; // 5 requirements + 2 bonus points
    const percentage = Math.min((score / maxScore) * 100, 100);

    let level: 'weak' | 'fair' | 'good' | 'strong';
    let color: string;

    if (percentage < 30) {
      level = 'weak';
      color = '#ef4444';
    } else if (percentage < 60) {
      level = 'fair';
      color = '#f59e0b';
    } else if (percentage < 80) {
      level = 'good';
      color = '#3b82f6';
    } else {
      level = 'strong';
      color = '#10b981';
    }

    if (feedback.length === 0) {
      feedback.push('Password meets all requirements');
    }

    return {
      score: Math.round(score),
      level,
      percentage: Math.round(percentage),
      feedback,
      color
    };
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.confirmPassword.length > 0;
  }

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  onPasswordChange(): void {
    // Requirements are updated via getter
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getStrengthLabel(): string {
    const strength = this.passwordStrength;
    return `${strength.level.charAt(0).toUpperCase() + strength.level.slice(1)} (${strength.percentage}%)`;
  }

  generatePassword(): void {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    
    // Ensure at least one character from each required category
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    password += '0123456789'[Math.floor(Math.random() * 10)];
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)];
    
    // Fill the rest randomly
    for (let i = 4; i < 12; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    this.password = password.split('').sort(() => Math.random() - 0.5).join('');
    this.confirmPassword = '';
  }

  get htmlCode(): string {
    return `<!-- Password Strength Container -->
<div class="password-strength-container">
  <!-- Password Input -->
  <div class="input-group">
    <label class="input-label">Password</label>
    <div class="password-input-wrapper">
      <input
        [type]="showPassword ? 'text' : 'password'"
        [(ngModel)]="password"
        (input)="onPasswordChange()"
        class="password-input"
        placeholder="Enter your password"
        autocomplete="new-password"
      />
      <button
        type="button"
        (click)="togglePasswordVisibility()"
        class="password-toggle"
        [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
        {{ showPassword ? '=A' : '=A=è' }}
      </button>
    </div>
  </div>

  <!-- Password Strength Indicator -->
  <div class="strength-indicator" *ngIf="password">
    <div class="strength-bar">
      <div
        class="strength-fill"
        [style.width.%]="passwordStrength.percentage"
        [style.background-color]="passwordStrength.color">
      </div>
    </div>
    <div class="strength-label" [style.color]="passwordStrength.color">
      {{ getStrengthLabel() }}
    </div>
  </div>

  <!-- Requirements Checklist -->
  <div class="requirements-list" *ngIf="password">
    <h4 class="requirements-title">Password Requirements</h4>
    <ul class="requirements">
      <li
        *ngFor="let req of requirements"
        class="requirement"
        [class.met]="req.met">
        <span class="requirement-icon">{{ req.met ? '' : 'L' }}</span>
        <span class="requirement-text">{{ req.label }}</span>
      </li>
    </ul>
  </div>

  <!-- Confirm Password -->
  <div class="input-group">
    <label class="input-label">Confirm Password</label>
    <div class="password-input-wrapper">
      <input
        [type]="showConfirmPassword ? 'text' : 'password'"
        [(ngModel)]="confirmPassword"
        class="password-input"
        [class.error]="passwordMismatch"
        [class.success]="passwordsMatch"
        placeholder="Confirm your password"
        autocomplete="new-password"
      />
      <button
        type="button"
        (click)="toggleConfirmPasswordVisibility()"
        class="password-toggle"
        [attr.aria-label]="showConfirmPassword ? 'Hide password' : 'Show password'">
        {{ showConfirmPassword ? '=A' : '=A=è' }}
      </button>
    </div>
    
    <div class="password-match-feedback" *ngIf="confirmPassword">
      <div *ngIf="passwordsMatch" class="match-success">
         Passwords match
      </div>
      <div *ngIf="passwordMismatch" class="match-error">
        L Passwords do not match
      </div>
    </div>
  </div>

  <!-- Generate Password Button -->
  <button
    type="button"
    (click)="generatePassword()"
    class="generate-button">
    <² Generate Strong Password
  </button>
</div>`;
  }

  get scssCode(): string {
    return `/* Password Strength Container */
.password-strength-container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
}

/* Input Groups */
.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* Password Input */
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  &.success {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }
  }
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #374151;
  }

  &:focus {
    outline: none;
    color: #3b82f6;
  }

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;

    &:hover {
      color: #d1d5db;
    }
  }
}

/* Strength Indicator */
.strength-indicator {
  margin-bottom: 1rem;
}

.strength-bar {
  width: 100%;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background: #4b5563;
  }
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 0.25rem;
}

.strength-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

/* Requirements List */
.requirements-list {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
}

.requirements-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

.requirements {
  list-style: none;
  margin: 0;
  padding: 0;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  transition: color 0.2s ease;

  &.met {
    color: #10b981;
  }

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;

    &.met {
      color: #34d399;
    }
  }
}

.requirement-icon {
  font-size: 0.75rem;
}

/* Password Match Feedback */
.password-match-feedback {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.match-success {
  color: #10b981;
  font-weight: 500;
}

.match-error {
  color: #ef4444;
  font-weight: 500;
}

/* Generate Button */
.generate-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #1d4ed8;

    &:hover {
      background: #1e40af;
    }
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .password-strength-container {
    padding: 0.5rem;
  }

  .requirements-list {
    padding: 0.75rem;
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface PasswordStrength {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  percentage: number;
  feedback: string[];
  color: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
  pattern: RegExp;
}

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  requirements: PasswordRequirement[] = [
    {
      id: 'length',
      label: 'At least 8 characters',
      met: false,
      pattern: /.{8,}/
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      met: false,
      pattern: /[A-Z]/
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter',
      met: false,
      pattern: /[a-z]/
    },
    {
      id: 'number',
      label: 'One number',
      met: false,
      pattern: /[0-9]/
    },
    {
      id: 'special',
      label: 'One special character',
      met: false,
      pattern: /[^A-Za-z0-9]/
    }
  ];

  get passwordStrength(): PasswordStrength {
    if (!this.password) {
      return {
        score: 0,
        level: 'weak',
        percentage: 0,
        feedback: ['Enter a password'],
        color: '#ef4444'
      };
    }

    let score = 0;
    const feedback: string[] = [];

    // Check each requirement
    this.requirements.forEach(req => {
      req.met = req.pattern.test(this.password);
      if (req.met) {
        score++;
      } else {
        feedback.push(req.label);
      }
    });

    // Additional scoring for stronger passwords
    if (this.password.length >= 12) score += 0.5;
    if (this.password.length >= 16) score += 0.5;
    if (!/(.)\1{2,}/.test(this.password)) score += 0.5;
    if (!/123|abc|qwe|password|admin/i.test(this.password)) score += 0.5;

    const maxScore = this.requirements.length + 2;
    const percentage = Math.min((score / maxScore) * 100, 100);

    let level: 'weak' | 'fair' | 'good' | 'strong';
    let color: string;

    if (percentage < 30) {
      level = 'weak';
      color = '#ef4444';
    } else if (percentage < 60) {
      level = 'fair';
      color = '#f59e0b';
    } else if (percentage < 80) {
      level = 'good';
      color = '#3b82f6';
    } else {
      level = 'strong';
      color = '#10b981';
    }

    return { score: Math.round(score), level, percentage: Math.round(percentage), feedback, color };
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.confirmPassword.length > 0;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  generatePassword(): void {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let password = '';
    
    // Ensure at least one character from each required category
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    password += '0123456789'[Math.floor(Math.random() * 10)];
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)];
    
    for (let i = 4; i < 12; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    this.password = password.split('').sort(() => Math.random() - 0.5).join('');
  }
}`;
  }
}