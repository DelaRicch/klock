import { Component, HostBinding, Input } from "@angular/core";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { cn } from "../../../helpers/helpers";

@Component({
  selector: "klock-sales-graph-tooltip",
  standalone: true,
  imports: [SvgIconComponent],
  template: `
    <span
      class="text-white font-bold text-xs z-[100] absolute top-[15%] left-[50%] transform -translate-x-[50%]"
      >{{ "$" + value.toFixed(2) }}</span
    >
    <klock-svg-icon svgName="tooltip"></klock-svg-icon>
  `
})
export class SalesGraphTooltipComponent {
  cn = cn;

  @Input() top = 0;
  @Input() left = 0;
  @Input() value = 108.0;

  @HostBinding("class") get hostClass() {
    return cn("absolute z-[60] w-max h-max");
  }

  @HostBinding("style") get hostStyle() {
    return `left: ${this.left - 29}px; top: ${this.top + 60}px`;
  }
}
