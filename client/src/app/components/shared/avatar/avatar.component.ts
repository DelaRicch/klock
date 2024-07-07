import {
  Component,
  computed,
  HostBinding,
  HostListener,
  inject,
  signal
} from "@angular/core";
import { DropdownMenuComponent } from "@components/shared/dropdown-menu/dropdown-menu.component";
import { GetInitialsPipe } from "@pipes/get-initials.pipe";
import { AuthService } from "@services/auth/auth.service";
import { ClickOutsideDirective } from "@directives/click-outside/click-outside.directive";
import {
  fadeTransitionAnimation
} from "@helpers/animations";

@Component({
  selector: "klock-avatar",
  standalone: true,
  imports: [GetInitialsPipe, DropdownMenuComponent, ClickOutsideDirective],
  template: `
    @if (userPhoto()) {
      <img [src]="userPhoto()" class="w-full h-full" [alt]="userName()" />
    } @else {
      {{ userName() | getInitials }}
    }
    @if (displayMenu()) {
      <klock-dropdown-menu
        klockClickOutside
        (hideOpenComponent)="displayMenu.set(false)"
        @fadeTransition
        ></klock-dropdown-menu>
    }
  `,

  animations: [fadeTransitionAnimation]
})
export class AvatarComponent {
  displayMenu = signal(false);
  authService = inject(AuthService);
  userName = computed(() => {
    return this.authService.getUserProfile().name as string;
  });

  userPhoto = computed(() => {
    return this.authService.getUserProfile().photo as string;
  });

  @HostBinding("class") get hostClass() {
    return "w-14 h-14 rounded-full flex items-center justify-center relative bg-slate-200 border-2 border-white cursor-pointer";
  }

  @HostBinding("role") role = "button";

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    event.stopPropagation();
    console.log("clicked");
    this.displayMenu.set(!this.displayMenu());
  }
}
