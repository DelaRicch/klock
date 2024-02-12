import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from '@services/toast/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Klock Ecommerce';

  // constructor(private toastService: ToastService) {
  //   this.toastService.toast$.subscribe((toast) => {
  //     if (toast.res.success) {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: toast.res.message,
  //         life: 5000,
  //       });
  //     } else {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: toast.res.message,
  //         life: 5000,
  //       });
  //     }
  //   });

  }