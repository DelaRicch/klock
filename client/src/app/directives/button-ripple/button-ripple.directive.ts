import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appButtonRipple]',
  standalone: true,
})
export class ButtonRippleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const button =this.el.nativeElement.classList.add('relative', 'overflow-hidden')
    const ripple = this.renderer.createElement('span');

    console.log(button);
    
    this.renderer.addClass(ripple, 'ripple');
    this.renderer.setStyle(ripple, 'left', `${event.offsetX - (window.screenX + 50)}px`);
    this.renderer.setStyle(ripple, 'top', `${event.offsetY - (window.screenY + 80)}px`);

    this.renderer.appendChild(this.el.nativeElement, ripple);

    console.log(ripple, this.el.nativeElement)

    const size = Math.max(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);

    ripple.addEventListener('animationend', () => {
      this.renderer.removeChild(this.el.nativeElement, ripple);
    });
  }
}
