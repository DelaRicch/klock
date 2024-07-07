import { Component, HostBinding } from "@angular/core";
import { BestSellingWatchComponent } from "@components/home/best-selling-watches/best-selling-watch/best-selling-watch.component";

@Component({
  selector: "klock-best-selling-watches",
  standalone: true,
  imports: [BestSellingWatchComponent],
  template: `
    <h2
      class="capitalize font-medium text-md w-max relative after:absolute after:w-full after:h-[1.5px] after:bg-black after:left-0 after:-bottom-2"
    >
      best selling watches
    </h2>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
      <klock-best-selling-watch></klock-best-selling-watch>
    </section>
  `
})
export class BestSellingWatchesComponent {
  @HostBinding("class") get hostClass() {
    return "flex flex-col gap-4 w-11/12 mx-auto py-6";
  }
}
