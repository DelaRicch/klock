import { Component } from '@angular/core';
import { BestSellingItemComponent } from '@components/admin/best-selling-item/best-selling-item.component';

@Component({
  selector: 'klock-best-sellers',
  standalone: true,
  imports: [BestSellingItemComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent {}
