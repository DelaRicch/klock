import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'klock-progress',
  standalone: true,
  template: `
    <span [style.width]="(remainingProducts / totalQuantity) * 100 + '%'" class="absolute left-0 top-0 h-full bg-green-G100"></span>
  `,
})
export class ProgressComponent {
  @Input() totalQuantity = 0;
  @Input() remainingProducts = 0;


  @HostBinding("class") get hostClass() {
    return "rounded-2xl w-[5rem] h-[4.5px] relative bg-grey-G300 overflow-clip";
  }

  @HostBinding("title") get hostTitle() {
    return `Remaining products: ${this.remainingProducts}`
  }
}
