import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { DropdownMenuComponent } from '@components/shared/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'klock-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent, DropdownMenuComponent],
  providers: [],
  templateUrl: './klock.component.html',
})
export class AppComponent {
  title = 'Klock Ecommerce';
}
