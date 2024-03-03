import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonRippleDirective } from '@directives/button-ripple/button-ripple.directive';

@Component({
  selector: 'klock-button',
  standalone: true,
  imports: [ButtonRippleDirective, NgClass],
  template: `
    <button
      (click)="handleButtonClick()"
      appButtonRipple
      [isRipple]="isRipple"
      [ngClass]="{
        'w-10 h-10 rounded-lg hover:border-[#686868] border border-transparent bg-transparent': isIcon,
        'w-full h-11 rounded-md  gap-2 px-4': !isIcon,
        'bg-button text-white': variant === 'primary',
        'bg-transparent text-black': variant === 'secondary',
        'bg-error': variant === 'error',
        'bg-opacity-60 hover:bg-opacity-60, cursor-not-allowed': isDisabled,
        'bg-opacity-90 hover:bg-opacity-100': !(isDisabled && isIcon),
      }"
      [class]="className"
      [disabled]="isDisabled"
      class="flex items-center justify-center text-white hover:ring-1 ring-offset-2 hover:ring-blue focus:ring-1 focus:ring-blue outline-none"
    >
      <ng-content></ng-content>
      @if(isLoading) {
      <span
        class="w-4 h-4 rounded-full border-2 border-t-transparent border-slate-200 animate-spin"
      ></span>
      }
      {{ label }}
    </button>
  `,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() isIcon = false;
  @Input() isRipple = false;
  @Input() className = '';
  @Input() variant: 'primary' | 'secondary' | 'error' = 'primary';
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() buttonClick = new EventEmitter();

  handleButtonClick() {
    this.buttonClick.emit();
  }
}
