import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonRippleDirective } from '@directives/button-ripple/button-ripple.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonRippleDirective, NgClass],
  template: `
    <button
      appButtonRipple
      [isRipple]="isRipple"
      [ngClass]="{
        'w-9 h-9': isIcon,
        'w-full h-9': !isIcon,
        'bg-button': variant === 'primary',
        'bg-error': variant === 'error',
        'bg-opacity-60 hover:bg-opacity-60, cursor-not-allowed': isDisabled,
        'bg-opacity-90 hover:bg-opacity-100': !(isDisabled && isIcon),
      }"
      [class]="className"
      [disabled]="isDisabled"
      class="rounded-md flex items-center justify-center gap-2 px-4 text-white hover:ring-1 ring-offset-2 hover:ring-blue focus:ring-1 focus:ring-blue outline-none"
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
  @Input() label = 'button';
  @Input() isIcon = false;
  @Input() isRipple = false;
  @Input() className = '';
  @Input() variant: 'primary' | 'secondary' | 'error' = 'primary';
  @Input() isLoading = false;
  @Input() isDisabled = false;
}
