import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { SidebarIconComponent } from '@components/admin/sidebar-icon/sidebar-icon.component';
import { ButtonComponent } from '@components/shared/button/button.component';
import { LogoComponent } from '@icons/logo/logo.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonComponent,
    LogoComponent,
    SidebarIconComponent,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  activeRoute = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  sidebarItems = [
    { id: 1, name: 'Dashboard', icon: 'dashboard', path: 'admin-dashboard' },
    {
      id: 2,
      name: 'All Products',
      icon: 'all-products',
      path: 'admin-dashboard/all-products',
    },
    {
      id: 3,
      name: 'Order List',
      icon: 'order-list',
      path: 'admin-dashboard/order-list',
    },
  ];

  handleNavigateRoute(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
