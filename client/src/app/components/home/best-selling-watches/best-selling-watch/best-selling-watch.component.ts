import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'klock-best-selling-watch',
  standalone: true,
  imports: [],
  template: `
    <div class="star-rating bg-red-200">
  <!-- <i class="fa fa-star" *ngFor="let star of stars"></i>
  <i class="fa fa-star-half" *ngIf="rating % 1 !== 0"></i> -->
  <i class="fa fa-star-half"></i>
  <i class="fa-solid fa-star"></i>
  fsddf
</div>
  `,
})
export class BestSellingWatchComponent {
  @HostBinding("class") get hostClass() {
    return "flex flex-col gap-2"
  } 
}
