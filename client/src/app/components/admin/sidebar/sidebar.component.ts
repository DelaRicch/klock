import { Component } from '@angular/core';
import { ButtonComponent } from '@components/shared/button/button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
sidebarItems = [
  {id: 1, name: 'Dashboard', icon: 'dashboard', link: 'admin-dashboard'},
  {id: 2, name: 'All Products', icon: 'all-products', link: 'admin-products'},
  {id: 3, name: 'Order List', icon: 'order-list', link: 'admin-orders'},
]
}
