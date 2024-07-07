import { animate, style, transition, trigger } from "@angular/animations";
import { NgIf } from "@angular/common";
import { Component, effect, HostBinding } from "@angular/core";
import { AlertIconComponent } from "@components/icons/alert-icon/alert-icon.component";
import { AlertService } from "@services/alert/alert.service";
import { AlertProps } from "@type/types";
import { cn } from "../../helpers/helpers";

@Component({
  selector: "klock-alert",
  standalone: true,
  imports: [AlertIconComponent, NgIf],
  template: `
    @for (alert of alerts; track $index) {
      <div
        [@alertAnimation]="alert"
        [class]="
          cn(
            'alert max-w-[30rem] min-w-[20rem] rounded-lg border max-h-[6rem] px-4 py-2 flex gap-2',
            {
              'border-green-700 bg-green-100 text-green-700':
                alert.status === 'success',
              'bg-red-100 text-error border-error': alert.status === 'error'
            }
          )
        "
      >
        <klock-alert-icon [status]="alert.status" />
        <div class="flex flex-col gap-0.5">
          <span class="font-bold">{{ alert.title }}</span>
          @if (alert.message) {
            <span>{{
              alert.message.charAt(0).toUpperCase() + alert.message.slice(1)
            }}</span>
          }
        </div>
      </div>
    }
  `,
  animations: [
    trigger("alertAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(100px)" }),
        animate(
          "500ms ease-in",
          style({ opacity: 1, transform: "translateX(0)" })
        )
      ]),

      transition(":leave", [
        animate(
          "500ms ease-out",
          style({ opacity: 0, transform: "translateX(100px)" })
        )
      ])
    ])
  ]
})
export class AlertComponent {
  cn = cn;
  alerts = [] as AlertProps[];
  constructor(alertService: AlertService) {
    effect(() => {
      this.alerts = alertService.alerts();
    });
  }

  @HostBinding("class") get hostClass() {
    return "flex flex-col gap-4 absolute right-8 top-8 z-[100] max-h-[90%] overflow-y-auto";
  }
}
