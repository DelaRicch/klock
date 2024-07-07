import { Component, HostBinding, Input } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'klock-empty',
  standalone: true,
  imports: [LottieComponent],
  template: ` 
    <ng-lottie class="w-[300px] h-[300px]" [options]="options" /> 
    <span class="text-grey-G500 max-w-[300px] text-center mx-auto capitalize -mt-14 font-semibold text-sm italic">{{ message }}</span>
  `,
})
export class EmptyComponent {

  @Input() message = "no item provided..." 

  options: AnimationOptions = {
    path: '/assets/lottie/empty-state.json',
    autoplay: true,
    loop: true,
  };

  @HostBinding('class') get hostClass() {
    return 'flex flex-col gap-4 w-max';
  }
}
