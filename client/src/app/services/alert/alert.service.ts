import { Injectable, signal } from '@angular/core';
import { AlertProps } from '@type/types';
import { GraphQLError } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = signal<AlertProps>({
    display: false,
    status: 'success',
    title: '',
    message: '',
  });

  showAlert(alert: AlertProps) {
    this.alert.set(alert);

    setTimeout(() => {
      this.alert.set({
        display: false,
        status: 'success',
        title: '',
        message: '',
      });
    }, 6000);
  }

  getErrorMessages(errors: GraphQLError[]) {
    const error = {
      message: errors[0].message,
      status: 'error',
      display: true,
      title: 'Error',
    } as AlertProps;

    this.showAlert(error);
  }
}
