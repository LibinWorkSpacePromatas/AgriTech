import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="modal-backdrop" *ngIf="isOpen" (click)="onBackdropClick($event)">
      <div class="modal-content fade-in-up">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="close-btn" (click)="close.emit()">
            <i-lucide [img]="XIcon" size="20"></i-lucide>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .modal-content {
      background: white;
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 600px;
      box-shadow: var(--shadow-xl);
      overflow: hidden;
      animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: var(--gray-900);
    }

    .close-btn {
      background: transparent;
      border: none;
      color: var(--gray-500);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--radius-md);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      background: var(--gray-100);
      color: var(--gray-700);
    }

    .modal-body {
      padding: 1.5rem;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class ModalComponent {
    @Input() isOpen: boolean = false;
    @Input() title: string = '';
    @Output() close = new EventEmitter<void>();

    XIcon = X;

    onBackdropClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
            this.close.emit();
        }
    }
}
