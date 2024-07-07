import { animate, style, transition, trigger } from "@angular/animations";
import { Component, HostBinding, Input, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { ClickOutsideDirective } from "@directives/click-outside/click-outside.directive";
import { cn } from "../../../helpers/helpers";

@Component({
  selector: "klock-select",
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent, ClickOutsideDirective],
  animations: [
    trigger("menuAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate(
          "250ms ease-in",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),

      transition(":leave", [
        animate(
          "250ms ease-out",
          style({ opacity: 0, transform: "translateY(-20px)" })
        )
      ])
    ])
  ],
  template: `
    @if (label !== "") {
      <span class="text-grey-G800 font-medium capitalize line-clamp-1">{{
        label
      }}</span>
    }

    <span
      role="button"
      (click)="openDropdown.set(!openDropdown())"
      [class]="
        cn(
          'w-full flex items-center justify-between rounded-lg text-capitalize transition-all duration-200 ease-linear h-12 px-4 focus:ring-2 hover:ring-2 ring-offset-2 ring-blue-B800 hover:ring-blue-B800 outline-none border border-grey-G600',
          {
            ' ring-error ring-2 ring-offset-2 border-error hover:ring-error hover:border-error text-error':
              control.invalid && (control.touched || control.dirty)
          },
          className
        )
      "
    >
      <span
        [class]="
          cn('text-grey-G400 line-clamp-1', {
            'text-grey-G800': selectedVal()
          })
        "
        >{{
          selectedVal().charAt(0).toUpperCase() + selectedVal().slice(1) ||
            placeholder.charAt(0).toUpperCase() + placeholder.slice(1)
        }}</span
      >
      <klock-svg-icon
        [class]="
          cn('transform -rotate-90 transition-all duration-300 ease-linear', {
            'rotate-90': openDropdown()
          })
        "
        svgName="arrow-left"
      ></klock-svg-icon>
    </span>

    @if (openDropdown()) {
      <div
        klockClickOutside="klock-select"
        (hideOpenComponent)="openDropdown.set(false)"
        [@menuAnimation]="openDropdown()"
        class=" flex flex-col gap-2 absolute top-24 rounded-md overflow-clip py-2 left-0 w-full z-20 shadow-black/40 shadow-md bg-white"
      >
        @for (option of options; track option) {
          <span
            (click)="
              [
                selectedVal.set(option),
                control.setValue(option),
                openDropdown.set(false)
              ]
            "
            role="button"
            class="outline-none transition-all duration-200 ease-linear h-10 py-2 px-4 hover:bg-grey-G100 line-clamp-1"
            >{{ option.charAt(0).toUpperCase() + option.slice(1) }}</span
          >
        }
      </div>
    }
  `
})
export class SelectComponent {
  cn = cn;

  @Input() className = "";
  @Input() label = "";
  @Input() placeholder = "";
  @Input() id = "";
  @Input() control = new FormControl();
  @Input() options = [] as string[];

  selectedVal = signal("");
  openDropdown = signal(false);
  isInvalid = signal(false);

  @HostBinding("class") get hostClass() {
    return "flex flex-col gap-2 h-24 relative";
  }

  setError() {
    this.selectedVal() === "" && !this.openDropdown() && this.control.invalid
      ? this.isInvalid.set(true)
      : this.isInvalid.set(false);
  }
}
