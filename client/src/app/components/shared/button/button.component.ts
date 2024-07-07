import {
  Component,
  computed,
  HostBinding,
  HostListener,
  inject,
  input,
  output,
} from "@angular/core";
import { LoaderComponent } from "../loader/loader.component";
import { cn } from "@helpers/helpers";
import { LoaderService } from "@services/loader/loader.service";

@Component({
  selector: "klock-button",
  standalone: true,
  template: `
    <ng-content select="button-icon"></ng-content>
    @if (isLoading()) {
      <klock-loader class="transform scale-90" color="white"></klock-loader>
    }
    <ng-content select="button-label"></ng-content>
  `,
  imports: [LoaderComponent]
})
export class ButtonComponent {
  loaderService = inject(LoaderService);
  isLoading = computed(() => this.loaderService.getInlineLoader());

  isIcon = input(false);
  className = input("");
  disabled = input(false);
  dataAttributes = input<{ [key: string]: string }>({});
  ariaLabel = input("");
  buttonClick = output<Event>();

  cn = cn;

  @HostBinding("class") get hostClass() {
    return cn(
      "active:bg-grey-G400 button cursor-pointer flex h-11 w-full px-4 gap-2 items-center justify-center transition all duration-200 ease-linear rounded-lg bg-grey-G800 text-white uppercase hover:ring-1 ring-offset-2 hover:ring-blue-B800 focus:ring-1 focus:ring-blue-B800 outline-none",
      {
        "w-10 h-10 rounded-lg hover:border-grey-G300 border inline-block grid place-items-center border-transparent bg-transparent":
          this.isIcon(),
        "bg-opacity-80 hover:bg-opacity-80, cursor-not-allowed ring-offset-0 hover:ring-transparent hover:ring-0 focus:ring-0 focus:ring-transparent":
          this.disabled() || this.isLoading()
      },
      this.className()
    );
  }

  @HostBinding("style") get hostStyle() {
    return `pointer-events: ${this.disabled() ? "none" : "auto"}`;
  }

  @HostBinding("tabindex") get hostTabIndex() {
    return this.disabled() ? null : "0";
  }

  @HostBinding("role") get hostRole() {
    return "button";
  }

  @HostBinding("attr.aria-label") get hostAriaLabel() {
    return this.ariaLabel() || null;
  }

  @HostBinding("attr.data-") get hostDataAttributes(): {
    [key: string]: string;
  } {
    const dataAttrs: { [key: string]: string } = {};
    Object.keys(this.dataAttributes).forEach((key) => {
      dataAttrs[`data-${key}`] = this.dataAttributes()[key];
    });
    return dataAttrs;
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  @HostListener("click", ["$event"])
  handleClick(event: Event) {
    if (!this.disabled()) {
      this.buttonClick.emit(event);
    }
  }
}
