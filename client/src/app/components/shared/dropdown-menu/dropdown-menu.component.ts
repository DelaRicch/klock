import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, effect } from '@angular/core';
import { AlertService } from '@services/alert/alert.service';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),

      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class DropdownMenuComponent {
  displayMenu = false;

  constructor(
    private alertService: AlertService,
    private elementRef: ElementRef
  ) {
    effect(() => {
      this.displayMenu = this.alertService.dropdownMenu();
    });
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
      this.alertService.closeDropdown();
    }
  }
}
