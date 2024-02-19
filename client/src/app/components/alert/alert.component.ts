import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AlertIconComponent } from '@components/icons/alert-icon/alert-icon.component';
import { AlertService } from '@services/alert/alert.service';
import { AlertProps } from '@type/types';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [AlertIconComponent, NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),

      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateY(-100px)' })),
      ]),
    ]),
  ],
})
export class AlertComponent {
  alert: AlertProps = {
    display: false,
    status: 'success',
    title: '',
    message: '',
  };
  constructor(private alertService: AlertService) {
    effect(() => {
      this.alert = alertService.alert();
    });
  }
}
