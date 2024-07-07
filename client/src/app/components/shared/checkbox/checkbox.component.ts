import {
  Component,
  HostBinding,
  HostListener,
  input,
  signal
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";

@Component({
  selector: "klock-checkbox",
  standalone: true,
  imports: [SvgIconComponent],
  template: `
    <span
      class="rounded transition duration-200 ease-linear h-4 w-4 focus:ring-2 group-hover:ring-2 ring-offset-2 ring-blue group-hover:ring-blue outline-none border border-slate-300 bg-white flex items-center justify-center"
    >
      @if (isChecked()) {
        <klock-svg-icon
          svgName="checkbox"
          class="transform scale-75"
        ></klock-svg-icon>
      }
    </span>
    <span>
      {{ label() }}
    </span>
  `
})
export class CheckboxComponent {
  id = input("checkbox-id");
  label = input("label");
  control = input(new FormControl());
  isRequired = input(false);

  isChecked = signal(false);

  @HostBinding("class") get hostClass() {
    return "flex gap-3 items-center cursor-pointer group";
  }

  @HostListener("click", ["$event"])
  toggleCheckbox() {
    this.isChecked.set(!this.isChecked());
    this.control().setValue(this.isChecked());
  }
}
