import { Injectable, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '@store/user/user.selector';
import { DropdownItemProp, UserInfoType } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class DropdownService implements OnInit {
  user = {} as UserInfoType;

  dropdownMenu = signal<boolean>(false);
  dropdownItems = signal<DropdownItemProp[]>([]);

  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });

    if (this.user.role === 'ADMIN') {
      this.dropdownItems.set([
        {
          name: 'Dashboard',
          path: 'dashboard',
        },
        {
          name: 'Users',
          path: 'users',
        },
        {
          name: 'Log Out',
        },
      ]);
    }

    console.log(this.dropdownItems(), this.user);
  }

  toggleDropdown() {
    this.dropdownMenu.set(!this.dropdownMenu());
  }

  closeDropdown() {
    this.dropdownMenu.set(false);
  }

  ngOnInit(): void {
    console.log(this.user);
  }
}
