import { Injectable, signal } from '@angular/core';
import { AlertProps } from '@type/types';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
   alert = signal<AlertProps>({display: false, status: "success", title: "", message: ""})

  showAlert(alert: AlertProps) {
    this.alert.set(alert);
  }


}
