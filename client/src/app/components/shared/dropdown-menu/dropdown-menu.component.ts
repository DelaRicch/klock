import { Component, HostBinding, inject, signal } from "@angular/core";
import { DropdownItemProp } from "@type/types";
import { Router } from "@angular/router";

@Component({
  selector: "klock-dropdown-menu",
  standalone: true,

  template: `
        @for (dropdown of dropdownItems; track dropdown.name) {
          <span
            [id]="dropdown?.name"
            class="item cursor-pointer hover:pl-4 transition-all duration-200 ease-linear"
            (click)="handleNavigate(dropdown)"
            >{{ dropdown?.name }}</span
          >
        }
    
  `
})
export class DropdownMenuComponent {
  displayMenu = signal(false);
  dropdownItems = [] as DropdownItemProp[];

  router = inject(Router); 

  @HostBinding("class") get hostClass() {
    return "flex flex-col z-[100] gap-3 rounded-lg shadow-md p-4 w-[250px] cursor-default absolute right-0 top-[4.8rem] bg-white";
  }

  handleNavigate(dropdown: DropdownItemProp) {
    if (dropdown.name === "Log Out") {
      this.router.navigate(["/sign-in"]);
    } else {
      this.router.navigate([`/${dropdown.path}`]);
    }
  }
}
