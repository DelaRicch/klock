import { Component, HostBinding, inject, signal } from "@angular/core";
import { cn } from "../../../helpers/helpers";
import { ButtonComponent } from "@components/shared/button/button.component";
import { RouterLink } from "@angular/router";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { ClickOutsideDirective } from "@directives/click-outside/click-outside.directive";
import { CategoriesDropdownComponent } from "@components/shared/categories-dropdown/categories-dropdown.component";
import { AuthService } from "@services/auth/auth.service";
import { AvatarComponent } from "@components/shared/avatar/avatar.component";
import { fadeTransitionAnimation } from "@helpers/animations";

@Component({
  selector: "klock-header",
  standalone: true,
  imports: [
    ButtonComponent,
    AvatarComponent,
    RouterLink,
    SvgIconComponent,
    ClickOutsideDirective,
    CategoriesDropdownComponent
  ],
  animations: [fadeTransitionAnimation],
  template: `
    <a
      routerLink="/"
      class="transform scale-75 px-2 py-1 -mr-10 -ml-6 g:ml-0 lg:mr-0 lg:scale-90"
    >
      <klock-svg-icon svgName="klock-logo-black"></klock-svg-icon>
    </a>
    <ul class="flex items-center gap-3 lg:gap-6 text-grey-G500">
      @for (navItem of navItems; track navItem.id) {
        <li
          (click)="selectNavigation($event, navItem.name)"
          [id]="navItem.id"
          tabindex="0"
          class="flex items-center gap-1 capitalize cursor-pointer relative after:absolute after:-bottom-3 after:h-[1.5px] after:left-0 after:bg-grey-G500 after:w-0 px-2 py-1 hover:after:w-full after:transition-all after:duration-200 after:ease-linear"
        >
          <span>{{ navItem.name }}</span>
          @if (navItem.isDropdown) {
            <klock-svg-icon
              [class]="
                cn('transform transition-all duration-200 ease-linear', {
                  'rotate-180': displayDropdown()
                })
              "
              svgName="short-arrow-down"
            ></klock-svg-icon>
          }
        </li>
      }
    </ul>

    <div class="flex item-center gap-3">
      @for (button of actionButtons; track button.id) {
        <klock-button
          [id]="button.id"
          [isIcon]="true"
          class="bg-white border-none rounded-md lg:rounded-lg w-7 h-7 lg:w-10 lg:h-10"
        >
          <klock-svg-icon
            ngProjectAs="button-icon"
            class="transform scale-90"
            [svgName]="button.icon"
          ></klock-svg-icon>
        </klock-button>
      }
    </div>
    <div class="flex items-center gap-4 -ml-8">
      @if (authService.isAuthenticated()) {
        <klock-avatar></klock-avatar>
      } @else {
        <a routerLink="sign-in" class="text-blue-B500 flex items-center">
          Login / Register
        </a>
      }
    </div>

    @if (displayDropdown()) {
      <klock-categories-dropdown
        @fadeTransition
        klockClickOutside
        (hideOpenComponent)="displayDropdown.set(false)"
      ></klock-categories-dropdown>
    }
  `
})
export class HeaderComponent {
  cn = cn;

  authService = inject(AuthService);

  navItems = [
    { id: 1, name: "home", isDropdown: false },
    { id: 2, name: "categories", isDropdown: true },
    { id: 3, name: "blog", isDropdown: false },
    { id: 4, name: "about", isDropdown: false },
    { id: 5, name: "contact", isDropdown: false }
  ];

  actionButtons = [
    { id: 1, icon: "search" },
    { id: 2, icon: "cart" },
    { id: 3, icon: "heart" }
  ];

  displayDropdown = signal(false);

  @HostBinding("class") get hostClass() {
    return "w-full sticky top-0 z-50 bg-white h-[91px] p-3 hidden md:flex items-center justify-center gap-8 lg:gap-14 xl:gap-20 text-sm lg:text-base font-bold relative border";
  }

  selectNavigation(event: Event, route: string) {
    event.stopPropagation();
    console.log(route);
    if (route === "categories") {
      this.displayDropdown.set(!this.displayDropdown());
    } else {
      document.body.click();
    }
  }
}
