import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { UserService } from '@services/user/user.service';
import { TokenType, UserInfoType } from '@type/types';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'klock-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  userService = inject(UserService);

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['token'];
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const token = {
        value: accessToken,
        expiration: decodedToken.exp,
      };
      this.userService.setUserProfile(decodedToken as UserInfoType);
      this.authService.setAccessToken(token as TokenType);
      window.location.href = '/';
    }
  }
}
