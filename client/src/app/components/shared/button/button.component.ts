import { NgClass } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ButtonRippleDirective } from '@directives/button-ripple/button-ripple.directive';
import { cn } from '@utils/helpers';

@Component({
  selector: 'klock-button',
  standalone: true,
  imports: [ButtonRippleDirective, NgClass],
  hostDirectives: [{ directive: ButtonRippleDirective, inputs: ['isRipple'] }],
  template: `
    <ng-content></ng-content>
    @if(isLoading) {
    <span
      [class]="cn('w-4 h-4 rounded-full border-2 border-t-transparent border-blue-B800 animate-spin', loaderClassName)"
    ></span>
    }
    {{ label }}
  `,
})
export class ButtonComponent {
  @Input() label = '';
  @Input() isIcon = false;
  @Input() isRipple = false;
  @Input() className = '';
  @Input() loaderClassName = "";
  @Input() isLoading = false;
  @Input() disabled = false;

  cn = cn;

  @HostBinding('class') get hostClass() {
    return cn(
      'flex h-11 w-full px-4 gap-2 border-2 items-center justify-center transition all duration-200 ease-linear rounded-lg bg-grey-G800 text-white uppercase hover:ring-1 ring-offset-2 hover:ring-blue-B800 focus:ring-1 focus:ring-blue-B800 outline-none',
      {
        'w-10 h-10 rounded-lg hover:border-grey-G300 border border-transparent bg-transparent':
          this.isIcon,
        // 'w-full h-11 rounded-md  gap-2 px-4': !this.isIcon,
        'bg-opacity-80 hover:bg-opacity-80, cursor-not-allowed ring-offset-0 hover:ring-transparent hover:ring-0 focus:ring-0 focus:ring-transparent':
          this.disabled,
      },
      this.className
    );
  }
}
