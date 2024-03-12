import { Component } from '@angular/core';

@Component({
  selector: 'klock-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  googleLogin() {
    window.location.href = 'http://localhost:8080/auth/google';
  }
}
