import { ElementRef } from '@angular/core';
import { ButtonRippleDirective } from './button-ripple.directive';

describe('ButtonRippleDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = new ElementRef(null);
    const directive = new ButtonRippleDirective(el);
    expect(directive).toBeTruthy();
  });
});
