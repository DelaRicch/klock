import { Component } from '@angular/core';
import { LogoComponent } from '../../icons/logo/logo.component';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor() {
   }

}
