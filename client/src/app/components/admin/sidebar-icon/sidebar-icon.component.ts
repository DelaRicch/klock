import { Component, Input } from '@angular/core';

@Component({
  selector: 'klock-sidebar-icon',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-icon.component.html',
  styleUrl: './sidebar-icon.component.css',
})
export class SidebarIconComponent {
  @Input() icon: string = 'dashboard';
  @Input() color = '#FFFFFF';
}
