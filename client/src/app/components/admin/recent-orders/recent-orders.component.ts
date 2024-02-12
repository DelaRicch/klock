import { Component } from '@angular/core';
import { ClientOrders } from '@type/types';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.css',
})
export class RecentOrdersComponent {
  products: ClientOrders[] = [
    {
      name: 'Breitling leather',
      orderId: '123RGR231567Y',
      date: '12-02-2022',
      customerName: 'John Doe',
      status: 'Delivered',
      amount: 2500,
    },
    {
      name: 'Breitling leather',
      orderId: '123RGR231567Y',
      date: '12-02-2022',
      customerName: 'John Doe',
      status: 'Delivered',
      amount: 2500,
    },
    {
      name: 'Breitling leather',
      orderId: '123RGR231567Y',
      date: '12-02-2022',
      customerName: 'John Doe',
      status: 'Delivered',
      amount: 2500,
    },
  ];

  selectedProducts!: ClientOrders;

  constructor() {}
}
