import { Component } from '@angular/core';
import { OrdersComponent } from '@components/admin/orders/orders.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [OrdersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
