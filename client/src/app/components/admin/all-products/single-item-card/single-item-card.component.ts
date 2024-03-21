import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'klock-single-item-card',
  standalone: true,
  imports: [],
  template: `
    <div class="flex gap-4">
      <span class="w-[84px] h-[75px] border-2 border-white"></span>
      <div class="flex flex-col justify-between">
        <span class="flex flex-col">
          <span class="font-semibold capitalize">Breitling leather</span>
          <span class="text-[#667085]">DV One automatic 43mm</span>
        </span>
        <span class="font-semibold">$50</span>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <span class="capitalize font-semibold">summary</span>
      <span class="text-[#667085]">Breitling Leather for displaying House Motifs</span>
    </div>
    <div class="border-2 rounded-lg w-9/12 mx-auto"></div>
  `,
})
export class SingleItemCardComponent {
  @HostBinding('class') get HostClass() {
    return 'bg-[#FAFAFA] w-full h-[315px] p-4 rounded-xl flex flex-col gap-4';
  }
}
