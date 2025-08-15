import { Component } from '@angular/core';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  error?: string;
  options?: { value: any; label: string }[];
  multiple?: boolean;
  accept?: string;
  min?: number;
  max?: number;
  pattern?: string;
  description?: string;
}

interface FormConfig {
  layout: 'vertical' | 'horizontal' | 'inline';
  validation: 'realtime' | 'onsubmit' | 'onblur';
  showRequired: boolean;
  showOptional: boolean;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  config: FormConfig = {
    layout: 'vertical',
    validation: 'onblur',
    showRequired: true,
    showOptional: false
  };

  formData: any = {};
  formErrors: { [key: string]: string } = {};
  isSubmitting = false;
  submitSuccess = false;

  basicFields: FormField[] = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '+1 (555) 000-0000',
      required: false,
      description: 'Optional: We may use this to contact you'
    }
  ];

  advancedFields: FormField[] = [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Choose a username',
      required: true,
      pattern: '^[a-zA-Z0-9_]{3,20}$',
      description: '3-20 characters, letters, numbers, and underscores only'
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Create a strong password',
      required: true,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      description: 'At least 8 characters with uppercase, lowercase, number, and special character'
    },
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { value: '', label: 'Select your country' },
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
      required: true,
      min: 13,
      max: 120,
      description: 'You must be at least 13 years old'
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Biography',
      placeholder: 'Tell us about yourself...',
      required: false,
      description: 'Optional: Share a bit about your background'
    },
    {
      id: 'interests',
      type: 'checkbox',
      label: 'Interests',
      required: false,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'design', label: 'Design' },
        { value: 'music', label: 'Music' },
        { value: 'sports', label: 'Sports' },
        { value: 'travel', label: 'Travel' },
        { value: 'cooking', label: 'Cooking' }
      ]
    },
    {
      id: 'newsletter',
      type: 'radio',
      label: 'Newsletter Preference',
      required: true,
      options: [
        { value: 'weekly', label: 'Weekly digest' },
        { value: 'monthly', label: 'Monthly summary' },
        { value: 'never', label: 'No emails' }
      ]
    },
    {
      id: 'profilePicture',
      type: 'file',
      label: 'Profile Picture',
      required: false,
      accept: 'image/*',
      description: 'Upload a profile picture (max 5MB)'
    },
    {
      id: 'birthdate',
      type: 'date',
      label: 'Date of Birth',
      required: false
    }
  ];

  updateConfig(key: keyof FormConfig, value: any): void {
    this.config = { ...this.config, [key]: value };
  }

  onFieldChange(fieldId: string, value: any): void {
    this.formData[fieldId] = value;
    
    if (this.config.validation === 'realtime') {
      this.validateField(fieldId);
    }
  }

  onFieldBlur(fieldId: string): void {
    if (this.config.validation === 'onblur') {
      this.validateField(fieldId);
    }
  }

  validateField(fieldId: string): void {
    const field = [...this.basicFields, ...this.advancedFields].find(f => f.id === fieldId);
    if (!field) return;

    const value = this.formData[fieldId];
    let error = '';

    // Required validation
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      error = `${field.label} is required`;
    }
    // Pattern validation
    else if (value && field.pattern) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        error = `${field.label} format is invalid`;
      }
    }
    // Number range validation
    else if (field.type === 'number' && value) {
      const num = Number(value);
      if (field.min !== undefined && num < field.min) {
        error = `${field.label} must be at least ${field.min}`;
      } else if (field.max !== undefined && num > field.max) {
        error = `${field.label} must be at most ${field.max}`;
      }
    }

    if (error) {
      this.formErrors[fieldId] = error;
    } else {
      delete this.formErrors[fieldId];
    }
  }

  validateForm(fields: FormField[]): boolean {
    this.formErrors = {};
    
    fields.forEach(field => {
      this.validateField(field.id);
    });

    return Object.keys(this.formErrors).length === 0;
  }

  onSubmit(fields: FormField[]): void {
    if (this.config.validation === 'onsubmit') {
      if (!this.validateForm(fields)) {
        return;
      }
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      console.log('Form submitted:', this.formData);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 3000);
    }, 2000);
  }

  resetForm(): void {
    this.formData = {};
    this.formErrors = {};
    this.submitSuccess = false;
  }

  getFieldClasses(field: FormField): string {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';
    const errorClasses = this.formErrors[field.id] ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600';
    const disabledClasses = field.disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800';
    
    return `${baseClasses} ${errorClasses} ${disabledClasses} text-gray-900 dark:text-gray-100`;
  }

  getLabelClasses(field: FormField): string {
    return 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2';
  }

  getLayoutClasses(): string {
    switch (this.config.layout) {
      case 'horizontal':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      case 'inline':
        return 'flex flex-wrap gap-4';
      default:
        return 'space-y-6';
    }
  }

  get htmlCode(): string {
    return `<!-- Basic Form Layout -->
<form (ngSubmit)="onSubmit()" class="space-y-6">
  
  <!-- Text Input -->
  <div class="form-field">
    <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      First Name
      <span class="text-red-500">*</span>
    </label>
    <input 
      type="text" 
      id="firstName" 
      name="firstName"
      [(ngModel)]="formData.firstName"
      (blur)="onFieldBlur('firstName')"
      placeholder="Enter your first name"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      [class.border-red-500]="formErrors['firstName']"
      required>
    
    <!-- Error Message -->
    <p *ngIf="formErrors['firstName']" 
       class="text-red-500 dark:text-red-400 text-sm mt-1">
      {{ formErrors['firstName'] }}
    </p>
  </div>

  <!-- Email Input -->
  <div class="form-field">
    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Email Address
      <span class="text-red-500">*</span>
    </label>
    <input 
      type="email" 
      id="email" 
      name="email"
      [(ngModel)]="formData.email"
      (blur)="onFieldBlur('email')"
      placeholder="Enter your email"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      [class.border-red-500]="formErrors['email']"
      required>
    
    <p *ngIf="formErrors['email']" 
       class="text-red-500 dark:text-red-400 text-sm mt-1">
      {{ formErrors['email'] }}
    </p>
  </div>

  <!-- Select Dropdown -->
  <div class="form-field">
    <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Country
      <span class="text-red-500">*</span>
    </label>
    <select 
      id="country" 
      name="country"
      [(ngModel)]="formData.country"
      (blur)="onFieldBlur('country')"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      required>
      <option value="">Select your country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    </select>
  </div>

  <!-- Textarea -->
  <div class="form-field">
    <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Message
    </label>
    <textarea 
      id="message" 
      name="message"
      [(ngModel)]="formData.message"
      placeholder="Enter your message"
      rows="4"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none">
    </textarea>
  </div>

  <!-- Checkbox Group -->
  <div class="form-field">
    <fieldset>
      <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Interests
      </legend>
      <div class="space-y-2">
        <label *ngFor="let option of interests" 
               class="flex items-center space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            [value]="option.value"
            [(ngModel)]="formData.interests"
            name="interests"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                   focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                   dark:bg-gray-700 dark:border-gray-600">
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ option.label }}
          </span>
        </label>
      </div>
    </fieldset>
  </div>

  <!-- Submit Button -->
  <div class="flex items-center justify-end space-x-3">
    <button 
      type="button" 
      (click)="resetForm()"
      class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
             rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
      Reset
    </button>
    
    <button 
      type="submit" 
      [disabled]="isSubmitting"
      class="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 
             text-white rounded-lg transition-colors flex items-center space-x-2">
      <span *ngIf="isSubmitting" class="animate-spin">⏳</span>
      <span>{{ isSubmitting ? 'Submitting...' : 'Submit' }}</span>
    </button>
  </div>
</form>`;
  }

  get cssCode(): string {
    return `/* This Angular component uses Tailwind CSS classes directly in the template */
/* No custom CSS is needed as all styling is handled by Tailwind utilities */

/* Example of key Tailwind classes used: */

/* Form Layout */
/* space-y-6 - Vertical spacing between form fields */
/* grid grid-cols-1 md:grid-cols-2 gap-6 - Responsive grid layout */
/* flex flex-wrap gap-4 - Inline form layout */

/* Form Fields */
/* block text-sm font-medium - Label styling */
/* text-gray-700 dark:text-gray-300 - Label colors with dark mode */
/* mb-2 - Margin bottom for labels */

/* Input Styling */
/* w-full px-3 py-2 - Full width with padding */
/* border border-gray-300 dark:border-gray-600 - Borders with dark mode */
/* rounded-lg - Rounded corners */
/* bg-white dark:bg-gray-800 - Background colors */
/* text-gray-900 dark:text-gray-100 - Text colors */
/* transition-colors - Smooth color transitions */
/* focus:outline-none focus:ring-2 focus:ring-blue-500 - Focus states */

/* Error States */
/* border-red-500 dark:border-red-400 - Error border colors */
/* text-red-500 dark:text-red-400 - Error text colors */

/* Disabled States */
/* bg-gray-100 dark:bg-gray-700 - Disabled background */
/* cursor-not-allowed - Disabled cursor */

/* Buttons */
/* px-4 py-2 - Button padding */
/* bg-blue-500 hover:bg-blue-600 - Primary button colors */
/* disabled:bg-blue-300 - Disabled button state */
/* transition-colors - Smooth transitions */

/* Required Indicators */
/* text-red-500 - Required asterisk color */

/* Help Text */
/* text-xs text-gray-500 dark:text-gray-400 - Description text */
/* mt-1 - Margin top for help text */

/* Fieldsets and Legends */
/* border-none - Remove default fieldset border */
/* p-0 m-0 - Remove default fieldset padding/margin */

/* Checkbox and Radio Styling */
/* w-4 h-4 - Checkbox/radio size */
/* text-blue-600 - Checked color */
/* bg-gray-100 border-gray-300 - Default colors */
/* rounded - Checkbox corners (rounded-full for radio) */
/* focus:ring-blue-500 - Focus ring color */

/* File Input Styling */
/* file:mr-4 file:py-2 file:px-4 - File button styling */
/* file:rounded-lg file:border-0 - File button appearance */
/* file:bg-blue-50 file:text-blue-700 - File button colors */
/* file:hover:bg-blue-100 - File button hover */

/* Form Validation */
/* invalid:border-red-500 - HTML5 validation styling */
/* valid:border-green-500 - Valid state styling */

/* Responsive Design */
/* sm:grid-cols-2 md:grid-cols-3 - Responsive columns */
/* space-y-4 sm:space-y-0 sm:space-x-4 - Responsive spacing */

/* Dark Mode */
/* dark: prefix - All form elements support dark mode */
/* Consistent color scheme across all form elements */

/* Animation Support */
/* transition-all duration-200 - Smooth transitions */
/* animate-spin - Loading spinner animation */

/* Accessibility Features */
/* focus:ring-2 focus:ring-offset-2 - Keyboard focus indicators */
/* sr-only - Screen reader only text */
/* aria-describedby - Associate help text with inputs */

/* Benefits of using Tailwind CSS: */
/* - Consistent form styling across the application */
/* - Built-in responsive design utilities */
/* - Comprehensive dark mode support */
/* - Accessibility-friendly focus states */
/* - Easy customization without writing CSS */
/* - Form validation state styling */
/* - Modern, clean form appearance */`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  error?: string;
  options?: { value: any; label: string }[];
  multiple?: boolean;
  pattern?: string;
  description?: string;
  min?: number;
  max?: number;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  formData: any = {};
  formErrors: { [key: string]: string } = {};
  isSubmitting = false;
  submitSuccess = false;

  formFields: FormField[] = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$'
    },
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { value: '', label: 'Select your country' },
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' }
      ]
    }
  ];

  onFieldChange(fieldId: string, value: any): void {
    this.formData[fieldId] = value;
    this.validateField(fieldId);
  }

  onFieldBlur(fieldId: string): void {
    this.validateField(fieldId);
  }

  validateField(fieldId: string): void {
    const field = this.formFields.find(f => f.id === fieldId);
    if (!field) return;

    const value = this.formData[fieldId];
    let error = '';

    // Required validation
    if (field.required && (!value || value.trim() === '')) {
      error = \`\${field.label} is required\`;
    }
    // Pattern validation
    else if (value && field.pattern) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        error = \`\${field.label} format is invalid\`;
      }
    }
    // Number range validation
    else if (field.type === 'number' && value) {
      const num = Number(value);
      if (field.min !== undefined && num < field.min) {
        error = \`\${field.label} must be at least \${field.min}\`;
      } else if (field.max !== undefined && num > field.max) {
        error = \`\${field.label} must be at most \${field.max}\`;
      }
    }

    if (error) {
      this.formErrors[fieldId] = error;
    } else {
      delete this.formErrors[fieldId];
    }
  }

  validateForm(): boolean {
    this.formErrors = {};
    
    this.formFields.forEach(field => {
      this.validateField(field.id);
    });

    return Object.keys(this.formErrors).length === 0;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      console.log('Form submitted:', this.formData);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 3000);
    }, 2000);
  }

  resetForm(): void {
    this.formData = {};
    this.formErrors = {};
    this.submitSuccess = false;
  }

  getFieldClasses(field: FormField): string {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';
    const errorClasses = this.formErrors[field.id] ? 'border-red-500' : 'border-gray-300';
    const disabledClasses = field.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
    
    return \`\${baseClasses} \${errorClasses} \${disabledClasses}\`;
  }
}

// Key Features:
// 1. Dynamic form field generation
// 2. Real-time validation
// 3. Error state handling
// 4. Responsive layouts
// 5. Accessibility support
// 6. Dark mode compatibility
// 7. TypeScript interfaces for type safety
// 8. Custom validation patterns
// 9. Loading states
// 10. Success feedback`;
  }
}