import { Injectable, signal } from '@angular/core';

import { DropdownItemProp, UserInfoType } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  user = {} as UserInfoType;

  dropdownMenu = signal<boolean>(false);
  dropdownItems = signal<DropdownItemProp[]>([]);


  toggleDropdown() {
    this.dropdownMenu.set(!this.dropdownMenu());
  }

  closeDropdown() {
    this.dropdownMenu.set(false);
  }
}
