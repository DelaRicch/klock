import { Component } from '@angular/core';
import { BestSellersComponent } from '@components/admin/best-sellers/best-sellers.component';
import { OrdersComponent } from '@components/admin/orders/orders.component';
import { RecentOrdersComponent } from '@components/admin/recent-orders/recent-orders.component';
import { SalesGraphComponent } from '@components/admin/sales-graph/sales-graph.component';

@Component({
  selector: 'klock-dashboard',
  standalone: true,
  imports: [
    OrdersComponent,
    SalesGraphComponent,
    BestSellersComponent,
    RecentOrdersComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
