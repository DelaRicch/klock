import { selectUser } from '@store/user/user.selector';
import { UserInfoType } from '@type/types';
import { Component } from '@angular/core';
import { GetInitialsPipe } from '@pipes/get-initials.pipe';
import { Store } from '@ngrx/store';
import { DropdownService } from '@services/dropdown/dropdown.service';

@Component({
  selector: 'klock-avatar',
  standalone: true,
  imports: [GetInitialsPipe],
  template: `
    <div
      (click)="toggleDropdownUserMenu()"
      id="avatar"
      class="w-14 h-14 rounded-full flex items-center justify-center bg-slate-200 border-2 border-white cursor-pointer"
    >
      @if (user.photo !== "") {
      <img [src]="user.photo" class="w-full h-full" [alt]="user.name" />
      } @else {
      {{ user.name | getInitials }}
      }
    </div>
  `,
})
export class AvatarComponent {
  user = {} as UserInfoType;

  constructor(private store: Store, private dropdownService: DropdownService) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  toggleDropdownUserMenu() {
    this.dropdownService.toggleDropdown();
  }
}
