import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/admin/sidebar/sidebar.component';
import { TopbarComponent } from '@components/admin/topbar/topbar.component';

@Component({
  selector: 'klock-dashboard',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardComponent {}
