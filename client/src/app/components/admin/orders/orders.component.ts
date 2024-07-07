import { Component, Input } from '@angular/core';

@Component({
  selector: 'klock-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  @Input() title = '';
  @Input() comparedYear = '';
  @Input() amount = '';
  @Input() percentage = '';
}
