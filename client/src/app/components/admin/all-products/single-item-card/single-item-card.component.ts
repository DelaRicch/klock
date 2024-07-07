import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {Component, computed, HostBinding, Input} from '@angular/core';
import {ProgressComponent} from '@components/shared/progress/progress.component';
import {SvgIconComponent} from '@components/shared/svg-icon/svg-icon.component';

@Component({
  selector: 'klock-single-item-card',
  standalone: true,
  imports: [SvgIconComponent, ProgressComponent, CurrencyPipe, NgOptimizedImage],
  template: `
    <section class="flex gap-4">
      <div class="w-[84px] h-[75px] border-2 border-white  overflow-clip relative">

        <img
          [ngSrc]="productImage"
          [alt]="productName"
          class="w-full h-full absolute"
          priority
            [fill]="true"
        />
      </div>
      <div class="flex flex-col justify-between">
        <span class="flex flex-col">
          <span class="font-semibold capitalize line-clamp-1">{{
              productName
            }}</span>
<!--          <span class="text-[#667085] line-clamp-1">{{-->
<!--              productDescription-->
<!--            }}</span>-->
        </span>
        <span class="font-semibold">{{ productPrice | currency : 'USD' }}</span>
      </div>
    </section>
    <div class="flex flex-col gap-3">
      <span class="capitalize font-semibold">summary</span>
      <span class="text-[#667085] line-clamp-2">{{ productSummary }}</span>
    </div>
    <section
      [title]="'Remaining products: ' + remainingProducts()"
      class="border-2 rounded-lg w-full mx-auto p-4 divide-y-2 flex flex-col gap-1.5"
    >
      <div class="flex items-center justify-between">
        <span class="font-semibold text-grey-G600">Sales</span>
        <div class="flex item-center gap-2">
          <klock-svg-icon
            svgName="arrow-up"
            color="#05CD99"
            stroke="#05CD99"
          ></klock-svg-icon>
          <span class="font-semibold text-grey-G600">{{ productSales }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span
          class="text-grey-G600 font-semibold text-sm capitalize line-clamp-1"
        >remaining products</span
        >
        <div class="flex items-center gap-2">
          <klock-progress
            [totalQuantity]="totalProducts"
            [remainingProducts]="remainingProducts()"
          ></klock-progress>
          <span class="font-semibold text-grey-G600">{{ totalProducts }}</span>
        </div>
      </div>
    </section>
  `,
})
export class SingleItemCardComponent {
  @Input() productName = '';
  @Input() productImage = '';
  @Input() productDescription = '';
  @Input() productPrice = 0;
  @Input() productSummary = '';
  @Input() totalProducts = 0;
  @Input() productSales = 0;


  remainingProducts = computed(() => {
    return Number(this.totalProducts - this.productSales);
  });

  @HostBinding('class') get HostClass() {
    return 'bg-[#FAFAFA] w-full h-[315px] p-4 rounded-xl flex flex-col gap-4';
  }

  @HostBinding('title') get hostTitle() {
    return `${this.productName}`;
  }
}
