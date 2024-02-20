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
  template: `
    <div
      *ngIf="alert.display"
      [@alertAnimation]="alert.display"
      [class]="
        alert.status === 'success'
          ? 'border-green-700 bg-green-100 text-green-700'
          : 'bg-red-100 text-error border-error'
      "
      class="alert max-w-[30rem] min-w-[20rem] rounded-lg border min-h-[4rem] absolute px-4 py-2 right-8 top-8 flex gap-4"
    >
      <app-alert-icon [status]="alert.status" />
      <div class="flex flex-col gap-1">
        <span class="font-bold">{{ alert.title }}</span>
        <span>{{ alert.message }}</span>
      </div>
    </div>
  `,
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),

      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translateY(-100px)' })
        ),
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
