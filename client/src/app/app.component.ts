import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastService } from '@services/toast/toast.service';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Klock Ecommerce';

  constructor(private primeConfig: PrimeNGConfig, private toastService: ToastService, private messageService: MessageService,) {
    this.toastService.toast$.subscribe((toast) => {
      if (toast.res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: toast.res.message,
          life: 5000,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: toast.res.message,
          life: 5000,
        });
      }
    });

  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }
}
