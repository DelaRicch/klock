import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/admin/sidebar/sidebar.component';
import { TopbarComponent } from '@components/admin/topbar/topbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
