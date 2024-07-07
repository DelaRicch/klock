import { Component, HostBinding, OnInit, signal } from "@angular/core";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { ClickOutsideDirective } from "@directives/click-outside/click-outside.directive";
import { cn } from "../../helpers/helpers";

@Component({
  selector: "klock-year-picker",
  standalone: true,
  imports: [ClickOutsideDirective, SvgIconComponent],
  template: `
    <span
      role="button"
      (click)="displayDropdown.set(!displayDropdown())"
      class="w-full flex items-center justify-center gap-3 h-[37px] rounded-lg py-2 bg-grey-G50 cursor-pointer"
    >
      <klock-svg-icon svgName="calendar" color="#1D2939"></klock-svg-icon>

      <span class="font-semibold text-grey-G800 pointer-events-none">{{
        selectedYear()
      }}</span>
    </span>
    @if (displayDropdown()) {
      <div
        klockClickOutside="klock-year-picker"
        (hideOpenComponent)="displayDropdown.set(false)"
        class="grid grid-cols-2 gap-3 p-2 max-h-[15rem] overflow-y-auto rounded-lg bg-white shadow-md"
      >
        @for (year of years(); track year) {
          <button
            (click)="selectActiveYear(year)"
            [class]="
              cn(
                'p-1 outline-blue-B500 rounded-md transition-all duration-200 ease-linear border border-transparent hover:border-blue-B500',
                {
                  'bg-blue-B500 text-white': year === selectedYear()
                }
              )
            "
          >
            {{ year }}
          </button>
        }
      </div>
    }
  `
})
export class YearPickerComponent implements OnInit {
  years = signal<number[]>([]);
  selectedYear = signal<number>(new Date().getFullYear());

  displayDropdown = signal(false);

  cn = cn;

  @HostBinding("class") get hostClass() {
    return "flex flex-col gap-4 w-[130px] z-50";
  }

  selectActiveYear(year: number) {
    this.selectedYear.set(year);
    this.displayDropdown.set(false);
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;
    const endYear = currentYear + 20;
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    this.years.set(years);
  }
}
