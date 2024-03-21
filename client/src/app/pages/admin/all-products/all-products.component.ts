import { Component, HostBinding } from '@angular/core';
import { SingleItemCardComponent } from '@components/admin/all-products/single-item-card/single-item-card.component';
import { ButtonComponent } from '@components/shared/button/button.component';

@Component({
  selector: 'klock-all-products',
  standalone: true,
  imports: [ButtonComponent, SingleItemCardComponent],
  template: `
    <div class="flex justify-between items-center px-2.5">
      <h2 class="text-2xl font-semibold capitalize">all products</h2>
      <klock-button
        [isRipple]="true"
        label="add new product"
        className="font-bold capitalize bg-[#1D2939]"
      ></klock-button>
    </div>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
      <klock-single-item-card></klock-single-item-card>
    </section>
  `,
  styles: ``,
})
export class AllProductsComponent {
  @HostBinding('class') get HostClass() {
    return 'container flex flex-col gap-8 py-5 px-4 border-2 border-red-500';
  }
}
