import { Component, HostBinding } from '@angular/core';
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
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      <klock-orders
        title="Total Oders"
        amount="126.500"
        comparedYear="Jan 2024"
        percentage="34.7"
      />
      <klock-orders
        title="Total Oders"
        amount="126.500"
        comparedYear="Jan 2024"
        percentage="34.7"
      />
      <klock-orders
        title="Total Oders"
        amount="126.500"
        comparedYear="Jan 2024"
        percentage="34.7"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      <div class="col-span-2 rounded-lg border border-grey-500">
        <klock-sales-graph />
      </div>
      <div class="col-span-2 lg:col-span-1 h-full">
        <klock-best-sellers />
      </div>
    </div>
    <klock-recent-orders />
  `,
})
export class DashboardComponent {
  @HostBinding('class') get hostClass() {
    return 'container pl-5 pr-6 py-6 sm:px-0 md:px-[45px] md:py-[30px] flex flex-col gap-8';
  }
}
