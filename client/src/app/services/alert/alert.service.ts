import { Injectable, signal } from '@angular/core';
import { AlertProps } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts = signal<AlertProps[]>([])


  showAlert(alert: AlertProps) {
    this.alerts.set([...this.alerts(), alert]);  
    setTimeout(() => {
      this.alerts.update(currentVal => currentVal.filter(el => el.id !== alert.id))
    }, 6000);
  }

}
