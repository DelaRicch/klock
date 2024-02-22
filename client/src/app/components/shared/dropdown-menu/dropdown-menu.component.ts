import { AuthService } from '@services/auth/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, effect } from '@angular/core';
import { DropdownService } from '@services/dropdown/dropdown.service';
import { DropdownItemProp } from '@type/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '250ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
        ]),

      transition(':leave', [
        animate(
          '250ms ease-out',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),

  ],
})
export class DropdownMenuComponent {
  displayMenu = false;
  dropdownItems = [] as DropdownItemProp[]

  constructor(
    private dropdownService: DropdownService,
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {
    effect(() => {
      this.displayMenu = this.dropdownService.dropdownMenu();
      this.dropdownItems = this.dropdownService.dropdownItems();
    });

    console.log(this.dropdownItems, "dropdown items")
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (!this.displayMenu) {
      return;
    }
    if (
      targetElement.id !== 'avatar' &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.dropdownService.closeDropdown();
    }
  }

  handleNavigate(dropdown: DropdownItemProp) {
    if (dropdown.name === 'Log Out') {
      this.authService.logOut();
      this.router.navigate(['/sign-in']);
    } else {
      this.router.navigate([`/${dropdown.path}`]);
    }

    this.dropdownService.closeDropdown()
  }

}
