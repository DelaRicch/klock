import { Injectable, signal } from '@angular/core';
import { AlertProps } from '@type/types';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
   alert = signal<AlertProps>({display: false, status: "success", title: "", message: ""})
   dropdownMenu = signal<boolean>(false);

  showAlert(alert: AlertProps) {
    this.alert.set(alert);
  }

  toggleDropdown() {
    this.dropdownMenu.set(!this.dropdownMenu());
  }

  closeDropdown() {
    this.dropdownMenu.set(false);
  }
}
