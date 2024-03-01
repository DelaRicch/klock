import {
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appButtonRipple]',
  standalone: true,
})
export class ButtonRippleDirective {
  @Input() isRipple: boolean = false;
  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
  
    const x = event.clientX - (event.target as HTMLElement).offsetLeft;
    const y = event.clientY - (event.target as HTMLElement).offsetTop;

    const ripple = document.createElement('span');
    if(this.isRipple) {
    ripple.classList.add('ripple', 'bg-black/30');
    this.el.nativeElement.classList.add('relative', 'ripple-button');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.el.nativeElement.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 500);
    }
    
  }


}
