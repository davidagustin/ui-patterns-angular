import { Component } from '@angular/core';

interface ModalConfig {
  title: string;
  content: string;
  type: 'default' | 'success' | 'warning' | 'danger';
  size: 'small' | 'medium' | 'large' | 'fullscreen';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isModalOpen = false;
  isSecondModalOpen = false;
  isFormModalOpen = false;

  modalConfig: ModalConfig = {
    title: 'Sample Modal',
    content: 'This is a sample modal with some content to demonstrate the modal pattern.',
    type: 'default',
    size: 'medium'
  };

  formData = {
    name: '',
    email: '',
    message: ''
  };

  openModal(): void {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  openSecondModal(): void {
    this.isSecondModalOpen = true;
  }

  closeSecondModal(): void {
    this.isSecondModalOpen = false;
  }

  openFormModal(): void {
    this.isFormModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onSecondModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeSecondModal();
    }
  }

  onFormModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeFormModal();
    }
  }

  submitForm(): void {
    console.log('Form submitted:', this.formData);
    this.closeFormModal();
    this.formData = { name: '', email: '', message: '' };
  }

  get htmlCode(): string {
    return `<!-- Modal Overlay -->
<div class="modal-overlay" *ngIf="isModalOpen" (click)="onModalBackdropClick($event)">
  <div class="modal-container">
    <!-- Modal Header -->
    <div class="modal-header">
      <h2 class="modal-title">{{ modalConfig.title }}</h2>
      <button class="modal-close" (click)="closeModal()">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
        </svg>
      </button>
    </div>

    <!-- Modal Body -->
    <div class="modal-body">
      <p>{{ modalConfig.content }}</p>
    </div>

    <!-- Modal Footer -->
    <div class="modal-footer">
      <button class="btn btn-secondary" (click)="closeModal()">
        Cancel
      </button>
      <button class="btn btn-primary" (click)="closeModal()">
        Confirm
      </button>
    </div>
  </div>
</div>

<!-- Trigger Buttons -->
<div class="modal-triggers">
  <button class="btn btn-primary" (click)="openModal()">
    Open Modal
  </button>
  
  <button class="btn btn-success" (click)="openFormModal()">
    Open Form Modal
  </button>
</div>`;
  }

  get scssCode(): string {
    return `/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modalFadeIn 0.3s ease-out;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.8);
  }
}

/* Modal Container */
.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease-out;

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 640px) {
    width: 95%;
    max-height: 85vh;
  }
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #374151;
  }
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: #6b7280;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;

    &:hover {
      background: #374151;
      color: #f3f4f6;
    }
  }
}

/* Modal Body */
.modal-body {
  padding: 24px;
  color: #6b7280;
  line-height: 1.6;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
}

/* Modal Footer */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;

  @media (prefers-color-scheme: dark) {
    border-top-color: #374151;
    background: #111827;
  }
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &.btn-primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &.btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background: #e5e7eb;
    }

    @media (prefers-color-scheme: dark) {
      background: #374151;
      color: #f9fafb;
      border-color: #4b5563;

      &:hover {
        background: #4b5563;
      }
    }
  }

  &.btn-success {
    background: #10b981;
    color: white;

    &:hover {
      background: #059669;
    }
  }
}

/* Animations */
@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`;
  }

  get typescriptCode(): string {
    return `import { Component } from '@angular/core';

interface ModalConfig {
  title: string;
  content: string;
  type: 'default' | 'success' | 'warning' | 'danger';
  size: 'small' | 'medium' | 'large' | 'fullscreen';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isModalOpen = false;
  isFormModalOpen = false;

  modalConfig: ModalConfig = {
    title: 'Sample Modal',
    content: 'This is a sample modal with some content to demonstrate the modal pattern.',
    type: 'default',
    size: 'medium'
  };

  formData = {
    name: '',
    email: '',
    message: ''
  };

  openModal(): void {
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  openFormModal(): void {
    this.isFormModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  onModalBackdropClick(event: Event): void {
    // Close modal when clicking on backdrop
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onFormModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeFormModal();
    }
  }

  submitForm(): void {
    console.log('Form submitted:', this.formData);
    this.closeFormModal();
    // Reset form data
    this.formData = { name: '', email: '', message: '' };
  }

  // Handle escape key to close modal
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.isModalOpen) {
        this.closeModal();
      }
      if (this.isFormModalOpen) {
        this.closeFormModal();
      }
    }
  }

  ngOnInit(): void {
    // Listen for escape key globally
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    // Clean up event listener
    document.removeEventListener('keydown', this.onKeyDown.bind(this));
    // Ensure body scroll is restored
    document.body.style.overflow = 'auto';
  }
}`;
  }
}